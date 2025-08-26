"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  category: string;
  icon: string;
  level?: number;
}

interface SkillsProps {
  data: Skill[];
}

export default function Skills({ data }: SkillsProps) {
  const categoryKeys: string[] = ["All", "Professional", "Technical", "Certifications", "Languages", "Experience"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = useMemo(
    () =>
      selectedCategory === "All"
        ? data
        : data.filter((skill) => skill.category === selectedCategory),
    [selectedCategory, data]
  );

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden text-center">
      <h2 className="text-4xl font-bold mb-8 text-white">Skills</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categoryKeys.map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === key
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl shadow-2xl border-2 border-transparent hover:border-yellow-400 text-lg font-semibold flex flex-col gap-3 text-white hover:shadow-yellow-400/50"
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {(skill.category === "Languages" || skill.category === "Experience") && (
                <motion.div
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
                    skill.category === "Languages" ? "bg-green-500" : "bg-red-500"
                  } text-white shadow-md`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  {skill.category}
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-yellow-400 text-2xl">{skill.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{skill.name}</p>
                  <span className="text-sm text-gray-300">{skill.category}</span>
                </div>
              </div>

              {skill.level && (
                <>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <motion.div
                      className="h-2 rounded-full bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                  <span className="text-gray-300 text-xs mt-1">{skill.level}%</span>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
