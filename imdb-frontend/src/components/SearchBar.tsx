import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6"
    >
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-3 text-gray-700 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
