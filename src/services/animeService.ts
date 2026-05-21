import { Anime, AnimeSearchResult, TopAnimeResult } from "@/types";

const JIKAN_API = process.env.NEXT_PUBLIC_JIKAN_API || "https://api.jikan.moe/v4";
const MAL_API = "https://api.myanimelist.net/v2";
const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID || "498ad5b24b22bb3b979614884ac1f0b6";

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
  params?: Record<string, unknown>,
  useMal: boolean = false
): Promise<T> {
  const cacheKey = getCacheKey(useMal ? `MAL:${endpoint}` : `JIKAN:${endpoint}`, params);

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data as T;
  }

  // Build URL with params
  const baseUrl = useMal ? MAL_API : JIKAN_API;
  const url = new URL(`${baseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: HeadersInit = {};
  if (useMal) {
    headers["X-MAL-CLIENT-ID"] = MAL_CLIENT_ID;
  }

  try {
    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`${useMal ? 'MAL' : 'Jikan'} API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Store in cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Mapper from MAL API Node to Jikan Anime Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMalNodeToJikan(node: any): Anime {
  return {
    mal_id: node.id,
    url: `https://myanimelist.net/anime/${node.id}`,
    images: {
      jpg: {
        image_url: node.main_picture?.medium || "",
        small_image_url: node.main_picture?.medium || "",
        large_image_url: node.main_picture?.large || "",
      },
    },
    trailer: {
      youtube_id: "",
      url: "",
      embed_url: "",
      images: {
        image_url: "",
        small_image_url: "",
        medium_image_url: "",
        large_image_url: "",
        maximum_image_url: "",
      },
    },
    approved: true,
    titles: [{ type: "Default", title: node.title }],
    title: node.title,
    title_english: node.alternative_titles?.en || node.title,
    title_japanese: node.alternative_titles?.ja || "",
    title_synonyms: node.alternative_titles?.synonyms || [],
    type: node.media_type ? node.media_type.toUpperCase() : "TV",
    source: node.source || "Original",
    episodes: node.num_episodes || null,
    status: node.status || "Finished Airing",
    airing: node.status === "currently_airing",
    aired: {
      from: node.start_date || "",
      to: node.end_date || null,
      prop: { from: { day: null, month: null, year: null }, to: { day: null, month: null, year: null } },
      string: node.start_date || "",
    },
    duration: node.average_episode_duration ? `${Math.floor(node.average_episode_duration / 60)} min` : "Unknown",
    rating: node.rating || "PG-13",
    score: node.mean || 0,
    scored_by: node.num_scoring_users || 0,
    rank: node.rank || null,
    popularity: node.popularity || 0,
    members: node.num_list_users || 0,
    favorites: 0,
    synopsis: node.synopsis || "No synopsis available.",
    background: node.background || "",
    season: node.start_season?.season || "Unknown",
    year: node.start_season?.year || null,
    broadcast: { day: null, time: null, timezone: null, string: null },
    producers: [],
    licensors: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    studios: (node.studios || []).map((s: any) => ({ mal_id: s.id, type: "anime", name: s.name, url: "" })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genres: (node.genres || []).map((g: any) => ({ mal_id: g.id, type: "anime", name: g.name, url: "" })),
    explicit_genres: [],
    themes: [],
    demographics: [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMalListToJikan(malResponse: any): TopAnimeResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (malResponse.data || []).map((item: any) => mapMalNodeToJikan(item.node));
  return {
    data,
    pagination: {
      last_visible_page: 1,
      has_next_page: !!malResponse.paging?.next,
      current_page: 1,
    }
  };
}

export async function getTopAnime(page: number = 1, limit: number = 25) {
  const offset = (page - 1) * limit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const malData = await fetchWithCache<any>("/anime/ranking", {
    ranking_type: "all",
    limit,
    offset,
    fields: "id,title,main_picture,synopsis,mean,num_episodes,media_type,status"
  }, true);
  return mapMalListToJikan(malData);
}

export async function getTrendingAnime() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const malData = await fetchWithCache<any>("/anime/ranking", {
    ranking_type: "airing",
    limit: 10,
    fields: "id,title,main_picture,synopsis,mean,num_episodes,media_type,status"
  }, true);
  return mapMalListToJikan(malData);
}

export async function searchAnime(query: string, page: number = 1) {
  if (!query.trim()) {
    return { data: [], pagination: {} };
  }
  const limit = 25;
  const offset = (page - 1) * limit;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const malData = await fetchWithCache<any>("/anime", {
    q: query,
    limit,
    offset,
    fields: "id,title,main_picture,synopsis,mean,num_episodes,media_type,status"
  }, true);
  
  return mapMalListToJikan(malData) as unknown as AnimeSearchResult;
}

export async function getAnimeById(id: number): Promise<Anime | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node = await fetchWithCache<any>(`/anime/${id}`, {
      fields: "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics"
    }, true);
    return mapMalNodeToJikan(node);
  } catch (error) {
    console.error(`Failed to fetch anime ${id}:`, error);
    return null;
  }
}

// ============================================================================
// FALLBACKS
// We retain Jikan API for these endpoints because MAL v2 doesn't have 1:1 public counterparts
// without requiring OAuth token (like user lists) or they require scraping/different logic.
// ============================================================================

export async function getAnimeCharacters(id: number) {
  try {
    const result = await fetchWithCache<{
      data: Array<{
        character: { mal_id: number; name: string; images: Record<string, unknown> };
        role: string;
        voice_actors: Array<{ person: { name: string } }>;
      }>;
    }>(`/anime/${id}/characters`, undefined, false);
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
    }>("/genres/anime", undefined, false);
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
  }, false);
}

export async function getSeasonalAnime(season: string, year: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const malData = await fetchWithCache<any>(`/anime/season/${year}/${season}`, {
    limit: 25,
    fields: "id,title,main_picture,synopsis,mean,num_episodes,media_type,status"
  }, true);
  return mapMalListToJikan(malData);
}
