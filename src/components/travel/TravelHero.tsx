"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Route } from "lucide-react";
import { recordWorldStep } from "@/lib/exploration";

const routes = [
  { name: "High ground", place: "PATAGONIA", coordinate: "50.9423° S", note: "Walk until the noise disappears." },
  { name: "Ancient paths", place: "PETRA", coordinate: "30.3285° N", note: "History rewards the curious." },
  { name: "Open water", place: "DAHAB", coordinate: "28.5091° N", note: "Breathe deeper. Look closer." },
];

interface TravelHeroProps { scrollY: number; language: "en" | "ja" | "zh"; }

export default function TravelHero({ scrollY }: TravelHeroProps) {
  const [activeRoute, setActiveRoute] = useState(0);
  const route = routes[activeRoute];
  useEffect(()=>{ recordWorldStep("travel",0,routes.length); },[]);
  const selectRoute=(index:number)=>{setActiveRoute(index);recordWorldStep("travel",index,routes.length)};
  return (
    <section className="travel-log-hero">
      <video autoPlay loop muted playsInline poster="/images/dahab.jpg"><source src="/videos/bogota.mp4" type="video/mp4" /></video>
      <div className="travel-log-shade" />
      <motion.div className="travel-sun" style={{ transform:`translate3d(0,${Math.min(scrollY*.12,90)}px,0)` }} />
      <div className="travel-hero-copy"><p className="travel-kicker">WORLD 02 · THE FIELD LOG</p><h1>The world is not<br /><em>background scenery.</em></h1><p>It is the teacher. These are fragments from 80+ countries, six years on the road, and a life shaped by choosing the unfamiliar.</p><a href="#travel-routes">Open the log <ArrowDown size={18}/></a></div>
      <div className="route-selector" id="travel-routes">
        <div className="route-tabs">{routes.map((item,index)=><button key={item.name} className={activeRoute===index?"active":""} onClick={()=>selectRoute(index)}><span>0{index+1}</span>{item.name}</button>)}</div>
        <motion.div key={route.place} initial={{opacity:0,x:15}} animate={{opacity:1,x:0}} className="route-readout"><MapPin size={22}/><span>FIELD SIGNAL</span><h2>{route.place}</h2><p>{route.coordinate}</p><blockquote>“{route.note}”</blockquote><Route size={22}/></motion.div>
      </div>
    </section>
  );
}
