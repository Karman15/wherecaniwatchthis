import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import WorldMap from "../components/WorldMap";
import { fetchProviders, fetchTitleDetails } from "../services/api";

const PROVIDER_COLORS = {
  Netflix: "#E50914",
  "Disney+": "#113CCF",
  "Amazon Prime Video": "#00A8E0",
  Hulu: "#1CE783",
  Max: "#5A2D8F",
  "Apple TV+": "#888888",
  Peacock: "#0078D4",
  "Paramount+": "#0064FF",
  Crunchyroll: "#F47521",
};

const formatRuntime = (mins) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
};

const DetailsPage = ({ title, onBack, toggleWatchlist, isInWatchlist }) => {
  const [providers, setProviders] = useState({});
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("All");

  useEffect(() => {
    setLoading(true);
    setSelectedProvider("All");
    Promise.all([
      fetchProviders(title.id, title.type),
      fetchTitleDetails(title.id, title.type),
    ]).then(([pData, dData]) => {
      setProviders(pData);
      setDetails(dData);
      setLoading(false);
    });
  }, [title]);

  const providerNames = Object.keys(providers).sort();

  const activeCountries =
    selectedProvider === "All"
      ? [...new Set(Object.values(providers).flatMap((p) => p.countries))].sort()
      : providers[selectedProvider]?.countries || [];

  const activeColor =
    selectedProvider === "All" ? "#7C3AED" : (PROVIDER_COLORS[selectedProvider] || "#E50914");

  const inWatchlist = isInWatchlist(title);

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Top bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="text"
            sx={{ textTransform: "none", fontSize: "1em", color: "primary.main", "&:hover": { backgroundColor: "rgba(229, 9, 20, 0.08)" } }}
          >
            Back
          </Button>
          <Tooltip title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
            <Button
              variant={inWatchlist ? "contained" : "outlined"}
              startIcon={inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={() => toggleWatchlist(title)}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                ...(inWatchlist
                  ? { background: "#e50914", "&:hover": { background: "#c40812" } }
                  : { borderColor: "primary.main", color: "primary.main" }),
              }}
            >
              {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </Button>
          </Tooltip>
        </Box>

        {/* Hero card */}
        <Card sx={{ mb: 4, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}>
          <Grid container sx={{ minHeight: 380 }}>
            {/* Poster */}
            <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ backgroundColor: "#111", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
              {title.poster ? (
                <CardMedia
                  component="img"
                  image={title.poster}
                  alt={title.title}
                  sx={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 2 }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 350,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    fontSize: "3rem",
                  }}
                >
                  🎬
                </Box>
              )}
            </Grid>

            {/* Info */}
            <Grid size={{ xs: 12, sm: 8, md: 9 }} sx={{ p: { xs: 2, md: 4 } }}>
              <Stack spacing={2} sx={{ height: "100%", justifyContent: "center" }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                  <Chip label={title.type.toUpperCase()} color="primary" size="small" sx={{ fontWeight: 700, height: 28 }} />
                  {title.year && <Chip label={title.year} size="small" variant="outlined" sx={{ height: 28 }} />}
                  {details.runtime && <Chip label={formatRuntime(details.runtime)} size="small" variant="outlined" sx={{ height: 28 }} />}
                </Stack>

                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  {title.title}
                </Typography>

                {details.tagline && (
                  <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                    "{details.tagline}"
                  </Typography>
                )}

                {details.genres?.length > 0 && (
                  <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", gap: 0.75 }}>
                    {details.genres.map((g) => (
                      <Chip key={g} label={g} size="small" sx={{ backgroundColor: "rgba(229,9,20,0.08)", color: "primary.main", fontWeight: 600 }} />
                    ))}
                  </Stack>
                )}

                {details.overview && (
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, maxWidth: 680 }}>
                    {details.overview}
                  </Typography>
                )}

                {title.rating > 0 && (
                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                    ⭐ {title.rating.toFixed(1)} / 10
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {/* Cast section */}
        {details.cast?.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}>
              Cast
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 1,
                scrollbarWidth: "thin",
                scrollbarColor: "#e50914 #1a1a1a",
                "&::-webkit-scrollbar": { height: 5 },
                "&::-webkit-scrollbar-thumb": { background: "#e50914", borderRadius: 3 },
              }}
            >
              {details.cast.map((member, i) => (
                <Box key={i} sx={{ flexShrink: 0, width: 100, textAlign: "center" }}>
                  <Avatar
                    src={member.photo || undefined}
                    alt={member.name}
                    sx={{ width: 72, height: 72, mx: "auto", mb: 1, border: "2px solid #e50914" }}
                  >
                    {!member.photo && <PersonIcon />}
                  </Avatar>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", lineHeight: 1.2 }}>
                    {member.name}
                  </Typography>
                  {member.character && (
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.2, mt: 0.25 }}>
                      {member.character}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Divider sx={{ mt: 3 }} />
          </Box>
        )}

        {/* Streaming availability */}
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <PublicIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Streaming Availability
            </Typography>
          </Stack>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <Stack alignItems="center" spacing={2}>
                <CircularProgress />
                <Typography sx={{ color: "text.secondary" }}>Loading availability...</Typography>
              </Stack>
            </Box>
          ) : providerNames.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              No streaming availability found for this title in our supported platforms.
            </Alert>
          ) : (
            <>
              {/* Provider selector */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label={`All (${[...new Set(Object.values(providers).flatMap((p) => p.countries))].length} countries)`}
                  onClick={() => setSelectedProvider("All")}
                  sx={{
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: selectedProvider === "All" ? "#7C3AED" : "transparent",
                    color: selectedProvider === "All" ? "white" : "text.secondary",
                    border: "2px solid",
                    borderColor: selectedProvider === "All" ? "#7C3AED" : "divider",
                    "&:hover": { backgroundColor: selectedProvider === "All" ? "#6D28D9" : "action.hover" },
                  }}
                />
                {providerNames.map((name) => {
                  const color = PROVIDER_COLORS[name] || "#555";
                  const isSelected = selectedProvider === name;
                  return (
                    <Chip
                      key={name}
                      avatar={
                        providers[name].logo ? (
                          <Avatar src={providers[name].logo} sx={{ width: 20, height: 20 }} />
                        ) : undefined
                      }
                      label={`${name} (${providers[name].countries.length})`}
                      onClick={() => setSelectedProvider(name)}
                      sx={{
                        fontWeight: 700,
                        cursor: "pointer",
                        backgroundColor: isSelected ? color : "transparent",
                        color: isSelected ? "white" : "text.secondary",
                        border: "2px solid",
                        borderColor: isSelected ? color : "divider",
                        "&:hover": { backgroundColor: isSelected ? color : "action.hover", opacity: isSelected ? 0.9 : 1 },
                      }}
                    />
                  );
                })}
              </Stack>

              {/* Map */}
              {activeCountries.length === 0 ? (
                <Alert severity="warning" sx={{ borderRadius: 2, mb: 3 }}>
                  {selectedProvider} is not available in any country we track for this title.
                </Alert>
              ) : (
                <>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    <strong style={{ color: activeColor }}>{selectedProvider}</strong> — available in{" "}
                    <strong>{activeCountries.length}</strong> {activeCountries.length === 1 ? "country" : "countries"}
                  </Typography>

                  <WorldMap availableCountries={activeCountries} highlightColor={activeColor} />

                  {/* Country chips */}
                  <Box sx={{ mt: 3 }}>
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                      {activeCountries.map((country, idx) => (
                        <Chip
                          key={idx}
                          label={country}
                          size="small"
                          sx={{
                            backgroundColor: `${activeColor}1A`,
                            color: activeColor,
                            fontWeight: 600,
                            border: `1px solid ${activeColor}40`,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DetailsPage;
