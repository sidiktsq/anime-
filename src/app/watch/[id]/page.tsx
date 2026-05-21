import { getAnimeById } from "@/services/animeService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bookmark, MessageSquare, Play } from "lucide-react";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object (Next.js 16 requirement)
  const { id } = await params;
  const animeId = parseInt(id);
  const anime = await getAnimeById(animeId);

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Anime not found</h1>
          <p className="text-muted-foreground mb-6">The anime you are trying to watch does not exist.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const totalEpisodes = anime.episodes || 12; // Fallback to 12 if unknown

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container mx-auto px-4 py-8">
        
        <Link href={`/anime/${anime.mal_id}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-semibold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Player */}
              <div className="w-full aspect-video bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden group">
                {anime.trailer?.embed_url ? (
                  <iframe
                    src={`${anime.trailer.embed_url}?autoplay=1&mute=0`}
                    title={`${anime.title} Trailer`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    {/* Background ambient light */}
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <Play size={40} className="text-primary ml-2" fill="currentColor" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Video Not Available
                      </h3>
                      <p className="text-zinc-500 text-sm max-w-xs">
                        No YouTube trailer or video source found for this anime.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Player Controls & Info */}
              <div className="p-6 md:p-8 bg-zinc-900/50">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-6">
                  {anime.title} - Episode 1
                </h1>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button className="rounded-full px-6 font-bold bg-white/10 text-white hover:bg-white/20 border border-white/10">
                    <Bookmark size={18} className="mr-2" /> Add to List
                  </Button>
                  <Button className="rounded-full px-6 font-bold bg-white/10 text-white hover:bg-white/20 border border-white/10">
                    <MessageSquare size={18} className="mr-2" /> Comments
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Episode List */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  Episodes
                </h3>
                <span className="text-sm font-semibold text-zinc-500">{totalEpisodes} Total</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({ length: totalEpisodes }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-between group ${
                      i === 0
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-zinc-900/50 text-zinc-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-mono">Episode {i + 1}</span>
                    {i === 0 && <Play size={16} fill="currentColor" />}
                    {i !== 0 && <Play size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="glass-panel p-6 rounded-2xl border border-primary/20">
              <p className="font-medium text-sm text-zinc-300">
                <span className="text-primary font-bold mr-2">Info:</span>
                Watch feature is currently a placeholder template. Real video streaming integration coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
