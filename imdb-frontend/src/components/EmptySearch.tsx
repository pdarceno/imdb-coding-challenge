import { Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptySearch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-268.85px)] flex flex-col bg-background items-center justify-center text-center px-4">
      <Tv className="w-16 h-16 text-primary" />
      <h2 className="text-2xl font-semibold text-primary">No Results Found</h2>
      <p className="text-primary max-w-md mb-6">
        We couldn't find any matches for your search. Try checking for typos or
        using different keywords.
      </p>
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="text-primary"
      >
        Home
      </Button>
    </div>
  );
};

export default EmptySearch;
