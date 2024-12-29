import ClickableBadge from "@/components/ui/clickable-badge";

interface BadgeListProps {
  items: Array<{
    parentId: string;
    title: string;
    seasonNumber?: string;
    episodeId?: string;
    episodeNumber?: string;
  }>;
  className?: string;
}

const BadgeList = ({ items }: BadgeListProps) => {
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
