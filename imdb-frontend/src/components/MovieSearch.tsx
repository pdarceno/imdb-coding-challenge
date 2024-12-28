import { useState } from "react";
import { searchMovies } from "../services/api";
import SearchBar from "./SearchBar";
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

const MovieSearch = () => {
  const [movies, setMovies] = useState<MovieSearchResultType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const moviesPerPage = 10; // OMDB API returns 10 results per page
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  const handleSearch = async (query: string, page: number = 1) => {
    setError(null);
    setIsLoading(true);
    setSearchQuery(query);

    try {
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
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate middle pages
    let start = Math.max(currentPage - 1, 2);
    let end = Math.min(currentPage + 1, totalPages - 1);

    // Adjust if at the start or end
    if (currentPage <= 2) {
      end = 4;
    }
    if (currentPage >= totalPages - 1) {
      start = totalPages - 3;
    }

    // Add ellipsis if needed
    if (start > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <SearchBar onSearch={(query) => handleSearch(query, 1)} />
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
