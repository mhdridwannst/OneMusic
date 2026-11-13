/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Song } from "@/types";
import { motion } from "framer-motion";

interface AlbumCardProps {
  data: Song;
  isCurrentSong: boolean;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onToggleLike: (e: React.MouseEvent) => void;
  isInPlaylist: boolean;
  onTogglePlaylist: (e: React.MouseEvent) => void;
}

export default function AlbumCard({
  data,
  isCurrentSong,
  isPlaying,
  isLiked,
  onPlay,
  onToggleLike,
  isInPlaylist,
  onTogglePlaylist,
}: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      onClick={onPlay}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPlay();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Putar ${data.title} oleh ${data.artist}`}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative flex flex-col gap-2.5 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
        isCurrentSong
          ? isPlaying
            ? "bg-white/8 border border-[#22c527]/50 animate-breathing-glow"
            : "bg-white/8 border border-[#22c527]/40 shadow-[0_4px_25px_rgba(34,197,39,0.15)]"
          : "bg-white/3 hover:bg-white/7 border border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-black/50"
      }`}
    >
      {/* Cover Image Container with Inner Rim Light */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg bg-[#16161a] ring-1 ring-inset ring-white/10">
        {!imageError ? (
          <img
            src={data.cover}
            alt={data.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 ${
              isCurrentSong && isPlaying ? "brightness-90" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center p-3 text-center">
            <i className="ri-disc-line text-4xl text-[#22c527] mb-1 opacity-70"></i>
            <span className="text-[10px] text-white/50 font-bold truncate max-w-full">
              {data.title}
            </span>
          </div>
        )}

        {/* Gradient Overlay for Cinematic Depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Like Heart Button (Top Right) */}
        <button
          onClick={onToggleLike}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 z-10 ${
            isLiked
              ? "bg-black/60 text-[#22c527] scale-100 opacity-100 shadow-md shadow-[#22c527]/20"
              : "bg-black/50 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:scale-110"
          }`}
          aria-label={isLiked ? "Hapus dari favorit" : "Tambah ke favorit"}
          title={isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
          <i
            className={`${
              isLiked ? "ri-heart-3-fill text-[#22c527]" : "ri-heart-3-line"
            } text-base`}
          ></i>
        </button>
        <button
          onClick={onTogglePlaylist}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 z-10 ${
            isInPlaylist
              ? "bg-[#22c527] text-black opacity-100 shadow-md shadow-[#22c527]/20"
              : "bg-black/50 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:scale-110"
          }`}
          aria-label={
            isInPlaylist
              ? "Hapus dari playlist saya"
              : "Tambahkan ke playlist saya"
          }
          title={isInPlaylist ? "Hapus dari Playlist" : "Tambah ke Playlist"}
        >
          <i className={`${isInPlaylist ? "ri-play-list-2-fill" : "ri-add-line"} text-base`}></i>
        </button>

        {/* Play / Pause Overlay Icon (Center) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isCurrentSong
              ? "opacity-100 bg-black/30 backdrop-blur-[1px]"
              : "opacity-0 group-hover:opacity-100 bg-black/35 backdrop-blur-[1px]"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isCurrentSong
                ? "bg-[#22c527] text-black shadow-[0_0_20px_rgba(34,197,39,0.6)]"
                : "bg-white text-black group-hover:scale-105"
            }`}
          >
            {isCurrentSong && isPlaying ? (
              <i className="ri-pause-fill text-2xl"></i>
            ) : (
              <i className="ri-play-fill text-2xl ml-0.5"></i>
            )}
          </div>
        </div>

        {/* Live Audio Equalizer Bars (Bottom Left when Playing) */}
        {isCurrentSong && (
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md flex items-center gap-1 border border-white/10 z-10 shadow-lg">
            <span
              className={`w-1 bg-[#22c527] rounded-full ${
                isPlaying ? "animate-music-bar-1 h-3" : "h-1.5"
              }`}
            ></span>
            <span
              className={`w-1 bg-[#22c527] rounded-full ${
                isPlaying ? "animate-music-bar-2 h-4" : "h-2.5"
              }`}
            ></span>
            <span
              className={`w-1 bg-[#22c527] rounded-full ${
                isPlaying ? "animate-music-bar-3 h-2" : "h-1"
              }`}
            ></span>
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <h4
          className={`font-bold text-xs md:text-sm truncate transition-colors ${
            isCurrentSong ? "text-[#22c527]" : "text-white group-hover:text-[#22c527]"
          }`}
          title={data.title}
        >
          {data.title}
        </h4>
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <p className="truncate max-w-[70%] font-medium" title={data.artist}>
            {data.artist}
          </p>
          {data.genre && (
            <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold px-1.5 py-0.5 bg-white/5 rounded border border-white/5 shrink-0">
              {data.genre.split("/")[0].trim()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
