import {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { FavoriteMovie } from "@/types/favorites";

// Mock API call
const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// Define context properties
interface FavoritesContextProps {
  favorites: FavoriteMovie[];
  toggleFavorite: (
    movieId: string,
    movieTitle: string,
    seasonNum?: string,
    episodeId?: string,
    episodeNumber?: string
  ) => Promise<void>;
  loading: Record<string, boolean>;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    // Load from localStorage on initial render
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback(
    async (
      movieId: string,
      movieTitle: string,
      seasonNumber?: string,
      episodeId?: string,
      episodeNumber?: string
    ) => {
      setLoading((prev) => ({ ...prev, [movieId]: true }));

      try {
        const isFavorited = favorites.some(
          (movie) => movie.parentId === movieId
        );

        // Make API call
        await mockApiCall();

        // Update local state
        setFavorites((prev) =>
          isFavorited
            ? prev.filter((movie) => movie.parentId !== movieId)
            : [
                ...prev,
                {
                  parentId: movieId,
                  title: movieTitle,
                  seasonNumber: seasonNumber,
                  episodeId: episodeId,
                  episodeNumber: episodeNumber,
                },
              ]
        );

        // Show toast
        toast({
          title: isFavorited ? "Removed!" : "Added!",
          description: isFavorited
            ? `${movieTitle} removed from favorites`
            : `${movieTitle} added to favorites`,
          variant: "default",
        });
      } catch (error) {
        toast({
          description: "Error updating favorites",
          variant: "destructive",
        });
      } finally {
        setLoading((prev) => ({ ...prev, [movieId]: false }));
      }
    },
    [favorites, toast]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
