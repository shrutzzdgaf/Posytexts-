#!/usr/bin/env python3
"""
Test Suite for POSYTEXTS.COM
Verifies data integrity, A-Z flowers, SVGs, server routing, and serialization.
"""

import os
import re
import sys
import json
import base64
import urllib.parse
import urllib.request
import threading
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def test_flower_data():
    print("Testing flower data dictionary (A-Z)...")
    data_file = os.path.join(BASE_DIR, 'js', 'flowers-data.js')
    assert os.path.exists(data_file), "flowers-data.js missing"

    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Verify all 26 letters A-Z exist
    for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
        pattern = rf"\b{letter}:\s*\{{"
        assert re.search(pattern, content), f"Letter {letter} missing in flowers-data.js"
    print("  [PASS] All 26 letters A-Z defined in flowers-data.js")

def test_flower_svgs():
    print("Testing flower SVGs definitions (A-Z)...")
    svg_file = os.path.join(BASE_DIR, 'js', 'flower-svgs.js')
    assert os.path.exists(svg_file), "flower-svgs.js missing"

    with open(svg_file, 'r', encoding='utf-8') as f:
        content = f.read()

    for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
        pattern = rf"\b{letter}:\s*\(uid\)\s*=>"
        assert re.search(pattern, content), f"Letter {letter} SVG missing in flower-svgs.js"
    print("  [PASS] All 26 letters A-Z have hand-drawn SVG sketches in flower-svgs.js")

def test_serialization_roundtrip():
    print("Testing payload serialization roundtrip...")
    test_payload = {
        "recipientName": "SHRUTI",
        "senderName": "Admirer",
        "message": "Spell their name. Let it bloom!",
        "paperStyle": "vintage-cream",
        "fontStyle": "font-handwriting",
        "stickers": [{"id": "stamp-rose", "x": 15, "y": 20, "rot": 5}]
    }
    json_str = json.dumps(test_payload)
    encoded = base64.b64encode(urllib.parse.quote(json_str).encode('utf-8')).decode('utf-8')
    decoded_str = urllib.parse.unquote(base64.b64decode(encoded).decode('utf-8'))
    decoded = json.loads(decoded_str)

    assert decoded == test_payload, "Payload serialization roundtrip failed"
    print("  [PASS] Base64 + URI component roundtrip verified without data loss")

def test_server_endpoints():
    print("Testing server endpoints and routing...")
    import socketserver
    import server
    # Start server on test port 8899
    test_port = 8899
    httpd = socketserver.TCPServer(("127.0.0.1", test_port), server.PosyRequestHandler)
    thread = threading.Thread(target=httpd.serve_forever)
    thread.daemon = True
    thread.start()
    time.sleep(0.3)

    try:
        # 1. Test GET /
        url = f"http://127.0.0.1:{test_port}/"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode('utf-8')
            assert resp.status == 200, f"Expected 200, got {resp.status}"
            assert "POSYTEXTS.COM" in body, "Homepage title missing"
        print("  [PASS] GET / serves index.html with 200 OK")

        # 2. Test POST /api/posy
        api_url = f"http://127.0.0.1:{test_port}/api/posy"
        sample_data = {
            "recipientName": "TESTER",
            "senderName": "Shruti",
            "message": "Blooming test posy!",
            "paperStyle": "vintage-cream"
        }
        req_post = urllib.request.Request(
            api_url,
            data=json.dumps(sample_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req_post) as resp:
            assert resp.status == 201, f"Expected 201, got {resp.status}"
            res_json = json.loads(resp.read().decode('utf-8'))
            assert 'id' in res_json and 'url' in res_json, "Missing id or url in API response"
            posy_id = res_json['id']
        print(f"  [PASS] POST /api/posy created posy: {posy_id}")

        # 3. Test POST /api/send-email
        email_url = f"http://127.0.0.1:{test_port}/api/send-email"
        email_payload = {
            "toEmail": "friend@example.com",
            "recipientName": "TESTER",
            "shareUrl": f"http://127.0.0.1:{test_port}/open/{posy_id}"
        }
        req_email = urllib.request.Request(
            email_url,
            data=json.dumps(email_payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req_email) as resp:
            assert resp.status == 200, f"Expected 200, got {resp.status}"
            email_res = json.loads(resp.read().decode('utf-8'))
            assert email_res.get('success') is True, "Email dispatch unsuccessful"
        print("  [PASS] POST /api/send-email delivered successfully")

    finally:
        httpd.shutdown()
        httpd.server_close()

def run_all_tests():
    print("========================================")
    print("  POSYTEXTS.COM Test Suite")
    print("========================================")
    test_flower_data()
    test_flower_svgs()
    test_serialization_roundtrip()
    test_server_endpoints()
    print("========================================")
    print("  ALL TESTS PASSED! POSY SUCCESS!")
    print("========================================")

if __name__ == '__main__':
    run_all_tests()

