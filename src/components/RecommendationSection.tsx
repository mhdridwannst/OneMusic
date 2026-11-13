import { Song } from "@/types";
import Image from "next/image";

interface RecommendationSectionProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}

export default function RecommendationSection({
  songs,
  currentSong,
  isPlaying,
  onPlay,
}: RecommendationSectionProps) {
  if (songs.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-6 h-6 rounded-lg bg-[#22c527]/10 flex items-center justify-center text-[#22c527]">
          <i className="ri-sparkling-2-line text-sm"></i>
        </div>
        <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
          Mungkin Kamu Suka
        </h3>
        <span className="text-[11px] text-white/40">
          Berdasarkan selera musikmu
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {songs.map((song) => {
          const isCurrent = currentSong?.id === song.id;
          return (
            <button
              type="button"
              key={song.id}
              onClick={() => onPlay(song)}
              className={`group text-left rounded-2xl border p-2 transition-all hover:-translate-y-1 ${
                isCurrent
                  ? "border-[#22c527]/40 bg-[#22c527]/10"
                  : "border-white/5 bg-white/3 hover:border-white/15 hover:bg-white/7"
              }`}
              aria-label={`Putar rekomendasi ${song.title} oleh ${song.artist}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#151518]">
                <Image
                  src={song.cover}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 45vw, 180px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#22c527] text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <i
                    className={
                      isCurrent && isPlaying
                        ? "ri-pause-fill"
                        : "ri-play-fill"
                    }
                  ></i>
                </span>
              </div>
              <strong className="mt-2 block truncate text-xs font-bold text-white group-hover:text-[#22c527]">
                {song.title}
              </strong>
              <span className="block truncate text-[11px] text-white/50">
                {song.artist}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
