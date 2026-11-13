import { useState, useRef, useEffect, useCallback } from "react";
import { Song } from "@/types";

type RepeatMode = "off" | "all" | "one";

const getStoredVolume = () => {
  if (typeof window === "undefined") return 1;
  const parsed = Number(window.localStorage.getItem("volume"));
  return Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 1;
};

const getStoredLikes = () => {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem("likedSongs") || "[]",
    );
    return Array.isArray(parsed) &&
      parsed.every((id) => typeof id === "number")
      ? parsed
      : [];
  } catch {
    return [];
  }
};

export function useAudioPlayer(songs: Song[]) {
  // State Utama
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [priorityQueue, setPriorityQueue] = useState<Song[]>([]);
  const [volume, setVolume] = useState(getStoredVolume);
  const [likedSongs, setLikedSongs] = useState<number[]>(getStoredLikes);
  const [playbackRate, setPlaybackRateState] = useState(1);

  // State Shuffle & Repeat
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");

  // State Sleep Timer (dalam menit & sisa detik)
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const initialVolumeRef = useRef<number>(getStoredVolume());
  const hasRestoredStateRef = useRef(false);

  // Ref untuk menyimpan Playlist/Antrian yang sedang aktif
  const playlistRef = useRef<Song[]>(songs);
  const priorityQueueRef = useRef<Song[]>([]);
  const hasRestoredQueueRef = useRef(false);

  // --- SAFE PLAY HELPER (Mencegah AbortError saat klik cepat) ---
  const safePlay = useCallback((audio: HTMLAudioElement) => {
    try {
      const promise = audio.play();
      if (promise !== undefined) {
        playPromiseRef.current = promise;
        promise
          .then(() => {
            setIsPlaying(true);
            playPromiseRef.current = null;
          })
          .catch((e: unknown) => {
            playPromiseRef.current = null;
            if (e instanceof Error && e.name === "AbortError") {
              return;
            }
            console.warn("Audio playback aborted or unallowed:", e);
            setIsPlaying(false);
          });
      }
    } catch (e) {
      console.warn("Audio play exception:", e);
    }
  }, []);

  // --- LOGIC FUNCTIONS ---
  const setPlaylist = useCallback((newPlaylist: Song[]) => {
    playlistRef.current = newPlaylist;
  }, []);

  const queueSongNext = useCallback((song: Song) => {
    if (currentSong?.id === song.id) return;
    setPriorityQueue((current) => {
      const nextQueue = [
        song,
        ...current.filter((queued) => queued.id !== song.id),
      ];
      priorityQueueRef.current = nextQueue;
      return nextQueue;
    });
  }, [currentSong]);

  const removeQueuedSong = useCallback((songId: number) => {
    setPriorityQueue((current) => {
      const nextQueue = current.filter((song) => song.id !== songId);
      priorityQueueRef.current = nextQueue;
      return nextQueue;
    });
  }, []);

  const moveQueuedSong = useCallback((index: number, direction: -1 | 1) => {
    setPriorityQueue((current) => {
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }
      const nextQueue = [...current];
      [nextQueue[index], nextQueue[targetIndex]] = [
        nextQueue[targetIndex],
        nextQueue[index],
      ];
      priorityQueueRef.current = nextQueue;
      return nextQueue;
    });
  }, []);

  useEffect(() => {
    if (songs.length === 0 || hasRestoredQueueRef.current) return;
    hasRestoredQueueRef.current = true;

    try {
      const saved = JSON.parse(
        localStorage.getItem("onemusic_priority_queue") || "[]",
      );
      if (!Array.isArray(saved) || !saved.every((id) => Number.isInteger(id))) {
        return;
      }

      const restored = saved
        .map((id: number) => songs.find((song) => song.id === id))
        .filter((song): song is Song => song !== undefined);
      priorityQueueRef.current = restored;
      setTimeout(() => setPriorityQueue(restored), 0);
    } catch (error) {
      console.warn("Failed to restore priority queue:", error);
    }
  }, [songs]);

  useEffect(() => {
    if (!hasRestoredQueueRef.current) return;
    localStorage.setItem(
      "onemusic_priority_queue",
      JSON.stringify(priorityQueueRef.current.map((song) => song.id)),
    );
  }, [priorityQueue]);

  useEffect(() => {
    if (songs.length === 0) return;
    setPriorityQueue((current) => {
      const availableIds = new Set(songs.map((song) => song.id));
      const validQueue = current.filter((song) => availableIds.has(song.id));
      priorityQueueRef.current = validQueue;
      return validQueue.length === current.length ? current : validQueue;
    });
  }, [songs]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolume(clamped);
    initialVolumeRef.current = clamped;
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      localStorage.setItem("volume", clamped.toString());
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Sleep Timer Handler
  const setSleepTimer = useCallback((minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    if (minutes === null) {
      setSleepTimerRemaining(null);
      // Restore normal volume jika sempat fade
      if (audioRef.current) {
        audioRef.current.volume = initialVolumeRef.current;
        setVolume(initialVolumeRef.current);
      }
    } else {
      setSleepTimerRemaining(minutes * 60);
    }
  }, []);

  const playSong = useCallback(
    (song: Song, options?: { autoplay?: boolean }) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentSong?.id !== song.id) {
        audio.pause();
        audio.src = song.src;
        audio.playbackRate = playbackRate;
        setCurrentSong(song);
        setAudioError(null);
        setProgress(0);
        localStorage.setItem("lastSongId", song.id.toString());
      }
      if (options?.autoplay !== false) {
        safePlay(audio);
      } else {
        setIsPlaying(false);
      }
    },
    [currentSong, playbackRate, safePlay]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.playbackRate = playbackRate;
      safePlay(audio);
    }
  }, [isPlaying, playbackRate, safePlay]);

  // LOGIC NEXT (DINAMIS SESUAI PLAYLIST AKTIF)
  const handleNext = useCallback(() => {
    if (!currentSong) return;

    const currentList = playlistRef.current;
    const queuedSong = priorityQueueRef.current.shift();
    if (queuedSong) {
      setPriorityQueue((current) => current.slice(1));
      playSong(queuedSong);
      return;
    }
    if (currentList.length === 0) return;

    let nextIndex: number;
    if (isShuffle) {
      if (currentList.length === 1) {
        nextIndex = 0;
      } else {
        do {
          nextIndex = Math.floor(Math.random() * currentList.length);
        } while (currentList[nextIndex].id === currentSong.id);
      }
    } else {
      const currentIndex = currentList.findIndex(
        (s) => s.id === currentSong.id
      );

      if (currentIndex === -1) {
        nextIndex = 0;
      } else {
        nextIndex = (currentIndex + 1) % currentList.length;
      }
    }

    playSong(currentList[nextIndex]);
  }, [currentSong, isShuffle, playSong]);

  // LOGIC PREV (DINAMIS)
  const handlePrev = useCallback(() => {
    if (!currentSong) return;

    const currentList = playlistRef.current;
    if (currentList.length === 0) return;

    const currentIndex = currentList.findIndex((s) => s.id === currentSong.id);

    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      return;
    }

    let prevIndex: number;
    if (currentIndex === -1) {
      prevIndex = 0;
    } else {
      prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    }

    playSong(currentList[prevIndex]);
  }, [currentSong, playSong]);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      const clamped = Math.max(0, Math.min(audioRef.current.duration || time, time));
      audioRef.current.currentTime = clamped;
      setProgress(clamped);
    }
  };

  const seekBy = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(
        0,
        Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds)
      );
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const toggleLike = (songId: number) => {
    setLikedSongs((prev) => {
      const newLiked = prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId];
      localStorage.setItem("likedSongs", JSON.stringify(newLiked));
      return newLiked;
    });
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  // --- EFFECTS ---

  // 1. Init audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = getStoredVolume();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // 2. Load persisted state after the playlist is available
  useEffect(() => {
    if (songs.length === 0 || hasRestoredStateRef.current) return;
    hasRestoredStateRef.current = true;
    let restoreTimer: ReturnType<typeof setTimeout> | undefined;

    try {
      const savedVol = localStorage.getItem("volume");
      if (savedVol) {
        const vol = parseFloat(savedVol);
        if (Number.isFinite(vol)) {
          const safeVolume = Math.max(0, Math.min(1, vol));
          initialVolumeRef.current = safeVolume;
          if (audioRef.current) audioRef.current.volume = safeVolume;
        }
      }

      const lastSongId = localStorage.getItem("lastSongId");
      if (lastSongId) {
        const foundSong = songs.find((s) => s.id === Number(lastSongId));
        if (foundSong) {
          restoreTimer = setTimeout(() => {
            setCurrentSong(foundSong);
            if (audioRef.current) audioRef.current.src = foundSong.src;
          }, 0);
        }
      }
    } catch (error) {
      console.warn("Failed to restore audio preferences:", error);
    }

    return () => {
      if (restoreTimer) clearTimeout(restoreTimer);
    };
  }, [songs]);

  // 3. Audio Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        safePlay(audio);
      } else if (repeatMode === "all" || isShuffle) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };

    const onError = (e: Event) => {
      console.warn("Audio loading or decoding error:", e);
      setIsPlaying(false);
      setAudioError("Lagu tidak dapat diputar. Coba lagi atau pilih lagu lain.");
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [handleNext, repeatMode, isShuffle, safePlay, songs]);

  // 4. Sleep Timer Effect with Smooth Fade-out
  useEffect(() => {
    if (sleepTimerRemaining === null || sleepTimerRemaining <= 0) return;

    const interval = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev === null || prev <= 1) {
          // Timer Habis: Pause audio & restore volume
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = initialVolumeRef.current;
            setVolume(initialVolumeRef.current);
          }
          setIsPlaying(false);
          setSleepTimerMinutes(null);
          return null;
        }

        // Fade-out halus di 15 detik terakhir
        if (prev <= 15 && audioRef.current) {
          const fadeRatio = (prev - 1) / 15;
          const fadedVol = initialVolumeRef.current * fadeRatio;
          audioRef.current.volume = Math.max(0, fadedVol);
          setVolume(fadedVol);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerRemaining]);

  // 5. MediaSession API (Lockscreen & OS Multimedia Controls)
  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    if (currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.genre || "OneMusic",
        artwork: [
          { src: currentSong.cover, sizes: "96x96", type: "image/jpeg" },
          { src: currentSong.cover, sizes: "128x128", type: "image/jpeg" },
          { src: currentSong.cover, sizes: "256x256", type: "image/jpeg" },
          { src: currentSong.cover, sizes: "512x512", type: "image/jpeg" },
        ],
      });
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }

    try {
      navigator.mediaSession.setActionHandler("play", () => {
        if (!isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        if (isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
      navigator.mediaSession.setActionHandler("nexttrack", handleNext);
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime !== undefined) {
          handleSeek(details.seekTime);
        }
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => seekBy(-5));
      navigator.mediaSession.setActionHandler("seekforward", () => seekBy(5));
    } catch (e) {
      console.warn("MediaSession handler error:", e);
    }
  }, [currentSong, isPlaying, togglePlay, handlePrev, handleNext]);

  // 6. KEYBOARD SHORTCUTS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA" ||
        (e.target as HTMLElement).getAttribute("role") === "slider"
      ) {
        return;
      }
      const audio = audioRef.current;
      if (!audio) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "KeyL":
          seekBy(5);
          break;
        case "KeyJ":
          seekBy(-5);
          break;
        case "KeyM":
          handleVolumeChange(audio.volume > 0 ? 0 : 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(Math.min(audio.volume + 0.05, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(Math.max(audio.volume - 0.05, 0));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleVolumeChange, handleNext, handlePrev, togglePlay]);

  // 7. Title
  useEffect(() => {
    if (currentSong) {
      document.title = isPlaying
        ? `▶ ${currentSong.title} • ${currentSong.artist}`
        : `${currentSong.title} • ${currentSong.artist}`;
    } else {
      document.title = "One Music - Premium Web Player";
    }
  }, [currentSong, isPlaying]);

  return {
    currentSong,
    isPlaying,
    audioError,
    priorityQueue,
    progress,
    duration,
    volume,
    likedSongs,
    isShuffle,
    repeatMode,
    playbackRate,
    sleepTimerMinutes,
    sleepTimerRemaining,
    setSleepTimer,
    setPlaybackRate,
    seekBy,
    playSong,
    togglePlay,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolumeChange,
    retryCurrentSong: () => {
      if (!currentSong || !audioRef.current) return;
      setAudioError(null);
      audioRef.current.load();
      safePlay(audioRef.current);
    },
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    setPlaylist,
    queueSongNext,
    removeQueuedSong,
    moveQueuedSong,
  };
}
