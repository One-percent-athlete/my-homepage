"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
  const skills = [
    // Professional / Technical / Certifications
    { name: "Project Management", category: "Professional", icon: "📊", level: 90 },
    { name: "Teamwork", category: "Professional", icon: "🤝", level: 95 },
    { name: "Time Management", category: "Professional", icon: "⏱️", level: 85 },
    { name: "Leadership", category: "Professional", icon: "🧑‍💼", level: 88 },
    { name: "Effective Communication", category: "Professional", icon: "💬", level: 92 },
    { name: "Critical Thinking", category: "Professional", icon: "🧠", level: 90 },
    { name: "Python", category: "Technical", icon: "🐍", level: 85 },
    { name: "JavaScript", category: "Technical", icon: "✨", level: 90 },
    { name: "CSIA Level 3 Candidate", category: "Certifications", icon: "🎿", level: 70 },
    { name: "PADI Divemaster", category: "Certifications", icon: "🤿", level: 75 },
    { name: "International Driving License", category: "Certifications", icon: "🚗", level: 100 },

    // Languages
    { name: "Chinese (Fluent)", category: "Languages", icon: "🇨🇳", level: 100 },
    { name: "Japanese (Fluent)", category: "Languages", icon: "🇯🇵", level: 100 },
    { name: "English (Fluent)", category: "Languages", icon: "🇬🇧", level: 100 },
    { name: "Spanish (Basic)", category: "Languages", icon: "🇪🇸", level: 40 },

    // Life & professional experiences
    { name: "Served in Ground Self Defence Force", category: "Experience", icon: "🪖" },
    { name: "HA/DR Operations", category: "Experience", icon: "🌊" },
    { name: "Sniper", category: "Experience", icon: "🎯" },
    { name: "English/Japanese Translator", category: "Experience", icon: "📝" },
    { name: "Martial Arts High Level", category: "Experience", icon: "🥋" },
    { name: "English Language Teacher", category: "Experience", icon: "📚" },
    { name: "Japanese Language Teacher", category: "Experience", icon: "📚" },
    { name: "Deckhand / Underwater Guide", category: "Experience", icon: "⚓" },
    { name: "Snow Mountain Guide", category: "Experience", icon: "🏔️" },
    { name: "City Tour Guide", category: "Experience", icon: "🏙️" },
    { name: "Walked Camino de Santiago", category: "Experience", icon: "🥾" },
    { name: "Backpacked for 6 years", category: "Experience", icon: "   🎒" },
    { name: "Hitchhiked NY → LA", category: "Experience", icon: "🛣️" },
    { name: "Volunteered in Nepal, Bangladesh, Tanzania", category: "Experience", icon: "🌍" },
    { name: "Self-taught Engineer", category: "Experience", icon: "💻" },
  ];

  const categories = ["All", "Professional", "Technical", "Certifications", "Languages", "Experience"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden text-center"
    >
      <h2 className="text-4xl font-bold mb-8 text-white">Skills & Experience</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
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
              {/* Badge / Ribbon for Languages & Experiences */}
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

              {/* Optional skill level bar */}
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
