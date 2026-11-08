import React from "react";
import { motion } from "framer-motion";

interface TabSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sortBy: "default" | "title" | "artist";
  setSortBy: (sort: "default" | "title" | "artist") => void;
  favoritesCount?: number;
}

export const CATEGORIES = [
  { id: "All Songs", label: "Semua Lagu", icon: "ri-music-fill" },
  { id: "Favorites", label: "Favorit", icon: "ri-heart-3-fill" },
  { id: "Indie / Acoustic", label: "Indie / Acoustic", icon: "ri-headphone-fill" },
  { id: "Pop", label: "Pop Hits", icon: "ri-fire-fill" },
  { id: "R&B / Soul", label: "R&B / Soul", icon: "ri-sparkling-fill" },
  { id: "Lo-Fi / Ambient", label: "Lo-Fi / Chill", icon: "ri-moon-clear-fill" },
  { id: "Indonesian Hits", label: "Indo Pop", icon: "ri-flag-fill" },
];

export default function TabSection({
  activeTab,
  setActiveTab,
  sortBy,
  setSortBy,
  favoritesCount = 0,
}: TabSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      {/* CATEGORY PILLS WITH MAGNETIC SLIDING PILL ANIMATION */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto py-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer select-none"
            >
              {/* MAGNETIC SLIDING PILL BACKGROUND */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-[#22c527] rounded-full shadow-[0_0_20px_rgba(34,197,39,0.4)]"
                />
              )}

              {/* NON-ACTIVE GLASS BACKGROUND */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/4 hover:bg-white/8 border border-white/5 rounded-full transition-colors" />
              )}

              {/* BUTTON CONTENT */}
              <span
                className={`relative z-10 flex items-center gap-1.5 font-bold transition-colors ${
                  isActive ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                <i className={`${cat.icon} text-xs`}></i>
                <span>{cat.label}</span>
                {cat.id === "Favorites" && favoritesCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ml-0.5 ${
                      isActive
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-[#22c527]"
                    }`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* CUSTOM GLASS SORT DROPDOWN */}
      <div className="relative flex items-center gap-2 self-end sm:self-auto text-xs text-white/60 bg-white/5 hover:bg-white/8 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition shadow-sm shrink-0">
        <i className="ri-sort-desc text-[#22c527]"></i>
        <span className="text-white/40">Urutkan:</span>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "default" | "title" | "artist")
          }
          className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-1"
        >
          <option value="default" className="bg-[#18181b] text-white">
            Default
          </option>
          <option value="title" className="bg-[#18181b] text-white">
            Judul (A-Z)
          </option>
          <option value="artist" className="bg-[#18181b] text-white">
            Artis (A-Z)
          </option>
        </select>
      </div>
    </div>
  );
}
