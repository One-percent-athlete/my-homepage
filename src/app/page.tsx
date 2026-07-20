"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Code2, Compass, Globe2, Menu, MountainSnow, Radio, X } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";

const missions = [
  {
    id: "01",
    title: "Digital products",
    label: "BUILD",
    copy: "Web experiences that turn complex ideas into fast, useful and memorable products.",
    href: "/web",
    image: "/images/stairs.jpg",
    icon: Code2,
    accent: "cyan",
  },
  {
    id: "02",
    title: "World intelligence",
    label: "EXPLORE",
    copy: "Stories and perspective collected across 80+ countries—not from a desk, but from the road.",
    href: "/travel",
    image: "/images/patagonia.jpg",
    icon: Globe2,
    accent: "gold",
  },
  {
    id: "03",
    title: "Mountain craft",
    label: "GUIDE",
    copy: "Ski instruction and mountain experiences shaped by precision, trust and real human connection.",
    href: "/ski",
    image: "/images/ski3.jpg",
    icon: MountainSnow,
    accent: "ice",
  },
];

const capabilities = ["Product strategy", "UI / UX systems", "Next.js & React", "Full-stack development", "Multilingual experiences", "Storytelling", "Global perspective", "Ski instruction"];
const homeCopy = {
  en: { eyebrow:"Independent builder · Global explorer · Based in Japan", line1:"I build digital worlds.", line2:"Then I explore the real one.", intro:"I’m Ryu—an engineer, creator and adventurer turning ambitious ideas into experiences people remember.", begin:"Begin the expedition", contact:"Have a mission for me?", route:"Choose your route", worlds:"Three worlds. One way of thinking." },
  ja: { eyebrow:"独立系エンジニア · 世界を旅する探究者 · 日本拠点", line1:"デジタルの世界を創り、", line2:"現実の世界を旅する。", intro:"Ryuです。エンジニア、クリエイター、冒険家として、アイデアを記憶に残る体験へ変えています。", begin:"探検を始める", contact:"一緒に挑戦しませんか？", route:"ルートを選ぶ", worlds:"三つの世界。一つの思考。" },
  zh: { eyebrow:"独立开发者 · 全球探索者 · 常驻日本", line1:"我创造数字世界，", line2:"也探索真实世界。", intro:"我是 Ryu——工程师、创作者与冒险者，把大胆的想法变成人们记得住的体验。", begin:"开始探索", contact:"有任务想和我聊吗？", route:"选择路线", worlds:"三个世界。一种思考方式。" },
};

export default function Home() {
  const { language } = useLanguage();
  const t = homeCopy[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [discovered, setDiscovered] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("ryu-discovered");
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setDiscovered(parsed.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      window.localStorage.removeItem("ryu-discovered");
    }
  }, []);

  const discover = (id: string) => {
    setDiscovered((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      try { window.localStorage.setItem("ryu-discovered", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <main className="mission-site">
      <FloatingButtons />
      <div className="star-field" aria-hidden="true" />
      <header className="mission-nav">
        <Link href="/" className="wordmark" aria-label="Ryu home"><span>R</span> RYU / 37°N</Link>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>Identity</a>
          <a href="#missions" onClick={() => setMenuOpen(false)}>Missions</a>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Field log</Link>
          <Link href="/contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={15} /></Link>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="mission-hero" id="about">
        <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> {t.eyebrow}</p>
          <h1>{t.line1}<br /><em>{t.line2}</em></h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a href="#missions" className="primary-action">{t.begin} <ArrowDownRight size={18} /></a>
            <Link href="/contact" className="text-action">{t.contact} <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            <Image src="/images/main.jpg" alt="Ryu exploring the world" fill priority sizes="(max-width: 900px) 80vw, 38vw" className="portrait-image" />
            <div className="portrait-scan" />
          </div>
          <div className="coordinate-tag"><Compass size={18} /><span>LAST SIGNAL<br /><strong>35.6762° N · 139.6503° E</strong></span></div>
        </div>
        <div className="hero-index"><span>SCROLL TO NAVIGATE</span><div /><b>00</b></div>
      </section>

      <section className="signal-strip" aria-label="Quick facts">
        <p><span>80+</span> countries explored</p><i />
        <p><span>3</span> working languages</p><i />
        <p><span>∞</span> curiosity</p><i />
        <p><Radio size={15} /> available for select projects</p>
      </section>

      <section className="missions-section" id="missions">
        <div className="section-heading">
          <div><p className="eyebrow">{t.route}</p><h2>{t.worlds}</h2></div>
          <p>Every discipline teaches the others: engineering brings structure, travel brings perspective, and the mountain demands clarity.</p>
        </div>
        <div className="mission-grid">
          {missions.map((mission) => {
            const Icon = mission.icon;
            const found = discovered.includes(mission.id);
            return (
              <Link key={mission.id} href={mission.href} className={`mission-card ${mission.accent}`} onMouseEnter={() => discover(mission.id)} onFocus={() => discover(mission.id)}>
                <Image src={mission.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="mission-image" />
                <div className="mission-shade" />
                <div className="mission-top"><span>{mission.id} / {mission.label}</span><Icon size={20} /></div>
                <div className="mission-body"><h3>{mission.title}</h3><p>{mission.copy}</p><span className="enter-link">Enter world <ArrowUpRight size={17} /></span></div>
                {found && <span className="discovered">DISCOVERED</span>}
              </Link>
            );
          })}
        </div>
        <p className="discovery-count">Explorer progress: <strong>{discovered.length} / {missions.length}</strong> worlds discovered</p>
      </section>

      <section className="loadout-section">
        <div className="loadout-copy"><p className="eyebrow">The loadout</p><h2>What I bring<br />to the mission.</h2><p>I work where technology, design and human curiosity overlap. The result is work that functions beautifully—and feels alive.</p><Link href="/web">Inspect technical profile <ArrowUpRight size={17} /></Link></div>
        <div className="capability-console">
          <div className="console-head"><span>RYU_OS / CAPABILITIES</span><span className="console-status">SYSTEM READY</span></div>
          <div className="capability-list">{capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i /></div>)}</div>
        </div>
      </section>

      <section className="field-note">
        <Image src="/images/petra.jpg" alt="A view from Ryu's travels" fill sizes="100vw" className="field-image" />
        <div className="field-overlay" />
        <div className="field-content"><p className="eyebrow">Field note / Jordan</p><blockquote>“The best work starts the same way every adventure does: with curiosity, a little courage, and a direction worth moving toward.”</blockquote><Link href="/travel">Open the travel log <ArrowUpRight size={18} /></Link></div>
      </section>

      <section className="final-transmission">
        <div className="transmission-ring"><Radio size={36} /></div>
        <p className="eyebrow">Open channel</p>
        <h2>Let’s make something<br /><em>worth discovering.</em></h2>
        <p>Bring me the idea you can’t stop thinking about.</p>
        <Link href="/contact" className="primary-action">Send a transmission <ArrowUpRight size={18} /></Link>
      </section>

      <footer className="mission-footer"><span>© {new Date().getFullYear()} RYU SUZUKI</span><span>ENGINEER / EXPLORER / HUMAN</span><div><Link href="/blog">Journal</Link><Link href="/gallery">Gallery</Link><a href="https://github.com/One-percent-athlete" target="_blank" rel="noreferrer">GitHub</a></div></footer>
    </main>
  );
}
