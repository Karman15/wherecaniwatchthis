import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./App.css";
import DetailsPage from "./pages/DetailsPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import muiTheme from "./theme/muiTheme";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("search");
  const [previousPage, setPreviousPage] = useState("search");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch {
      return [];
    }
  });

  const toggleWatchlist = (title) => {
    setWatchlist((prev) => {
      const exists = prev.some((t) => t.id === title.id && t.type === title.type);
      const next = exists
        ? prev.filter((t) => !(t.id === title.id && t.type === title.type))
        : [...prev, title];
      localStorage.setItem("watchlist", JSON.stringify(next));
      return next;
    });
  };

  const isInWatchlist = (title) =>
    watchlist.some((t) => t.id === title.id && t.type === title.type);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage("results");
  };

  const handleSelectTitle = (title, from = "results") => {
    setSelectedTitle(title);
    setPreviousPage(from);
    setCurrentPage("details");
  };

  const handleBackToSearch = () => {
    setCurrentPage("search");
    setSearchResults([]);
    setSelectedTitle(null);
  };

  const handleBackFromDetails = () => {
    setCurrentPage(previousPage);
    setSelectedTitle(null);
  };

  const handleOpenWatchlist = () => {
    setCurrentPage("watchlist");
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", background: "#0f0f0f", py: 2 }}>
        <AnimatePresence mode="wait">
          {currentPage === "search" && (
            <motion.div key="search" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <SearchPage
                onSearchResults={handleSearchResults}
                onLoading={setIsLoading}
                onSelectTitle={(t) => handleSelectTitle(t, "search")}
                onOpenWatchlist={handleOpenWatchlist}
                watchlistCount={watchlist.length}
                toggleWatchlist={toggleWatchlist}
                isInWatchlist={isInWatchlist}
              />
            </motion.div>
          )}

          {currentPage === "results" && (
            <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <ResultsPage
                results={searchResults}
                loading={isLoading}
                onSelectTitle={(t) => handleSelectTitle(t, "results")}
                onBackToSearch={handleBackToSearch}
                onOpenWatchlist={handleOpenWatchlist}
                watchlistCount={watchlist.length}
                toggleWatchlist={toggleWatchlist}
                isInWatchlist={isInWatchlist}
              />
            </motion.div>
          )}

          {currentPage === "details" && selectedTitle && (
            <motion.div key="details" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <DetailsPage
                title={selectedTitle}
                onBack={handleBackFromDetails}
                toggleWatchlist={toggleWatchlist}
                isInWatchlist={isInWatchlist}
              />
            </motion.div>
          )}

          {currentPage === "watchlist" && (
            <motion.div key="watchlist" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <WatchlistPage
                watchlist={watchlist}
                onSelectTitle={(t) => handleSelectTitle(t, "watchlist")}
                onBack={handleBackToSearch}
                toggleWatchlist={toggleWatchlist}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default App;
