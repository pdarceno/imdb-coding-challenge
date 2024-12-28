import { Link } from "react-router-dom";
import { MovieSearchResultType } from "../types/movies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block w-full sm:w-auto">
      <Card className="h-full bg-card hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="p-0">
          <AspectRatio ratio={158 / 240}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/imdb.svg"}
              alt={movie.Title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 space-y-1">
          <h3 className="text-sm sm:text-base text-primary font-medium line-clamp-2">
            {movie.Title}
          </h3>
          <p className="text-xs text-gray-400">{movie.Year}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
