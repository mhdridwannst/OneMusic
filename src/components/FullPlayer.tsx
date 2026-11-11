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
  sleepTimerMinutes?: number | null;
  sleepTimerRemaining?: number | null;
  onSetSleepTimer?: (minutes: number | null) => void;
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
  sleepTimerMinutes = null,
  sleepTimerRemaining = null,
  onSetSleepTimer,
}: FullPlayerProps) {
  const [lyrics, setLyrics] = useState<{ time: number; content: string }[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<"lyrics" | "queue">("lyrics");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const lyricRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingSeek = useRef(false);

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
    if (!isOpen || activeRightTab !== "lyrics" || activeLyricIndex === -1) {
      return;
    }
    lyricRefs.current[activeLyricIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeLyricIndex, isOpen, activeRightTab]);

  // Touch & Mouse Scrubbing Seek Handler
  const handleSeekFromClientX = (clientX: number) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSeekFromClientX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingSeek.current = true;
    if (e.touches[0]) handleSeekFromClientX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingSeek.current) return;
    if (e.touches[0]) handleSeekFromClientX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDraggingSeek.current = false;
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVol = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(newVol);
  };

  // Drag down to dismiss khusus di area Header agar tidak bentrok dengan scroll lirik
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 80 || info.velocity.y > 400) {
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
          transition={{ type: "spring", damping: 30, stiffness: 240 }}
          className="fixed inset-0 z-100 bg-[#09090b] text-white flex flex-col h-dvh select-none"
        >
          {/* DYNAMIC AMBIENT BACKDROP */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center blur-[120px] opacity-40 scale-150 transition-all duration-1000"
              style={{ backgroundImage: `url('${currentSong.cover}')` }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-[#09090b]/85 to-[#09090b]"></div>
          </div>

          {/* TOP HEADER DENGAN DRAG TO DISMISS HANDLE KHUSUS MOBILE */}
          <motion.div
            drag={isDesktop ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            className="relative z-30 flex-none flex items-center justify-between px-4 sm:px-8 py-3 lg:py-5 border-b border-white/5 cursor-grab active:cursor-grabbing"
          >
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition cursor-pointer"
              title="Tutup Player"
            >
              <i className="ri-arrow-down-s-line text-2xl"></i>
            </button>

            {/* Pull Down Pill Handle & Title */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 bg-white/30 rounded-full mb-2 lg:hidden shadow-sm"></div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[2.5px] uppercase text-white/50">
                Now Playing
              </span>
              <span className="text-xs text-[#22c527] font-bold tracking-wider">
                {currentSong.genre || "OneMusic"}
              </span>
            </div>

            {/* SPEED, SLEEP TIMER & FAVORITE ACTIONS */}
            <div className="relative flex items-center gap-2">
              {/* SLEEP TIMER BUTTON & POPOVER */}
              {onSetSleepTimer && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowTimerMenu((p) => !p);
                      setShowSpeedMenu(false);
                    }}
                    className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-full border transition flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                      sleepTimerRemaining !== null && sleepTimerRemaining > 0
                        ? "bg-[#22c527]/15 border-[#22c527]/40 text-[#22c527] shadow-[0_0_12px_rgba(34,197,39,0.25)]"
                        : "bg-white/5 hover:bg-white/15 border-white/10 text-white/70 hover:text-white"
                    }`}
                    title="Sleep Timer"
                  >
                    <i
                      className={
                        sleepTimerRemaining !== null && sleepTimerRemaining > 0
                          ? "ri-moon-fill text-sm text-[#22c527]"
                          : "ri-moon-line text-sm"
                      }
                    ></i>
                    {sleepTimerRemaining !== null && sleepTimerRemaining > 0 && (
                      <span className="font-mono text-[11px]">
                        {formatTime(sleepTimerRemaining)}
                      </span>
                    )}
                  </button>

                  {showTimerMenu && (
                    <div className="absolute right-0 top-12 bg-[#16161a]/95 border border-white/15 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 z-50 backdrop-blur-2xl min-w-[130px] animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        Sleep Timer
                      </div>
                      {[
                        { label: "Mati", value: null },
                        { label: "15 Menit", value: 15 },
                        { label: "30 Menit", value: 30 },
                        { label: "45 Menit", value: 45 },
                        { label: "60 Menit", value: 60 },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            onSetSleepTimer(item.value);
                            setShowTimerMenu(false);
                          }}
                          className={`px-3 py-1.5 text-xs rounded-xl font-bold transition flex items-center justify-between cursor-pointer ${
                            sleepTimerMinutes === item.value
                              ? "bg-[#22c527] text-black shadow-md"
                              : "text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          {sleepTimerMinutes === item.value && (
                            <i className="ri-check-line font-black"></i>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {onPlaybackRateChange && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSpeedMenu((p) => !p);
                      setShowTimerMenu(false);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono font-bold text-white/80 transition cursor-pointer"
                    title="Playback Speed"
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute right-0 top-10 bg-[#16161a] border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 z-40 backdrop-blur-xl">
                      {[0.75, 1, 1.25, 1.5].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            onPlaybackRateChange(rate);
                            setShowSpeedMenu(false);
                          }}
                          className={`px-3 py-1 text-xs rounded-xl font-bold transition cursor-pointer ${
                            playbackRate === rate
                              ? "bg-[#22c527] text-black shadow-md"
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
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition cursor-pointer"
                title="Favorit"
              >
                <i
                  className={`text-xl ${
                    isLiked
                      ? "ri-heart-3-fill text-[#22c527] drop-shadow-[0_0_8px_rgba(34,197,39,0.6)]"
                      : "ri-heart-3-line text-white/70"
                  }`}
                ></i>
              </button>
            </div>
          </motion.div>

          {/* MAIN CONTENT AREA */}
          <div className="relative z-10 flex-1 w-full overflow-hidden flex flex-col justify-start lg:justify-center">
            <div className="w-full h-full overflow-y-auto lg:overflow-visible scrollbar-hide flex flex-col">
              <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6 lg:gap-16 px-6 pb-28 lg:pb-8 max-w-7xl mx-auto w-full min-h-min lg:h-full mt-2 lg:mt-0">
                {/* BAGIAN 1: Cover Art, Song Title & Controls */}
                <div className="flex-none w-full max-w-md lg:w-115 flex flex-col">
                  {/* COVER ART WITH VINYL RIM LIGHT */}
                  <div className="w-[82%] max-w-75 sm:max-w-85 lg:w-full aspect-square mx-auto rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/12 mb-6 relative group bg-[#151518] ring-1 ring-inset ring-white/10">
                    {!imageError ? (
                      <img
                        src={currentSong.cover}
                        alt={currentSong.title}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-[#22c527]">
                        <i className="ri-disc-fill text-6xl opacity-80 mb-2"></i>
                        <p className="text-xs text-white/60 font-bold">{currentSong.title}</p>
                      </div>
                    )}

                    {/* Equalizer Waveform overlay on Cover when playing */}
                    {isPlaying && (
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md flex items-center gap-1.5 border border-white/15 shadow-xl">
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
                      <p className="text-sm md:text-base text-white/65 font-medium truncate mt-0.5">
                        {currentSong.artist}
                      </p>
                    </div>

                    <button
                      onClick={onToggleLike}
                      className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center shrink-0 active:scale-125 transition cursor-pointer"
                    >
                      <i
                        className={`text-2xl ${
                          isLiked
                            ? "ri-heart-3-fill text-[#22c527] drop-shadow-[0_0_8px_rgba(34,197,39,0.5)]"
                            : "ri-heart-3-line text-white/50"
                        }`}
                      ></i>
                    </button>
                  </div>

                  {/* PROGRESS BAR (SEEKABLE & TOUCH DRAGGABLE) */}
                  <div
                    ref={progressBarRef}
                    onClick={handleProgressBarClick}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full mb-3 cursor-pointer group py-2 touch-none"
                    title="Sentuh atau geser untuk melompat durasi"
                  >
                    <div className="w-full h-1.5 group-hover:h-2.5 bg-white/15 rounded-full overflow-hidden transition-all relative">
                      <div
                        className="h-full bg-linear-to-r from-[#22c527] to-emerald-400 rounded-full relative"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] opacity-95 md:opacity-0 md:group-hover:opacity-100 transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-mono font-medium text-white/50 mt-2">
                      <span className="text-white/80 font-semibold">{formatTime(progress)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center justify-between px-2 mb-4">
                    {/* Shuffle */}
                    <button
                      onClick={onToggleShuffle}
                      className={`transition active:scale-90 p-2 cursor-pointer ${
                        isShuffle
                          ? "text-[#22c527] drop-shadow-[0_0_8px_rgba(34,197,39,0.6)]"
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
                      className="text-white hover:text-white/70 transition active:scale-90 p-2 cursor-pointer"
                      title="Lagu Sebelumnya"
                    >
                      <i className="ri-skip-back-fill text-3xl md:text-4xl"></i>
                    </button>

                    {/* Play / Pause Main Button with Radiant Neon Aura */}
                    <button
                      onClick={onPlayPause}
                      className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer ${
                        isPlaying
                          ? "bg-[#22c527] text-black shadow-[0_0_40px_rgba(34,197,39,0.5)] ring-4 ring-[#22c527]/20"
                          : "bg-white hover:bg-[#22c527] text-black shadow-2xl shadow-white/20"
                      }`}
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
                      className="text-white hover:text-white/70 transition active:scale-90 p-2 cursor-pointer"
                      title="Lagu Berikutnya"
                    >
                      <i className="ri-skip-forward-fill text-3xl md:text-4xl"></i>
                    </button>

                    {/* Repeat */}
                    <button
                      onClick={onToggleRepeat}
                      className={`transition active:scale-90 p-2 cursor-pointer ${
                        repeatMode !== "off"
                          ? "text-[#22c527] drop-shadow-[0_0_8px_rgba(34,197,39,0.6)]"
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

                {/* BAGIAN 2: PANEL LIRIK & UP NEXT */}
                <div className="flex-none w-full max-w-md lg:max-w-none lg:w-115 h-64 sm:h-76 lg:h-140 flex flex-col bg-white/3 border border-white/8 rounded-3xl overflow-hidden backdrop-blur-xl mt-2 lg:mt-0 shadow-2xl">
                  {/* TAB SWITCHER */}
                  <div className="flex items-center justify-between p-3 border-b border-white/5 bg-black/25">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveRightTab("lyrics")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                          activeRightTab === "lyrics"
                            ? "bg-[#22c527] text-black shadow-md shadow-[#22c527]/30"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <i className="ri-mic-line mr-1.5"></i> Lyrics
                      </button>
                      <button
                        onClick={() => setActiveRightTab("queue")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                          activeRightTab === "queue"
                            ? "bg-[#22c527] text-black shadow-md shadow-[#22c527]/30"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <i className="ri-play-list-2-line mr-1.5"></i> Up Next (
                        {playlist.length})
                      </button>
                    </div>

                    <span className="text-[11px] text-white/40 font-mono">
                      {activeRightTab === "lyrics"
                        ? lyrics.length > 0
                          ? "Auto-sync"
                          : "Instrumental"
                        : "Click to play"}
                    </span>
                  </div>

                  {/* TAB CONTENT: LYRICS (CLEAN SPOTIFY-STYLE TYPOGRAPHY) */}
                  {activeRightTab === "lyrics" && (
                    <div
                      ref={lyricsContainerRef}
                      className="w-full flex-1 overflow-y-auto scrollbar-hide px-6 py-6 mask-gradient-vertical"
                    >
                      <div className="h-16 lg:h-40"></div>
                      {lyrics.length > 0 ? (
                        lyrics.map((line, i) => {
                          const isActive = i === activeLyricIndex;
                          return (
                            <motion.p
                              key={i}
                              ref={(el) => {
                                lyricRefs.current[i] = el;
                              }}
                              animate={{
                                opacity: isActive ? 1 : 0.3,
                                scale: isActive ? 1.03 : 1,
                              }}
                              transition={{ duration: 0.25 }}
                              className={`py-2 md:py-3 transition-all duration-300 cursor-pointer text-center lg:text-left tracking-normal leading-relaxed select-none ${
                                isActive
                                  ? "text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-md"
                                  : "text-sm sm:text-base md:text-lg font-bold text-white/35 hover:text-white/75"
                              }`}
                              onClick={() => onSeek(line.time)}
                              title="Klik untuk lompat ke lirik ini"
                            >
                              {isActive && (
                                <span className="hidden lg:inline-block w-2 h-2 rounded-full bg-[#22c527] mr-3 align-middle shadow-[0_0_8px_rgba(34,197,39,0.8)]"></span>
                              )}
                              <span>{line.content}</span>
                            </motion.p>
                          );
                        })
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 opacity-50 text-center">
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
                                ? "bg-[#22c527]/15 border border-[#22c527]/40 text-white shadow-md shadow-[#22c527]/10"
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
