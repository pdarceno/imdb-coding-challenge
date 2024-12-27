import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await fetch(
        `http://localhost:5000/search?title=${query}`
      );
      const data = await response.json();
      setSearchResults(data.Search || []); // Update state with search results
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setSearchResults([]); // Clear results if an error occurs
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Movie Search</h1>
      {/* Search bar component */}
      <SearchBar onSearch={handleSearch} />
      {/* Movie list component */}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default Home;
