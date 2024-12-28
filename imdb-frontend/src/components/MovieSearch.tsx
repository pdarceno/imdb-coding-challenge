import { useState } from "react";
import { searchMovies } from "../services/api";
import SearchBar from "./SearchBar";
import { MovieSearchResultType } from "../types/movies";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const [movies, setMovies] = useState<MovieSearchResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies. Please try again."); // Show user-friendly error
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <SearchBar onSearch={handleSearch} isLoading={loading} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};
export default MovieSearch;
