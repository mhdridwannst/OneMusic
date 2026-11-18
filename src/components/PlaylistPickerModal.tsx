"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Song } from "@/types";
import type { Playlist } from "@/hooks/usePlaylistLibrary";

interface PlaylistPickerModalProps {
  song: Song | null;
  playlists: Playlist[];
  onClose: () => void;
  onCreatePlaylist: (input: {
    name: string;
    description: string;
  }) => Promise<Playlist>;
  onAddSong: (playlistId: string, songId: number) => Promise<void>;
  onRemoveSong: (playlistId: string, songId: number) => Promise<void>;
}

export default function PlaylistPickerModal({
  song,
  playlists,
  onClose,
  onCreatePlaylist,
  onAddSong,
  onRemoveSong,
}: PlaylistPickerModalProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedSongId = song?.id ?? null;

  useEffect(() => {
    if (selectedSongId === null) return;

    setShowCreate(playlists.length === 0);
    setName("");
    setDescription("");
    setSearchTerm("");
    setError(null);
  }, [selectedSongId, playlists.length]);

  useEffect(() => {
    if (!song) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [song, busy, onClose]);

  const visiblePlaylists = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return playlists;
    return playlists.filter(
      (playlist) =>
        playlist.name.toLocaleLowerCase().includes(query) ||
        playlist.description.toLocaleLowerCase().includes(query),
    );
  }, [playlists, searchTerm]);

  if (!song) return null;

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Masukkan nama playlist terlebih dahulu.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const created = await onCreatePlaylist({
        name: cleanName,
        description: description.trim(),
      });
      await onAddSong(created.id, song.id);
      onClose();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Gagal membuat playlist.",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async (playlist: Playlist) => {
    setError(null);
    setBusyId(playlist.id);
    try {
      if (playlist.songIds.includes(song.id)) {
        await onRemoveSong(playlist.id, song.id);
      } else {
        await onAddSong(playlist.id, song.id);
      }
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Perubahan playlist gagal.",
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex items-center justify-center bg-black/78 p-3 backdrop-blur-lg sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="playlist-picker-title"
        className="premium-surface flex max-h-[min(88dvh,760px)] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
      >
        <div className="border-b border-white/7 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#62df68]">
                Add to your collection
              </p>
              <h2
                id="playlist-picker-title"
                className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl"
              >
                Simpan ke playlist
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              aria-label="Tutup pemilih playlist"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/5 text-white/55 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/25 p-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={song.cover}
                alt={song.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-white">
                {song.title}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-white/40">
                {song.artist}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22c527]/10 text-[#62df68]">
              <i className="ri-music-2-line" />
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {error && (
            <p
              role="alert"
              className="mb-3 rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-xs leading-relaxed text-red-200"
            >
              {error}
            </p>
          )}

          {playlists.length > 0 && (
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                Playlist kamu{" "}
                <span className="ml-1 text-white/25">{playlists.length}</span>
              </p>
              <label className="relative w-36 sm:w-44">
                <i
                  className="ri-search-line pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/30"
                  aria-hidden="true"
                />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Cari playlist"
                  aria-label="Cari playlist tujuan"
                  className="h-8 w-full rounded-full border border-white/8 bg-white/[0.035] pl-8 pr-3 text-[10px] text-white outline-none placeholder:text-white/25 focus:border-[#22c527]/45"
                />
              </label>
            </div>
          )}

          {playlists.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-7 text-center">
              <i
                className="ri-play-list-add-line text-3xl text-[#62df68]"
                aria-hidden="true"
              />
              <p className="mt-2 text-sm font-bold text-white">
                Belum ada playlist
              </p>
              <p className="mt-1 text-xs text-white/40">
                Buat playlist pertamamu, lalu lagu ini akan langsung
                ditambahkan.
              </p>
            </div>
          ) : visiblePlaylists.length === 0 ? (
            <div className="py-8 text-center">
              <i
                className="ri-search-line text-2xl text-white/25"
                aria-hidden="true"
              />
              <p className="mt-2 text-xs font-semibold text-white/60">
                Tidak ada playlist yang cocok.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {visiblePlaylists.map((playlist) => {
                const included = playlist.songIds.includes(song.id);
                const isBusy = busyId === playlist.id;
                return (
                  <div
                    key={playlist.id}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-white/12 hover:bg-white/[0.045]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/8 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,39,0.2),transparent_60%),#171a18] text-[#62df68]">
                      {playlist.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={playlist.coverUrl}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <i
                          className="ri-play-list-2-fill text-lg"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-black text-white">
                        {playlist.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/38">
                        {playlist.songIds.length} lagu
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={busy || isBusy}
                      onClick={() => void handleToggle(playlist)}
                      aria-label={
                        included
                          ? `Hapus ${song.title} dari ${playlist.name}`
                          : `Tambahkan ${song.title} ke ${playlist.name}`
                      }
                      className={`inline-flex min-h-9 min-w-24 items-center justify-center gap-1.5 rounded-full px-3 text-[10px] font-black transition disabled:cursor-not-allowed disabled:opacity-45 ${included ? "border border-white/10 bg-white/5 text-white/65 hover:border-red-400/25 hover:bg-red-400/8 hover:text-red-200" : "bg-[#22c527] text-black shadow-[0_5px_18px_rgba(34,197,39,0.12)] hover:bg-[#35d93a]"}`}
                    >
                      {isBusy ? (
                        <i className="ri-loader-4-line animate-spin" />
                      ) : included ? (
                        <>
                          <i className="ri-check-line" /> Tersimpan
                        </>
                      ) : (
                        <>
                          <i className="ri-add-line" /> Tambahkan
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-4 border-t border-white/7 pt-4">
            {!showCreate ? (
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 text-xs font-bold text-white/60 transition hover:border-[#22c527]/45 hover:bg-[#22c527]/5 hover:text-[#62df68]"
              >
                <i className="ri-add-circle-line text-base" /> Buat playlist
                baru
              </button>
            ) : (
              <form
                onSubmit={handleCreate}
                className="space-y-3 rounded-2xl border border-[#22c527]/15 bg-[#22c527]/[0.045] p-3.5 sm:p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-black text-white">
                      Playlist baru
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/35">
                      Lagu ini akan langsung ditambahkan.
                    </p>
                  </div>
                  {playlists.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowCreate(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/8 hover:text-white"
                      aria-label="Tutup form playlist"
                    >
                      <i className="ri-close-line" />
                    </button>
                  )}
                </div>
                <input
                  autoFocus
                  required
                  maxLength={60}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama playlist"
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3.5 text-xs text-white outline-none placeholder:text-white/25 focus:border-[#22c527]/55 focus:ring-2 focus:ring-[#22c527]/10"
                />
                <input
                  maxLength={240}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Deskripsi (opsional)"
                  className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3.5 text-xs text-white outline-none placeholder:text-white/25 focus:border-[#22c527]/55 focus:ring-2 focus:ring-[#22c527]/10"
                />
                <button
                  type="submit"
                  disabled={busy || !name.trim()}
                  className="flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#22c527] px-3 text-xs font-black text-black transition hover:bg-[#35d93a] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {busy ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <i className="ri-check-line" /> Buat & tambahkan lagu
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/7 px-4 py-3 text-center sm:px-5">
          <p className="text-[9px] text-white/25">
            Kamu bisa menyimpan lagu ini ke lebih dari satu playlist.
          </p>
        </div>
      </section>
    </div>
  );
}
