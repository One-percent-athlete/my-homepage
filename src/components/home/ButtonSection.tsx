"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import RippleTransition from "./RippleTransition";

export default function ButtonSection() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [ripple, setRipple] = useState<{ x: number; y: number; href: string; color: string } | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  type Language = "en" | "ja" | "zh";
  type ServiceKey = "web" | "travel" | "ski" | "blog";

  const labels: Record<Language, Record<ServiceKey, string>> = {
    en: { web: "Web Dev", travel: "Travel", ski: "Ski Guide", blog: "Blog" },
    ja: { web: "ウェブ制作", travel: "旅行", ski: "スキー案内", blog: "ブログ" },
    zh: { web: "网页开发", travel: "旅行", ski: "滑雪向导", blog: "博客" },
  };

  const services: { 
    icon: string; 
    key: ServiceKey; 
    href: string; 
    color: string;
    rippleColor: string;
  }[] = [
    { 
      icon: "💻", 
      key: "web", 
      href: "/web", 
      color: "from-blue-500 to-cyan-300",
      rippleColor: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    { 
      icon: "✈️", 
      key: "travel", 
      href: "/travel", 
      color: "from-green-500 to-emerald-300",
      rippleColor: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    { 
      icon: "⛷️", 
      key: "ski", 
      href: "/ski", 
      color: "from-red-500 to-orange-300",
      rippleColor: "bg-gradient-to-br from-red-400 to-orange-500"
    },
    { 
      icon: "✍️", 
      key: "blog", 
      href: "/blog", 
      color: "from-purple-500 to-pink-300",
      rippleColor: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, service: typeof services[0]) => {
    // Play sound if available
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // Ignore errors
    }

    // Set active button for mobile feedback
    setActiveButton(service.key);
    setTimeout(() => setActiveButton(null), 300);

    // For mobile, use center of screen instead of button position
    const isMobile = window.innerWidth < 768;
    const x = isMobile ? window.innerWidth / 2 : event.currentTarget.getBoundingClientRect().left + event.currentTarget.offsetWidth / 2;
    const y = isMobile ? window.innerHeight / 2 : event.currentTarget.getBoundingClientRect().top + event.currentTarget.offsetHeight / 2;
    
    setRipple({ 
      x, 
      y, 
      href: service.href, 
      color: service.rippleColor 
    });
  };

  const handleMouseEnter = (key: string) => {
    setHoveredButton(key);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      className="relative z-20 flex flex-col items-center gap-8 w-full max-w-4xl"
    >
      {/* Hidden audio for button sounds */}
      <audio ref={audioRef} src="/sounds/click.mp3" preload="auto" />

      {/* Service Buttons - Round on all screens */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {services.map((service) => (
          <motion.div
            key={service.href}
            className="relative flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => handleMouseEnter(service.key)}
            onHoverEnd={handleMouseLeave}
          >
            {/* Button Container */}
            <div className="flex flex-col items-center gap-3">
              {/* Original Round Button */}
              <motion.button
                onClick={(e) => handleClick(e, service)}
                whileTap={{ scale: 0.95 }}
                className={`relative group
                          w-28 h-28 md:w-36 md:h-36
                          flex items-center justify-center rounded-full
                          border-2 border-yellow-300
                          bg-transparent
                          shadow-[0_0_15px_rgba(255,215,0,0.5)]
                          overflow-hidden
                          transition-all duration-300 ease-in-out
                          cursor-none
                          hover:border-yellow-400
                          hover:shadow-[0_0_25px_rgba(255,223,0,0.8),_0_0_40px_rgba(255,193,7,0.6)]
                          ${activeButton === service.key ? 'scale-95' : ''}`}
              >
                {/* Outer glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} opacity-0 blur-xl transition-opacity duration-300`}
                  animate={{ opacity: hoveredButton === service.key ? 0.6 : 0 }}
                />
                
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                  animate={{ 
                    rotate: hoveredButton === service.key ? 180 : 0 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Icon - Hidden on hover (desktop) */}
                <motion.span
                  className="relative z-10 text-3xl md:text-5xl transition-opacity duration-300"
                  animate={{ 
                    scale: hoveredButton === service.key ? 1.2 : 1,
                    opacity: hoveredButton === service.key ? 0 : 1
                  }}
                >
                  {service.icon}
                </motion.span>
                
                {/* Hover Text - Only shows on hover (desktop) */}
                <motion.span
                  className="absolute z-10 text-center text-lg font-bold text-black opacity-0"
                  animate={{ 
                    opacity: hoveredButton === service.key ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {labels[language][service.key]}
                </motion.span>

                {/* Background fill on hover */}
                <motion.span
                  className="absolute inset-0 bg-yellow-300 scale-0 rounded-full transition-transform duration-300 ease-in-out origin-center"
                  animate={{ 
                    scale: hoveredButton === service.key ? 1 : 0 
                  }}
                />

                {/* Particle effects on hover - desktop only */}
                {hoveredButton === service.key && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full pointer-events-none hidden md:block"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [1, 0.5, 0],
                          x: [0, (Math.random() - 0.5) * 80],
                          y: [0, (Math.random() - 0.5) * 80]
                        }}
                        transition={{ 
                          duration: 1, 
                          delay: i * 0.1,
                          repeat: Infinity 
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Mobile tap feedback */}
                <AnimatePresence>
                  {activeButton === service.key && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} opacity-30`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Text Label - Always visible on mobile, hidden on desktop */}
              <motion.span
                className="text-sm font-bold text-white text-center md:hidden px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-yellow-300/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                {labels[language][service.key]}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Language Switcher */}
      <motion.div 
        className="mt-4 flex flex-col md:flex-row items-center gap-3 backdrop-blur-sm bg-black/30 rounded-2xl p-4 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-white/80 text-sm font-medium mb-2 md:mb-0">
          {language === "en" ? "Language:" : language === "ja" ? "言語:" : "语言:"}
        </span>
        <div className="flex gap-2">
          {(["en", "ja", "zh"] as const).map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setLanguage(lang)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-6 py-3 rounded-xl border-2 font-bold cursor-none transition-all duration-200
                          ${language === lang 
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-yellow-300 shadow-lg" 
                            : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}
            >
              {lang === "en" ? "EN" : lang === "ja" ? "JP" : "CN"}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {ripple && (
        <RippleTransition
          x={ripple.x}
          y={ripple.y}
          onComplete={() => router.push(ripple.href)}
          colorClass={ripple.color}
          duration={window.innerWidth < 768 ? 0.3 : 0.6}
        />
      )}
    </motion.div>
  );
}