"use client";

import {
  SiPython,
  SiJavascript,
  SiReact,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
} from "react-icons/si";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";

// Define skills per language with proficiency levels and colors
const skillsData = {
  en: [
    {
      icon: SiPython,
      title: "Python",
      description: "Building robust and efficient backend systems.",
      level: 90,
      color: "from-blue-500 to-cyan-400",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "Creating dynamic and interactive web applications.",
      level: 95,
      color: "from-yellow-400 to-yellow-600",
      glow: "rgba(234, 179, 8, 0.3)",
    },
    {
      icon: SiReact,
      title: "React",
      description: "Developing modern, single-page user interfaces.",
      level: 92,
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "Server-side rendering and static site generation.",
      level: 88,
      color: "from-gray-800 to-gray-600",
      glow: "rgba(107, 114, 128, 0.3)",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "Rapid and responsive UI design with utility classes.",
      level: 94,
      color: "from-teal-400 to-cyan-500",
      glow: "rgba(45, 212, 191, 0.3)",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "Designing flexible NoSQL databases for scalability.",
      level: 85,
      color: "from-green-500 to-emerald-400",
      glow: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "Managing powerful relational databases.",
      level: 82,
      color: "from-blue-600 to-indigo-500",
      glow: "rgba(37, 99, 235, 0.3)",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "Writing type-safe and scalable JavaScript code.",
      level: 89,
      color: "from-blue-600 to-blue-800",
      glow: "rgba(30, 64, 175, 0.3)",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "Crafting efficient and scalable server-side applications.",
      level: 87,
      color: "from-green-600 to-lime-500",
      glow: "rgba(101, 163, 13, 0.3)",
    },
  ],
  ja: [
    {
      icon: SiPython,
      title: "Python",
      description: "堅牢で効率的なバックエンドシステムを構築。",
      level: 90,
      color: "from-blue-500 to-cyan-400",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "動的でインタラクティブなウェブアプリケーションを作成。",
      level: 95,
      color: "from-yellow-400 to-yellow-600",
      glow: "rgba(234, 179, 8, 0.3)",
    },
    {
      icon: SiReact,
      title: "React",
      description: "モダンなシングルページUIを開発。",
      level: 92,
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "サーバーサイドレンダリングと静的サイト生成。",
      level: 88,
      color: "from-gray-800 to-gray-600",
      glow: "rgba(107, 114, 128, 0.3)",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "ユーティリティクラスで迅速かつレスポンシブなUI設計。",
      level: 94,
      color: "from-teal-400 to-cyan-500",
      glow: "rgba(45, 212, 191, 0.3)",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "スケーラブルな柔軟なNoSQLデータベースを設計。",
      level: 85,
      color: "from-green-500 to-emerald-400",
      glow: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "強力なリレーショナルデータベースを管理。",
      level: 82,
      color: "from-blue-600 to-indigo-500",
      glow: "rgba(37, 99, 235, 0.3)",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "型安全でスケーラブルなJavaScriptコードを作成。",
      level: 89,
      color: "from-blue-600 to-blue-800",
      glow: "rgba(30, 64, 175, 0.3)",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "効率的でスケーラブルなサーバーサイドアプリケーションを構築。",
      level: 87,
      color: "from-green-600 to-lime-500",
      glow: "rgba(101, 163, 13, 0.3)",
    },
  ],
  zh: [
    {
      icon: SiPython,
      title: "Python",
      description: "构建稳健且高效的后端系统。",
      level: 90,
      color: "from-blue-500 to-cyan-400",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "创建动态交互式网页应用。",
      level: 95,
      color: "from-yellow-400 to-yellow-600",
      glow: "rgba(234, 179, 8, 0.3)",
    },
    {
      icon: SiReact,
      title: "React",
      description: "开发现代单页用户界面。",
      level: 92,
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "服务端渲染与静态站点生成。",
      level: 88,
      color: "from-gray-800 to-gray-600",
      glow: "rgba(107, 114, 128, 0.3)",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "使用工具类快速响应式UI设计。",
      level: 94,
      color: "from-teal-400 to-cyan-500",
      glow: "rgba(45, 212, 191, 0.3)",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "设计可扩展的灵活NoSQL数据库。",
      level: 85,
      color: "from-green-500 to-emerald-400",
      glow: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "管理强大的关系型数据库。",
      level: 82,
      color: "from-blue-600 to-indigo-500",
      glow: "rgba(37, 99, 235, 0.3)",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "编写类型安全且可扩展的JavaScript代码。",
      level: 89,
      color: "from-blue-600 to-blue-800",
      glow: "rgba(30, 64, 175, 0.3)",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "构建高效可扩展的服务器端应用程序。",
      level: 87,
      color: "from-green-600 to-lime-500",
      glow: "rgba(101, 163, 13, 0.3)",
    },
  ],
};

interface SkillCardGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  startIndex?: number;
  count?: number;
}

export default function SkillCardGrid({ sectionTitle = "Technical Skills", sectionSubtitle = "Technologies I work with to bring ideas to life", startIndex = 0, count = 9 }: SkillCardGridProps) {
  const { language } = useLanguage();
  const skills = skillsData[language].slice(startIndex, startIndex + count);
  const [selected, setSelected] = useState(0);
  const active = skills[selected] ?? skills[0];
  const hint = {en:"Select a tool to inspect its role",ja:"ツールを選んで役割を見る",zh:"选择工具查看它的作用"}[language];
  return <div className="capability-matrix">
    <header><h2>{sectionTitle}</h2><p>{sectionSubtitle}</p></header>
    <div className="capability-tiles" aria-label={sectionTitle}>{skills.map((skill,index)=><button type="button" key={skill.title} className={selected===index?"is-selected":""} aria-pressed={selected===index} aria-controls="capability-readout" onClick={()=>setSelected(index)}><small>{String(index+1).padStart(2,"0")}</small><skill.icon aria-hidden="true"/><h3>{skill.title}</h3></button>)}</div>
    {active && <div id="capability-readout" className="capability-readout" aria-live="polite"><active.icon aria-hidden="true"/><div><strong>{active.title}</strong><p>{active.description}</p></div></div>}
    <p className="capability-hint">{hint}</p>
  </div>;
}
