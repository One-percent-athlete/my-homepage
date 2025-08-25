"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJsSquare, FaStripe, FaMobileAlt } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Projects() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const localeKey = (["en", "ja", "zh"] as const).includes(locale as any)
    ? (locale as "en" | "ja" | "zh")
    : "en";

  // Translations (text only)
  const t = useMemo(() => ({
    en: {
      title: "Projects",
      projects: [
        { title: "Task Schedule Management App", desc: "Manage tasks efficiently with a sleek interface.", tech: ["React", "Node.js", "MongoDB"] },
        { title: "Product Management App", desc: "Organize and track products with real-time updates.", tech: ["Next.js", "Express", "PostgreSQL"] },
        { title: "Landing Page", desc: "A responsive and modern landing page design.", tech: ["HTML", "CSS", "JavaScript"] },
        { title: "Homepage", desc: "Interactive homepage with animations and dark mode.", tech: ["React", "TailwindCSS"] },
        { title: "EC Site", desc: "E-commerce platform with secure payment integration.", tech: ["Next.js", "Stripe", "MongoDB"] },
        { title: "Matching App", desc: "Connect users efficiently with smart matching algorithms.", tech: ["React Native", "Firebase"] },
      ]
    },
    ja: {
      title: "プロジェクト",
      projects: [
        { title: "タスクスケジュール管理アプリ", desc: "洗練されたインターフェースでタスクを効率的に管理。", tech: ["React", "Node.js", "MongoDB"] },
        { title: "プロダクト管理アプリ", desc: "リアルタイムで製品を整理・追跡。", tech: ["Next.js", "Express", "PostgreSQL"] },
        { title: "ランディングページ", desc: "レスポンシブでモダンなランディングページデザイン。", tech: ["HTML", "CSS", "JavaScript"] },
        { title: "ホームページ", desc: "アニメーションとダークモード付きのインタラクティブホームページ。", tech: ["React", "TailwindCSS"] },
        { title: "ECサイト", desc: "安全な決済統合を備えたEコマースプラットフォーム。", tech: ["Next.js", "Stripe", "MongoDB"] },
        { title: "マッチングアプリ", desc: "スマートなマッチングアルゴリズムでユーザーを効率的に接続。", tech: ["React Native", "Firebase"] },
      ]
    },
    zh: {
      title: "项目",
      projects: [
        { title: "任务管理应用", desc: "通过简洁界面高效管理任务。", tech: ["React", "Node.js", "MongoDB"] },
        { title: "产品管理应用", desc: "实时组织和跟踪产品。", tech: ["Next.js", "Express", "PostgreSQL"] },
        { title: "登陆页面", desc: "响应式且现代的登陆页面设计。", tech: ["HTML", "CSS", "JavaScript"] },
        { title: "主页", desc: "带动画和暗黑模式的交互式主页。", tech: ["React", "TailwindCSS"] },
        { title: "电商网站", desc: "带安全支付集成的电子商务平台。", tech: ["Next.js", "Stripe", "MongoDB"] },
        { title: "匹配应用", desc: "通过智能匹配算法高效连接用户。", tech: ["React Native", "Firebase"] },
      ]
    }
  })[localeKey], [localeKey]);

  // Icons (JSX) remain separate
  const icons = useMemo(() => [
    <FaReact size={28} className="text-cyan-400" />,
    <FaNodeJs size={28} className="text-green-400" />,
    <FaJsSquare size={28} className="text-yellow-400" />,
    <FaReact size={28} className="text-cyan-400" />,
    <FaStripe size={28} className="text-blue-400" />,
    <FaMobileAlt size={28} className="text-purple-400" />,
  ], []);

  // Merge text + icons
  const projectsWithIcons = useMemo(
    () => t.projects.map((proj, idx) => ({ ...proj, icon: icons[idx] })),
    [t, icons]
  );

  // Background dots
  const [dots, setDots] = useState<{ x: number; y: number; dx: number; dy: number }[]>([]);
  const [connections, setConnections] = useState<number[][]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }));
    setDots(newDots);

    const newConnections: number[][] = [];
    for (let i = 0; i < newDots.length; i++) {
      for (let j = i + 1; j < newDots.length; j++) {
        if (Math.random() < 0.4) newConnections.push([i, j]);
      }
    }
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots =>
        prevDots.map(d => {
          let nx = d.x + d.dx;
          let ny = d.y + d.dy;
          if (nx > 100 || nx < 0) d.dx *= -1;
          if (ny > 100 || ny < 0) d.dy *= -1;
          return { ...d, x: nx, y: ny };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="projects"
      className="relative text-white py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-center overflow-hidden"
    >
      <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0">
        {connections.map(([i, j], idx) => (
          <line
            key={idx}
            x1={`${dots[i]?.x ?? 0}%`}
            y1={`${dots[i]?.y ?? 0}%`}
            x2={`${dots[j]?.x ?? 0}%`}
            y2={`${dots[j]?.y ?? 0}%`}
            stroke="cyan"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        ))}
        {dots.map((dot, i) => (
          <circle key={i} cx={`${dot.x}%`} cy={`${dot.y}%`} r="4" fill="cyan" opacity="0.5" />
        ))}
      </svg>

      <h2 className="text-4xl font-bold mb-12 relative z-10">{t.title}</h2>
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {projectsWithIcons.map((proj, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-3xl w-72 border border-gray-600
                       transition-transform duration-300 cursor-pointer
                       hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
                       md:border-gray-600 md:hover:border-cyan-400 md:hover:shadow-[0_0_40px_cyan]
                       shadow-[0_0_30px_cyan] md:shadow-none"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-3">{proj.icon}</div>
            <h3 className="font-bold text-xl mb-2">{proj.title}</h3>
            <p className="text-sm mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {proj.tech.map((tech, i) => (
                <span key={i} className="bg-gray-600/50 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
