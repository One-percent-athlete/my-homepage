"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const projects = {
  en: [
    {
      title: "Task Schedule Management App",
      description: "Manage tasks efficiently with a sleek interface.",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Product Management App",
      description: "Organize and track products with real-time updates.",
      tech: ["Next.js", "Express", "PostgreSQL"],
    },
    {
      title: "Landing Page",
      description: "A responsive and modern landing page design.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Homepage",
      description: "Interactive homepage with animations and dark mode.",
      tech: ["React", "TailwindCSS"],
    },
    {
      title: "EC Site",
      description: "E-commerce platform with secure payment integration.",
      tech: ["Next.js", "Stripe", "MongoDB"],
    },
    {
      title: "Matching App",
      description: "Connect users efficiently with smart matching algorithms.",
      tech: ["React Native", "Firebase"],
    },
  ],
  ja: [
    {
      title: "タスク管理アプリ",
      description: "洗練されたインターフェイスでタスクを効率的に管理。",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "商品管理アプリ",
      description: "リアルタイム更新で商品を整理・追跡。",
      tech: ["Next.js", "Express", "PostgreSQL"],
    },
    {
      title: "ランディングページ",
      description: "レスポンシブでモダンなランディングページデザイン。",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "ホームページ",
      description: "アニメーションとダークモード対応のインタラクティブなホームページ。",
      tech: ["React", "TailwindCSS"],
    },
    {
      title: "ECサイト",
      description: "安全な決済統合を備えたEコマースプラットフォーム。",
      tech: ["Next.js", "Stripe", "MongoDB"],
    },
    {
      title: "マッチングアプリ",
      description: "スマートなマッチングアルゴリズムでユーザーを効率的に接続。",
      tech: ["React Native", "Firebase"],
    },
  ],
  zh: [
    {
      title: "任务管理应用",
      description: "通过简洁的界面高效管理任务。",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "产品管理应用",
      description: "实时更新，轻松组织和追踪产品。",
      tech: ["Next.js", "Express", "PostgreSQL"],
    },
    {
      title: "落地页",
      description: "响应式且现代的落地页设计。",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "主页",
      description: "具有动画和暗模式的交互式主页。",
      tech: ["React", "TailwindCSS"],
    },
    {
      title: "电商网站",
      description: "具有安全支付集成的电子商务平台。",
      tech: ["Next.js", "Stripe", "MongoDB"],
    },
    {
      title: "匹配应用",
      description: "通过智能匹配算法高效连接用户。",
      tech: ["React Native", "Firebase"],
    },
  ],
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function ProjectCardGrid() {
  const { language } = useLanguage();
  const currentProjects = projects[language]; // select projects based on current language

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {currentProjects.map((project, index) => (
        <motion.div
          key={index}
          className="relative group rounded-xl"
          variants={cardVariants}
        >
          {/* Stronger Glow layer */}
          <div className="absolute inset-0 rounded-xl bg-teal-400 opacity-40 blur-3xl group-hover:opacity-80 transition duration-500"></div>

          {/* Extra halo for depth */}
          <div className="absolute inset-0 rounded-xl bg-teal-500 opacity-20 blur-[100px] group-hover:opacity-40 transition duration-700"></div>

          {/* Actual card content with a fixed height */}
          <div className="relative bg-neutral-800 p-8 rounded-xl shadow-lg border-2 border-teal-500 h-48 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-teal-900 text-teal-300 px-3 py-1 text-xs rounded-full font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
