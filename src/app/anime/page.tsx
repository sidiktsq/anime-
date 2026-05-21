"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimeCard } from "@/components/shared/anime-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimeCardSkeleton } from "@/components/ui/skeleton";
import { Anime } from "@/types";
import { Search, Filter } from "lucide-react";

export default function AnimePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genres") || "";

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [genreId, setGenreId] = useState(initialGenre);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchAnime = async (
    searchTerm: string = "",
    pageNum: number = 1,
    genres: string = ""
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("q", searchTerm.trim());
      if (genres) params.set("genres", genres);
      params.set("page", String(pageNum));
      const url = `/api/anime?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();

      if (pageNum === 1) {
        setAnimeList(data.data || []);
      } else {
        setAnimeList((prev) => [...prev, ...(data.data || [])]);
      }

      setHasMore(data.pagination?.has_next_page || false);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
    setGenreId(initialGenre);
    fetchAnime(initialQuery, 1, initialGenre);
  }, [initialQuery, initialGenre]);

  const updateUrl = (query: string, genres: string) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (genres) params.set("genres", genres);
    router.replace(`/anime?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateUrl(query, genreId);
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchAnime(searchQuery, page + 1, genreId);
  };

  useEffect(() => {
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, searchQuery, genreId, page]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white border-4 border-white px-4 py-2 w-fit bg-black mb-4">
            📚 All Anime
          </h1>
          <p className="text-white/70 font-semibold">
            Browse and search through our entire anime collection
          </p>
        </div>

        <div className="flex gap-4 mb-8 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search anime by title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
              size={20}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={genreId === "1" ? "primary" : "outline"}
              size="md"
              onClick={() => {
                setGenreId("1");
                updateUrl(searchQuery, "1");
              }}
            >
              Action
            </Button>
            <Button
              variant={genreId === "2" ? "primary" : "outline"}
              size="md"
              onClick={() => {
                setGenreId("2");
                updateUrl(searchQuery, "2");
              }}
            >
              Adventure
            </Button>
            <Button
              variant={genreId === "0" ? "outline" : "outline"}
              size="md"
              onClick={() => {
                setGenreId("");
                updateUrl(searchQuery, "");
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        )}

        {animeList.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-2xl font-bold text-white mb-4">No anime found</p>
            <p className="text-white/70 mb-6">
              Try searching for a different title or browse all anime
            </p>
            <Button
              size="md"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setGenreId("");
                updateUrl("", "");
              }}
            >
              Clear Search
            </Button>
          </div>
        )}

        <div ref={sentinelRef} className="h-8" />
      </div>
    </div>
  );
}
