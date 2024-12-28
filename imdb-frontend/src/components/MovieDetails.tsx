import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { MovieDetailsType } from "../types/movies";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
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

  if (loading) return <MovieDetailsSkeleton />;

  if (!movie || movie.Response === "False") {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop image with overlay */}
      <div className="relative h-full">
        {movie.Poster && movie.Poster !== "N/A" && (
          <img
            src={movie.Poster}
            alt="background image"
            className="absolute inset-0 h-full w-full object-cover opacity-30 blur-3xl"
          />
        )}

        {/* Content */}
        <div className="relative pt-8">
          <div className="container mx-auto px-5">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="md:w-1/4">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                    No Poster Available
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl font-bold">{movie.Title}</h1>
                  <div className="flex items-center gap-8">
                    {imdbRating !== "N/A" && (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-2xl">★</span>
                          <span className="text-2xl font-bold">
                            {imdbRating.split("/")[0]}
                          </span>
                          <span className="text-gray-400">/10</span>
                        </div>
                        {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                          <div className="text-gray-400 text-sm text-center">
                            {Number(
                              movie.imdbVotes.replace(/,/g, "")
                            ).toLocaleString()}{" "}
                            votes
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-gray-400">
                  {[
                    movie.Released && `Released ${movie.Released}`,
                    movie.Runtime,
                    movie.Rated,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </div>

                {movie.Genre && movie.Genre !== "N/A" && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.Genre.split(",").map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {movie.Plot && <p className="text-lg mb-8">{movie.Plot}</p>}

                {/* Main Credits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {movie.Director && movie.Director !== "N/A" && (
                    <div>
                      <h2 className="text-gray-400 mb-1">Director</h2>
                      <p>{movie.Director}</p>
                    </div>
                  )}
                  {movie.Writer && movie.Writer !== "N/A" && (
                    <div>
                      <h2 className="text-gray-400 mb-1">Writers</h2>
                      <p>{movie.Writer}</p>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== "N/A" && (
                    <div>
                      <h2 className="text-gray-400 mb-1">Stars</h2>
                      <p>{movie.Actors}</p>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  {movie.Awards && movie.Awards !== "N/A" && (
                    <div>
                      <h2 className="text-gray-400 mb-1">Awards</h2>
                      <p>{movie.Awards}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {movie.Country && movie.Country !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">Country</h2>
                        <p>{movie.Country}</p>
                      </div>
                    )}
                    {movie.Language && movie.Language !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">Language</h2>
                        <p>{movie.Language}</p>
                      </div>
                    )}
                    {movie.Production && movie.Production !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">Production</h2>
                        <p>{movie.Production}</p>
                      </div>
                    )}
                    {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">Box Office</h2>
                        <p>{movie.BoxOffice}</p>
                      </div>
                    )}
                    {movie.DVD && movie.DVD !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">DVD Release</h2>
                        <p>{movie.DVD}</p>
                      </div>
                    )}
                    {movie.Website && movie.Website !== "N/A" && (
                      <div>
                        <h2 className="text-gray-400 mb-1">Website</h2>
                        <a
                          href={movie.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Official Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Other Reviews Section */}
                {movie.Metascore && movie.Metascore !== "N/A" && (
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
                        <div className="text-sm text-gray-400">Metascore</div>
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
