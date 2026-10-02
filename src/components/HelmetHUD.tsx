"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

import { explorationProgress, getVisitedWorlds, recordWorldVisit } from "@/lib/world-visits";
import ReadingModeSwitch from "@/components/ReadingModeSwitch";

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
  const [visited, setVisited] = useState<string[] | null>(null);
  useEffect(() => {
    const read = () => setVisited(getVisitedWorlds());
    const visit = (route: string) => {
      if (document.querySelector('[data-page-state]')) read();
      else setVisited(recordWorldVisit(route));
    };
    const world = (event: Event) => { const route = (event as CustomEvent<string>).detail; setJourneyPage(route); visit(route); };
    const route = document.body.dataset.journeyPage ?? pathname;
    setJourneyPage(document.body.dataset.journeyPage ?? null);
    visit(route);
    const ready = () => visit(document.body.dataset.journeyPage ?? pathname);
    window.addEventListener("journey-ready", ready);
    window.addEventListener("world-ready", ready);
    window.addEventListener("journey-page", world);
    window.addEventListener("world-visits", read);
    window.addEventListener("storage", read);
    return () => { window.removeEventListener("journey-ready", ready); window.removeEventListener("world-ready", ready); window.removeEventListener("journey-page", world); window.removeEventListener("world-visits", read); window.removeEventListener("storage", read); };
  }, [pathname]);
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create") || pathname.startsWith("/demos/")) return null;
  const route = ["/", "/web", "/contact"].includes(pathname) ? journeyPage ?? pathname : pathname;
  const name = names[route] ?? names[Object.keys(names).find(path => path !== "/" && route.startsWith(`${path}/`)) ?? "/"];
  const index = { en: 0, ja: 1, zh: 2 }[language];
  const progress = explorationProgress(visited ?? []);
  const explored = { en: "Worlds explored", ja: "探索した世界", zh: "已探索的世界" }[language];
  return <div className="helmet-hud">
    <div className="visor-outline" aria-hidden="true" /><i aria-hidden="true" className="visor-corner tl" /><i aria-hidden="true" className="visor-corner tr" /><i className="visor-corner bl" /><i className="visor-corner br" />
    <div className="visor-telemetry" role="status" aria-label={`${explored}: ${progress.count} / ${progress.total}`}><span className="hud-live" />{name[index]}<span className="hud-divider">/</span><span title={`${explored}: ${progress.count}/${progress.total}`}>{visited ? `${progress.percentage}%` : "…"}</span><small>{progress.count}/{progress.total}</small><div className="hud-progress" aria-hidden="true" style={{ "--hud-progress": `${progress.percentage}%` } as React.CSSProperties} /></div>
    <span className="visor-signature">37°N / RYU</span>
    {["/", "/web", "/contact", "/between"].includes(pathname) && <ReadingModeSwitch />}
  </div>;
}
