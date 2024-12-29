import { Router } from "express";
import createMovieController from "../controllers/movieControllers";

export default function createMovieRoutes(baseUrl: string, apiKey: string) {
  const router = Router();
  const movieController = createMovieController(baseUrl, apiKey);

  // Search movies
  router.get("/search", movieController.searchMovies);

  // Get movie/show details
  router.get("/:id", movieController.getMovieDetails);

  // Get season details
  router.get("/:id/season/:seasonNumber", movieController.getSeasonDetails);

  // Get episode details
  router.get(
    "/:id/season/:seasonNumber/episode/:episodeNumber",
    movieController.getEpisodeDetails
  );

  return router;
}
