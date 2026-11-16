import React, { useRef } from "react";
import { Song } from "@/types";
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
  onViewAll,
}: SongRowSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!songs || songs.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-10">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between mb-4 px-1">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-6 h-6 rounded-lg bg-[#22c527]/15 flex items-center justify-center text-[#22c527]">
              <i className={`${icon} text-sm`}></i>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs text-white/40 pl-8 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* CONTROLS (PANAH KIRI / KANAN DI DESKTOP & LIHAT SEMUA) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-white/50 hover:text-[#22c527] transition mr-1 sm:mr-2 cursor-pointer flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <i className="ri-arrow-right-s-line text-sm"></i>
            </button>
          )}
          <button
            onClick={() => handleScroll("left")}
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 items-center justify-center text-white/70 hover:text-white transition active:scale-90 cursor-pointer shadow-sm"
            title="Geser ke kiri"
            aria-label="Geser ke kiri"
          >
            <i className="ri-arrow-left-s-line text-lg"></i>
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 items-center justify-center text-white/70 hover:text-white transition active:scale-90 cursor-pointer shadow-sm"
            title="Geser ke kanan"
            aria-label="Geser ke kanan"
          >
            <i className="ri-arrow-right-s-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* HORIZONTAL SNAP ROW CONTAINER (PEEK CARDS ON MOBILE) */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 pt-1 px-1 -mx-1 snap-x snap-mandatory touch-pan-x"
      >
        {songs.map((song) => {
          const isThisCurrent = currentSong?.id === song.id;
          const isLiked = likedSongs.includes(song.id);

          return (
            <div
              key={`row_${song.id}`}
              className="w-35 sm:w-42 md:w-48 shrink-0 snap-start"
            >
              <AlbumCard
                data={song}
                isCurrentSong={isThisCurrent}
                isPlaying={isPlaying}
                isLiked={isLiked}
                onPlay={() => onPlay(song)}
                onToggleLike={(e) => {
                  e.stopPropagation();
                  onToggleLike(song);
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
