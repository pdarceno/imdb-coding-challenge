import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const MovieCardSkeleton = () => {
  return (
    <div className="w-full sm:w-auto">
      <Card className="h-full bg-card overflow-hidden">
        <CardHeader className="p-0">
          <AspectRatio ratio={158 / 240}>
            <Skeleton className="w-full h-full" />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-16" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieCardSkeleton;
