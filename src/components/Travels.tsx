"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";

// --- Countries list ---
const countries = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Belgium" },
  { code: "bo", name: "Bolivia" },
  { code: "br", name: "Brazil" },
  { code: "bw", name: "Botswana" },
  { code: "ca", name: "Canada" },
  { code: "cl", name: "Chile" },
  { code: "cn", name: "China" },
  { code: "co", name: "Colombia" },
  { code: "cr", name: "Costa Rica" },
  { code: "hr", name: "Croatia" },
  { code: "cz", name: "Czechia" },
  { code: "ec", name: "Ecuador" },
  { code: "eg", name: "Egypt" },
  { code: "sv", name: "El Salvador" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "gr", name: "Greece" },
  { code: "hu", name: "Hungary" },
  { code: "is", name: "Iceland" },
  { code: "in", name: "India" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "jo", name: "Jordan" },
  { code: "ke", name: "Kenya" },
  { code: "kg", name: "Kyrgyzstan" },
  { code: "kz", name: "Kazakhstan" },
  { code: "li", name: "Liechtenstein" },
  { code: "lk", name: "Sri Lanka" },
  { code: "my", name: "Malaysia" },
  { code: "mm", name: "Myanmar" },
  { code: "mx", name: "Mexico" },
  { code: "na", name: "Namibia" },
  { code: "nl", name: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "ni", name: "Nicaragua" },
  { code: "np", name: "Nepal" },
  { code: "om", name: "Oman" },
  { code: "pa", name: "Panama" },
  { code: "py", name: "Paraguay" },
  { code: "pe", name: "Peru" },
  { code: "pt", name: "Portugal" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "sg", name: "Singapore" },
  { code: "sk", name: "Slovakia" },
  { code: "si", name: "Slovenia" },
  { code: "za", name: "South Africa" },
  { code: "es", name: "Spain" },
  { code: "ch", name: "Switzerland" },
  { code: "tw", name: "Taiwan" },
  { code: "th", name: "Thailand" },
  { code: "tr", name: "Turkey" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "uy", name: "Uruguay" },
  { code: "vn", name: "Vietnam" },
  { code: "xk", name: "Kosovo" },
  { code: "ba", name: "Bosnia & Herzegovina" },
  { code: "mk", name: "North Macedonia" },
  { code: "me", name: "Montenegro" },
  { code: "mc", name: "Monaco" },
  { code: "va", name: "Vatican" },
  { code: "kh", name: "Cambodia" },
  { code: "la", name: "Laos" },
  { code: "bd", name: "Bangladesh" },
].sort((a, b) => a.name.localeCompare(b.name));


interface TravelsProps {
  data: {
    title: string;
    description: string;
  };
}
// --- Motion variants ---
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// --- Component ---
export default function Travels({ data }: TravelsProps) {

  const [circles, setCircles] = useState<{ top: number; left: number; size: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }).map(() => ({
      top: Math.random() * 80,
      left: Math.random() * 90,
      size: 10 + Math.random() * 20,
    }));
    setCircles(generated);
  }, []);

  const countryGrid = useMemo(
    () =>
      countries.map((country, i) => (
        <motion.div
          key={i}
          variants={item}
          className="flex flex-col items-center cursor-pointer hover:scale-125 hover:rotate-3 transition-transform duration-300"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4 + i * 0.05 }}
        >
          <span className={`fi fi-${country.code} text-4xl`}></span>
          <span className="text-sm text-gray-300 mt-1">{country.code.toUpperCase()}</span>
        </motion.div>
      )),
    []
  );

  return (
    <section id="travels" className="relative py-20 px-4 overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        style={{
          backgroundImage: `url('/images/moon.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating circles */}
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 bg-yellow-500"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
          }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [0, 180, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}

      <h2 className="text-4xl font-bold mb-6 text-white text-center relative z-10">{data.title}</h2>
      <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto text-center relative z-10">
        {data.description}
      </p>

      <motion.div
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-center items-center max-w-5xl mx-auto relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {countryGrid}
      </motion.div>
    </section>
  );
}
