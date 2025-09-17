"use client";

import { motion, type Variants } from "framer-motion";

const projects = [
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
];

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
      {projects.map((project, index) => (
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