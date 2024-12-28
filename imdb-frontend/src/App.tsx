import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";

const App = () => {
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
