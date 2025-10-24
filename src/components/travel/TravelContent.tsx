"use client";

import FloatingButtons from "../../components/FloatingButtons";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/app/context/LanguageContext";

// Component imports
import TravelHero from "@/components/travel/TravelHero";
import DestinationsGrid from "@/components/travel/DestinationsGrid";
import ParallaxSection from "@/components/travel/ParallaxSection";
import WhyMeSection from "@/components/travel/WhyMeSection";
import TravelCTA from "@/components/travel/TravelCTA";
import LogoShowcase from "@/components/travel/LogoShowcase";

interface TravelContentProps {
  scrollY: number;
}

export default function TravelContent({ scrollY }: TravelContentProps) {
  const { language } = useLanguage();

  return (
    <>
      <CustomCursor />
      <FloatingButtons />
      
      <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 overflow-hidden">
        {/* Hero Section */}
        <TravelHero scrollY={scrollY} language={language} />

        {/* Destinations Grid */}
        <DestinationsGrid language={language} />

        {/* First Parallax Section */}
        <ParallaxSection
          image="/images/petra.jpg"
          title="🌄 Breathtaking Views"
          subtitle="Let nature remind you how small the world makes you feel."
        />

        {/* Why Me Section */}
        <WhyMeSection language={language} />

        {/* Second Parallax Section */}
        <ParallaxSection
          image="/images/srilanka.jpg"
          title="🌍 Endless Adventures"
          subtitle="Every step brings a new story to tell."
        />

        {/* Logo Showcase */}
        <LogoShowcase direction="right" />

        {/* Call to Action */}
        <TravelCTA language={language} />

        {/* Final Logo Showcase */}
        <LogoShowcase direction="left" />
      </div>

      <Footer />
    </>
  );
}