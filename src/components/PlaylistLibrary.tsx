"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Song } from "@/types";
import type { Playlist } from "@/hooks/usePlaylistLibrary";

interface PlaylistLibraryProps {
  playlists: Playlist[];
  songs: Song[];
  selectedPlaylistId: string | null;
  isLoading: boolean;
  loadError: string | null;
  isCloudSynced: boolean;
  onSelectPlaylist: (playlistId: string | null) => void;
  onCreatePlaylist: (input: { name: string; description: string }) => Promise<Playlist>;
  onRenamePlaylist: (playlistId: string, input: { name: string; description: string }) => Promise<void>;
  onDeletePlaylist: (playlistId: string) => Promise<void>;
  onPlaySong: (song: Song, playlist: Playlist) => void;
  onPlayAll: (playlist: Playlist, shuffle?: boolean) => void;
  onRemoveSong: (playlistId: string, songId: number) => Promise<void>;
  onMoveSong: (playlistId: string, songId: number, direction: -1 | 1) => Promise<void>;
}

interface PlaylistArtworkProps {
  name: string;
  coverUrl?: string | null;
  covers: string[];
  className?: string;
}

function PlaylistArtwork({ name, coverUrl, covers, className = "" }: PlaylistArtworkProps) {
  if (coverUrl) {
    return (
      <div className={`relative overflow-hidden bg-[#17171a] ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverUrl} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/5" />
      </div>
    );
  }

  if (covers.length === 0) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,39,0.25),transparent_38%),linear-gradient(145deg,#202326,#0b0d0d_70%)] ${className}`}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/8" />
        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full border border-[#22c527]/15" />
        <i className="ri-play-list-2-fill relative text-5xl text-[#22c527]/75 drop-shadow-[0_0_24px_rgba(34,197,39,0.25)]" aria-hidden="true" />
      </div>
    );
  }

  const artworkClass = "h-full w-full object-cover";
  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-px overflow-hidden bg-black/40 ${className}`} aria-hidden="true">
      {covers.length === 1 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={covers[0]} alt="" loading="lazy" className={`${artworkClass} col-span-2 row-span-2`} />
      ) : covers.length === 2 ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={covers[0]} alt="" loading="lazy" className={`${artworkClass} row-span-2`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={covers[1]} alt="" loading="lazy" className={`${artworkClass} row-span-2`} />
        </>
      ) : (
        covers.slice(0, 4).map((cover, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${name}-${index}`} src={cover} alt="" loading="lazy" className={artworkClass} />
        ))
      )}
    </div>
  );
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Koleksi pribadi";
  return `Diperbarui ${new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(date)}`;
}

