import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ClickableBadgeProps {
  id: string;
  title: string;
}

const ClickableBadge = ({ id, title }: ClickableBadgeProps) => {
  const navigate = useNavigate();

  return (
    <Badge
      key={id}
      className="px-3 py-1 rounded-full text-sm bg-accent-foreground text-secondary hover:bg-accent hover:text-foreground cursor-pointer"
      onClick={() => navigate(`/movie/${id}`)}
    >
      {title}
    </Badge>
  );
};

export default ClickableBadge;
