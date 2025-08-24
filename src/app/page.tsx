"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import RippleTransition from "../components/RippleTransition";

export default function HomePage() {
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number; href: string } | null>(null);

  const languages = [
    { name: "English", href: "/en", gradient: "from-blue-500 to-blue-700" },
    { name: "日本語", href: "/ja", gradient: "from-red-500 to-red-700" },
    { name: "中文", href: "/zh", gradient: "from-green-500 to-green-700" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, href: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setRipple({ x, y, href });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 px-4 relative overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-800 text-center">
        Select Your Language
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl">
        {languages.map((lang) => (
          <motion.button
            key={lang.href}
            onClick={(e) => handleClick(e, lang.href)}
            className={`flex-1 py-6 bg-gradient-to-r ${lang.gradient} text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform text-xl`}
          >
            {lang.name}
          </motion.button>
        ))}
      </div>

      {ripple && (
        <RippleTransition
          x={ripple.x}
          y={ripple.y}
          onComplete={() => router.push(ripple.href)}
        />
      )}
    </div>
  );
}
