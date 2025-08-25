"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Travels from "@/components/Travels";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { FaArrowUp } from "react-icons/fa";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function HomePage() {
  const [showTop, setShowTop] = useState(false);

  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-colors duration-500 scroll-smooth">
      <Navbar />
      <ScrollIndicator />
      <Hero />
      <Quote />
      <Travels />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-yellow-400 text-gray-900 shadow-xl hover:scale-110 transition z-50"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
