"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";
import TravelHero from "@/components/travel/TravelHero";
import DestinationsGrid from "@/components/travel/DestinationsGrid";
import ParallaxSection from "@/components/travel/ParallaxSection";
import WhyMeSection from "@/components/travel/WhyMeSection";
import TravelCTA from "@/components/travel/TravelCTA";
import LogoShowcase from "@/components/travel/LogoShowcase";

const tunnelCopy = {
  en: { instruction: "Scroll to navigate", labels: ["Field log", "Destinations", "Petra", "Sri Lanka", "Patagonia", "Experience", "Start an adventure", "Countries explored"] },
  ja: { instruction: "スクロールして移動", labels: ["旅の記録", "目的地", "ペトラ", "スリランカ", "パタゴニア", "経験", "冒険を始める", "訪れた国"] },
  zh: { instruction: "滚动探索", labels: ["旅行日志", "目的地", "佩特拉", "斯里兰卡", "巴塔哥尼亚", "经历", "开始冒险", "探索过的国家"] },
};

export default function TravelContent() {
  const { language } = useLanguage();
  const t = tunnelCopy[language];

  return <div className="travel-world">
    <FloatingButtons />
    <main className="travel-destination-layout">
      <TravelHero language={language} />
      <div className="travel-destinations"><DestinationsGrid language={language} /></div>
      <ParallaxSection image="/images/petra.jpg" title="Breathtaking views." subtitle="Let nature remind you how small the world makes you feel." location="PETRA · JORDAN" index={0} total={5} />
      <ParallaxSection image="/images/srilanka.jpg" title="Follow the unfamiliar." subtitle="Every step into somewhere new brings back a story worth keeping." location="SRI LANKA" index={1} total={5} />
      <ParallaxSection image="/images/patagonia.jpg" title="Keep going outward." subtitle="The edge of the map is usually where perspective begins." location="PATAGONIA" index={2} total={5} />
      <WhyMeSection language={language} index={3} total={5} />
      <TravelCTA language={language} index={4} total={5} />
      <section className="tunnel-flags"><h2>{t.labels[7]}</h2><LogoShowcase direction="right" /><LogoShowcase direction="left" /></section>
    </main>
  </div>;
}
