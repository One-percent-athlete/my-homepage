"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";
import SkiHero from "@/components/ski/SkiHero";
import SkiIntroduction from "@/components/ski/SkiIntroduction";
import SkiExpertise from "@/components/ski/SkiExpertise";
import SkiPackages from "@/components/ski/SkiPackages";
import SkiTestimonials from "@/components/ski/SkiTestimonials";
import SkiBooking from "@/components/ski/SkiBooking";
import SkiCTA from "@/components/ski/SkiCTA";


export default function SkiContent() {
  const { language } = useLanguage();

  return <div className="ski-world">
    <FloatingButtons />
    <main className="ski-destination-layout">
      <SkiHero language={language} />
      <div className="ski-content-panel"><SkiIntroduction language={language} /></div>
      <div className="ski-content-panel"><SkiExpertise language={language} /></div>
      <div className="ski-content-panel"><SkiPackages language={language} /></div>
      <div className="ski-content-panel"><SkiBooking language={language} /></div>
      <div className="ski-content-panel"><SkiTestimonials language={language} /></div>
      <div className="ski-content-panel"><SkiCTA language={language} /></div>
    </main>
  </div>;
}
