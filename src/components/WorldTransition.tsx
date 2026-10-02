"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

const worlds = { "/travel": "travel", "/ski": "summit", "/blog": "journal", "/gallery": "archive", "/": "base", "/web": "build", "/contact": "contact" };
const labels = { en: ["Entering the travel world", "Heading to the mountain", "Opening the journal", "Entering the gallery", "Returning to Home", "Entering the build lab", "Opening the contact channel"], ja: ["旅の世界へ", "雪山の世界へ", "ジャーナルを開く", "写真の世界へ", "ホームへ戻る", "開発ラボへ", "連絡先を開く"], zh: ["进入旅行世界", "前往雪山", "打开日志", "进入相册", "返回首页", "进入开发实验室", "打开联系频道"] };

export default function WorldTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const [destination, setDestination] = useState<keyof typeof worlds | null>(null);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recovery = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const finish = busy.current ? setTimeout(() => setDestination(null), 180) : null;
    busy.current = false;
    return () => { if (finish) clearTimeout(finish); };
  }, [pathname]);

  useEffect(() => {
    if (!destination) window.dispatchEvent(new Event("world-ready"));
  }, [destination]);

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === pathname || !(url.pathname in worlds) || url.hash || url.search) return;
      if (["/", "/web", "/contact"].includes(pathname) && ["/", "/web", "/contact"].includes(url.pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (busy.current) return;
      busy.current = true;
      setDestination(url.pathname as keyof typeof worlds);
      timer.current = setTimeout(() => router.push(url.pathname), 450);
      recovery.current = setTimeout(() => { busy.current = false; setDestination(null); }, 8000);
    };
    document.addEventListener("click", navigate, true);
    return () => {
      document.removeEventListener("click", navigate, true);
      if (timer.current) clearTimeout(timer.current);
      if (recovery.current) clearTimeout(recovery.current);
    };
  }, [pathname, router]);

  if (!destination) return null;
  return <div className="world-transition" data-world={worlds[destination]} data-page-state="loading" role="status" aria-live="polite"><div className="world-transition-frame" /><div className="world-transition-frame second" /><p>{labels[language][Object.keys(worlds).indexOf(destination)]}</p></div>;
}
