"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const destinations = {
  en: [
    {
      title: "Tropical Paradise",
      img: "/images/stairs.jpg",
      desc: "Soak up the sun, feel the sand between your toes, and sip on fresh coconut water.",
      icon: "🏝️",
    },
    {
      title: "Mountain Escape",
      img: "/images/patagonia.jpg",
      desc: "Breathe in crisp air, chase waterfalls, and find peace among majestic peaks.",
      icon: "🏔️",
    },
    {
      title: "City Lights",
      img: "/images/equador.jpg",
      desc: "Get lost in buzzing streets, taste local delights, and dance the night away.",
      icon: "🌆",
    },
  ],
  ja: [
    {
      title: "トロピカルパラダイス",
      img: "/images/stairs.jpg",
      desc: "太陽を浴び、砂の感触を楽しみ、新鮮なココナッツウォーターを味わおう。",
      icon: "🏝️",
    },
    {
      title: "山の隠れ家",
      img: "/images/patagonia.jpg",
      desc: "澄んだ空気を吸い、滝を追い、雄大な山々の中で安らぎを見つけよう。",
      icon: "🏔️",
    },
    {
      title: "都市の光",
      img: "/images/equador.jpg",
      desc: "賑やかな街を散策し、地元の味を楽しみ、夜を踊って過ごそう。",
      icon: "🌆",
    },
  ],
  zh: [
    {
      title: "热带天堂",
      img: "/images/stairs.jpg",
      desc: "沐浴阳光，感受脚下的沙滩，品尝新鲜的椰子水。",
      icon: "🏝️",
    },
    {
      title: "山间秘境",
      img: "/images/patagonia.jpg",
      desc: "呼吸清新的空气，追逐瀑布，在雄伟的山峰中找到宁静。",
      icon: "🏔️",
    },
    {
      title: "城市之光",
      img: "/images/equador.jpg",
      desc: "迷失在热闹的街道中，品尝当地美食，尽情享受夜晚。",
      icon: "🌆",
    },
  ],
};

interface DestinationsGridProps {
  language: keyof typeof destinations;
}

export default function DestinationsGrid({ language }: DestinationsGridProps) {
  const currentDestinations = destinations[language];
  const ui = {
    en: { title:"Your Next Journey Awaits", subtitle:"Discover destinations that ignite your wanderlust and create memories that last a lifetime", action:"Explore More" },
    ja: { title:"次の旅が待っている", subtitle:"旅心に火をつけ、一生残る記憶を生む場所を見つけよう", action:"もっと探索する" },
    zh: { title:"下一段旅程正在等待", subtitle:"发现能点燃旅行欲望、创造长久回忆的目的地", action:"继续探索" },
  }[language];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-orange-400 mb-4">
          🌍 {ui.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-4" />
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {ui.subtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {currentDestinations.map((place, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-orange-500/20 transition-all duration-500 cursor-none"
          >
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={place.img}
                alt={place.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4 text-3xl">
                {place.icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6 z-10">
              <h3 className="text-2xl font-bold text-orange-400 mb-3">
                {place.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {place.desc}
              </p>
              
              {/* Explore Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold border border-orange-500/30 hover:bg-orange-500/30 transition-all duration-300"
              >
                {ui.action} →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
