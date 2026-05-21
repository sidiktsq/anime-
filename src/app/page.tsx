import { Suspense } from "react";
import { getTopAnime, getTrendingAnime } from "@/services/animeService";
import { HeroSection } from "@/components/sections/hero-section";
import { AnimeCard } from "@/components/shared/anime-card";
import { AnimeCardSkeleton, HeroSkeleton } from "@/components/ui/skeleton";
import { Anime } from "@/types";
import { Flame, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

async function HeroContent() {
  try {
    const data = await getTrendingAnime();
    return (
      <HeroSection animeList={data.data} />
    );
  } catch (error) {
    console.error("Failed to fetch hero content:", error);
    return <div className="w-full h-[70vh] glass-card rounded-3xl flex items-center justify-center text-muted-foreground">Failed to load hero content</div>;
  }
}

async function TrendingContent() {
  try {
    const data = await getTopAnime(1, 12);
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {data.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch trending:", error);
    return <div className="text-center text-muted-foreground py-10">Failed to load trending anime</div>;
  }
}

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-primary/30 selection:text-primary">
      {/* Ambient Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none -z-10" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroContent />
        </Suspense>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Flame size={24} />
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Trending <span className="text-gradient">Now</span>
              </h2>
            </div>
            <p className="text-muted-foreground font-medium max-w-2xl text-sm md:text-base">
              Discover the most popular anime series that everyone is watching right now. Updated in real-time.
            </p>
          </div>
          <Link href="/trending" className="group flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 border border-zinc-800 rounded-full px-5 py-2.5">
            View all 
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {[...Array(12)].map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <TrendingContent />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 mb-10">
        <div className="glass-panel rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary/20 blur-3xl rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="p-3 rounded-2xl bg-white/5 mb-6 border border-white/10">
              <Sparkles className="text-secondary" size={32} />
            </span>
            <h3 className="text-3xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
              Ready to Dive In?
            </h3>
            <p className="text-muted-foreground font-medium mb-10 text-lg md:text-xl">
              Create an account to keep track of what you've watched, bookmark your favorites, and discover your next obsession.
            </p>
            <Link
              href="/anime"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
            >
              Explore the Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
