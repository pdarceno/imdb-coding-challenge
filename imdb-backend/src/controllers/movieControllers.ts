import { RequestHandler } from "express";
import createOmdbApi from "../utils/api";

export default function createMovieController(baseUrl: string, apiKey: string) {
  const omdbApi = createOmdbApi(baseUrl, apiKey);

  // Search movies endpoint
  const searchMovies: RequestHandler = async (req, res) => {
    try {
      const { query, page } = req.query as { query: string; page?: string };
      if (!query) {
        res.status(400).json({ error: "Search query is required" });
        return;
      }

      // Convert page to number, default to 1 if not provided
      const pageNumber = page ? parseInt(page, 10) : 1;
      if (isNaN(pageNumber) || pageNumber < 1) {
        res.status(400).json({ error: "Invalid page number" });
        return;
      }

      const response = await omdbApi.search(query, pageNumber);
      res.json(response.data);
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
      return;
    }
  };

  // Get movie/show details endpoint
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

  // Get season details endpoint
  const getSeasonDetails: RequestHandler = async (req, res) => {
    try {
      const { id, seasonNumber } = req.params;

      if (!seasonNumber || isNaN(parseInt(seasonNumber))) {
        res.status(400).json({ error: "Valid season number is required" });
        return;
      }

      const response = await omdbApi.getSeasonDetails(
        id,
        parseInt(seasonNumber)
      );
      res.json(response.data);
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch season details" });
      return;
    }
  };

  // Get episode details endpoint
  const getEpisodeDetails: RequestHandler = async (req, res) => {
    try {
      const { id, seasonNumber, episodeNumber } = req.params;

      if (!seasonNumber || isNaN(parseInt(seasonNumber))) {
        res.status(400).json({ error: "Valid season number is required" });
        return;
      }

      if (!episodeNumber || isNaN(parseInt(episodeNumber))) {
        res.status(400).json({ error: "Valid episode number is required" });
        return;
      }

      const response = await omdbApi.getEpisodeDetails(
        id,
        parseInt(seasonNumber),
        parseInt(episodeNumber)
      );
      res.json(response.data);
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch episode details" });
      return;
    }
  };

  return {
    searchMovies,
    getMovieDetails,
    getSeasonDetails,
    getEpisodeDetails,
  };
}
