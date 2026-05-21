"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Info, Star } from "lucide-react";

interface HeroSectionProps {
  animeList: Anime[];
}

export function HeroSection({ animeList }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentAnime = animeList[currentIndex];

  useEffect(() => {
    if (!autoPlay || animeList.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % animeList.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay, animeList.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  if (!currentAnime) return null;

  const coverUrl = currentAnime.images?.jpg?.large_image_url || currentAnime.images?.jpg?.image_url;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] min-h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
      {/* Background Image & Overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={currentAnime.title}
              fill
              className="object-cover"
              priority
            />
          )}
          
          {/* Multiple gradient layers for premium cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 md:p-16 lg:w-2/3 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 max-w-3xl"
          >
            {/* Meta Tags */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
              <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full backdrop-blur-sm border border-yellow-400/20">
                <Star size={16} fill="currentColor" /> {currentAnime.score?.toFixed(1) || "N/A"}
              </span>
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {currentAnime.type}
              </span>
              <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {currentAnime.episodes ? `${currentAnime.episodes} Episodes` : "Ongoing"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-xl">
              {currentAnime.title}
            </h1>

            {/* Synopsis */}
            <p className="text-sm md:text-lg text-zinc-300 line-clamp-3 leading-relaxed drop-shadow-md max-w-2xl">
              {currentAnime.synopsis || "No synopsis available."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 rounded-full text-base font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
              >
                <Play size={20} className="mr-2 fill-current" />
                Watch Now
              </Button>
              <Link href={`/anime/${currentAnime.mal_id}`}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 h-14 rounded-full text-base font-bold backdrop-blur-md transition-all hover:scale-105"
                >
                  <Info size={20} className="mr-2" />
                  More Info
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-8 bottom-8 flex gap-4 z-20">
        <button
          onClick={goToPrevious}
          className="p-3 md:p-4 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="p-3 md:p-4 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-8 md:left-16 flex gap-3 z-20">
        {animeList.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                : "w-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
