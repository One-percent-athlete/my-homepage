// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from 'react';

const starColors = ["#FFD700", "#FFC107", "#FFB300", "#7EC8E3", "#FFFFFF"];

// Add children prop
export default function HeroSection({ children }: { children: React.ReactNode }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4"
      style={{ cursor: "none" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[-3] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/astro.jpg')" }}
      />

      {/* Twinkling Stars */}
      <div className="absolute inset-0 z-[-2] pointer-events-none">
        {dimensions.width > 0 &&
          [...Array(250)].map((_, i) => {
            const size = Math.random() * 2 + Math.random() * 6;
            const startX = Math.random() * dimensions.width;
            const startY = Math.random() * dimensions.height;
            const color = starColors[Math.floor(Math.random() * starColors.length)];
            const duration = 1 + Math.random() * 2.5;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{ width: `${size}px`, height: `${size}px`, background: color }}
                initial={{ x: startX, y: startY, opacity: 0.3, scale: 1 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3 + Math.random() * 0.3, 1] }}
                transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
              />
            );
          })}
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center p-8 text-white max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-3 pb-3 text-center tracking-wide text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text animate-[shimmer_3s_linear_infinite]"
          style={{ textShadow: "0 0 15px rgba(255,215,0,0.8)" }}
        >
          Your Global Vision, <br/>
          Realized
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-center max-w-3xl mb-3 text-white drop-shadow-lg"
        >
          From multilingual websites to unforgettable travel, <br/>let&apos;s turn your ideas into reality.
        </motion.p>
      </div>

      {/* This is where the buttons will be rendered */}
      {children}

      {/* Custom shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .animate-[shimmer_3s_linear_infinite] {
          background-size: 1000px 100%;
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
}