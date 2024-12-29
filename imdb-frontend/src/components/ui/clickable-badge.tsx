import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { FavoriteMovie } from "@/types/favorites";

const ClickableBadge = ({
  parentId,
  title,
  seasonNumber,
  episodeId,
  episodeNumber,
}: FavoriteMovie) => {
  const navigate = useNavigate();

  return (
    <Badge
      key={`${parentId}-${episodeId}`}
      className="px-3 py-1 rounded-full text-sm bg-accent-foreground text-secondary hover:bg-accent hover:text-foreground cursor-pointer"
      onClick={() => {
        console.log("what the fuck why: ", parentId, episodeId);
        if (!episodeId) {
          navigate(`/movie/${parentId}`);
        } else {
          navigate(
            `/movie/${parentId}/season/${seasonNumber}/episode/${episodeNumber}`
          );
        }
      }}
    >
      {title}
    </Badge>
  );
};

export default ClickableBadge;
