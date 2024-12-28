import { Search } from "lucide-react";
import { Badge } from "./ui/badge";

const EmptySearchState = () => {
  return (
    <div className="min-h-[calc(100vh-268.85px)] flex flex-col bg-background items-center justify-center text-center px-4">
      <Search className="w-16 h-16 text-primary" />
      <h2 className="text-2xl font-semibold text-primary">Discover</h2>
      <p className="text-primary max-w-md mb-6">
        Search for any movie, TV show, or series. Get detailed information about
        ratings, cast, plot, and more.
      </p>
      <div className="flex flex-col gap-4 text-primary">
        <p>Try searching for:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge
            key="favorite-1"
            className="px-3 py-1 rounded-full text-sm bg-accent-foreground text-secondary"
          >
            Shrek
          </Badge>
          <Badge
            key="favorite-2"
            className="px-3 py-1 rounded-full text-sm bg-accent-foreground text-secondary"
          >
            Shrek 2
          </Badge>
          <Badge
            key="favorite-3"
            className="px-3 py-1 rounded-full text-sm bg-accent-foreground text-secondary"
          >
            Shrek the Third
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchState;
