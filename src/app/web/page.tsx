"use client";

import FloatingButtons from '../../components/FloatingButtons';
import { motion } from 'framer-motion';
import WebBackground from '../../components/web/WebBackground';
import LogoShowcase from '../../components/web/LogoShowcase';
import SkillCardGrid from '../../components/web/SkillCardGrid';
import ProjectCardGrid from '../../components/web/ProjectCardGrid'; // Import the new component
import Contact from "@/components/Contact";

export default function Web() {
  return (
    <>
      <FloatingButtons />

      {/* Background container with the animated component */}
      <div className="fixed top-0 left-0 w-full h-full">
        <WebBackground />
      </div>

      {/* Main container with scroll-snap */}
      <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        
        {/* Hero Section */}
        <section className="snap-start w-full h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
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
          </motion.header>
          {/* Logo Showcase at the bottom of the Hero section */}
          <div className="absolute bottom-0 w-full py-4 px-8">
            <LogoShowcase />
          </div>
        </section>

        {/* My Skills Section */}
        <section className="snap-start w-full h-screen flex flex-col items-center justify-center p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-teal-400">My Skills</h2>
            <SkillCardGrid />
          </div>
        </section>

        {/* --- Removed Our Process Section --- */}

        {/* Projects Section */}
        <section className="snap-start w-full h-screen flex items-center justify-center p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">Projects</h2>
            <ProjectCardGrid /> {/* Use the new component here */}
          </div>
        </section>

        {/* Contact Section */}
        <section className="snap-start w-full h-screen flex items-center justify-center p-8 relative z-10">
            <Contact />
        </section>
        <LogoShowcase />
      </div>
    </>
  );
}