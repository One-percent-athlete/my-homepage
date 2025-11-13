"use client";

import { motion, type Variants } from "framer-motion";
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

// Define skills per language
const skillsData = {
  en: [
    {
      icon: SiPython,
      title: "Python",
      description: "Building robust and efficient backend systems.",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "Creating dynamic and interactive web applications.",
    },
    {
      icon: SiReact,
      title: "React",
      description: "Developing modern, single-page user interfaces.",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "Server-side rendering and static site generation.",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "Rapid and responsive UI design with utility classes.",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "Designing flexible NoSQL databases for scalability.",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "Managing powerful relational databases.",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "Writing type-safe and scalable JavaScript code.",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "Crafting efficient and scalable server-side applications.",
    },
  ],
  ja: [
    {
      icon: SiPython,
      title: "Python",
      description: "堅牢で効率的なバックエンドシステムを構築。",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "動的でインタラクティブなウェブアプリケーションを作成。",
    },
    {
      icon: SiReact,
      title: "React",
      description: "モダンなシングルページUIを開発。",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "サーバーサイドレンダリングと静的サイト生成。",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "ユーティリティクラスで迅速かつレスポンシブなUI設計。",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "スケーラブルな柔軟なNoSQLデータベースを設計。",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "強力なリレーショナルデータベースを管理。",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "型安全でスケーラブルなJavaScriptコードを作成。",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "効率的でスケーラブルなサーバーサイドアプリケーションを構築。",
    },
  ],
  zh: [
    {
      icon: SiPython,
      title: "Python",
      description: "构建稳健且高效的后端系统。",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
      description: "创建动态交互式网页应用。",
    },
    {
      icon: SiReact,
      title: "React",
      description: "开发现代单页用户界面。",
    },
    {
      icon: SiNextdotjs,
      title: "Next.js",
      description: "服务端渲染与静态站点生成。",
    },
    {
      icon: SiTailwindcss,
      title: "Tailwind CSS",
      description: "使用工具类快速响应式UI设计。",
    },
    {
      icon: SiMongodb,
      title: "MongoDB",
      description: "设计可扩展的灵活NoSQL数据库。",
    },
    {
      icon: SiPostgresql,
      title: "PostgreSQL",
      description: "管理强大的关系型数据库。",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
      description: "编写类型安全且可扩展的JavaScript代码。",
    },
    {
      icon: SiNodedotjs,
      title: "Node.js",
      description: "构建高效可扩展的服务器端应用程序。",
    },
  ],
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function SkillCardGrid() {
  const { language } = useLanguage();
  const skills = skillsData[language]; // get current language skills

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="relative group rounded-xl"
          variants={cardVariants}
        >
          {/* Glow layers */}
          <div className="absolute inset-0 rounded-xl bg-teal-400 opacity-30 blur-3xl group-hover:opacity-70 transition duration-500"></div>
          <div className="absolute inset-0 rounded-xl bg-teal-500 opacity-20 blur-[100px] group-hover:opacity-40 transition duration-700"></div>

          {/* Actual card */}
          <div className="relative bg-neutral-800 p-6 rounded-xl shadow-lg border-2 border-teal-500 flex items-start space-x-4 h-28">
            <div className="text-4xl text-teal-400 flex-shrink-0 mt-1">
              <skill.icon />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">{skill.title}</h3>
              <p className="text-neutral-400 text-sm">{skill.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
