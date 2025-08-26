"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageItem = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape"; // for styling
};


const images: ImageItem[] = [
  { src: "/gallery/1.jpg", alt: "Japan Adventure", orientation: "landscape" },
  { src: "/gallery/2.jpg", alt: "Skiing in the Alps", orientation: "landscape" },
  { src: "/gallery/3.jpg", alt: "Desert Safari", orientation: "landscape" },
  { src: "/gallery/4.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/5.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/6.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/7.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/8.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/9.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/10.jpg", alt: "Snowboarding", orientation: "portrait" },
  { src: "/gallery/11.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/12.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/13.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/14.jpg", alt: "Snowboarding", orientation: "landscape" },
  { src: "/gallery/0.jpg", alt: "Snowboarding", orientation: "landscape" },

]

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev! + 1) % images.length);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-200 via-green-200 to-blue-300 p-8">
      {/* Title */}
      <motion.h1
        className="text-6xl font-extrabold text-center mb-14 text-purple-700 drop-shadow-xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        ✨ My Colorful Journeys ✨
      </motion.h1>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={img.orientation === "landscape" ? 400 : 800}
              className={`object-cover w-full rounded-xl transition-transform duration-500 hover:scale-105 ${
                img.orientation === "landscape" ? "h-64" : "h-96"
              }`}
            />
            {/* Caption */}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              {img.alt}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-6xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white hover:text-yellow-400"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={36} />
              </button>

              {/* Image */}
              <motion.img
                key={images[selectedIndex].src}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="rounded-xl max-h-[85vh] mx-auto shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />

              {/* Arrows */}
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400"
                onClick={() =>
                  setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
                }
              >
                <ChevronLeft size={44} />
              </button>
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400"
                onClick={() => setSelectedIndex((prev) => (prev! + 1) % images.length)}
              >
                <ChevronRight size={44} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
