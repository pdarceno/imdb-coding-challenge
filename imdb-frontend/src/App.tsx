import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import { useInvalidateCache } from "./hooks/useInvalidateCache";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
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
          </Routes>
          <Footer />
        </ThemeProvider>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
