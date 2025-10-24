"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    intro: "Whether you're a first-timer or an advanced rider, my lessons help you build confidence and refine your technique. As a certified guide, I'll take you to hidden powder stashes and the best terrain for an unforgettable experience.",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "1000+", label: "Students Taught" },
      { value: "99%", label: "Satisfaction Rate" },
      { value: "5.0", label: "Rating" }
    ]
  },
  ja: {
    intro: "初心者でも上級者でも、私のレッスンは自信をつけ、技術を磨く手助けをします。認定ガイドとして、隠れたパウダースポットや最高のゲレンデにご案内します。",
    stats: [
      { value: "10+", label: "年の経験" },
      { value: "1000+", label: "指導生徒数" },
      { value: "99%", label: "満足度" },
      { value: "5.0", label: "評価" }
    ]
  },
  zh: {
    intro: "无论您是初学者还是高级滑雪者，我的课程都能帮助您建立信心并提升技巧。作为认证向导，我将带您前往隐秘雪地和最佳地形，带来难忘体验。",
    stats: [
      { value: "10+", label: "年经验" },
      { value: "1000+", label: "学员指导" },
      { value: "99%", label: "满意率" },
      { value: "5.0", label: "评分" }
    ]
  },
};

interface SkiIntroductionProps {
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
  }
};

const itemVariants: Variants = {
  hidden: { 
    y: 40, 
    opacity: 0,
    scale: 0.95
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

const statVariants: Variants = {
  hidden: { 
    scale: 0,
    opacity: 0
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400
    }
  }
};

const dividerVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: "easeOut"
    }
  }
};

export default function SkiIntroduction({ language }: SkiIntroductionProps) {
  const { intro, stats } = content[language];

  return (
    <motion.section
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[600px] flex items-center"
      style={{ backgroundImage: "url('/images/ski.jpg')" }}
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
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              {language === 'en' && 'Professional Instruction'}
              {language === 'ja' && 'プロフェッショナル指導'}
              {language === 'zh' && '专业指导'}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
              {language === 'en' && 'Unlock Your Potential'}
              {language === 'ja' && '可能性を解き放つ'}
              {language === 'zh' && '释放你的潜能'}
            </span>
          </motion.h2>

          {/* Main Text */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.p 
              className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-relaxed lg:leading-relaxed text-white font-light max-w-4xl mx-auto"
            >
              {intro}
            </motion.p>
            
            {/* Decorative Elements */}
            <motion.div
              variants={dividerVariants}
              className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mt-12 mx-auto max-w-md rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={statVariants}
              whileHover="hover"
            >
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Animated Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.3
                  }}
                  className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-white text-sm sm:text-base font-medium tracking-wide"
                >
                  {stat.label}
                </motion.p>
                
                {/* Hover Effect Line */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
            <p className="text-white text-sm font-medium flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/30">
                🏔️ {language === 'en' ? 'Certified Instructor' : language === 'ja' ? '認定インストラクター' : '认证教练'}
              </span>
              <span className="text-sky-300">•</span>
              <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/30">
                ⛷️ {language === 'en' ? 'All Skill Levels' : language === 'ja' ? '全スキルレベル' : '所有技能级别'}
              </span>
              <span className="text-sky-300">•</span>
              <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/30">
                🎯 {language === 'en' ? 'Personalized Coaching' : language === 'ja' ? '個別指導' : '个性化指导'}
              </span>
              <span className="text-sky-300">•</span>
              <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/30">
                🛡️ {language === 'en' ? 'Safety First' : language === 'ja' ? '安全第一' : '安全第一'}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}