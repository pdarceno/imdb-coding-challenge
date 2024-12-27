import React from "react";
import { Link } from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.imdbID}`} // Dynamic link to the movie details page
          key={movie.imdbID}
          className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800">{movie.Title}</h2>
            <p className="text-sm text-gray-600">{movie.Year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
