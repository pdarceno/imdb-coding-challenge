import { Star } from "lucide-react";
import { useFavorites } from "@/contexts/favorites-provider";
import BadgeList from "./ui/badge-list";

const Favorites = () => {
  const { favorites, isLoading } = useFavorites();
  // const topFavorites = [...favorites].reverse().slice(0, 10);

  return (
    <div className="min-h-[calc(100vh-268.85px)] flex flex-col bg-background items-center justify-center text-center px-4">
      <Star className="w-16 h-16 text-primary" />
      <h2 className="text-2xl font-semibold text-primary">Favorites</h2>
      <p className="text-primary max-w-md mb-6">
        Your top favorite movies and shows are listed here. Add more by
        searching and bookmarking titles you love.
      </p>
      <div className="flex flex-col gap-4 text-primary">
        <p>Your favorites:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <BadgeList items={favorites} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
