import { Skeleton } from "@/components/ui/skeleton";

const SeasonDetailsSkeleton = () => {
  // Generate 10 episode skeletons as most seasons have around 10 episodes
  const episodeSkeletons = Array.from({ length: 10 }, (_, index) => (
    <div key={index} className="p-4 rounded-lg bg-card/50 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" /> {/* Episode number */}
            <Skeleton className="h-4 w-48 sm:w-72" /> {/* Episode title */}
          </div>
          <Skeleton className="h-3 w-32" /> {/* Release date */}
        </div>
        <Skeleton className="h-4 w-12" /> {/* Rating */}
      </div>
    </div>
  ));

  return (
    <div className="min-h-[calc(100vh-268.85px)] w-full bg-background text-foreground p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-12" /> {/* Home */}
          <div className="opacity-40">/</div>
          <Skeleton className="h-4 w-40" /> {/* Series Title */}
          <div className="opacity-40">/</div>
          <Skeleton className="h-4 w-24" /> {/* Season X */}
        </div>
        <div className="mb-6">
          <Skeleton className="h-9 w-96" /> {/* Title */}
        </div>

        <div className="grid gap-4">{episodeSkeletons}</div>
      </div>
    </div>
  );
};

export default SeasonDetailsSkeleton;
