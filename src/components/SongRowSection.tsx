"use client";

import { useCallback, useId, useRef } from "react";
import type { Song } from "@/types";
import AlbumCard from "./AlbumCard";

interface SongRowSectionProps {
  title: string;
  subtitle?: string;
  icon?: string;
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: number[];
  onPlay: (song: Song) => void;
  onToggleLike: (song: Song) => void;
  playlistSongIds: number[];
  onTogglePlaylist: (song: Song) => void;
  onViewAll?: () => void;
}

export default function SongRowSection({
  title,
  subtitle,
  icon = "ri-fire-fill",
  songs,
  currentSong,
  isPlaying,
  likedSongs,
  onPlay,
  onToggleLike,
  playlistSongIds,
  onTogglePlaylist,
  onViewAll,
}: SongRowSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollId = useId();

  const handleScroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }, []);

  if (!songs || songs.length === 0) return null;

  return (
    <section
      className="relative mb-10 sm:mb-12"
      aria-labelledby={`${scrollId}-heading`}
    >
      {/* ========================================
          SECTION HEADER
      ======================================== */}
      <div className="mb-4 flex items-end justify-between gap-3 px-1">
        {/* TITLE & DESCRIPTION */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            {/* SECTION ICON */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#22c527]/15 bg-[#22c527]/[0.075] text-[#22c527] shadow-inner shadow-white/[0.02] transition-colors duration-300">
              <i className={`${icon} text-base`} aria-hidden="true" />
            </div>

            {/* TITLE */}
            <h2
              id={`${scrollId}-heading`}
              className="truncate text-sm font-black tracking-tight text-white sm:text-base md:text-lg"
            >
              {title}
            </h2>

            {/* SONG COUNT */}
            <span className="hidden shrink-0 rounded-full border border-white/[0.07] bg-white/[0.035] px-2 py-0.5 text-[9px] font-semibold tabular-nums text-white/40 sm:inline-flex">
              {songs.length}
            </span>
          </div>

          {/* SUBTITLE */}
          {subtitle && (
            <p className="mt-1.5 pl-[42px] text-[10px] font-medium leading-relaxed text-white/40 sm:text-[11px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* HEADER ACTIONS */}
        <div className="flex shrink-0 items-center gap-2">
          {/* VIEW ALL */}
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="
                group/link inline-flex min-h-9 items-center gap-1
                rounded-full px-2
                text-[10px] font-bold text-white/45
                transition-colors duration-200
                hover:text-[#22c527]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#22c527]
                sm:px-3 sm:text-[11px]
              "
            >
              <span>Lihat Semua</span>

              <i
                className="ri-arrow-right-s-line text-base transition-transform duration-200 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          )}

          {/* DESKTOP SCROLL CONTROLS */}
          {songs.length > 1 && (
            <div className="hidden items-center gap-1.5 sm:flex">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label={`Geser ${title} ke kiri`}
                aria-controls={scrollId}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full border border-white/[0.08]
                  bg-white/[0.035] text-white/55
                  shadow-sm transition-all duration-200
                  hover:border-white/20
                  hover:bg-white/[0.09]
                  hover:text-white
                  active:scale-90
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#22c527]
                "
              >
                <i
                  className="ri-arrow-left-s-line text-xl"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label={`Geser ${title} ke kanan`}
                aria-controls={scrollId}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full border border-white/[0.08]
                  bg-white/[0.035] text-white/55
                  shadow-sm transition-all duration-200
                  hover:border-white/20
                  hover:bg-white/[0.09]
                  hover:text-white
                  active:scale-90
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#22c527]
                "
              >
                <i
                  className="ri-arrow-right-s-line text-xl"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          HORIZONTAL MUSIC CARDS
      ======================================== */}
      <div className="relative -mx-1">
        <div
          id={scrollId}
          ref={scrollRef}
          role="region"
          aria-label={`${title} - daftar lagu`}
          tabIndex={0}
          className="
            flex snap-x snap-mandatory
            gap-3
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            px-2 pb-4 pt-3
            scrollbar-hide
            touch-pan-x
            sm:gap-4
            sm:px-2
            md:gap-4
          "
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              handleScroll("left");
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              handleScroll("right");
            }
          }}
        >
          {songs.map((song) => {
            const isThisCurrent = currentSong?.id === song.id;

            const isLiked = likedSongs.includes(song.id);

            const isInPlaylist = playlistSongIds.includes(song.id);

            return (
              <div
                key={`row_${song.id}`}
                className="
                  w-[148px] shrink-0 snap-start
                  sm:w-[172px]
                  md:w-[184px]
                  lg:w-[190px]
                "
              >
                <AlbumCard
                  data={song}
                  isCurrentSong={isThisCurrent}
                  isPlaying={isPlaying}
                  isLiked={isLiked}
                  onPlay={() => onPlay(song)}
                  onToggleLike={(event) => {
                    event.stopPropagation();
                    onToggleLike(song);
                  }}
                  isInPlaylist={isInPlaylist}
                  onTogglePlaylist={(event) => {
                    event.stopPropagation();
                    onTogglePlaylist(song);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
