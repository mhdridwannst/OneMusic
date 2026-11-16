/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Song } from "@/types";

interface SongTableViewProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: number[];
  onPlay: (song: Song) => void;
  onToggleLike: (song: Song) => void;
  playlistSongIds?: number[];
  onTogglePlaylist?: (song: Song) => void;
}

export default function SongTableView({
  songs,
  currentSong,
  isPlaying,
  likedSongs,
  onPlay,
  onToggleLike,
  playlistSongIds = [],
  onTogglePlaylist,
}: SongTableViewProps) {
  if (!songs || songs.length === 0) return null;

  return (
    <div className="w-full flex flex-col rounded-2xl overflow-hidden border border-white/6 bg-white/2 backdrop-blur-md">
      {/* Table Header */}
      <div className="grid grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_1fr_130px_auto] md:grid-cols-[48px_1fr_160px_60px_60px_auto] items-center px-4 py-2.5 border-b border-white/5 text-[11px] font-bold uppercase tracking-wider text-white/40">
        <span className="text-center">#</span>
        <span>Judul</span>
        <span className="hidden sm:inline">Genre</span>
        <span className="hidden md:inline text-center">Favorit</span>
        <span className="hidden md:inline text-center">Playlist</span>
        <span className="text-right pr-2">Aksi</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-white/4">
        {songs.map((song, idx) => {
          const isThisCurrent = currentSong?.id === song.id;
          const isThisPlaying = isThisCurrent && isPlaying;
          const isLiked = likedSongs.includes(song.id);
          const isInPlaylist = playlistSongIds.includes(song.id);

          return (
            <div
              key={`table_row_${song.id}`}
              onClick={() => onPlay(song)}
              className={`group grid grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_1fr_130px_auto] md:grid-cols-[48px_1fr_160px_60px_60px_auto] items-center px-3 sm:px-4 py-2 sm:py-2.5 transition-colors cursor-pointer ${
                isThisCurrent
                  ? "bg-[#22c527]/10"
                  : "hover:bg-white/6"
              }`}
            >
              {/* Index / Play Button / Equalizer */}
              <div className="flex items-center justify-center">
                {isThisPlaying ? (
                  <div className="flex items-center gap-0.5">
                    <span className="w-0.5 h-3 bg-[#22c527] rounded-full animate-music-bar-1"></span>
                    <span className="w-0.5 h-4 bg-[#22c527] rounded-full animate-music-bar-2"></span>
                    <span className="w-0.5 h-2 bg-[#22c527] rounded-full animate-music-bar-3"></span>
                  </div>
                ) : (
                  <>
                    <span
                      className={`text-xs font-mono group-hover:hidden ${
                        isThisCurrent ? "text-[#22c527] font-bold" : "text-white/40"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <i
                      className={`ri-play-fill text-sm hidden group-hover:inline-block ${
                        isThisCurrent ? "text-[#22c527]" : "text-white"
                      }`}
                    ></i>
                  </>
                )}
              </div>

              {/* Cover Art + Title + Artist */}
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#151518] border border-white/10 shadow-sm">
                  <img
                    src={song.cover}
                    alt={song.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
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
                    className="text-[11px] text-white/50 truncate font-medium"
                    title={song.artist}
                  >
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Genre (Sm & Up) */}
              <div className="hidden sm:flex items-center">
                <span className="text-[10px] font-semibold text-white/45 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 truncate max-w-[130px]">
                  {song.genre || "Pop"}
                </span>
              </div>

              {/* Quick Like (Md & Up) */}
              <div className="hidden md:flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(song);
                  }}
                  className={`p-1 transition cursor-pointer ${
                    isLiked
                      ? "text-[#22c527]"
                      : "text-white/20 hover:text-white group-hover:text-white/50"
                  }`}
                  title={isLiked ? "Hapus dari favorit" : "Tambah ke favorit"}
                >
                  <i
                    className={`${
                      isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"
                    } text-base`}
                  ></i>
                </button>
              </div>

              {/* Quick Playlist (Md & Up) */}
              <div className="hidden md:flex items-center justify-center">
                {onTogglePlaylist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePlaylist(song);
                    }}
                    className={`p-1 transition cursor-pointer ${
                      isInPlaylist
                        ? "text-[#22c527]"
                        : "text-white/20 hover:text-white group-hover:text-white/50"
                    }`}
                    title={isInPlaylist ? "Hapus dari Playlist" : "Tambah ke Playlist"}
                  >
                    <i
                      className={`${
                        isInPlaylist ? "ri-checkbox-circle-fill text-[#22c527]" : "ri-play-list-add-line"
                      } text-base`}
                    ></i>
                  </button>
                )}
              </div>

              {/* Actions Right (Mobile Like & Play Icon) */}
              <div className="flex items-center justify-end gap-1.5 pr-1">
                {onTogglePlaylist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePlaylist(song);
                    }}
                    className={`md:hidden p-1.5 transition cursor-pointer ${
                      isInPlaylist ? "text-[#22c527]" : "text-white/40 hover:text-white"
                    }`}
                    title={isInPlaylist ? "Hapus dari Playlist" : "Tambah ke Playlist"}
                  >
                    <i
                      className={`${
                        isInPlaylist ? "ri-checkbox-circle-fill" : "ri-play-list-add-line"
                      } text-base`}
                    ></i>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(song);
                  }}
                  className={`md:hidden p-1.5 transition cursor-pointer ${
                    isLiked ? "text-[#22c527]" : "text-white/40 hover:text-white"
                  }`}
                  title={isLiked ? "Hapus dari favorit" : "Tambah ke favorit"}
                >
                  <i
                    className={`${
                      isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"
                    } text-base`}
                  ></i>
                </button>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#22c527] group-hover:text-black text-white/60 flex items-center justify-center transition">
                  <i
                    className={`${
                      isThisPlaying ? "ri-pause-fill" : "ri-play-fill"
                    } text-xs ml-0.5`}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
