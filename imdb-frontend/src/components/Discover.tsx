import { Search } from "lucide-react";
import BadgeList from "./ui/badge-list";
import { FavoriteMovie } from "@/types/favorites";
import { useEffect, useState } from "react";
import { getDiscoverSuggestions } from "@/services/get-api";

const Discover = () => {
  const [suggestions, setSuggestions] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await getDiscoverSuggestions();
        setSuggestions(data as FavoriteMovie[]);
      } catch (error) {
        console.error("Error loading suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  return (
    <div className="min-h-[calc(100vh-268.85px)] flex flex-col bg-background items-center justify-center text-center px-4">
      <Search className="w-16 h-16 text-primary" />
      <h2 className="text-2xl font-semibold text-primary">Discover</h2>
      <p className="text-primary max-w-md mb-6">
        Search for any movie, TV show, or series. Get detailed information about
        ratings, cast, plot, and more.
      </p>
      <div className="flex flex-col gap-4 text-primary">
        <p>Start with:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <BadgeList items={suggestions} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Discover;
