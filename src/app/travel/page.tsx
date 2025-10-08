"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingButtons from "../../components/FloatingButtons";
import Footer from "@/components/Footer";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import FlagCanvasCircle from "@/components/travel/FlagCanvasCircle";
import LogoShowcase from "@/components/travel/LogoShowcase";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TravelPage() {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Multilingual content
  const heroTexts = {
    en: {
      title: "✈️ Discover Your Next Adventure",
      subtitle:
        "Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments. Where will your heart take you next?",
      button: "Let's Go",
    },
    ja: {
      title: "✈️ 次の冒険を見つけよう",
      subtitle:
        "日常を抜け出し、色彩や文化、忘れられない瞬間に満ちた世界へ。あなたの心は次にどこへ向かうでしょうか？",
      button: "行こう",
    },
    zh: {
      title: "✈️ 发现您的下一次冒险",
      subtitle:
        "逃离平凡，踏入充满色彩、文化和难忘时刻的世界。你的心将去往何处？",
      button: "出发吧",
    },
  };

  const destinations = {
    en: [
      {
        title: "Tropical Paradise",
        img: "/images/stairs.jpg",
        desc: "Soak up the sun, feel the sand between your toes, and sip on fresh coconut water.",
      },
      {
        title: "Mountain Escape",
        img: "/images/patagonia.jpg",
        desc: "Breathe in crisp air, chase waterfalls, and find peace among majestic peaks.",
      },
      {
        title: "City Lights",
        img: "/images/equador.jpg",
        desc: "Get lost in buzzing streets, taste local delights, and dance the night away.",
      },
    ],
    ja: [
      {
        title: "トロピカルパラダイス",
        img: "/images/stairs.jpg",
        desc: "太陽を浴び、砂の感触を楽しみ、新鮮なココナッツウォーターを味わおう。",
      },
      {
        title: "山の隠れ家",
        img: "/images/patagonia.jpg",
        desc: "澄んだ空気を吸い、滝を追い、雄大な山々の中で安らぎを見つけよう。",
      },
      {
        title: "都市の光",
        img: "/images/equador.jpg",
        desc: "賑やかな街を散策し、地元の味を楽しみ、夜を踊って過ごそう。",
      },
    ],
    zh: [
      {
        title: "热带天堂",
        img: "/images/stairs.jpg",
        desc: "沐浴阳光，感受脚下的沙滩，品尝新鲜的椰子水。",
      },
      {
        title: "山间秘境",
        img: "/images/patagonia.jpg",
        desc: "呼吸清新的空气，追逐瀑布，在雄伟的山峰中找到宁静。",
      },
      {
        title: "城市之光",
        img: "/images/equador.jpg",
        desc: "迷失在热闹的街道中，品尝当地美食，尽情享受夜晚。",
      },
    ],
  };

  const testimonials = {
    en: [
      { name: "Backpacked for 6 years", icon: "🎒" },
      { name: "Visited 60+ countries", icon: "🌏" },
      { name: "Hitchhiked NY → LA", icon: "🛣️" },
      { name: "Walked Camino de Santiago", icon: "🥾" },
      { name: "Multilanguage Speaker", icon: "🗣️" },
      { name: "Deckhand / Underwater Guide", icon: "⚓" },
      { name: "Snow Mountain Guide", icon: "🏔️" },
      { name: "City Tour Guide", icon: "🏙️" },
      { name: "Volunteered in Nepal, Bangladesh, Tanzania", icon: "🌍" },
    ],
    ja: [
      { name: "6年間バックパック旅行", icon: "🎒" },
      { name: "60か国以上訪問", icon: "🌏" },
      { name: "NY → LA ヒッチハイク", icon: "🛣️" },
      { name: "カミーノ・デ・サンティアゴを徒歩", icon: "🥾" },
      { name: "多言語スピーカー", icon: "🗣️" },
      { name: "船員 / 水中ガイド", icon: "⚓" },
      { name: "雪山ガイド", icon: "🏔️" },
      { name: "都市ツアーガイド", icon: "🏙️" },
      { name: "ネパール、バングラデシュ、タンザニアでボランティア", icon: "🌍" },
    ],
    zh: [
      { name: "背包旅行6年", icon: "🎒" },
      { name: "访问60多个国家", icon: "🌏" },
      { name: "搭便车从NY到LA", icon: "🛣️" },
      { name: "徒步圣地亚哥之路", icon: "🥾" },
      { name: "多语言演讲者", icon: "🗣️" },
      { name: "船员/水下向导", icon: "⚓" },
      { name: "雪山向导", icon: "🏔️" },
      { name: "城市导游", icon: "🏙️" },
      { name: "在尼泊尔、孟加拉国、坦桑尼亚做志愿者", icon: "🌍" },
    ],
  };

  const ctaTexts = {
    en: {
      title: "🌍 The world is waiting for you",
      subtitle:
        "Pack your bags and let your soul wander. Adventure is just a heartbeat away.",
      button: "Start Exploring",
    },
    ja: {
      title: "🌍 世界があなたを待っている",
      subtitle:
        "荷物をまとめ、心のままに旅をしよう。冒険はすぐそこにあります。",
      button: "探検を始める",
    },
    zh: {
      title: "🌍 世界在等待着你",
      subtitle: "收拾行囊，让心灵去漫游。冒险就在眼前。",
      button: "开始探索",
    },
  };


  return (
    <>
      <CustomCursor />
      <FloatingButtons />
      <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 overflow-hidden">

      {/* Hero Section with Background Video */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen overflow-hidden z-20">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          poster="/images/dahab.jpg" // <-- shows before video loads
        >
          <source src="/videos/bogota.mp4" type="video/mp4" />
          {/* Fallback image for browsers that don't support <video> */}
          <Image
            src="/images/dahab.jpg"
            alt="Travel Hero"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          />
        </video>

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Flags Canvas (on top of video) */}
        <FlagCanvasCircle scrollY={scrollY} />

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold drop-shadow-lg text-orange-400 z-10"
        >
          {heroTexts[language].title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-xl text-gray-300 max-w-2xl z-10"
        >
          {heroTexts[language].subtitle}
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 inline-block px-8 py-4 text-lg font-bold rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-colors cursor-none z-10"
        >
          {heroTexts[language].button}
        </motion.a>
      </section>


        {/* Destinations Grid */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
          
          {destinations[language].map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform cursor-none"
            >
              <Image
                src={place.img}
                alt={place.title}
                className="rounded-lg"
                width={600}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-400">{place.title}</h3>
                <p className="mt-3 text-gray-300">{place.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Parallax Showcase */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/petra.jpg')",
            }}
          />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl font-extrabold drop-shadow-xl text-orange-400">🌄 Breathtaking Views</h2>
            <p className="mt-4 text-xl text-gray-200">Let nature remind you how small the world makes you feel.</p>
          </div>
        </section>

        {/* Testimonials / Why Me */}
        <section
          className="relative mx-auto px-6 py-24 overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/whale.jpg')", // ← change to your image
              opacity: 0.5, // makes it subtle
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-center mb-12 text-orange-400">
              ❤️ {language === "ja" ? "なぜ私？" : language === "zh" ? "为什么选择我？" : "Why Me ?"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials[language].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="mt-2 font-semibold text-orange-400 text-lg">
                    {item.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Extra Parallax Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/srilanka.jpg')",
            }}
          />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl font-extrabold drop-shadow-xl text-orange-400">🌍 Endless Adventures</h2>
            <p className="mt-4 text-xl text-gray-200">Every step brings a new story to tell.</p>
          </div>
        </section>

        <LogoShowcase direction="right" />
        


        {/* Call to Action */}
          <section
            id="cta-section"
            className="relative text-center px-6 py-24 overflow-hidden bg-gradient-to-r from-cyan-700 to-indigo-800"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/images/japan1.jpg')", // <-- replace with your image path
              }}
            />

            {/* Optional overlay to keep text readable */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl font-extrabold drop-shadow-md text-orange-400"
              >
                {ctaTexts[language].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 text-lg text-gray-300"
              >
                {ctaTexts[language].subtitle}
              </motion.p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 text-lg font-bold rounded-full bg-orange-400 text-white shadow-lg hover:bg-orange-500 cursor-none"
              >
                {ctaTexts[language].button}
              </motion.a>
            </div>
          </section>
        <LogoShowcase direction="left" />
      </div>

      <Footer />
    </>
  );
}
