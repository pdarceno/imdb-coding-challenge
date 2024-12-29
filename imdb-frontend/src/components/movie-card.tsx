import { Link } from "react-router-dom";
import { MovieSearchResultType } from "../types/movies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Bookmark from "./ui/bookmark";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="h-full bg-card hover:shadow-lg transition-shadow overflow-hidden relative">
      <Link to={`/movie/${movie.imdbID}`} className="block w-full">
        <CardHeader className="p-0">
          {/* AspectRatio ensures the correct dimensions */}
          <AspectRatio ratio={158 / 240}>
            <div className="relative w-full h-full bg-muted hover:opacity-70">
              {/* Movie Poster with fallback */}
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/imdb.svg";
                    img.classList.remove("object-cover");
                    img.classList.add("object-contain", "p-4");
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 bg-muted">
                  <img
                    src="/imdb.svg"
                    alt="IMDb Logo"
                    className="w-full h-auto object-contain opacity-50"
                  />
                </div>
              )}

              <Bookmark id={movie.imdbID} title={movie.Title} />
            </div>
          </AspectRatio>
        </CardHeader>
      </Link>

      <CardContent className="p-3 space-y-1">
        <Link to={`/movie/${movie.imdbID}`} className="block">
          <h3 className="text-sm font-medium text-primary line-clamp-2 hover:underline">
            {movie.Title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{movie.Year}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
