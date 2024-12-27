import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { mockSearchApi } from "../mock/mockApi";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const results = await mockSearchApi(query); // Use the mock API
      setSearchResults(results); // Pass results with the correct type
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setSearchResults([]); // Clear results if an error occurs
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={searchResults} />
    </div>
  );
};

export default Home;
