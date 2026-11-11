/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Song } from "@/types";

interface RecentlyPlayedProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onClear: () => void;
}

export default function RecentlyPlayed({
  songs,
  currentSong,
  isPlaying,
  onPlay,
  onClear,
}: RecentlyPlayedProps) {
  if (!songs || songs.length === 0) return null;

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#22c527]/10 flex items-center justify-center text-[#22c527]">
            <i className="ri-history-line text-sm"></i>
          </div>
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
            Baru Saja Diputar
          </h3>
          <span className="text-[11px] font-semibold text-white/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
            {songs.length}
          </span>
        </div>

        <button
          onClick={onClear}
          className="text-xs text-white/40 hover:text-white/80 transition flex items-center gap-1 cursor-pointer"
          title="Hapus riwayat pemutaran"
        >
          <i className="ri-delete-bin-line text-xs"></i>
          <span className="hidden sm:inline">Bersihkan</span>
        </button>
      </div>

      {/* Grid Cards Horizontal / Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {songs.slice(0, 8).map((song) => {
          const isThisPlaying = currentSong?.id === song.id && isPlaying;
          const isThisCurrent = currentSong?.id === song.id;

          return (
            <div
              key={`recent_${song.id}`}
              onClick={() => onPlay(song)}
              className={`group flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isThisCurrent
                  ? "bg-white/10 border-[#22c527]/40 shadow-[0_0_15px_rgba(34,197,39,0.15)]"
                  : "bg-white/3 hover:bg-white/7 border-white/5 hover:border-white/10"
              }`}
            >
              {/* Cover Art */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#151518] border border-white/10">
                <img
                  src={song.cover}
                  alt={song.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Play / Pause Icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all bg-black/40 ${
                    isThisCurrent
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isThisPlaying ? (
                    <div className="w-6 h-6 rounded-full bg-[#22c527] text-black flex items-center justify-center shadow-md">
                      <i className="ri-pause-fill text-xs"></i>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <i className="ri-play-fill text-xs ml-0.5"></i>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Artist */}
              <div className="flex-1 min-w-0 pr-1">
                <h4
                  className={`text-xs font-bold truncate transition-colors ${
                    isThisCurrent
                      ? "text-[#22c527]"
                      : "text-white group-hover:text-[#22c527]"
                  }`}
                  title={song.title}
                >
                  {song.title}
                </h4>
                <p
                  className="text-[11px] text-white/50 truncate font-medium mt-0.5"
                  title={song.artist}
                >
                  {song.artist}
                </p>
              </div>

              {/* Equalizer indicator if active */}
              {isThisPlaying && (
                <div className="pr-1.5 flex items-center gap-0.5">
                  <span className="w-0.5 h-3 bg-[#22c527] rounded-full animate-music-bar-1"></span>
                  <span className="w-0.5 h-4 bg-[#22c527] rounded-full animate-music-bar-2"></span>
                  <span className="w-0.5 h-2 bg-[#22c527] rounded-full animate-music-bar-3"></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
