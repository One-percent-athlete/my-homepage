"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const videos = [
  "/videos/vid1.mp4",
  "/videos/vid2.mp4",
  "/videos/vid3.mp4",
];

type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  button: string;
};

type HeroTextContent = {
  en: HeroContent;
  ja: HeroContent;
  zh: HeroContent;
};


const textContent: HeroTextContent = {
  en: {
    title: "Ryu — Adventurer & Engineer",
    subtitle: "Freelance Web Developer | Global Explorer | Ski Instructor",
    description:
      "Building modern web apps and engineering solutions while exploring the world. With experience across 60+ countries, I bring a unique global perspective to problem-solving.",
    button: "Let’s Build Something Together",
  },
  ja: {
    title: "リュウ — 冒険者＆エンジニア",
    subtitle: "フリーランスWeb開発者 | 世界を旅する探検家 | スキーインストラクター",
    description:
      "世界を旅しながらモダンなWebアプリやエンジニアリングソリューションを構築。60カ国以上の経験を活かし、ユニークなグローバルな視点で問題解決に取り組みます。",
    button: "一緒に何かを作りましょう",
  },
  zh: {
    title: "Ryu — 冒险家 & 工程师",
    subtitle: "自由职业网页开发者 | 全球探险者 | 滑雪教练",
    description:
      "在探索世界的同时构建现代网页应用和工程解决方案。拥有60多个国家的经验，为问题解决带来独特的全球视角。",
    button: "让我们一起创造点什么",
  },
};


export default function Hero() {
  const pathname = usePathname(); // e.g., "/en", "/ja", "/zh"
  const locale = pathname?.split("/")[1] || "en"; // default to English

  const supportedLocales = ["en", "ja", "zh"] as const;
  type Locale = (typeof supportedLocales)[number];

  const localeKey: Locale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";

  const content = textContent[localeKey];

  const [currentVideo, setCurrentVideo] = useState(0);

  // Cycle through videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const parallax = [
    { x: 1.2, y: 1.2 },
    { x: 0.8, y: 0.8 },
    { x: 1.5, y: 1.3 },
    { x: 0.7, y: 0.7 },
  ];

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videos.map((src, index) => (
          <motion.video
            key={index}
            src={src}
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: index === currentVideo ? 1 : 0,
              scale: index === currentVideo ? 1.05 : 1,
            }}
            transition={{ type: "tween", duration: 8, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Left Text Section */}
      <motion.div
        className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left z-10 order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
          {content.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-yellow-300">
          {content.subtitle}
        </h2>
        <p className="text-lg md:text-xl mb-6 text-white max-w-xl">
          {content.description}
        </p>
        <a
          href="#contact"
          className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
        >
          {content.button}
        </a>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        className="md:w-1/2 flex justify-center relative z-10 order-1 md:order-2 mb-12 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-64 h-64 md:w-72 md:h-72 relative rounded-full overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image src="/images/main.jpg" alt="Description" width={300} height={300} />
        </motion.div>

        {/* Floating dots */}
        <motion.div
          className="absolute w-16 h-16 rounded-full overflow-hidden shadow-lg"
          style={{ top: "10%", right: "15%" }}
          animate={{
            y: [0, -20 * parallax[0].y, 0],
            x: [0, 20 * parallax[0].x, 0],
          }}
          transition={{ type: "tween", duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/dot-image.jpg" alt="Description" width={300} height={300} />
        </motion.div>

        <motion.div
          className="hidden md:block absolute w-12 h-12 bg-white rounded-full top-20 left-20 opacity-80"
          animate={{
            y: [0, 15 * parallax[1].y, 0],
            x: [0, -15 * parallax[1].x, 0],
          }}
          transition={{ type: "tween", duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-8 h-8 bg-yellow-300 rounded-full opacity-70"
          style={{ top: "30%", left: "10%" }}
          animate={{
            y: [0, -10 * parallax[2].y, 0],
            x: [0, 10 * parallax[2].x, 0],
          }}
          transition={{ type: "tween", duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-6 h-6 bg-white rounded-full opacity-50"
          style={{ bottom: "20%", right: "25%" }}
          animate={{
            y: [0, 12 * parallax[3].y, 0],
            x: [0, -12 * parallax[3].x, 0],
          }}
          transition={{ type: "tween", duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
