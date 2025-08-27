"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import RippleTransition from "../components/RippleTransition";

// Supported locales
const supportedLocales = ["en", "ja", "zh"] as const;
type Locale = (typeof supportedLocales)[number];

// Map locale codes to display names
const languageNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  zh: "中文",
};

// Generate languages array dynamically
const languages = supportedLocales.map((code) => ({
  code,
  name: languageNames[code],
}));

export default function HomePage() {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const auroraParticles = useRef<
    { x: number; y: number; vx: number; vy: number; alpha: number; color: string }[]
  >([]);
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number; lang: Locale } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const starColors = ["#FFD700", "#FFC107", "#FFB300", "#7EC8E3", "#FFFFFF"];

  // Update window dimensions
  useEffect(() => {
    const updateDimensions = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track mouse for aurora + custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  
  // Aurora effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["rgba(255,255,255,0.2)", "rgba(173,216,230,0.3)", "rgba(144,238,144,0.3)", "rgba(255,255,0,0.2)"];

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles only if not hovering a button
      if (!isHoveringButton) {
        auroraParticles.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -1.5 - 0.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      // Draw particles
      auroraParticles.current.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.2", p.alpha.toString()).replace("0.3", p.alpha.toString());
        ctx.fill();

        // Update positions
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;

        if (p.alpha <= 0) {
          auroraParticles.current.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Handle button click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, lang: Locale) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, lang });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4" style={{ cursor: "none" }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-3] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/astro.jpg')" }}
      />

      {/* Aurora Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Custom Green Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] w-6 h-6 rounded-full pointer-events-none
                  bg-green-400 shadow-[0_0_20px_rgba(0,255,128,0.8)]
                  mix-blend-difference transition-transform duration-75 ease-out`}
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
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: color,
                }}
                initial={{ x: startX, y: startY, opacity: 0.3, scale: 1 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3 + Math.random() * 0.3, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}
      </div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-extrabold mb-3 pb-3 text-center tracking-wide text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text animate-[shimmer_3s_linear_infinite]"
        style={{ textShadow: "0 0 15px rgba(255,215,0,0.8)" }}
      >
        Hi, I’m Ryu
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl text-center max-w-3xl mb-12 text-white drop-shadow-lg"
      >
        Web App Developer | Ski Instructor | World Traveler
      </motion.p>

      {/* Language Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col md:flex-row gap-6 w-full max-w-2xl"
      >
        {languages.map((lang) => (
        <motion.button
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
          key={lang.code}
          onClick={(e) => handleClick(e, lang.code)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex-1 py-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                    text-black font-bold rounded-3xl shadow-[0_0_20px_rgba(255,215,0,0.7)]
                    border-2 border-transparent bg-clip-padding overflow-hidden
                    text-xl tracking-wider uppercase transition-all duration-300 cursor-none"
        >
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center transition-colors duration-300 hover:text-black hover:after:text-yellow-300">
            {lang.name}
          </span>

          {/* Hover gradient overlay */}
          <span
            className={`
            absolute inset-0
            bg-gradient-to-r from-yellow-500 to-yellow-200
            scale-x-0 origin-left
            transition-transform duration-500 ease-out
            hover:scale-x-100 rounded-3xl
            pointer-events-none
          `}
          />
        </motion.button>
      ))}
      </motion.div>

      {/* Ripple Transition */}
      {ripple && (
        <RippleTransition
          x={ripple.x}
          y={ripple.y}
          colorClass="bg-yellow-500"
          borderClass="border-black"
          duration={0.4}
          onComplete={() => router.push(`/${ripple.lang}`)}
        />
      )}

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
