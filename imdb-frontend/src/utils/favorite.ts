import { FavoriteMovie } from "@/types/favorites";

export const isFavoritedFunction = (
  favorites: FavoriteMovie[],
  movieId: string,
  episodeNumber?: string,
  episodeId?: string
) => {
  return favorites.some((movie) =>
    episodeNumber
      ? movie.parentId === movieId && movie.episodeId === episodeId
      : movie.parentId === movieId && !movie.episodeId
  );
};
