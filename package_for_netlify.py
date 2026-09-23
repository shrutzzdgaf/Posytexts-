#!/usr/bin/env python3
"""
POSYTEXTS.COM — Netlify Packaging & Automated Deploy Script
Packages static assets into a clean ZIP and optionally deploys to Netlify API.

Creator: Shruti Arya · miss.shrutiarya@gmail.com
"""

import os
import sys
import zipfile
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_ZIP = os.path.join(BASE_DIR, 'posytexts-netlify-deploy.zip')

DEPLOY_FILES = [
    'index.html',
    'CNAME',
    'netlify.toml',
    '_redirects',
]

DEPLOY_DIRS = [
    'css',
    'js'
]


def create_deploy_zip():
    print(f"Creating clean Netlify deployment ZIP: {OUTPUT_ZIP}")
    with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zf:
        # Add root files
        for fname in DEPLOY_FILES:
            fpath = os.path.join(BASE_DIR, fname)
            if os.path.exists(fpath):
                zf.write(fpath, arcname=fname)
                print(f"  + Added file: {fname}")

        # Add directories
        for dname in DEPLOY_DIRS:
            dpath = os.path.join(BASE_DIR, dname)
            if os.path.exists(dpath):
                for root, dirs, files in os.walk(dpath):
                    for file in files:
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, BASE_DIR)
                        zf.write(full_path, arcname=rel_path)
                        print(f"  + Added asset: {rel_path}")

    zip_size_kb = os.path.getsize(OUTPUT_ZIP) / 1024
    print(f"Successfully packaged! ZIP Size: {zip_size_kb:.1f} KB")
    return OUTPUT_ZIP


def deploy_via_api(token, site_id=None):
    try:
        import requests
    except ImportError:
        print("requests package required for direct API deploy. Run: pip install requests")
        return False

    print("\nConnecting to Netlify API...")
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/zip'
    }

    with open(OUTPUT_ZIP, 'rb') as f:
        zip_data = f.read()

    if site_id:
        url = f"https://api.netlify.com/api/v1/sites/{site_id}/deploys"
        print(f"Deploying to existing Netlify site ID: {site_id}...")
        resp = requests.post(url, headers=headers, data=zip_data)
    else:
        url = "https://api.netlify.com/api/v1/sites"
        print("Creating and deploying new Netlify site...")
        headers['Content-Type'] = 'application/zip'
        resp = requests.post(url, headers=headers, data=zip_data)

    if resp.status_code in (200, 201):
        data = resp.json()
        site_name = data.get('name')
        ssl_url = data.get('ssl_url') or data.get('url')
        admin_url = data.get('admin_url')
        print("============================================================")
        print("  DEPLOYMENT SUCCESSFUL!")
        print(f"  Live Netlify URL: {ssl_url}")
        print(f"  Admin Dashboard: {admin_url}")
        print(f"  Site Name: {site_name}")
        print("============================================================")
        return ssl_url
    else:
        print(f"Netlify API responded with {resp.status_code}: {resp.text}")
        return False


if __name__ == '__main__':
    zip_path = create_deploy_zip()

    token = os.environ.get('NETLIFY_AUTH_TOKEN', '').strip()
    if len(sys.argv) > 1 and sys.argv[1].startswith('--token='):
        token = sys.argv[1].split('=', 1)[1].strip()

    if token:
        deploy_via_api(token)
    else:
        print("\n------------------------------------------------------------")
        print("To deploy automatically via Netlify API:")
        print("  python package_for_netlify.py --token=<YOUR_NETLIFY_TOKEN>")
        print("\nOr to deploy via Netlify Drop (zero setup, 100% free):")
        print("  1. Open https://app.netlify.com/drop in your browser")
        print(f"  2. Drag and drop: {zip_path}")
        print("------------------------------------------------------------")
