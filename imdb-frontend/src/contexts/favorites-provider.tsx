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
import { isFavoritedFunction } from "@/utils/favorite";
import { getFavorites, mockApiCall } from "@/services/api";

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
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  // Initialize with localStorage data first to prevent flash of no content
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load favorites from API (which will actually get from localStorage in this case)
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await getFavorites();
        // Only update if we got data back and it's different from current state
        if (data && JSON.stringify(data) !== JSON.stringify(favorites)) {
          setFavorites(data as FavoriteMovie[]);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast({
          description: "Error loading favorites",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [toast]);

  // Sync favorites with localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      // Only sync after initial load
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const toggleFavorite = useCallback(
    async (
      movieId: string,
      movieTitle: string,
      seasonNumber?: string,
      episodeId?: string,
      episodeNumber?: string
    ) => {
      const key = episodeNumber ? `${movieId}-${episodeId}` : movieId;
      setLoading((prev) => ({ ...prev, [key]: true }));

      try {
        // If it's an episode, check if this specific episode is favorited
        // If it's a parent, check if the parent itself is favorited
        const isFavorited = isFavoritedFunction(
          favorites,
          movieId,
          episodeNumber,
          episodeId
        );

        // Simulate API call
        await mockApiCall();

        // Update state
        setFavorites((prev) =>
          isFavorited
            ? prev.filter((movie) =>
                episodeNumber
                  ? !(
                      movie.parentId === movieId &&
                      movie.episodeId === episodeId
                    )
                  : !(movie.parentId === movieId && !movie.episodeId)
              )
            : [
                ...prev,
                episodeNumber
                  ? {
                      parentId: movieId,
                      title: movieTitle,
                      seasonNumber,
                      episodeId,
                      episodeNumber,
                    }
                  : {
                      parentId: movieId,
                      title: movieTitle,
                    },
              ]
        );

        // Show toast
        toast({
          title: isFavorited ? "Removed!" : "Added!",
          description: isFavorited
            ? `${movieTitle} has been removed from favorites database.`
            : `${movieTitle} has been added to favorites database.`,
          variant: "default",
        });
      } catch (error) {
        toast({
          description: "Error updating favorites",
          variant: "destructive",
        });
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    },
    [favorites, toast]
  );
  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, loading, isLoading }}
    >
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