export default function PlaylistLibrary({
  playlists,
  songs,
  selectedPlaylistId,
  isLoading,
  loadError,
  isCloudSynced,
  onSelectPlaylist,
  onCreatePlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onPlaySong,
  onPlayAll,
  onRemoveSong,
  onMoveSong,
}: PlaylistLibraryProps) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "tracks">("recent");
  const [busy, setBusy] = useState(false);
  const [busySongId, setBusySongId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId) ?? null;
  const songById = useMemo(() => new Map(songs.map((song) => [song.id, song])), [songs]);
  const selectedSongs = useMemo(() => {
    if (!selectedPlaylist) return [];
    return selectedPlaylist.songIds
      .map((id) => songById.get(id))
      .filter((song): song is Song => Boolean(song));
  }, [selectedPlaylist, songById]);

  const filteredPlaylists = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    const result = playlists.filter((playlist) =>
      !query ||
      playlist.name.toLocaleLowerCase().includes(query) ||
      playlist.description.toLocaleLowerCase().includes(query),
    );

    return [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, "id");
      if (sortBy === "tracks") return b.songIds.length - a.songIds.length;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [playlists, searchTerm, sortBy]);

  const totalTracks = useMemo(
    () => new Set(playlists.flatMap((playlist) => playlist.songIds)).size,
    [playlists],
  );

  useEffect(() => {
    if (!showForm && !showDeleteConfirm) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        setShowForm(false);
        setShowDeleteConfirm(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showForm, showDeleteConfirm, busy]);

  const beginCreate = () => {
    setDraftName("");
    setDraftDescription("");
    setEditing(false);
    setError(null);
    setShowForm(true);
  };

  const beginEdit = () => {
    if (!selectedPlaylist) return;
    setDraftName(selectedPlaylist.name);
    setDraftDescription(selectedPlaylist.description);
    setEditing(true);
    setError(null);
    setShowForm(true);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = draftName.trim();
    if (!name) {
      setError("Masukkan nama playlist terlebih dahulu.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      if (editing && selectedPlaylist) {
        await onRenamePlaylist(selectedPlaylist.id, {
          name,
          description: draftDescription.trim(),
        });
      } else {
        const created = await onCreatePlaylist({
          name,
          description: draftDescription.trim(),
        });
        onSelectPlaylist(created.id);
      }
      setShowForm(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Playlist gagal disimpan.");
    } finally {
      setBusy(false);
    }
  };

  const runSongAction = async (songId: number, action: Promise<void>) => {
    setError(null);
    setBusySongId(songId);
    try {
      await action;
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Perubahan lagu gagal disimpan.");
    } finally {
      setBusySongId(null);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!selectedPlaylist) return;
    setBusy(true);
    setError(null);
    try {
      await onDeletePlaylist(selectedPlaylist.id);
      setShowDeleteConfirm(false);
      onSelectPlaylist(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Playlist gagal dihapus.");
      setShowDeleteConfirm(false);
    } finally {
      setBusy(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mb-10" aria-label="Memuat playlist">
        <div className="mb-5 h-7 w-44 animate-pulse rounded-lg bg-white/8" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/6 bg-white/3 p-3">
              <div className="aspect-square animate-pulse rounded-xl bg-white/6" />
              <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-white/8" />
              <div className="mt-2 h-2.5 w-1/2 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const selectedCovers = selectedSongs.slice(0, 4).map((song) => song.cover);
  const selectedCover = selectedPlaylist?.coverUrl ?? selectedCovers[0] ?? null;

  return (
    <section className="mb-12" aria-labelledby="playlist-library-heading">
      <div className="relative mb-6 overflow-hidden rounded-[1.75rem] border border-white/8 bg-[radial-gradient(ellipse_at_85%_0%,rgba(34,197,39,0.13),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#22c527]/10" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22c527]/20 bg-[#22c527]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.17em] text-[#6de673]">
                <i className="ri-sparkling-2-fill" aria-hidden="true" /> Your collection
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-black/20 px-2.5 py-1 text-[9px] font-bold text-white/45">
                <span className={`h-1.5 w-1.5 rounded-full ${isCloudSynced ? "bg-[#22c527]" : "bg-white/35"}`} />
                {isCloudSynced ? "Cloud synced" : "On this device"}
              </span>
            </div>
            <h2 id="playlist-library-heading" className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">Playlist Saya</h2>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-white/45 sm:text-sm">
              Kumpulan musik yang kamu susun sendiri, untuk setiap suasana dan momen.
            </p>
          </div>
          {!selectedPlaylist && (
            <button
              type="button"
              onClick={beginCreate}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#22c527] px-5 text-xs font-black text-[#061006] shadow-[0_8px_28px_rgba(34,197,39,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#35d93a] hover:shadow-[0_12px_34px_rgba(34,197,39,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101312] active:translate-y-0"
            >
              <i className="ri-add-line text-base" aria-hidden="true" /> Buat playlist
            </button>
          )}
          {selectedPlaylist && (
            <button
              type="button"
              onClick={() => onSelectPlaylist(null)}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 text-xs font-bold text-white/75 transition hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] sm:self-auto"
            >
              <i className="ri-arrow-left-line" aria-hidden="true" /> Semua playlist
            </button>
          )}
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2 sm:max-w-md sm:grid-cols-3">
          <div className="rounded-xl border border-white/7 bg-black/20 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">Playlist</p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-white">{playlists.length}</p>
          </div>
          <div className="rounded-xl border border-white/7 bg-black/20 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">Lagu unik</p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-white">{totalTracks}</p>
          </div>
          <div className="col-span-2 rounded-xl border border-white/7 bg-black/20 px-3 py-2.5 sm:col-span-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">Penyimpanan</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-white/75">
              <i className={isCloudSynced ? "ri-cloud-line text-[#22c527]" : "ri-smartphone-line text-white/45"} aria-hidden="true" />
              {isCloudSynced ? "Cloud" : "Lokal"}
            </p>
          </div>
        </div>
      </div>

      {loadError && (
        <div role="alert" className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/7 p-4 text-xs leading-relaxed text-amber-100">
          <i className="ri-error-warning-line mt-0.5 text-base" aria-hidden="true" />
          <span>Playlist cloud gagal dimuat: {loadError}. Periksa konfigurasi tabel dan kebijakan RLS Supabase.</span>
        </div>
      )}

      {selectedPlaylist ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#111314] shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
          <div className="relative isolate overflow-hidden">
            {selectedCover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedCover} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-[0.16] blur-3xl" />
            )}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#101312]/98 via-[#101312]/88 to-[#101312]/75" />
            <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-end sm:gap-6 sm:p-6 lg:p-8">
              <div className="group h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/12 shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:h-48 sm:w-48">
                <PlaylistArtwork name={selectedPlaylist.name} coverUrl={selectedPlaylist.coverUrl} covers={selectedCovers} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1 pb-0.5">
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#62df68]">Personal playlist</p>
                <h3 className="mt-2 break-words text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">{selectedPlaylist.name}</h3>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/55 sm:text-sm">{selectedPlaylist.description || "Belum ada deskripsi untuk playlist ini."}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold text-white/45">
                  <span>{selectedSongs.length} lagu tersedia</span>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span>{formatUpdatedAt(selectedPlaylist.updatedAt)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" disabled={selectedSongs.length === 0} onClick={() => onPlayAll(selectedPlaylist)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#22c527] px-5 text-xs font-black text-black shadow-[0_8px_24px_rgba(34,197,39,0.2)] transition hover:-translate-y-0.5 hover:bg-[#35d93a] disabled:cursor-not-allowed disabled:opacity-35">
                    <i className="ri-play-fill text-base" aria-hidden="true" /> Putar
                  </button>
                  <button type="button" disabled={selectedSongs.length === 0} onClick={() => onPlayAll(selectedPlaylist, true)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 text-xs font-bold text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">
                    <i className="ri-shuffle-line" aria-hidden="true" /> Acak
                  </button>
                  <button type="button" onClick={beginEdit} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                    <i className="ri-edit-line" aria-hidden="true" /> Edit
                  </button>
                  <button type="button" onClick={() => setShowDeleteConfirm(true)} disabled={busy} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-red-400/15 bg-red-400/5 px-4 text-xs font-bold text-red-200/80 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-100 disabled:opacity-50">
                    <i className="ri-delete-bin-line" aria-hidden="true" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/7">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs font-black text-white">Daftar lagu</p>
                <p className="mt-0.5 text-[10px] text-white/35">Pilih lagu untuk memutar dari posisi tersebut</p>
              </div>
              <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-bold text-white/45">{selectedSongs.length} tracks</span>
            </div>
            {error && <p role="alert" className="mx-4 mb-3 rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-xs text-red-200 sm:mx-6">{error}</p>}
            {selectedPlaylist.songIds.length === 0 ? (
              <div className="mx-4 mb-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-12 text-center sm:mx-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#22c527]/15 bg-[#22c527]/8 text-[#22c527]"><i className="ri-music-2-line text-2xl" aria-hidden="true" /></div>
                <p className="mt-4 text-sm font-black text-white">Playlist ini masih kosong</p>
                <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-white/40">Jelajahi katalog, lalu tekan tombol + pada lagu untuk menambahkannya ke sini.</p>
              </div>
            ) : selectedSongs.length === 0 ? (
              <div className="p-8 text-center text-xs text-white/45">Lagu dalam playlist tidak ditemukan di katalog saat ini.</div>
            ) : (
              <div className="px-2 pb-3 sm:px-3">
                <div className="hidden grid-cols-[34px_minmax(0,1fr)_150px] items-center gap-3 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/25 sm:grid">
                  <span className="text-center">#</span><span>Judul</span><span className="text-right">Atur lagu</span>
                </div>
                <div className="space-y-1">
                  {selectedPlaylist.songIds.map((songId, index) => {
                    const song = songById.get(songId);
                    if (!song) return null;
                    const rowBusy = busySongId === song.id;
                    return (
                      <div key={`${selectedPlaylist.id}-${song.id}`} className="group flex min-w-0 items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/[0.045] sm:grid sm:grid-cols-[34px_minmax(0,1fr)_150px] sm:gap-3 sm:px-3">
                        <span className="hidden text-center text-[11px] font-mono tabular-nums text-white/30 sm:block">{String(index + 1).padStart(2, "0")}</span>
                        <button type="button" onClick={() => onPlaySong(song, selectedPlaylist)} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111314] rounded-lg">
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/8 bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={song.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition group-hover:opacity-100"><i className="ri-play-fill text-lg" aria-hidden="true" /></span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-bold text-white transition group-hover:text-[#6de673]">{song.title}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-white/40">{song.artist}</span>
                          </span>
                        </button>
                        <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1">
                          <button type="button" disabled={index === 0 || rowBusy} onClick={() => void runSongAction(song.id, onMoveSong(selectedPlaylist.id, song.id, -1))} aria-label={`Pindahkan ${song.title} ke atas`} title="Pindahkan ke atas" className="flex h-8 w-8 items-center justify-center rounded-full text-white/35 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] disabled:cursor-not-allowed disabled:opacity-15"><i className="ri-arrow-up-line" /></button>
                          <button type="button" disabled={index === selectedPlaylist.songIds.length - 1 || rowBusy} onClick={() => void runSongAction(song.id, onMoveSong(selectedPlaylist.id, song.id, 1))} aria-label={`Pindahkan ${song.title} ke bawah`} title="Pindahkan ke bawah" className="flex h-8 w-8 items-center justify-center rounded-full text-white/35 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] disabled:cursor-not-allowed disabled:opacity-15"><i className="ri-arrow-down-line" /></button>
                          <button type="button" disabled={rowBusy} onClick={() => void runSongAction(song.id, onRemoveSong(selectedPlaylist.id, song.id))} aria-label={`Hapus ${song.title} dari playlist`} title="Hapus dari playlist" className="flex h-8 w-8 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-30"><i className={rowBusy ? "ri-loader-4-line animate-spin" : "ri-close-line"} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {playlists.length > 0 && (
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-black text-white">Koleksi playlist</h3>
                <p className="mt-0.5 text-[10px] text-white/35">Pilih koleksi untuk melihat lagu di dalamnya.</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <label className="relative min-w-0 flex-1 sm:w-56">
                  <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30" aria-hidden="true" />
                  <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Cari playlist..." aria-label="Cari playlist" className="h-10 w-full rounded-full border border-white/8 bg-white/[0.035] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-[#22c527]/45 focus:ring-2 focus:ring-[#22c527]/10" />
                </label>
                <label className="flex h-10 items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3 text-[10px] font-bold text-white/45">
                  <i className="ri-sort-desc text-[#22c527]" aria-hidden="true" />
                  <span className="sr-only">Urutkan playlist</span>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "recent" | "name" | "tracks")} aria-label="Urutkan playlist" className="max-w-32 bg-transparent text-xs text-white/75 outline-none">
                    <option value="recent" className="bg-[#151817]">Terbaru</option>
                    <option value="name" className="bg-[#151817]">Nama A–Z</option>
                    <option value="tracks" className="bg-[#151817]">Jumlah lagu</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {playlists.length === 0 ? (
            <div className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-white/12 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,39,0.12),transparent_58%),rgba(255,255,255,0.015)] px-5 py-14 text-center sm:py-16">
              <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full border border-white/5" />
              <div className="pointer-events-none absolute -bottom-28 -right-14 h-64 w-64 rounded-full border border-[#22c527]/10" />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#22c527]/20 bg-[#22c527]/10 text-[#5fe967] shadow-[0_0_40px_rgba(34,197,39,0.1)]"><i className="ri-play-list-2-line text-3xl" aria-hidden="true" /></div>
              <p className="relative mt-5 text-[9px] font-black uppercase tracking-[0.24em] text-[#62df68]">Make it yours</p>
              <h3 className="relative mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">Mulai koleksi playlist kamu</h3>
              <p className="relative mx-auto mt-2 max-w-sm text-xs leading-relaxed text-white/42">Susun lagu berdasarkan suasana, aktivitas, atau momen favoritmu. Koleksi ini hanya milikmu.</p>
              <button type="button" onClick={beginCreate} className="relative mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#22c527] px-5 text-xs font-black text-black shadow-[0_8px_28px_rgba(34,197,39,0.2)] transition hover:-translate-y-0.5 hover:bg-[#35d93a]">
                <i className="ri-add-line text-base" aria-hidden="true" /> Buat playlist pertama
              </button>
            </div>
          ) : filteredPlaylists.length === 0 ? (
            <div className="rounded-2xl border border-white/7 bg-white/[0.02] px-5 py-12 text-center">
              <i className="ri-search-line text-2xl text-white/25" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-white">Playlist tidak ditemukan</p>
              <p className="mt-1 text-xs text-white/40">Coba kata kunci lain.</p>
              <button type="button" onClick={() => setSearchTerm("")} className="mt-3 text-xs font-bold text-[#62df68] hover:text-white">Hapus pencarian</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {filteredPlaylists.map((playlist, index) => {
                const covers = playlist.songIds
                  .slice(0, 4)
                  .map((id) => songById.get(id)?.cover)
                  .filter((cover): cover is string => Boolean(cover));
                return (
                  <article key={playlist.id} className="group relative min-w-0 rounded-2xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[#22c527]/30 hover:bg-white/[0.055] hover:shadow-[0_18px_42px_rgba(0,0,0,0.28)] sm:p-3">
                    <button type="button" onClick={() => onSelectPlaylist(playlist.id)} aria-label={`Buka playlist ${playlist.name}`} className="block w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]">
                      <div className="group relative mb-3 aspect-square overflow-hidden rounded-xl border border-white/8 shadow-inner">
                        <PlaylistArtwork name={playlist.name} coverUrl={playlist.coverUrl} covers={covers} className="h-full w-full" />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-white/5 opacity-70 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="truncate text-[13px] font-black tracking-tight text-white transition-colors group-hover:text-[#6de673] sm:text-sm">{playlist.name}</p>
                      <p className="mt-1 line-clamp-2 min-h-8 text-[10px] leading-relaxed text-white/38 sm:text-[11px]">{playlist.description || "Playlist pribadi"}</p>
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/6 pt-2.5">
                        <span className="text-[9px] font-bold text-white/38">{playlist.songIds.length} lagu</span>
                        <span className="truncate text-[9px] font-medium text-white/25">{formatUpdatedAt(playlist.updatedAt)}</span>
                      </div>
                    </button>
                    <button type="button" disabled={playlist.songIds.length === 0} onClick={() => onPlayAll(playlist)} aria-label={`Putar playlist ${playlist.name}`} title="Putar playlist" className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-[#22c527] text-black opacity-0 shadow-[0_8px_24px_rgba(34,197,39,0.3)] transition duration-200 hover:scale-105 hover:bg-[#35d93a] focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-35">
                      <i className="ri-play-fill text-xl" aria-hidden="true" />
                    </button>
                    <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/65 opacity-0 backdrop-blur-md transition group-hover:opacity-100">Playlist {index + 1}</span>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setShowForm(false); }}>
          <form onSubmit={handleSave} role="dialog" aria-modal="true" aria-labelledby="playlist-form-title" className="premium-surface w-full max-w-lg rounded-[1.75rem] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#62df68]">Your collection</p>
                <h3 id="playlist-form-title" className="mt-1 text-xl font-black tracking-tight text-white">{editing ? "Edit playlist" : "Buat playlist baru"}</h3>
                <p className="mt-1 text-xs text-white/40">Beri nama yang mewakili suasana musikmu.</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)} disabled={busy} aria-label="Tutup form" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/5 text-white/55 transition hover:bg-white/10 hover:text-white disabled:opacity-40"><i className="ri-close-line text-lg" /></button>
            </div>
            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/55">Nama playlist</span>
                <input autoFocus required maxLength={60} value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="Contoh: After Hours, Sunday Morning..." className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#22c527]/55 focus:ring-2 focus:ring-[#22c527]/10" />
                <span className="block text-right text-[9px] text-white/25">{draftName.length}/60</span>
              </label>
              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/55">Deskripsi <span className="font-medium normal-case tracking-normal text-white/30">(opsional)</span></span>
                <textarea maxLength={240} rows={3} value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} placeholder="Ceritakan sedikit tentang playlist ini..." className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/25 focus:border-[#22c527]/55 focus:ring-2 focus:ring-[#22c527]/10" />
              </label>
            </div>
            {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-xs text-red-200">{error}</p>}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" disabled={busy} onClick={() => setShowForm(false)} className="min-h-11 rounded-full border border-white/10 px-5 text-xs font-bold text-white/65 transition hover:bg-white/5 disabled:opacity-40">Batal</button>
              <button type="submit" disabled={busy || !draftName.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#22c527] px-5 text-xs font-black text-black transition hover:bg-[#35d93a] disabled:cursor-not-allowed disabled:opacity-45">{busy ? <><i className="ri-loader-4-line animate-spin" /> Menyimpan...</> : <><i className="ri-check-line" /> {editing ? "Simpan perubahan" : "Buat playlist"}</>}</button>
            </div>
          </form>
        </div>
      )}

      {showDeleteConfirm && selectedPlaylist && (
        <div className="fixed inset-0 z-[125] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setShowDeleteConfirm(false); }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="delete-playlist-title" aria-describedby="delete-playlist-description" className="premium-surface w-full max-w-sm rounded-[1.75rem] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-200"><i className="ri-delete-bin-line text-xl" aria-hidden="true" /></div>
            <h3 id="delete-playlist-title" className="mt-4 text-lg font-black text-white">Hapus playlist?</h3>
            <p id="delete-playlist-description" className="mt-2 text-xs leading-relaxed text-white/45">Playlist <span className="font-bold text-white">“{selectedPlaylist.name}”</span> akan dihapus dari koleksimu. Lagu asli di katalog OneMusic tidak akan ikut terhapus.</p>
            {error && <p role="alert" className="mt-3 text-xs text-red-200">{error}</p>}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" disabled={busy} onClick={() => setShowDeleteConfirm(false)} className="min-h-10 rounded-full border border-white/10 px-4 text-xs font-bold text-white/65 transition hover:bg-white/5 disabled:opacity-40">Batal</button>
              <button type="button" disabled={busy} onClick={() => void handleDeletePlaylist()} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-red-500 px-4 text-xs font-black text-white transition hover:bg-red-400 disabled:opacity-50">{busy ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-delete-bin-line" />} Hapus playlist</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
