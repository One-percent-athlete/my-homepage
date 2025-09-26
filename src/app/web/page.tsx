"use client";

import FloatingButtons from '../../components/FloatingButtons';
import { motion, backOut, easeInOut } from 'framer-motion';
import WebBackground from '../../components/web/WebBackground';
import LogoShowcase from '../../components/web/LogoShowcase';
import SkillCardGrid from '../../components/web/SkillCardGrid';
import ProjectCardGrid from '../../components/web/ProjectCardGrid';
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

import { useState, useEffect } from 'react';


export default function Web() {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 500); // delay before showing
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <CustomCursor />
      <FloatingButtons />

      {/* Fixed background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <WebBackground />
      </div>

      {/* Scrollable main content */}
      <div className="w-full min-h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-auto scrollbar-hide">

        {/* Hero Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center relative z-10">
          <motion.header
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold text-teal-400 mb-4 tracking-tight">
              Bridges to a Global Audience
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-neutral-300">
              Your business has a global vision. We build the digital foundation to make it a reality. From elegant design to seamless functionality, we create websites that speak your customers&apos; language&mdash;literally.
            </p>
            {/* Neon Button */}
              <div
                className={`mt-8 transition-all duration-700 ease-out ${
                  showButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <a href="/contact" className="neon-btn relative">
                  <h2 className="text-3xl md:text-4xl font-semibold">Reach Out Now</h2>
                  <span></span><span></span><span></span><span></span>
                </a>
              </div>
          </motion.header>

          {/* Logo Showcase */}
          <div className="w-full py-4 px-4 sm:px-6 md:px-8">
            <LogoShowcase />
          </div>
        </section>

        {/* My Skills Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-12 text-teal-400">My Skills</h2>
            <SkillCardGrid />
          </div>
        </section>

        {/* Projects Section */}
        <section className="snap-start w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-12 text-teal-400">Projects</h2>
            <ProjectCardGrid />
          </div>
        </section>

       <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-8 bg-transparent text-center relative z-10">
        <motion.h2
        className="text-5xl sm:text-6xl font-extrabold mb-6 text-teal-400 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        Ready to Start Your Project?
      </motion.h2>

      <motion.p
        className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto text-neutral-300"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
      >
        Let’s build something amazing together. Get in touch today and bring your vision to life.
      </motion.p>

      <motion.a
        href="/contact"
        className="px-10 py-5 rounded-full bg-teal-400 text-white font-bold text-xl shadow-[0_0_25px_cyan] hover:shadow-[0_0_40px_cyan] transition-all duration-300 ease-in-out cursor-none"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: backOut }}
      >
        Contact Me
      </motion.a>
      </section>



        

      </div>

      {/* Footer outside scroll-snap container */}
      <Footer />
    </>
  );
}
