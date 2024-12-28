import { MovieDetailsType } from "../types/movies";

export const isValidField = (value: string | undefined): boolean => {
  return value !== undefined && value !== "" && value !== "N/A";
};

// Required: helper for arrays
export const isValidArrayField = (value: string | undefined): string[] => {
  if (!isValidField(value)) return [];
  return value!.split(",").map((it) => it.trim());
};

// Optional: Type guard for TV Series
export const isTVSeries = (movie: MovieDetailsType): boolean => {
  return movie.Type === "series";
};

// Optional: Type guard for Episode
export const isEpisode = (movie: MovieDetailsType): boolean => {
  return movie.Type === "episode";
};
