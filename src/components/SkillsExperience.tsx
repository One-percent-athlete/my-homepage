"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  category: string;
  icon: string;
  level?: number;
}

interface SkillsProps {
  data: Skill[];
}

const palettes: Record<string, string[]> = {
  Professional: ["#0F0F0F", "#232D3F", "#005B41", "#008170"],
  Technical: ["#030637", "#3C0753", "#720455", "#910A67"],
  Certifications: ["#022C43", "#053F5E", "#115173", "#FFD700"],
  Languages: ["#363B4E", "#4F3B78", "#927FBF", "#C4BBF0"],
  Experience: ["#635985", "#443C68", "#393053", "#18122B"],
};

interface Star {
  top: string;
  left: string;
  size: string;
  opacity: number;
}

export default function SkillsExperience({ data }: SkillsProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const navbarHeight = 64; // px, adjust if your navbar is taller

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generated);
  }, []);

  const groupedSkills = data.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  const getHeaderBackground = () => {
    if (!activeCategory) return "linear-gradient(to right, indigo, purple, pink)";
    return `linear-gradient(135deg, ${palettes[activeCategory].join(", ")})`;
  };

  return (
    <section className="relative w-full" id="skills">
      {/* Sticky header below navbar */}
      <motion.div
        className="sticky z-40 text-center pt-12 pb-2"
        style={{ top: `${navbarHeight}px` }}
        animate={{ background: getHeaderBackground() }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-white">Skills & Experience</h2>
      </motion.div>

      {/* Full-screen sections for each category */}
      {categories.map((category, idx) => {
        const colors = palettes[category] || ["#000000", "#111111"];
        return (
          <motion.div
            key={idx}
            className="sticky top-0 min-h-screen flex flex-col justify-center items-center text-white"
            style={{ background: `linear-gradient(135deg, ${colors.join(", ")})` }}
            onViewportEnter={() => setActiveCategory(category)}
          >
            {/* Floating stars */}
            {stars.map((star, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                }}
              />
            ))}

            <h1 className="text-3xl md:text-4xl font-bold mb-8">{category}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-12 z-10 relative">
              {groupedSkills[category].map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-900 text-yellow-400 rounded-xl shadow p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-4xl mb-2">{skill.icon}</span>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  {skill.level !== undefined && (
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                      <motion.div
                        className="bg-yellow-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
