"use client";

import React from "react";
import { Song } from "@/types";
import { triggerHaptic } from "@/lib/haptics";

export interface MoodVibe {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  badge: string;
  accentColor: string;
  gradientBg: string;
  borderGlow: string;
  songIds: number[];
}

export const MOOD_VIBES: MoodVibe[] = [
  {
    id: "sleep",
    name: "Teman Tidur",
    subtitle: "Musik sunyi, ambient sejenis Snowfall & dreamy lo-fi untuk tidur lelap",
    icon: "ri-moon-clear-fill",
    badge: "Night & Ambient",
    accentColor: "#818cf8", // indigo-400
    gradientBg: "from-indigo-950/70 via-[#0d0f1d] to-slate-950",
    borderGlow: "border-indigo-500/20 hover:border-indigo-400/50 shadow-indigo-500/10",
    // 56: Snowfall, 135: Apathy, 136: Can We Kiss Forever, 130: Past Lives, 4: Apocalypse, 132: Say Yes To Heaven, 138: Glimpse of Us, 137: Anchor, 128: Love Nwantiti, 127: Play Date, 134: Channa Mereya Slowed, 124: LIMBO, 123: Here With Me, 64: No Surprises, 65: The Night We Met
    songIds: [56, 135, 136, 130, 4, 132, 138, 137, 128, 127, 134, 124, 123, 64, 65],
  },
  {
    id: "study",
    name: "Fokus Belajar",
    subtitle: "Lo-Fi beats, piano tenang & tempo stabil pembantu konsentrasi tinggi",
    icon: "ri-book-read-fill",
    badge: "Deep Focus",
    accentColor: "#34d399", // emerald-400
    gradientBg: "from-emerald-950/70 via-[#0a1813] to-slate-950",
    borderGlow: "border-emerald-500/20 hover:border-emerald-400/50 shadow-emerald-500/10",
    // 56: Snowfall, 131: Blue, 126: Magnolia, 122: Glue Song, 58: Sofia, 118: Until I Found You, 24: Monokrom, 116: Bunga Abadi, 139: Sparks, 140: Jocelyn Flores
    songIds: [56, 131, 126, 122, 58, 118, 24, 116, 139, 140],
  },
  {
    id: "chill",
    name: "Santai & Ngopi",
    subtitle: "Petikan gitar akustik hangat & indie pop syahdu teman sore santai",
    icon: "ri-cup-fill",
    badge: "Coffee & Sunset",
    accentColor: "#fbbf24", // amber-400
    gradientBg: "from-amber-950/70 via-[#1c1408] to-slate-950",
    borderGlow: "border-amber-500/20 hover:border-amber-400/50 shadow-amber-500/10",
    // 2: Akad, 1: About You, 120: Bunga Maaf, 67: Those Eyes, 66: Know Me Too Well, 68: Kita Lewati Berdua, 69: P.S. I Love You, 114: Bergema Sampai Selamanya, 119: Pasilyo, 129: Shinunoga E-Wa
    songIds: [2, 1, 120, 67, 66, 68, 69, 114, 119, 129],
  },
  {
    id: "workout",
    name: "Olahraga & Workout",
    subtitle: "Beat cepat & bass bertenaga pemompa energi saat gym, lari atau bekerja",
    icon: "ri-flashlight-fill",
    badge: "Hype Energy",
    accentColor: "#f43f5e", // rose-500
    gradientBg: "from-rose-950/70 via-[#1c080e] to-slate-950",
    borderGlow: "border-rose-500/20 hover:border-rose-400/50 shadow-rose-500/10",
    // 110: APT, 125: Blinding Lights, 102: Starboy, 95: Dynamite, 98: Seven, 112: STAY, 99: Beauty and a Beat, 96: What is Love, 94: Magnetic, 97: Dat Stick, 111: Garam & Madu
    songIds: [110, 125, 102, 95, 98, 112, 99, 96, 94, 97, 111],
  },
  {
    id: "galau",
    name: "Galau & Melow",
    subtitle: "Melodi emosional, vokal mendalam & lirik menyentuh di kala malam",
    icon: "ri-heart-broken-fill",
    badge: "Late Night Sad",
    accentColor: "#c084fc", // purple-400
    gradientBg: "from-purple-950/70 via-[#170921] to-slate-950",
    borderGlow: "border-purple-500/20 hover:border-purple-400/50 shadow-purple-500/10",
    // 63: Sign of the Times, 61: A Thousand Years, 121: Dusk Till Dawn, 62: Cheating on You, 60: We Don't Talk Anymore, 70: Somewhere Only We Know, 87: End of Beginning, 73: lowkey
    songIds: [63, 61, 121, 62, 60, 70, 87, 73],
  },
];

