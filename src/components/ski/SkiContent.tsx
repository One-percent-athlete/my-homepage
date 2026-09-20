"use client";

import FloatingButtons from "@/components/FloatingButtons";
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
      <div className="ski-world min-h-screen text-gray-800">
        {/* Hero Section */}
        <SkiHero language={language} />

        <main className="container mx-auto px-6 py-16 space-y-20">
          {/* Introduction */}
          <div data-flight-panel><SkiIntroduction language={language} /></div>

          {/* Expertise Section */}
          <div data-flight-panel><SkiExpertise language={language} /></div>

          {/* Packages Section */}
          <div data-flight-panel><SkiPackages language={language} /></div>

          {/* Booking Steps Section */}
          <div data-flight-panel><SkiBooking language={language} /></div>

          {/* Testimonials Section */}
          <div data-flight-panel><SkiTestimonials language={language} /></div>

          {/* Call to Action */}
          <div data-flight-panel><SkiCTA language={language} /></div>
        </main>

        {/* Floating Buttons */}
        <FloatingButtons />
      </div>
    </>
  );
}
