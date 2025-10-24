"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    sections: {
      expertise: "My Expertise ⛷️",
    },
    expertise: [
      { 
        title: "Certifications", 
        icon: "🏅",
        content: ["CSIA Level 3 Candidate", "AIARE 1 Avalanche Safety", "Wilderness First Responder"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "Experience", 
        icon: "📅",
        content: ["6+ seasons teaching & guiding", "1000+ students coached", "International experience"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "Special Skills", 
        icon: "⭐",
        content: ["Teaching families & kids", "Backcountry touring & guiding", "Freeride & carving techniques"],
        color: "from-purple-500 to-pink-500"
      },
    ],
  },
  ja: {
    sections: {
      expertise: "専門知識 ⛷️",
    },
    expertise: [
      { 
        title: "資格", 
        icon: "🏅",
        content: ["CSIA レベル3候補", "AIARE 1 雪崩安全", "野外救急法認定"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "経験", 
        icon: "📅",
        content: ["6年以上の指導・ガイド経験", "1000人以上の生徒を指導", "国際的な経験"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "特別スキル", 
        icon: "⭐",
        content: ["家族・子供への指導", "バックカントリーツアー・ガイド", "フリーライド & カービング技術"],
        color: "from-purple-500 to-pink-500"
      },
    ],
  },
  zh: {
    sections: {
      expertise: "专业技能 ⛷️",
    },
    expertise: [
      { 
        title: "证书", 
        icon: "🏅",
        content: ["CSIA 三级候选", "AIARE 1 雪崩安全", "野外急救认证"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "经验", 
        icon: "📅",
        content: ["6+ 季教学与指导经验", "1000+ 学员指导", "国际经验"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "特殊技能", 
        icon: "⭐",
        content: ["教授家庭和儿童", "高山滑雪与导游", "自由滑与雕刻技巧"],
        color: "from-purple-500 to-pink-500"
      },
    ],
  },
};

interface SkiExpertiseProps {
  language: keyof typeof content;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      duration: 0.8
    } 
  },
};

const itemVariants: Variants = { 
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.9
  }, 
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  } 
};

const cardVariants: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    rotateX: -15
  },
  visible: { 
    y: 0, 
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400
    }
  }
};

export default function SkiExpertise({ language }: SkiExpertiseProps) {
  const { sections, expertise } = content[language];

  return (
    <motion.section
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[600px] flex items-center"
      style={{ backgroundImage: "url('/images/ski1.jpg')" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-slate-900/40 to-blue-900/30 rounded-2xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          {/* Professional Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              {language === 'en' && 'Professional Qualifications'}
              {language === 'ja' && 'プロフェッショナル資格'}
              {language === 'zh' && '专业资质'}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
              {sections.expertise}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto max-w-sm rounded-full"
          />
        </motion.div>

        {/* Enhanced Expertise Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {expertise.map((exp, i) => (
            <motion.div 
              key={i} 
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Glass Morphism Card */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col">
                
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div 
                  className="text-4xl mb-6 text-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {exp.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold text-white text-center mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  {exp.title}
                </motion.h3>

                {/* Enhanced Content List */}
                <ul className="space-y-4 flex-1">
                  {exp.content.map((item, j) => (
                    <motion.li 
                      key={j}
                      className="flex items-center gap-3 text-white/90 text-lg font-light group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * j + 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200`}
                      />
                      <span className="group-hover/item:text-white transition-colors duration-200">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Effect Line */}
                <motion.div 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${exp.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${exp.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-white/80 text-lg font-light mb-8 max-w-2xl mx-auto drop-shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            {language === 'en' && 'Ready to start your skiing journey with a certified professional?'}
            {language === 'ja' && '認定プロフェッショナルと一緒にスキーの旅を始めましょう'}
            {language === 'zh' && '准备好与认证专业人士一起开始您的滑雪之旅了吗？'}
          </motion.p>
          
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {language === 'en' && 'Book Your Lesson'}
              {language === 'ja' && 'レッスンを予約'}
              {language === 'zh' && '预约课程'}
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}