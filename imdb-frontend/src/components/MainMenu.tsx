import { Menu, Search, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFavorites } from "@/contexts/FavoritesProvider";
import ClickableBadge from "@/utils/ClickableBadge";
import { suggestedMovies } from "@/constants";
import ThemeToggle from "./ThemeToggle";

const MainMenu = () => {
  const { favorites } = useFavorites();
  const topFavorites = [...favorites].reverse().slice(0, 10);

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
        <SheetHeader>
          <SheetTitle className="flex gap-2">
            <img
              src="/imdb.svg"
              alt="imdb logo"
              className="h-8 w-16 object-contain"
            />
            Clone!
          </SheetTitle>
        </SheetHeader>
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
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Search for any movie, TV show, or series. Get detailed
                    information about ratings, cast, plot, and more.
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Start with:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedMovies.map((movie) => (
                        <ClickableBadge
                          key={movie.id}
                          id={movie.id}
                          title={movie.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Your top favorite movies and shows are listed here. Add more
                    by searching and bookmarking titles you love.
                  </p>
                  {topFavorites.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">Your top favorites:</p>
                      <div className="flex flex-wrap gap-2">
                        {topFavorites.map((favorite) => (
                          <ClickableBadge
                            key={favorite.id}
                            id={favorite.id}
                            title={favorite.title}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">
                      No favorites yet. Start by discovering and bookmarking
                      titles!
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
        {/* Theme Selector Footer */}
        <div className="mt-auto pt-8 border-t">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMenu;
