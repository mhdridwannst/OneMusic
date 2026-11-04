/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Song } from "@/types";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface FullPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isLiked: boolean;
  onToggleLike: () => void;
  isShuffle: boolean;
  repeatMode: "off" | "all" | "one";
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  playlist?: Song[];
  onSelectSong?: (song: Song) => void;
  playbackRate?: number;
  onPlaybackRateChange?: (rate: number) => void;
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
};

const parseLRC = (text: string) => {
  const lines = text.split("\n");
  const result: { time: number; content: string }[] = [];
  const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/;
  for (const line of lines) {
    const match = regex.exec(line);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const ms = match[3] ? parseInt(match[3]) : 0;
      const time = min * 60 + sec + ms / (match[3]?.length === 3 ? 1000 : 100);
      const content = line.replace(regex, "").trim();
      if (content) result.push({ time, content });
    }
  }
  return result;
};

export default function FullPlayer({
  isOpen,
  onClose,
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  progress,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isLiked,
  onToggleLike,
  isShuffle,
  repeatMode,
  onToggleShuffle,
  onToggleRepeat,
  playlist = [],
  onSelectSong,
  playbackRate = 1,
  onPlaybackRateChange,
}: FullPlayerProps) {
  const [lyrics, setLyrics] = useState<{ time: number; content: string }[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<"lyrics" | "queue">("lyrics");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const lyricRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Fetch LRC
  useEffect(() => {
    let ignore = false;
    if (!currentSong?.lrc) {
      Promise.resolve().then(() => {
        if (!ignore) setLyrics([]);
      });
      return () => {
        ignore = true;
      };
    }
    fetch(currentSong.lrc)
      .then((res) => res.text())
      .then((text) => {
        if (!ignore) setLyrics(parseLRC(text));
      })
      .catch(() => {
        if (!ignore) setLyrics([]);
      });
    return () => {
      ignore = true;
    };
  }, [currentSong?.lrc]);

  // Derived state untuk active lyric index
  const activeLyricIndex = useMemo(() => {
    if (lyrics.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (progress >= lyrics[i].time) idx = i;
      else break;
    }
    return idx;
  }, [progress, lyrics]);

  // Scroll active lyric smoothly into view
  useEffect(() => {
    if (!isOpen || activeRightTab !== "lyrics" || activeLyricIndex === -1) return;
    lyricRefs.current[activeLyricIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeLyricIndex, isOpen, activeRightTab]);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVol = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(newVol);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!isDesktop && (info.offset.y > 100 || info.velocity.y > 500)) {
      onClose();
    }
  };

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          drag={isDesktop ? false : "y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={isDesktop ? 0 : { top: 0, bottom: 0.2 }}
          onDragEnd={handleDragEnd}
          className="fixed inset-0 z-100 bg-[#09090b] text-white flex flex-col h-dvh select-none"
        >
          {/* DYNAMIC AMBIENT BACKDROP */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center blur-[100px] opacity-35 scale-150 transition-all duration-1000"
              style={{ backgroundImage: `url('${currentSong.cover}')` }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-[#09090b]/80 to-[#09090b]"></div>
          </div>

          {/* TOP HEADER */}
          <div className="relative z-20 flex-none flex items-center justify-between px-4 sm:px-8 py-3 lg:py-5 border-b border-white/5">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition"
              title="Tutup Player"
            >
              <i className="ri-arrow-down-s-line text-2xl"></i>
            </button>

            <div className="flex flex-col items-center">
              <div className="w-10 h-1 bg-white/20 rounded-full mb-1.5 lg:hidden"></div>
              <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50">
                Now Playing
              </span>
              <span className="text-xs text-[#22c527] font-semibold tracking-wider">
                {currentSong.genre || "OneMusic"}
              </span>
            </div>

            {/* SPEED & MORE OPTIONS */}
            <div className="relative flex items-center gap-2">
              {onPlaybackRateChange && (
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu((p) => !p)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white/80 transition"
                    title="Playback Speed"
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute right-0 top-10 bg-[#16161a] border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 z-30">
                      {[0.75, 1, 1.25, 1.5].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            onPlaybackRateChange(rate);
                            setShowSpeedMenu(false);
                          }}
                          className={`px-3 py-1 text-xs rounded-xl transition ${
                            playbackRate === rate
                              ? "bg-[#22c527] text-black font-bold"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={onToggleLike}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition"
                title="Favorit"
              >
                <i
                  className={`text-xl ${
                    isLiked
                      ? "ri-heart-3-fill text-[#22c527]"
                      : "ri-heart-3-line text-white/70"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="relative z-10 flex-1 w-full overflow-hidden flex flex-col justify-start lg:justify-center">
            <div className="w-full h-full overflow-y-auto lg:overflow-visible scrollbar-hide flex flex-col">
              <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6 lg:gap-16 px-6 pb-24 lg:pb-8 max-w-7xl mx-auto w-full min-h-min lg:h-full mt-2 lg:mt-0">
                {/* LEFT: Cover Art, Song Title & Controls */}
                <div className="flex-none w-full max-w-md lg:w-115 flex flex-col">
                  {/* COVER ART */}
                  <div className="w-[82%] max-w-75 sm:max-w-85 lg:w-full aspect-square mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-6 relative group">
                    <img
                      src={currentSong.cover}
                      alt={currentSong.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Equalizer Waveform overlay on Cover when playing */}
                    {isPlaying && (
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1.5 border border-white/10">
                        <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"></span>
                        <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-5"></span>
                        <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-3.5"></span>
                      </div>
                    )}
                  </div>

                  {/* INFO & LIKE */}
                  <div className="mb-4 text-center lg:text-left flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-4">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight truncate drop-shadow-md">
                        {currentSong.title}
                      </h2>
                      <p className="text-sm md:text-base text-white/60 font-medium truncate mt-0.5">
                        {currentSong.artist}
                      </p>
                    </div>

                    <button
                      onClick={onToggleLike}
                      className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center shrink-0 active:scale-125 transition"
                    >
                      <i
                        className={`text-2xl ${
                          isLiked
                            ? "ri-heart-3-fill text-[#22c527]"
                            : "ri-heart-3-line text-white/50"
                        }`}
                      ></i>
                    </button>
                  </div>

                  {/* PROGRESS BAR (SEEKABLE) */}
                  <div
                    className="w-full mb-3 cursor-pointer group py-2"
                    onClick={handleProgressBarClick}
                    title="Klik untuk seek lagu"
                  >
                    <div className="w-full h-1.5 group-hover:h-2.5 bg-white/15 rounded-full overflow-hidden transition-all relative">
                      <div
                        className="h-full bg-linear-to-r from-[#22c527] to-emerald-400 rounded-full relative"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-mono font-medium text-white/50 mt-2">
                      <span>{formatTime(progress)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center justify-between px-2 mb-4">
                    {/* Shuffle */}
                    <button
                      onClick={onToggleShuffle}
                      className={`transition active:scale-90 p-2 ${
                        isShuffle
                          ? "text-[#22c527]"
                          : "text-white/40 hover:text-white"
                      }`}
                      title={isShuffle ? "Shuffle Aktif" : "Shuffle Mati"}
                    >
                      <i className="ri-shuffle-line text-2xl"></i>
                      {isShuffle && (
                        <div className="mx-auto mt-0.5 w-1.5 h-1.5 bg-[#22c527] rounded-full"></div>
                      )}
                    </button>

                    {/* Prev */}
                    <button
                      onClick={onPrev}
                      className="text-white hover:text-white/70 transition active:scale-90 p-2"
                      title="Lagu Sebelumnya"
                    >
                      <i className="ri-skip-back-fill text-3xl md:text-4xl"></i>
                    </button>

                    {/* Play / Pause Main Button */}
                    <button
                      onClick={onPlayPause}
                      className="w-16 h-16 md:w-18 md:h-18 bg-white hover:bg-[#22c527] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-2xl shadow-white/20"
                      title={isPlaying ? "Jeda" : "Putar"}
                    >
                      <i
                        className={`${
                          isPlaying ? "ri-pause-fill" : "ri-play-fill"
                        } text-3xl md:text-4xl ml-0.5`}
                      ></i>
                    </button>

                    {/* Next */}
                    <button
                      onClick={onNext}
                      className="text-white hover:text-white/70 transition active:scale-90 p-2"
                      title="Lagu Berikutnya"
                    >
                      <i className="ri-skip-forward-fill text-3xl md:text-4xl"></i>
                    </button>

                    {/* Repeat */}
                    <button
                      onClick={onToggleRepeat}
                      className={`transition active:scale-90 p-2 ${
                        repeatMode !== "off"
                          ? "text-[#22c527]"
                          : "text-white/40 hover:text-white"
                      }`}
                      title={`Mode Ulang: ${repeatMode}`}
                    >
                      <i
                        className={`${
                          repeatMode === "one"
                            ? "ri-repeat-one-line"
                            : "ri-repeat-2-line"
                        } text-2xl`}
                      ></i>
                      {repeatMode !== "off" && (
                        <div className="mx-auto mt-0.5 w-1.5 h-1.5 bg-[#22c527] rounded-full"></div>
                      )}
                    </button>
                  </div>

                  {/* VOLUME SLIDER (Desktop Only) */}
                  <div className="hidden lg:flex items-center gap-3 px-8 group">
                    <i
                      onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
                      className={`cursor-pointer text-white/50 hover:text-white transition ri-${
                        volume === 0
                          ? "volume-mute-fill"
                          : volume < 0.5
                          ? "volume-down-fill"
                          : "volume-up-fill"
                      } text-lg`}
                      title="Mute / Unmute"
                    ></i>
                    <div
                      className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative group/vol"
                      onClick={handleVolumeClick}
                      title="Atur Volume"
                    >
                      <div
                        className="h-full bg-white/60 group-hover/vol:bg-[#22c527] transition-colors rounded-full"
                        style={{ width: `${volume * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 w-8 text-right">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>
                </div>

                {/* RIGHT: TABBED PANEL (LYRICS vs UP NEXT QUEUE) */}
                <div className="flex-none w-full lg:w-115 h-65 lg:h-140 flex flex-col bg-white/3 border border-white/8 rounded-3xl overflow-hidden backdrop-blur-xl">
                  {/* TAB SWITCHER */}
                  <div className="flex items-center justify-between p-3 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveRightTab("lyrics")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                          activeRightTab === "lyrics"
                            ? "bg-[#22c527] text-black"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <i className="ri-mic-line mr-1.5"></i> Lyrics
                      </button>
                      <button
                        onClick={() => setActiveRightTab("queue")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                          activeRightTab === "queue"
                            ? "bg-[#22c527] text-black"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <i className="ri-play-list-2-line mr-1.5"></i> Up Next (
                        {playlist.length})
                      </button>
                    </div>

                    <span className="text-[11px] text-white/40 font-mono hidden sm:inline-block">
                      {activeRightTab === "lyrics"
                        ? lyrics.length > 0
                          ? "Auto-sync"
                          : "Instrumental"
                        : "Click to play"}
                    </span>
                  </div>

                  {/* TAB CONTENT: LYRICS */}
                  {activeRightTab === "lyrics" && (
                    <div
                      ref={lyricsContainerRef}
                      className="w-full flex-1 overflow-y-auto scrollbar-hide px-6 py-6 mask-gradient-vertical"
                    >
                      <div className="h-12 lg:h-40"></div>
                      {lyrics.length > 0 ? (
                        lyrics.map((line, i) => (
                          <motion.p
                            key={i}
                            ref={(el) => {
                              lyricRefs.current[i] = el;
                            }}
                            animate={{
                              opacity: i === activeLyricIndex ? 1 : 0.35,
                              scale: i === activeLyricIndex ? 1.05 : 1,
                            }}
                            className={`py-2 lg:py-3 transition-all duration-300 cursor-pointer text-center lg:text-left font-bold tracking-wide leading-relaxed ${
                              i === activeLyricIndex
                                ? "text-lg md:text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                                : "text-sm md:text-lg text-white/80 hover:text-white"
                            }`}
                            onClick={() => onSeek(line.time)}
                            title="Klik untuk lompat ke lirik ini"
                          >
                            {line.content}
                          </motion.p>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 opacity-50 text-center">
                          <i className="ri-music-2-line text-4xl mb-2 text-white/60"></i>
                          <p className="text-sm font-bold">Lirik Belum Tersedia / Instrumental</p>
                          <p className="text-xs text-white/40 mt-1">Nikmati irama musiknya</p>
                        </div>
                      )}
                      <div className="h-20 lg:h-50"></div>
                    </div>
                  )}

                  {/* TAB CONTENT: UP NEXT QUEUE */}
                  {activeRightTab === "queue" && (
                    <div className="w-full flex-1 overflow-y-auto scrollbar-hide p-3 space-y-2">
                      {playlist.map((item, idx) => {
                        const isCurrent = item.id === currentSong.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => onSelectSong && onSelectSong(item)}
                            className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition ${
                              isCurrent
                                ? "bg-[#22c527]/15 border border-[#22c527]/40 text-white"
                                : "hover:bg-white/5 border border-transparent text-white/80"
                            }`}
                          >
                            <span className="w-5 text-center text-xs font-mono text-white/40">
                              {idx + 1}
                            </span>
                            <img
                              src={item.cover}
                              alt={item.title}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h5
                                className={`text-xs font-bold truncate ${
                                  isCurrent ? "text-[#22c527]" : "text-white"
                                }`}
                              >
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-white/50 truncate">
                                {item.artist}
                              </p>
                            </div>
                            {isCurrent && isPlaying && (
                              <div className="flex items-center gap-0.5 px-2">
                                <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"></span>
                                <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-4"></span>
                                <span className="w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-2"></span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
