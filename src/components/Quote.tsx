"use client";

import { useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface QuoteProps {
  data: {
    text: string;
    author: string;
  };
}

export default function Quote({ data }: QuoteProps) {
  const { scrollY } = useScroll();

  const yParallax1 = useTransform(scrollY, [0, 500], [0, -50]);
  const yParallax2 = useTransform(scrollY, [0, 500], [0, 50]);
  const scaleQuote = useTransform(scrollY, [0, 300], [1, 1.05]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Particle initialization
    requestAnimationFrame(() => {
      const particleCount = window.innerWidth < 768 ? 8 : 20;
      const newParticles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 800,
      }));
      setParticles(newParticles);
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (e.clientX - centerX) / centerX,
      y: (e.clientY - centerY) / centerY,
    });
  };

  return (

    <section
    className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center overflow-hidden"
    onMouseMove={handleMouseMove}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-900 via-pink-900 to-cyan-900 opacity-20"
        animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating shapes */}
      <motion.div
        style={{ y: yParallax1, x: mousePos.x * 30 }}
        className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full opacity-20 top-12 left-1/4 blur-2xl shadow-2xl"
        animate={{
          x: [0, 20, 0],
          rotate: [0, 45, 0],
          backgroundColor: ["#f9a8d4", "#fcd34d", "#f9a8d4"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: yParallax2, x: mousePos.x * -30 }}
        className="absolute w-28 h-28 md:w-48 md:h-48 rounded-full opacity-15 bottom-12 right-1/4 blur-xl shadow-xl"
        animate={{
          x: [0, -20, 0],
          rotate: [0, -30, 0],
          backgroundColor: ["#06b6d4", "#f9a8d4", "#06b6d4"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40 shadow-sm"
          initial={{ x: p.x, y: p.y, scale: 0 }}
          animate={{
            y: [p.y, p.y - 30, p.y],
            scale: [0, 1, 0.5],
            backgroundColor: ["#fcd34d", "#f9a8d4", "#fcd34d"],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Quote Text */}
      <motion.blockquote
        style={{ scale: scaleQuote }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: isMobile ? [0, -5, 0] : mousePos.y * 10,
          x: isMobile ? 0 : mousePos.x * 10,
        }}
        transition={{
          type: isMobile ? "tween" : "spring",
          duration: isMobile ? 6 : 1,
          repeat: isMobile ? Infinity : 0,
          ease: isMobile ? "easeInOut" : undefined,
        }}
        className="relative text-xl md:text-3xl italic font-semibold text-yellow-400 max-w-3xl mx-auto px-2 md:px-0 before:content-['“'] before:text-6xl before:text-yellow-300 before:absolute before:-top-8 before:-left-6 after:content-['”'] after:text-6xl after:text-yellow-300 after:absolute after:-bottom-8 after:-right-6 drop-shadow-2xl"
      >
        {data.text}
        <footer className="mt-6 text-base md:text-lg font-normal text-gray-300">{data.author}</footer>
      </motion.blockquote>
    </section>
  );
}
