"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

import { PUBLIC_WORLDS, nextUnvisitedWorld, explorationProgress, getVisitedWorlds, recordWorldVisit } from "@/lib/world-visits";
import ReadingModeSwitch from "@/components/ReadingModeSwitch";

const progressCopy = {
 en: {title:"Your exploration",open:"View exploration progress",close:"Close exploration progress",visited:"Visited",unvisited:"Unexplored",next:"Your next destination",go:"Explore",complete:"Every world visited. Choose one to revisit."},
 ja: {title:"探索の記録",open:"探索状況を見る",close:"探索状況を閉じる",visited:"訪問済み",unvisited:"未探索",next:"次の目的地",go:"探索する",complete:"すべての世界を訪問しました。もう一度訪れてみましょう。"},
 zh: {title:"你的探索记录",open:"查看探索进度",close:"关闭探索进度",visited:"已访问",unvisited:"未探索",next:"下一站",go:"探索",complete:"已访问所有世界。选择一个再次探索。"},
};
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);
  const [progressOpen, setProgressOpen] = useState(false);
  const [visited, setVisited] = useState<string[] | null>(null);
  useEffect(() => {
    const read = () => setVisited(getVisitedWorlds());
    const visit = (route: string) => {
      if (document.querySelector('[data-page-state]')) read();
      else setVisited(recordWorldVisit(route));
    };
    const world = (event: Event) => { const route = (event as CustomEvent<string>).detail; setJourneyPage(route); visit(route); };
    const currentRoute = () => ["/", "/web", "/contact"].includes(pathname) ? document.body.dataset.journeyPage ?? pathname : pathname;
    const route = currentRoute();
    setJourneyPage(document.body.dataset.journeyPage ?? null);
    visit(route);
    const ready = () => visit(currentRoute());
    window.addEventListener("journey-ready", ready);
    window.addEventListener("world-ready", ready);
    window.addEventListener("journey-page", world);
    window.addEventListener("world-visits", read);
    window.addEventListener("storage", read);
    return () => { window.removeEventListener("journey-ready", ready); window.removeEventListener("world-ready", ready); window.removeEventListener("journey-page", world); window.removeEventListener("world-visits", read); window.removeEventListener("storage", read); };
  }, [pathname]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (progressOpen && dialog && !dialog.open) dialog.showModal();
    else if (!progressOpen && dialog?.open) dialog.close();
  }, [progressOpen]);
  useEffect(() => { setProgressOpen(false); }, [pathname, journeyPage]);
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create") || pathname.startsWith("/demos/")) return null;
  const route = ["/", "/web", "/contact"].includes(pathname) ? journeyPage ?? pathname : pathname;
  const name = route === "/case-studies" ? names["/web"] : names[route] ?? names[Object.keys(names).find(path => path !== "/" && route.startsWith(`${path}/`)) ?? "/"];
  const index = { en: 0, ja: 1, zh: 2 }[language];
  const progress = explorationProgress(visited ?? []);
  const explored = { en: "Worlds explored", ja: "探索した世界", zh: "已探索的世界" }[language];
  const copy = progressCopy[language];
  const suggested = nextUnvisitedWorld(visited ?? []);
  return <div className="helmet-hud">
    <div className="visor-outline" aria-hidden="true" /><i aria-hidden="true" className="visor-corner tl" /><i aria-hidden="true" className="visor-corner tr" /><i className="visor-corner bl" /><i className="visor-corner br" />
    <div className="visor-telemetry" role="status" aria-label={`${explored}: ${progress.count} / ${progress.total}`}><span className="hud-live" />{name[index]}<span className="hud-divider">/</span><button ref={progressRef} className="hud-exploration-button" aria-label={`${copy.open}: ${progress.percentage}%`} aria-haspopup="dialog" aria-expanded={progressOpen} onClick={() => setProgressOpen(true)}>{visited ? `${progress.percentage}%` : "…"}</button><small>{progress.count}/{progress.total}</small><div className="hud-progress" aria-hidden="true" style={{ "--hud-progress": `${progress.percentage}%` } as React.CSSProperties} /></div>
    <dialog ref={dialogRef} className="world-progress-dialog" aria-labelledby="exploration-title" onClose={() => {setProgressOpen(false);progressRef.current?.focus();}} onClick={event => {if(event.target === event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)setProgressOpen(false);}}}>
      <header><div><small>{progress.count} / {progress.total} · {progress.percentage}%</small><h2 id="exploration-title">{copy.title}</h2></div><button aria-label={copy.close} onClick={() => setProgressOpen(false)}>×</button></header>
      {suggested ? <div className="exploration-next"><small>{copy.next}</small><Link href={suggested} onClick={() => setProgressOpen(false)}>{names[suggested][index]} <span>{copy.go} →</span></Link></div> : <p className="exploration-complete">{copy.complete}</p>}
      <nav aria-label={copy.title}>{PUBLIC_WORLDS.map(world => <Link key={world} href={world} onClick={() => setProgressOpen(false)} aria-current={route === world ? "page" : undefined} data-visited={visited?.includes(world) ? "true" : "false"}><span>{names[world][index]}</span><small>{visited?.includes(world) ? "✓ " + copy.visited : "○ " + copy.unvisited}</small></Link>)}</nav>
    </dialog>
    <span className="visor-signature">37°N / RYU</span>
    {["/", "/web", "/contact", "/between", "/travel", "/ski"].includes(pathname) && <ReadingModeSwitch />}
  </div>;
}
