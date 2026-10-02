"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

const names: Record<string, string[]> = {
  "/": ["HOME", "ホーム", "首页"], "/web": ["WORK", "開発", "作品"],
  "/contact": ["CONTACT", "連絡先", "联系"], "/travel": ["TRAVEL", "旅", "旅行"],
  "/ski": ["SUMMIT", "雪山", "雪山"], "/blog": ["JOURNAL", "記録", "日志"],
  "/gallery": ["GALLERY", "写真", "相册"], "/between": ["THE BETWEEN", "狭間", "间界"],
};

export default function HelmetHUD() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [journeyPage, setJourneyPage] = useState<string | null>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const meter = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const world = (event: Event) => setJourneyPage((event as CustomEvent<string>).detail);
    const update = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const value = Math.min(100, Math.max(0, window.scrollY / maximum * 100));
      if (progress.current) progress.current.textContent = `${Math.round(value)}%`;
      if (meter.current) meter.current.style.setProperty("--hud-progress", `${value}%`);
    };
    setJourneyPage(document.body.dataset.journeyPage ?? null);
    window.addEventListener("journey-page", world);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => { window.removeEventListener("journey-page", world); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create") || pathname.startsWith("/demos/")) return null;
  const route = ["/", "/web", "/contact"].includes(pathname) ? journeyPage ?? pathname : pathname;
  const name = names[route] ?? names[Object.keys(names).find(path => path !== "/" && route.startsWith(`${path}/`)) ?? "/"];
  const index = { en: 0, ja: 1, zh: 2 }[language];
  return <div className="helmet-hud" aria-hidden="true">
    <div className="visor-outline" /><i className="visor-corner tl" /><i className="visor-corner tr" /><i className="visor-corner bl" /><i className="visor-corner br" />
    <div className="visor-telemetry"><span className="hud-live" />{name[index]}<span className="hud-divider">/</span><span ref={progress}>0%</span><div className="hud-progress" ref={meter} /></div>
    <span className="visor-signature">37°N / RYU</span>
  </div>;
}
