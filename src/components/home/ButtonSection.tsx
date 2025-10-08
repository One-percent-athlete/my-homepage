"use client";

import "@/app/globals.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import RippleTransition from "./RippleTransition";

export default function ButtonSection() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [ripple, setRipple] = useState<{ x: number; y: number; href: string } | null>(null);
  const [open, setOpen] = useState(false);

  type Language = "en" | "ja" | "zh";
  type ServiceKey = "web" | "travel" | "ski" | "blog";

  const labels: Record<Language, Record<ServiceKey, string>> = {
    en: { web: "Web", travel: "Travel", ski: "Ski", blog: "Blog" },
    ja: { web: "ウェブ", travel: "旅行", ski: "スキー", blog: "ブログ" },
    zh: { web: "网页", travel: "旅行", ski: "滑雪", blog: "博客" },
  };

  const services: { icon: string; key: ServiceKey; href: string }[] = [
    { icon: "💻", key: "web", href: "/web" },
    { icon: "✈️", key: "travel", href: "/travel" },
    { icon: "⛷️", key: "ski", href: "/ski" },
    { icon: "✍️", key: "blog", href: "/blog" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, href: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, href });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="relative z-20 flex flex-col items-center gap-6 w-full max-w-2xl"
    >
      {/* Main Service Buttons */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {services.map((service) => (
          <motion.button
            key={service.href}
            onClick={(e) => handleClick(e, service.href)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group
                      w-28 h-28 md:w-36 md:h-36
                      flex items-center justify-center rounded-full
                      border-2 border-yellow-400
                      bg-transparent text-yellow-400
                      shadow-[0_0_15px_rgba(255,215,0,0.5)]
                      overflow-hidden
                      transition-all duration-300 ease-in-out
                      cursor-none
                      hover:shadow-[0_0_25px_rgba(255,223,0,0.8),_0_0_40px_rgba(255,193,7,0.6)]
                      hover:border-yellow-300"
          >
            <span
              className="relative z-10 text-3xl md:text-5xl
                        transition-opacity duration-300
                        group-hover:opacity-0 md:block"
            >
              {service.icon}
            </span>
            <span
              className="absolute z-10 text-center text-3xl
                        font-bold text-yellow-300 md:text-black
                        opacity-100 md:opacity-0
                        transition-opacity duration-200 ease-in-out
                        group-hover:opacity-100 group-hover:delay-200"
            >
              {labels[language][service.key]}
            </span>
            <span
              className="absolute inset-0 bg-yellow-300 scale-0 rounded-full
                        transition-transform duration-300 ease-in-out origin-center
                        group-hover:scale-100 group-hover:delay-100"
            ></span>
          </motion.button>
        ))}
      </div>

      {/* Language Buttons - always visible */}
      <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
        {(["en", "ja", "zh"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 rounded-lg border-2 border-yellow-400 font-bold cursor-none
                        ${language === lang ? "bg-yellow-400 text-black" : "bg-transparent text-yellow-400"}
                        transition-colors hover:bg-yellow-400 hover:text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]`}
          >
            {lang === "en" ? "English" : lang === "ja" ? "日本語" : "中文"}
          </button>
        ))}
      </div>



      {ripple && (
        <RippleTransition
          x={ripple.x}
          y={ripple.y}
          onComplete={() => router.push(ripple.href)}
        />
      )}
    </motion.div>
  );
}
