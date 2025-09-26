"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Define theme colors for each page
const themes = {
  '/': {
    border: 'border-blue-500',
    text: 'text-blue-500',
    hover: 'hover:text-blue-500',
    activeBg: 'bg-blue-500',
    activeText: 'text-white'
  },
  '/travel': {
    border: 'border-green-500',
    text: 'text-green-500',
    hover: 'hover:text-green-500',
    activeBg: 'bg-green-500',
    activeText: 'text-white'
  },
  '/ski': {
    border: 'border-cyan-500',
    text: 'text-cyan-500',
    hover: 'hover:text-cyan-500',
    activeBg: 'bg-cyan-500',
    activeText: 'text-white'
  },
  '/blog': {
    border: 'border-purple-500',
    text: 'text-purple-500',
    hover: 'hover:text-purple-500',
    activeBg: 'bg-purple-500',
    activeText: 'text-white'
  },
  '/web': {
    border: 'border-teal-400',
    text: 'text-teal-400',
    hover: 'hover:text-teal-400',
    activeBg: 'bg-teal-400',
    activeText: 'text-white'
  }
};

export default function FloatingButtons() {
  const pathname = usePathname();

  // Fix: Use a type assertion to tell TypeScript that pathname is a valid key
  const currentTheme = themes[pathname as keyof typeof themes] || themes['/']; 

  const buttonData = [
    { href: '/', emoji: '🏠', text: 'Home' },
    { href: '/web', emoji: '💻', text: 'Web' },
    { href: '/travel', emoji: '🌐', text: 'Travel' },
    { href: '/ski', emoji: '⛷️', text: 'Ski' },
    { href: '/blog', emoji: '✍️', text: 'Blog' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <div className="flex flex-col space-y-4">
        {buttonData
          .filter(button => button.href !== pathname)
          .map(button => (
            <Link
              key={button.href}
              href={button.href}
              className={`group w-12 h-12 flex items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-200 cursor-none
                bg-transparent ${currentTheme.border} ${currentTheme.hover} ${currentTheme.text} `}
            >
              <span className="text-xl group-hover:hidden transition-opacity duration-300">
                {button.emoji}
              </span>
              <span className="hidden group-hover:block transition-all duration-300 whitespace-nowrap text-sm font-semibold">
                {button.text}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}