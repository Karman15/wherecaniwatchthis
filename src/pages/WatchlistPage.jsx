import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const WatchlistPage = ({ watchlist, onSelectTitle, onBack, toggleWatchlist }) => {
  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="text"
          sx={{ mb: 3, textTransform: "none", fontSize: "1em", color: "primary.main", "&:hover": { backgroundColor: "rgba(229, 9, 20, 0.08)" } }}
        >
          Back to Search
        </Button>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>My Watchlist</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {watchlist.length === 0
              ? "No titles saved yet"
              : `${watchlist.length} title${watchlist.length !== 1 ? "s" : ""} saved`}
          </Typography>
        </Box>

        {watchlist.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 12,
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 4,
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>🎬</Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>Your watchlist is empty</Typography>
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              Click the bookmark icon on any title to save it here
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }, gap: 2.5 }}>
            {watchlist.map((item, index) => (
              <Box
                key={`${item.id}-${item.type}`}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card
                  component={motion.div}
                  whileHover={{ y: -8 }}
                  onClick={() => onSelectTitle(item)}
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      "& .card-image": { transform: "scale(1.05)" },
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box
                      className="card-image"
                      sx={{ width: "100%", aspectRatio: "2/3", overflow: "hidden", backgroundColor: "#2a2a2a", transition: "transform 0.3s ease" }}
                    >
                      {item.poster ? (
                        <CardMedia
                          component="img"
                          image={item.poster}
                          alt={item.title}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                          🎬
                        </Box>
                      )}
                    </Box>
                    {/* Remove button */}
                    <Tooltip title="Remove from Watchlist">
                      <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(item); }}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(229,9,20,0.85)",
                          color: "white",
                          "&:hover": { backgroundColor: "rgba(180,5,12,0.95)" },
                        }}
                      >
                        <BookmarkRemoveIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

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
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                      <Chip label={item.type.toUpperCase()} size="small" color="primary" sx={{ fontWeight: 600, height: 24 }} />
                      {item.year && (
                        <Typography variant="caption" sx={{ display: "flex", alignItems: "center", color: "text.secondary", fontWeight: 500 }}>
                          {item.year}
                        </Typography>
                      )}
                    </Stack>
                    {item.rating > 0 && (
                      <Box sx={{ mt: "auto" }}>
                        <Rating value={item.rating / 2} readOnly size="small" precision={0.5} sx={{ fontSize: "1rem" }} />
                        <Typography variant="caption" sx={{ color: "text.secondary", ml: 0.5 }}>
                          {item.rating.toFixed(1)}/10
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default WatchlistPage;
