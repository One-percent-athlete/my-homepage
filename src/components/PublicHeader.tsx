"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

export default function PublicHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create") || pathname.startsWith("/demos/")) return null;
  const t = { en: { home: "Ryu home", language: "Language" }, ja: { home: "ホーム", language: "言語" }, zh: { home: "首页", language: "语言" } }[language];
  return <header className="public-header">
    <Link href="/" className="wordmark" aria-label={t.home}><span>R</span> RYU / 37°N</Link>
    <label className="header-language"><span className="sr-only">{t.language}</span><select value={language} onChange={event => setLanguage(event.target.value as "en" | "ja" | "zh")}><option value="en">EN</option><option value="ja">日本語</option><option value="zh">中文</option></select></label>
  </header>;
}
