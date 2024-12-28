import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { MovieDetailsType } from "../types/movies";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { Badge } from "./ui/badge";
import {
  isValidField,
  isValidArrayField,
  isTVSeries,
  isEpisode,
} from "../utils/movie";
import { movieCache } from "../utils/cache";
import { useFavorites } from "@/contexts/FavoritesProvider";
import { Plus, X } from "lucide-react";

const renderSeasonInfo = (movie: MovieDetailsType) => {
  if (isTVSeries(movie) && isValidField(movie.totalSeasons)) {
    return (
      <div>
        <h2 className="text-muted-foreground mb-1">Seasons</h2>
        <p>{movie.totalSeasons} Seasons</p>
      </div>
    );
  }
  if (isEpisode(movie)) {
    return (
      <div>
        <h2 className="text-muted-foreground mb-1">Episode Info</h2>
        <p>
          Season {movie.Season}, Episode {movie.Episode}
        </p>
      </div>
    );
  }
  return null;
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const {
    favorites,
    toggleFavorite,
    loading: loadingFavorite,
  } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === id!);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Check if data is in cache
        const cacheKey = `movie-${id}`;
        const cachedData = movieCache.get<MovieDetailsType>(cacheKey);

        if (cachedData) {
          setMovie(cachedData);
          setIsCached(true);
          setLoading(false);

          return;
        }

        // If not in cache, fetch from API
        const data = await getMovieDetails(id);
        setMovie(data);
        setIsCached(false);

        // Store in cache
        movieCache.set(cacheKey, data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <MovieDetailsSkeleton />;

  if (!movie || movie.Response === "False") {
    return (
      <div className="min-h-[calc(100vh-268.85px)] bg-background text-foreground p-8">
        {movie?.Error || "Movie not found"}
      </div>
    );
  }

  // Get IMDB rating from Ratings array or fallback to imdbRating field
  const imdbRating =
    movie.Ratings?.find((rating) => rating.Source === "Internet Movie Database")
      ?.Value ||
    movie.imdbRating ||
    "N/A";

  return (
    <div className="min-h-[calc(100vh-268.85px)] w-full bg-background text-foreground">
      {/* Backdrop image with overlay */}
      <div className="relative h-full w-full">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/imdb.svg"}
          alt={movie.Title}
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-3xl"
        />
        {isCached && (
          <p className="text-sm text-muted-foreground mb-2">
            Results loaded from cache
          </p>
        )}

        {/* Content */}
        <div className="relative max-w-screen-xl mx-auto py-4 sm:py-6">
          <div className="w-full px-5">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 relative">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/imdb.svg"}
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-2xl"
                />
                <div
                  className={`absolute top-0 left-0 cursor-pointer ${
                    loadingFavorite[movie.imdbID] ? "opacity-50" : ""
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (!loadingFavorite[movie.imdbID]) {
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
                    className="w-10 h-full rounded-br-lg opacity-50"
                  />

                  {/* Overlay the Icon */}
                  <div className="absolute top-3 left-2">
                    {isFavorited ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  {/* Dont need validating */}
                  <h1 className="text-4xl font-bold text-foreground">
                    {movie.Title}
                  </h1>
                  <div className="flex items-center gap-8">
                    {imdbRating !== "N/A" && (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-2xl">★</span>
                          <span className="text-2xl font-bold">
                            {imdbRating.split("/")[0]}
                          </span>
                          <span className="text-muted-foreground">/10</span>
                        </div>
                        {isValidField(movie.imdbVotes) && (
                          <div className="text-muted-foreground text-sm text-center">
                            {Number(
                              movie.imdbVotes!.replace(/,/g, "")
                            ).toLocaleString()}{" "}
                            votes
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  {[
                    movie.Released && `Released ${movie.Released}`,
                    movie.Runtime,
                    movie.Rated,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </div>

                {isValidArrayField(movie.Genre) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.Genre!.split(",").map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {genre.trim()}
                      </Badge>
                    ))}
                  </div>
                )}

                {isValidField(movie.Plot) && (
                  <p className="text-lg mb-8 text-foreground">{movie.Plot}</p>
                )}

                {/* Main Credits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {isValidArrayField(movie.Director) && (
                    <div>
                      <h2 className="text-muted-foreground mb-1">Director</h2>
                      <p>
                        {movie.Director?.split(",")
                          .filter(Boolean)
                          .map((director) => director.trim())
                          .join(" · ")}
                      </p>
                    </div>
                  )}
                  {isValidArrayField(movie.Writer) && (
                    <div>
                      <h2 className="text-muted-foreground mb-1">Writers</h2>
                      <p>
                        {movie.Writer?.split(",")
                          .filter(Boolean)
                          .map((writer) => writer.trim())
                          .join(" · ")}
                      </p>
                    </div>
                  )}
                  {isValidArrayField(movie.Actors) && (
                    <div>
                      <h2 className="text-muted-foreground mb-1">Stars</h2>
                      <p>
                        {movie.Actors?.split(",")
                          .filter(Boolean)
                          .map((actor) => actor.trim())
                          .join(" · ")}
                      </p>
                    </div>
                  )}
                  {renderSeasonInfo(movie)}
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  {isValidField(movie.Awards) && (
                    <div>
                      <h2 className="text-muted-foreground mb-1">Awards</h2>
                      <p>{movie.Awards}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isValidField(movie.Country) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">Country</h2>
                        <p>{movie.Country}</p>
                      </div>
                    )}
                    {isValidField(movie.Language) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">Language</h2>
                        <p>{movie.Language}</p>
                      </div>
                    )}
                    {isValidField(movie.Production) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">
                          Production
                        </h2>
                        <p>{movie.Production}</p>
                      </div>
                    )}
                    {isValidField(movie.BoxOffice) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">
                          Box Office
                        </h2>
                        <p>{movie.BoxOffice}</p>
                      </div>
                    )}
                    {isValidField(movie.DVD) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">
                          DVD Release
                        </h2>
                        <p>{movie.DVD}</p>
                      </div>
                    )}
                    {isValidField(movie.Website) && (
                      <div>
                        <h2 className="text-muted-foreground mb-1">Website</h2>
                        <a
                          href={movie.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          Official Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Other Reviews Section */}
                {isValidField(movie.Metascore) && (
                  <div className="pt-8">
                    <div className="flex items-start gap-12">
                      <div>
                        <div className="mb-1">
                          <span
                            className={`px-3 py-2 text-lg font-bold ${
                              Number(movie.Metascore) >= 70
                                ? "bg-green-600"
                                : Number(movie.Metascore) >= 50
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                          >
                            {movie.Metascore}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Metascore
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
