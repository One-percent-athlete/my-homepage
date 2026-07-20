"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Radio, Search } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

type Category="TECH_BUSINESS"|"TRAVEL_CULTURE"|"SKI_SNOW";
type ApiPost={id:string;slug:string;title:string;content:string;coverImage?:string|null;createdAt:string;category:Category};
const labels:Record<Category,string>={TECH_BUSINESS:"Build notes",TRAVEL_CULTURE:"Field notes",SKI_SNOW:"Mountain notes"};
const frequencies:[Category|null,string][]=[[null,"All signals"],["TECH_BUSINESS","Build"],["TRAVEL_CULTURE","Explore"],["SKI_SNOW","Summit"]];
const excerpt=(value:string)=>value.replace(/<[^>]+>/g,"").slice(0,150)+(value.length>150?"…":"");

export default function BlogPage(){
  const [posts,setPosts]=useState<ApiPost[]>([]);const [active,setActive]=useState<Category|null>(null);const [query,setQuery]=useState("");
  useEffect(()=>{fetch("/api/blog",{cache:"no-store"}).then(r=>r.ok?r.json():[]).then(setPosts).catch(()=>setPosts([]))},[]);
  const filtered=posts.filter(post=>(!active||post.category===active)&&post.title.toLowerCase().includes(query.toLowerCase()));
  return <div className="journal-world"><FloatingButtons/>
    <header className="journal-hero"><div><p><Radio size={14}/> WORLD 04 · INCOMING TRANSMISSIONS</p><h1>Notes from the<br/><em>spaces between worlds.</em></h1></div><div className="journal-receiver"><span>SIGNAL INDEX</span><strong>{String(posts.length).padStart(2,"0")}</strong><small>entries received</small></div></header>
    <section className="journal-controls"><div>{frequencies.map(([value,label])=><button key={label} onClick={()=>setActive(value)} className={active===value?"active":""}>{label}</button>)}</div><label><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the archive"/></label></section>
    <main className="journal-grid">{filtered.map((post,index)=><article key={post.id} className={index===0?"featured":""}><Link href={`/blog/${post.slug}`} className="journal-image"><Image src={post.coverImage||"/images/astro.jpg"} alt="" fill sizes={index===0?"100vw":"(max-width:800px) 100vw, 33vw"}/><span>{labels[post.category]}</span></Link><div className="journal-copy"><small>{new Date(post.createdAt).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})} · SIGNAL {String(index+1).padStart(2,"0")}</small><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{excerpt(post.content)}</p><Link href={`/blog/${post.slug}`} className="journal-open">Decode entry <ArrowUpRight size={16}/></Link></div></article>)}</main>
    {!filtered.length&&<div className="journal-empty"><BookOpen size={30}/><h2>No signal on this frequency.</h2><p>Try another channel or return when a new field note arrives.</p></div>}
    <section className="journal-cta"><p>END OF CURRENT TRANSMISSION</p><h2>Have a question from the field?</h2><Link href="/contact">Reply to Ryu <ArrowUpRight size={17}/></Link></section><Footer/>
  </div>;
}
