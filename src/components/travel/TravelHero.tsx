"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FlagCanvasCircle from "@/components/travel/FlagCanvasCircle";

const heroTexts = {
  en: {
    title: "✈️ Discover Your Next Adventure",
    subtitle: "Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments. Where will your heart take you next?",
    button: "Let's Go",
  },
  ja: {
    title: "✈️ 次の冒険を見つけよう",
    subtitle: "日常を抜け出し、色彩や文化、忘れられない瞬間に満ちた世界へ。あなたの心は次にどこへ向かうでしょうか？",
    button: "行こう",
  },
  zh: {
    title: "✈️ 发现您的下一次冒险",
    subtitle: "逃离平凡，踏入充满色彩、文化和难忘时刻的世界。你的心将去往何处？",
    button: "出发吧",
  },
};

interface TravelHeroProps {
  scrollY: number;
  language: keyof typeof heroTexts;
}

export default function TravelHero({ scrollY, language }: TravelHeroProps) {
  const currentTexts = heroTexts[language];

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen overflow-hidden z-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        poster="/images/dahab.jpg"
      >
        <source src="/videos/bogota.mp4" type="video/mp4" />
        <Image
          src="/images/dahab.jpg"
          alt="Travel Hero"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Flags Canvas */}
      <FlagCanvasCircle scrollY={scrollY} />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black drop-shadow-2xl text-orange-400 mb-6 leading-tight"
        >
          {currentTexts.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          {currentTexts.subtitle}
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(251, 146, 60, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 inline-block px-12 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-300 cursor-none relative overflow-hidden group"
        >
          <span className="relative z-10">{currentTexts.button}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-orange-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}