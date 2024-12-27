import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockMovieDetailsApi } from "../mock/mockApi"; // Import the mock API

interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Plot: string;
  Actors: string;
  Director: string;
  imdbRating: string;
  Poster: string;
  Genre: string;
  Runtime: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const details = await mockMovieDetailsApi(id); // Use the mock API
        setMovie(details);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-auto mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
      <p className="text-gray-600 mb-4">{movie.Year}</p>
      <p className="mb-4">{movie.Plot}</p>
      <ul>
        <li>
          <strong>Genre:</strong> {movie.Genre}
        </li>
        <li>
          <strong>Director:</strong> {movie.Director}
        </li>
        <li>
          <strong>Actors:</strong> {movie.Actors}
        </li>
        <li>
          <strong>IMDB Rating:</strong> {movie.imdbRating}
        </li>
        <li>
          <strong>Runtime:</strong> {movie.Runtime}
        </li>
      </ul>
    </div>
  );
};

export default MovieDetails;
