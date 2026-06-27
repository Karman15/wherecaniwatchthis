import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const ResultsPage = ({ results, loading, onSelectTitle, onBackToSearch, onOpenWatchlist, watchlistCount, toggleWatchlist, isInWatchlist }) => {
  const filteredResults = results.filter((result) => result.poster);
  const sortedResults = [...filteredResults].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Button startIcon={<ArrowBackIcon />} onClick={onBackToSearch} variant="text" sx={{ mb: 3, textTransform: "none", fontSize: "1em" }}>
            Back to Search
          </Button>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Searching for titles...</Typography>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={i}>
                <Card sx={{ height: "100%" }}>
                  <Skeleton variant="rectangular" height={300} />
                  <CardContent>
                    <Skeleton variant="text" height={25} />
                    <Skeleton variant="text" height={20} width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Top bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBackToSearch}
            variant="text"
            sx={{ textTransform: "none", fontSize: "1em", color: "primary.main", "&:hover": { backgroundColor: "rgba(229, 9, 20, 0.08)" } }}
          >
            Back to Search
          </Button>
          <Tooltip title="My Watchlist">
            <IconButton
              onClick={onOpenWatchlist}
              sx={{ color: "primary.main", backgroundColor: "rgba(229, 9, 20, 0.08)", "&:hover": { backgroundColor: "rgba(229, 9, 20, 0.15)" } }}
            >
              <Badge badgeContent={watchlistCount} color="primary">
                <BookmarkIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Search Results</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Found <strong>{sortedResults.length}</strong> title{sortedResults.length !== 1 ? "s" : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }, gap: 2.5 }}>
          {sortedResults.map((result, index) => (
            <Box
              key={`${result.id}-${result.type}`}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card
                component={motion.div}
                whileHover={{ y: -8 }}
                onClick={() => onSelectTitle(result)}
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                    "& .card-image": { transform: "scale(1.05)" },
                  },
                }}
              >
                {/* Image */}
                <Box sx={{ position: "relative" }}>
                  <Box
                    className="card-image"
                    sx={{ width: "100%", aspectRatio: "2/3", overflow: "hidden", backgroundColor: "#2a2a2a", transition: "transform 0.3s ease" }}
                  >
                    <CardMedia
                      component="img"
                      image={result.poster}
                      alt={result.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  {/* Watchlist button overlay */}
                  <Tooltip title={isInWatchlist(result) ? "Remove from Watchlist" : "Add to Watchlist"}>
                    <IconButton
                      size="small"
                      onClick={(e) => { e.stopPropagation(); toggleWatchlist(result); }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0,0,0,0.65)",
                        color: isInWatchlist(result) ? "primary.main" : "white",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.85)" },
                      }}
                    >
                      {isInWatchlist(result) ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Content */}
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.3,
                    }}
                  >
                    {result.title}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                    <Chip label={result.type.toUpperCase()} size="small" color="primary" variant="filled" sx={{ fontWeight: 600, height: 24 }} />
                    {result.year && (
                      <Typography variant="caption" sx={{ display: "flex", alignItems: "center", color: "text.secondary", fontWeight: 500 }}>
                        {result.year}
                      </Typography>
                    )}
                  </Stack>
                  {result.rating > 0 && (
                    <Box sx={{ mt: "auto" }}>
                      <Rating value={result.rating / 2} readOnly size="small" precision={0.5} sx={{ fontSize: "1rem" }} />
                      <Typography variant="caption" sx={{ color: "text.secondary", ml: 0.5 }}>
                        {result.rating.toFixed(1)}/10
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {sortedResults.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              No titles found. Try searching for something else.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ResultsPage;
