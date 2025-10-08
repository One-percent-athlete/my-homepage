"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const themes = {
  '/': { border: 'border-blue-500', text: 'text-blue-500', hover: 'hover:text-blue-500' },
  '/web': { border: 'border-teal-400', text: 'text-teal-400', hover: 'hover:text-teal-400' },
  '/travel': { border: 'border-orange-400', text: 'text-orange-400', hover: 'hover:text-orange-400' },
  '/ski': { border: 'border-sky-400', text: 'text-sky-400', hover: 'hover:text-sky-400' },
  '/blog': { border: 'border-purple-400', text: 'text-purple-400', hover: 'hover:text-purple-400' },
  '/contact': { border: 'border-yellow-400', text: 'text-yellow-400', hover: 'hover:text-yellow-400' },
};

// Multilingual labels
const buttonLabels: Record<string, { en: string; ja: string; zh: string }> = {
  home: { en: 'Home', ja: 'ホーム', zh: '首页' },
  web: { en: 'Web', ja: 'ウェブ', zh: '网页' },
  travel: { en: 'Travel', ja: '旅行', zh: '旅行' },
  ski: { en: 'Ski', ja: 'スキー', zh: '滑雪' },
  blog: { en: 'Blog', ja: 'ブログ', zh: '博客' },
  language: { en: 'Language', ja: '言語', zh: '语言' },
};

export default function FloatingButtons() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes[pathname as keyof typeof themes] || themes['/'];

  const buttonData = [
    { href: '/', emoji: '🏠', key: 'home' },
    { href: '/web', emoji: '💻', key: 'web' },
    { href: '/travel', emoji: '✈️', key: 'travel' },
    { href: '/ski', emoji: '⛷️', key: 'ski' },
    { href: '/blog', emoji: '✍️', key: 'blog' },
    { href: '#', emoji: '🌐', key: 'language', isDropdown: true },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-8 right-8 z-[999]">
      <div className="flex flex-col space-y-4">
        {buttonData.map((button) => {
          if (button.isDropdown) {
            return (
              <div
                key="language-dropdown"
                ref={dropdownRef}
                className="relative w-12 h-12 flex items-center justify-center rounded-full border border-yellow-400 shadow-lg cursor-none transition-all duration-300 bg-transparent"
                onClick={() => setShowLangDropdown(prev => !prev)}
              >
                <span className="text-xl">{button.emoji}</span>

                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 right-14 w-32 bg-transparent border-2 border-yellow-400 rounded-lg flex flex-col p-2 shadow-lg"
                    >
                      {['en', 'ja', 'zh'].map((lang) => (
                        <button
                          key={lang}
                          className="py-1 px-2 text-left hover:bg-yellow-400 hover:text-black rounded cursor-none"
                          onClick={() => {
                            setLanguage(lang as 'en' | 'ja' | 'zh');
                            setShowLangDropdown(false);
                          }}
                        >
                          {lang === 'en' ? 'English' : lang === 'ja' ? '日本語' : '中文'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // Skip current page
          if (button.href === pathname) return null;

          return (
            <Link
              key={button.href}
              href={button.href}
              className={`group w-12 h-12 flex items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-150 cursor-none
                bg-transparent ${currentTheme.border} ${currentTheme.hover} ${currentTheme.text}`}
            >
              <span className="text-xl group-hover:hidden transition-opacity duration-300">
                {button.emoji}
              </span>
              <span className="hidden group-hover:block transition-all duration-300 whitespace-nowrap text-sm font-semibold">
                {buttonLabels[button.key][language]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
