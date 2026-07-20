"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Flower2, Plus, Search, Trash2, X } from "lucide-react";
import "./tracker.css";

type Item={id:number;category:string;decor:string;color:string;owned:boolean;event:boolean;active:boolean};
type Filter="all"|"missing"|"event";
const colors=["Red","Yellow","Blue","Purple","White","Winged","Rock","Ice"] as const;
const colorHex:Record<string,string>={Red:"#ef5350",Yellow:"#ffd84d",Blue:"#4ea3ff",Purple:"#a978e8",White:"#f4f1e8",Winged:"#ff82ba",Rock:"#7d858b",Ice:"#7ce3f4"};

export default function PikminTracker(){
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState<Filter>("all");
  const [formOpen,setFormOpen]=useState(false);
  const [category,setCategory]=useState("");
  const [decor,setDecor]=useState("");
  const [selectedColors,setSelectedColors]=useState<string[]>([...colors]);
  const [saving,setSaving]=useState(false);
  const [pending,setPending]=useState<number[]>([]);
  const [message,setMessage]=useState<{kind:"error"|"success";text:string}|null>(null);

  const load=useCallback(async()=>{
    const response=await fetch("/api/admin/pikmin",{cache:"no-store"});
    const body=await response.json().catch(()=>null);
    if(!response.ok)throw new Error(body?.error||"Could not load the Pikmin collection.");
    setItems(Array.isArray(body)?body:[]);setLoading(false);
  },[]);

  useEffect(()=>{load().catch(error=>{setMessage({kind:"error",text:error instanceof Error?error.message:"Could not load the Pikmin collection."});setLoading(false)})},[load]);

  const categoryGroups=useMemo(()=>{
    const grouped=new Map<string,Map<string,Item[]>>();
    items.forEach(item=>{
      if(!item.active)return;
      const categoryRows=grouped.get(item.category)||new Map<string,Item[]>();
      categoryRows.set(item.decor,[...(categoryRows.get(item.decor)||[]),item]);
      grouped.set(item.category,categoryRows);
    });
    const needle=query.trim().toLowerCase();
    return Array.from(grouped.entries()).map(([categoryName,decorRows])=>({
      category:categoryName,
      rows:Array.from(decorRows.entries()).map(([decorName,rowItems])=>({decor:decorName,items:rowItems,event:rowItems.some(item=>item.event)})).filter(row=>{
        const matchesSearch=!needle||`${categoryName} ${row.decor}`.toLowerCase().includes(needle);
        const matchesFilter=filter==="all"||(filter==="missing"&&row.items.some(item=>!item.owned))||(filter==="event"&&row.event);
        return matchesSearch&&matchesFilter;
      }),
    })).filter(group=>group.rows.length);
  },[items,query,filter]);

  const owned=items.filter(item=>item.owned).length;
  const missing=items.length-owned;
  const categories=new Set(items.map(item=>item.category)).size;
  const decorCount=new Set(items.map(item=>`${item.category}\u0000${item.decor}`)).size;

  const toggle=async(item:Item)=>{
    if(pending.includes(item.id))return;
    const nextOwned=!item.owned;
    setMessage(null);setPending(current=>[...current,item.id]);
    setItems(current=>current.map(entry=>entry.id===item.id?{...entry,owned:nextOwned}:entry));
    try{
      const response=await fetch("/api/admin/pikmin",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:item.id,owned:nextOwned})});
      const body=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(body?.error||"Could not update this Pikmin.");
      if(!body?.id)throw new Error("The selected Pikmin no longer exists.");
    }catch(error){
      setItems(current=>current.map(entry=>entry.id===item.id?item:entry));
      setMessage({kind:"error",text:error instanceof Error?error.message:"Could not update this Pikmin."});
    }finally{setPending(current=>current.filter(id=>id!==item.id))}
  };

  const submit=async(event:FormEvent)=>{
    event.preventDefault();setSaving(true);setMessage(null);
    try{
      const response=await fetch("/api/admin/pikmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({category,decor,colors:selectedColors,event:true})});
      const body=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(body?.error||"Could not add this decor set.");
      setCategory("");setDecor("");setFormOpen(false);await load();
      setMessage({kind:"success",text:"Decor set added to the collection."});
    }catch(error){setMessage({kind:"error",text:error instanceof Error?error.message:"Could not add this decor set."})}
    finally{setSaving(false)}
  };

  const remove=async(categoryName:string,decorName:string)=>{
    if(!window.confirm(`Remove ${categoryName} / ${decorName} from this tracker?`))return;
    setMessage(null);
    try{
      const response=await fetch(`/api/admin/pikmin?category=${encodeURIComponent(categoryName)}&decor=${encodeURIComponent(decorName)}`,{method:"DELETE"});
      const body=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(body?.error||"Could not remove this decor set.");
      setItems(current=>current.filter(item=>item.category!==categoryName||item.decor!==decorName));
    }catch(error){setMessage({kind:"error",text:error instanceof Error?error.message:"Could not remove this decor set."})}
  };

  return <main className="decor-tracker">
    <header className="decor-header"><Link href="/mission-control"><ArrowLeft/> Mission Control</Link><div><p><Flower2/> PRIVATE COLLECTION MODULE</p><h1>Pikmin Bloom <em>Decor Tracker</em></h1><span>Click a color cell to switch it between missing and collected.</span></div><button onClick={()=>{setMessage(null);setFormOpen(true)}}><Plus/> Add event set</button></header>
    <section className="decor-stats"><div><span>DECOR TYPES</span><strong>{decorCount}</strong><small>{categories} categories</small></div><div><span>TOTAL PIKMIN</span><strong>{items.length}</strong><small>all available colors</small></div><div><span>COLLECTED</span><strong>{owned}</strong><small>{items.length?Math.round(owned/items.length*100):0}% complete</small></div><div><span>MISSING</span><strong>{missing}</strong><small>keep walking</small></div><div className="decor-progress"><i style={{width:`${items.length?owned/items.length*100:0}%`}}/></div></section>
    <section className="decor-toolbar"><label><Search/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search category or decor"/></label><div>{(["all","missing","event"] as const).map(value=><button key={value} onClick={()=>setFilter(value)} className={filter===value?"active":""}>{value}</button>)}</div></section>
    {message&&<div className={`decor-message ${message.kind}`} role="status"><span>{message.text}</span><button onClick={()=>setMessage(null)} aria-label="Dismiss message"><X/></button></div>}
    {loading?<p className="decor-loading">GERMINATING COLLECTION DATA…</p>:categoryGroups.length?<div className="decor-table-wrap"><table className="decor-table"><thead><tr><th>Category</th><th>Decor</th><th>Progress</th>{colors.map(color=><th key={color}><i style={{background:colorHex[color]}}/>{color}</th>)}<th>Action</th></tr></thead><tbody>{categoryGroups.map(group=>group.rows.map((row,rowIndex)=>{const rowOwned=row.items.filter(item=>item.owned).length;return <tr key={`${group.category}-${row.decor}`} className={rowOwned===row.items.length?"complete":""}>{rowIndex===0&&<th className="category-cell" rowSpan={group.rows.length}><span>{group.category}</span><small>{group.rows.length} {group.rows.length===1?"decor":"decors"}</small></th>}<th className="decor-cell"><span>{row.decor}</span><small>{row.event?"EVENT DECOR":"LOCATION DECOR"}</small></th><td className="row-progress"><strong>{rowOwned}/{row.items.length}</strong><i><b style={{width:`${row.items.length?rowOwned/row.items.length*100:0}%`}}/></i></td>{colors.map(color=>{const item=row.items.find(entry=>entry.color===color);return <td key={color} className="color-cell">{item?<button className={`${item.owned?"owned":"missing"} ${pending.includes(item.id)?"saving":""}`} onClick={()=>toggle(item)} disabled={pending.includes(item.id)} style={{"--decor-color":colorHex[color]} as React.CSSProperties} aria-label={`${item.owned?"Mark missing":"Mark collected"}: ${group.category}, ${row.decor}, ${color}`}><i/>{pending.includes(item.id)?<span>…</span>:item.owned?<Check/>:<X/>}</button>:<span className="unavailable">—</span>}</td>})}<td className="action-cell">{row.event?<button onClick={()=>remove(group.category,row.decor)} aria-label={`Remove ${row.decor}`}><Trash2/></button>:<span>—</span>}</td></tr>}))}</tbody></table></div>:<div className="decor-empty"><Flower2/><h2>No decor rows match.</h2><p>Try a different search or filter.</p></div>}
    {formOpen&&<div className="decor-modal" role="dialog" aria-modal="true"><form onSubmit={submit}><button type="button" className="modal-close" onClick={()=>{setFormOpen(false);setMessage(null)}} aria-label="Close"><X/></button><p>MONTHLY EVENT CATALOG</p><h2>Add a decor set</h2><label>Event or category name<input value={category} onChange={event=>setCategory(event.target.value)} placeholder="July 2026 Event" required maxLength={120}/></label><label>Decor set name<input value={decor} onChange={event=>setDecor(event.target.value)} placeholder="Summer Sticker" required maxLength={160}/></label><fieldset><legend>Available colors</legend>{colors.map(color=><button type="button" key={color} className={selectedColors.includes(color)?"active":""} onClick={()=>setSelectedColors(current=>current.includes(color)?current.filter(item=>item!==color):[...current,color])} style={{"--decor-color":colorHex[color]} as React.CSSProperties}><i/>{color}</button>)}</fieldset>{message?.kind==="error"&&<div className="modal-error">{message.text}</div>}<button type="submit" className="modal-submit" disabled={saving||!selectedColors.length}>{saving?"ADDING SET…":"ADD TO COLLECTION"}</button></form></div>}
  </main>;
}
