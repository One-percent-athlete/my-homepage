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
    // ... Japanese versions (same structure with Japanese text)
  ],
  zh: [
    // ... Chinese versions (same structure with Chinese text)
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
                    Live Demo
                  </a>
                  <a 
                    href={project.github}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border border-neutral-700 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={16} />
                    Code
                  </a>
                </div>
              </div>

              {/* Back of Card - Detailed View */}
              <div className={`back face w-full h-full backface-hidden p-6 flex flex-col cursor-none ${flippedCards.includes(index) ? 'block' : 'hidden'}`}>
                <div className="flex items-start justify-between mb-6 cursor-none">
                  <h3 className="text-xl font-bold text-white cursor-none">Project Details</h3>
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
                    <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide text-neutral-400 cursor-none">Description</h4>
                    <p className="text-neutral-300 text-sm leading-relaxed cursor-none">
                      {project.description}
                    </p>
                  </div>

                  {/* Full Tech Stack */}
                  <div className="cursor-none">
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide text-neutral-400 cursor-none">Technology Stack</h4>
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
                      <span className="text-neutral-400 block mb-1 cursor-none">Category:</span>
                      <p className="text-white font-medium cursor-none">{project.category}</p>
                    </div>
                    <div className="cursor-none">
                      <span className="text-neutral-400 block mb-1 cursor-none">Status:</span>
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
                    View Project
                  </a>
                  <a 
                    href={project.github}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border border-neutral-700 cursor-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={16} />
                    Source Code
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