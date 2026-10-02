"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Code2, Compass, Globe2, MountainSnow, Radio } from "lucide-react";
import { useWorkJourney } from "@/components/WorkJourney";
import WorldPortals from "@/components/WorldPortals";
import Contact from "@/components/Contact";
import HomeTunnel from "@/components/HomeTunnel";
import PortalSection from "@/components/PortalSection";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";

const missionBase = [
  { id:"01", href:"/web", image:"/images/stairs.jpg", icon:Code2, accent:"cyan" },
  { id:"02", href:"/travel", image:"/images/patagonia.jpg", icon:Globe2, accent:"gold" },
  { id:"03", href:"/ski", image:"/images/ski3.jpg", icon:MountainSnow, accent:"ice" },
];

const homeCopy = {
  en: {
    eyebrow:"Developer · Global explorer · Based in Japan", line1:"Apps for everyday work.", line2:"Websites for your next idea.", intro:"I’m Ryu. I build business tools, booking systems and matching apps for companies, ski schools and local experiences.", approach:"I connect the steps people rely on—requests, schedules and orders—in clear interfaces across languages.", begin:"Explore my builds", contact:"Discuss your project", route:"Choose your route", worlds:"Three worlds. One way of thinking.",
    nav:["Identity","Missions","Field log","Start a project"], scroll:"Scroll to navigate", signal:"Last signal", facts:["countries explored","working languages","curiosity","available for select projects"], missionIntro:"Every discipline teaches the others: engineering brings structure, travel brings perspective, and the mountain demands clarity.",
    missions:[{title:"Digital products",label:"BUILD",copy:"Web experiences that turn complex ideas into fast, useful and memorable products."},{title:"World intelligence",label:"EXPLORE",copy:"Stories and perspective collected across 80+ countries—not from a desk, but from the road."},{title:"Mountain craft",label:"GUIDE",copy:"Ski instruction and mountain experiences shaped by precision, trust and real human connection."}],
    enter:"Enter world", discovered:"DISCOVERED", progress:"Explorer progress", worldsFound:"worlds discovered", loadout:"The loadout", bring:"What I bring to the mission.", loadoutCopy:"I work where technology, design and human curiosity overlap. The result is work that functions beautifully—and feels alive.", inspect:"Inspect technical profile", ready:"SYSTEM READY", capabilities:["Product strategy","UI / UX systems","Next.js & React","Full-stack development","Multilingual experiences","Storytelling","Global perspective","Ski instruction"],
    field:"Field note / Jordan", quote:"The best work starts the same way every adventure does: with curiosity, a little courage, and a direction worth moving toward.", travel:"Open the travel log", channel:"Open channel", final1:"Let’s make something", final2:"worth discovering.", finalCopy:"Bring me the idea you can’t stop thinking about.", send:"Send a transmission", role:"ENGINEER / EXPLORER / HUMAN", journal:"Journal", gallery:"Gallery"
  },
  ja: {
    eyebrow:"開発者 · 世界を旅する探究者 · 日本拠点", line1:"日々の仕事を支えるアプリ。", line2:"次のアイデアを届けるサイト。", intro:"Ryuです。企業、スキースクール、現地での体験を支える業務ツール・予約システム・マッチングアプリを開発しています。", approach:"依頼・予定・注文など、人が使う業務の流れを、言語を超えて分かりやすい画面につなげます。", begin:"開発したものを見る", contact:"プロジェクトを相談する", route:"ルートを選ぶ", worlds:"三つの世界。一つの思考。",
    nav:["人物像","ミッション","旅の記録","プロジェクトを始める"], scroll:"スクロールして移動", signal:"最終信号", facts:["か国を旅した","使用言語","尽きない好奇心","厳選したプロジェクトを受付中"], missionIntro:"すべての経験が互いを磨きます。開発は構造を、旅は視点を、山は明快さを教えてくれます。",
    missions:[{title:"デジタルプロダクト",label:"開発",copy:"複雑なアイデアを、速く、役立ち、記憶に残るウェブ体験へ。"},{title:"世界から得た視点",label:"探検",copy:"机上ではなく、80か国以上の旅で集めた物語と視点。"},{title:"雪山の技術",label:"ガイド",copy:"正確さ、信頼、人とのつながりを大切にしたスキー指導と山の体験。"}],
    enter:"世界へ入る", discovered:"発見済み", progress:"探検の進捗", worldsFound:"の世界を発見", loadout:"装備", bring:"ミッションに持ち込めるもの。", loadoutCopy:"テクノロジー、デザイン、人の好奇心が交わる場所で仕事をしています。美しく機能し、生命を感じる成果を目指します。", inspect:"技術プロフィールを見る", ready:"システム準備完了", capabilities:["プロダクト戦略","UI / UXシステム","Next.js & React","フルスタック開発","多言語体験","ストーリーテリング","グローバルな視点","スキー指導"],
    field:"フィールドノート / ヨルダン", quote:"最高の仕事は、すべての冒険と同じように始まる。好奇心と少しの勇気、そして進む価値のある方向から。", travel:"旅の記録を開く", channel:"通信回線を開放", final1:"発見する価値のあるものを", final2:"一緒に創ろう。", finalCopy:"頭から離れないアイデアを聞かせてください。", send:"メッセージを送る", role:"エンジニア / 探究者 / 一人の人間", journal:"ジャーナル", gallery:"ギャラリー"
  },
  zh: {
    eyebrow:"开发者 · 全球探索者 · 常驻日本", line1:"服务日常工作的应用，", line2:"展示下一个想法的网站。", intro:"我是 Ryu。我为企业、滑雪学校和当地体验开发业务工具、预约系统与匹配应用。", approach:"把人们依赖的申请、日程与订单连接起来，用清晰的多语言界面支持实际工作。", begin:"探索我的作品", contact:"聊聊你的项目", route:"选择路线", worlds:"三个世界。一种思考方式。",
    nav:["关于我","任务","旅行记录","开始项目"], scroll:"滚动探索", signal:"最后信号", facts:["个国家的足迹","工作语言","无限好奇心","接受精选项目"], missionIntro:"每种经历都滋养着其他领域：工程带来结构，旅行带来视角，而雪山要求清晰与果断。",
    missions:[{title:"数字产品",label:"构建",copy:"把复杂想法变成快速、实用且令人难忘的网页体验。"},{title:"来自世界的洞察",label:"探索",copy:"不是坐在书桌前，而是在80多个国家的旅途中收集故事与视角。"},{title:"雪山技艺",label:"向导",copy:"以精准、信任和真实连接为核心的滑雪教学与山地体验。"}],
    enter:"进入世界", discovered:"已发现", progress:"探索进度", worldsFound:"个世界已发现", loadout:"我的装备", bring:"我能为任务带来什么。", loadoutCopy:"我在技术、设计与人类好奇心的交汇处工作，让成果不仅运作优雅，也充满生命力。", inspect:"查看技术档案", ready:"系统已就绪", capabilities:["产品策略","UI / UX 系统","Next.js 与 React","全栈开发","多语言体验","叙事表达","全球视角","滑雪教学"],
    field:"旅行笔记 / 约旦", quote:"最好的作品和每场冒险一样，都始于好奇心、一点勇气，以及一个值得前往的方向。", travel:"打开旅行日志", channel:"开放频道", final1:"一起创造一些", final2:"值得被发现的东西。", finalCopy:"把那个让你念念不忘的想法告诉我。", send:"发送讯息", role:"工程师 / 探索者 / 普通人", journal:"日志", gallery:"画廊"
  },
};

