"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Code2, Compass, Contact, Globe2, Home, Images, Languages, MountainSnow, Orbit, X } from "lucide-react";
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

export default function FloatingButtons() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [fragmentCount,setFragmentCount]=useState(0);
  const availableWorlds = fragmentCount >= 3 || pathname === "/between" ? [...worlds, hiddenWorld] : worlds;
  const current = availableWorlds.find((world) => pathname === world.href || (world.href !== "/" && pathname.startsWith(`${world.href}/`))) ?? worlds[0];

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

  return (
    <aside className={expanded ? "world-dock expanded" : "world-dock"} aria-label="Explore Ryu's worlds">
      <button className="dock-trigger" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label={expanded ? "Close world navigator" : "Open world navigator"} style={{ "--dock-accent": current.color } as React.CSSProperties}>
        {expanded ? <X size={20} /> : <Compass size={20} />}
        <span>{expanded ? "Close map" : current.label}</span>
        {!expanded && <b>{fragmentCount < 3 && fragmentCount > 0 ? `${fragmentCount}F` : `${visited.length}/${availableWorlds.length}`}</b>}
      </button>

      <div className="dock-panel">
        <div className="dock-heading"><span>{fragmentCount > 0 && fragmentCount < 3 ? "ANOMALOUS SIGNAL DETECTED" : "WORLD NAVIGATOR"}</span><small>{fragmentCount > 0 && fragmentCount < 3 ? `${fragmentCount} OF 3 FRAGMENTS RECOVERED` : visited.length === availableWorlds.length ? "ALL WORLDS DISCOVERED" : `${visited.length} OF ${availableWorlds.length} DISCOVERED`}</small></div>
        <nav className="dock-tabs">
          {availableWorlds.map((world) => {
            const Icon = world.icon;
            const active = current.href === world.href;
            const found = visited.includes(world.href);
            return (
              <Link key={world.href} href={world.href} onClick={() => setExpanded(false)} className={active ? "active" : ""} style={{ "--dock-accent": world.color } as React.CSSProperties} aria-current={active ? "page" : undefined}>
                <span className="dock-icon"><Icon size={19} />{found && <i />}</span>
                <strong>{world.label}</strong>
                <small>{active ? "CURRENT" : found ? "VISITED" : "UNKNOWN"}</small>
              </Link>
            );
          })}
        </nav>
        <div className="dock-languages"><Languages size={16} /><span>Signal language</span>{(["en", "ja", "zh"] as const).map((lang) => <button key={lang} className={language === lang ? "active" : ""} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
      </div>
    </aside>
  );
}
