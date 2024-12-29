export interface FavoriteMovie {
  parentId: string;
  title: string;
  // additional details for episodes
  seasonNumber?: string;
  episodeId?: string;
  episodeNumber?: string;
}
