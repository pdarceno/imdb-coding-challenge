import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSeasonDetails } from "../services/api";
import { SeasonDetailsType } from "../types/movies";
import SeasonDetailsSkeleton from "./SeasonDetailsSkeleton";

const SeasonDetails = () => {
  const { id, seasonNumber } = useParams();
  const [seasonData, setSeasonData] = useState<SeasonDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      if (!id || !seasonNumber) return;

      setLoading(true);
      try {
        const data = await getSeasonDetails(id, parseInt(seasonNumber));
        setSeasonData(data);
      } catch (error) {
        console.error("Error fetching season details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [id, seasonNumber]);

  if (loading) return <SeasonDetailsSkeleton />;

  if (!seasonData || seasonData.Response === "False") {
    return (
      <div className="min-h-[calc(100vh-268.85px)] bg-background text-foreground p-8">
        {seasonData?.Error || "Season not found"}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-268.85px)] w-full bg-background text-foreground p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/movie/${id}`}
            className="text-primary hover:text-primary/80"
          >
            ← Back to Show
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          {seasonData.Title} - Season {seasonNumber}
        </h1>

        {seasonData.Episodes && (
          <div className="grid gap-4">
            {seasonData.Episodes.map((episode) => (
              <Link
                key={episode.imdbID}
                to={`/movie/${id}/season/${seasonNumber}/episode/${episode.Episode}`}
                className="p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-muted-foreground">
                      Episode {episode.Episode}:
                    </span>{" "}
                    <span className="font-medium">{episode.Title}</span>
                  </div>
                  {episode.imdbRating !== "N/A" && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{episode.imdbRating}</span>
                    </div>
                  )}
                </div>
                {episode.Released && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {episode.Released}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonDetails;
