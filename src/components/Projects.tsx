"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJsSquare, FaStripe, FaMobileAlt } from "react-icons/fa";

interface ProjectItem {
  title: string;
  desc: string;
  tech: string[];
}

interface ProjectsProps {
  data: {
    title: string;
    items: ProjectItem[];
  };
}

type Dot = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export default function Projects({ data }: ProjectsProps) {
  // Icons array to cycle through
  const iconComponents = useMemo(
    () => [FaReact, FaNodeJs, FaJsSquare, FaStripe, FaMobileAlt],
    []
  );

  // Projects with assigned icons
  const projectsWithIcons = useMemo(
    () =>
      data.items.map((proj, idx) => ({
        ...proj,
        Icon: iconComponents[idx % iconComponents.length],
      })),
    [data.items, iconComponents]
  );

  // Background dots
  const [dots, setDots] = useState<Dot[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }));
    setDots(newDots);

    const newConnections: [number, number][] = [];
    for (let i = 0; i < newDots.length; i++) {
      for (let j = i + 1; j < newDots.length; j++) {
        if (Math.random() < 0.4) newConnections.push([i, j]);
      }
    }
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((d) => {
          const nx = d.x + d.dx;
          const ny = d.y + d.dy;
          let newDx = d.dx;
          let newDy = d.dy;
          if (nx > 100 || nx < 0) newDx *= -1;
          if (ny > 100 || ny < 0) newDy *= -1;
          return { ...d, x: nx, y: ny, dx: newDx, dy: newDy };
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
      {/* Background Dots & Lines */}
      <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0">
        {connections.map(([i, j], idx) => (
          <line
            key={idx}
            x1={`${dots[i]?.x ?? 0}%`}
            y1={`${dots[i]?.y ?? 0}%`}
            x2={`${dots[j]?.x ?? 0}%`}
            y2={`${dots[j]?.y ?? 0}%`}
            stroke="cyan"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}
        {dots.map((dot, i) => (
          <circle key={i} cx={`${dot.x}%`} cy={`${dot.y}%`} r={4} fill="cyan" opacity={0.5} />
        ))}
      </svg>

      {/* Title */}
      <h2 className="text-4xl font-bold mb-12 relative z-10">{data.title}</h2>

      {/* Projects Grid */}
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {projectsWithIcons.map((proj, idx) => {
          const Icon = proj.Icon;
          return (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-3xl w-72 border border-gray-600
              transition-transform duration-300 cursor-pointer
              hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-gray-600 md:hover:border-cyan-400 md:hover:shadow-[0_0_40px_cyan]
              shadow-[0_0_30px_cyan] md:shadow-none"
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-3">
                <Icon size={28} />
              </div>
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
          );
        })}
      </div>
    </section>
  );
}
