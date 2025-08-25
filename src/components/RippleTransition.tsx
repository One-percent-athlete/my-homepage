"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type RippleProps = {
  x: number;
  y: number;
  onComplete: () => void;
  colorClass?: string; // Tailwind background class e.g., "bg-yellow-500"
  borderClass?: string; // Tailwind border class e.g., "border-black"
  duration?: number; // total duration in seconds
};

export default function RippleTransition({
  x,
  y,
  onComplete,
  colorClass = "bg-yellow-500",
  borderClass = "border-black",
  duration = 0.4,
}: RippleProps) {
  const [size, setSize] = useState(0);
  const [showSolid, setShowSolid] = useState(false);

  // Calculate ripple size to cover viewport
  useEffect(() => {
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    setSize(diagonal * 2);
  }, []);

  return (
    <AnimatePresence>
      {!showSolid && size > 0 && (
        <motion.div
          initial={{ width: 0, height: 0, borderRadius: "50%", x, y, opacity: 1 }}
          animate={{
            width: size,
            height: size,
            x: x - size / 2,
            y: y - size / 2,
            opacity: 1,
          }}
          transition={{ duration, ease: "easeInOut" }}
          className={`fixed top-0 left-0 z-[9999] pointer-events-none ${colorClass} ${borderClass} border-4`}
          onAnimationComplete={() => {
            setShowSolid(true);
            setTimeout(onComplete, 80); // short delay before page transition
          }}
        />
      )}

      {showSolid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className={`fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none ${colorClass}`}
        />
      )}
    </AnimatePresence>
  );
}
