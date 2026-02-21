import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublicIcon from "@mui/icons-material/Public";
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import WorldMap from "../components/WorldMap";
import { fetchCountriesForTitle } from "../services/api";

const DetailsPage = ({ title, onBack }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchCountriesForTitle(title.id, title.type);
        setCountries(data);
      } catch (err) {
        setError(err.message || "Failed to load availability data");
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, [title]);

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="text"
          sx={{
            mb: 3,
            textTransform: "none",
            fontSize: "1em",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(229, 9, 20, 0.08)",
            },
          }}
        >
          Back to Results
        </Button>

        {/* Title Details Section */}
        <Card
          sx={{
            mb: 4,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container sx={{ minHeight: 400 }}>
            {/* Poster Image */}
            <Grid
              size={{ xs: 12, sm: 5, md: 4 }}
              sx={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              {title.poster ? (
                <CardMedia
                  component="img"
                  image={title.poster}
                  alt={title.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
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
                    color: "white",
                    fontWeight: 700,
                    borderRadius: 2,
                    fontSize: "3rem",
                  }}
                >
                  🎬
                </Box>
              )}
            </Grid>

            {/* Info Section */}
            <Grid size={{ xs: 12, sm: 7, md: 8 }} sx={{ p: 3 }}>
              <Stack spacing={2} sx={{ height: "100%", justifyContent: "center" }}>
                {/* Type Badge */}
                <Chip
                  label={title.type.toUpperCase()}
                  color="primary"
                  size="small"
                  sx={{ width: "fit-content", fontWeight: 700, height: 32, fontSize: "0.875rem" }}
                />

                {/* Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#1a1a1a",
                  }}
                >
                  {title.title}
                </Typography>

                {/* Meta Information */}
                <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                  {title.year && (
                    <Box>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Released
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {title.year}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Type
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {title.type === "movie" ? "Movie" : "TV Series"}
                    </Typography>
                  </Box>
                </Stack>

                {/* Description or Call to Action */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 1,
                    fontStyle: "italic",
                  }}
                >
                  Available in {loading ? "..." : countries.length} countries
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {/* World Map Section */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <Stack alignItems="center" spacing={2}>
              <CircularProgress />
              <Typography sx={{ color: "text.secondary" }}>
                Loading availability data...
              </Typography>
            </Stack>
          </Box>
        ) : error ? (
          <Alert
            severity="info"
            icon={<PublicIcon />}
            sx={{ borderRadius: 2, mb: 3 }}
          >
            {error}
          </Alert>
        ) : countries.length === 0 ? (
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            This title is not currently available on Netflix in any country we track.
          </Alert>
        ) : (
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
              <PublicIcon sx={{ color: "primary.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h5" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Global Availability
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                  Available in <strong>{countries.length}</strong> countries (highlighted in red)
                </Typography>
              </Box>
            </Stack>

            <WorldMap availableCountries={countries} />

            {/* Countries List */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 700, mb: 2 }}>
                Available in:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {countries.map((country, idx) => (
                  <Chip
                    key={idx}
                    label={country}
                    sx={{
                      backgroundColor: "rgba(229, 9, 20, 0.1)",
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DetailsPage;
