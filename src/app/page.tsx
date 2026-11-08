"use client";

import { useState, useEffect, useMemo } from "react";
import { Song } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

// KOMPONEN UI
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Songs");
  const [sortBy, setSortBy] = useState<"default" | "title" | "artist">(
    "default",
  );

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Hook Player
  const player = useAudioPlayer(songs);

  // --- 1. FETCH DATA DARI API ---
  useEffect(() => {
    let isMounted = true;
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        const data: Song[] = await response.json();
        if (isMounted) {
          setSongs(data);
          player.setPlaylist(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Gagal memuat lagu:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSongs();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- 2. FILTERING & SORTING DATA ---
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
      } else if (activeTab !== "All Songs") {
        const songGenre = (song.genre || "").toLowerCase();
        const tab = activeTab.toLowerCase();

        if (tab === "pop") {
          matchesTab =
            (songGenre.includes("pop") && !songGenre.includes("indo")) ||
            songGenre === "pop";
        } else if (tab === "indonesian hits") {
          matchesTab =
            songGenre.includes("indo") ||
            songGenre.includes("indonesian") ||
            ["payung teduh", "tulus", "rizky febian", "nadin amizah", ".feast", "bilal indrajaya", "kunto aji", "stinky", "yahya", "aku jeje"].some(
              (art) => song.artist.toLowerCase().includes(art)
            );
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
  }, [songs, searchTerm, activeTab, sortBy, player.likedSongs]);

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

  // --- LOADING SCREEN DENGAN SKELETON LOADER MEWAH ---
  if (isLoading) {
    return <SkeletonLoader />;
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

          {/* Tab & Sort Section */}
          <TabSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sortBy={sortBy}
            setSortBy={setSortBy}
            favoritesCount={player.likedSongs.length}
          />

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
        playbackRate={player.playbackRate}
        onPlaybackRateChange={player.setPlaybackRate}
      />
    </main>
  );
}
