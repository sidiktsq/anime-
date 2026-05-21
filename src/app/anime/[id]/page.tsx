import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAnimeById, getAnimeCharacters } from "@/services/animeService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailPageSkeleton } from "@/components/ui/skeleton";
import { Star, Calendar, Tv, Users } from "lucide-react";

interface DetailPageProps {
  params: {
    id: string;
  };
}

async function AnimeDetail({ animeId }: { animeId: number }) {
  const anime = await getAnimeById(animeId);

  if (!anime) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">Anime not found</h1>
        <Link href="/anime">
          <Button variant="outline">Back to Anime</Button>
        </Link>
      </div>
    );
  }

  const coverUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cover Image */}
        {coverUrl && (
          <div className="md:col-span-1">
            <div className="relative w-full h-96 rounded-lg overflow-hidden border-4 border-white">
              <Image
                src={coverUrl}
                alt={anime.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Info */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              {anime.title}
            </h1>
            {anime.title_english && (
              <p className="text-white/70 text-lg">{anime.title_english}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card variant="bordered" className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star size={16} className="text-yellow-400" />
              </div>
              <p className="text-yellow-400 font-bold text-lg">{anime.score?.toFixed(1)}</p>
              <p className="text-xs text-white/70">Rating</p>
            </Card>

            <Card variant="bordered" className="p-3 text-center">
              <p className="text-white font-bold text-lg">{anime.episodes}</p>
              <p className="text-xs text-white/70">Episodes</p>
            </Card>

            <Card variant="bordered" className="p-3 text-center">
              <p className="text-white font-bold text-lg">{anime.type}</p>
              <p className="text-xs text-white/70">Type</p>
            </Card>

            <Card variant="bordered" className="p-3 text-center">
              <p className="text-white font-bold text-lg">{anime.year}</p>
              <p className="text-xs text-white/70">Year</p>
            </Card>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white text-black font-bold rounded text-sm">
              {anime.status}
            </span>
            <span className="px-3 py-1 border-2 border-white text-white font-bold rounded text-sm">
              {anime.rating}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap pt-4">
            <Button size="lg" variant="primary">
              ▶ Watch Now
            </Button>
            <Button size="lg" variant="outline">
              ♥ Add to Bookmark
            </Button>
            <Button size="lg" variant="ghost">
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <Card variant="default">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Synopsis</h2>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 leading-relaxed">{anime.synopsis}</p>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">Details</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Source:</span>
              <span className="font-semibold text-white">{anime.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Studios:</span>
              <span className="font-semibold text-white">
                {anime.studios?.map((s) => s.name).join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Duration:</span>
              <span className="font-semibold text-white">{anime.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Aired:</span>
              <span className="font-semibold text-white">{anime.aired?.string}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Scored by:</span>
              <span className="font-semibold text-white">{anime.scored_by?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Members:</span>
              <span className="font-semibold text-white">{anime.members?.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">Genres</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {anime.genres?.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-white text-black font-semibold rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Trailer */}
      {anime.trailer?.embed_url && (
        <Card variant="default">
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Trailer</h2>
          </CardHeader>
          <CardContent>
            <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                src={anime.trailer.embed_url}
                className="absolute inset-0 w-full h-full border-2 border-white"
                allowFullScreen
                title="Anime Trailer"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AnimePage({ params }: DetailPageProps) {
  const animeId = parseInt(params.id);

  if (isNaN(animeId)) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Invalid anime ID</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <Link href="/anime" className="text-white font-semibold mb-6 inline-block hover:text-white/70">
          ← Back to Anime
        </Link>

        <Suspense fallback={<DetailPageSkeleton />}>
          <AnimeDetail animeId={animeId} />
        </Suspense>
      </div>
    </div>
  );
}
