"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Locale = "en" | "ja" | "zh";
const supportedLocales: Locale[] = ["en", "ja", "zh"];

export default function Skills() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] as Locale | undefined;

  // Safe locale key
  const localeKey: Locale = supportedLocales.includes(locale!) ? locale! : "en";

  // Translation for UI
  const translations = useMemo(
    () => ({
      en: {
        title: "Skills & Experience",
        categories: ["All", "Professional", "Technical", "Certifications", "Languages", "Experience"],
      },
      ja: {
        title: "スキルと経験",
        categories: ["すべて", "プロフェッショナル", "技術", "資格", "言語", "経験"],
      },
      zh: {
        title: "技能与经验",
        categories: ["全部", "专业", "技术", "认证", "语言", "经验"],
      },
    }),
    []
  );

  const t = translations[localeKey];

  // Category keys (always English, used for filtering)
  const categoryKeys: string[] = ["All", "Professional", "Technical", "Certifications", "Languages", "Experience"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Skills data
  const skills = useMemo(
    () => [
      { name: { en: "Project Management", ja: "プロジェクト管理", zh: "项目管理" }, category: "Professional", icon: "📊", level: 90 },
      { name: { en: "Teamwork", ja: "チームワーク", zh: "团队合作" }, category: "Professional", icon: "🤝", level: 95 },
      { name: { en: "Time Management", ja: "時間管理", zh: "时间管理" }, category: "Professional", icon: "⏱️", level: 85 },
      { name: { en: "Leadership", ja: "リーダーシップ", zh: "领导能力" }, category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: { en: "Effective Communication", ja: "効果的なコミュニケーション", zh: "有效沟通" }, category: "Professional", icon: "💬", level: 92 },
      { name: { en: "Critical Thinking", ja: "批判的思考", zh: "批判性思维" }, category: "Professional", icon: "🧠", level: 90 },

      // Technical
      { name: { en: "Python", ja: "パイソン", zh: "Python" }, category: "Technical", icon: "🐍", level: 85 },
      { name: { en: "JavaScript", ja: "ジャバスクリプト", zh: "JavaScript" }, category: "Technical", icon: "✨", level: 90 },

      // Certifications
      { name: { en: "CSIA Level 3 Candidate", ja: "CSIAレベル3候補", zh: "CSIA三级候选" }, category: "Certifications", icon: "🎿", level: 70 },
      { name: { en: "PADI Divemaster", ja: "PADIダイブマスター", zh: "PADI潜水指导员" }, category: "Certifications", icon: "🤿", level: 75 },
      { name: { en: "International Driving License", ja: "国際運転免許証", zh: "国际驾照" }, category: "Certifications", icon: "🚗", level: 100 },

      // Languages
      { name: { en: "Chinese (Fluent)", ja: "中国語（流暢）", zh: "中文（流利）" }, category: "Languages", icon: "🇨🇳", level: 100 },
      { name: { en: "Japanese (Fluent)", ja: "日本語（流暢）", zh: "日语（流利）" }, category: "Languages", icon: "🇯🇵", level: 100 },
      { name: { en: "English (Fluent)", ja: "英語（流暢）", zh: "英语（流利）" }, category: "Languages", icon: "🇬🇧", level: 100 },
      { name: { en: "Spanish (Basic)", ja: "スペイン語（基本）", zh: "西班牙语（基础）" }, category: "Languages", icon: "🇪🇸", level: 40 },

      // Experience
      { name: { en: "Served in Ground Self Defence Force", ja: "陸上自衛隊勤務", zh: "服役于陆上自卫队" }, category: "Experience", icon: "🪖" },
      { name: { en: "HA/DR Operations", ja: "災害対応任務", zh: "人道救援行动" }, category: "Experience", icon: "🌊" },
      { name: { en: "Sniper", ja: "狙撃手", zh: "狙击手" }, category: "Experience", icon: "🎯" },
      { name: { en: "English/Japanese Translator", ja: "英日翻訳者", zh: "英日翻译" }, category: "Experience", icon: "📝" },
      { name: { en: "Martial Arts High Level", ja: "高レベル武道", zh: "高级武术" }, category: "Experience", icon: "🥋" },
      { name: { en: "English Language Teacher", ja: "英語教師", zh: "英语教师" }, category: "Experience", icon: "📚" },
      { name: { en: "Japanese Language Teacher", ja: "日本語教師", zh: "日语教师" }, category: "Experience", icon: "📚" },
      { name: { en: "Deckhand / Underwater Guide", ja: "船員 / 水中ガイド", zh: "甲板手/水下导游" }, category: "Experience", icon: "⚓" },
      { name: { en: "Snow Mountain Guide", ja: "雪山ガイド", zh: "雪山向导" }, category: "Experience", icon: "🏔️" },
      { name: { en: "City Tour Guide", ja: "都市観光ガイド", zh: "城市导游" }, category: "Experience", icon: "🏙️" },
      { name: { en: "Walked Camino de Santiago", ja: "サンティアゴ巡礼歩行", zh: "走过圣地亚哥之路" }, category: "Experience", icon: "🥾" },
      { name: { en: "Backpacked for 6 years", ja: "6年間のバックパック旅行", zh: "背包旅行6年" }, category: "Experience", icon: "🎒" },
      { name: { en: "Hitchhiked NY → LA", ja: "NYからLAまでヒッチハイク", zh: "搭便车从纽约到洛杉矶" }, category: "Experience", icon: "🛣️" },
      { name: { en: "Volunteered in Nepal, Bangladesh, Tanzania", ja: "ネパール、バングラデシュ、タンザニアでボランティア", zh: "在尼泊尔、孟加拉国、坦桑尼亚志愿服务" }, category: "Experience", icon: "🌍" },
      { name: { en: "Self-taught Engineer", ja: "独学エンジニア", zh: "自学成才工程师" }, category: "Experience", icon: "💻" },
    ],
    []
  );

  // Filtered skills
  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden text-center">
      <h2 className="text-4xl font-bold mb-8 text-white">{t.title}</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categoryKeys.map((key, idx) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === key
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            {t.categories[idx]}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name[localeKey]}
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
                  <p className="font-semibold">{skill.name[localeKey]}</p>
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
