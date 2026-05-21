"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";

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
    }, 5000); // Change every 5 seconds

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
    <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] bg-secondary neo-card overflow-hidden group">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={currentAnime.title}
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          {/* Halftone dot pattern overlay for comic effect */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 md:p-16 lg:w-2/3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-black bg-primary inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] uppercase tracking-tighter leading-tight rotate-[-1deg]">
              {currentAnime.title}
            </h1>

            {/* Info */}
            <div className="flex items-center gap-3 text-sm md:text-base font-bold text-black">
              <span className="flex items-center gap-1 bg-white border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_0_#000]">
                <span className="text-xl">★</span> {currentAnime.score?.toFixed(1) || "N/A"}
              </span>
              <span className="bg-accent border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_0_#000]">
                {currentAnime.episodes || "??"} EPS
              </span>
              <span className="bg-secondary border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_0_#000]">
                {currentAnime.type}
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-sm md:text-lg text-white font-bold bg-black/80 border-4 border-black p-4 shadow-[4px_4px_0_0_#fff] line-clamp-3 max-w-3xl leading-relaxed backdrop-blur-sm">
              {currentAnime.synopsis?.slice(0, 250)}...
            </p>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="neo-button bg-primary text-black hover:bg-yellow-300 px-8 h-14"
              >
                <Play size={20} className="mr-2 font-black" />
                Watch Now
              </Button>
              <Link href={`/anime/${currentAnime.mal_id}`}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="neo-button bg-white text-black hover:bg-gray-100 px-8 h-14"
                >
                  <Info size={20} className="mr-2 font-black" />
                  Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all z-10 hidden md:block"
      >
        <ChevronLeft size={24} className="font-black" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all z-10 hidden md:block"
      >
        <ChevronRight size={24} className="font-black" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] rounded-full">
        {animeList.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-4 w-4 rounded-full border-4 border-black transition-all duration-150 ${
              index === currentIndex
                ? "bg-accent scale-110"
                : "bg-white hover:bg-secondary"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2 font-black bg-white text-black border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] uppercase text-sm">
        {autoPlay ? (
          <><div className="w-3 h-3 bg-destructive border-2 border-black animate-pulse" /> Auto</>
        ) : (
          <><div className="w-3 h-3 bg-black border-2 border-black" /> Manual</>
        )}
      </div>
    </div>
  );
}
