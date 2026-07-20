"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { FiExternalLink, FiGithub, FiEye, FiEyeOff } from "react-icons/fi";

const projects = {
  en: [
    {
      title: "Task Schedule Management App",
      description: "A sophisticated task management solution with intuitive drag-and-drop functionality and real-time collaboration features.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "Web App",
      status: "Completed",
      github: "#",
      live: "#",
      accent: "from-purple-500 to-pink-500",
      icon: "📅",
    },
    {
      title: "Product Management System",
      description: "Enterprise-grade product management platform with inventory tracking, analytics dashboard, and supplier integration.",
      tech: ["Next.js", "Express", "PostgreSQL", "Redis"],
      category: "Enterprise",
      status: "In Progress",
      github: "#",
      live: "#",
      accent: "from-blue-500 to-cyan-400",
      icon: "📦",
    },
    {
      title: "Modern Landing Page",
      description: "High-converting landing page with advanced animations, A/B testing capabilities, and seamless CMS integration.",
      tech: ["HTML", "CSS", "JavaScript", "GSAP"],
      category: "Marketing",
      status: "Completed",
      github: "#",
      live: "#",
      accent: "from-green-500 to-emerald-400",
      icon: "🚀",
    },
    {
      title: "Interactive Portfolio",
      description: "Cutting-edge portfolio website with 3D elements, smooth page transitions, and immersive user experience.",
      tech: ["React", "TailwindCSS", "Framer Motion", "Three.js"],
      category: "Portfolio",
      status: "Completed",
      github: "#",
      live: "#",
      accent: "from-orange-500 to-red-500",
      icon: "🎨",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with secure payments, inventory management, and customer analytics.",
      tech: ["Next.js", "Stripe", "MongoDB", "Prisma"],
      category: "E-Commerce",
      status: "Completed",
      github: "#",
      live: "#",
      accent: "from-indigo-500 to-purple-500",
      icon: "🛒",
    },
    {
      title: "Smart Matching App",
      description: "AI-powered matching platform with machine learning algorithms and real-time chat functionality.",
      tech: ["React Native", "Firebase", "TensorFlow", "Node.js"],
      category: "Mobile App",
      status: "In Progress",
      github: "#",
      live: "#",
      accent: "from-teal-500 to-blue-500",
      icon: "💫",
    },
  ],
  ja: [
    {
      title: "タスク管理アプリ",
      description: "直感的なドラッグ＆ドロップ機能とリアルタイム協働機能を備えた高度なタスク管理ソリューション。",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "Webアプリ",
      status: "完了",
      github: "#",
      live: "#",
      accent: "from-purple-500 to-pink-500",
      icon: "📅",
    },
    {
      title: "商品管理システム",
      description: "在庫管理、分析ダッシュボード、仕入れ先連携を備えたエンタープライズグレードの商品管理プラットフォーム。",
      tech: ["Next.js", "Express", "PostgreSQL", "Redis"],
      category: "エンタープライズ",
      status: "進行中",
      github: "#",
      live: "#",
      accent: "from-blue-500 to-cyan-400",
      icon: "📦",
    },
    {
      title: "モダンランディングページ",
      description: "高度なアニメーション、A/Bテスト機能、シームレスなCMS連携を備えた高コンバージョンランディングページ。",
      tech: ["HTML", "CSS", "JavaScript", "GSAP"],
      category: "マーケティング",
      status: "完了",
      github: "#",
      live: "#",
      accent: "from-green-500 to-emerald-400",
      icon: "🚀",
    },
    {
      title: "インタラクティブポートフォリオ",
      description: "3D要素、スムーズなページ遷移、没入型ユーザー体験を備えた最先端のポートフォリオウェブサイト。",
      tech: ["React", "TailwindCSS", "Framer Motion", "Three.js"],
      category: "ポートフォリオ",
      status: "完了",
      github: "#",
      live: "#",
      accent: "from-orange-500 to-red-500",
      icon: "🎨",
    },
    {
      title: "Eコマースプラットフォーム",
      description: "安全な決済、在庫管理、顧客分析を備えたフルスタックEコマースソリューション。",
      tech: ["Next.js", "Stripe", "MongoDB", "Prisma"],
      category: "Eコマース",
      status: "完了",
      github: "#",
      live: "#",
      accent: "from-indigo-500 to-purple-500",
      icon: "🛒",
    },
    {
      title: "スマートマッチングアプリ",
      description: "機械学習アルゴリズムとリアルタイムチャット機能を備えたAI駆動のマッチングプラットフォーム。",
      tech: ["React Native", "Firebase", "TensorFlow", "Node.js"],
      category: "モバイルアプリ",
      status: "進行中",
      github: "#",
      live: "#",
      accent: "from-teal-500 to-blue-500",
      icon: "💫",
    },
  ],
  zh: [
    {
      title: "任务管理应用",
      description: "具有直观拖放功能和实时协作特性的复杂任务管理解决方案。",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "网络应用",
      status: "已完成",
      github: "#",
      live: "#",
      accent: "from-purple-500 to-pink-500",
      icon: "📅",
    },
    {
      title: "产品管理系统",
      description: "具有库存跟踪、分析仪表板和供应商集成的企业级产品管理平台。",
      tech: ["Next.js", "Express", "PostgreSQL", "Redis"],
      category: "企业级",
      status: "进行中",
      github: "#",
      live: "#",
      accent: "from-blue-500 to-cyan-400",
      icon: "📦",
    },
    {
      title: "现代落地页",
      description: "具有高级动画、A/B测试功能和无缝CMS集成的高转化落地页。",
      tech: ["HTML", "CSS", "JavaScript", "GSAP"],
      category: "营销",
      status: "已完成",
      github: "#",
      live: "#",
      accent: "from-green-500 to-emerald-400",
      icon: "🚀",
    },
    {
      title: "交互式作品集",
      description: "具有3D元素、流畅页面过渡和沉浸式用户体验的尖端作品集网站。",
      tech: ["React", "TailwindCSS", "Framer Motion", "Three.js"],
      category: "作品集",
      status: "已完成",
      github: "#",
      live: "#",
      accent: "from-orange-500 to-red-500",
      icon: "🎨",
    },
    {
      title: "电子商务平台",
      description: "具有安全支付、库存管理和客户分析的全栈电子商务解决方案。",
      tech: ["Next.js", "Stripe", "MongoDB", "Prisma"],
      category: "电子商务",
      status: "已完成",
      github: "#",
      live: "#",
      accent: "from-indigo-500 to-purple-500",
      icon: "🛒",
    },
    {
      title: "智能匹配应用",
      description: "具有机器学习算法和实时聊天功能的AI驱动匹配平台。",
      tech: ["React Native", "Firebase", "TensorFlow", "Node.js"],
      category: "移动应用",
      status: "进行中",
      github: "#",
      live: "#",
      accent: "from-teal-500 to-blue-500",
      icon: "💫",
    },
  ],
};

