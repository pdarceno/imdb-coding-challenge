import { RequestHandler } from "express";
import createOmdbApi from "../utils/api";

export default function createMovieController(baseUrl: string, apiKey: string) {
  const omdbApi = createOmdbApi(baseUrl, apiKey);

  // Search movies endpoint
  const searchMovies: RequestHandler = async (req, res) => {
    try {
      const { query } = req.query as { query: string };
      if (!query) {
        res.status(400).json({ error: "Search query is required" });
        return;
      }

      const response = await omdbApi.search(query);
      res.json(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
      return;
    }
  };

  const getMovieDetails: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await omdbApi.getById(id);
      res.json(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie details" });
      return;
    }
  };

  return {
    searchMovies,
    getMovieDetails,
  };
}
