import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => {
  return (
    <Card className="w-[160px] sm:w-[193px]">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[193/287]">
          <Skeleton className="w-full h-full" />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-1 flex-shrink-0 h-[90px] sm:h-[100px]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-16" />
      </CardContent>
    </Card>
  );
};

export default MovieCardSkeleton;