const cardVariants: Variants = {
  hidden: { 
    y: 60, 
    opacity: 0,
    scale: 0.9,
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

interface ProjectCardGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function ProjectCardGrid({ 
  sectionTitle = "Featured Projects", 
  sectionSubtitle = "A showcase of my recent work and creative solutions" 
}: ProjectCardGridProps) {
  const { language } = useLanguage();
  const currentProjects = projects[language];
  const ui = {
    en:{live:"Live Demo",code:"Code",details:"Project Details",description:"Description",stack:"Technology Stack",category:"Category",status:"Status",view:"View Project",source:"Source Code"},
    ja:{live:"デモを見る",code:"コード",details:"プロジェクト詳細",description:"説明",stack:"使用技術",category:"カテゴリー",status:"状態",view:"プロジェクトを見る",source:"ソースコード"},
    zh:{live:"在线演示",code:"代码",details:"项目详情",description:"说明",stack:"技术栈",category:"类别",status:"状态",view:"查看项目",source:"源代码"},
  }[language];
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
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

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div ref={gridRef} className="relative">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 mb-4">
          {sectionTitle}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto rounded-full mb-4" />
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          {sectionSubtitle}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: { 
            transition: { 
              staggerChildren: 0.2,
              delayChildren: 0.3
            } 
          },
        }}
      >
        {currentProjects.map((project, index) => (
          <motion.div
            key={index}
            className="relative group perspective-1000 min-h-[400px] cursor-none"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Background Glow */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${project.accent} rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500 cursor-none`} />
            
            {/* Main Card Container */}
            <div 
              className={`relative h-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden cursor-none transform-style-preserve-3d transition-transform duration-700 ease-in-out ${
                flippedCards.includes(index) ? 'rotate-y-180' : ''
              }`}
              onClick={() => toggleFlip(index)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of Card */}
              <div className={`front face w-full h-full backface-hidden p-6 flex flex-col cursor-none ${flippedCards.includes(index) ? 'hidden' : 'block'}`}>
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4 cursor-none">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.accent} flex items-center justify-center text-2xl mb-3 cursor-none`}>
                    {project.icon}
                  </div>
                  <button 
                    className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg cursor-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip(index);
                    }}
                  >
                    <FiEyeOff size={18} />
                  </button>
                </div>

                {/* Project Info */}
                <div className="flex-grow cursor-none">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight cursor-none">
                    {project.title}
                  </h3>
                  
                  <p className="text-neutral-300 text-sm mb-6 line-clamp-3 leading-relaxed cursor-none">
                    {project.description}
                  </p>

                  {/* Status & Category */}
                  <div className="flex gap-2 mb-6 cursor-none">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold cursor-none ${
                      project.status === "Completed" 
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}>
                      {project.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-700 text-neutral-300 border border-neutral-600 cursor-none">
                      {project.category}
                    </span>
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2 mb-6 cursor-none">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-neutral-800 text-neutral-300 px-3 py-1 text-xs rounded-lg font-medium border border-neutral-700 cursor-none"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="bg-neutral-800 text-neutral-400 px-3 py-1 text-xs rounded-lg font-medium border border-neutral-700 cursor-none">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-neutral-700 cursor-none">
                  <a 
                    href={project.live}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={16} />
                    {ui.live}
                  </a>
                  <a 
                    href={project.github}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border border-neutral-700 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={16} />
                    {ui.code}
                  </a>
                </div>
              </div>

              {/* Back of Card - Detailed View */}
              <div className={`back face w-full h-full backface-hidden p-6 flex flex-col cursor-none ${flippedCards.includes(index) ? 'block' : 'hidden'}`}>
                <div className="flex items-start justify-between mb-6 cursor-none">
                  <h3 className="text-xl font-bold text-white cursor-none">{ui.details}</h3>
                  <button 
                    className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg cursor-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip(index);
                    }}
                  >
                    <FiEye size={18} />
                  </button>
                </div>
                
                <div className="flex-grow space-y-6 cursor-none">
                  {/* Full Description */}
                  <div className="cursor-none">
                    <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide text-neutral-400 cursor-none">{ui.description}</h4>
                    <p className="text-neutral-300 text-sm leading-relaxed cursor-none">
                      {project.description}
                    </p>
                  </div>

                  {/* Full Tech Stack */}
                  <div className="cursor-none">
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide text-neutral-400 cursor-none">{ui.stack}</h4>
                    <div className="flex flex-wrap gap-2 cursor-none">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-neutral-800 text-neutral-300 px-3 py-2 text-sm rounded-lg font-medium border border-neutral-700 cursor-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-sm cursor-none">
                    <div className="cursor-none">
                      <span className="text-neutral-400 block mb-1 cursor-none">{ui.category}:</span>
                      <p className="text-white font-medium cursor-none">{project.category}</p>
                    </div>
                    <div className="cursor-none">
                      <span className="text-neutral-400 block mb-1 cursor-none">{ui.status}:</span>
                      <p className={`font-medium cursor-none ${
                        project.status === "Completed" ? "text-green-400" : "text-yellow-400"
                      }`}>
                        {project.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back Side Actions */}
                <div className="flex gap-3 pt-6 mt-6 border-t border-neutral-700 cursor-none">
                  <a 
                    href={project.live}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={16} />
                    {ui.view}
                  </a>
                  <a 
                    href={project.github}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border border-neutral-700 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={16} />
                    {ui.source}
                  </a>
                </div>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-teal-400/20 transition-all duration-300 pointer-events-none cursor-none" />
          </motion.div>
        ))}
      </motion.div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 cursor-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-10 cursor-none"
            initial={{ 
              x: Math.random() * 1200, 
              y: Math.random() * 800,
              scale: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.15, 0],
            }}
            transition={{ 
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
