"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface TravelParallaxBackgroundProps {
  image: string;
  opacity?: number;
}

export default function TravelParallaxBackground({ image, opacity = 1 }: TravelParallaxBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: backgroundRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.div
      ref={backgroundRef}
      aria-hidden="true"
      className="travel-parallax-background"
      style={{ backgroundImage: `url('${image}')`, opacity, y: reduceMotion ? 0 : y }}
    />
  );
}
