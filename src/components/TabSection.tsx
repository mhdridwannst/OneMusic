import React from "react";

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
      {/* CATEGORY PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto py-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#22c527] text-black shadow-[0_0_15px_rgba(34,197,39,0.35)] scale-105"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
              }`}
            >
              <i className={`${cat.icon} text-xs`}></i>
              <span>{cat.label}</span>
              {cat.id === "Favorites" && favoritesCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                    isActive ? "bg-black/20 text-black" : "bg-white/10 text-[#22c527]"
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SORT CONTROLS */}
      <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 shrink-0">
        <i className="ri-sort-desc text-white/60"></i>
        <span>Urutkan:</span>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "default" | "title" | "artist")
          }
          className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
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
