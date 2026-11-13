"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Song } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { defaultSongs } from "@/data/defaultSongs";

// KOMPONEN UI
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import RecommendationSection from "@/components/RecommendationSection";
import TabSection from "@/components/TabSection";
import SongList from "@/components/SongList";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import FullPlayer from "@/components/FullPlayer";
import Toast from "@/components/Toast";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function Home() {
  // --- STATE ---
  const [songs, setSongs] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [playlistSongIds, setPlaylistSongIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Songs");
  const [sortBy, setSortBy] = useState<"default" | "title" | "artist">(
    "default",
  );

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const sharedSongHandled = useRef(false);

  // Hook Player
  const player = useAudioPlayer(songs);

  // --- 1. FETCH DATA DARI API ---
  useEffect(() => {
    let isMounted = true;
    let hasCachedSongs = false;
    try {
      const cached = JSON.parse(
        sessionStorage.getItem("onemusic_song_catalog") || "null",
      );
      if (Array.isArray(cached) && cached.length > 0) {
        hasCachedSongs = true;
        setSongs(cached);
        player.setPlaylist(cached);
        setIsLoading(false);
      }
    } catch (error) {
      console.warn("Failed to load cached song catalog:", error);
    }

    if (!hasCachedSongs) {
      setSongs(defaultSongs);
      player.setPlaylist(defaultSongs);
    }
    setIsLoading(false);

    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        if (!response.ok) {
          throw new Error(`Songs request failed with status ${response.status}`);
        }
        const data: Song[] = await response.json();
        if (isMounted) {
          setSongs(data);
          player.setPlaylist(data);
          sessionStorage.setItem("onemusic_song_catalog", JSON.stringify(data));
          setLoadError(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Gagal memuat lagu:", error);
        if (isMounted) {
          setLoadError("Lagu gagal dimuat. Periksa koneksi lalu coba lagi.");
          setIsLoading(false);
        }
      }
    };

    fetchSongs();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  // --- 2. RECENTLY PLAYED PERSISTENCE ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem("onemusic_recently_played");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (song): song is Song =>
              typeof song === "object" &&
              song !== null &&
              typeof (song as Song).id === "number" &&
              typeof (song as Song).title === "string" &&
              typeof (song as Song).artist === "string",
          )
        ) {
          setRecentlyPlayed(parsed.slice(0, 8));
        }
      }
    } catch (e) {
      console.warn("Failed to load recently played:", e);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("onemusic_playlist") || "[]",
      );
      if (
        Array.isArray(saved) &&
        saved.every((id): id is number => Number.isInteger(id))
      ) {
        setPlaylistSongIds(saved);
      }
    } catch (error) {
      console.warn("Failed to load playlist:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("onemusic_playlist", JSON.stringify(playlistSongIds));
  }, [playlistSongIds]);

  useEffect(() => {
    if (!player.currentSong) return;
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== player.currentSong!.id);
      const updated = [player.currentSong!, ...filtered].slice(0, 8);
      localStorage.setItem("onemusic_recently_played", JSON.stringify(updated));
      return updated;
    });
  }, [player.currentSong]);

  useEffect(() => {
    if (player.audioError) {
      triggerToast(player.audioError);
    }
  }, [player.audioError]);

  useEffect(() => {
    if (sharedSongHandled.current || songs.length === 0) return;

    const sharedSongId = Number(
      new URLSearchParams(window.location.search).get("song"),
    );
    if (!Number.isInteger(sharedSongId)) return;

    const sharedSong = songs.find((song) => song.id === sharedSongId);
    if (!sharedSong) return;

    sharedSongHandled.current = true;
    player.playSong(sharedSong, { autoplay: false });
    setIsPlayerOpen(true);
    window.history.replaceState({}, "", window.location.pathname);
  }, [player, songs]);

  const handleClearRecentlyPlayed = () => {
    setRecentlyPlayed([]);
    localStorage.removeItem("onemusic_recently_played");
    triggerToast("Riwayat baru saja diputar dibersihkan");
  };

  // --- 3. FILTERING & SORTING DATA ---
  const displayedSongs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = songs.filter((song) => {
      const matchesSearch =
        !term ||
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        (song.genre && song.genre.toLowerCase().includes(term));

      let matchesTab = true;
      if (activeTab === "Favorites") {
        matchesTab = player.likedSongs.includes(song.id);
      } else if (activeTab === "My Playlist") {
        matchesTab = playlistSongIds.includes(song.id);
      } else if (activeTab !== "All Songs") {
        const songGenre = (song.genre || "").toLowerCase();
        const tab = activeTab.toLowerCase();

        if (tab === "pop") {
          matchesTab =
            (songGenre.includes("pop") && !songGenre.includes("indo") && !songGenre.includes("k-pop")) ||
            songGenre === "pop";
        } else if (tab === "k-pop") {
          matchesTab =
            songGenre.includes("k-pop") ||
            [
              "bts",
              "twice",
              "illit",
              "jung kook",
              "fifty fifty",
              "leehi",
            ].some((art) => song.artist.toLowerCase().includes(art));
        } else if (tab === "indonesian hits") {
          matchesTab =
            songGenre.includes("indo") ||
            songGenre.includes("indonesian") ||
            [
              "payung teduh",
              "tulus",
              "rizky febian",
              "nadin amizah",
              ".feast",
              "bilal indrajaya",
              "kunto aji",
              "stinky",
              "yahya",
              "aku jeje",
              "raim laode",
              "enau",
            ].some((art) => song.artist.toLowerCase().includes(art));
        } else if (tab.includes("indie")) {
          matchesTab =
            songGenre.includes("indie") || songGenre.includes("acoustic");
        } else if (tab.includes("r&b")) {
          matchesTab =
            songGenre.includes("r&b") || songGenre.includes("soul");
        } else if (tab.includes("lo-fi")) {
          matchesTab =
            songGenre.includes("lo-fi") ||
            songGenre.includes("ambient") ||
            songGenre.includes("chill");
        } else {
          matchesTab =
            songGenre.includes(tab) || tab.includes(songGenre);
        }
      }

      return matchesSearch && matchesTab;
    });

    if (sortBy === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "artist") {
      return [...filtered].sort((a, b) => a.artist.localeCompare(b.artist));
    }

    return filtered;
  }, [activeTab, sortBy, searchTerm, songs, player.likedSongs, playlistSongIds]);

  const recommendedSongs = useMemo(() => {
    if (!player.currentSong) return songs.slice(0, 5);

    const currentGenre = (player.currentSong.genre || "").toLowerCase();
    return songs
      .filter((song) => song.id !== player.currentSong?.id)
      .map((song) => {
        const genre = (song.genre || "").toLowerCase();
        const sameGenre = currentGenre && genre.includes(currentGenre);
        const liked = player.likedSongs.includes(song.id);
        const recentlyPlayedSong = recentlyPlayed.some(
          (recent) => recent.id === song.id,
        );
        return {
          song,
          score: (sameGenre ? 3 : 0) + (liked ? 2 : 0) + (recentlyPlayedSong ? 1 : 0),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ song }) => song);
  }, [player.currentSong, player.likedSongs, recentlyPlayed, songs]);

  // Sync playlist aktif ke hook player
  useEffect(() => {
    if (!isLoading && displayedSongs.length > 0) {
      player.setPlaylist(displayedSongs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedSongs, isLoading]);

  // --- TOAST HELPER ---
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleToggleLikeCurrent = () => {
    if (player.currentSong) {
      const isLiked = player.likedSongs.includes(player.currentSong.id);
      player.toggleLike(player.currentSong.id);
      triggerToast(isLiked ? "Dihapus dari Favorit" : "Ditambahkan ke Favorit");
    }
  };

  const handleToggleLikeSong = (song: Song) => {
    const isLiked = player.likedSongs.includes(song.id);
    player.toggleLike(song.id);
    triggerToast(
      isLiked
        ? `"${song.title}" dihapus dari Favorit`
        : `"${song.title}" disimpan ke Favorit ❤️`,
    );
  };

  const handleTogglePlaylist = (song: Song) => {
    const isInPlaylist = playlistSongIds.includes(song.id);
    setPlaylistSongIds((current) =>
      isInPlaylist
        ? current.filter((id) => id !== song.id)
        : [...current, song.id],
    );
    triggerToast(
      isInPlaylist
        ? `"${song.title}" dihapus dari Playlist`
        : `"${song.title}" ditambahkan ke Playlist`,
    );
  };

  const handleClearPlaylist = () => {
    if (playlistSongIds.length === 0) return;
    if (!window.confirm("Hapus semua lagu dari Playlist Saya?")) return;
    setPlaylistSongIds([]);
    triggerToast("Playlist Saya berhasil dikosongkan");
  };

  const handlePlayAllPlaylist = () => {
    if (displayedSongs.length === 0) return;
    player.setPlaylist(displayedSongs);
    player.playSong(displayedSongs[0]);
    triggerToast(`Memutar ${displayedSongs.length} lagu dari Playlist Saya`);
  };

  // --- LOADING SCREEN DENGAN SKELETON LOADER MEWAH ---
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (loadError && songs.length === 0) {
    return (
      <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-400/20 flex items-center justify-center mx-auto mb-4 text-red-300">
            <i className="ri-wifi-off-line text-3xl" aria-hidden="true"></i>
          </div>
          <h1 className="text-xl font-bold mb-2">Tidak dapat memuat lagu</h1>
          <p className="text-sm text-white/50 mb-5">{loadError}</p>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setReloadKey((key) => key + 1);
            }}
            className="px-5 py-2.5 rounded-full bg-[#22c527] text-black font-bold text-sm hover:bg-[#1fbe24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] transition-colors"
          >
            Coba lagi
          </button>
        </div>
      </main>
    );
  }

  // --- RENDER UTAMA ---
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-[#09090b] text-white selection:bg-[#22c527] selection:text-black">
      {/* Background ambient lighting */}
      <div className="aurora-bg"></div>

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalSongsCount={songs.length}
      />
      <Toast message={toastMsg} isVisible={showToast} />
      {loadError && (
        <div
          role="alert"
          className="mx-4 md:mx-8 mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
        >
          {loadError} Data lokal masih ditampilkan.
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-44 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Carousel hanya tampil ketika tidak sedang search & di tab Semua Lagu */}
          {!searchTerm && activeTab === "All Songs" && songs.length > 0 && (
            <HeroCarousel
              songs={songs}
              currentSong={player.currentSong}
              isPlaying={player.isPlaying}
              onPlay={player.playSong}
              onTogglePlay={player.togglePlay}
            />
          )}

          {/* Section Baru Saja Diputar (Recently Played) */}
          {!searchTerm && activeTab === "All Songs" && recentlyPlayed.length > 0 && (
            <RecentlyPlayed
              songs={recentlyPlayed}
              currentSong={player.currentSong}
              isPlaying={player.isPlaying}
              onPlay={player.playSong}
              onClear={handleClearRecentlyPlayed}
            />
          )}

          {!searchTerm && activeTab === "All Songs" && (
            <RecommendationSection
              songs={recommendedSongs}
              currentSong={player.currentSong}
              isPlaying={player.isPlaying}
              onPlay={player.playSong}
            />
          )}

          {/* Tab & Sort Section */}
          <TabSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sortBy={sortBy}
            setSortBy={setSortBy}
            favoritesCount={player.likedSongs.length}
            playlistCount={playlistSongIds.length}
            onClearPlaylist={handleClearPlaylist}
            onPlayAll={handlePlayAllPlaylist}
          />

          <div className="flex items-end justify-between gap-4 mb-4 px-1">
            <div>
              <p className="section-eyebrow">
                {searchTerm ? "Hasil pencarian" : "Koleksi OneMusic"}
              </p>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
                {searchTerm
                  ? `Menemukan ${displayedSongs.length} lagu`
                  : activeTab === "All Songs"
                    ? "Semua lagu untukmu"
                    : activeTab}
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/50">
              <i className="ri-music-2-line text-[#22c527]" aria-hidden="true"></i>
              {displayedSongs.length} lagu
            </span>
          </div>

          {/* Empty State Favorit */}
          {activeTab === "Favorites" && displayedSongs.length === 0 && (
            <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5 my-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#22c527]">
                <i className="ri-heart-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Belum Ada Lagu Favorit
              </h3>
              <p className="text-white/40 text-xs max-w-sm mx-auto mb-4">
                Tekan tombol hati pada kartu lagu atau player untuk menambahkan
                lagu ke koleksi favoritmu.
              </p>
              <button
                onClick={() => setActiveTab("All Songs")}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
              >
                Jelajahi Semua Lagu
              </button>
            </div>
          )}

          {activeTab === "My Playlist" && displayedSongs.length === 0 && (
            <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5 my-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#22c527]">
                <i className="ri-play-list-2-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Playlist Masih Kosong
              </h3>
              <p className="text-white/40 text-xs max-w-sm mx-auto mb-4">
                Tekan tombol tambah pada cover lagu untuk menyimpan lagu favoritmu di sini.
              </p>
              <button
                onClick={() => setActiveTab("All Songs")}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
              >
                Jelajahi Semua Lagu
              </button>
            </div>
          )}

          {/* Empty State Pencarian */}
          {searchTerm && displayedSongs.length === 0 && (
            <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5 my-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
                <i className="ri-search-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Lagu Tidak Ditemukan
              </h3>
              <p className="text-white/40 text-xs max-w-sm mx-auto mb-4">
                Tidak ada hasil untuk pencarian &ldquo;{searchTerm}&rdquo;. Coba
                kata kunci lain atau periksa ejaan.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 rounded-full bg-[#22c527] text-black text-xs font-bold transition hover:scale-105"
              >
                Hapus Pencarian
              </button>
            </div>
          )}

          {/* List Lagu Grid Cards */}
          {displayedSongs.length > 0 && (
            <SongList
              songs={displayedSongs}
              currentSong={player.currentSong}
              isPlaying={player.isPlaying}
              likedSongs={player.likedSongs}
              onPlay={player.playSong}
              onToggleLike={handleToggleLikeSong}
              playlistSongIds={playlistSongIds}
              onTogglePlaylist={handleTogglePlaylist}
            />
          )}

          <Footer />
        </div>
      </div>

      {/* Mini Player */}
      <MiniPlayer
        currentSong={player.currentSong}
        isPlaying={player.isPlaying}
        progress={player.progress}
        duration={player.duration}
        volume={player.volume}
        isLiked={
          player.currentSong
            ? player.likedSongs.includes(player.currentSong.id)
            : false
        }
        onPlayPause={player.togglePlay}
        onNext={player.handleNext}
        onPrev={player.handlePrev}
        onSeek={player.handleSeek}
        onVolumeChange={player.handleVolumeChange}
        onToggleLike={handleToggleLikeCurrent}
        onExpand={() => setIsPlayerOpen(true)}
        onOpenQueue={() => setIsPlayerOpen(true)}
        audioError={player.audioError}
        onRetry={player.retryCurrentSong}
        queueCount={player.priorityQueue.length}
      />

      {/* Full Player Modal */}
      <FullPlayer
        key={player.currentSong?.id || "empty"}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        currentSong={player.currentSong}
        isPlaying={player.isPlaying}
        onPlayPause={player.togglePlay}
        onNext={player.handleNext}
        onPrev={player.handlePrev}
        progress={player.progress}
        duration={player.duration}
        onSeek={player.handleSeek}
        volume={player.volume}
        onVolumeChange={player.handleVolumeChange}
        isLiked={
          player.currentSong
            ? player.likedSongs.includes(player.currentSong.id)
            : false
        }
        onToggleLike={handleToggleLikeCurrent}
        isShuffle={player.isShuffle}
        repeatMode={player.repeatMode}
        onToggleShuffle={player.toggleShuffle}
        onToggleRepeat={player.toggleRepeat}
        playlist={displayedSongs}
        onSelectSong={player.playSong}
        onPlayNext={(song) => {
          player.queueSongNext(song);
          triggerToast(`"${song.title}" akan diputar berikutnya`);
        }}
        priorityQueue={player.priorityQueue}
        onRemoveQueued={(songId) => {
          player.removeQueuedSong(songId);
          triggerToast("Lagu dihapus dari antrean");
        }}
        onMoveQueued={player.moveQueuedSong}
        playbackRate={player.playbackRate}
        onPlaybackRateChange={player.setPlaybackRate}
        sleepTimerMinutes={player.sleepTimerMinutes}
        sleepTimerRemaining={player.sleepTimerRemaining}
        onSetSleepTimer={(mins) => {
          player.setSleepTimer(mins);
          triggerToast(
            mins
              ? `Timer tidur diatur ke ${mins} menit 🌙`
              : "Timer tidur dinonaktifkan"
          );
        }}
        onShare={async () => {
          if (!player.currentSong) return;
          const shareUrl = `${window.location.origin}/?song=${player.currentSong.id}`;
          const shareData = {
            title: player.currentSong.title,
            text: `Dengarkan ${player.currentSong.title} - ${player.currentSong.artist} di OneMusic`,
            url: shareUrl,
          };

          try {
            if (navigator.share) {
              await navigator.share(shareData);
              return;
            }
            await navigator.clipboard.writeText(shareUrl);
            triggerToast("Link lagu berhasil disalin");
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
            console.error("Gagal membagikan lagu:", error);
            triggerToast("Lagu tidak dapat dibagikan saat ini");
          }
        }}
      />
    </main>
  );
}
