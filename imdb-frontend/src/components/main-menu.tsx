import { Menu, Search, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFavorites } from "@/contexts/favorites-provider";
import ThemeToggle from "./theme-toggle";
import BadgeList from "./ui/badge-list";
import { FavoriteMovie } from "@/types/favorites";
import { useEffect, useState } from "react";
import { getDiscoverSuggestions } from "@/services/api";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const [suggestions, setSuggestions] = useState<FavoriteMovie[]>([]);
  const [isDiscoverLoading, setIsDiscoverLoading] = useState(true);
  const { favorites, isLoading } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await getDiscoverSuggestions();
        setSuggestions(data as FavoriteMovie[]);
      } catch (error) {
        console.error("Error loading suggestions:", error);
      } finally {
        setIsDiscoverLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex items-center gap-2 p-2 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
          <span className="hidden sm:block">Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto flex flex-col">
        <SheetClose asChild>
          <SheetHeader>
            <SheetTitle
              onClick={handleLogoClick}
              className="flex gap-2 cursor-pointer hover:opacity-70"
            >
              <img
                src="/imdb.svg"
                alt="imdb logo"
                className="h-8 w-16 object-contain"
              />
              Clone!
            </SheetTitle>
          </SheetHeader>
        </SheetClose>
        <nav className="mt-8 flex flex-col gap-8">
          {/* Accordion Sections */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="discover">
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Discover</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <SheetClose asChild>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                      Search for any movie, TV show, or series. Get detailed
                      information about ratings, cast, plot, and more.
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">Start with:</p>
                      <div className="flex flex-wrap gap-2">
                        <BadgeList
                          items={suggestions}
                          isLoading={isDiscoverLoading}
                        />
                      </div>
                    </div>
                  </div>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="favorites" className="border-b-0">
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Favorites</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <SheetClose asChild>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                      Your top favorite movies and shows are listed here. Add
                      more by searching and bookmarking titles you love.
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">Your favorites:</p>
                      <div className="flex flex-wrap gap-2">
                        <BadgeList items={favorites} isLoading={isLoading} />
                      </div>
                    </div>
                  </div>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
        {/* Theme Selector Footer */}
        <div className="mt-auto pt-6 border-t">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMenu;
