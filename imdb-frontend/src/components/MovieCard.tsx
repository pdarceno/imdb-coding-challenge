import { Link } from "react-router-dom";
import { MovieSearchResultType } from "../types/movies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <Card className="w-[160px] sm:w-[193px] bg-gray-900 hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[193/287]">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/api/placeholder/193/287"
              }
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 space-y-1">
          <h3 className="text-sm sm:text-base text-white font-medium line-clamp-2">
            {movie.Title}
          </h3>
          <p className="text-xs text-gray-400">{movie.Year}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
