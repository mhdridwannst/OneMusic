"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Song } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { defaultSongs } from "@/data/defaultSongs";
import { useAuth } from "@/hooks/useAuth";
import { usePlaylistLibrary, type Playlist } from "@/hooks/usePlaylistLibrary";

// KOMPONEN UI
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import SongRowSection from "@/components/SongRowSection";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import RecommendationSection from "@/components/RecommendationSection";
import TabSection from "@/components/TabSection";
import SongList from "@/components/SongList";
import SongTableView from "@/components/SongTableView";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import FullPlayer from "@/components/FullPlayer";
import Toast from "@/components/Toast";
import SkeletonLoader from "@/components/SkeletonLoader";
import AuthModal from "@/components/AuthModal";
import PlaylistPickerModal from "@/components/PlaylistPickerModal";
import PlaylistLibrary from "@/components/PlaylistLibrary";

export default function Home() {
  // --- STATE ---
  const [songs, setSongs] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [pickerSong, setPickerSong] = useState<Song | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Songs");
  const [sortBy, setSortBy] = useState<"default" | "title" | "artist">(
    "default",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const sharedSongHandled = useRef(false);

  const auth = useAuth();
  const playlistLibrary = usePlaylistLibrary(auth.user, auth.isReady);
  const {
    playlists,
    isLoading: isPlaylistsLoading,
    loadError: playlistLoadError,
    isCloudSynced,
  } = playlistLibrary;
  const playlistSongIds = useMemo(
    () => Array.from(new Set(playlists.flatMap((playlist) => playlist.songIds))),
    [playlists],
  );

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
          throw new Error(
            `Songs request failed with status ${response.status}`,
          );
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
        const selectedPlaylist = playlists.find(
          (playlist) => playlist.id === selectedPlaylistId,
        );
        matchesTab = Boolean(selectedPlaylist?.songIds.includes(song.id));
      } else if (activeTab !== "All Songs") {
        const songGenre = (song.genre || "").toLowerCase();
        const tab = activeTab.toLowerCase();

        if (tab === "pop") {
          matchesTab =
            (songGenre.includes("pop") &&
              !songGenre.includes("indo") &&
              !songGenre.includes("k-pop")) ||
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
              "rosé",
              "rose",
            ].some((art) => song.artist.toLowerCase().includes(art));
        } else if (tab === "j-pop") {
          matchesTab =
            songGenre.includes("j-pop") ||
            songGenre.includes("japan") ||
            ["yoasobi"].some((art) => song.artist.toLowerCase().includes(art));
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
          matchesTab = songGenre.includes("r&b") || songGenre.includes("soul");
        } else if (tab.includes("lo-fi")) {
          matchesTab =
            songGenre.includes("lo-fi") ||
            songGenre.includes("ambient") ||
            songGenre.includes("chill");
        } else {
          matchesTab = songGenre.includes(tab) || tab.includes(songGenre);
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
  }, [
    activeTab,
    sortBy,
    searchTerm,
    songs,
    player.likedSongs,
    playlists,
    selectedPlaylistId,
  ]);

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
          score:
            (sameGenre ? 3 : 0) +
            (liked ? 2 : 0) +
            (recentlyPlayedSong ? 1 : 0),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ song }) => song);
  }, [player.currentSong, player.likedSongs, recentlyPlayed, songs]);

  // Sync playlist aktif ke hook player
  useEffect(() => {
    if (!isLoading) {
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
        ? `"${song.title}" Dihapus dari Favorit`
        : `"${song.title}" Disimpan ke Favorit`,
    );
  };

  const handleTogglePlaylist = (song: Song) => {
    setPickerSong(song);
  };

  const handleAddSongToPlaylist = async (playlistId: string, songId: number) => {
    const added = await playlistLibrary.addSongToPlaylist(playlistId, songId);
    const song = songs.find((item) => item.id === songId);
    if (added && song) triggerToast(`"${song.title}" ditambahkan ke playlist`);
  };

  const handleRemoveSongFromPlaylist = async (playlistId: string, songId: number) => {
    await playlistLibrary.removeSongFromPlaylist(playlistId, songId);
    const song = songs.find((item) => item.id === songId);
    if (song) triggerToast(`"${song.title}" dihapus dari playlist`);
  };

  const handlePlayAllPlaylist = (playlist: Playlist, shuffle = false) => {
    const playlistSongs = playlist.songIds
      .map((id) => songs.find((song) => song.id === id))
      .filter((song): song is Song => Boolean(song));

    if (playlistSongs.length === 0) {
      triggerToast("Playlist ini belum memiliki lagu yang tersedia");
      return;
    }

    setSelectedPlaylistId(playlist.id);
    player.setPlaylist(playlistSongs);
    if (shuffle) {
      if (!player.isShuffle) player.toggleShuffle();
      const randomIndex = Math.floor(Math.random() * playlistSongs.length);
      player.playSong(playlistSongs[randomIndex]);
    } else {
      if (player.isShuffle) player.toggleShuffle();
      player.playSong(playlistSongs[0]);
    }
    triggerToast(
      `${shuffle ? "Memutar acak" : "Memutar"} ${playlistSongs.length} lagu dari "${playlist.name}"`,
    );
  };

  const handleShuffleAll = () => {
    if (displayedSongs.length === 0) return;
    const randomIndex = Math.floor(Math.random() * displayedSongs.length);
    player.playSong(displayedSongs[randomIndex]);
    if (!player.isShuffle) {
      player.toggleShuffle();
    }
    triggerToast("Memutar acak lagu 🔀");
  };

  // --- CURATED COLLECTIONS UNTUK HORIZONTAL SNAP ROWS SPOTIFY ---
  const trendingHits = useMemo(() => {
    const viralIds = [
      114, 125, 77, 73, 87, 72, 63, 74, 70, 95, 27, 28, 88, 78, 102, 110,
    ];
    return songs.filter((s) => viralIds.includes(s.id));
  }, [songs]);

  const indonesianHitsRow = useMemo(() => {
    return songs
      .filter((s) => {
        const g = (s.genre || "").toLowerCase();
        return (
          g.includes("indo") ||
          [
            "tulus",
            "payung teduh",
            "nadhif",
            "rio clappy",
            "the lantis",
            "enau",
            "raim laode",
            "fariz",
            "paul partohap",
            "rizky febian",
            "kunto aji",
          ].some((a) => s.artist.toLowerCase().includes(a))
        );
      })
      .slice(0, 16);
  }, [songs]);

  const asianWaveRow = useMemo(() => {
    return songs
      .filter((s) => {
        const g = (s.genre || "").toLowerCase();
        return (
          g.includes("k-pop") ||
          g.includes("j-pop") ||
          [
            "bts",
            "twice",
            "illit",
            "jung kook",
            "fifty fifty",
            "leehi",
            "yoasobi",
            "rose",
          ].some((a) => s.artist.toLowerCase().includes(a))
        );
      })
      .slice(0, 16);
  }, [songs]);

  const chillAcousticRow = useMemo(() => {
    return songs
      .filter((s) => {
        const g = (s.genre || "").toLowerCase();
        return (
          g.includes("lo-fi") ||
          g.includes("acoustic") ||
          g.includes("ambient") ||
          [
            "cigarettes after sex",
            "keshi",
            "d4vd",
            "wave to earth",
            "laufey",
            "stephen sanchez",
            "beabadoobee",
          ].some((a) => s.artist.toLowerCase().includes(a))
        );
      })
      .slice(0, 16);
  }, [songs]);

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
        userEmail={auth.user?.email ?? null}
        onAccountClick={() => setIsAuthModalOpen(true)}
      />
      <Toast message={toastMsg} isVisible={showToast} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={auth.user}
        isConfigured={auth.isConfigured}
        onSignIn={auth.signIn}
        onSignUp={auth.signUp}
        onSignOut={auth.signOut}
      />
      <PlaylistPickerModal
        song={pickerSong}
        playlists={playlists}
        onClose={() => setPickerSong(null)}
        onCreatePlaylist={playlistLibrary.createPlaylist}
        onAddSong={handleAddSongToPlaylist}
        onRemoveSong={handleRemoveSongFromPlaylist}
      />
      {loadError && (
        <div
          role="alert"
          className="mx-4 md:mx-8 mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
        >
          {loadError} Data lokal masih ditampilkan.
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-44 pt-3 md:px-8 md:pt-5 z-10">
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
          {!searchTerm &&
            activeTab === "All Songs" &&
            recentlyPlayed.length > 0 && (
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

          {/* CURATED HORIZONTAL SNAP ROWS (SPOTIFY STYLE) */}
          {!searchTerm && activeTab === "All Songs" && (
            <>
              {/* Row 1: Viral & Trending */}
              <SongRowSection
                title="Trending Music "
                subtitle="Lagu-lagu hits terpopuler pilihan pendengar"
                icon="ri-fire-fill"
                songs={trendingHits}
                currentSong={player.currentSong}
                isPlaying={player.isPlaying}
                likedSongs={player.likedSongs}
                onPlay={player.playSong}
                onToggleLike={handleToggleLikeSong}
                playlistSongIds={playlistSongIds}
                onTogglePlaylist={handleTogglePlaylist}
              />

              {/* Row 2: Indonesian Hits */}
              <SongRowSection
                title="Trending Indonesia"
                subtitle="Karya musisi tanah air paling berkesan"
                icon="ri-flag-fill"
                songs={indonesianHitsRow}
                currentSong={player.currentSong}
                isPlaying={player.isPlaying}
                likedSongs={player.likedSongs}
                onPlay={player.playSong}
                onToggleLike={handleToggleLikeSong}
                playlistSongIds={playlistSongIds}
                onTogglePlaylist={handleTogglePlaylist}
                onViewAll={() => setActiveTab("Indonesian Hits")}
              />

              {/* Row 3: Asian & K-Pop Wave */}
              <SongRowSection
                title="K-Pop & J-Pop"
                subtitle="Irama memukau dari Korea & Jepang"
                icon="ri-sparkling-fill"
                songs={asianWaveRow}
                currentSong={player.currentSong}
                isPlaying={player.isPlaying}
                likedSongs={player.likedSongs}
                onPlay={player.playSong}
                onToggleLike={handleToggleLikeSong}
                playlistSongIds={playlistSongIds}
                onTogglePlaylist={handleTogglePlaylist}
                onViewAll={() => setActiveTab("K-Pop")}
              />

              {/* Row 4: Chill & Lo-Fi Night */}
              <SongRowSection
                title="Chill, Lo-Fi & Bossanova"
                subtitle="Teman setia saat santai, belajar, atau istirahat malam"
                icon="ri-moon-clear-fill"
                songs={chillAcousticRow}
                currentSong={player.currentSong}
                isPlaying={player.isPlaying}
                likedSongs={player.likedSongs}
                onPlay={player.playSong}
                onToggleLike={handleToggleLikeSong}
                playlistSongIds={playlistSongIds}
                onTogglePlaylist={handleTogglePlaylist}
                onViewAll={() => setActiveTab("Lo-Fi / Ambient")}
              />
            </>
          )}

          {/* Tab & Sort Section */}
          <TabSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sortBy={sortBy}
            setSortBy={setSortBy}
            favoritesCount={player.likedSongs.length}
            playlistCount={playlists.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onShuffleAll={activeTab === "My Playlist" ? undefined : handleShuffleAll}
          />

          {activeTab === "My Playlist" ? (
            <PlaylistLibrary
              playlists={playlists}
              songs={songs}
              selectedPlaylistId={selectedPlaylistId}
              isLoading={isPlaylistsLoading}
              loadError={playlistLoadError}
              isCloudSynced={isCloudSynced}
              onSelectPlaylist={setSelectedPlaylistId}
              onCreatePlaylist={playlistLibrary.createPlaylist}
              onRenamePlaylist={playlistLibrary.renamePlaylist}
              onDeletePlaylist={playlistLibrary.deletePlaylist}
              onPlaySong={(song, playlist) => {
                const playlistSongs = playlist.songIds
                  .map((id) => songs.find((item) => item.id === id))
                  .filter((item): item is Song => Boolean(item));
                player.setPlaylist(playlistSongs);
                player.playSong(song);
              }}
              onPlayAll={handlePlayAllPlaylist}
              onRemoveSong={handleRemoveSongFromPlaylist}
              onMoveSong={playlistLibrary.moveSong}
            />
          ) : (
            <>
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
              <i
                className="ri-music-2-line text-[#22c527]"
                aria-hidden="true"
              ></i>
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

          {/* List Lagu: Pilihan Grid Card vs Compact Spotify Table List */}
          {displayedSongs.length > 0 &&
            (viewMode === "list" ? (
              <SongTableView
                songs={displayedSongs}
                currentSong={player.currentSong}
                isPlaying={player.isPlaying}
                likedSongs={player.likedSongs}
                onPlay={player.playSong}
                onToggleLike={handleToggleLikeSong}
                playlistSongIds={playlistSongIds}
                onTogglePlaylist={handleTogglePlaylist}
              />
            ) : (
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
            ))}
            </>
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
              : "Timer tidur dinonaktifkan",
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

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
