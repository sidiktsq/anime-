import { Anime, AnimeSearchResult, TopAnimeResult } from "@/types";

const JIKAN_API = process.env.NEXT_PUBLIC_JIKAN_API || "https://api.jikan.moe/v4";

// Cache configuration
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, { data: unknown; timestamp: number }>();

function getCacheKey(endpoint: string, params?: Record<string, unknown>): string {
  if (!params) return endpoint;
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${endpoint}?${queryString}`;
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

export async function fetchWithCache<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> {
  const cacheKey = getCacheKey(endpoint, params);

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data as T;
  }

  // Build URL with params
  const url = new URL(`${JIKAN_API}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Jikan API error: ${response.statusText}`);
    }

    const data = await response.json() as T;

    // Store in cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getTopAnime(page: number = 1, limit: number = 25) {
  return fetchWithCache<TopAnimeResult>("/top/anime", {
    page,
    limit,
    type: "tv",
  });
}

export async function getTrendingAnime() {
  return fetchWithCache<TopAnimeResult>("/top/anime", {
    limit: 10,
    filter: "airing",
  });
}

export async function searchAnime(query: string, page: number = 1) {
  if (!query.trim()) {
    return { data: [], pagination: {} };
  }

  return fetchWithCache<AnimeSearchResult>("/anime", {
    query,
    page,
    limit: 25,
    order_by: "score",
    sort: "desc",
  });
}

export async function getAnimeById(id: number): Promise<Anime | null> {
  try {
    const result = await fetchWithCache<{ data: Anime }>(`/anime/${id}`);
    return result.data;
  } catch (error) {
    console.error(`Failed to fetch anime ${id}:`, error);
    return null;
  }
}

export async function getAnimeCharacters(id: number) {
  try {
    const result = await fetchWithCache<{
      data: Array<{
        character: { mal_id: number; name: string; images: Record<string, unknown> };
        role: string;
        voice_actors: Array<{ person: { name: string } }>;
      }>;
    }>(`/anime/${id}/characters`);
    return result.data;
  } catch (error) {
    console.error(`Failed to fetch characters for anime ${id}:`, error);
    return [];
  }
}

export async function getAnimeGenres() {
  try {
    const result = await fetchWithCache<{
      data: Array<{ mal_id: number; name: string }>;
    }>("/genres/anime");
    return result.data;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return [];
  }
}

export async function getAnimeByGenre(genreId: number, page: number = 1) {
  return fetchWithCache<AnimeSearchResult>("/anime", {
    genres: genreId,
    page,
    limit: 25,
    order_by: "score",
    sort: "desc",
  });
}

export async function getSeasonalAnime(season: string, year: number) {
  return fetchWithCache<TopAnimeResult>(`/seasons/${year}/${season}`, {
    limit: 25,
  });
}
