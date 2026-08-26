"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import styles from "./demo.module.css";
import { demoSlugs, demoTitles, type DemoSlug } from "./demo-data";
import TaskScheduleDemo from "./TaskScheduleDemo";
import ProductManagementDemo from "./ProductManagementDemo";
import ModernLandingDemo from "./ModernLandingDemo";
import InteractivePortfolioDemo from "./InteractivePortfolioDemo";
import EcommerceDemo from "./EcommerceDemo";
import SmartMatchingDemo from "./SmartMatchingDemo";

const meta:Record<DemoSlug,{label:string;note:string}>={
  "task-schedule":{label:"Dayflow",note:"Board, calendar, analytics, and task planning."},
  "product-management":{label:"Catalog OS",note:"Products, stock, suppliers, and reporting."},
  "modern-landing":{label:"Halo",note:"Interactive launch storytelling and conversion."},
  "interactive-portfolio":{label:"Frame",note:"An immersive, filterable case-study portfolio."},
  "ecommerce-platform":{label:"Noma",note:"Catalog, favorites, cart, and demo checkout."},
  "smart-matching":{label:"Orbit",note:"Matching signals, connections, and simulated chat."},
};

export default function DemoExperience({slug}:{slug:DemoSlug}){const info=meta[slug];return <main className={styles.shell}><header className={styles.demoBar}><Link href="/web#projects" className={styles.back}><ArrowLeft/>Back to projects</Link><div className={styles.demoIdentity}><span>LIVE</span><strong>{info.label}</strong><small>{info.note}</small></div><nav><label htmlFor="demo-picker">Demo</label><select id="demo-picker" value={slug} onChange={event=>{window.location.href=`/demos/${event.target.value}`}}>{demoSlugs.map(item=><option key={item} value={item}>{demoTitles[item]}</option>)}</select><ChevronDown/></nav></header>{slug==="task-schedule"&&<TaskScheduleDemo/>}{slug==="product-management"&&<ProductManagementDemo/>}{slug==="modern-landing"&&<ModernLandingDemo/>}{slug==="interactive-portfolio"&&<InteractivePortfolioDemo/>}{slug==="ecommerce-platform"&&<EcommerceDemo/>}{slug==="smart-matching"&&<SmartMatchingDemo/>}</main>}