interface MoodHubProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayMood: (mood: MoodVibe, shuffle?: boolean) => void;
  activeMoodId: string | null;
  onSelectMoodFilter: (moodId: string | null) => void;
}

export default function MoodHub({
  songs,
  currentSong,
  isPlaying,
  onPlayMood,
  activeMoodId,
  onSelectMoodFilter,
}: MoodHubProps) {
  return (
    <section aria-labelledby="mood-hub-heading" className="mb-10 sm:mb-12">
      {/* SECTION HEADER */}
      <div className="mb-4 flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#22c527]/20 bg-[#22c527]/10 text-[#22c527] shadow-inner shadow-white/[0.02]">
              <i className="ri-compass-3-fill text-base" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="mood-hub-heading"
                className="text-sm font-black tracking-tight text-white sm:text-base md:text-lg flex items-center gap-2"
              >
                Pilih Suasana & Aktivitasmu
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#22c527]/10 text-[9px] font-bold text-[#22c527] border border-[#22c527]/20">
                  VIBES
                </span>
              </h2>
            </div>
          </div>
          <p className="mt-1 pl-[42px] text-[10px] font-medium text-white/40 sm:text-[11px]">
            Musik siap putar sesuai suasana hatimu — belajar, tidur lelap, santai, atau olahraga
          </p>
        </div>

        {activeMoodId && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic("light");
              onSelectMoodFilter(null);
            }}
            className="text-[11px] font-bold text-[#22c527] hover:underline cursor-pointer"
          >
            Reset Suasana
          </button>
        )}
      </div>

      {/* HORIZONTAL CARDS VIBES HUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {MOOD_VIBES.map((vibe) => {
          const isSelected = activeMoodId === vibe.id;
          const vibeSongs = vibe.songIds
            .map((id) => songs.find((s) => s.id === id))
            .filter((s): s is Song => Boolean(s));

          const isThisVibePlaying =
            isPlaying && currentSong && vibe.songIds.includes(currentSong.id);

          return (
            <div
              key={vibe.id}
              onClick={() => {
                triggerHaptic("selection");
                onSelectMoodFilter(isSelected ? null : vibe.id);
              }}
              className={`group relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden select-none bg-linear-to-br ${
                vibe.gradientBg
              } ${vibe.borderGlow} ${
                isSelected
                  ? "ring-2 ring-[#22c527] shadow-xl"
                  : "hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-md border border-white/10"
                  style={{
                    backgroundColor: `${vibe.accentColor}18`,
                    color: vibe.accentColor,
                  }}
                >
                  <i className={vibe.icon}></i>
                </div>

                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-black/40"
                  style={{ color: vibe.accentColor }}
                >
                  {vibe.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="min-w-0 mb-4">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#22c527] transition-colors truncate">
                    {vibe.name}
                  </h3>
                  {isThisVibePlaying && (
                    <span className="w-2 h-2 rounded-full bg-[#22c527] animate-ping shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-white/50 line-clamp-2 mt-1 leading-snug">
                  {vibe.subtitle}
                </p>
              </div>

              {/* Bottom Action: Song Count & One-Click Play */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-white/40">
                  {vibeSongs.length} lagu
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic("heavy");
                    onPlayMood(vibe, true);
                  }}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                    isThisVibePlaying
                      ? "bg-[#22c527] text-black shadow-[#22c527]/30 scale-105"
                      : "bg-white/10 hover:bg-[#22c527] text-white hover:text-black border border-white/10 hover:border-transparent active:scale-95"
                  }`}
                  title={`Putar semua lagu suasana ${vibe.name}`}
                >
                  <i
                    className={`${
                      isThisVibePlaying ? "ri-pause-fill" : "ri-play-fill"
                    } text-sm`}
                  ></i>
                  <span>{isThisVibePlaying ? "Memutar" : "Putar"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
