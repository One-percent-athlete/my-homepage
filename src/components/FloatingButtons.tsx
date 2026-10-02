"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Code2, Contact, Globe2, Home, Images, MountainSnow, Orbit } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getVisitedWorlds, recordWorldVisit } from "@/lib/world-visits";
import { getBetweenAccessRemainingMs, getFragments } from "@/lib/exploration";

const worlds = [
  { href: "/", label: "Base", icon: Home, color: "#c8ff42" },
  { href: "/web", label: "Build", icon: Code2, color: "#52e8ff" },
  { href: "/travel", label: "Explore", icon: Globe2, color: "#ffad5c" },
  { href: "/ski", label: "Summit", icon: MountainSnow, color: "#b8e8ff" },
  { href: "/blog", label: "Journal", icon: BookOpen, color: "#d6a8ff" },
  { href: "/gallery", label: "Archive", icon: Images, color: "#ffcf6a" },
  { href: "/contact", label: "Signal", icon: Contact, color: "#c8ff42" },
];
const hiddenWorld = { href: "/between", label: "The Between", icon: Orbit, color: "#ff67d4" };
const worldLabels: Record<string, Record<"en" | "ja" | "zh", string>> = {
  "/": { en: "Home", ja: "基地", zh: "基地" }, "/web": { en: "Work", ja: "開発", zh: "开发" }, "/travel": { en: "Travel", ja: "旅", zh: "探索" }, "/ski": { en: "Ski", ja: "雪山", zh: "雪山" }, "/blog": { en: "Journal", ja: "記録", zh: "日志" }, "/gallery": { en: "Gallery", ja: "写真", zh: "影像" }, "/contact": { en: "Contact", ja: "お問い合わせ", zh: "联系我" }, "/between": { en: "The Between", ja: "狭間", zh: "间界" },
};
const dockCopy = {
  en: { close: "Collapse map", navigator: "World navigator", anomaly: "Anomalous signal detected", fragments: "fragments recovered", current: "Current", visited: "Visited", unknown: "Unknown", signal: "Signal language", discovered: "Hidden world discovered", enter: "Enter The Between" },
  ja: { close: "ラベルを閉じる", navigator: "ワールドナビ", anomaly: "未知の信号を検出", fragments: "個の断片を回収", current: "現在地", visited: "訪問済み", unknown: "未発見", signal: "表示言語", discovered: "隠された世界を発見", enter: "The Betweenへ" },
  zh: { close: "收起标签", navigator: "世界导航", anomaly: "检测到异常信号", fragments: "个碎片已回收", current: "当前", visited: "已访问", unknown: "未知", signal: "显示语言", discovered: "发现隐藏世界", enter: "进入世界之间" },
};

export default function FloatingButtons() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [journeyPage, setJourneyPage] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [fragmentCount, setFragmentCount] = useState(0);
  const activePath = ["/", "/web", "/contact", "/travel", "/ski"].includes(pathname) ? journeyPage ?? pathname : pathname;
  const hiddenUnlocked = fragmentCount >= 3 || pathname === "/between";
  const availableWorlds = hiddenUnlocked ? [...worlds, hiddenWorld] : worlds;
  const current = availableWorlds.find(world => activePath === world.href || (world.href !== "/" && activePath.startsWith(world.href + "/"))) ?? worlds[0];
  const copy = dockCopy[language];
  useEffect(() => {
    const update = (event: Event) => setJourneyPage((event as CustomEvent<string>).detail);
    setJourneyPage(document.body.dataset.journeyPage ?? null);
    window.addEventListener("journey-page", update);
    return () => window.removeEventListener("journey-page", update);
  }, [pathname]);
  useEffect(() => {
    const refresh = () => setVisited(getVisitedWorlds());
    if (!document.querySelector('[data-page-state]')) setVisited(recordWorldVisit(activePath));
    else refresh();
    const ready = () => { if (document.querySelector('[data-page-state]')) refresh(); else setVisited(recordWorldVisit(document.body.dataset.journeyPage ?? activePath)); };
    window.addEventListener("journey-ready", ready);
    window.addEventListener("world-ready", ready);
    window.addEventListener("world-visits", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("journey-ready", ready); window.removeEventListener("world-ready", ready); window.removeEventListener("world-visits", refresh); window.removeEventListener("storage", refresh); };
  }, [activePath]);
  useEffect(() => {
    let expiryTimer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      if (expiryTimer) clearTimeout(expiryTimer);
      setFragmentCount(getFragments().length);
      const remaining = getBetweenAccessRemainingMs();
      if (remaining > 0) expiryTimer = setTimeout(refresh, remaining + 50);
    };
    refresh(); window.addEventListener("ryu-progress", refresh); window.addEventListener("storage", refresh);
    return () => { if (expiryTimer) clearTimeout(expiryTimer); window.removeEventListener("ryu-progress", refresh); window.removeEventListener("storage", refresh); };
  }, []);
  return <aside className={"world-dock permanent" + (hiddenUnlocked ? " hidden-unlocked" : "")} aria-label={copy.navigator}>
    <nav className="dock-tabs" id="world-navigator-panel" aria-label={copy.navigator}>
      {availableWorlds.map(world => {
        const Icon = world.icon;
        const active = current.href === world.href;
        return <Link key={world.href} href={world.href} aria-label={worldLabels[world.href][language]} title={worldLabels[world.href][language]} className={active ? "active" : ""} style={{ "--dock-accent": world.color } as React.CSSProperties} aria-current={active ? "page" : undefined}>
          <span className="dock-icon"><Icon size={19} aria-hidden="true" />{visited.includes(world.href) && <i />}</span><strong>{worldLabels[world.href][language]}</strong>
        </Link>;
      })}
    </nav>
  </aside>;
}
