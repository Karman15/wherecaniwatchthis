#!/usr/bin/env python3
"""
Flask API server for Where Can I Watch This?
Provides REST endpoints for the frontend to call
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from netflix_finder import NetflixTitleFinder
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize the Netflix Title Finder
finder = NetflixTitleFinder()


@app.route("/api/search", methods=["POST"])
def search():
    """
    Search for movies/TV shows by title

    Expected request body:
    {
        "query": "Inception"
    }

    Returns:
    {
        "success": true,
        "data": [
            {
                "id": 27205,
                "title": "Inception",
                "type": "movie",
                "year": "2010",
                "poster": "https://image.tmdb.org/t/p/w342/..."
            }
        ]
    }
    """
    try:
        data = request.get_json()
        query = data.get("query", "").strip()

        if not query:
            return jsonify({"success": False, "message": "Query is required"}), 400

        # Search for titles
        results = finder.search_titles(query)

        # Format results for API response
        formatted_response = finder.display_results(results)

        return jsonify(formatted_response), 200

    except Exception as e:
        return (
            jsonify({"success": False, "message": f"Error: {str(e)}"}),
            500,
        )


@app.route("/api/countries/<int:title_id>/<media_type>", methods=["GET"])
def get_netflix_countries(title_id, media_type):
    """
    Get Netflix availability for a specific title

    URL Parameters:
    - title_id: TMDB title ID
    - media_type: 'movie' or 'tv'

    Returns:
    {
        "success": true,
        "data": ["United States", "United Kingdom", "Canada", "Australia"]
    }
    """
    try:
        if media_type not in ["movie", "tv"]:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Invalid media_type. Use 'movie' or 'tv'",
                    }
                ),
                400,
            )

        # Get countries from finder
        countries_response = finder.get_countries(title_id, media_type)

        return jsonify(countries_response), 200

    except Exception as e:
        return (
            jsonify({"success": False, "message": f"Error: {str(e)}"}),
            500,
        )


@app.route("/api/health", methods=["GET"])
def health_check():
    """
    Health check endpoint

    Returns:
    {
        "status": "ok",
        "api_key_configured": true/false
    }
    """
    return (
        jsonify(
            {
                "status": "ok",
                "api_key_configured": bool(finder.api_key),
            }
        ),
        200,
    )


if __name__ == "__main__":
    # Run the Flask development server
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
