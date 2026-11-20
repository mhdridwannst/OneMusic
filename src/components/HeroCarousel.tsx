"use client";

import { useEffect, useState, type FocusEvent } from "react";
import Image from "next/image";
import type { Song } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
  const featuredSongs = songs.slice(0, 6);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const activeIndex =
    featuredSongs.length > 0 ? currentIndex % featuredSongs.length : 0;

  const currentFeatured = featuredSongs[activeIndex];

  const autoplayPaused =
    isHovered || isFocused || isManuallyPaused || Boolean(shouldReduceMotion);

  // AUTOPLAY
  useEffect(() => {
    if (featuredSongs.length <= 1 || autoplayPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % featuredSongs.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [featuredSongs.length, autoplayPaused]);

  if (!currentFeatured) return null;

  const isThisSongActive = currentSong?.id === currentFeatured.id;

  const handleStep = (direction: -1 | 1) => {
    setCurrentIndex(
      (previous) =>
        (previous + direction + featuredSongs.length) % featuredSongs.length,
    );
  };

  const handlePlayClick = () => {
    if (isThisSongActive) {
      onTogglePlay();
      return;
    }

    onPlay(currentFeatured);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;

    if (!nextTarget || !event.currentTarget.contains(nextTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <section
      role="region"
      aria-label="Pilihan musik unggulan"
      aria-roledescription="carousel"
      className="group relative isolate mb-10 w-full select-none sm:mb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleBlur}
    >
      {/* ========================================
          AMBIENT BACKGROUND
      ======================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ambient-${currentFeatured.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
          }}
          className="pointer-events-none absolute inset-0 -z-10 translate-y-5 scale-[0.94] overflow-hidden rounded-[2rem] blur-3xl"
        >
          <Image
            src={currentFeatured.cover}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ========================================
          MAIN HERO CARD
      ======================================== */}
      <div
        className="
          relative
          h-[260px]
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.09]
          bg-[#111114]
          shadow-[0_24px_70px_rgba(0,0,0,0.42)]
          sm:h-[290px]
          md:h-[300px]
          md:rounded-[2rem]
          lg:h-[320px]
        "
      >
        {/* BACKGROUND AND ARTWORK */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatured.id}
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            {/* BLURRED BACKGROUND */}
            <Image
              src={currentFeatured.cover}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="scale-110 object-cover opacity-40 blur-2xl"
            />

            {/* DARK BASE */}
            <div className="absolute inset-0 bg-black/20" />

            {/* MAIN ARTWORK */}
            <div className="absolute inset-0 md:inset-y-0 md:left-auto md:w-[42%]">
              <Image
                src={currentFeatured.cover}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                loading={activeIndex === 0 ? "eager" : "lazy"}
                fetchPriority={activeIndex === 0 ? "high" : "auto"}
                className="
                  object-cover
                  md:object-contain
                  md:object-right
                "
              />
            </div>

            {/* CINEMATIC GRADIENT */}
            <div className="absolute inset-0 bg-linear-to-r from-black/[0.94] via-black/65 to-black/5" />

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/15" />

            {/* GREEN AMBIENT LIGHT */}
            <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#22c527]/10 blur-[100px]" />
          </motion.div>
        </AnimatePresence>

        {/* ========================================
            HERO CONTENT
        ======================================== */}
        <div
          className="
            absolute inset-y-0 left-0 z-10
            flex w-[88%] flex-col justify-center
            px-5 py-6
            sm:w-[76%] sm:px-8
            md:w-[58%] md:px-10
            lg:px-12
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentFeatured.id}`}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : 0.08,
              }}
            >
              {/* FEATURED LABELS */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22c527]/25 bg-[#22c527] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-black shadow-[0_4px_20px_rgba(34,197,39,0.22)] sm:text-[10px]">
                  <i className="ri-fire-fill" aria-hidden="true" />
                  Featured Music
                </span>

                {currentFeatured.genre && (
                  <span className="max-w-40 truncate rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-semibold text-white/85 backdrop-blur-xl sm:max-w-none sm:text-[10px]">
                    {currentFeatured.genre}
                  </span>
                )}
              </div>

              {/* SONG TITLE */}
              <h2
                className="
                  mb-2 max-w-full line-clamp-2
                  text-2xl font-black
                  leading-[1.08] tracking-tight
                  text-white drop-shadow-lg
                  sm:text-3xl
                  md:text-[2.5rem]
                  lg:text-[2.75rem]
                "
              >
                {currentFeatured.title}
              </h2>

              {/* ARTIST */}
              <p className="mb-5 truncate text-sm font-medium text-white/75 sm:text-base md:text-lg">
                {currentFeatured.artist}
              </p>

              {/* PLAY ACTION */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label={
                    isThisSongActive && isPlaying
                      ? `Jeda ${currentFeatured.title}`
                      : `Putar ${currentFeatured.title}`
                  }
                  className="
                    inline-flex min-h-11 items-center gap-2.5
                    rounded-full bg-[#22c527]
                    px-5 py-3
                    text-xs font-black text-black
                    shadow-[0_8px_28px_rgba(34,197,39,0.22)]
                    transition duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#36d640]
                    hover:shadow-[0_12px_32px_rgba(34,197,39,0.32)]
                    active:scale-[0.97]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#22c527]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black
                    sm:text-sm
                  "
                >
                  <i
                    className={
                      isThisSongActive && isPlaying
                        ? "ri-pause-fill text-lg"
                        : "ri-play-fill text-lg"
                    }
                    aria-hidden="true"
                  />

                  {isThisSongActive && isPlaying
                    ? "Jeda"
                    : "Dengarkan Sekarang"}
                </button>

                {/* NOW PLAYING STATUS */}
                {isThisSongActive && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2.5 text-[10px] font-bold text-white/90 backdrop-blur-xl">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-[#22c527] ${
                        isPlaying ? "animate-pulse" : ""
                      }`}
                    />

                    {isPlaying ? "Now Playing" : "Paused"}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================
            CAROUSEL NAVIGATION
            TOP RIGHT
        ======================================== */}
        {featuredSongs.length > 1 && (
          <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-5 sm:top-5">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Lagu unggulan sebelumnya"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full border border-white/15
                bg-black/50 text-white/80
                shadow-lg backdrop-blur-xl
                transition-all duration-200
                hover:border-white/30
                hover:bg-black/75
                hover:text-white
                active:scale-90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#22c527]
              "
            >
              <i className="ri-arrow-left-s-line text-xl" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Lagu unggulan berikutnya"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full border border-white/15
                bg-black/50 text-white/80
                shadow-lg backdrop-blur-xl
                transition-all duration-200
                hover:border-white/30
                hover:bg-black/75
                hover:text-white
                active:scale-90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#22c527]
              "
            >
              <i className="ri-arrow-right-s-line text-xl" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* ========================================
            CAROUSEL INDICATORS
        ======================================== */}
        {featuredSongs.length > 1 && (
          <div className="absolute bottom-3.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl sm:bottom-4">
            <div className="flex items-center gap-1.5">
              {featuredSongs.map((song, index) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Tampilkan ${song.title} oleh ${song.artist}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`
                    h-1.5 rounded-full
                    transition-all duration-300
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#22c527]
                    ${
                      index === activeIndex
                        ? "w-6 bg-[#22c527] shadow-[0_0_10px_rgba(34,197,39,0.55)]"
                        : "w-1.5 bg-white/35 hover:bg-white/75"
                    }
                  `}
                />
              ))}
            </div>

            <span className="h-3 w-px bg-white/15" />

            {/* AUTOPLAY CONTROL */}
            {!shouldReduceMotion && (
              <button
                type="button"
                onClick={() => setIsManuallyPaused((previous) => !previous)}
                aria-label={
                  isManuallyPaused
                    ? "Lanjutkan pergantian otomatis"
                    : "Jeda pergantian otomatis"
                }
                aria-pressed={isManuallyPaused}
                title={
                  isManuallyPaused ? "Lanjutkan otomatis" : "Jeda otomatis"
                }
                className="
                  flex h-5 w-5 items-center justify-center
                  rounded-full text-white/65
                  transition hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#22c527]
                "
              >
                <i
                  className={`${
                    isManuallyPaused ? "ri-play-fill" : "ri-pause-fill"
                  } text-xs`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
