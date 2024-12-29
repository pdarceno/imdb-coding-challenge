import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "@/pages/movie-search";
import MovieDetails from "@/pages/movie-details";
import SeasonDetails from "@/pages/season-details";
import { useInvalidateCache } from "@/hooks/use-invalidate-cache";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/contexts/theme-provider";
import { FavoritesProvider } from "@/contexts/favorites-provider";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  useInvalidateCache(30); // Clear cache every 30 minutes
  return (
    <Router>
      <Toaster />
      <FavoritesProvider>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route
              path="/movie/:id/season/:seasonNumber"
              element={<SeasonDetails />}
            />
            <Route
              path="/movie/:id/season/:seasonNumber/episode/:episodeNumber"
              element={<MovieDetails />}
            />
          </Routes>
          <Footer />
        </ThemeProvider>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
