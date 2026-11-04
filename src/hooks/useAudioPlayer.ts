import { useState, useRef, useEffect, useCallback } from "react";
import { Song } from "@/types";

type RepeatMode = "off" | "all" | "one";

export function useAudioPlayer(songs: Song[]) {
  // State Utama
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const [playbackRate, setPlaybackRateState] = useState(1);

  // State Shuffle & Repeat
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Ref untuk menyimpan Playlist/Antrian yang sedang aktif
  const playlistRef = useRef<Song[]>(songs);

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

  const handleVolumeChange = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolume(clamped);
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

  const playSong = useCallback(
    (song: Song) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentSong?.id !== song.id) {
        audio.pause();
        audio.src = song.src;
        audio.playbackRate = playbackRate;
        setCurrentSong(song);
        setProgress(0);
        localStorage.setItem("lastSongId", song.id.toString());
      }
      safePlay(audio);
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

  // 1. Init & Load Storage
  useEffect(() => {
    audioRef.current = new Audio();
    setTimeout(() => {
      const savedVol = localStorage.getItem("volume");
      if (savedVol) {
        const vol = parseFloat(savedVol);
        setVolume(vol);
        if (audioRef.current) audioRef.current.volume = vol;
      }

      const savedLikes = localStorage.getItem("likedSongs");
      if (savedLikes) {
        try {
          setLikedSongs(JSON.parse(savedLikes));
        } catch (e) {
          console.error(e);
        }
      }

      const lastSongId = localStorage.getItem("lastSongId");
      if (lastSongId) {
        const foundSong = songs.find((s) => s.id === parseInt(lastSongId));
        if (foundSong) {
          setCurrentSong(foundSong);
          if (audioRef.current) audioRef.current.src = foundSong.src;
        }
      }
    }, 0);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [songs]);

  // 2. Audio Listeners
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
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [handleNext, repeatMode, isShuffle, safePlay]);

  // 3. MediaSession API (Lockscreen & OS Multimedia Controls)
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

  // 4. KEYBOARD SHORTCUTS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
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

  // 5. Title
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
    progress,
    duration,
    volume,
    likedSongs,
    isShuffle,
    repeatMode,
    playbackRate,
    setPlaybackRate,
    seekBy,
    playSong,
    togglePlay,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolumeChange,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    setPlaylist,
  };
}
