import { useState } from "react";
import { searchMovies } from "../services/api";
import SearchBar from "./SearchBar";
import { MovieSearchResultType } from "../types/movies";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const [movies, setMovies] = useState<MovieSearchResultType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <SearchBar onSearch={handleSearch} isLoading={loading} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieSearch;
