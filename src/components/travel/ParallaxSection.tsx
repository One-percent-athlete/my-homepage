"use client";

import { motion } from "framer-motion";

interface ParallaxSectionProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function ParallaxSection({ image, title, subtitle }: ParallaxSectionProps) {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background without scale animation - immediately in focus */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />
      
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-6xl font-black drop-shadow-2xl text-orange-400 mb-6">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 font-medium drop-shadow-lg">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}