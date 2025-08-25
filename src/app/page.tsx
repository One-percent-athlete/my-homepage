"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import RippleTransition from "../components/RippleTransition";

export default function HomePage() {
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number; href: string } | null>(null);

  const languages = [
    { name: "English", href: "/en" },
    { name: "日本語", href: "/ja" },
    { name: "中文", href: "/zh" },
  ];

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, href: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, href });
  };

  const starColors = ["#FFD700", "#FFC107", "#FFB300", "#7EC8E3", "#FFFFFF"];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-3] bg-cover bg-center" id="top"
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
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: delay,
                }}
              />
            );
          })}
      </div>

      {/* Main Heading with Shimmer */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-extrabold mb-3 pb-3 text-center tracking-wide text-transparent bg-gradient-to-r
                   from-yellow-400 via-yellow-300 to-white bg-clip-text animate-[shimmer_3s_linear_infinite]"
        style={{
          textShadow: "0 0 15px rgba(255,215,0,0.8)",
        }}
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
        Web App Developer | Ski Instructor | Traveled 60+ Countries
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col md:flex-row gap-6 w-full max-w-2xl"
      >
        {languages.map((lang) => (
          <motion.button
            key={lang.href}
            onClick={(e) => handleClick(e, lang.href)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative flex-1 py-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                       text-black font-bold rounded-3xl shadow-[0_0_20px_rgba(255,215,0,0.7)]
                       border-2 border-transparent bg-clip-padding overflow-hidden
                       hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 transition-all duration-300
                       text-xl tracking-wider uppercase"
          >
            {lang.name}
            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 pointer-events-none"
              animate={{ x: ["-75%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
          onComplete={() => router.push(ripple.href)}
        />
      )}

      {/* Custom shimmer animation keyframes */}
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
