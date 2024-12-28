import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import { useInvalidateCache } from "./hooks/useInvalidateCache";

const App = () => {
  useInvalidateCache(30); // Clear cache every 30 minutes
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
