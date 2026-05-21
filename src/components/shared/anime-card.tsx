"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/types";
import { Star, Play } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  // Use large image url for best quality
  const coverUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/anime/${anime.mal_id}`} className="block h-full">
        <div className="glass-card h-full flex flex-col rounded-2xl overflow-hidden relative group">
          
          {/* Image Container */}
          <div className="relative w-full h-80 overflow-hidden bg-zinc-900">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={anime.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                No Image
              </div>
            )}
            
            {/* Gradient Overlay for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-90"></div>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {anime.type && (
                <span className="px-2.5 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full shadow-lg">
                  {anime.type}
                </span>
              )}
            </div>

            {/* Hover Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-5 flex-1 flex flex-col gap-3 relative z-10 -mt-6">
            <h3 className="font-bold text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {anime.title}
            </h3>

            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-foreground">{anime.score?.toFixed(1) || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{anime.episodes ? `${anime.episodes} Eps` : "Ongoing"}</span>
              </div>
              {anime.status && (
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  anime.status === "Finished Airing" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                  {anime.status === "Finished Airing" ? "Completed" : anime.status}
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap mt-1">
              {anime.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="text-[10px] font-semibold px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
              {anime.synopsis || "No description available"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
