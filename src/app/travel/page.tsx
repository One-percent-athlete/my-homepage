"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingButtons from "../../components/FloatingButtons";
import Footer from "@/components/Footer";
import Image from "next/image";

// --- Full countries list ---
const countries = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Belgium" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "cl", name: "Chile" },
  { code: "cn", name: "China" },
  { code: "co", name: "Colombia" },
  { code: "cr", name: "Costa Rica" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "gr", name: "Greece" },
  { code: "is", name: "Iceland" },
  { code: "in", name: "India" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "ke", name: "Kenya" },
  { code: "mx", name: "Mexico" },
  { code: "nl", name: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "pt", name: "Portugal" },
  { code: "es", name: "Spain" },
  { code: "ch", name: "Switzerland" },
  { code: "th", name: "Thailand" },
  { code: "tr", name: "Turkey" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "vn", name: "Vietnam" },
].sort((a, b) => a.name.localeCompare(b.name));

export default function TravelPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // circle radius grows with scroll
  const baseRadius = 300;
  const radius = baseRadius + scrollY * 0.5;
  const opacity = Math.max(1 - scrollY / 2000, 0);

  // framer-motion scroll-based parallax
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <>
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 overflow-hidden text-white">
      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Hero Section with Flags Circle */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen z-10">
        {/* Flags circle */}
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity }}
            >
            <motion.div
                className="relative w-[700px] h-[700px]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            >
                {countries.map((country, i) => {
                const angle = (i / countries.length) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                    <motion.div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{ transform: `translate(${350 + x}px, ${350 + y}px)` }}
                    >
                    <span className={`fi fi-${country.code} text-2xl md:text-3xl`}></span>
                    </motion.div>
                );
                })}
            </motion.div>
        </motion.div>


        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold drop-shadow-lg"
        >
          ✈️ Discover Your Next Adventure
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-xl text-gray-300 max-w-2xl"
        >
          Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments. Where will your heart take you next?
        </motion.p>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Tropical Paradise",
            img: "/images/beach.jpg",
            desc: "Soak up the sun, feel the sand between your toes, and sip on fresh coconut water.",
          },
          {
            title: "Mountain Escape",
            img: "/images/mountain.jpg",
            desc: "Breathe in crisp air, chase waterfalls, and find peace among majestic peaks.",
          },
          {
            title: "City Lights",
            img: "/images/city.jpg",
            desc: "Get lost in buzzing streets, taste local delights, and dance the night away.",
          },
        ].map((place, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
          >
            <Image src={place.img} alt={place.title} className="rounded-lg" width={600} height={400} />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white">{place.title}</h3>
              <p className="mt-3 text-gray-300">{place.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Parallax Showcase */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/nature.jpg')",
            y: yParallax,
          }}
        />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-extrabold drop-shadow-xl">🌄 Breathtaking Views</h2>
          <p className="mt-4 text-xl text-gray-200">Let nature remind you how small the world makes you feel.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">❤️ Travelers Love It</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "The most magical trip of my life, everything was perfectly arranged!",
              name: "Sarah K.",
            },
            {
              quote: "I discovered hidden gems and met amazing people. Truly unforgettable.",
              name: "Daniel W.",
            },
            {
              quote: "From mountains to oceans, every moment felt like a dream.",
              name: "Emma L.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6"
            >
              <p className="italic text-gray-200">“{t.quote}”</p>
              <h4 className="mt-4 font-semibold text-cyan-300">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Parallax Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/adventure.jpg')",
            y: yParallax,
          }}
        />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-extrabold drop-shadow-xl">🌍 Endless Adventures</h2>
          <p className="mt-4 text-xl text-gray-200">Every step brings a new story to tell.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center px-6 py-24 bg-gradient-to-r from-cyan-700 to-indigo-800">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold drop-shadow-md"
        >
          🌍 The world is waiting for you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-300"
        >
          Pack your bags and let your soul wander. Adventure is just a heartbeat away.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 text-lg font-bold rounded-full bg-cyan-500 text-white shadow-lg hover:bg-cyan-600"
        >
          Start Exploring
        </motion.button>
      </section>
    </div>
    <Footer />
    </>
  );
}
