import { Link } from "react-router-dom";
import { MovieSearchResultType } from "../types/movies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFavorites } from "@/contexts/FavoritesProvider";
import { X, Plus } from "lucide-react";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { favorites, toggleFavorite, loading } = useFavorites();
  const isFavorited = favorites.includes(movie.imdbID);

  return (
    <Card className="h-full bg-card hover:shadow-lg transition-shadow overflow-hidden relative">
      <Link to={`/movie/${movie.imdbID}`} className="block w-full sm:w-auto">
        <CardHeader className="p-0 relative">
          {/* AspectRatio ensures the correct dimensions */}
          <AspectRatio ratio={158 / 240}>
            <div className="relative">
              {/* Movie Poster */}
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/imdb.svg"}
                alt={movie.Title}
                className="object-cover w-full h-full"
              />

              {/* Bookmark */}

              <div
                className={`absolute top-0 left-0 cursor-pointer ${
                  loading[movie.imdbID] ? "opacity-50" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  if (!loading[movie.imdbID]) {
                    toggleFavorite(movie.imdbID);
                  }
                }}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <img
                  src="/bookmark.svg"
                  alt=""
                  className="w-8 h-full rounded-br-lg opacity-50"
                />

                {/* Overlay the Icon */}
                <div className="absolute top-3 left-2">
                  {isFavorited ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </AspectRatio>
        </CardHeader>
      </Link>

      <CardContent className="p-3 sm:p-4 space-y-1">
        <Link to={`/movie/${movie.imdbID}`} className="block w-full sm:w-auto">
          <h3 className="text-sm sm:text-base text-primary font-medium line-clamp-2">
            {movie.Title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{movie.Year}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
