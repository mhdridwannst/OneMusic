import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultSongs } from "@/data/defaultSongs";
import { resolveAudioSrc } from "@/lib/audio";

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
          cover: song.cover ? (song.cover.startsWith("/") ? song.cover : `/${song.cover}`) : matched?.cover || "/images/laufey.jpg",
          src: song.src
            ? resolveAudioSrc(song.src.startsWith("/") ? song.src : `/${song.src}`)
            : matched?.src || "",
          lrc: song.lrc ? (song.lrc.startsWith("/") ? song.lrc : `/${song.lrc}`) : matched?.lrc || "",
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
