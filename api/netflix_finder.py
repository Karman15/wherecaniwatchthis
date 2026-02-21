#!/usr/bin/env python3
"""
Where Can I Watch This? - Search for movies/shows and find countries where they're available
Uses TMDB (The Movie Database) - Free API with Netflix availability data
"""

import requests
from typing import List, Dict, Optional
import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class NetflixTitleFinder:
    def __init__(self):
        """Initialize the Netflix Title Finder"""
        self.tmdb_base_url = "https://api.themoviedb.org/3"
        self.api_key = self._get_api_key()
        self.netflix_provider_id = 8  # Netflix provider ID on TMDB
        self.country_map = self._load_countries()
        self.tmdb_image_base_url = (
            "https://image.tmdb.org/t/p/w342"  # Poster image base URL
        )

    def _get_api_key(self) -> str:
        """
        Get TMDB API key from environment variable (.env file or system environment).
        To use the real API:
        1. Sign up at https://www.themoviedb.org/settings/api
        2. Copy your API key
        3. Add TMDB_API_KEY=your_key to .env file
        """
        api_key = os.getenv("TMDB_API_KEY")
        if not api_key:
            print(
                "\n⚠️  NOTE: No TMDB API key found. Add TMDB_API_KEY to your .env file for real data."
            )
            print("   Get a FREE API key at: https://www.themoviedb.org/settings/api\n")
            print("   Using sample data for demonstration...\n")
        return api_key

    def _load_countries(self) -> Dict[str, str]:
        """
        Load country code to country name mappings from countries.json file.

        Returns:
            Dictionary mapping country codes to country names
        """
        try:
            countries_file = Path(__file__).parent / "countries.json"
            with open(countries_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print("⚠️  Warning: countries.json file not found. Using fallback mappings.")
            return {}
        except json.JSONDecodeError:
            print("⚠️  Warning: Error reading countries.json. Using fallback mappings.")
            return {}

    def search_titles(self, query: str) -> List[Dict]:
        """
        Search for movie/TV show titles matching the query using TMDB API.

        Args:
            query: The search term (movie or TV show title)

        Returns:
            List of matching titles with metadata including poster image
        """
        print(f"\nSearching for '{query}'...")

        if not self.api_key:
            return self._get_sample_data(query)

        try:
            url = f"{self.tmdb_base_url}/search/multi"
            params = {"api_key": self.api_key, "query": query, "page": 1}

            response = requests.get(url, params=params, timeout=10)

            if response.status_code == 200:
                results = response.json().get("results", [])
                # Filter to only movies and TV shows
                filtered_results = [
                    r for r in results if r.get("media_type") in ["movie", "tv"]
                ]
                if filtered_results:
                    # Add poster images
                    for result in filtered_results:
                        result["poster_url"] = self._get_poster_url(
                            result.get("poster_path")
                        )
                    return filtered_results
                else:
                    print("No movies or TV shows found.")
                    return []
            else:
                print(f"Error: API returned status {response.status_code}")
                return self._get_sample_data(query)

        except Exception as e:
            print(
                f"Warning: Could not reach API ({e}). Using sample data for demonstration..."
            )
            return self._get_sample_data(query)

    def get_netflix_countries(self, title: Dict) -> List[str]:
        """
        Fetch Netflix availability countries for a specific title.

        Args:
            title: Title dictionary from search results

        Returns:
            List of country codes/names where title is available on Netflix
        """
        if not self.api_key:
            return title.get("netflix_countries", [])

        try:
            media_type = title.get("media_type", "movie")
            title_id = title.get("id")

            if not title_id:
                return []

            url = f"{self.tmdb_base_url}/{media_type}/{title_id}/watch/providers"
            params = {"api_key": self.api_key}

            response = requests.get(url, params=params, timeout=10)

            if response.status_code == 200:
                data = response.json().get("results", {})
                countries = []

                # Extract Netflix availability from all regions
                for country_code, provider_data in data.items():
                    providers = provider_data.get("flatrate", [])
                    if any(
                        p.get("provider_id") == self.netflix_provider_id
                        for p in providers
                    ):
                        countries.append(self._code_to_country_name(country_code))

                return sorted(countries) if countries else []
            else:
                return []

        except Exception as e:
            print(f"Warning: Could not fetch provider data ({e})")
            return []

    def _code_to_country_name(self, code: str) -> str:
        """
        Convert country code to country name using the loaded country_map.

        Args:
            code: Country code (e.g., 'US', 'GB')

        Returns:
            Country name or the original code if not found
        """
        return self.country_map.get(code, code)

    def _get_poster_url(self, poster_path: Optional[str]) -> Optional[str]:
        """
        Generate full poster image URL from TMDB poster path.

        Args:
            poster_path: Relative poster path from TMDB API

        Returns:
            Full poster image URL or None if not available
        """
        if poster_path:
            return f"{self.tmdb_image_base_url}{poster_path}"
        return None

    def _get_sample_data(self, query: str) -> List[Dict]:
        """
        Return sample data for demonstration when API key is not available
        """
        sample_titles = {
            "attack on titan": [
                {
                    "title": "Attack on Titan",
                    "name": "Attack on Titan",
                    "media_type": "tv",
                    "id": 20574,
                    "poster_url": "https://image.tmdb.org/t/p/w342/1wnFLcuIbF3cBFRXBSe4EBkAJc4.jpg",
                    "netflix_countries": [
                        "Japan",
                        "Italy",
                        "Germany",
                        "United States",
                        "Canada",
                    ],
                },
                {
                    "title": "Attack on Titan: The Final Season",
                    "name": "Attack on Titan: The Final Season",
                    "media_type": "tv",
                    "id": 95396,
                    "poster_url": "https://image.tmdb.org/t/p/w342/qvf5xAJGOEzd1G9pwghSYvs06Jx.jpg",
                    "netflix_countries": [
                        "Japan",
                        "Italy",
                        "Germany",
                        "France",
                        "Spain",
                    ],
                },
            ],
            "interstellar": [
                {
                    "title": "Interstellar",
                    "media_type": "movie",
                    "id": 157336,
                    "poster_url": "https://image.tmdb.org/t/p/w342/gEU2QniY6ShO7h4mXrpMSfcAgJe.jpg",
                    "netflix_countries": [
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Australia",
                    ],
                }
            ],
            "inception": [
                {
                    "title": "Inception",
                    "media_type": "movie",
                    "id": 27205,
                    "poster_url": "https://image.tmdb.org/t/p/w342/9gk7adHYeDMNNGceKPn30Up0HwU.jpg",
                    "netflix_countries": [
                        "United States",
                        "United Kingdom",
                        "France",
                        "Japan",
                    ],
                }
            ],
            "breaking bad": [
                {
                    "title": "Breaking Bad",
                    "name": "Breaking Bad",
                    "media_type": "tv",
                    "id": 1396,
                    "poster_url": "https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pIClnuVfmXoPE.jpg",
                    "netflix_countries": [
                        "United States",
                        "Mexico",
                        "Canada",
                        "United Kingdom",
                    ],
                }
            ],
        }

        query_lower = query.lower()
        results = []

        for key, titles in sample_titles.items():
            if query_lower in key:
                results.extend(titles)

        return results

    def display_results(self, results: List[Dict]) -> Optional[Dict]:
        """
        Format search results for API response.

        Args:
            results: List of titles from search

        Returns:
            Formatted results list for API
        """
        if not results:
            return {"success": False, "message": "No results found.", "data": []}

        formatted_results = []
        for result in results:
            # Handle both TMDB and sample data formats
            title = result.get("title") or result.get("name", "Unknown")
            media_type = result.get("media_type", "unknown")
            release_year = result.get("release_date", result.get("first_air_date", ""))
            year = release_year[:4] if release_year else ""
            rating = result.get("vote_average", 0)

            formatted_results.append(
                {
                    "id": result.get("id"),
                    "title": title,
                    "type": media_type,
                    "year": year,
                    "poster": result.get("poster_url"),
                    "rating": rating,
                }
            )

        return {"success": True, "data": formatted_results}

    def get_countries(self, title_id: int, media_type: str) -> Dict:
        """
        Get countries where a title is available on Netflix.
        Returns formatted data suitable for API response.

        Args:
            title_id: The TMDB title ID
            media_type: 'movie' or 'tv'

        Returns:
            Dictionary with countries data for API response
        """
        try:
            url = f"{self.tmdb_base_url}/{media_type}/{title_id}/watch/providers"
            params = {"api_key": self.api_key}

            response = requests.get(url, params=params, timeout=10)

            if response.status_code == 200:
                data = response.json().get("results", {})
                countries = []

                # Extract Netflix availability from all regions
                for country_code, provider_data in data.items():
                    providers = provider_data.get("flatrate", [])
                    if any(
                        p.get("provider_id") == self.netflix_provider_id
                        for p in providers
                    ):
                        countries.append(self._code_to_country_name(country_code))

                sorted_countries = sorted(countries) if countries else []
                return {"success": True, "data": sorted_countries}
            else:
                return {"success": False, "data": []}

        except Exception as e:
            print(f"Warning: Could not fetch provider data ({e})")
            return {"success": False, "data": []}


# API Usage Example:
# finder = NetflixTitleFinder()
# results = finder.search_titles("Inception")
# formatted = finder.display_results(results)
# countries = finder.get_countries(title_id=27205, media_type="movie")
