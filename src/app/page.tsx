import { Suspense } from "react";
import { getTopAnime, getTrendingAnime } from "@/services/animeService";
import { HeroSection } from "@/components/sections/hero-section";
import { AnimeCard } from "@/components/shared/anime-card";
import { AnimeCardSkeleton, HeroSkeleton } from "@/components/ui/skeleton";
import { Anime } from "@/types";

async function HeroContent() {
  try {
    const data = await getTrendingAnime();
    return (
      <HeroSection animeList={data.data} />
    );
  } catch (error) {
    console.error("Failed to fetch hero content:", error);
    return <div className="w-full h-96 bg-black border-4 border-white rounded-lg" />;
  }
}

async function TrendingContent() {
  try {
    const data = await getTopAnime(1, 12);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch trending:", error);
    return <div className="text-center text-white">Failed to load trending anime</div>;
  }
}

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-primary selection:text-black">
      {/* Background ambient glow - removed for neo brutalism */}
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 border-b-4 border-black">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroContent />
        </Suspense>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 py-16 border-b-4 border-black bg-white">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 flex items-center gap-2 uppercase">
              <span className="bg-primary px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] rotate-[-2deg]">Trending</span>
              <span className="bg-accent px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] rotate-[2deg]">Now</span>
              <span className="text-3xl ml-2 animate-bounce-sm">🔥</span>
            </h2>
            <p className="text-black font-bold text-lg bg-yellow-200 inline-block px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_#000]">
              Most popular anime this season
            </p>
          </div>
          <a href="/trending" className="neo-button bg-secondary text-black px-6 py-3 text-lg h-fit flex items-center gap-2">
            View all <span>→</span>
          </a>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <TrendingContent />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-primary border-b-4 border-black">
        <div className="neo-card bg-accent p-10 md:p-16 text-center max-w-4xl mx-auto transform rotate-1">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-black mb-6 text-black uppercase border-4 border-black bg-white inline-block px-6 py-3 shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
              Discover More
            </h3>
            <p className="text-black font-bold mb-8 text-xl bg-white/90 border-4 border-black p-4 shadow-[4px_4px_0_0_#000]">
              Browse through thousands of anime titles, keep track of what you've watched, and discover your next favorite series.
            </p>
            <a
              href="/anime"
              className="neo-button inline-flex items-center justify-center px-10 py-5 bg-secondary text-black text-xl hover:bg-cyan-300"
            >
              Explore All Anime
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
