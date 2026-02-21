import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { searchTitles } from "../services/api";

const SearchPage = ({ onSearchResults, onLoading }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <Container maxWidth="md">
      <Box sx={{ py: 4, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "3em",
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #e50914 0%, #ff4444 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🎬 Where Can I Watch This?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 4,
            }}
          >
            Find movies and TV shows on Netflix and see which countries they're
            available in!
          </Typography>
        </motion.div>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
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
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <SearchIcon />
            }
            sx={{
              background: "#e50914",
              "&:hover": {
                background: "#c40812",
              },
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
              sx={{
                borderRadius: 4,
                px: 4,
                textTransform: "none",
                fontSize: "1em",
              }}
            >
              Clear
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;
