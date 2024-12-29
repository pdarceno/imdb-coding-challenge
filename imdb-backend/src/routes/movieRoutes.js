"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createMovieRoutes;
const express_1 = require("express");
const movieControllers_1 = __importDefault(require("../controllers/movieControllers"));
function createMovieRoutes(baseUrl, apiKey) {
    const router = (0, express_1.Router)();
    const movieController = (0, movieControllers_1.default)(baseUrl, apiKey);
    // Search movies
    router.get("/search", movieController.searchMovies);
    // Get movie/show details
    router.get("/:id", movieController.getMovieDetails);
    // Get season details
    router.get("/:id/season/:seasonNumber", movieController.getSeasonDetails);
    // Get episode details
    router.get("/:id/season/:seasonNumber/episode/:episodeNumber", movieController.getEpisodeDetails);
    return router;
}
