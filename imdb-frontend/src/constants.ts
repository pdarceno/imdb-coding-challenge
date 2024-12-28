export const SEARCH_CONSTANTS = {
  MIN_DEBOUNCE_TIME: 500, // Minimum time to wait before searching (in milliseconds)
  MAX_DEBOUNCE_TIME: 1000, // Maximum time window for search to be valid (in milliseconds)
} as const;

export const suggestedMovies = [
  { id: "tt0126029", title: "Shrek" },
  { id: "tt0298148", title: "Shrek 2" },
  { id: "tt0413267", title: "Shrek the Third" },
];
