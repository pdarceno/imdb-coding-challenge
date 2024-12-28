import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { MovieSearchResultType } from "../types/movies";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="w-[160px] sm:w-[193px] bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* TODO: Import a Card I could use for here */}
      {/* Poster Container */}
      <div className="relative w-full aspect-[193/287]">
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/193/287"
          }
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          {/* TODO: return rating to add here */}
          {/* <span className="ml-1 text-sm sm:text-base text-white">
            {movie.Rating || "8.5"}
          </span> */}
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base text-white font-medium line-clamp-2">
          {movie.Title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
