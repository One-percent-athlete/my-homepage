"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Gauge, MountainSnow, Wind } from "lucide-react";

const runs = [
  { level:"FIRST TRACKS", title:"Find your balance", copy:"Calm, clear private instruction for first turns and confident foundations.", steep:"18°", pace:"EASY", skill:28 },
  { level:"ALL MOUNTAIN", title:"Own the whole resort", copy:"Sharper technique, better decisions and more fun across changing terrain.", steep:"32°", pace:"FLOW", skill:62 },
  { level:"POWDER MODE", title:"Read the mountain", copy:"Guided adventure for experienced skiers chasing deep snow and better lines.", steep:"44°", pace:"WILD", skill:91 },
];

interface SkiHeroProps { language: "en" | "ja" | "zh"; }

export default function SkiHero({}: SkiHeroProps) {
  const [activeRun,setActiveRun]=useState(1);
  const run=runs[activeRun];
  return (
    <header className="ski-game-hero">
      <Image src="/images/ski.jpg" alt="Mountain ski terrain" fill priority className="ski-fallback" />
      <video autoPlay muted loop playsInline poster="/images/ski.jpg"><source src="/videos/ski-video2.mp4" type="video/mp4"/></video>
      <div className="ski-game-shade"/><div className="ski-speed-lines" aria-hidden="true"/>
      <div className="ski-game-copy"><p className="ski-kicker"><MountainSnow size={15}/> WORLD 03 · THE SUMMIT</p><h1>Choose your line.<br/><em>Trust your edges.</em></h1><p>Private ski coaching and guided mountain days built around your level, your goals, and the feeling you came for.</p><a href="#select-run">Select your run <ArrowDown size={18}/></a></div>
      <div className="ski-run-console" id="select-run">
        <div className="ski-console-head"><span><Gauge size={16}/> RUN SELECT</span><small>CONDITIONS / READY</small></div>
        <div className="ski-run-tabs">{runs.map((item,index)=><button key={item.level} className={index===activeRun?"active":""} onClick={()=>setActiveRun(index)}><span>0{index+1}</span>{item.level}</button>)}</div>
        <motion.div key={run.level} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="ski-run-output"><span>SELECTED EXPERIENCE</span><h2>{run.title}</h2><p>{run.copy}</p><div className="ski-stats"><div><small>SLOPE</small><strong>{run.steep}</strong></div><div><small>PACE</small><strong>{run.pace}</strong></div><div><small>LEVEL</small><strong>{run.skill}%</strong></div></div><div className="ski-level"><i style={{width:`${run.skill}%`}}/></div></motion.div>
        <Link href="/contact">Book this experience <ArrowUpRight size={17}/></Link>
      </div>
      <div className="wind-status"><Wind size={17}/><span>LIVE FEEL</span><strong>CRISP / FAST / ALIVE</strong></div>
    </header>
  );
}
