"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Braces, Compass, Eye, LockKeyhole, MountainSnow, Orbit, RotateCcw, Sparkles } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import { getFragments } from "@/lib/exploration";

const principles=["Improve by one percent.","Enter unfamiliar territory.","Build before you feel completely ready.","Learn through people.","Leave something useful behind."];
const artifacts=[
  {id:"code",label:"THE BUILD",icon:Braces,title:"Make complexity feel calm.",copy:"The best code is not the cleverest code. It is the system that lets real people move with confidence."},
  {id:"road",label:"THE ROAD",icon:Compass,title:"Discomfort is information.",copy:"Six years of travel taught me that uncertainty is not a stop sign. It is usually the beginning of the useful part."},
  {id:"mountain",label:"THE MOUNTAIN",icon:MountainSnow,title:"Commit to the line.",copy:"On snow, hesitation costs balance. In work, clarity and decisive movement create the same kind of flow."},
];

export default function BetweenPage(){
  const [access,setAccess]=useState<boolean|null>(null);const [connected,setConnected]=useState<string[]>([]);const [principle,setPrinciple]=useState(0);const [artifact,setArtifact]=useState(0);
  useEffect(()=>{const operator=new URLSearchParams(window.location.search).get("operator")==="1";setAccess(operator||getFragments().length>=3)},[]);
  const connect=(id:string)=>setConnected(current=>current.includes(id)?current:[...current,id]);
  const complete=connected.length===3;const ArtifactIcon=artifacts[artifact].icon;
  if(access===null)return <main className="between-loading">DECODING UNKNOWN SIGNAL…</main>;
  if(!access)return <main className="between-locked"><FloatingButtons/><LockKeyhole size={38}/><p>WORLD 07 / SIGNAL ENCRYPTED</p><h1>The frequency<br/>is incomplete.</h1><span>Recover one fragment from Build, Travel, and Summit to reveal this world.</span><Link href="/">Return to Base</Link></main>;
  return <main className="between-world"><FloatingButtons/><div className="between-stars" aria-hidden="true"/>
    <section className="between-arrival"><p><Eye size={14}/> UNREGISTERED WORLD · ACCESS GRANTED</p><Orbit size={65}/><h1>You found<br/><em>The Between.</em></h1><span>This is where building, exploring and guiding become the same instinct.</span><a href="#constellation">Complete the constellation</a></section>
    <section className="identity-constellation" id="constellation"><div className="between-heading"><p>EXPERIMENT 01 / IDENTITY</p><h2>Connect the three signals.</h2><span>Select every orbiting point.</span></div><div className={complete?"constellation-map complete":"constellation-map"}><div className="orbit-line one"/><div className="orbit-line two"/><div className="constellation-core"><Sparkles/><span>{complete?"RYU":"?"}</span></div>{artifacts.map((item,index)=>{const Icon=item.icon;return <button key={item.id} className={`constellation-node node-${index+1} ${connected.includes(item.id)?"connected":""}`} onClick={()=>connect(item.id)}><Icon/><span>{item.label}</span></button>})}{complete&&<div className="constellation-message"><strong>IDENTITY RESOLVED</strong><p>Curiosity finds the direction.<br/>Craft makes the journey possible.</p></div>}</div></section>
    <section className="protocol-section"><div className="between-heading"><p>EXPERIMENT 02 / OPERATING SYSTEM</p><h2>The One Percent Protocol.</h2><span>Advance through the principles.</span></div><div className="protocol-console"><div>{principles.map((item,index)=><button key={item} onClick={()=>setPrinciple(index)} className={principle===index?"active":""}><span>0{index+1}</span>{item}</button>)}</div><section><small>ACTIVE PRINCIPLE / 0{principle+1}</small><strong>{principles[principle]}</strong><p>Progress is rarely dramatic in the moment. It becomes extraordinary when curiosity and repetition are allowed to compound.</p><button onClick={()=>setPrinciple((principle+1)%principles.length)}>Advance protocol <ArrowUpRight size={16}/></button></section></div></section>
    <section className="artifact-section"><div className="between-heading"><p>EXPERIMENT 03 / ARTIFACTS</p><h2>Three lessons. One person.</h2><span>Inspect the objects left between worlds.</span></div><div className="artifact-lab"><nav>{artifacts.map((item,index)=>{const Icon=item.icon;return <button key={item.id} className={artifact===index?"active":""} onClick={()=>setArtifact(index)}><Icon/><span>{item.label}</span></button>})}</nav><article><ArtifactIcon/><small>RECOVERED ARTIFACT / 0{artifact+1}</small><h3>{artifacts[artifact].title}</h3><p>{artifacts[artifact].copy}</p></article></div></section>
    <section className="between-final"><RotateCcw size={30}/><p>FINAL TRANSMISSION</p><h2>You looked deeper<br/>than most people do.</h2><span>If you are this curious, we should probably build something together.</span><Link href="/contact">Open a private signal <ArrowUpRight size={18}/></Link></section>
  </main>;
}
