import React from "react";
import Image from "next/image";
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
    <section
      aria-labelledby="recently-played-heading"
      className="mb-10 sm:mb-12"
    >
      {/* SECTION HEADER */}
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.045] text-[#22c527] shadow-inner shadow-white/[0.02]">
            <i className="ri-history-line text-lg" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="recently-played-heading"
                className="text-sm font-bold tracking-tight text-white sm:text-base"
              >
                Baru Saja Diputar
              </h2>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold tabular-nums text-white/50">
                {songs.length}
              </span>
            </div>

            <p className="mt-0.5 hidden text-[11px] font-medium text-white/35 sm:block">
              Lanjutkan mendengarkan musik favoritmu
            </p>
          </div>
        </div>

        {/* CLEAR HISTORY */}
        <button
          type="button"
          onClick={onClear}
          aria-label="Bersihkan riwayat pemutaran"
          title="Bersihkan riwayat"
          className="group flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 text-white/45 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/[0.07] hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] active:scale-95"
        >
          <i className="ri-delete-bin-6-line text-sm" aria-hidden="true" />
          <span className="hidden text-[11px] font-semibold sm:inline">
            Bersihkan
          </span>
        </button>
      </div>

      {/* RECENTLY PLAYED CARDS */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {songs.slice(0, 8).map((song) => {
          const isCurrent = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrent && isPlaying;

          return (
            <button
              key={`recent_${song.id}`}
              type="button"
              onClick={() => onPlay(song)}
              aria-label={`Putar ${song.title} oleh ${song.artist}`}
              aria-pressed={isCurrent}
              className={`group relative flex min-w-0 items-center gap-2.5 overflow-hidden rounded-[18px] border p-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] active:scale-[0.98] sm:gap-3 sm:p-2.5 ${
                isCurrent
                  ? "border-[#22c527]/30 bg-[#22c527]/[0.075] shadow-[0_5px_24px_rgba(34,197,39,0.07)]"
                  : "border-white/[0.065] bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/[0.13] hover:bg-white/[0.055] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              }`}
            >
              {/* SUBTLE ACTIVE ACCENT */}
              {isCurrent && (
                <span className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-[#22c527] shadow-[0_0_12px_rgba(34,197,39,0.65)]" />
              )}

              {/* COVER */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#151518] shadow-md sm:h-[54px] sm:w-[54px] sm:rounded-[13px]">
                <Image
                  src={song.cover}
                  alt={song.title}
                  fill
                  sizes="(max-width: 640px) 44px, 54px"
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                    isCurrent && isPlaying ? "brightness-75" : ""
                  }`}
                />

                {/* PLAY OVERLAY */}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity duration-200 ${
                    isCurrent
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full shadow-lg transition-transform duration-200 ${
                      isCurrent
                        ? "scale-100 bg-[#22c527] text-black"
                        : "scale-90 bg-white text-black group-hover:scale-100"
                    }`}
                  >
                    <i
                      className={`text-sm ${
                        isCurrentlyPlaying
                          ? "ri-pause-fill"
                          : "ri-play-fill ml-0.5"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* SONG INFORMATION */}
              <div className="min-w-0 flex-1 py-0.5">
                <h3
                  className={`truncate text-[11px] font-bold tracking-tight transition-colors sm:text-xs ${
                    isCurrent
                      ? "text-[#22c527]"
                      : "text-white/90 group-hover:text-white"
                  }`}
                  title={song.title}
                >
                  {song.title}
                </h3>

                <p
                  className="mt-1 truncate text-[10px] font-medium text-white/40 sm:text-[11px]"
                  title={song.artist}
                >
                  {song.artist}
                </p>

                {isCurrent && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#22c527]">
                    <span
                      className={`h-1 w-1 rounded-full bg-[#22c527] ${
                        isPlaying ? "animate-pulse" : ""
                      }`}
                    />
                    {isPlaying ? "Sedang diputar" : "Dijeda"}
                  </span>
                )}
              </div>

              {/* EQUALIZER */}
              {isCurrentlyPlaying && (
                <div
                  className="mr-0.5 flex h-5 shrink-0 items-end gap-[3px]"
                  aria-hidden="true"
                >
                  <span className="h-2 w-[3px] animate-music-bar-1 rounded-full bg-[#22c527]" />
                  <span className="h-4 w-[3px] animate-music-bar-2 rounded-full bg-[#22c527]" />
                  <span className="h-3 w-[3px] animate-music-bar-3 rounded-full bg-[#22c527]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
