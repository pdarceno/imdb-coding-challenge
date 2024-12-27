import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/api";
import SearchBar from "./SearchBar";
import { MovieSearchResultType } from "../types/movies";

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
    <div className="p-4">
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div key={movie.imdbID} className="border rounded-lg p-4">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-2"
              />
              <h3 className="font-bold">{movie.Title}</h3>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
