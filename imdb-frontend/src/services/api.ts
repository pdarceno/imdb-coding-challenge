import axios from "axios";
import { movieCache } from "../utils/cache";

const API_URL = import.meta.env.VITE_API_URL;

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
