from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add parent directory to path to import netflix_finder
sys.path.insert(
    0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from netflix_finder import NetflixTitleFinder

finder = NetflixTitleFinder()


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Extract title_id and media_type from path
        path_parts = self.path.split("/")

        if len(path_parts) >= 4:
            media_type = path_parts[-1].split("?")[0]  # Remove query params
            title_id_str = path_parts[-2]

            try:
                title_id = int(title_id_str)

                if media_type not in ["movie", "tv"]:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(
                        json.dumps(
                            {
                                "success": False,
                                "message": "Invalid media_type. Use 'movie' or 'tv'",
                            }
                        ).encode()
                    )
                    return

                # Get countries from finder
                countries_response = finder.get_countries(title_id, media_type)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(countries_response).encode())

            except ValueError:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(
                    json.dumps(
                        {"success": False, "message": "Invalid title_id"}
                    ).encode()
                )
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(
                    json.dumps(
                        {"success": False, "message": f"Error: {str(e)}"}
                    ).encode()
                )

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
