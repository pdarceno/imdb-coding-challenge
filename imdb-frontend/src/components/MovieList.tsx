import MovieCard from "./MovieCard";
import { MovieSearchResultType } from "../types/movies";

interface MovieListProps {
  movies: MovieSearchResultType[];
  title?: string;
}

const MovieList = ({ movies, title }: MovieListProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      )}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
