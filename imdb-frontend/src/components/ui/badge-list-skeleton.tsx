import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const BadgeListSkeleton = () => {
  // Function to get random width for variety
  const getRandomWidth = () => {
    const widths = ["w-16", "w-20", "w-24", "w-28", "w-32"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="inline-flex items-center">
          <Skeleton className={cn("h-8 rounded-full", getRandomWidth())} />
        </div>
      ))}
    </>
  );
};

export default BadgeListSkeleton;
