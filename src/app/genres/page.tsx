import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

const GENRES = [
  { id: 1, name: "Action", emoji: "⚔️", color: "from-red-500/20 to-red-500/5", border: "border-red-500/30", text: "text-red-400" },
  { id: 2, name: "Adventure", emoji: "🗺️", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-400" },
  { id: 4, name: "Comedy", emoji: "😂", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-400" },
  { id: 8, name: "Drama", emoji: "🎭", color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-400" },
  { id: 10, name: "Fantasy", emoji: "✨", color: "from-pink-500/20 to-pink-500/5", border: "border-pink-500/30", text: "text-pink-400" },
  { id: 14, name: "Horror", emoji: "👻", color: "from-zinc-500/20 to-zinc-500/5", border: "border-zinc-500/30", text: "text-zinc-400" },
  { id: 22, name: "Romance", emoji: "💕", color: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/30", text: "text-rose-400" },
  { id: 24, name: "Sci-Fi", emoji: "🚀", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400" },
  { id: 30, name: "Sports", emoji: "⚽", color: "from-green-500/20 to-green-500/5", border: "border-green-500/30", text: "text-green-400" },
  { id: 37, name: "Supernatural", emoji: "🔮", color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/30", text: "text-indigo-400" },
  { id: 40, name: "Psychological", emoji: "🧠", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/30", text: "text-cyan-400" },
  { id: 41, name: "Thriller", emoji: "🎬", color: "from-slate-500/20 to-slate-500/5", border: "border-slate-500/30", text: "text-slate-400" },
];

export default function GenresPage() {
  return (
    <div className="min-h-screen relative pb-20">
      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <Clapperboard size={28} />
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Explore <span className="text-gradient">Genres</span>
              </h1>
            </div>
            <p className="text-lg font-medium text-zinc-400">
              Browse your favorite anime by category and mood.
            </p>
          </div>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-16">
          {GENRES.map((genre) => (
            <Link key={genre.id} href={`/anime?genres=${genre.id}`}>
              <div className={`h-full bg-gradient-to-br ${genre.color} border ${genre.border} p-6 rounded-2xl text-center shadow-lg hover:shadow-xl hover:scale-105 hover:border-white/20 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-4 relative overflow-hidden backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 relative z-10">
                  {genre.emoji}
                </div>
                <div className={`text-base font-bold tracking-wide ${genre.text} relative z-10`}>
                  {genre.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">
            Looking for something specific?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">
            You can combine genres, search by keywords, and filter by season in our full catalog page to find exactly what you want to watch.
          </p>
          <Link href="/anime" className="relative z-10">
            <Button className="rounded-full px-8 py-6 font-bold bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105">
              Browse Full Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}