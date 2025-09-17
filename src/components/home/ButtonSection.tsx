"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import RippleTransition from "../RippleTransition";
import '@/app/globals.css';

export default function ButtonSection() {
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number; href: string } | null>(null);

  const services = [
    { icon: "💻", label: "Multilingual Web Development", href: "/web" },
    { icon: "🌐", label: "Online Travel Consulting", href: "/travel" },
    { icon: "⛷️", label: "Ski Lesson & Guide Booking", href: "/ski" },
    { icon: "✍️", label: "Read My Blog", href: "/blog" },
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
      className="relative z-20 flex flex-wrap justify-center gap-6 w-full max-w-2xl"
    >
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
          {/* Icon - disappears on hover */}
          <span className="relative z-10 text-4xl md:text-5xl transition-opacity duration-300 group-hover:opacity-0">
            {service.icon}
          </span>

          {/* Hover background and text */}
          <span
            className="absolute inset-0 bg-yellow-300 scale-0 rounded-full
                       transition-transform duration-300 ease-in-out origin-center
                       group-hover:scale-100 group-hover:delay-100"
          ></span>
          <span
            className="absolute z-10 text-center text-sm md:text-base font-bold text-black opacity-0
                       transition-opacity duration-200 ease-in-out
                       group-hover:opacity-100 group-hover:delay-200"
          >
            {service.label}
          </span>
        </motion.button>
      ))}

        {ripple && (
        <RippleTransition
          x={ripple.x}
          y={ripple.y}
          colorClass="bg-yellow-500"
          borderClass="border-black"
          duration={0.4}
          onComplete={() => router.push(ripple.href)}
        />
      )}
    </motion.div>
  );
}