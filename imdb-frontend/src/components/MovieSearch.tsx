import { useState } from "react";
import { searchMovies } from "../services/api";
import SearchBar from "./SearchBar";
import { MovieSearchResultType } from "../types/movies";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const [movies, setMovies] = useState<MovieSearchResultType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default MovieSearch;
