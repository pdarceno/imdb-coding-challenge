import React, { useState } from "react";
import { searchMovies } from "../services/api";
import { Link } from "react-router-dom";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg mr-2"
          placeholder="Search movies..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie: any) => (
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
