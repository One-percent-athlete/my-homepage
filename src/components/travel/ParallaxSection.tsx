"use client";

import { motion } from "framer-motion";
import TravelParallaxBackground from "./TravelParallaxBackground";

interface ParallaxSectionProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function ParallaxSection({ image, title, subtitle }: ParallaxSectionProps) {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <TravelParallaxBackground image={image} />
      
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      
      <motion.div
        initial={{ opacity: 0.82, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
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
