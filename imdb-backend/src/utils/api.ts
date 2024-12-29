import axios from "axios";
import { SearchResponseType, MovieDetailsType } from "../types/movies";

const createOmdbApi = (baseUrl: string, apiKey: string) => {
  const client = axios.create({
    baseURL: baseUrl,
    params: {
      apikey: apiKey,
    },
  });

  return {
    search: (query: string, page: number = 1) =>
      client.get<SearchResponseType>("/", {
        params: {
          s: query,
          page: page,
        },
      }),

    getById: (id: string) =>
      client.get<MovieDetailsType>("/", {
        params: { i: id },
      }),

    getSeasonDetails: (id: string, seasonNumber: number) =>
      client.get<MovieDetailsType>("/", {
        params: { i: id, Season: seasonNumber },
      }),

    getEpisodeDetails: (
      id: string,
      seasonNumber: number,
      episodeNumber: number
    ) =>
      client.get<MovieDetailsType>("/", {
        params: { i: id, Season: seasonNumber, Episode: episodeNumber },
      }),
  };
};

export default createOmdbApi;
