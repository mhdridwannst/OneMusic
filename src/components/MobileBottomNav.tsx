"use client";

import React from "react";
import { triggerHaptic } from "@/lib/haptics";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearchClick: () => void;
  onAccountClick: () => void;
  favoritesCount: number;
  playlistCount: number;
  userEmail: string | null;
}

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  onSearchClick,
  onAccountClick,
  favoritesCount,
  playlistCount,
  userEmail,
}: MobileBottomNavProps) {
  const isHomeActive = activeTab === "All Songs";
  const isPlaylistActive = activeTab === "My Playlist";
  const isFavoritesActive = activeTab === "Favorites";

  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#09090b]/92 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 transition-all shadow-[0_-10px_25px_rgba(0,0,0,0.5)] select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* BERANDA */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            onTabChange("All Songs");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            isHomeActive
              ? "text-[#22c527]"
              : "text-white/45 hover:text-white/80 active:scale-95"
          }`}
        >
          <div className="relative">
            <i
              className={`text-xl ${
                isHomeActive ? "ri-home-5-fill" : "ri-home-5-line"
              }`}
            ></i>
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#22c527] shadow-[0_0_6px_#22c527]"></span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            Beranda
          </span>
        </button>

        {/* CARI */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            onSearchClick();
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white/45 hover:text-white/80 active:scale-95 transition-all"
        >
          <div className="relative">
            <i className="ri-search-2-line text-xl"></i>
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            Cari
          </span>
        </button>

        {/* KOLEKSI PLAYLIST */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            onTabChange("My Playlist");
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            isPlaylistActive
              ? "text-[#22c527]"
              : "text-white/45 hover:text-white/80 active:scale-95"
          }`}
        >
          <div className="relative">
            <i
              className={`text-xl ${
                isPlaylistActive ? "ri-folder-music-fill" : "ri-folder-music-line"
              }`}
            ></i>
            {playlistCount > 0 && !isPlaylistActive && (
              <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 bg-white/20 text-[9px] font-bold rounded-full flex items-center justify-center text-white">
                {playlistCount}
              </span>
            )}
            {isPlaylistActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#22c527] shadow-[0_0_6px_#22c527]"></span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            Koleksi
          </span>
        </button>

        {/* FAVORIT */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            onTabChange("Favorites");
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            isFavoritesActive
              ? "text-[#22c527]"
              : "text-white/45 hover:text-white/80 active:scale-95"
          }`}
        >
          <div className="relative">
            <i
              className={`text-xl ${
                isFavoritesActive ? "ri-heart-3-fill" : "ri-heart-3-line"
              }`}
            ></i>
            {favoritesCount > 0 && !isFavoritesActive && (
              <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 bg-[#22c527]/30 text-[9px] font-bold rounded-full flex items-center justify-center text-[#22c527]">
                {favoritesCount}
              </span>
            )}
            {isFavoritesActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#22c527] shadow-[0_0_6px_#22c527]"></span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            Disukai
          </span>
        </button>

        {/* AKUN */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            onAccountClick();
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white/45 hover:text-white/80 active:scale-95 transition-all"
        >
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <i
                className={`text-xs ${
                  userEmail ? "ri-user-smile-line text-[#22c527]" : "ri-user-3-line"
                }`}
              ></i>
            </div>
            {userEmail && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22c527] border-2 border-[#09090b]"></span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            {userEmail ? "Profil" : "Masuk"}
          </span>
        </button>
      </div>
    </nav>
  );
}
