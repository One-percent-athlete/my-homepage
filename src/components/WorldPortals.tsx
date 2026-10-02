"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Camera, Compass, MountainSnow } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const worlds = [
  { href: "/travel", icon: Compass, image: "/images/patagonia.jpg" },
  { href: "/ski", icon: MountainSnow, image: "/images/ski3.jpg" },
  { href: "/blog", icon: BookOpen, image: "/images/petra.jpg" },
  { href: "/gallery", icon: Camera, image: "/images/main.jpg" },
];
const copy = {
  en: { kicker: "BEYOND THE BUILD LAB", title: "Explore my other worlds.", intro: "Different landscapes. Different stories. Choose where we go next.", names: ["Follow my travels", "Meet me on the mountain", "Read the journal", "Explore the gallery"], enter: "Enter world" },
  ja: { kicker: "開発ラボの、その先へ", title: "ほかの世界も覗いてみよう。", intro: "違う景色、違う物語。次に進む世界を選んでください。", names: ["旅の足跡を辿る", "雪山で会いましょう", "ジャーナルを読む", "写真の世界へ"], enter: "世界へ入る" },
  zh: { kicker: "开发实验室之外", title: "探索我的其他世界。", intro: "不同的风景，不同的故事。选择下一站。", names: ["跟随我的旅行", "在雪山相见", "阅读日志", "探索相册"], enter: "进入世界" },
};

export default function WorldPortals() {
  const { language } = useLanguage();
  const t = copy[language];
  return <section className="other-worlds" id="other-worlds">
    <p className="world-kicker">{t.kicker}</p><h2>{t.title}</h2><p>{t.intro}</p>
    <div className="world-portal-grid">{worlds.map(({ href, icon: Icon, image }, index) => <Link key={href} href={href} className="world-portal" data-world-portal style={{ backgroundImage: `linear-gradient(0deg,#03101af2,#03101a40),url(${image})` }}>
      <Icon size={24} aria-hidden="true" /><h3>{t.names[index]}</h3><span>{t.enter}<ArrowUpRight size={16} aria-hidden="true" /></span>
    </Link>)}</div>
  </section>;
}
