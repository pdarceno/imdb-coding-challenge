import BadgeListSkeleton from "./badge-list-skeleton";
import ClickableBadge from "@/components/ui/clickable-badge";

interface BadgeListProps {
  items: Array<{
    parentId: string;
    title: string;
    seasonNumber?: string;
    episodeId?: string;
    episodeNumber?: string;
  }>;
  isLoading?: boolean;
}

const BadgeList = ({ items, isLoading }: BadgeListProps) => {
  if (isLoading) {
    return <BadgeListSkeleton />;
  }

  return (
    <>
      {items.map((item) => (
        <ClickableBadge
          key={`${item.parentId}-${item.episodeId}`}
          parentId={item.parentId}
          title={item.title}
          seasonNumber={item.seasonNumber}
          episodeId={item.episodeId}
          episodeNumber={item.episodeNumber}
        />
      ))}
    </>
  );
};

export default BadgeList;
