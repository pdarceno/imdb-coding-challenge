"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createMovieController;
const api_1 = __importDefault(require("../utils/api"));
function createMovieController(baseUrl, apiKey) {
    const omdbApi = (0, api_1.default)(baseUrl, apiKey);
    // Search movies endpoint
    const searchMovies = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, page } = req.query;
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
            const response = yield omdbApi.search(query, pageNumber);
            res.json(response.data);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch movies" });
            return;
        }
    });
    // Get movie/show details endpoint
    const getMovieDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const response = yield omdbApi.getById(id);
            res.json(response.data);
            console.log(response.data);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch movie details" });
            return;
        }
    });
    // Get season details endpoint
    const getSeasonDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, seasonNumber } = req.params;
            if (!seasonNumber || isNaN(parseInt(seasonNumber))) {
                res.status(400).json({ error: "Valid season number is required" });
                return;
            }
            const response = yield omdbApi.getSeasonDetails(id, parseInt(seasonNumber));
            res.json(response.data);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch season details" });
            return;
        }
    });
    // Get episode details endpoint
    const getEpisodeDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            const response = yield omdbApi.getEpisodeDetails(id, parseInt(seasonNumber), parseInt(episodeNumber));
            res.json(response.data);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch episode details" });
            return;
        }
    });
    return {
        searchMovies,
        getMovieDetails,
        getSeasonDetails,
        getEpisodeDetails,
    };
}
