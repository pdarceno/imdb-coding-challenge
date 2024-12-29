// components/Bookmark.tsx
import { X, Plus } from "lucide-react";
import { useFavorites } from "@/contexts/favorites-provider";
import { isFavoritedFunction } from "@/utils/favorite";

interface BookmarkProps {
  id: string;
  title: string;
  seasonNumber?: string;
  episodeId?: string;
  episodeNumber?: string;
}

const Bookmark = ({
  id,
  title,
  seasonNumber,
  episodeId,
  episodeNumber,
}: BookmarkProps) => {
  const { favorites, toggleFavorite, loading } = useFavorites();
  const isFavorited = isFavoritedFunction(
    favorites,
    id,
    episodeNumber,
    episodeId
  );

  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    const key = episodeNumber ? `${id}-${episodeId}` : id;
    if (!loading[key]) {
      toggleFavorite(id, title, seasonNumber, episodeId, episodeNumber);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 cursor-pointer ${
        loading[episodeNumber ? `${id}-${episodeId}` : id] ? "opacity-50" : ""
      }`}
      onClick={handleToggle}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <img
        src="/bookmark.svg"
        alt=""
        className="w-12 md:w-8 h-full rounded-tl-lg opacity-70"
      />

      {/* Overlay the Icon */}
      <div className="absolute top-3 left-2 text-white">
        {isFavorited ? (
          <X className="w-8 h-8 md:w-4 md:h-4" />
        ) : (
          <Plus className="w-8 h-8 md:w-4 md:h-4" />
        )}
      </div>
    </div>
  );
};

export default Bookmark;
