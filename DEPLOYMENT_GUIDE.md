# Vercel Deployment Guide

## Setup

Your application is now configured to deploy on Vercel with both frontend and backend serverless functions.

### Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Vercel Account** - Sign up at https://vercel.com
3. **TMDB API Key** - Get a free key at https://www.themoviedb.org/settings/api

### Step 1: Set Up TMDB API Key

1. Sign up for a free TMDB account at https://www.themoviedb.org/settings/api
2. Copy your API key
3. In Vercel Dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add:
     - **Name:** `TMDB_API_KEY`
     - **Value:** Your API key from TMDB

### Step 2: Deploy to Vercel

#### Option A: Using GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add serverless API functions"
   git push origin main
   ```

2. Connect to Vercel:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the Next.js/Vite configuration
   - Set the environment variable `TMDB_API_KEY`
   - Click Deploy

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

### Step 3: Verify Deployment

After deployment, test your API:

1. Visit `https://your-domain.vercel.app/api/health` to check API status
2. Try searching for a movie on your deployed app

## Project Structure

```
/api                      # Vercel serverless functions
  ├── search.py          # POST /api/search
  ├── health.py          # GET /api/health
  ├── netflix_finder.py  # Shared logic
  ├── countries.json     # Country mappings
  └── countries/
      └── [title_id]/
          └── [media_type].py  # GET /api/countries/:titleId/:mediaType

/src                      # React frontend
├── App.jsx
├── pages/
│   ├── SearchPage.jsx
│   ├── ResultsPage.jsx
│   └── DetailsPage.jsx
└── services/
    └── api.js           # API client (already updated)

package.json              # Frontend dependencies
requirements.txt          # Python dependencies
vercel.json              # Vercel configuration
```

## Troubleshooting

### 404 Error on API Calls

- Ensure the environment variable `TMDB_API_KEY` is set in Vercel
- Check that all files are in the `/api` folder
- Verify the file names match the route structure

### API Returns Sample Data

- This happens when `TMDB_API_KEY` is not set
- Add the environment variable in Vercel dashboard
- Redeploy your project

### CORS Issues

- CORS headers are already set in all API functions
- If you still see CORS errors, check browser console for details

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env and add your TMDB_API_KEY

# Run frontend and backend
npm run dev:all
```

## API Endpoints

All endpoints are now serverless functions on Vercel:

- **POST** `/api/search` - Search for titles
  ```json
  {"query": "Inception"}
  ```

- **GET** `/api/countries/:titleId/:mediaType` - Get Netflix availability
  ```
  /api/countries/27205/movie
  ```

- **GET** `/api/health` - Health check

## Next Steps

1. Add your TMDB API key to Vercel environment variables
2. Commit and push your code
3. Deploy to Vercel
4. Test the deployed application

For more help, visit:
- Vercel Docs: https://vercel.com/docs
- TMDB API: https://developers.themoviedb.org/3
