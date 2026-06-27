import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTrending, searchTitles } from "../services/api";

const SearchPage = ({ onSearchResults, onLoading, onSelectTitle, onOpenWatchlist, watchlistCount, toggleWatchlist, isInWatchlist }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    fetchTrending().then((data) => {
      setTrending(data);
      setTrendingLoading(false);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const results = await searchTitles(query);
      onSearchResults(results);
    } catch (err) {
      setError(err.message || "An error occurred during search");
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setError("");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header row */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Tooltip title="My Watchlist">
            <IconButton
              onClick={onOpenWatchlist}
              sx={{
                color: "primary.main",
                backgroundColor: "rgba(229, 9, 20, 0.08)",
                "&:hover": { backgroundColor: "rgba(229, 9, 20, 0.15)" },
              }}
            >
              <Badge badgeContent={watchlistCount} color="primary">
                <BookmarkIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Hero section */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2em", md: "3em" },
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(135deg, #e50914 0%, #ff4444 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Where Can I Watch This?
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 4 }}>
              Discover where any movie or TV show streams — worldwide, across every platform
            </Typography>
          </motion.div>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", justifyContent: "center" }}
          >
            <TextField
              placeholder="Enter a movie or TV show title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              variant="outlined"
              size="large"
              sx={{
                flex: 1,
                minWidth: 250,
                maxWidth: 440,
                "& .MuiOutlinedInput-root": { borderRadius: 4 },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              sx={{
                background: "#e50914",
                "&:hover": { background: "#c40812" },
                borderRadius: 4,
                px: 4,
                textTransform: "none",
                fontSize: "1em",
              }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
            {query && (
              <Button
                type="button"
                variant="outlined"
                size="large"
                disabled={loading}
                startIcon={<ClearIcon />}
                onClick={handleClear}
                sx={{ borderRadius: 4, px: 4, textTransform: "none", fontSize: "1em" }}
              >
                Clear
              </Button>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2, maxWidth: 500, mx: "auto" }}>
              {error}
            </Alert>
          )}
        </Box>

        {/* Trending section */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 4,
                height: 24,
                borderRadius: 1,
                background: "linear-gradient(180deg, #e50914, #ff4444)",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              Trending This Week
            </Typography>
          </Stack>

          {trendingLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </Box>
          ) : trending.length === 0 ? null : (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 2,
                scrollbarWidth: "thin",
                scrollbarColor: "#e50914 #1a1a1a",
                "&::-webkit-scrollbar": { height: 6 },
                "&::-webkit-scrollbar-track": { background: "#1a1a1a", borderRadius: 3 },
                "&::-webkit-scrollbar-thumb": { background: "#e50914", borderRadius: 3 },
              }}
            >
              {trending.map((item, index) => (
                <Box
                  key={`${item.id}-${item.type}`}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  sx={{ flexShrink: 0, width: 140, position: "relative" }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ y: -6 }}
                    onClick={() => onSelectTitle(item)}
                    sx={{
                      cursor: "pointer",
                      overflow: "hidden",
                      "&:hover .trending-overlay": { opacity: 1 },
                    }}
                  >
                    <Box sx={{ position: "relative", aspectRatio: "2/3" }}>
                      <CardMedia
                        component="img"
                        image={item.poster}
                        alt={item.title}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      {/* Gradient overlay */}
                      <Box
                        className="trending-overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "white", fontWeight: 700, lineHeight: 1.2 }}>
                          {item.title}
                        </Typography>
                      </Box>
                      {/* Watchlist button */}
                      <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(item); }}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          backgroundColor: "rgba(0,0,0,0.6)",
                          color: isInWatchlist(item) ? "primary.main" : "white",
                          p: 0.5,
                          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                        }}
                      >
                        {isInWatchlist(item) ? <BookmarkIcon sx={{ fontSize: 16 }} /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
                      </IconButton>
                      {/* Rank number */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          backgroundColor: "primary.main",
                          color: "white",
                          borderRadius: "50%",
                          width: 22,
                          height: 22,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                  </Card>
                  <Box sx={{ mt: 0.75, px: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.25 }}>
                      <Chip
                        label={item.type === "movie" ? "Movie" : "TV"}
                        size="small"
                        color="primary"
                        sx={{ height: 18, fontSize: "0.6rem", fontWeight: 700 }}
                      />
                      {item.year && (
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
                          {item.year}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SearchPage;
