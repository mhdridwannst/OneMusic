import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultSongs } from "@/data/defaultSongs";
import { resolveAudioSrc } from "@/lib/audio";

const normalizeAssetPath = (assetPath: string): string => {
  const trimmed = assetPath.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export async function GET() {
  const json = (songs: typeof defaultSongs) =>
    NextResponse.json(songs, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    if (!supabase) {
      return json(defaultSongs);
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("id", { ascending: true })
      .abortSignal(controller.signal);

    if (error || !data || data.length === 0) {
      return json(defaultSongs);
    }

    if (data.length > 0) {
      // Normalisasi path dan sematkan genre dari curated defaultSongs
      const enrichedSongs = data.map((song) => {
        // Ekstrak nama file misal 'music/laufey.mp3' -> 'laufey'
        const filename = (song.src || "")
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "")
          .toLowerCase();

        const matched = defaultSongs.find(
          (d) =>
            (filename && d.src.toLowerCase().includes(filename)) ||
            d.title.toLowerCase() === (song.title || "").toLowerCase()
        );

        return {
          id: song.id,
          title: song.title || matched?.title || "Unknown Title",
          artist: song.artist || matched?.artist || "Unknown Artist",
          genre: song.genre || matched?.genre || "Pop",
          cover: song.cover
            ? normalizeAssetPath(song.cover)
            : matched?.cover || "/images/laufey.jpg",
          // Keep complete Storage URLs intact; only local/object paths need resolving.
          src: song.src
            ? resolveAudioSrc(normalizeAssetPath(song.src))
            : matched?.src || "",
          lrc: song.lrc
            ? normalizeAssetPath(song.lrc)
            : matched?.lrc || "",
        };
      });

      // Gabungkan lagu-lagu baru dari defaultSongs yang belum tercatat di Supabase
      const existingTitles = new Set(enrichedSongs.map((s) => s.title.toLowerCase()));
      const existingSrcs = new Set(enrichedSongs.map((s) => s.src.toLowerCase()));

      const extraSongs = defaultSongs.filter(
        (d) =>
          !existingTitles.has(d.title.toLowerCase()) &&
          !existingSrcs.has(d.src.toLowerCase())
      );

      const allSongs = [...enrichedSongs, ...extraSongs];

      return json(allSongs);
    }

    return json(defaultSongs);
  } catch (error) {
    console.warn("Supabase unreachable, using local fallback songs:", error);
    return json(defaultSongs);
  } finally {
    clearTimeout(timeoutId);
  }
}
