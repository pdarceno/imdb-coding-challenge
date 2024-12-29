import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEpisodeDetails, getMovieDetails } from "../services/api";
import { MovieDetailsType } from "../types/movies";
import MovieDetailsSkeleton from "./movie-details-skeleton";
import { Badge } from "../components/ui/badge";
import {
  isValidField,
  isValidArrayField,
  isTVSeries,
  isEpisode,
} from "../utils/movie";
import { movieCache } from "../utils/cache";
import MovieBreadcrumbs from "../components/movie-breadcrumbs";
import Bookmark from "@/components/ui/bookmark";

const renderSeasonInfo = (parentId: string, movie: MovieDetailsType) => {
  if (isTVSeries(movie) && isValidField(movie.totalSeasons)) {
    const totalSeasons = parseInt(movie.totalSeasons!);
    return (
      <div>
        <h2 className="text-muted-foreground font-semibold mb-1">Seasons</h2>
        <p>
          {Array.from({ length: totalSeasons }, (_, i) => i + 1).map(
            (seasonNum, index) => (
              <span key={seasonNum}>
                <Link
                  to={`/movie/${parentId}/season/${seasonNum}`}
                  className="hover:text-primary transition-colors"
                >
                  Season {seasonNum}
                </Link>
                {index < totalSeasons - 1 && (
                  <span className="mx-2 text-muted-foreground">·</span>
                )}
              </span>
            )
          )}
        </p>
      </div>
    );
  }
  if (isEpisode(movie)) {
    return (
      <div>
        <h2 className="text-muted-foreground font-semibold mb-1">Other Info</h2>
        <p>
          <Link
            to={`/movie/${parentId}/season/${movie.Season}`}
            className="hover:text-primary transition-colors"
          >
            Season {movie.Season}
          </Link>
          <span className="mx-2 text-muted-foreground">·</span>
          Episode {movie.Episode}
        </p>
      </div>
    );
  }
  return null;
};

