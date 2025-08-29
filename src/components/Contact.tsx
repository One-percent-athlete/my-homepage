"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { ContactData, ContactEntry } from "../app/i18n";
import LogoShowcase from "./LogoShowcase";

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  // Map icon strings to React components
  const iconMap: Record<ContactEntry["icon"], React.ReactElement> = {
    envelope: <FaEnvelope aria-label="Email" />,
    phone: <FaPhoneAlt aria-label="Phone" />,
    github: <FaGithub aria-label="GitHub" />,
    linkedin: <FaLinkedin aria-label="LinkedIn" />,
    instagram: <FaInstagram aria-label="Instagram" />,
    facebook: <FaFacebook aria-label="Facebook" />,
  };

  // Particle effect
  type Particle = { startX: number; startY: number; endX: number; endY: number; duration: number; };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const particleData: Particle[] = Array.from({ length: 20 }).map(() => ({
      startX: Math.random() * vw,
      startY: Math.random() * vh,
      endX: Math.random() * vw,
      endY: Math.random() * vh,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-6 text-center overflow-hidden text-white"
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
          initial={{ x: p.startX, y: p.startY, opacity: 0.5, scale: 1 }}
          animate={{ x: p.endX, y: p.endY, opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: p.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}

      {/* Title & Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 relative z-10"
      >
        {data.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg mb-12 text-gray-300 max-w-xl mx-auto relative z-10"
      >
        {data.subtitle}
      </motion.p>

      {/* Contacts */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 relative z-10"
      >
        {data.contacts.map((contact) => (
          <motion.li
            key={contact.label}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center bg-gray-800/80 hover:bg-gray-700/80 rounded-3xl p-6 backdrop-blur-lg transition-all duration-300 hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50 hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-yellow-400 md:hover:border-yellow-400 md:hover:shadow-[0_0_40px_orange]
              shadow-[0_0_30px_orange] md:shadow-none border-1 border-yellow-400"
          >
            <span className="text-4xl mb-4 text-yellow-400">{iconMap[contact.icon]}</span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <a
              href={contact.link}
              className="text-gray-300 hover:text-yellow-400 transition-colors break-words"
            >
              {contact.value}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      {/* QR Codes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-10 relative z-10"
      >
        {data.qrcodes.map((qr) => (
          <motion.div
            key={qr.label}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-800/80 rounded-3xl p-4 backdrop-blur-lg hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50 hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-yellow-400 md:hover:border-yellow-400 md:hover:shadow-[0_0_40px_orange]
              shadow-[0_0_30px_orange] md:shadow-none border-1 border-yellow-400"
          >
            <Image
              src={qr.src}
              alt={`${qr.label} QR code`}
              className="mb-2 object-cover"
              width={128}
              height={128}
            />
            <span className="text-gray-300">{qr.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <LogoShowcase />
    </section>
  );
}
