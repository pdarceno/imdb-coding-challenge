import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { MovieDetailsType } from "../types/movies";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id!);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-gray-600 mb-4">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>
          <p className="mb-4">{movie.Plot}</p>
          <div className="mb-4">
            <strong>Director:</strong> {movie.Director}
          </div>
          <div className="mb-4">
            <strong>Cast:</strong> {movie.Actors}
          </div>
          <div className="mb-4">
            <strong>Genre:</strong> {movie.Genre}
          </div>
          <div className="mb-4">
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
