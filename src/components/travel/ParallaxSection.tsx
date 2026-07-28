"use client";

import { motion } from "framer-motion";
import TravelParallaxBackground from "./TravelParallaxBackground";

interface ParallaxSectionProps {
  image: string;
  title: string;
  subtitle: string;
  index: number;
  location: string;
}

export default function ParallaxSection({ image, title, subtitle, index, location }: ParallaxSectionProps) {
  return (
    <section
      className="travel-story-panel"
      style={{ "--panel-index": index } as React.CSSProperties}
    >
      <TravelParallaxBackground image={image} />
      
      <div className="travel-story-shade" />
      <div className="travel-story-edge" aria-hidden="true" />
      
      <motion.div
        initial={{ opacity: 0.85, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="travel-story-copy"
      >
        <div className="travel-story-meta"><span>0{index + 1}</span><i/><span>{location}</span></div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </motion.div>
      <span className="travel-story-count">0{index + 1} / 03</span>
    </section>
  );
}
