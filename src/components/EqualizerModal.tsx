"use client";

import React, { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";

export type EqPresetId =
  | "normal"
  | "bass_boost"
  | "vocal"
  | "acoustic"
  | "treble"
  | "lofi";

export interface EqPreset {
  id: EqPresetId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  bars: number[]; // 8 bands: [60Hz, 150Hz, 400Hz, 1kHz, 2.5kHz, 6kHz, 10kHz, 15kHz] (-12 to +12 dB)
}

export const EQ_PRESETS: EqPreset[] = [
  {
    id: "normal",
    name: "Normal (Flat)",
    tagline: "Karakter asli rekaman musisi yang seimbang & netral",
    icon: "ri-sound-module-line",
    color: "from-zinc-500 to-zinc-400",
    bars: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "bass_boost",
    name: "Super Bass Boost",
    tagline: "Dentuman bass & kick drum lebih tebal, bertenaga & berbobot",
    icon: "ri-speaker-3-fill",
    color: "from-emerald-500 to-[#22c527]",
    bars: [8, 7, 4, 1, 0, 0, 1, 2],
  },
  {
    id: "vocal",
    name: "Vocal Clarity",
    tagline: "Vokal musisi terdengar jernih, tajam, dan berada di depan",
    icon: "ri-mic-fill",
    color: "from-blue-500 to-cyan-400",
    bars: [-1, 0, 2, 6, 7, 4, 1, 0],
  },
  {
    id: "acoustic",
    name: "Acoustic Warm",
    tagline: "Nuansa hangat petikan gitar, piano, dan instrumen organik",
    icon: "ri-music-fill",
    color: "from-amber-500 to-orange-400",
    bars: [3, 4, 3, 2, 3, 2, 1, 0],
  },
  {
    id: "treble",
    name: "Treble Sparkle",
    tagline: "Detail nada tinggi, perkusi, dan cymbal lebih renyah & terbuka",
    icon: "ri-sparkling-fill",
    color: "from-violet-500 to-fuchsia-400",
    bars: [-2, -1, 0, 1, 3, 6, 8, 8],
  },
  {
    id: "lofi",
    name: "Lo-Fi Chill",
    tagline: "Suasana santai vintage dengan treble lembut dan nada low empuk",
    icon: "ri-cup-fill",
    color: "from-rose-500 to-pink-400",
    bars: [5, 4, 2, 0, -1, -3, -5, -6],
  },
];

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying?: boolean;
}

export default function EqualizerModal({
  isOpen,
  onClose,
  isPlaying = false,
}: EqualizerModalProps) {
  const [activePresetId, setActivePresetId] = useState<EqPresetId>("normal");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("onemusic_eq_preset") as EqPresetId | null;
      if (saved && EQ_PRESETS.some((p) => p.id === saved)) {
        setActivePresetId(saved);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSelectPreset = (id: EqPresetId) => {
    triggerHaptic("medium");
    setActivePresetId(id);
    try {
      localStorage.setItem("onemusic_eq_preset", id);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  const currentPreset =
    EQ_PRESETS.find((p) => p.id === activePresetId) || EQ_PRESETS[0];

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#121216] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-white flex flex-col gap-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-linear-to-br ${currentPreset.color} opacity-20 blur-3xl pointer-events-none transition-all duration-700`}
        ></div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#22c527]">
              <i className="ri-equalizer-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Audio Equalizer
              </h3>
              <p className="text-[11px] text-white/50">
                Sesuaikan profil suara sesuai selera telingamu
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic("light");
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer"
            aria-label="Tutup Equalizer"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Interactive Dynamic Frequency Visualizer */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider">
            <span>Spectrum Profile</span>
            <span className="text-[#22c527] flex items-center gap-1">
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c527] animate-ping"></span>
              )}
              {currentPreset.name}
            </span>
          </div>

          {/* 8 EQ BANDS */}
          <div className="h-24 flex items-end justify-between gap-1.5 pt-2 px-1">
            {currentPreset.bars.map((db, idx) => {
              // Convert dB (-12 to +12) to percentage height (15% to 95%)
              const baseHeight = Math.max(15, Math.min(95, 50 + (db / 12) * 45));
              const labels = [
                "60",
                "150",
                "400",
                "1k",
                "2.5k",
                "6k",
                "10k",
                "15k",
              ];
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
                  <div className="w-full bg-white/5 rounded-full h-full flex flex-col justify-end p-0.5 relative overflow-hidden">
                    <div
                      className={`w-full rounded-full bg-linear-to-t ${currentPreset.color} transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : ""
                      }`}
                      style={{
                        height: `${baseHeight}%`,
                        opacity: 0.85,
                      }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-mono text-white/35">
                    {labels[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preset Selection List */}
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
          {EQ_PRESETS.map((preset) => {
            const isSelected = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-white/10 border-[#22c527]/50 shadow-[0_0_15px_rgba(34,197,39,0.15)]"
                    : "bg-white/2 hover:bg-white/6 border-white/5 text-white/70"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition ${
                    isSelected
                      ? "bg-[#22c527] text-black border-transparent shadow-md"
                      : "bg-white/5 text-white/60 border-white/10"
                  }`}
                >
                  <i className={`${preset.icon} text-base`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-white" : "text-white/80"
                      }`}
                    >
                      {preset.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#22c527] shadow-[0_0_8px_#22c527]"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 truncate mt-0.5">
                    {preset.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-white/40">
          <span>Preset tersimpan otomatis</span>
          <button
            onClick={() => {
              triggerHaptic("light");
              onClose();
            }}
            className="px-4 py-1.5 rounded-full bg-[#22c527] text-black font-bold text-xs hover:bg-[#1fbe24] transition cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
