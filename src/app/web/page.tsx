"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces, Cpu, Layers3, Play, Sparkles } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import WebBackground from "@/components/web/WebBackground";
import LogoShowcase from "@/components/web/LogoShowcase";
import SkillCardGrid from "@/components/web/SkillCardGrid";
import ProjectCardGrid from "@/components/web/ProjectCardGrid";
import Footer from "@/components/Footer";
import { recordWorldStep } from "@/lib/exploration";

const modes = [
  { id: "strategy", label: "01 / Think", icon: Sparkles, title: "Find the signal", copy: "Clarify the real problem, the audience and the smallest valuable version worth building.", output: ["problem: identified", "audience: mapped", "direction: aligned"] },
  { id: "design", label: "02 / Shape", icon: Layers3, title: "Design the system", copy: "Turn the idea into a distinctive interface with a practical, reusable interaction system.", output: ["flows: simplified", "interface: prototyped", "experience: memorable"] },
  { id: "build", label: "03 / Launch", icon: Braces, title: "Ship the product", copy: "Build a fast, secure product and keep refining it with evidence from real people.", output: ["frontend: responsive", "backend: connected", "status: ready to launch"] },
];

export default function Web() {
  const [activeMode, setActiveMode] = useState(0);
  const mode = modes[activeMode];
  const Icon = mode.icon;
  useEffect(()=>{ recordWorldStep("build",0,modes.length); },[]);
  const selectMode=(index:number)=>{setActiveMode(index);recordWorldStep("build",index,modes.length)};

  return (
    <div className="web-world">
      <FloatingButtons />
      <div className="web-world-bg"><WebBackground /></div>
      <section className="web-lab-hero">
        <div className="web-lab-copy">
          <p className="world-kicker"><span /> WORLD 01 · THE BUILD LAB</p>
          <h1>Ideas enter.<br /><em>Working products leave.</em></h1>
          <p>I design and build digital experiences that make complicated things feel clear, useful and unexpectedly fun.</p>
          <div className="web-lab-actions"><Link href="/contact">Start a build <ArrowUpRight size={18} /></Link><a href="#process">Run the system <ArrowDown size={18} /></a></div>
        </div>
        <div className="build-console" id="process">
          <div className="build-console-head"><span><i /> RYU_BUILD_SYSTEM</span><small>INTERACTIVE</small></div>
          <div className="build-mode-tabs">{modes.map((item,index)=><button key={item.id} onClick={()=>selectMode(index)} className={index===activeMode?"active":""}>{item.label}</button>)}</div>
          <motion.div key={mode.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="build-output">
            <Icon size={34}/><span>ACTIVE MODULE</span><h2>{mode.title}</h2><p>{mode.copy}</p>
            <div className="terminal-output">{mode.output.map((line,index)=><code key={line}><b>{String(index+1).padStart(2,"0")}</b> {line}<i>✓</i></code>)}</div>
          </motion.div>
          <button className="console-next" onClick={()=>selectMode((activeMode+1)%modes.length)}><Play size={14} fill="currentColor"/> Run next module</button>
        </div>
      </section>
      <section className="web-toolbelt"><p>TOOLS IN ORBIT</p><LogoShowcase /></section>
      <section className="web-deep-section"><div className="section-chip"><Cpu size={16}/> CAPABILITY MATRIX</div><SkillCardGrid sectionTitle="What the system can do" sectionSubtitle="A practical toolkit for turning an ambitious idea into a dependable product" /></section>
      <section className="web-deep-section projects"><div className="section-chip"><Braces size={16}/> MISSION FILES</div><ProjectCardGrid sectionTitle="Selected builds" sectionSubtitle="Current project placeholders—ready to be replaced with your real case studies" /></section>
      <section className="web-final"><p className="world-kicker">BUILD SLOT AVAILABLE</p><h2>Have a stubborn idea?<br /><em>Good. I like those.</em></h2><Link href="/contact">Open a project channel <ArrowUpRight size={19}/></Link></section>
      <Footer />
    </div>
  );
}
