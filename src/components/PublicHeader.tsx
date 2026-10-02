"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const copy = {
  en: { links: ["Work", "Travel", "Ski", "Journal", "Gallery"], contact: "Contact", home: "Ryu home", menu: "Open navigation", close: "Close navigation", nav: "Main navigation", language: "Language" },
  ja: { links: ["制作実績", "旅", "スキー", "ブログ", "写真"], contact: "お問い合わせ", home: "ホーム", menu: "メニューを開く", close: "メニューを閉じる", nav: "メインナビゲーション", language: "言語" },
  zh: { links: ["作品", "旅行", "滑雪", "日志", "相册"], contact: "联系我", home: "首页", menu: "打开导航", close: "关闭导航", nav: "主导航", language: "语言" },
};
const routes = ["/web", "/travel", "/ski", "/blog", "/gallery"];
export default function PublicHeader() {
  const pathname = usePathname();
  const [journeyPage, setJourneyPage] = useState<string | null>(null);
  useEffect(() => {
    const update = (event: Event) => setJourneyPage((event as CustomEvent<string>).detail);
    window.addEventListener("journey-page", update);
    setJourneyPage(document.body.dataset.journeyPage ?? null);
    return () => window.removeEventListener("journey-page", update);
  }, [pathname]);
  const activePage = ["/", "/web", "/contact"].includes(pathname) ? journeyPage ?? pathname : pathname;
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create") || pathname.startsWith("/demos/")) return null;
  return <header ref={header} className="public-header">
    <Link href="/" className="wordmark" aria-label={t.home} aria-current={activePage === "/" ? "page" : undefined} onClick={() => setOpen(false)}><span>R</span> RYU / 37°N</Link>
    <div className="public-header-controls">
      <nav id="public-navigation" className={`public-navigation${open ? " is-open" : ""}`} aria-label={t.nav}>
        {routes.map((href, index) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={activePage === href || activePage.startsWith(`${href}/`) ? "page" : undefined}>{t.links[index]}</Link>)}
        <Link href="/contact" className="public-contact-link" onClick={() => setOpen(false)} aria-current={activePage === "/contact" ? "page" : undefined}>{t.contact}<ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
      <label className="header-language"><span className="sr-only">{t.language}</span><select value={language} onChange={event => setLanguage(event.target.value as "en" | "ja" | "zh")}><option value="en">EN</option><option value="ja">日本語</option><option value="zh">中文</option></select></label>
      <button ref={trigger} type="button" className="public-menu-toggle" aria-label={open ? t.close : t.menu} aria-expanded={open} aria-controls="public-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
  </header>;
}
