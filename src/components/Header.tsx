import React, { useState, useEffect } from "react";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalSongsCount?: number;
}

export default function Header({
  searchTerm,
  setSearchTerm,
  totalSongsCount = 0,
}: HeaderProps) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 4) return "Good Night";
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        setIsShortcutOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsShortcutOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="flex-none p-4 md:p-6 md:pt-8 z-30 sticky top-0 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          {/* LOGO & GREETING */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#22c527] to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,39,0.35)] shrink-0">
              <i className="ri-disc-fill text-2xl text-black animate-spin-slow"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center">
                  One<span className="text-[#22c527]">Music</span>
                </h1>
                {totalSongsCount > 0 && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-white/60 tracking-wider">
                    {totalSongsCount} SONGS
                  </span>
                )}
              </div>
              <p className="text-white/40 text-[11px] font-medium hidden sm:block">
                {getGreeting()} • Enjoy your favorite music
              </p>
            </div>
          </div>

          {/* SEARCH BAR (INTERACTIVE & CLEARABLE) */}
          <div className="flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
              <i className="ri-search-2-line text-white/40 text-base group-focus-within:text-[#22c527] transition-colors"></i>
            </div>

            <input
              type="text"
              placeholder="Cari lagu, musisi, atau genre..."
              aria-label="Cari lagu, musisi, atau genre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/6 hover:bg-white/9 focus:bg-white/12 border border-white/10 focus:border-[#22c527]/50 rounded-2xl py-2.5 pl-10 pr-10 text-xs md:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#22c527]/20 transition-all shadow-inner"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Hapus pencarian"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] rounded-full"
                title="Hapus pencarian"
              >
                <i className="ri-close-circle-fill text-base"></i>
              </button>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Keyboard Shortcuts Trigger Button */}
            <button
              onClick={() => setIsShortcutOpen(true)}
              aria-label="Buka pintasan keyboard"
              className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              title="Keyboard Shortcuts (tekan '?')"
            >
              <i className="ri-keyboard-line text-base md:text-lg"></i>
            </button>

            {/* Profile Avatar Badge */}
            <a
              href="https://github.com/wannn-sion95/OneMusic.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka repository OneMusic di GitHub"
              className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-linear-to-tr from-[#22c527] to-cyan-500 p-0.5 cursor-pointer hover:scale-105 active:scale-95 transition shadow-lg shadow-[#22c527]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c527] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              title="GitHub Repository"
            >
              <div className="w-full h-full rounded-[14px] bg-[#09090b] flex items-center justify-center overflow-hidden">
                <i className="ri-github-fill text-lg text-white"></i>
              </div>
            </a>
          </div>
        </div>
      </div>

      <KeyboardShortcutsModal
        isOpen={isShortcutOpen}
        onClose={() => setIsShortcutOpen(false)}
      />
    </>
  );
}
