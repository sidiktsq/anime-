"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const coverUrl = anime.images?.jpg?.image_url || anime.images?.jpg?.small_image_url;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full">
        <Link href={`/anime/${anime.mal_id}`}>
          <div className="neo-card h-full flex flex-col overflow-hidden">
            <div className="relative w-full h-72 border-b-4 border-black overflow-hidden bg-white">
              {coverUrl && (
                <Image
                  src={coverUrl}
                  alt={anime.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-500 ease-out"
                />
              )}
              
              {/* Type Badge Floating */}
              {anime.type && (
                <div className="absolute top-3 left-3 neo-badge bg-primary text-black">
                  {anime.type}
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col gap-3 bg-white">
              <h3 className="font-black text-xl text-black line-clamp-2 leading-tight uppercase tracking-tight">
                {anime.title}
              </h3>

              <div className="flex items-center justify-between text-sm font-bold text-black border-b-2 border-black pb-3">
                <div className="flex items-center gap-1.5 bg-yellow-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000]">
                  <Star size={16} fill="currentColor" />
                  {anime.score?.toFixed(1) || "N/A"}
                </div>
                <span className="bg-secondary px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000]">
                  {anime.episodes || "??"} EPS
                </span>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {anime.status && (
                  <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0_0_#000] ${
                    anime.status === "Finished Airing" 
                    ? "bg-green-300 text-black" 
                    : "bg-blue-300 text-black"
                  }`}>
                    {anime.status === "Finished Airing" ? "Completed" : anime.status}
                  </span>
                )}
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {anime.genres?.slice(0, 2).map((genre, i) => (
                  <span
                    key={genre.mal_id}
                    className={`text-xs font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] ${i % 2 === 0 ? 'bg-accent' : 'bg-primary'}`}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-sm font-bold text-black/70 line-clamp-2 leading-relaxed">
                {anime.synopsis || "No description available"}
              </p>
            </div>
          </div>
        </Link>

        <div className="mt-4">
          <Link 
            href={`/watch/${anime.mal_id}`}
            className="neo-button inline-flex w-full items-center justify-center px-4 py-3 bg-primary hover:bg-yellow-300 text-black text-sm"
          >
            Watch Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
