import axios from "axios";
import { movieCache } from "../utils/cache";
import { suggestedMovies } from "@/constants";

const API_URL = import.meta.env.VITE_API_URL;

// Mock API call
export const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 750);
  });
};

export const searchMovies = async (query: string, page: number = 1) => {
  const cacheKey = movieCache.createKey(query, page);
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached data for:", query, page);
    return cachedData;
  }

  const response = await axios.get(`${API_URL}/movies/search`, {
    params: {
      query,
      page,
    },
  });

  movieCache.set(cacheKey, response.data);
  return response.data;
};

export const getMovieDetails = async (id: string) => {
  const cacheKey = `movie-${id}`;
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached movie details for:", id);
    return cachedData;
  }

  const response = await axios.get(`${API_URL}/movies/${id}`);
  movieCache.set(cacheKey, response.data);
  return response.data;
};

export const getSeasonDetails = async (id: string, seasonNumber: number) => {
  const cacheKey = `season-${id}-${seasonNumber}`;
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached season details for:", id, seasonNumber);
    return cachedData;
  }

  const response = await axios.get(
    `${API_URL}/movies/${id}/season/${seasonNumber}`
  );
  movieCache.set(cacheKey, response.data);
  return response.data;
};

export const getEpisodeDetails = async (
  id: string,
  seasonNumber: number,
  episodeNumber: number
) => {
  const cacheKey = `episode-${id}-${seasonNumber}-${episodeNumber}`;
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log(
      "Returning cached episode details for:",
      id,
      seasonNumber,
      episodeNumber
    );
    return cachedData;
  }

  const response = await axios.get(
    `${API_URL}/movies/${id}/season/${seasonNumber}/episode/${episodeNumber}`
  );
  movieCache.set(cacheKey, response.data);
  return response.data;
};

// These are simmed get requests for suggested movies in discover and stored data for favorites
// api.ts
// Add these new endpoints

export const getFavorites = async () => {
  const cacheKey = "favorites";
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached favorites");
    return cachedData;
  }

  // Simulate API delay
  await mockApiCall();

  // simulate return favorites from localStorage.
  const savedFavorites = localStorage.getItem("favorites");
  const mockFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  movieCache.set(cacheKey, mockFavorites);
  return mockFavorites;
};

export const getDiscoverSuggestions = async () => {
  const cacheKey = "discover-suggestions";
  const cachedData = movieCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached discover suggestions");
    return cachedData;
  }

  // Simulate API delay
  await mockApiCall();

  // Mock discover suggestions
  const mockSuggestions = suggestedMovies;

  movieCache.set(cacheKey, mockSuggestions);
  return mockSuggestions;
};
