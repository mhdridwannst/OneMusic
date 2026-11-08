import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultSongs } from "@/data/defaultSongs";

export async function GET() {
  try {
    // Beri batas waktu 3 detik untuk koneksi Supabase
    const fetchSupabase = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("id", { ascending: true });

      if (error || !data || data.length === 0) {
        return null;
      }
      return data;
    };

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 3000)
    );

    const result = await Promise.race([fetchSupabase(), timeoutPromise]);

    if (result && result.length > 0) {
      // Normalisasi path dan sematkan genre dari curated defaultSongs
      const enrichedSongs = result.map((song) => {
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
          src: song.src ? (song.src.startsWith("/") ? song.src : `/${song.src}`) : matched?.src || "",
          lrc: song.lrc ? (song.lrc.startsWith("/") ? song.lrc : `/${song.lrc}`) : matched?.lrc || "",
        };
      });

      return NextResponse.json(enrichedSongs, { status: 200 });
    }

    // Fallback otomatis ke default curated songs
    return NextResponse.json(defaultSongs, { status: 200 });
  } catch (error) {
    console.warn("Supabase unreachable, using local fallback songs:", error);
    return NextResponse.json(defaultSongs, { status: 200 });
  }
}
