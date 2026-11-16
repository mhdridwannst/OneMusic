/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Song } from "@/types";

interface QuickPicksProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}

export default function QuickPicks({
  songs,
  currentSong,
  isPlaying,
  onPlay,
}: QuickPicksProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  if (!songs || songs.length === 0) return null;

  // Tampilkan 8 lagu teratas yang proporsional di mobile & desktop
  const pickSongs = songs.slice(0, 8);

  return (
    <section className="mb-8">
      {/* SECTION TITLE RINGKAS */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#22c527]/20 flex items-center justify-center text-[#22c527]">
            <i className="ri-flashlight-fill text-xs"></i>
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Akses Cepat
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {pickSongs.map((song) => {
          const isThisPlaying = currentSong?.id === song.id && isPlaying;
          const isThisCurrent = currentSong?.id === song.id;
          const isImageLoaded = loadedImages[song.id];

          return (
            <div
              key={`quick_pick_${song.id}`}
              onClick={() => onPlay(song)}
              className={`group relative flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 select-none ${
                isThisCurrent
                  ? "bg-white/12 border border-[#22c527]/40 shadow-[0_0_20px_rgba(34,197,39,0.2)]"
                  : "bg-white/4 hover:bg-white/8 border border-white/6 hover:border-white/12 active:scale-98"
              }`}
            >
              {/* Cover Art with Smooth Shimmer Fade-In */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-[#16161a] overflow-hidden">
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                )}
                <img
                  src={song.cover}
                  alt={song.title}
                  loading="lazy"
                  onLoad={() =>
                    setLoadedImages((prev) => ({ ...prev, [song.id]: true }))
                  }
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Title & Artist */}
              <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                <h4
                  className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                    isThisCurrent
                      ? "text-[#22c527]"
                      : "text-white group-hover:text-[#22c527]"
                  }`}
                  title={song.title}
                >
                  {song.title}
                </h4>
                <p
                  className="text-[10px] sm:text-[11px] text-white/50 truncate font-medium mt-0.5"
                  title={song.artist}
                >
                  {song.artist}
                </p>
              </div>

              {/* Spotify-style Quick Play Button (Hover on Desktop, Tap-ready on Mobile) */}
              <div
                className={`pr-2 sm:pr-3 transition-all duration-200 ${
                  isThisCurrent
                    ? "opacity-100 scale-100"
                    : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                    isThisCurrent
                      ? "bg-[#22c527] text-black shadow-[0_0_15px_rgba(34,197,39,0.5)]"
                      : "bg-[#22c527] text-black hover:bg-[#20b825]"
                  }`}
                >
                  {isThisPlaying ? (
                    <i className="ri-pause-fill text-sm sm:text-base"></i>
                  ) : (
                    <i className="ri-play-fill text-sm sm:text-base ml-0.5"></i>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
