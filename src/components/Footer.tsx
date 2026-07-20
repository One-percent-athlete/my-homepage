"use client";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaLine,
  FaWeixin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const footerNote = { en:"Built with love · Powered by Next.js & Tailwind CSS", ja:"心を込めて制作 · Next.js & Tailwind CSS で構築", zh:"用心打造 · 基于 Next.js 与 Tailwind CSS" }[language];
  // Same color themes as FloatingButtons
  const themes = {
    "/": { border: "border-blue-500", text: "text-blue-500", shadow: "shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]" },
    "/web": { border: "border-teal-400", text: "text-teal-400", shadow: "shadow-[0_0_10px_rgba(45,212,191,0.5)] hover:shadow-[0_0_20px_rgba(45,212,191,0.7)]" },
    "/travel": { border: "border-orange-400", text: "text-orange-400", shadow: "shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,0.7)]" },
    "/ski": { border: "border-sky-400", text: "text-sky-400", shadow: "shadow-[0_0_10px_rgba(56,189,248,0.5)] hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]" },
    "/blog": { border: "border-purple-400", text: "text-purple-400", shadow: "shadow-[0_0_10px_rgba(192,132,252,0.5)] hover:shadow-[0_0_20px_rgba(192,132,252,0.7)]" },
    "/contact": { border: "border-yellow-400", text: "text-yellow-400", shadow: "shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,0.7)]" },
  };

  const pathname = usePathname();
  const currentTheme = themes[pathname as keyof typeof themes] || themes["/"];

  const contactLinks = [
    { icon: FaEnvelope, href: "mailto:one.percent.athlete@gmail.com" },
    { icon: FaPhoneAlt, href: "tel:+8107045618976" },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/One-percent-athlete" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
    { icon: FaInstagram, url: "https://www.instagram.com/ryu.free.spirit/" },
    { icon: FaFacebook, url: "https://www.facebook.com/ryu.suzuki.super/" },
    { icon: FaLine, url: "https://line.me/ti/p/hkL8_yg15L" },
    { icon: FaWeixin, url: "https://wechat/" },
  ];

  return (
    <footer
      className={`relative w-full text-gray-300 bg-gray-800 border-t-4 ${currentTheme.border} overflow-x-hidden pt-8 md:pt-16 md:pb-24 px-4 transition-colors duration-500`}
    >
      {/* Background text */}
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  font-extrabold text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[4vw]
                  select-none pointer-events-none text-center break-words"
        style={{
          color: "rgba(255, 204, 0, 0.15)",
          textShadow: "2px 2px 20px rgba(255,204,0,0.3)",
          lineHeight: 1.1,
        }}
      >
        ONE PERCENT 37X
      </h1>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-6 pb-10">
        {/* Links container */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-[220px] sm:max-w-none">
          {/* Contact links */}
          {contactLinks.map(({ icon: Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              className={`flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 
                        rounded-full border ${currentTheme.border} ${currentTheme.text} md:cursor-none
                        bg-transparent ${currentTheme.shadow}
                        transition transform hover:scale-110 duration-300`}
            >
              <Icon size={18} className="md:w-5 md:h-5" />
            </a>
          ))}

          {/* Social links */}
          {socialLinks.map(({ icon: Icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 
                        rounded-full border ${currentTheme.border} ${currentTheme.text} md:cursor-none
                        bg-transparent ${currentTheme.shadow}
                        transition transform hover:scale-110 duration-300`}
            >
              <Icon size={18} className="md:w-5 md:h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-xs sm:text-sm text-gray-400 md:mt-10 relative z-10">
        {footerNote}
      </div>
    </footer>
  );
}
