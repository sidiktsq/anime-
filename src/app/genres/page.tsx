import Link from "next/link";
import { Button } from "@/components/ui/button";

const GENRES = [
  { id: 1, name: "Action", emoji: "⚔️", color: "bg-red-300" },
  { id: 2, name: "Adventure", emoji: "🗺️", color: "bg-orange-300" },
  { id: 4, name: "Comedy", emoji: "😂", color: "bg-yellow-300" },
  { id: 8, name: "Drama", emoji: "🎭", color: "bg-purple-300" },
  { id: 10, name: "Fantasy", emoji: "✨", color: "bg-pink-300" },
  { id: 14, name: "Horror", emoji: "👻", color: "bg-gray-400" },
  { id: 22, name: "Romance", emoji: "💕", color: "bg-red-200" },
  { id: 24, name: "Sci-Fi", emoji: "🚀", color: "bg-blue-300" },
  { id: 30, name: "Sports", emoji: "⚽", color: "bg-green-300" },
  { id: 37, name: "Supernatural", emoji: "🔮", color: "bg-indigo-300" },
  { id: 40, name: "Psychological", emoji: "🧠", color: "bg-cyan-300" },
  { id: 41, name: "Thriller", emoji: "🎬", color: "bg-slate-400" },
];

export default function GenresPage() {
  return (\n    <div className=\"min-h-screen bg-secondary\">\n      <div className=\"container mx-auto px-4 py-12\">\n        {/* Header */}\n        <div className=\"mb-12\">\n          <h1 className=\"text-6xl font-black text-black border-4 border-black px-6 py-3 w-fit bg-white mb-4 shadow-[6px_6px_0_0_#000] uppercase tracking-tight\">\n            🎬 Genres\n          </h1>\n          <p className=\"text-lg font-bold text-black mt-4\">\n            Browse anime by your favorite genres\n          </p>\n        </div>\n\n        {/* Genre Grid */}\n        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12\">\n          {GENRES.map((genre) => (\n            <Link key={genre.id} href={`/anime?genres=${genre.id}`}>\n              <div className={`${genre.color} border-4 border-black p-8 rounded-xl text-center font-black shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all cursor-pointer group`}>\n                <div className=\"text-6xl mb-3 group-hover:scale-125 transition-transform\">{genre.emoji}</div>\n                <div className=\"text-xl uppercase tracking-wider text-black\">{genre.name}</div>\n              </div>\n            </Link>\n          ))}\n        </div>\n\n        {/* Info */}\n        <div className=\"bg-white border-4 border-black p-8 rounded-xl shadow-[6px_6px_0_0_#000] text-center\">\n          <p className=\"text-lg font-bold text-black mb-4\">\n            💡 Click any genre to browse anime in that category\n          </p>\n          <Link href=\"/anime\">\n            <Button className=\"neo-button bg-yellow-300 text-black font-black uppercase\">\n              Browse All Anime\n            </Button>\n          </Link>\n        </div>\n      </div>\n    </div>\n  );\n}\n