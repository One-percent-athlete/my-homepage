"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJsSquare, FaStripe, FaMobileAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Task Schedule Management App",
    desc: "Manage tasks efficiently with a sleek interface.",
    tech: ["React", "Node.js", "MongoDB"],
    icon: <FaReact size={28} className="text-cyan-400" />,
  },
  {
    title: "Product Management App",
    desc: "Organize and track products with real-time updates.",
    tech: ["Next.js", "Express", "PostgreSQL"],
    icon: <FaNodeJs size={28} className="text-green-400" />,
  },
  {
    title: "Landing Page",
    desc: "A responsive and modern landing page design.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: <FaJsSquare size={28} className="text-yellow-400" />,
  },
  {
    title: "Homepage",
    desc: "Interactive homepage with animations and dark mode.",
    tech: ["React", "TailwindCSS"],
    icon: <FaReact size={28} className="text-cyan-400" />,
  },
  {
    title: "EC Site",
    desc: "E-commerce platform with secure payment integration.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    icon: <FaStripe size={28} className="text-blue-400" />,
  },
  {
    title: "Matching App",
    desc: "Connect users efficiently with smart matching algorithms.",
    tech: ["React Native", "Firebase"],
    icon: <FaMobileAlt size={28} className="text-purple-400" />,
  },
];

export default function Projects() {
  const [dots, setDots] = useState<{ x: number; y: number; dx: number; dy: number }[]>([]);
  const [connections, setConnections] = useState<number[][]>([]);

  // Initialize random positions and velocities for dots
  useEffect(() => {
    const newDots = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }));
    setDots(newDots);

    // Precompute connections (40% chance between each pair)
    const newConnections: number[][] = [];
    for (let i = 0; i < newDots.length; i++) {
      for (let j = i + 1; j < newDots.length; j++) {
        if (Math.random() < 0.4) {
          newConnections.push([i, j]);
        }
      }
    }
    setConnections(newConnections);
  }, []);

  // Animate dots movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((d) => {
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
      {/* Animated dots and lines */}
      <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0">
        {/* Lines */}
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

        {/* Dots */}
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r="4"
            fill="cyan"
            opacity="0.5"
          />
        ))}
      </svg>

      <h2 className="text-4xl font-bold mb-12 relative z-10">Projects</h2>
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-3xl w-72 border border-gray-600
                       transition-transform duration-300 cursor-pointer
                       hover:shadow-[0_0_40px_cyan]
                       sm:hover:scale-105
                       md:border-gray-600 md:hover:border-cyan-400 md:hover:shadow-[0_0_40px_cyan]
                       shadow-[0_0_30px_cyan] md:shadow-none" // only visible on mobile
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-3">{proj.icon}</div>
            <h3 className="font-bold text-xl mb-2">{proj.title}</h3>
            <p className="text-sm mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {proj.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-600/50 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                >
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
