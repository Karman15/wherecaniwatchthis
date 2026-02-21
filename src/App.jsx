import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./App.css";
import DetailsPage from "./pages/DetailsPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";
import muiTheme from "./theme/muiTheme";

const App = () => {
  const [currentPage, setCurrentPage] = useState("search"); // 'search' | 'results' | 'details'
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage("results");
  };

  const handleSelectTitle = (title) => {
    setSelectedTitle(title);
    setCurrentPage("details");
  };

  const handleBackToSearch = () => {
    setCurrentPage("search");
    setSearchResults([]);
    setSelectedTitle(null);
  };

  const handleBackToResults = () => {
    setCurrentPage("results");
    setSelectedTitle(null);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0f0f0f",
          py: 2,
        }}
      >
        <AnimatePresence mode="wait">
          {currentPage === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchPage
                onSearchResults={handleSearchResults}
                onLoading={setIsLoading}
              />
            </motion.div>
          )}

          {currentPage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsPage
                results={searchResults}
                loading={isLoading}
                onSelectTitle={handleSelectTitle}
                onBackToSearch={handleBackToSearch}
              />
            </motion.div>
          )}

          {currentPage === "details" && selectedTitle && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DetailsPage title={selectedTitle} onBack={handleBackToResults} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default App;
