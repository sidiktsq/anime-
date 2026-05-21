import { getAnimeById } from "@/services/animeService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WatchPageProps {
  params: {
    id: string;
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const animeId = parseInt(params.id);
  const anime = await getAnimeById(animeId);

  if (!anime) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Anime not found</h1>
          <Link href="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black border-4 border-white rounded-lg overflow-hidden">
              {/* Video Player Placeholder */}
              <div className="w-full aspect-video bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">▶</div>
                  <p className="text-white/70 font-semibold">
                    Video Player Placeholder
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Integrate your preferred video player library
                  </p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-4 border-t-4 border-white">
                <h2 className="text-xl font-bold text-white mb-4">
                  {anime.title} - Episode 1
                </h2>

                {/* Episode Selection */}
                <div className="mb-4">
                  <p className="text-white/70 text-sm mb-2">Episodes:</p>
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: Math.min(12, anime.episodes || 12) }).map(
                      (_, i) => (
                        <button
                          key={i + 1}
                          className={`px-3 py-1 rounded font-semibold border-2 transition-colors ${
                            i === 0
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white border-white hover:bg-white/10"
                          }`}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="primary">
                    ♥ Add to Bookmark
                  </Button>
                  <Button size="sm" variant="outline">
                    📝 Write Review
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Episode List */}
          <div>
            <div className="bg-black border-4 border-white rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-white pb-2">
                Episodes
              </h3>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Array.from({ length: anime.episodes || 12 }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`w-full text-left px-3 py-2 rounded font-semibold border-2 transition-colors ${
                      i === 0
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                    }`}
                  >
                    <span className="font-mono">EP {i + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-4 bg-white text-black p-4 rounded-lg border-4 border-black">
              <p className="font-semibold text-sm">
                💡 Watch feature is in development. Video player integration coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
