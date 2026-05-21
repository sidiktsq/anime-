import { Suspense } from "react";
import { getTrendingAnime } from "@/services/animeService";
import { AnimeCard } from "@/components/shared/anime-card";
import { AnimeCardSkeleton } from "@/components/ui/skeleton";
import { Anime } from "@/types";

async function TrendingContent() {
  try {
    const data = await getTrendingAnime();
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch trending:", error);
    return <div className="text-center text-white text-lg">Failed to load trending anime</div>;
  }
}

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white border-4 border-white px-4 py-2 w-fit bg-black mb-4">
            🔥 Trending Anime
          </h1>
          <p className="text-white/70 font-semibold">
            Most popular anime right now
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <TrendingContent />
        </Suspense>
      </div>
    </div>
  );
}
