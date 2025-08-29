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
  const [progress, setProgress] = useState(0);

  // Calculate ripple size to cover viewport
  useEffect(() => {
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    setSize(diagonal * 2);
  }, []);

  // Animate loading progress
  useEffect(() => {
    if (!showSolid) {
      const interval = 20; // ms between increments
      const steps = duration * 1000 / interval; // total steps
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [showSolid, duration]);

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
          className={`fixed top-0 left-0 z-[9999] pointer-events-none ${colorClass} ${borderClass} border-4 flex items-center justify-center`}
          onAnimationComplete={() => {
            setShowSolid(true);
            setTimeout(onComplete, 40); // short delay before page transition
          }}
        >
          <span className="text-black text-6xl font-bold">{progress}%</span>
        </motion.div>
      )}

      {showSolid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className={`fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none ${colorClass} flex items-center justify-center`}
        >
          <span className="text-black text-6xl font-bold">100%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
