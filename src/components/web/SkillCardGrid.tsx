"use client";

import { SiPython, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript, SiNodedotjs } from "react-icons/si";
import LogoShowcase from "@/components/web/LogoShowcase";

const tools = [
  {title:"Python",icon:SiPython}, {title:"JavaScript",icon:SiJavascript}, {title:"React",icon:SiReact},
  {title:"Next.js",icon:SiNextdotjs}, {title:"Tailwind CSS",icon:SiTailwindcss}, {title:"MongoDB",icon:SiMongodb},
  {title:"PostgreSQL",icon:SiPostgresql}, {title:"TypeScript",icon:SiTypescript}, {title:"Node.js",icon:SiNodedotjs},
];

export default function SkillCardGrid({sectionTitle="Tools I build with",sectionSubtitle="My toolkit for bringing ideas to life.",startIndex=0,count=9}:{sectionTitle?:string;sectionSubtitle?:string;startIndex?:number;count?:number}) {
  const shown = tools.slice(startIndex,startIndex+count);
  return <div className="capability-matrix unified-toolkit-content">
    <header><h2>{sectionTitle}</h2><p>{sectionSubtitle}</p></header>
    <div className="toolkit-desktop"><LogoShowcase tools={shown}/></div>
    <ul className="capability-tiles toolkit-mobile" aria-label={sectionTitle}>{shown.map((tool,index)=><li key={tool.title}><small>{String(index+1).padStart(2,"0")}</small><tool.icon aria-hidden="true"/><h3>{tool.title}</h3></li>)}</ul>
  </div>;
}
