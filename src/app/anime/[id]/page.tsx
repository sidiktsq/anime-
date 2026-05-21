import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAnimeById, getAnimeCharacters, getLatestEpisodeCount } from "@/services/animeService";
import { DetailPageSkeleton } from "@/components/ui/skeleton";
import { Star, Calendar, Tv, Users, Clock, Film, ArrowLeft, Play, Heart, Share2, BookOpen } from "lucide-react";

async function AnimeDetail({ animeId }: { animeId: number }) {
  const [anime, characters] = await Promise.all([
    getAnimeById(animeId),
    getAnimeCharacters(animeId),
  ]);

  if (!anime) {
    return (
      <div className="text-center py-24">
        <div className="glass-card inline-block p-12 rounded-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">Anime not found</h1>
          <p className="text-muted-foreground mb-6">The anime you are looking for does not exist or has been removed.</p>
          <Link href="/anime" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all">
            <ArrowLeft size={18} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Fetch latest episode count if total episodes are unknown (ongoing anime)
  const latestEpisodeCount = !anime.episodes ? await getLatestEpisodeCount(animeId) : 0;
  const totalEpisodes = anime.episodes || latestEpisodeCount || 0;

  const coverUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  // Generate episode list
  const episodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={anime.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

        {/* Content on banner */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-end">
          {/* Cover Poster */}
          {coverUrl && (
            <div className="hidden md:block relative w-48 h-72 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl flex-shrink-0">
              <Image src={coverUrl} alt={anime.title} fill className="object-cover" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              {anime.type && (
                <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                  {anime.type}
                </span>
              )}
              {anime.status && (
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  anime.airing ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  {anime.airing ? "Currently Airing" : anime.status}
                </span>
              )}
              {anime.rating && (
                <span className="px-3 py-1 text-xs font-bold bg-white/10 text-white/70 rounded-full border border-white/10">
                  {anime.rating}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-xl">
              {anime.title}
            </h1>

            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-lg text-zinc-400 font-medium">{anime.title_english}</p>
            )}

            {/* Stats Row */}
            <div className="flex items-center flex-wrap gap-4 text-sm font-semibold">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span className="text-white text-lg">{anime.score?.toFixed(1) || "N/A"}</span>
                {anime.scored_by > 0 && (
                  <span className="text-zinc-500 text-xs ml-1">({anime.scored_by?.toLocaleString()} votes)</span>
                )}
              </div>
              {anime.episodes && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Tv size={16} />
                  <span>{anime.episodes} Episodes</span>
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock size={16} />
                  <span>{anime.duration}</span>
                </div>
              )}
              {anime.year && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar size={16} />
                  <span>{anime.year}</span>
                </div>
              )}
              {anime.members > 0 && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Users size={16} />
                  <span>{anime.members?.toLocaleString()} members</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/watch/${anime.mal_id}`} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all">
                <Play size={20} fill="currentColor" /> Watch Now
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-105">
                <Heart size={20} /> Bookmark
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-105">
                <Share2 size={20} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Synopsis */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="p-2 rounded-lg bg-primary/10 text-primary"><BookOpen size={22} /></span>
              <h2 className="text-2xl font-bold text-white">Synopsis</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[15px] whitespace-pre-line">
              {anime.synopsis || "No synopsis available for this anime."}
            </p>
            {anime.background && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Background</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{anime.background}</p>
              </div>
            )}
          </div>

          {/* Episode List */}
          {totalEpisodes > 0 && (
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="p-2 rounded-lg bg-secondary/10 text-secondary"><Film size={22} /></span>
                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                <span className="ml-auto text-sm text-zinc-500">{totalEpisodes} total</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {episodes.map((ep) => (
                  <Link
                    key={ep}
                    href={`/watch/${anime.mal_id}?ep=${ep}`}
                    className="group relative flex items-center justify-center aspect-square rounded-xl bg-zinc-900 border border-zinc-800 hover:border-primary hover:bg-primary/10 transition-all text-sm font-bold text-zinc-400 hover:text-primary"
                  >
                    {ep}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={14} fill="currentColor" className="text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
              {totalEpisodes > 100 && (
                <p className="text-center text-xs text-zinc-600 mt-4">Showing all {totalEpisodes} episodes</p>
              )}
            </div>
          )}

          {/* Characters */}
          {characters && characters.length > 0 && (
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="p-2 rounded-lg bg-accent/10 text-accent"><Users size={22} /></span>
                <h2 className="text-2xl font-bold text-white">Characters</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {characters.slice(0, 8).map((char) => {
                  const charImg =
                    (char.character?.images as Record<string, Record<string, string>>)?.jpg?.image_url;
                  return (
                    <div key={char.character.mal_id} className="flex gap-3 items-center bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
                      {charImg && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-zinc-700">
                          <Image
                            src={charImg}
                            alt={char.character.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{char.character.name}</p>
                        <p className="text-xs text-zinc-500">{char.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Source", value: anime.source },
                { label: "Studios", value: anime.studios?.map(s => s.name).join(", ") },
                { label: "Duration", value: anime.duration },
                { label: "Status", value: anime.status },
                { label: "Aired", value: anime.aired?.string },
                { label: "Season", value: anime.season && anime.year ? `${anime.season} ${anime.year}` : null },
                { label: "Rank", value: anime.rank ? `#${anime.rank}` : null },
                { label: "Popularity", value: anime.popularity ? `#${anime.popularity}` : null },
                { label: "Members", value: anime.members?.toLocaleString() },
                { label: "Favorites", value: anime.favorites?.toLocaleString() },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-medium text-white text-right max-w-[60%]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Link
                    key={genre.mal_id}
                    href={`/genres?id=${genre.mal_id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-primary hover:text-primary transition-all"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Themes & Demographics */}
          {(anime.themes?.length > 0 || anime.demographics?.length > 0) && (
            <div className="glass-card rounded-2xl p-6">
              {anime.themes && anime.themes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-3">Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.themes.map((theme) => (
                      <span key={theme.mal_id} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                        {theme.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {anime.demographics && anime.demographics.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Demographics</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.demographics.map((demo) => (
                      <span key={demo.mal_id} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent/10 text-accent border border-accent/20">
                        {demo.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animeId = parseInt(id);

  if (isNaN(animeId)) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-24">
            <h1 className="text-2xl font-bold text-white mb-4">Invalid anime ID</h1>
            <Link href="/anime" className="text-primary hover:underline">Back to catalog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-semibold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back
        </Link>

        <Suspense fallback={<DetailPageSkeleton />}>
          <AnimeDetail animeId={animeId} />
        </Suspense>
      </div>
    </div>
  );
}
