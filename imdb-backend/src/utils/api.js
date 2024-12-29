"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createOmdbApi = (baseUrl, apiKey) => {
    const client = axios_1.default.create({
        baseURL: baseUrl,
        params: {
            apikey: apiKey,
        },
    });
    return {
        search: (query, page = 1) => client.get("/", {
            params: {
                s: query,
                page: page,
            },
        }),
        getById: (id) => client.get("/", {
            params: { i: id },
        }),
        getSeasonDetails: (id, seasonNumber) => client.get("/", {
            params: { i: id, Season: seasonNumber },
        }),
        getEpisodeDetails: (id, seasonNumber, episodeNumber) => client.get("/", {
            params: { i: id, Season: seasonNumber, Episode: episodeNumber },
        }),
    };
};
exports.default = createOmdbApi;
