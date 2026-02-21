from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add parent directory to path to import netflix_finder
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from netflix_finder import NetflixTitleFinder

finder = NetflixTitleFinder()


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Handle CORS
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body) if body else {}
            query = data.get("query", "").strip()

            if not query:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(
                    json.dumps(
                        {"success": False, "message": "Query is required"}
                    ).encode()
                )
                return

            # Search for titles
            results = finder.search_titles(query)

            # Format results for API response
            response = finder.display_results(results)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(
                json.dumps({"success": False, "message": f"Error: {str(e)}"}).encode()
            )

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
