"use client";

import FloatingButtons from "../../components/FloatingButtons";
import Footer from "@/components/Footer";
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
      <FloatingButtons />
      
      <div className="travel-world relative min-h-screen">
        {/* Hero Section */}
        <TravelHero scrollY={scrollY} language={language} />

        {/* Destinations Grid */}
        <DestinationsGrid language={language} />

        <div className="travel-story-stack">
          <ParallaxSection
            image="/images/petra.jpg"
            title="Breathtaking views."
            subtitle="Let nature remind you how small the world makes you feel."
            location="PETRA · JORDAN"
            index={0}
          />
          <ParallaxSection
            image="/images/srilanka.jpg"
            title="Follow the unfamiliar."
            subtitle="Every step into somewhere new brings back a story worth keeping."
            location="SRI LANKA"
            index={1}
          />
          <ParallaxSection
            image="/images/patagonia.jpg"
            title="Keep going outward."
            subtitle="The edge of the map is usually where perspective begins."
            location="PATAGONIA"
            index={2}
          />
        </div>

        <WhyMeSection language={language} />

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
