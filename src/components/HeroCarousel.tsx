/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Song } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCarouselProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onTogglePlay: () => void;
}

export default function HeroCarousel({
  songs,
  currentSong,
  isPlaying,
  onPlay,
  onTogglePlay,
}: HeroCarouselProps) {
  // Ambil 6 lagu unggulan untuk carousel
  const featuredSongs = songs.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide setiap 6 detik
  useEffect(() => {
    if (featuredSongs.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredSongs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredSongs.length]);

  if (featuredSongs.length === 0) return null;

  const currentFeatured = featuredSongs[currentIndex];
  const isThisSongActive = currentSong?.id === currentFeatured.id;

  const handlePlayClick = () => {
    if (isThisSongActive) {
      onTogglePlay();
    } else {
      onPlay(currentFeatured);
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 mb-8 group select-none">
      {/* AREA GAMBAR & ANIMASI */}
      <div className="relative w-full h-full rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl border border-white/10 bg-[#121215]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatured.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Background Cover Image */}
            <img
              src={currentFeatured.cover}
              alt={currentFeatured.title}
              className="w-full h-full object-cover"
            />
            {/* Multi-gradient Vignette Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* CONTENT TEXT (DI ATAS GAMBAR) */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14 z-10 max-w-2xl">
          <motion.div
            key={`text-${currentFeatured.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c527] text-black text-[11px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,39,0.5)]">
                <i className="ri-fire-fill"></i> Trending Now
              </span>
              {currentFeatured.genre && (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium">
                  {currentFeatured.genre}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-1.5 tracking-tight leading-tight drop-shadow-lg line-clamp-1">
              {currentFeatured.title}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg md:text-xl font-medium mb-6">
              {currentFeatured.artist}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayClick}
                className="px-5 py-2.5 bg-[#22c527] hover:bg-[#1fbe24] text-black font-extrabold rounded-full transition transform hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-[0_0_25px_rgba(34,197,39,0.4)] text-xs md:text-sm cursor-pointer"
              >
                <i
                  className={`${
                    isThisSongActive && isPlaying
                      ? "ri-pause-fill"
                      : "ri-play-fill"
                  } text-base`}
                ></i>
                <span>
                  {isThisSongActive && isPlaying ? "Jeda" : "Dengarkan Sekarang"}
                </span>
              </button>

              {isThisSongActive && isPlaying && (
                <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                  <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"></span>
                  <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-4"></span>
                  <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-2"></span>
                  <span className="text-[11px] font-bold text-white/80 ml-1">
                    Playing
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + featuredSongs.length) % featuredSongs.length
          )
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-20 cursor-pointer"
        title="Sebelumnya"
      >
        <i className="ri-arrow-left-s-line text-2xl"></i>
      </button>

      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % featuredSongs.length)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-20 cursor-pointer"
        title="Berikutnya"
      >
        <i className="ri-arrow-right-s-line text-2xl"></i>
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
        {featuredSongs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "w-6 bg-[#22c527]"
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
