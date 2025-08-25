"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Social icons

// Navbar component
function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-gray-900 text-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">One Percent Journey</h1>

        {/* Centered navigation links */}
        <nav className="flex-1 flex justify-center space-x-8">
          <a href="#travels" className="hover:text-yellow-400 transition font-semibold">Travels</a>
          <a href="#skills" className="hover:text-yellow-400 transition font-semibold">Skills</a>
          <a href="#projects" className="hover:text-yellow-400 transition font-semibold">Projects</a>
          <a href="#contact" className="hover:text-yellow-400 transition font-semibold">Contact</a>
        </nav>

        {/* Right-side social media */}
        <div className="flex items-center space-x-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}

// Footer component remains the same
function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-gray-300 text-center">
      © 2025 Ryu. All rights reserved.
    </footer>
  );
}

// Main page
export default function EnglishPage() {
  const travels = 80;
  const skills = ["Freelance Engineer", "Web App Developer", "Ski Instructor"];

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-24">
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Ryu — Adventurer & Engineer</h1>
          <p className="text-lg md:text-xl mb-6">
            Freelance Engineer | Web App Developer | Ski Instructor | Visited {travels}+ Countries
          </p>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Floating icons or shapes */}
          <div className="w-64 h-64 relative">
            <motion.div
              className="absolute w-16 h-16 bg-yellow-400 rounded-full"
              animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-12 h-12 bg-white rounded-full top-20 left-20"
              animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Travel Section */}
      <section id="travels" className="py-20 px-4 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">My Travels</h2>
        <p className="text-lg mb-8">I’ve visited over {travels} countries around the world, exploring cultures and adventures.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          {[...Array(travels)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-yellow-400 rounded-full animate-pulse"></div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Skills & Experience</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl shadow-xl text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((proj) => (
            <motion.div
              key={proj}
              className="bg-gray-700 p-6 rounded-2xl shadow-xl w-64"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-xl mb-2">Project {proj}</h3>
              <p className="text-sm">Web app description goes here.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-8">Open for freelance projects or collaborations worldwide.</p>
        <a
          href="/contact"
          className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-2xl shadow-xl hover:scale-105 transition"
        >
          Contact Me
        </a>
      </section>

      <Footer />
    </div>
  );
}