export default function Home({ initialWorld = "home" }: { initialWorld?: "home" | "web" | "contact" }) {
  const { language } = useLanguage();
  const t = homeCopy[language];
  const work = useWorkJourney();
  const missions = missionBase.map((mission, index) => ({ ...mission, ...t.missions[index] }));
  const [discovered, setDiscovered] = useState<string[]>([]);

  useEffect(() => {
    try { const stored=window.localStorage.getItem("ryu-discovered"); if(stored){const parsed:unknown=JSON.parse(stored);if(Array.isArray(parsed))setDiscovered(parsed.filter((item):item is string=>typeof item==="string"));} }
    catch { window.localStorage.removeItem("ryu-discovered"); }
  }, []);
  const discover=(id:string)=>setDiscovered(current=>{if(current.includes(id))return current;const next=[...current,id];try{window.localStorage.setItem("ryu-discovered",JSON.stringify(next));}catch{}return next;});

  return <main className="mission-site home-tunnel">
    <FloatingButtons/><div className="star-field" aria-hidden="true"/>

    <HomeTunnel labels={[t.nav[0], t.signal, t.route, t.loadout, t.field, t.channel, ...work.labels, language === "en" ? "Other worlds" : language === "ja" ? "ほかの世界" : "其他世界", language === "en" ? "Contact" : language === "ja" ? "お問い合わせ" : "联系我"]} instruction={t.scroll} showNavigation={false} workStart={6} contactStart={7 + work.labels.length} initialChapter={initialWorld === "contact" ? 7 + work.labels.length : initialWorld === "web" ? 6 : 0}>
    <PortalSection className="mission-hero" id="about"><div className="hero-orbit" aria-hidden="true"><span/><span/><span/></div><div className="hero-copy"><p className="eyebrow"><span className="live-dot"/> {t.eyebrow}</p><h1>{t.line1}<br/><em>{t.line2}</em></h1><p className="hero-intro">{t.intro}</p><p className="hero-approach">{t.approach}</p><div className="hero-actions"><a href="#projects" className="primary-action">{t.begin} <ArrowDownRight size={18}/></a><Link href="/contact" className="text-action">{t.contact} <ArrowUpRight size={17}/></Link></div></div><div className="hero-portrait"><div className="portrait-frame"><Image src="/images/main.jpg" alt="Ryu exploring the world" fill priority sizes="(max-width: 900px) 80vw, 38vw" className="portrait-image"/><div className="portrait-scan"/></div><div className="coordinate-tag"><Compass size={18}/><span>{t.signal}<br/><strong>35.6762° N · 139.6503° E</strong></span></div></div><div className="hero-index"><span>{t.scroll}</span><div/><b>00</b></div></PortalSection>
    <PortalSection className="signal-strip" aria-label="Quick facts"><p><span>80+</span> {t.facts[0]}</p><i/><p><span>3</span> {t.facts[1]}</p><i/><p><span>∞</span> {t.facts[2]}</p><i/><p><Radio size={15}/> {t.facts[3]}</p></PortalSection>
    <PortalSection className="missions-section" id="missions"><div className="section-heading"><div><p className="eyebrow">{t.route}</p><h2>{t.worlds}</h2></div><p>{t.missionIntro}</p></div><div className="mission-grid">{missions.map(mission=>{const Icon=mission.icon;const found=discovered.includes(mission.id);return <Link key={mission.id} href={mission.href} className={`mission-card ${mission.accent}`} onMouseEnter={()=>discover(mission.id)} onFocus={()=>discover(mission.id)}><Image src={mission.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="mission-image"/><div className="mission-shade"/><div className="mission-top"><span>{mission.id} / {mission.label}</span><Icon size={20}/></div><div className="mission-body"><h3>{mission.title}</h3><p>{mission.copy}</p><span className="enter-link">{t.enter} <ArrowUpRight size={17}/></span></div>{found&&<span className="discovered">{t.discovered}</span>}</Link>})}</div><p className="discovery-count">{t.progress}: <strong>{discovered.length} / {missions.length}</strong> {t.worldsFound}</p></PortalSection>
    <PortalSection className="loadout-section"><div className="loadout-copy"><p className="eyebrow">{t.loadout}</p><h2>{t.bring}</h2><p>{t.loadoutCopy}</p><Link href="/web">{t.inspect} <ArrowUpRight size={17}/></Link></div><div className="capability-console"><div className="console-head"><span>RYU_OS / CAPABILITIES</span><span className="console-status">{t.ready}</span></div><div className="capability-list">{t.capabilities.map((item,index)=><div key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong><i/></div>)}</div></div></PortalSection>
    <PortalSection className="field-note"><Image src="/images/petra.jpg" alt="A view from Ryu's travels" fill sizes="100vw" className="field-image"/><div className="field-overlay"/><div className="field-content"><p className="eyebrow">{t.field}</p><blockquote>“{t.quote}”</blockquote><Link href="/travel">{t.travel} <ArrowUpRight size={18}/></Link></div></PortalSection>
    <PortalSection className="final-transmission"><div className="transmission-ring"><Radio size={36}/></div><p className="eyebrow">{t.channel}</p><h2>{t.final1}<br/><em>{t.final2}</em></h2><p>{t.finalCopy}</p><Link href="/contact" className="primary-action">{t.send} <ArrowUpRight size={18}/></Link></PortalSection>
    {work.content}
    <WorldPortals />
    <Contact embedded />
    </HomeTunnel>
  </main>;
}
