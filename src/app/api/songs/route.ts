import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultSongs } from "@/data/defaultSongs";

export async function GET() {
  try {
    // Beri batas waktu 2.5 detik untuk koneksi Supabase agar web app tidak stuck loading lama jika Supabase down/paused
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
      setTimeout(() => resolve(null), 2500)
    );

    const result = await Promise.race([fetchSupabase(), timeoutPromise]);

    if (result && result.length > 0) {
      return NextResponse.json(result, { status: 200 });
    }

    // Fallback otomatis ke default curated songs (70 lagu dengan cover, lrc, genre lengkap)
    return NextResponse.json(defaultSongs, { status: 200 });
  } catch (error) {
    console.warn("Supabase unreachable, using local fallback songs:", error);
    return NextResponse.json(defaultSongs, { status: 200 });
  }
}
