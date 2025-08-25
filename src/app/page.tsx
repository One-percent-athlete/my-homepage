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
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, href: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, href });
  };

  // Random gold/amber/orange color for fireflies
  const randomGoldColor = () => {
    const colors = ["rgba(255,223,128,0.9)", "rgba(255,200,50,0.85)", "rgba(255,180,50,0.8)"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-[-2] bg-gradient-to-b from-emerald-700 via-amber-500 to-orange-600"
        animate={{ backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Golden Firefly Sparks ✨ */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        {dimensions.width > 0 &&
          [...Array(100)].map((_, i) => {
            const size = Math.random() * 4 + 3;
            const blur = Math.random() * 4;
            const duration = 6 + Math.random() * 10;
            const amplitudeX = Math.random() * 100 - 50;
            const amplitudeY = Math.random() * 50 - 25;
            const startX = Math.random() * dimensions.width;
            const startY = Math.random() * dimensions.height;
            const color = randomGoldColor();
            const delay = Math.random() * duration;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color} 0%, ${color} 60%, transparent 100%)`,
                  filter: `blur(${blur}px)`,
                }}
                initial={{ x: startX, y: startY, opacity: 0 }}
                animate={{
                  x: [
                    startX,
                    startX + amplitudeX / 2,
                    startX + amplitudeX,
                    startX + amplitudeX / 2,
                    startX,
                  ],
                  y: [
                    startY,
                    startY + amplitudeY / 2,
                    startY + amplitudeY,
                    startY + amplitudeY / 2,
                    startY,
                  ],
                  opacity: [0.1, 1, 0.5, 1, 0.1],
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

      {/* Heading */}
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 text-center tracking-wide"
      >
        Hi, I’m Ryu
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl text-center max-w-3xl mb-12"
      >
        Freelance Engineer | Web App Developer | Ski Instructor | Traveled 80+ Countries
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
            className="relative flex-1 py-6 bg-black text-white font-semibold rounded-2xl shadow-xl
                       border-2 border-transparent bg-clip-padding overflow-hidden
                       hover:border-amber-400 transition-all duration-300 text-xl tracking-wider uppercase"
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
          onComplete={() => router.push(ripple.href)}
        />
      )}
    </div>
  );
}
