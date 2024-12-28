import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      // Navigate to home with search query as URL parameter
      navigate(`/?search=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <header className="w-full border-b border-border/40 bg-card backdrop-blur">
      <div className="mx-auto flex h-16 items-center">
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
