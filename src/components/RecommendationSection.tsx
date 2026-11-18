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
    <section
      className="mb-10 sm:mb-12"
      aria-labelledby="recommendation-heading"
    >
      {/* SECTION HEADER */}
      <div className="mb-4 flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#22c527]/15 bg-[#22c527]/[0.08] text-[#22c527]">
              <i className="ri-sparkling-2-line text-base" aria-hidden="true" />
            </span>

            <h3
              id="recommendation-heading"
              className="text-sm font-black tracking-tight text-white sm:text-base"
            >
              Pilihan Untukmu
            </h3>

            <span className="hidden rounded-full border border-[#22c527]/15 bg-[#22c527]/[0.06] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#69df70] sm:inline-flex">
              Personal Mix
            </span>
          </div>

          <p className="ml-10 mt-1 text-[10px] font-medium text-white/40 sm:text-[11px]">
            Temukan musik yang mungkin cocok dengan seleramu
          </p>
        </div>

        <span className="mb-0.5 shrink-0 text-[10px] font-semibold tabular-nums text-white/35">
          {songs.length} pilihan
        </span>
      </div>

      {/* RECOMMENDATION GRID */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-5">
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id;
          const isCurrentAndPlaying = isCurrent && isPlaying;
          const genre = song.genre?.split("/")[0]?.trim();

          return (
            <button
              key={`recommendation-${song.id}`}
              type="button"
              onClick={() => onPlay(song)}
              aria-label={`Putar ${song.title} oleh ${song.artist}`}
              aria-current={isCurrent ? "true" : undefined}
              className={`group relative min-w-0 overflow-hidden rounded-[20px] border p-2.5 text-left transition-all duration-300 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] active:scale-[0.98] sm:rounded-[22px] sm:p-3 ${
                isCurrent
                  ? "border-[#22c527]/35 bg-[linear-gradient(145deg,rgba(34,197,39,0.09),rgba(255,255,255,0.025))] shadow-[0_8px_28px_rgba(34,197,39,0.07)]"
                  : "border-white/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.055] hover:shadow-[0_18px_36px_rgba(0,0,0,0.3)]"
              }`}
            >
              {/* ARTWORK */}
              <div className="relative aspect-square overflow-hidden rounded-[15px] bg-[#151518] ring-1 ring-inset ring-white/10 sm:rounded-[17px]">
                <Image
                  src={song.cover}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 190px"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055] motion-reduce:transition-none"
                />

                {/* CINEMATIC OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/15 opacity-80" />

                {/* GENRE LABEL */}
                {genre && (
                  <span className="absolute bottom-2 left-2 max-w-[65%] truncate rounded-full border border-white/15 bg-black/50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md">
                    {genre}
                  </span>
                )}

                {/* CURRENT SONG INDICATOR */}
                {isCurrent && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-[#22c527]/30 bg-black/65 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#75e87b] backdrop-blur-xl">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-[#22c527] ${
                        isCurrentAndPlaying ? "animate-pulse" : ""
                      }`}
                    />
                    {isCurrentAndPlaying ? "Now Playing" : "Selected"}
                  </span>
                )}

                {/* PLAY ACTION */}
                <span className="touch-visible-action absolute bottom-2 right-2 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-[#22c527] text-black opacity-0 shadow-[0_8px_25px_rgba(34,197,39,0.3)] transition-all duration-250 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                  {isCurrentAndPlaying ? (
                    <span className="flex h-4 items-end gap-[3px]">
                      <span className="h-2 w-[3px] animate-music-bar-1 rounded-full bg-black" />
                      <span className="h-4 w-[3px] animate-music-bar-2 rounded-full bg-black" />
                      <span className="h-2.5 w-[3px] animate-music-bar-3 rounded-full bg-black" />
                    </span>
                  ) : (
                    <i
                      className="ri-play-fill ml-0.5 text-xl"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </div>

              {/* SONG INFORMATION */}
              <div className="px-0.5 pb-0.5 pt-3">
                <h4
                  title={song.title}
                  className={`truncate text-[11px] font-black tracking-tight transition-colors sm:text-xs ${
                    isCurrent
                      ? "text-[#65df6c]"
                      : "text-white/90 group-hover:text-[#65df6c]"
                  }`}
                >
                  {song.title}
                </h4>

                <p
                  title={song.artist}
                  className="mt-1 truncate text-[10px] font-medium text-white/45 transition-colors group-hover:text-white/65 sm:text-[11px]"
                >
                  {song.artist}
                </p>

                <span className="sr-only">
                  Rekomendasi nomor {index + 1}
                  {isCurrentAndPlaying ? ", sedang diputar" : ""}
                </span>
              </div>

              {/* ACTIVE ACCENT */}
              {isCurrent && (
                <span className="absolute bottom-0 left-4 right-4 h-px rounded-full bg-[#22c527]/70 shadow-[0_0_10px_rgba(34,197,39,0.35)]" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
