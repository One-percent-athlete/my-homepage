"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Code2, Compass, Contact, Globe2, Home, Images, Languages, MountainSnow, Orbit, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getFragments } from "@/lib/exploration";

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
  "/": { en: "Base", ja: "基地", zh: "基地" }, "/web": { en: "Build", ja: "開発", zh: "开发" }, "/travel": { en: "Explore", ja: "旅", zh: "探索" }, "/ski": { en: "Summit", ja: "雪山", zh: "雪山" }, "/blog": { en: "Journal", ja: "記録", zh: "日志" }, "/gallery": { en: "Archive", ja: "写真", zh: "影像" }, "/contact": { en: "Signal", ja: "通信", zh: "联络" }, "/between": { en: "The Between", ja: "狭間", zh: "间界" },
};
const dockCopy = {
  en: { close: "Close map", navigator: "World navigator", anomaly: "Anomalous signal detected", fragments: "fragments recovered", current: "Current", visited: "Visited", unknown: "Unknown", signal: "Signal language", discovered: "Hidden world discovered", enter: "Enter The Between" },
  ja: { close: "マップを閉じる", navigator: "ワールドナビ", anomaly: "未知の信号を検出", fragments: "個の断片を回収", current: "現在地", visited: "訪問済み", unknown: "未発見", signal: "表示言語", discovered: "隠された世界を発見", enter: "The Betweenへ" },
  zh: { close: "关闭地图", navigator: "世界导航", anomaly: "检测到异常信号", fragments: "个碎片已回收", current: "当前", visited: "已访问", unknown: "未知", signal: "显示语言", discovered: "发现隐藏世界", enter: "进入世界之间" },
};

export default function FloatingButtons() {
  const dockRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [fragmentCount,setFragmentCount]=useState(0);
  const hiddenUnlocked = fragmentCount >= 3 || pathname === "/between";
  const availableWorlds = hiddenUnlocked ? [...worlds, hiddenWorld] : worlds;
  const current = availableWorlds.find((world) => pathname === world.href || (world.href !== "/" && pathname.startsWith(`${world.href}/`))) ?? worlds[0];
  const copy = dockCopy[language];

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("ryu-worlds") || "[]") as unknown;
      const safe = Array.isArray(saved) ? saved.filter((item): item is string => typeof item === "string") : [];
      const next = Array.from(new Set([...safe, current.href]));
      setVisited(next);
      window.localStorage.setItem("ryu-worlds", JSON.stringify(next));
    } catch {
      setVisited([current.href]);
    }
  }, [current.href]);

  useEffect(()=>{
    const refresh=()=>setFragmentCount(getFragments().length);
    refresh();window.addEventListener("ryu-progress",refresh);window.addEventListener("storage",refresh);
    return()=>{window.removeEventListener("ryu-progress",refresh);window.removeEventListener("storage",refresh)};
  },[]);

  useEffect(() => {
    if (!expanded) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    const closeOutside = (event: PointerEvent) => { if (!dockRef.current?.contains(event.target as Node)) setExpanded(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutside); };
  }, [expanded]);

  return (
    <aside ref={dockRef} className={`${expanded ? "world-dock expanded" : "world-dock"}${hiddenUnlocked ? " hidden-unlocked" : ""}`} aria-label={copy.navigator}>
      {hiddenUnlocked && pathname !== "/between" && (
        <Link href="/between" className="between-discovery" aria-label={copy.enter}>
          <Sparkles size={16}/><span><small>{copy.discovered}</small><strong>{copy.enter}</strong></span><Orbit size={18}/>
        </Link>
      )}
      <button className="dock-trigger" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="world-navigator-panel" aria-label={expanded ? copy.close : copy.navigator} style={{ "--dock-accent": current.color } as React.CSSProperties}>
        {expanded ? <X size={20} /> : <Compass size={20} />}
        <span>{expanded ? copy.close : worldLabels[current.href][language]}</span>
        {!expanded && <b>{fragmentCount < 3 && fragmentCount > 0 ? `${fragmentCount}F` : `${visited.length}/${availableWorlds.length}`}</b>}
      </button>

      <div className="dock-panel" id="world-navigator-panel" aria-hidden={!expanded}>
        <div className="dock-heading"><span>{fragmentCount > 0 && fragmentCount < 3 ? copy.anomaly : copy.navigator}</span><small>{fragmentCount > 0 && fragmentCount < 3 ? `${fragmentCount}/3 ${copy.fragments}` : `${visited.length}/${availableWorlds.length}`}</small></div>
        <nav className="dock-tabs">
          {availableWorlds.map((world) => {
            const Icon = world.icon;
            const active = current.href === world.href;
            const found = visited.includes(world.href);
            return (
              <Link key={world.href} href={world.href} onClick={() => setExpanded(false)} className={active ? "active" : ""} style={{ "--dock-accent": world.color } as React.CSSProperties} aria-current={active ? "page" : undefined}>
                <span className="dock-icon"><Icon size={19} />{found && <i />}</span>
                <strong>{worldLabels[world.href][language]}</strong>
                <small>{active ? copy.current : found ? copy.visited : copy.unknown}</small>
              </Link>
            );
          })}
        </nav>
        <div className="dock-languages"><Languages size={16} /><span>{copy.signal}</span>{(["en", "ja", "zh"] as const).map((lang) => <button key={lang} className={language === lang ? "active" : ""} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
      </div>
    </aside>
  );
}
