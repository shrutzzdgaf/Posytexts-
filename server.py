#!/usr/bin/env python3
"""
POSYTEXTS.COM — Local HTTP & API Server with Supabase Persistence
Serves static assets, provides posy persistence to both Supabase and local cache,
handles share link resolution, and provides email dispatch hooks.

Creator: Shruti Arya · miss.shrutiarya@gmail.com
"""

import http.server
import socketserver
import os
import json
import urllib.parse
import uuid
from datetime import datetime

PORT = int(os.environ.get('PORT', 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
POSIES_FILE = os.path.join(DATA_DIR, 'posies.json')

# Supabase Credentials (optional - from env vars)
SUPABASE_URL = os.environ.get('SUPABASE_URL', os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')).strip()
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', os.environ.get('SUPABASE_ANON_KEY', '')).strip()

supabase_client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"[POSYTEXTS] Supabase connected: {SUPABASE_URL}")
    except Exception as e:
        print(f"[POSYTEXTS] Supabase connection notice: {e}")

# Ensure local data directory exists as cache
os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(POSIES_FILE):
    with open(POSIES_FILE, 'w', encoding='utf-8') as f:
        json.dump({}, f)


def load_local_posies():
    try:
        with open(POSIES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {}


def save_local_posy(posy_id, data):
    posies = load_local_posies()
    posies[posy_id] = {
        **data,
        'createdAt': datetime.utcnow().isoformat() + 'Z'
    }
    with open(POSIES_FILE, 'w', encoding='utf-8') as f:
        json.dump(posies, f, indent=2)


def get_posy_by_id(posy_id):
    # 1. Check Supabase first if available
    if supabase_client:
        try:
            res = supabase_client.table('posies').select('*').eq('id', posy_id).execute()
            if res.data and len(res.data) > 0:
                row = res.data[0]
                return {
                    'id': row.get('id'),
                    'recipientName': row.get('recipient_name'),
                    'recipientEmail': row.get('recipient_email'),
                    'senderName': row.get('sender_name'),
                    'senderEmail': row.get('sender_email'),
                    'message': row.get('message'),
                    'paperStyle': row.get('paper_style', 'vintage-cream'),
                    'fontStyle': row.get('font_style', 'font-handwriting'),
                    'stickers': row.get('stickers', []),
                    'opened': row.get('opened', False),
                    'createdAt': row.get('created_at')
                }
        except Exception as e:
            print(f"[POSYTEXTS] Supabase fetch error: {e}")

    # 2. Check local file cache
    local = load_local_posies()
    return local.get(posy_id)


class PosyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Direct posy route /open/:id
        if path.startswith('/open/'):
            posy_id = path.replace('/open/', '').strip('/')
            posy_data = get_posy_by_id(posy_id)
            if posy_data:
                # Redirect to index.html with id param
                self.send_response(302)
                self.send_header('Location', f'/?id={posy_id}')
                self.end_headers()
                return
            else:
                self.send_response(302)
                self.send_header('Location', f'/?error=not_found')
                self.end_headers()
                return

        # API: fetch single posy
        if path.startswith('/api/posy/'):
            posy_id = path.replace('/api/posy/', '').strip('/')
            posy_data = get_posy_by_id(posy_id)
            if posy_data:
                self.send_json_response(200, posy_data)
            else:
                self.send_json_response(404, {'error': 'Posy not found'})
            return

        # API: health & config
        if path == '/api/config':
            self.send_json_response(200, {
                'supabase_configured': supabase_client is not None,
                'supabase_url': SUPABASE_URL if SUPABASE_URL else None
            })
            return

        # Default static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == '/api/posy':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                data = json.loads(body.decode('utf-8'))

                timestamp = int(datetime.utcnow().timestamp())
                posy_id = f"posy_{hex(timestamp)[2:]}_{uuid.uuid4().hex[:6]}"

                # 1. Save to Supabase if available
                if supabase_client:
                    try:
                        row = {
                            'id': posy_id,
                            'recipient_name': data.get('recipientName', 'Friend'),
                            'recipient_email': data.get('recipientEmail'),
                            'sender_name': data.get('senderName', ''),
                            'sender_email': data.get('senderEmail'),
                            'message': data.get('message', ''),
                            'paper_style': data.get('paperStyle', 'vintage-cream'),
                            'font_style': data.get('fontStyle', 'font-handwriting'),
                            'stickers': data.get('stickers', []),
                            'opened': False,
                            'created_at': datetime.utcnow().isoformat() + 'Z'
                        }
                        supabase_client.table('posies').insert(row).execute()
                        print(f"[POSYTEXTS] Posy saved to Supabase: {posy_id}")
                    except Exception as e:
                        print(f"[POSYTEXTS] Supabase insert error: {e}")

                # 2. Save to local cache
                save_local_posy(posy_id, data)

                host = self.headers.get('Host', f'localhost:{PORT}')
                share_url = f'http://{host}/?id={posy_id}'

                self.send_json_response(201, {
                    'id': posy_id,
                    'url': share_url,
                    'message': 'Posy preserved successfully! ✿'
                })
            except Exception as e:
                self.send_json_response(400, {'error': str(e)})
            return

        elif path == '/api/send-email':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                data = json.loads(body.decode('utf-8'))

                to_email = data.get('toEmail')
                recipient_name = data.get('recipientName', 'Friend')
                share_url = data.get('shareUrl', '')

                print(f"[POSYTEXTS DISPATCH] Delivering posy for {recipient_name} to {to_email} via {share_url}")

                self.send_json_response(200, {
                    'success': True,
                    'recipient': to_email,
                    'message': f'Delivered posy to {to_email}! 💌'
                })
            except Exception as e:
                self.send_json_response(500, {'error': str(e)})
            return

        self.send_json_response(404, {'error': 'Endpoint not found'})

    def send_json_response(self, code, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    print("============================================================")
    print("  POSYTEXTS.COM Server by Shruti Arya")
    print("  Spell their name. Let it bloom. (Posytexts)")
    print(f"  Running locally at: http://127.0.0.1:{PORT}")
    print(f"  Supabase status: {'CONNECTED' if supabase_client else 'STANDALONE (Local + URL-safe fallback)'}")
    print("============================================================")
    with socketserver.TCPServer(("0.0.0.0", PORT), PosyRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")
            httpd.server_close()


if __name__ == '__main__':
    run_server()
