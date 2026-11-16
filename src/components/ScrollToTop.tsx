import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 sm:right-8 z-30 w-11 h-11 rounded-full bg-[#18181b]/90 hover:bg-[#22c527] text-white hover:text-black border border-white/15 hover:border-[#22c527] shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer group active:scale-90"
          title="Kembali ke atas"
          aria-label="Kembali ke atas"
        >
          <i className="ri-arrow-up-line text-lg group-hover:-translate-y-0.5 transition-transform"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
