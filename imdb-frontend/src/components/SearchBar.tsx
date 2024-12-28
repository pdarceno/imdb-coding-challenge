import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import { SEARCH_CONSTANTS } from "@/constants";
import ThemeToggle from "./ThemeToggle";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const lastKeystrokeTime = useRef<number>(0);
  const lastSearchedQuery = useRef<string>("");

  const minDebounceTime = SEARCH_CONSTANTS.MIN_DEBOUNCE_TIME;
  const maxDebounceTime = SEARCH_CONSTANTS.MAX_DEBOUNCE_TIME;

  const debouncedSearch = useCallback(
    (searchQuery: string, bypassTimeCheck = false) => {
      const trimmedQuery = searchQuery.trim();
      const timeSinceLastKeystroke = Date.now() - lastKeystrokeTime.current;

      if (!trimmedQuery) {
        console.log("Empty query - search cancelled");
        return;
      }

      if (trimmedQuery === lastSearchedQuery.current) {
        console.log(
          `Query "${trimmedQuery}" already searched - skipping duplicate search`
        );
        return;
      }

      // Skip time checks if bypassTimeCheck is true (for manual submissions)
      if (!bypassTimeCheck) {
        if (timeSinceLastKeystroke > maxDebounceTime) {
          console.log(
            `Time since last keystroke (${timeSinceLastKeystroke}ms) exceeded maximum (${maxDebounceTime}ms) - search cancelled`
          );
          return;
        }

        if (timeSinceLastKeystroke < minDebounceTime) {
          console.log(
            `Time since last keystroke (${timeSinceLastKeystroke}ms) less than minimum (${minDebounceTime}ms) - search cancelled`
          );
          return;
        }
      }

      console.log(
        `Executing search with query: "${trimmedQuery}" after ${timeSinceLastKeystroke}ms`
      );
      lastSearchedQuery.current = trimmedQuery;
      onSearch(trimmedQuery);
    },
    [onSearch, minDebounceTime, maxDebounceTime]
  );

  useEffect(() => {
    if (!query.trim()) {
      console.log("Empty query detected - skipping debounce timer");
      return;
    }

    lastKeystrokeTime.current = Date.now();
    console.log(`Query changed to: "${query}" at ${lastKeystrokeTime.current}`);
    console.log(`Setting timer for ${minDebounceTime}ms`);

    const timer = setTimeout(() => {
      console.log(`Timer completed for query: "${query}"`);
      setDebouncedQuery(query);
    }, minDebounceTime);

    return () => {
      console.log(`Cleaning up timer for query: "${query}"`);
      clearTimeout(timer);
    };
  }, [query, minDebounceTime]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log(`Debounced query updated to: "${debouncedQuery}"`);
      debouncedSearch(debouncedQuery, false); // Normal debounced search
    }
  }, [debouncedQuery, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(`Input changed to: "${newValue}"`);
    setQuery(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    console.log(`Form submitted with query: "${trimmedQuery}"`);

    if (trimmedQuery) {
      if (trimmedQuery === lastSearchedQuery.current) {
        console.log(
          `Query "${trimmedQuery}" already searched - skipping duplicate submission`
        );
        return;
      }
      lastKeystrokeTime.current = Date.now();
      console.log(`Executing immediate search for: "${trimmedQuery}"`);
      debouncedSearch(trimmedQuery, true); // Bypass time checks for manual submission
    } else {
      console.log(`Empty query submitted, ignoring`);
    }
  };

  return (
    <div className="flex items-center w-full max-w-screen-xl mx-auto p-4 sm:p-6">
      <div className="flex items-center mr-4">
        <img
          src="/imdb.svg"
          alt="imdb logo"
          className="h-8 w-16 object-contain"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex items-center overflow-hidden"
      >
        <div className="flex items-center flex-grow bg-input">
          <input
            type="text"
            placeholder="Search IMDb"
            value={query}
            onChange={handleChange}
            className="w-full p-3 bg-transparent text-primary focus:outline-none"
          />
          <Search className="h-5 w-5 m-3 text-gray-400" />
        </div>
        <div className="flex items-center ml-4">
          <ThemeToggle />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
