import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await axios.get(`${API_URL}/movies/search`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/movies/${id}`);
  return response.data;
};
