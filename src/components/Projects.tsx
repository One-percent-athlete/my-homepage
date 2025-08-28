"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
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

export default function Projects({ data }: ProjectsProps) {
  const iconComponents = useMemo(
    () => [FaReact, FaNodeJs, FaJsSquare, FaStripe, FaMobileAlt],
    []
  );

  const projectsWithIcons = useMemo(
    () =>
      data.items.map((proj, idx) => ({
        ...proj,
        Icon: iconComponents[idx % iconComponents.length],
      })),
    [data.items, iconComponents]
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" }); // trigger slightly before fully visible

  // Variants for fly in/out animation
  const cardVariants: Variants = {
    hidden: { x: "-150vw", opacity: 0 }, // start far left offscreen
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 15 } },
    exit: { x: "150vw", opacity: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }, // fly out right
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative text-white py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-center overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-12 relative z-10">{data.title}</h2>

      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {projectsWithIcons.map((proj, idx) => {
          const Icon = proj.Icon;

          return (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-3xl w-72 border border-gray-600
              transition-transform duration-300
              hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-gray-600 md:hover:border-cyan-400 md:hover:shadow-[0_0_40px_cyan]
              shadow-[0_0_30px_cyan] md:shadow-none"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="exit"
              transition={{ delay: idx * 0.1 }}
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
