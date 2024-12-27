import { mockSearchResults } from "./mockSearchResults";
import { mockMovieDetails } from "./mockMovieDetails";

// Simulates an API for searching movies
export const mockSearchApi = async (query: string) => {
  console.log(`Mock search API called with query: "${query}"`);
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter mock data based on the query
  return mockSearchResults.filter((movie) =>
    movie.Title.toLowerCase().includes(query.toLowerCase())
  );
};

// Simulates an API for fetching movie details
export const mockMovieDetailsApi = async (imdbID: string) => {
  console.log(`Mock movie details API called with imdbID: "${imdbID}"`);
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (imdbID === mockMovieDetails.imdbID) {
    return mockMovieDetails;
  } else {
    throw new Error("Movie not found");
  }
};
