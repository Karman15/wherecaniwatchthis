import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = ({ availableCountries }) => {
  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);
  const zoomableGroupRef = useRef();

  useEffect(() => {
    const countrySet = new Set(availableCountries);
    setSelectedCountries(countrySet);
  }, [availableCountries]);

  const handleResetZoom = () => {
    // Change the key to force ZoomableGroup to remount and reset
    setResetKey((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 200,
          center: [5, 15],
        }}
        width={1200}
        height={600}
      >
        <ZoomableGroup
          key={resetKey}
          ref={zoomableGroupRef}
          minZoom={1}
          maxZoom={10}
          onMove={(position) => {
            // Track move if needed
          }}
        >
          <Geographies geography={geoUrl}>
          {({ geographies }) => {
            return geographies.map((geo) => {
              const countryName = geo.properties.name;
              const isAvailable = selectedCountries.has(countryName);
              const isHovered = hoveredCountry === countryName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(geo) => {
                    setHoveredCountry(countryName);
                  }}
                  onMouseLeave={() => {
                    setHoveredCountry(null);
                  }}
                  style={{
                    default: {
                      fill: isAvailable ? "#E50914" : "#E8E8E8",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: isAvailable ? "#B80710" : "#D0D0D0",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    },
                    pressed: {
                      fill: "#E50914",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              );
            });
          }}
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredCountry && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 30}px`,
            transform: "translateX(-50%)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {hoveredCountry}
        </Box>
      )}

      {/* Reset Zoom Button */}
      <IconButton
        onClick={handleResetZoom}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          color: "primary.main",
          zIndex: 20,
          "&:hover": {
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        }}
        title="Reset map to default position"
      >
        <RestartAltIcon />
      </IconButton>
    </Box>
  );
};

export default WorldMap;
