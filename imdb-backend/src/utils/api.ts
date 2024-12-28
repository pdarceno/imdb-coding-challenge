// utils/api.ts
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
    search: (query: string) =>
      client.get<SearchResponseType>("/", {
        params: { s: query },
      }),

    getById: (id: string) =>
      client.get<MovieDetailsType>("/", {
        params: { i: id },
      }),
  };
};

export default createOmdbApi;
