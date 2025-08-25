"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence, Variants, useMotionValue, useTransform } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useMotionValue(0); // motion value to track scroll

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const navLinks = [
    { name: "Travels", href: "#travels" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialIcons = [
    { href: "https://github.com/yourusername", icon: FaGithub },
    { href: "https://linkedin.com/in/yourusername", icon: FaLinkedin },
    { href: "https://twitter.com/yourusername", icon: FaTwitter },
  ];

  const mobileMenuVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, staggerChildren: 0.1 },
    },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const closeButtonVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Pulsating + drifting + rotating glow with parallax
  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotate: 0 },
    visible: {
      opacity: 1,
      scale: [0.95, 1, 0.95],
      x: [0, 10, -10, 0],
      y: [0, 8, -8, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    exit: { opacity: 0, scale: 0.9, rotate: 0, transition: { duration: 0.4 } },
  };

  // Parallax transforms based on scroll
  const glow1Y = useTransform(scrollY, [0, 500], [0, -20]);
  const glow2Y = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <header
      className={`fixed w-full z-50 transition-all ${
        scrolled ? "backdrop-blur bg-gray-900/80 shadow-lg" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Fade-in Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bold text-2xl tracking-wide"
        >
          One Percent Journey
        </motion.h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-white font-semibold hover:text-yellow-400 transition-colors
                after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {socialIcons.map(({ href, icon: Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-white hover:text-yellow-400 transition"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Floating Glow with parallax */}
            <motion.div
              className="fixed top-0 left-0 w-full h-screen z-30 pointer-events-none"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                style={{ y: glow1Y }}
                className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
                variants={glowVariants}
              />
              <motion.div
                style={{ y: glow2Y }}
                className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-2xl"
                variants={glowVariants}
              />
            </motion.div>

            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-gray-900/70 backdrop-blur-xl text-white flex flex-col justify-center py-24 px-6 z-40"
            >
              {/* Close button */}
              <motion.button
                onClick={() => setMobileOpen(false)}
                variants={closeButtonVariants}
                className="absolute top-6 right-6 text-white hover:text-yellow-400"
              >
                <FaTimes size={24} />
              </motion.button>

              {/* Links */}
              <div className="flex flex-col space-y-6 flex-1 justify-center">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={linkVariants}
                    className="relative text-lg font-semibold py-2 px-4 rounded-md bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 hover:shadow-inner transition-all overflow-hidden"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="absolute inset-0 bg-yellow-400 opacity-0 rounded-md hover:opacity-10 transition-all pointer-events-none"></span>
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Social Icons at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center space-x-6 mt-auto mb-8"
              >
                {socialIcons.map(({ href, icon: Icon }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-white hover:text-yellow-400 transition"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
