import { useEffect } from "react";
import { movieCache } from "../utils/cache";

export const useInvalidateCache = (invalidationTimeMinutes: number = 30) => {
  useEffect(() => {
    const interval = setInterval(() => {
      movieCache.clear();
    }, invalidationTimeMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, [invalidationTimeMinutes]);
};
