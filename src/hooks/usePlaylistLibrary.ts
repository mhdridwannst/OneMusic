"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "onemusic_playlists_v1";
const LEGACY_STORAGE_KEY = "onemusic_playlist";

type PlaylistRow = {
  id: string;
  user_id?: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  created_at: string;
  updated_at: string;
};

type PlaylistSongRow = {
  id?: string;
  playlist_id: string;
  song_id: number;
  position: number;
};

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string | null;
  songIds: number[];
  createdAt: string;
  updatedAt: string;
}

interface PlaylistInput {
  name: string;
  description?: string;
}

const createLocalId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

function readGuestPlaylists(): Playlist[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const playlists = parsed
          .filter(
            (item) =>
              typeof item === "object" &&
              item !== null &&
              typeof (item as Playlist).id === "string" &&
              typeof (item as Playlist).name === "string" &&
              Array.isArray((item as Playlist).songIds) &&
              (item as Playlist).songIds.every(Number.isInteger),
          )
          .map((item) => {
            const playlist = item as Partial<Playlist>;
            const now = new Date().toISOString();
            return {
              id: playlist.id as string,
              name: (playlist.name as string).trim(),
              description:
                typeof playlist.description === "string"
                  ? playlist.description
                  : "",
              coverUrl:
                typeof playlist.coverUrl === "string"
                  ? playlist.coverUrl
                  : null,
              songIds: (playlist.songIds as number[]).filter(Number.isInteger),
              createdAt:
                typeof playlist.createdAt === "string"
                  ? playlist.createdAt
                  : now,
              updatedAt:
                typeof playlist.updatedAt === "string"
                  ? playlist.updatedAt
                  : now,
            } satisfies Playlist;
          })
          .filter((playlist) => playlist.name.length > 0);

        if (playlists.length > 0) return playlists;
      }
    }
  } catch (error) {
    console.warn("Failed to read guest playlists:", error);
  }

  // Preserve the previous single-playlist collection when upgrading. Persist its
  // generated ID immediately so an interrupted cloud migration remains idempotent.
  try {
    const legacy: unknown = JSON.parse(
      window.localStorage.getItem(LEGACY_STORAGE_KEY) || "[]",
    );
    if (
      Array.isArray(legacy) &&
      legacy.length > 0 &&
      legacy.every((id) => Number.isInteger(id))
    ) {
      const now = new Date().toISOString();
      const migrated: Playlist[] = [
        {
          id: createLocalId(),
          name: "Playlist Saya",
          description: "Koleksi lagu yang disimpan sebelumnya.",
          coverUrl: null,
          songIds: Array.from(new Set(legacy as number[])),
          createdAt: now,
          updatedAt: now,
        },
      ];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (error) {
    console.warn("Failed to migrate legacy playlist:", error);
  }

  return [];
}

function mapCloudPlaylists(
  rows: PlaylistRow[],
  songRows: PlaylistSongRow[],
): Playlist[] {
  const songsByPlaylist = new Map<string, PlaylistSongRow[]>();
  for (const row of songRows) {
    const group = songsByPlaylist.get(row.playlist_id) ?? [];
    group.push(row);
    songsByPlaylist.set(row.playlist_id, group);
  }

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    coverUrl: row.cover_url,
    songIds: (songsByPlaylist.get(row.id) ?? [])
      .sort((a, b) => a.position - b.position)
      .map((song) => Number(song.song_id)),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

async function fetchCloudPlaylists(): Promise<Playlist[]> {
  if (!supabase) return [];

  const { data: playlistData, error: playlistError } = await supabase
    .from("playlists")
    .select("id,name,description,cover_url,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (playlistError) throw playlistError;
  const rows = (playlistData ?? []) as PlaylistRow[];
  if (rows.length === 0) return [];

  const ids = rows.map((row) => row.id);
  const { data: songData, error: songError } = await supabase
    .from("playlist_songs")
    .select("id,playlist_id,song_id,position")
    .in("playlist_id", ids)
    .order("position", { ascending: true });

  if (songError) throw songError;
  return mapCloudPlaylists(rows, (songData ?? []) as PlaylistSongRow[]);
}

export function usePlaylistLibrary(user: User | null, authReady: boolean) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  useEffect(() => {
    if (!authReady) return;

    let active = true;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      setIsCloudSynced(Boolean(user && supabase));

      if (!user || !supabase) {
        const guestPlaylists = readGuestPlaylists();
        if (active) {
          setPlaylists(guestPlaylists);
          setIsLoading(false);
        }
        return;
      }

      try {
        let cloudPlaylists = await fetchCloudPlaylists();
        const guestPlaylists = readGuestPlaylists();
        let importedAny = false;

        // Each local playlist has its own marker. A partial migration can resume
        // safely without duplicating rows, and data is not re-imported to another account.
        for (const guestPlaylist of guestPlaylists) {
          const migrationKey = `onemusic_playlist_imported_${user.id}_${guestPlaylist.id}`;
          if (window.localStorage.getItem(migrationKey) === "1") continue;

          const { data: created, error: createError } = await supabase
            .from("playlists")
            .insert({
              user_id: user.id,
              name: guestPlaylist.name,
              description: guestPlaylist.description,
              cover_url: guestPlaylist.coverUrl,
            })
            .select("id,name,description,cover_url,created_at,updated_at")
            .single();

          if (createError) throw createError;
          const cloudPlaylistId = (created as PlaylistRow).id;

          if (guestPlaylist.songIds.length > 0) {
            const insertRows = guestPlaylist.songIds.map((songId, index) => ({
              playlist_id: cloudPlaylistId,
              song_id: songId,
              position: index,
            }));
            const { error: songsError } = await supabase
              .from("playlist_songs")
              .insert(insertRows);
            if (songsError) {
              // Avoid leaving an empty/partial duplicate behind when retrying.
              const { error: cleanupError } = await supabase
                .from("playlists")
                .delete()
                .eq("id", cloudPlaylistId);
              if (cleanupError) {
                console.warn(
                  "Could not clean up incomplete playlist migration:",
                  cleanupError,
                );
              }
              throw songsError;
            }
          }

          window.localStorage.setItem(migrationKey, "1");
          importedAny = true;
        }

        if (guestPlaylists.length > 0) {
          const remainingGuestPlaylists = guestPlaylists.filter((playlist) => {
            const migrationKey = `onemusic_playlist_imported_${user.id}_${playlist.id}`;
            return window.localStorage.getItem(migrationKey) !== "1";
          });
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(remainingGuestPlaylists),
          );
          if (remainingGuestPlaylists.length === 0) {
            window.localStorage.removeItem(LEGACY_STORAGE_KEY);
          }
        }

        if (importedAny) cloudPlaylists = await fetchCloudPlaylists();
        if (active) setPlaylists(cloudPlaylists);
      } catch (error) {
        console.error("Failed to load cloud playlists:", error);
        if (active) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Playlist cloud gagal dimuat. Periksa konfigurasi Supabase.",
          );
          setPlaylists([]);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, [user, authReady]);

  useEffect(() => {
    if (!authReady || isLoading || user) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
    } catch (error) {
      console.warn("Failed to save guest playlists:", error);
    }
  }, [playlists, user, authReady, isLoading]);

  const createPlaylist = useCallback(
    async ({ name, description = "" }: PlaylistInput) => {
      const normalizedName = name.trim();
      if (!normalizedName) throw new Error("Nama playlist wajib diisi.");
      if (normalizedName.length > 60)
        throw new Error("Nama playlist maksimal 60 karakter.");
      if (description.length > 240)
        throw new Error("Deskripsi maksimal 240 karakter.");

      const now = new Date().toISOString();
      if (user && supabase) {
        const { data, error } = await supabase
          .from("playlists")
          .insert({
            user_id: user.id,
            name: normalizedName,
            description: description.trim(),
          })
          .select("id,name,description,cover_url,created_at,updated_at")
          .single();
        if (error) throw error;
        const row = data as PlaylistRow;
        const playlist: Playlist = {
          id: row.id,
          name: row.name,
          description: row.description ?? "",
          coverUrl: row.cover_url,
          songIds: [],
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
        setPlaylists((current) => [playlist, ...current]);
        return playlist;
      }

      const playlist: Playlist = {
        id: createLocalId(),
        name: normalizedName,
        description: description.trim(),
        coverUrl: null,
        songIds: [],
        createdAt: now,
        updatedAt: now,
      };
      setPlaylists((current) => [playlist, ...current]);
      return playlist;
    },
    [user],
  );

  const renamePlaylist = useCallback(
    async (playlistId: string, input: PlaylistInput) => {
      const name = input.name.trim();
      const description = (input.description ?? "").trim();
      if (!name) throw new Error("Nama playlist wajib diisi.");
      if (name.length > 60)
        throw new Error("Nama playlist maksimal 60 karakter.");
      if (description.length > 240)
        throw new Error("Deskripsi maksimal 240 karakter.");

      if (user && supabase) {
        const { error } = await supabase
          .from("playlists")
          .update({ name, description, updated_at: new Date().toISOString() })
          .eq("id", playlistId);
        if (error) throw error;
      }

      setPlaylists((current) =>
        current.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                name,
                description,
                updatedAt: new Date().toISOString(),
              }
            : playlist,
        ),
      );
    },
    [user],
  );

  const deletePlaylist = useCallback(
    async (playlistId: string) => {
      if (user && supabase) {
        const { error } = await supabase
          .from("playlists")
          .delete()
          .eq("id", playlistId);
        if (error) throw error;
      }
      setPlaylists((current) =>
        current.filter((playlist) => playlist.id !== playlistId),
      );
    },
    [user],
  );

  const addSongToPlaylist = useCallback(
    async (playlistId: string, songId: number) => {
      const target = playlists.find((playlist) => playlist.id === playlistId);
      // A just-created playlist may not have reached the latest render yet.
      // React applies the queued playlist creation and song update in order.
      if (target?.songIds.includes(songId)) return false;

      if (user && supabase) {
        const { error } = await supabase.from("playlist_songs").insert({
          playlist_id: playlistId,
          song_id: songId,
          position: target?.songIds.length ?? 0,
        });
        if (error) throw error;
        const { error: touchError } = await supabase
          .from("playlists")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", playlistId);
        if (touchError)
          console.warn("Could not update playlist timestamp:", touchError);
      }

      setPlaylists((current) =>
        current.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songIds: playlist.songIds.includes(songId)
                  ? playlist.songIds
                  : [...playlist.songIds, songId],
                updatedAt: new Date().toISOString(),
              }
            : playlist,
        ),
      );
      return true;
    },
    [playlists, user],
  );

  const removeSongFromPlaylist = useCallback(
    async (playlistId: string, songId: number) => {
      const target = playlists.find((playlist) => playlist.id === playlistId);

      if (!target || !target.songIds.includes(songId)) return;

      const remainingSongIds = target.songIds.filter((id) => id !== songId);

      if (user && supabase) {
        // Simpan referensi client yang sudah dipastikan tidak null.
        const client = supabase;

        const { error } = await client
          .from("playlist_songs")
          .delete()
          .eq("playlist_id", playlistId)
          .eq("song_id", songId);

        if (error) throw error;

        const results = await Promise.all(
          remainingSongIds.map((id, position) =>
            client
              .from("playlist_songs")
              .update({ position })
              .eq("playlist_id", playlistId)
              .eq("song_id", id),
          ),
        );

        const failed = results.find((result) => result.error);

        if (failed?.error) throw failed.error;

        const { error: touchError } = await client
          .from("playlists")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", playlistId);

        if (touchError) {
          console.warn("Could not update playlist timestamp:", touchError);
        }
      }

      setPlaylists((current) =>
        current.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songIds: remainingSongIds,
                updatedAt: new Date().toISOString(),
              }
            : playlist,
        ),
      );
    },
    [playlists, user],
  );

  const moveSong = useCallback(
    async (playlistId: string, songId: number, direction: -1 | 1) => {
      const target = playlists.find((playlist) => playlist.id === playlistId);

      if (!target) return;

      const index = target.songIds.indexOf(songId);
      const nextIndex = index + direction;

      if (index < 0 || nextIndex < 0 || nextIndex >= target.songIds.length) {
        return;
      }

      const reordered = [...target.songIds];

      [reordered[index], reordered[nextIndex]] = [
        reordered[nextIndex],
        reordered[index],
      ];

      if (user && supabase) {
        // Supabase client sudah dipastikan tersedia.
        const client = supabase;

        const results = await Promise.all(
          reordered.map((id, position) =>
            client
              .from("playlist_songs")
              .update({ position })
              .eq("playlist_id", playlistId)
              .eq("song_id", id),
          ),
        );

        const failed = results.find((result) => result.error);

        if (failed?.error) throw failed.error;

        const { error: touchError } = await client
          .from("playlists")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", playlistId);

        if (touchError) {
          console.warn("Could not update playlist timestamp:", touchError);
        }
      }

      setPlaylists((current) =>
        current.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songIds: reordered,
                updatedAt: new Date().toISOString(),
              }
            : playlist,
        ),
      );
    },
    [playlists, user],
  );

  return {
    playlists,
    isLoading,
    loadError,
    isCloudSynced,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    moveSong,
  };
}
