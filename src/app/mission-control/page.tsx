"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BookPlus, Flower2, Inbox, LogOut, Orbit, Radio, ShieldCheck } from "lucide-react";

type Message={id:number;name:string;email:string;phone:string;message:string;createdAt:string};

export default function MissionControl(){
  const router=useRouter();const [messages,setMessages]=useState<Message[]>([]);const [loading,setLoading]=useState(true);
  useEffect(()=>{fetch("/api/admin/contacts",{cache:"no-store"}).then(response=>response.ok?response.json():[]).then(data=>{setMessages(data);setLoading(false)}).catch(()=>setLoading(false))},[]);
  const logout=async()=>{await fetch("/api/admin/logout",{method:"POST"});router.replace("/mission-control/login");router.refresh()};
  return <main className="admin-console"><header><div><p><Radio size={14}/> PRIVATE OPERATOR CHANNEL</p><h1>Mission Control</h1></div><button onClick={logout}><LogOut size={16}/> Sign out</button></header>
    <section className="admin-status"><div><ShieldCheck/><span>SESSION</span><strong>SECURE</strong></div><div><Inbox/><span>MESSAGES</span><strong>{loading?"--":String(messages.length).padStart(2,"0")}</strong></div><div><Orbit/><span>HIDDEN WORLD</span><strong>ARMED</strong></div></section>
    <section className="admin-actions"><Link href="/blog/create"><BookPlus/><span><small>CONTENT MODULE</small><strong>Create a field note</strong><p>Write and publish a new journal transmission.</p></span><ArrowUpRight/></Link><Link href="/mission-control/pikmin"><Flower2/><span><small>COLLECTION MODULE</small><strong>Pikmin Bloom tracker</strong><p>Track decor sets, colors, events, and missing Pikmin.</p></span><ArrowUpRight/></Link><Link href="/between?operator=1"><Orbit/><span><small>SECRET MODULE</small><strong>Inspect The Between</strong><p>Preview the visitor-only hidden world.</p></span><ArrowUpRight/></Link></section>
    <section className="admin-inbox"><div className="admin-section-head"><span>INCOMING TRANSMISSIONS</span><small>NEWEST FIRST · MAX 100</small></div>{loading?<p className="admin-empty">SCANNING CHANNEL…</p>:messages.length?messages.map(message=><article key={message.id}><div><span>#{message.id}</span><time>{new Date(message.createdAt).toLocaleString()}</time></div><h2>{message.name}</h2><a href={`mailto:${message.email}`}>{message.email}</a>{message.phone&&<a href={`tel:${message.phone}`}>{message.phone}</a>}<p>{message.message}</p></article>):<p className="admin-empty">NO TRANSMISSIONS RECEIVED</p>}</section>
  </main>;
}
