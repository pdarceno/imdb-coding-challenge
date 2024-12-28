import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import { useInvalidateCache } from "./hooks/useInvalidateCache";

// Add dark class
document.documentElement.classList.add("dark");

const App = () => {
  useInvalidateCache(30); // Clear cache every 30 minutes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
