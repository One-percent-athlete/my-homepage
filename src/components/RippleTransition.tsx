"use client";

import { motion, AnimatePresence } from "framer-motion";

type RippleProps = {
  x: number;
  y: number;
  onComplete: () => void;
};

export default function RippleTransition({ x, y, onComplete }: RippleProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, height: 0, borderRadius: "50%", x, y, opacity: 0.5 }}
        animate={{
          width: 2000,
          height: 2000,
          x: x - 1000,
          y: y - 1000,
          opacity: 0.8,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-50 pointer-events-none
                  bg-black"
        onAnimationComplete={onComplete}
      />
    </AnimatePresence>
  );
}
