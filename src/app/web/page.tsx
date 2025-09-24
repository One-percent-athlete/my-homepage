"use client";

import FloatingButtons from '../../components/FloatingButtons';
import { motion } from 'framer-motion';
import WebBackground from '../../components/web/WebBackground';
import LogoShowcase from '../../components/web/LogoShowcase';
import SkillCardGrid from '../../components/web/SkillCardGrid';
import ProjectCardGrid from '../../components/web/ProjectCardGrid';
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Web() {
  return (
    <>
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
          </motion.header>

          {/* Logo Showcase */}
          <div className="w-full py-4 px-4 sm:px-6 md:px-8">
            <LogoShowcase />
          </div>
        </section>

        {/* My Skills Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-teal-400">My Skills</h2>
            <SkillCardGrid />
          </div>
        </section>

        {/* Projects Section */}
        <section className="snap-start w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-teal-400">Projects</h2>
            <ProjectCardGrid />
          </div>
        </section>

        {/* Contact Section */}
        <section className="snap-start w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <Contact />
        </section>

      </div>

      {/* Footer outside scroll-snap container */}
      <Footer />
    </>
  );
}
