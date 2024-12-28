import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import { MovieSearchResultType } from "../types/movies";
import MovieList from "./MovieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { movieCache } from "../utils/cache";
import EmptySearch from "./EmptySearch";
import Home from "./Home";

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieSearchResultType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isCached, setIsCached] = useState(false);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalResults / moviesPerPage);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, 1);
    }
  }, [searchQuery]);

  const handleSearch = async (query: string, page: number = 1) => {
    setError(null);
    setIsLoading(true);

    try {
      const cacheKey = movieCache.createKey(query, page);
      const cachedExists = movieCache.get(cacheKey) !== null;
      setIsCached(cachedExists);

      const data = await searchMovies(query, page);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults) || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
      setSearchParams({ search: searchQuery, page: page.toString() });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(currentPage - 1, 2);
    let end = Math.min(currentPage + 1, totalPages - 1);

    if (currentPage <= 2) {
      end = 4;
    }
    if (currentPage >= totalPages - 1) {
      start = totalPages - 3;
    }

    if (start > 2) {
      pages.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  };

  // Show empty states when appropriate
  if (!searchQuery) {
    return <Home />;
  }

  if (searchQuery && !isLoading && !error && movies.length === 0) {
    return <EmptySearch />;
  }

  return (
    <div className="container mx-auto p-6">
      {isCached && (
        <p className="text-sm text-gray-500 mb-2">Results loaded from cache</p>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MovieList movies={movies} isLoading={isLoading} />

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === -1 ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default MovieSearch;
