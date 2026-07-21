"use client";

import { motion } from "framer-motion";
import TravelParallaxBackground from "./TravelParallaxBackground";

const testimonials = {
  en: [
    { name: "Backpacked for 6 years", icon: "🎒", color: "from-green-500 to-emerald-500" },
    { name: "Visited 60+ countries", icon: "🌏", color: "from-blue-500 to-cyan-500" },
    { name: "Hitchhiked NY → LA", icon: "🛣️", color: "from-orange-500 to-red-500" },
    { name: "Walked Camino de Santiago", icon: "🥾", color: "from-purple-500 to-pink-500" },
    { name: "Multilanguage Speaker", icon: "🗣️", color: "from-yellow-500 to-amber-500" },
    { name: "Deckhand / Underwater Guide", icon: "⚓", color: "from-teal-500 to-blue-500" },
    { name: "Snow Mountain Guide", icon: "🏔️", color: "from-indigo-500 to-purple-500" },
    { name: "City Tour Guide", icon: "🏙️", color: "from-gray-500 to-slate-500" },
    { name: "Volunteered in Nepal, Bangladesh, Tanzania", icon: "🌍", color: "from-green-500 to-lime-500" },
  ],
  ja: [
    { name: "6年間バックパック旅行", icon: "🎒", color: "from-green-500 to-emerald-500" },
    { name: "60か国以上訪問", icon: "🌏", color: "from-blue-500 to-cyan-500" },
    { name: "NY → LA ヒッチハイク", icon: "🛣️", color: "from-orange-500 to-red-500" },
    { name: "カミーノ・デ・サンティアゴを徒歩", icon: "🥾", color: "from-purple-500 to-pink-500" },
    { name: "多言語スピーカー", icon: "🗣️", color: "from-yellow-500 to-amber-500" },
    { name: "船員 / 水中ガイド", icon: "⚓", color: "from-teal-500 to-blue-500" },
    { name: "雪山ガイド", icon: "🏔️", color: "from-indigo-500 to-purple-500" },
    { name: "都市ツアーガイド", icon: "🏙️", color: "from-gray-500 to-slate-500" },
    { name: "ネパール、バングラデシュ、タンザニアでボランティア", icon: "🌍", color: "from-green-500 to-lime-500" },
  ],
  zh: [
    { name: "背包旅行6年", icon: "🎒", color: "from-green-500 to-emerald-500" },
    { name: "访问60多个国家", icon: "🌏", color: "from-blue-500 to-cyan-500" },
    { name: "搭便车从NY到LA", icon: "🛣️", color: "from-orange-500 to-red-500" },
    { name: "徒步圣地亚哥之路", icon: "🥾", color: "from-purple-500 to-pink-500" },
    { name: "多语言演讲者", icon: "🗣️", color: "from-yellow-500 to-amber-500" },
    { name: "船员/水下向导", icon: "⚓", color: "from-teal-500 to-blue-500" },
    { name: "雪山向导", icon: "🏔️", color: "from-indigo-500 to-purple-500" },
    { name: "城市导游", icon: "🏙️", color: "from-gray-500 to-slate-500" },
    { name: "在尼泊尔、孟加拉国、坦桑尼亚做志愿者", icon: "🌍", color: "from-green-500 to-lime-500" },
  ],
};

interface WhyMeSectionProps {
  language: keyof typeof testimonials;
}

export default function WhyMeSection({ language }: WhyMeSectionProps) {
  const currentTestimonials = testimonials[language];

  return (
    <section className="relative mx-auto px-6 py-24 overflow-hidden">
      <TravelParallaxBackground image="/images/whale.jpg" opacity={0.4} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0.82, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-orange-400"
        >
          ❤️ {language === "ja" ? "なぜ私？" : language === "zh" ? "为什么选择我？" : "Why Choose Me?"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {currentTestimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.78, y: 18, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.045, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center cursor-none border border-white/10 hover:border-orange-400/30 transition-all duration-500"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className="relative z-10 text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* Text */}
              <h4 className="relative z-10 font-bold text-orange-300 text-lg leading-tight">
                {item.name}
              </h4>

              {/* Hover Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
