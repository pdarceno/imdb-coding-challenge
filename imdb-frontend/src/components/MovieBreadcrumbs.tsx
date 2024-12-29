import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { cn } from "@/lib/utils";

const MovieBreadcrumbs = ({
  title, // This is now always the series title
  id,
  seasonNumber,
  episodeNumber,
  currentTitle, // Optional: current episode title
  className,
}: {
  title: string;
  id: string;
  seasonNumber?: string;
  episodeNumber?: string;
  currentTitle?: string;
  className?: string;
}) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {!seasonNumber ? (
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/movie/${id}`}>{title}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {!episodeNumber ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Season {seasonNumber}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/movie/${id}/season/${seasonNumber}`}>
                    Season {seasonNumber}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {currentTitle
                      ? `Episode ${episodeNumber}: ${currentTitle}`
                      : `Episode ${episodeNumber}`}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MovieBreadcrumbs;
