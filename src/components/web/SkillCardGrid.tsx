"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
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
import { useState, useRef, useEffect } from "react";

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

const cardVariants: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Update the component to accept props
interface SkillCardGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function SkillCardGrid({ 
  sectionTitle = "Technical Skills", 
  sectionSubtitle = "Technologies I work with to bring ideas to life" 
}: SkillCardGridProps) {
  const { language } = useLanguage();
  const skills = skillsData[language];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 1000, 
              y: Math.random() * 800,
              scale: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Section title with animation - Now using props */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 mb-4">
          {sectionTitle}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto rounded-full" />
        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
          {sectionSubtitle}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: { 
            transition: { 
              staggerChildren: 0.15,
              delayChildren: 0.2
            } 
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative group"
            variants={cardVariants}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover="hover"
          >
            {/* Animated gradient border */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`} />
            
            {/* Multi-layer glow effect */}
            <div 
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"
              style={{ backgroundColor: skill.glow }}
            />

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-xl border border-neutral-700 shadow-2xl h-full flex flex-col">
              {/* Header with icon and title */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className={`text-3xl bg-gradient-to-r ${skill.color}`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <skill.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                </div>
                
                {/* Proficiency badge */}
                <motion.div 
                  className="px-2 py-1 rounded-full text-xs font-bold bg-neutral-700 text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {skill.level}%
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-neutral-300 text-sm mb-4 flex-grow">
                {skill.description}
              </p>

              {/* Animated progress bar */}
              <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut" 
                  }}
                />
              </div>

              {/* Hover effect particles */}
              <AnimatePresence>
                {hoveredCard === index && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                        initial={{ 
                          scale: 0, 
                          opacity: 1,
                          x: 20,
                          y: 20
                        }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [1, 0.5, 0],
                          x: [20, Math.random() * 100 - 50],
                          y: [20, Math.random() * 100 - 50]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}