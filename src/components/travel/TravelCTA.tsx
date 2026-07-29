"use client";

import { motion } from "framer-motion";
import TravelParallaxBackground from "./TravelParallaxBackground";

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
  index?: number;
  total?: number;
}

export default function TravelCTA({ language, index = 0, total = 1 }: TravelCTAProps) {
  const currentTexts = ctaTexts[language];

  return (
    <section
      className="travel-story-panel travel-story-cta-panel"
      style={{ "--panel-index": index } as React.CSSProperties}
    >
      <TravelParallaxBackground image="/images/japan1.jpg" />

      {/* Overlay */}
      <div className="travel-story-shade"></div>
      <div className="travel-story-edge" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0.82, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black drop-shadow-2xl text-orange-400 mb-6 leading-tight"
        >
          {currentTexts.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0.82, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
          className="mt-4 text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          {currentTexts.subtitle}
        </motion.p>
        
        <motion.a
          href="/contact"
          initial={{ opacity: 0.86, y: 8, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px rgba(251, 146, 60, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="inline-block px-16 py-5 text-xl font-black rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-300 cursor-none relative overflow-hidden group"
        >
          <span className="relative z-10">{currentTexts.button}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
      <span className="travel-story-count">0{index + 1} / {String(total).padStart(2, "0")}</span>
    </section>
  );
}
