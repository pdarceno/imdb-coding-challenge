interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

export class ApiCache {
  private cache: Cache = {};
  private readonly ttl: number; // Time to live in milliseconds

  constructor(ttlMinutes: number = 5) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  createKey(query: string, page: number): string {
    return `${query}-${page}`;
  }

  get<T>(key: string): T | null {
    const item = this.cache[key];
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.ttl) {
      delete this.cache[key];
      return null;
    }

    return item.data;
  }

  set<T>(key: string, data: T): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  clear(): void {
    this.cache = {};
  }
}

export const movieCache = new ApiCache(5); // Cache for 5 minutes
