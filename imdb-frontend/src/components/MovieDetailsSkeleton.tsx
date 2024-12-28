import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-full">
        <div className="relative pt-8">
          <div className="container mx-auto px-5">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster Skeleton */}
              <div className="md:w-1/4">
                <Skeleton className="w-full aspect-[2/3] rounded-lg" />
              </div>

              {/* Details Skeleton */}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-10 w-2/3" />
                  <Skeleton className="h-8 w-24" />
                </div>

                {/* Release info skeleton */}
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="h-4 w-48" />
                </div>

                {/* Genre skeleton */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Plot skeleton */}
                <div className="space-y-2 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Main Credits skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>

                {/* Additional Details skeleton */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ratings skeleton */}
                <div className="pt-8">
                  <div className="flex items-start gap-12">
                    <div>
                      <Skeleton className="h-10 w-12 mb-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
