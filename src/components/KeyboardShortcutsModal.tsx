import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: "Space", desc: "Play / Pause lagu" },
  { key: "← / →", desc: "Lagu sebelumnya / Lagu berikutnya" },
  { key: "J / L", desc: "Mundur 5 detik / Maju 5 detik" },
  { key: "↑ / ↓", desc: "Naikkan / Turunkan volume" },
  { key: "M", desc: "Mute / Unmute audio" },
  { key: "?", desc: "Buka / Tutup panduan shortcut ini" },
];

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#121216] border border-white/15 rounded-3xl p-6 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#22c527]/20 border border-[#22c527]/40 flex items-center justify-center text-[#22c527]">
                  <i className="ri-keyboard-line text-lg"></i>
                </div>
                <div>
                  <h3 className="font-bold text-base">Keyboard Shortcuts</h3>
                  <p className="text-xs text-white/50">Kontrol musik lebih cepat via keyboard</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/6 transition"
                >
                  <span className="text-sm text-white/80">{s.desc}</span>
                  <kbd className="px-2.5 py-1 text-xs font-mono font-semibold bg-white/10 text-[#22c527] border border-white/15 rounded-lg shadow-inner">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-center text-xs text-white/40">
              Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">Esc</kbd> untuk menutup
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
