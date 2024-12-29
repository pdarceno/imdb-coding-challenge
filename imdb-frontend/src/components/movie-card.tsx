import { Link } from "react-router-dom";
import { MovieSearchResultType } from "../types/movies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFavorites } from "@/contexts/favorites-provider";
import { X, Plus } from "lucide-react";

interface MovieCardProps {
  movie: MovieSearchResultType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { favorites, toggleFavorite, loading } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.parentId === movie.imdbID);

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

              {/* Bookmark */}

              <div
                className={`absolute top-0 left-0 cursor-pointer ${
                  loading[movie.imdbID] ? "opacity-50" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  if (!loading[movie.imdbID]) {
                    // this can be imdbId only. cards do not display episodes individually
                    toggleFavorite(movie.imdbID, movie.Title);
                  }
                }}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <img
                  src="/bookmark.svg"
                  alt=""
                  className="w-12 md:w-8 h-full rounded-tl-lg opacity-70"
                />

                {/* Overlay the Icon */}
                <div className="absolute top-3 left-2 text-white">
                  {isFavorited ? (
                    <X className="w-8 h-8 md:w-4 md:h-4" />
                  ) : (
                    <Plus className="w-8 h-8 md:w-4 md:h-4" />
                  )}
                </div>
              </div>
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
