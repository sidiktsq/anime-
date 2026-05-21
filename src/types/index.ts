// Anime Types
export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeStudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  role: string;
  voice_actors?: Array<{
    person: {
      mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      name: string;
    };
    language: string;
  }>;
}

export interface AnimeTrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp?: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: AnimeTrailer;
  approved: boolean;
  titles: Array<{
    type: string;
    title: string;
  }>;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string; // TV, Movie, OVA, Special, ONA, Music
  source: string; // Manga, Light novel, etc
  episodes: number | null;
  status: string; // Finished Airing, Currently Airing, Not yet aired
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  duration: string; // e.g. "24 min per ep"
  rating: string; // PG-13, R, R+, etc
  score: number; // 1-10
  scored_by: number;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string; // fall, winter, spring, summer
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: AnimeStudio[];
  licensors: AnimeStudio[];
  studios: AnimeStudio[];
  genres: AnimeGenre[];
  explicit_genres: AnimeGenre[];
  themes: AnimeGenre[];
  demographics: AnimeGenre[];
}

export interface AnimeSearchResult {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface TopAnimeResult {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

// User Session
export interface UserSession {
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  expires?: string;
}

// Bookmark
export interface BookmarkedAnime {
  id: string;
  userId: string;
  animeId: number;
  createdAt: Date;
}

// Watch History
export interface AnimeWatchHistory {
  id: string;
  userId: string;
  animeId: number;
  episodeNumber: number | null;
  watchedAt: Date;
}

// Comments
export interface AnimeComment {
  id: string;
  userId: string;
  animeId: number;
  content: string;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
}
