import React from "react";
import { motion } from "framer-motion";

interface TabSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sortBy: "default" | "title" | "artist";
  setSortBy: (sort: "default" | "title" | "artist") => void;
  favoritesCount?: number;
  playlistCount?: number;
  onClearPlaylist?: () => void;
  onPlayAll?: () => void;
}

export const CATEGORIES = [
  { id: "All Songs", label: "Semua Lagu", icon: "ri-music-fill" },
  { id: "Favorites", label: "Favorit", icon: "ri-heart-3-fill" },
  { id: "My Playlist", label: "Playlist Saya", icon: "ri-play-list-2-fill" },
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
  playlistCount = 0,
  onClearPlaylist,
  onPlayAll,
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
              aria-pressed={isActive}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
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
                {cat.id === "My Playlist" && playlistCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ml-0.5 ${
                      isActive
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-[#22c527]"
                    }`}
                  >
                    {playlistCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        {activeTab === "My Playlist" && playlistCount > 0 && onClearPlaylist && (
          <>
          {onPlayAll && (
            <button
              type="button"
              onClick={onPlayAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c527] text-black text-xs font-bold hover:bg-[#1fbe24] transition"
              title="Putar semua lagu di playlist"
            >
              <i className="ri-play-fill"></i>
              <span className="hidden sm:inline">Putar Semua</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClearPlaylist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-400/20 bg-red-400/5 text-xs font-semibold text-red-200 hover:bg-red-400/15 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
            title="Hapus semua lagu dari playlist"
          >
            <i className="ri-delete-bin-line"></i>
            <span className="hidden sm:inline">Kosongkan</span>
          </button>
          </>
        )}
        {/* CUSTOM GLASS SORT DROPDOWN */}
        <div className="relative flex items-center gap-2 text-xs text-white/60 bg-white/5 hover:bg-white/8 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition shadow-sm">
          <i className="ri-sort-desc text-[#22c527]"></i>
          <span className="text-white/40">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "default" | "title" | "artist")
            }
            aria-label="Urutkan lagu"
            className="bg-transparent text-white font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] rounded cursor-pointer pr-1"
          >
            <option value="default" className="bg-[#18181b] text-white">Default</option>
            <option value="title" className="bg-[#18181b] text-white">Judul (A-Z)</option>
            <option value="artist" className="bg-[#18181b] text-white">Artis (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
