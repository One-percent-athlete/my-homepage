"use client";

import { motion } from "framer-motion";

const ctaTexts = {
  en: {
    title: "🌍 The World Is Waiting For You",
    subtitle: "Pack your bags and let your soul wander. Adventure is just a heartbeat away. Your next unforgettable journey begins now.",
    button: "Start Your Adventure",
  },
  ja: {
    title: "🌍 世界があなたを待っている",
    subtitle: "荷物をまとめ、心のままに旅をしよう。冒険はすぐそこにあります。忘れられない次の旅が今始まります。",
    button: "冒険を始める",
  },
  zh: {
    title: "🌍 世界在等待着你",
    subtitle: "收拾行囊，让心灵去漫游。冒险就在眼前。您下一次难忘的旅程现在开始。",
    button: "开始冒险",
  },
};

interface TravelCTAProps {
  language: keyof typeof ctaTexts;
}

export default function TravelCTA({ language }: TravelCTAProps) {
  const currentTexts = ctaTexts[language];

  return (
    <section className="relative text-center px-6 py-24 overflow-hidden bg-gradient-to-br from-orange-900/30 to-amber-900/20 min-h-[60vh] flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/japan1.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-black drop-shadow-2xl text-orange-400 mb-6 leading-tight"
        >
          {currentTexts.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          {currentTexts.subtitle}
        </motion.p>
        
        <motion.a
          href="/contact"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px rgba(251, 146, 60, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-block px-16 py-5 text-xl font-black rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-300 cursor-none relative overflow-hidden group"
        >
          <span className="relative z-10">{currentTexts.button}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
    </section>
  );
}