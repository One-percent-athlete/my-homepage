"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

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
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-blue-500 fixed top-0 left-0 z-50 pointer-events-none"
        onAnimationComplete={onComplete}
      />
    </AnimatePresence>
  );
}
