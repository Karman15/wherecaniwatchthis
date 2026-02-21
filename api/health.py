from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add parent directory to path to import netflix_finder
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from netflix_finder import NetflixTitleFinder

finder = NetflixTitleFinder()


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(
            json.dumps(
                {
                    "status": "ok",
                    "api_key_configured": bool(finder.api_key),
                }
            ).encode()
        )

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
