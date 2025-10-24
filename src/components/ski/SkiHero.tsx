"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const content = {
  en: {
    heroTitle: "Master the Mountain 🏔️",
    heroSubtitle: "Private Ski Lessons & Guided Adventures with 10+ Years of Expertise",
    heroButton: "Let's Go",
  },
  ja: {
    heroTitle: "山を制覇しよう 🏔️",
    heroSubtitle: "10年以上の経験によるプライベートスキー指導＆ガイドアドベンチャー",
    heroButton: "行こう",
  },
  zh: {
    heroTitle: "征服雪山 🏔️",
    heroSubtitle: "10年以上经验的私人滑雪课程与指导冒险",
    heroButton: "出发吧",
  },
};

interface SkiHeroProps {
  language: keyof typeof content;
}

// Properly typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      duration: 0.8
    } 
  },
};

const itemVariants: Variants = { 
  hidden: { y: 50, opacity: 0, scale: 0.95 }, 
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 100,
      damping: 15
    }
  } 
};

const buttonVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      delay: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring" as const,
      stiffness: 400
    }
  },
  tap: { scale: 0.95 }
};

// Pre-defined snowflake positions to avoid hydration issues
const SNOWFLAKE_POSITIONS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 3.33) % 100, // Deterministic positioning
  delay: i * 0.16,
  duration: 10 + (i % 10)
}));

export default function SkiHero({ language }: SkiHeroProps) {
  const { heroTitle, heroSubtitle, heroButton } = content[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const videos = ["/videos/ski-video2.mp4", "/videos/ski-video3.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnded = () => {
      const nextIndex = (currentVideo + 1) % videos.length;
      setCurrentVideo(nextIndex);
    };

    const handleLoaded = () => {
      setIsVideoLoaded(true);
    };

    videoEl.addEventListener("ended", handleEnded);
    videoEl.addEventListener("loadeddata", handleLoaded);
    
    return () => {
      videoEl.removeEventListener("ended", handleEnded);
      videoEl.removeEventListener("loadeddata", handleLoaded);
    };
  }, [currentVideo, videos.length]);

  return (
    <header className="relative w-full h-screen min-h-[700px] bg-cover bg-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/ski.jpg"
          alt="Ski Hero Fallback"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
          priority
        />
        <video
          ref={videoRef}
          key={currentVideo}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster="/images/ski.jpg"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-blue-800/20 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        
        {/* Animated Snowflakes - Only render on client */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {SNOWFLAKE_POSITIONS.map((snowflake) => (
              <div
                key={snowflake.id}
                className="absolute top-0 animate-snowflake text-white/80"
                style={{
                  left: `${snowflake.left}%`,
                  animationDelay: `${snowflake.delay}s`,
                  animationDuration: `${snowflake.duration}s`,
                }}
              >
                ❄️
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants} 
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide">
              {language === 'en' && 'Live Ski Conditions • Open Now'}
              {language === 'ja' && 'ライブ雪況 • 営業中'}
              {language === 'zh' && '实时雪况 • 开放中'}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 tracking-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent">
              {heroTitle.split('🏔️')[0]}
            </span>
            <span className="inline-block ml-4">🏔️</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={buttonVariants}>
            <motion.a
              href="/contact"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold text-lg sm:text-xl py-4 px-12 rounded-2xl shadow-2xl cursor-pointer overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10 flex items-center gap-3">
                {heroButton}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70 text-sm font-medium tracking-wide">
                {language === 'en' && 'Scroll to explore'}
                {language === 'ja' && 'スクロールして探す'}
                {language === 'zh' && '滚动探索'}
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for snowflakes */}
      <style jsx>{`
        @keyframes snowflake {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-snowflake {
          animation: snowflake linear infinite;
        }
      `}</style>
    </header>
  );
}