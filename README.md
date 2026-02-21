# Where Can I Watch This? 🎬🌍

A full-stack web application to search for movies and TV shows on Netflix and discover their global availability with an interactive map visualization.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Python](https://img.shields.io/badge/Python-3.8+-green?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-black?logo=flask)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

## 🎯 Overview

Where Can I Watch This? is a full-stack application that allows users to:
- **Search** for any Netflix title (movies or TV shows)
- **Discover** which countries have access to each title
- **Visualize** availability through an interactive world map
- **Browse** detailed information including release year, type, and poster images

Perfect for travelers, international viewers, and Netflix enthusiasts who want to find content availability across different regions.

## ✨ Features

### 🔍 Smart Search
- Real-time search for movies and TV shows
- Powered by TMDB's massive database
- Instant results with poster images and metadata
- Support for both English and international titles

### 🌍 Global Availability
- View all countries where a title is available on Netflix
- Updated watch provider information from TMDB
- Discover what's available in your country
- Plan content viewing by region

### 📱 Responsive Design
- Beautiful Material Design UI
- Works seamlessly on desktop, tablet, and mobile
- Smooth animations and transitions
- Fast, optimized performance with Vite

### 🎨 Modern Frontend
- React 19 with Hooks
- Material-UI (MUI) components
- Framer Motion animations
- Interactive map visualizations

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite** | Build tool and dev server |
| **Material-UI (MUI)** | Component library |
| **Framer Motion** | Animations & transitions |
| **React Leaflet** | Interactive maps |
| **CSS3** | Styling with gradients & animations |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Python 3.8+** | Backend runtime |
| **Flask** | Web framework |
| **Flask-CORS** | Cross-origin requests |
| **TMDB API** | Movie & TV show data |
| **Requests** | HTTP library |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ with npm
- **Python** 3.8+
- **TMDB API Key** (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karman15/wherecaniwatchthis.git
   cd wherecaniwatchthis
   ```

2. **Set up Python Virtual Environment**
   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows (Command Prompt)
   venv\Scripts\activate

   # On Windows (PowerShell)
   venv\Scripts\Activate.ps1

   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   # Install Node dependencies
   npm install

   # Install Python dependencies (make sure venv is activated)
   pip install -r requirements.txt
   ```

4. **Set up your TMDB API Key**
   
   Create a `.env` file in the project root:
   ```env
   TMDB_API_KEY=your_api_key_here
   ```

   Or set as environment variable:
   ```bash
   # Windows (PowerShell)
   $env:TMDB_API_KEY = "your_api_key_here"

   # Windows (Command Prompt)
   set TMDB_API_KEY=your_api_key_here

   # macOS/Linux
   export TMDB_API_KEY="your_api_key_here"
   ```

5. **Start the application**
   
   **Option A:** Run backend and frontend together
   ```bash
   npm run dev:all
   ```

   **Option B:** Run separately
   ```bash
   # Terminal 1 - Backend
   npm run api

   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Usage

1. **Search for a Title**
   - Type the name of any movie or TV show in the search box
   - Browse through instant search results with images

2. **View Details**
   - Click on any result to see more information
   - View the title type (Movie/TV Show), release year, and poster

3. **Check Availability**
   - See which countries have this title on Netflix
   - Use the results to plan your viewing by region

4. **Explore**
   - Search multiple titles to compare availability
   - Discover popular content across different regions

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API endpoint reference
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Example Client](./api_client_example.py)** - Python example for using the API

## 🔌 API Endpoints

### Search Titles
```bash
POST /api/search
Content-Type: application/json

{
  "query": "Inception"
}
```

### Get Country Availability
```bash
GET /api/countries/<title_id>/<media_type>
# Example: /api/countries/27205/movie
```

### Health Check
```bash
GET /api/health
```

Full API documentation: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run api              # Start backend API server
npm run dev:all          # Run both frontend and backend

# Production
npm run build            # Build frontend for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
```

## 🎓 Project Structure

```
wherecaniwatchthis/
├── src/
│   ├── api_server.py           # Flask API server
│   ├── netflix_finder.py       # Core search logic
│   ├── App.jsx                 # Main React component
│   ├── main.jsx                # React entry point
│   ├── countries.json          # Country mappings
│   ├── components/
│   │   └── WorldMap.jsx        # Map visualization
│   ├── pages/
│   │   ├── SearchPage.jsx      # Search interface
│   │   ├── ResultsPage.jsx     # Results display
│   │   └── DetailsPage.jsx     # Title details
│   ├── services/
│   │   └── api.js              # API client
│   ├── theme/
│   │   └── muiTheme.js         # Material-UI theme
├── public/                      # Static assets
├── package.json                 # Node dependencies
├── requirements.txt             # Python dependencies
├── vite.config.js              # Vite configuration
├── index.html                  # HTML entry point
└── README.md                   # This file
```

## 🌟 Key Features Explained

### Smart Search Algorithm
- Searches TMDB's extensive database of movies and TV shows
- Returns relevant results with images and metadata
- Handles typos and fuzzy matching

### Country Availability Lookup
- Queries Netflix's watch provider information from TMDB
- Real-time data ensures accuracy
- Supports 190+ countries

### Responsive UI
- Mobile-first design approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🔐 Security

- Environment variables for sensitive data (API keys)
- CORS properly configured for production
- Input validation on all endpoints
- No sensitive data stored client-side

## 🐛 Troubleshooting

### Backend Not Connecting
```bash
# Make sure Flask is running on port 5000
# Check CORS is enabled
# Verify API key is set
npm run api
```

### Search Returns No Results
- Without API key: Only sample data is available
- With API key: Should work for any title
- Check your TMDB API key is valid

### Images Not Loading
- Verify internet connection
- Check TMDB CDN is accessible (image.tmdb.org)
- Try clearing browser cache

For more help, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#troubleshooting)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Run `npm run lint` before committing
- Test both frontend and backend changes
- Update documentation as needed

## 📋 Roadmap

- [ ] User accounts and favorites
- [ ] Advanced filtering (genres, ratings, release year)
- [ ] Watch history and recommendations
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Dark mode toggle

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **TMDB API**: https://www.themoviedb.org/settings/api
- **React Documentation**: https://react.dev
- **Flask Documentation**: https://flask.palletsprojects.com
- **Material-UI**: https://mui.com

## 👨‍💻 Author

Created with ❤️ for Netflix fans and global content explorers.

---

<div align="center">

**Questions?** Feel free to open an issue or reach out!

⭐ If you found this project helpful, please consider giving it a star!

</div>