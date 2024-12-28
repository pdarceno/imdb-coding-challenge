import { Router } from "express";
import createMovieController from "../controllers/movieControllers";

export default function createMovieRoutes(baseUrl: string, apiKey: string) {
  const router = Router();
  const movieController = createMovieController(baseUrl, apiKey);

  router.get("/search", movieController.searchMovies);
  router.get("/:id", movieController.getMovieDetails);

  return router;
}