const MovieDetails = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [seriesTitle, setSeriesTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        let data;
        let cacheKey;

        // If we're looking at an episode, first get the series title
        if (seasonNumber && episodeNumber) {
          // Try to get series title from cache first
          const seriesCacheKey = `movie-${id}`;
          const cachedSeriesData =
            movieCache.get<MovieDetailsType>(seriesCacheKey);

          if (cachedSeriesData) {
            setSeriesTitle(cachedSeriesData.Title);
          } else {
            // If not in cache, fetch series details
            const seriesData = await getMovieDetails(id);
            setSeriesTitle(seriesData.Title);
            movieCache.set(seriesCacheKey, seriesData);
          }

          // Now get episode details
          cacheKey = `episode-${id}-${seasonNumber}-${episodeNumber}`;
          const cachedData = movieCache.get<MovieDetailsType>(cacheKey);

          if (cachedData) {
            setMovie(cachedData);
            setLoading(false);
            return;
          }

          data = await getEpisodeDetails(
            id,
            parseInt(seasonNumber),
            parseInt(episodeNumber)
          );
        } else {
          // Regular movie/show details fetch
          cacheKey = `movie-${id}`;
          const cachedData = movieCache.get<MovieDetailsType>(cacheKey);

          if (cachedData) {
            setMovie(cachedData);
            setSeriesTitle(cachedData.Title);
            setLoading(false);
            return;
          }

          data = await getMovieDetails(id);
          setSeriesTitle(data.Title);
        }

        setMovie(data);
        // setIsCached(false);
        movieCache.set(cacheKey!, data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, seasonNumber, episodeNumber]);

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
        {/* Content */}
        <div className="relative max-w-screen-xl mx-auto py-4 sm:py-6">
          <div className="w-full px-5">
            {/* Use seriesTitle for breadcrumbs */}
            <MovieBreadcrumbs
              title={seriesTitle}
              id={id!}
              seasonNumber={seasonNumber}
              episodeNumber={episodeNumber}
              currentTitle={movie?.Title} // Pass current episode title if needed
              className="md:pb-2"
            />
            {/* Title moved to top on mobile */}
            <h1 className="text-4xl font-bold text-foreground mb-1 md:hidden">
              {movie.Title}
            </h1>

            {/* Release and quick notes, hidden on mobile, shown on desktop */}
            <div className="sm:hidden flex items-center gap-4 mb-4 text-muted-foreground font-semibold">
              {[
                isValidField(movie.Released) && `Released ${movie.Released}`,
                isValidField(movie.Runtime) && movie.Runtime,
                isValidField(movie.Rated) && movie.Rated,
              ]
                .filter(Boolean)
                .join(" • ")}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 relative">
                <div className="relative w-full aspect-[2/3] bg-muted hover:opacity-90 rounded-lg">
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/imdb.svg";
                        img.classList.remove("object-cover");
                        img.classList.add("object-contain", "p-4");
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-muted rounded-lg">
                      <img
                        src="/imdb.svg"
                        alt="IMDb Logo"
                        className="w-full h-auto object-contain opacity-50"
                      />
                    </div>
                  )}
                </div>
                <Bookmark
                  id={id!}
                  title={movie.Title}
                  episodeId={movie.imdbID}
                  episodeNumber={episodeNumber}
                />
              </div>

              {/* Details */}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  {/* Title hidden on mobile, shown on desktop */}
                  <h1 className="hidden md:block text-4xl font-bold text-foreground">
                    {movie.Title}
                  </h1>
                  {/* Rating hidden on mobile, shown on desktop */}
                  <div className="hidden md:flex items-center gap-8">
                    {imdbRating !== "N/A" && (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-2xl">★</span>
                          <span className="text-2xl font-bold">
                            {imdbRating.split("/")[0]}
                          </span>
                          <span className="text-muted-foreground font-semibold">
                            /10
                          </span>
                        </div>
                        {isValidField(movie.imdbVotes) && (
                          <div className="text-muted-foreground font-semibold text-sm text-center">
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

                {/* Release and quick notes, hidden on mobile, shown on desktop */}
                <div className="hidden md:flex items-center gap-4 mb-6 text-muted-foreground font-semibold">
                  {[
                    isValidField(movie.Released) &&
                      `Released ${movie.Released}`,
                    isValidField(movie.Runtime) && movie.Runtime,
                    isValidField(movie.Rated) && movie.Rated,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </div>
                {isValidArrayField(movie.Genre) && (
                  <div className="flex flex-wrap gap-2 md:mb-6">
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

                {/* Rating moved below genres on mobile */}
                {imdbRating !== "N/A" && (
                  <div className="mt-2 mb-2 md:hidden">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-2xl">★</span>
                        <span className="text-2xl font-bold">
                          {imdbRating.split("/")[0]}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          /10
                        </span>
                      </div>
                      {isValidField(movie.imdbVotes) && (
                        <div className="ml-1 text-muted-foreground font-semibold text-sm">
                          {Number(
                            movie.imdbVotes!.replace(/,/g, "")
                          ).toLocaleString()}{" "}
                          votes
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isValidField(movie.Plot) && (
                  <p className="text-lg mb-8 text-foreground">{movie.Plot}</p>
                )}

                {/* Main Credits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {isValidArrayField(movie.Director) && (
                    <div>
                      <h2 className="text-muted-foreground font-semibold mb-1">
                        Director
                      </h2>
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
                      <h2 className="text-muted-foreground font-semibold mb-1">
                        Writers
                      </h2>
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
                      <h2 className="text-muted-foreground font-semibold mb-1">
                        Stars
                      </h2>
                      <p>
                        {movie.Actors?.split(",")
                          .filter(Boolean)
                          .map((actor) => actor.trim())
                          .join(" · ")}
                      </p>
                    </div>
                  )}
                  {renderSeasonInfo(id!, movie)}
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  {isValidField(movie.Awards) && (
                    <div>
                      <h2 className="text-muted-foreground font-semibold mb-1">
                        Awards
                      </h2>
                      <p>{movie.Awards}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isValidField(movie.Country) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          Country
                        </h2>
                        <p>{movie.Country}</p>
                      </div>
                    )}
                    {isValidField(movie.Language) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          Language
                        </h2>
                        <p>{movie.Language}</p>
                      </div>
                    )}
                    {isValidField(movie.Production) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          Production
                        </h2>
                        <p>{movie.Production}</p>
                      </div>
                    )}
                    {isValidField(movie.BoxOffice) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          Box Office
                        </h2>
                        <p>{movie.BoxOffice}</p>
                      </div>
                    )}
                    {isValidField(movie.DVD) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          DVD Release
                        </h2>
                        <p>{movie.DVD}</p>
                      </div>
                    )}
                    {isValidField(movie.Website) && (
                      <div>
                        <h2 className="text-muted-foreground font-semibold mb-1">
                          Website
                        </h2>
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
                        <div className="text-sm text-muted-foreground font-semibold">
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
