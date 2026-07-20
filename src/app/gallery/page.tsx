"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, X } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import styles from "./Gallery.module.css";

const frames = [
  ["0.jpg","Transit","Between one place and the next"],["1.jpg","Altitude","A different scale of quiet"],["2.jpg","Human lines","Where stories cross"],["3.jpg","Open road","The long way is often better"],["4.jpg","Blue hour","When the city exhales"],["6.jpg","Edge of land","Nothing beyond but weather"],["7.jpg","Field study","Details worth stopping for"],["8.jpg","Unknown street","Get lost on purpose"],["9.jpg","High country","Earned perspective"],["10.jpg","Local light","A place remembers its colors"],["11.jpg","Still water","Silence with depth"],["12.jpg","Night signal","Life after sundown"],["13.jpg","Far side","Proof that I was curious"],["14.jpg","Return route","Never quite the same person"],
];

export default function GalleryPage(){
  const [selected,setSelected]=useState<number|null>(null);
  return <main className={styles.archive}>
    <FloatingButtons/>
    <header className={styles.hero}><p><Camera size={15}/> WORLD 05 · THE VISUAL ARCHIVE</p><h1>Collected light.<br/><em>Unfinished stories.</em></h1><span>Select any frame to enter it.</span></header>
    <section className={styles.grid}>{frames.map(([file,title,note],index)=><button key={file} className={styles.frame} onClick={()=>setSelected(index)}><span className={styles.number}>{String(index+1).padStart(2,"0")}</span><div className={styles.image}><Image src={`/gallery/${file}`} alt={title} fill sizes="(max-width:700px) 100vw, 33vw"/></div><div className={styles.caption}><div><h2>{title}</h2><p>{note}</p></div><Maximize2 size={17}/></div></button>)}</section>
    {selected!==null&&<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={frames[selected][1]} onClick={()=>setSelected(null)}><button onClick={()=>setSelected(null)} aria-label="Close image"><X/></button><div className={styles.lightboxImage} onClick={(event)=>event.stopPropagation()}><Image src={`/gallery/${frames[selected][0]}`} alt={frames[selected][1]} fill sizes="100vw"/><div><span>FRAME {String(selected+1).padStart(2,"0")}</span><h2>{frames[selected][1]}</h2><p>{frames[selected][2]}</p></div></div></div>}
  </main>;
}
