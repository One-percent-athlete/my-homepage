"use client";

import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import { useLanguage } from "@/app/context/LanguageContext";

// Component imports
import SkiHero from "@/components/ski/SkiHero";
import SkiIntroduction from "@/components/ski/SkiIntroduction";
import SkiExpertise from "@/components/ski/SkiExpertise";
import SkiPackages from "@/components/ski/SkiPackages";
import SkiTestimonials from "@/components/ski/SkiTestimonials";
import SkiBooking from "@/components/ski/SkiBooking";
import SkiCTA from "@/components/ski/SkiCTA";

export default function SkiContent() {
  const { language } = useLanguage();

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen text-gray-800">
        {/* Rich Depth Background */}
        <div className="fixed inset-0 -z-10">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-sky-900" />
          
          {/* Depth Layer 1 - Large Mountain-like Shapes */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-800/30 via-transparent to-transparent" />
          
          {/* Depth Layer 2 - Mid-ground Elements */}
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-blue-800/20 via-transparent to-transparent transform -translate-x-1/2" />
          
          {/* Depth Layer 3 - Floating Depth Elements */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-sky-700/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-blue-600/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-1/4 h-1/4 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl" />
          
          {/* Light Accents */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-sky-400/5 to-transparent rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-300/5 to-transparent rounded-full" />
          
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        </div>
        
        {/* Hero Section */}
        <SkiHero language={language} />

        <main className="container mx-auto px-6 py-16 space-y-20">
          {/* Introduction */}
          <SkiIntroduction language={language} />

          {/* Expertise Section */}
          <SkiExpertise language={language} />

          {/* Packages Section */}
          <SkiPackages language={language} />

          {/* Booking Steps Section */}
          <SkiBooking language={language} />

          {/* Testimonials Section */}
          <SkiTestimonials language={language} />

          {/* Call to Action */}
          <SkiCTA language={language} />
        </main>

        {/* Floating Buttons */}
        <FloatingButtons />
      </div>
      <Footer />
    </>
  );
}