"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const router = useRouter();

  const [isHoveringButton, setIsHoveringButton] = useState(false);
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

  // Handle ripple click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, lang: Locale) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, lang });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4"
      style={{ cursor: "none" }} // hide default cursor
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

      {/* Heading */}
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
            key={lang.code}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            onClick={(e) => handleClick(e, lang.code)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex-1 py-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                       text-black font-bold rounded-3xl shadow-[0_0_20px_rgba(255,215,0,0.7)]
                       border-2 border-transparent bg-clip-padding overflow-hidden
                       text-xl tracking-wider uppercase transition-all duration-300 cursor-none"
          >
            <span className="relative z-10 flex items-center justify-center">{lang.name}</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-200 scale-x-0 origin-left transition-transform duration-500 ease-out hover:scale-x-100 rounded-3xl pointer-events-none"
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Ripple */}
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
