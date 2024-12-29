import MovieCard from "./movie-card";
import { MovieSearchResultType } from "../types/movies";
import MovieCardSkeleton from "./movie-card-skeleton";

interface MovieListProps {
  movies: MovieSearchResultType[];
  title?: string;
  isLoading?: boolean;
}

const MovieList = ({ movies, title, isLoading }: MovieListProps) => {
  // Create an array of 10 skeleton cards for loading state
  const skeletonCards = Array(10).fill(null);

  return (
    <div className="min-h-[calc(100vh-268.85px)] w-full max-w-screen-xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? skeletonCards.map((_, index) => (
              <MovieCardSkeleton key={`skeleton-${index}`} />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
      </div>
    </div>
  );
};

export default MovieList;
