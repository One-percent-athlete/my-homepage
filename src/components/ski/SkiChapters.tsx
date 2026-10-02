"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import SkiHero from "@/components/ski/SkiHero";
import SkiIntroduction from "@/components/ski/SkiIntroduction";
import SkiExpertise from "@/components/ski/SkiExpertise";
import SkiPackages from "@/components/ski/SkiPackages";
import SkiTestimonials from "@/components/ski/SkiTestimonials";
import SkiBooking from "@/components/ski/SkiBooking";
import SkiCTA from "@/components/ski/SkiCTA";


const tunnelCopy = {
 en:{instruction:"Scroll to navigate",labels:["On the mountain","Introduction","Expertise","Private lesson","Group lesson","Guided tour","Booking","Stories","Your next run"]},
 ja:{instruction:"スクロールして移動",labels:["雪山へ","紹介","指導の専門性","プライベートレッスン","グループレッスン","ガイドツアー","予約","体験談","次の滑りへ"]},
 zh:{instruction:"滚动探索",labels:["前往雪山","介绍","专业指导","私人课程","团体课程","导游之旅","预约","体验故事","下一次滑行"]},
};
export function useSkiJourney() {
  const { language } = useLanguage();

  const t = tunnelCopy[language];
  return {labels:t.labels,instruction:t.instruction,content:<>
      <SkiHero language={language} />
      <div className="tunnel-chapter tunnel-ski-introduction"><SkiIntroduction language={language} /></div>
      <div className="tunnel-chapter tunnel-ski-expertise"><SkiExpertise language={language} /></div>
      {[0,1,2].map(index => <div key={index} className="tunnel-chapter tunnel-ski-packages"><SkiPackages language={language} packageIndex={index}/></div>)}
      <div className="tunnel-chapter tunnel-ski-booking"><SkiBooking language={language} /></div>
      <div className="tunnel-chapter tunnel-ski-testimonials"><SkiTestimonials language={language} /></div>
      <div className="tunnel-chapter tunnel-ski-cta"><SkiCTA language={language} /></div>
    </>};
}
