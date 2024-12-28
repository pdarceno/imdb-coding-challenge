export type MediaType = "movie" | "series" | "episode"; // made more specific

export interface MovieSearchResultType {
  Title: string; // Always present in search results
  Year: string; // Always present in search results
  imdbID: string; // Always present, used as unique identifier
  Type: MediaType;
  Poster: string | "N/A"; // OMDB returns "N/A" if no poster
}

export interface SearchResponseType {
  Search: MovieSearchResultType[]; // Present when Response is "True"
  totalResults: string; // Present when Response is "True"
  Response: "True" | "False"; // Always present
  Error?: string; // Present only when Response is "False"
}

export interface MovieDetailsType {
  // Core fields that should always be present
  Title: string;
  Year: string;
  imdbID: string;
  Type: MediaType;
  Response: "True" | "False";
  Poster: string | "N/A";

  // Fields that might genuinely be missing for some movies
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: {
    Source: string; // These should be non-nullable within the Rating object
    Value: string;
  }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Error?: string; // Present only when Response is "False"

  // TV Series specific fields
  totalSeasons?: string;
  Season?: string; // For episodes
  Episode?: string; // For episodes
  seriesID?: string; // For episodes
}
