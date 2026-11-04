/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import { Song } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface MiniPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isLiked: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleLike: () => void;
  onExpand: () => void;
  onOpenQueue?: () => void;
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
};

export default function MiniPlayer({
  currentSong,
  isPlaying,
  progress,
  duration,
  volume,
  isLiked,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleLike,
  onExpand,
  onOpenQueue,
}: MiniPlayerProps) {
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [imageError, setImageError] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isScrubbingRef = useRef(false);

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  // Touch & Mouse Scrubbing Handler
  const handleSeekFromClientX = (clientX: number) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newProgress = (clickX / rect.width) * duration;
    onSeek(newProgress);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSeekFromClientX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isScrubbingRef.current = true;
    if (e.touches[0]) handleSeekFromClientX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isScrubbingRef.current) return;
    e.stopPropagation();
    if (e.touches[0]) handleSeekFromClientX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isScrubbingRef.current = false;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        className="fixed bottom-3 md:bottom-5 left-3 right-3 md:left-6 md:right-6 z-50 max-w-5xl mx-auto"
      >
        <div
          onClick={onExpand}
          className="relative bg-[#151518]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-2.5 md:p-3.5 flex items-center justify-between shadow-2xl cursor-pointer hover:bg-[#1c1c22]/95 hover:border-white/20 transition-all group overflow-hidden"
        >
          {/* INTERACTIVE PROGRESS BAR DI ATAS (SEEKABLE & TOUCH DRAGGABLE) */}
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute top-0 left-0 right-0 h-2 md:h-1.5 md:hover:h-2.5 bg-white/10 cursor-pointer transition-all z-20 group/bar touch-none"
            title="Geser atau sentuh untuk mengatur durasi"
          >
            <div
              className="h-full bg-linear-to-r from-[#22c527] to-emerald-400 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-90 md:opacity-0 md:group-hover/bar:opacity-100 shadow-md"></div>
            </div>
          </div>

          {/* Ambient Glow halus dari Cover */}
          <div
            className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #22c527, transparent 70%)`,
            }}
          />

          {/* SISI KIRI: Info Lagu & Cover */}
          <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0 pr-2">
            {/* Cover Album */}
            <div className="relative shrink-0">
              <div
                className={`w-11 h-11 md:w-13 md:h-13 rounded-xl overflow-hidden border border-white/15 shadow-lg bg-[#18181b] ${
                  isPlaying ? "scale-105" : "scale-100"
                } transition-transform duration-300`}
              >
                {!imageError ? (
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-[#22c527]">
                    <i className="ri-disc-line text-2xl"></i>
                  </div>
                )}
              </div>

              {/* Little equalizer badge */}
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#22c527] rounded-full flex items-center justify-center border-2 border-[#151518]">
                  <span className="w-1 h-1 bg-black rounded-full animate-ping"></span>
                </div>
              )}
            </div>

            {/* Title & Artist */}
            <div className="flex flex-col min-w-0 overflow-hidden">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-bold text-xs md:text-sm truncate group-hover:text-[#22c527] transition-colors">
                  {currentSong.title}
                </h4>
              </div>
              <p className="text-white/50 text-[11px] md:text-xs truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Quick Like Button (MiniPlayer) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
              className={`p-2 rounded-full transition-transform active:scale-125 ml-1 hidden sm:flex items-center justify-center ${
                isLiked
                  ? "text-[#22c527]"
                  : "text-white/40 hover:text-white"
              }`}
              title={isLiked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
            >
              <i
                className={`text-lg ${
                  isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"
                }`}
              ></i>
            </button>
          </div>

          {/* SISI TENGAH / KANAN: Real Time Tracker & Controls */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Timestamp Tracker (Desktop) */}
            <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <span className="text-white/80">{formatTime(progress)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/60 hover:text-white hover:scale-110 active:scale-95 transition"
                title="Lagu Sebelumnya"
              >
                <i className="ri-skip-back-fill text-lg md:text-xl"></i>
              </button>

              {/* Play / Pause */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPause();
                }}
                className="w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-[#22c527] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-white/10"
                title={isPlaying ? "Jeda" : "Putar"}
              >
                <i
                  className={`${
                    isPlaying ? "ri-pause-fill" : "ri-play-fill"
                  } text-xl md:text-2xl ml-0.5`}
                ></i>
              </button>

              {/* Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/60 hover:text-white hover:scale-110 active:scale-95 transition"
                title="Lagu Berikutnya"
              >
                <i className="ri-skip-forward-fill text-lg md:text-xl"></i>
              </button>
            </div>

            {/* Volume Quick Control (Desktop Only) */}
            <div className="hidden lg:flex items-center relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVolumePopup((prev) => !prev);
                }}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition"
                title="Volume"
              >
                <i
                  className={`text-lg ri-${
                    volume === 0
                      ? "volume-mute-line"
                      : volume < 0.5
                      ? "volume-down-line"
                      : "volume-up-line"
                  }`}
                ></i>
              </button>

              {/* Volume Slider Popover */}
              {showVolumePopup && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-12 right-0 bg-[#1c1c22] border border-white/15 p-3 rounded-2xl shadow-xl flex items-center gap-2 w-36 z-30"
                >
                  <i
                    onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
                    className="ri-volume-mute-fill text-white/50 hover:text-white cursor-pointer text-sm"
                  ></i>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-[#22c527] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Queue / Up Next Shortcut */}
            {onOpenQueue && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQueue();
                }}
                className="w-8 h-8 hidden sm:flex items-center justify-center text-white/50 hover:text-white transition"
                title="Antrean Lagu (Up Next)"
              >
                <i className="ri-play-list-2-line text-lg"></i>
              </button>
            )}

            {/* Expand Indicator Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white transition"
              title="Buka Player Penuh"
            >
              <i className="ri-arrow-up-s-line text-xl group-hover:-translate-y-0.5 transition-transform"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
