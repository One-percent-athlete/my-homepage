"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    sections: {
      packages: "Lesson Packages ❄️",
    },
    packages: [
      { 
        title: "Private Lesson", 
        desc: "Focused 1-on-1 coaching tailored to your goals. Rapid progress with personalized feedback.",
        icon: "🎯",
        features: ["Personalized Coaching", "Flexible Scheduling", "Maximum Progress"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "Group Lesson", 
        desc: "Learn with friends & family in a fun, social setting while improving technique together.",
        icon: "👨‍👩‍👧‍👦",
        features: ["Social Learning", "Cost Effective", "Team Building"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "Guided Tour", 
        desc: "Discover secret stashes, untouched snow, and epic terrain. More than a tour — an adventure.",
        icon: "🏔️",
        features: ["Hidden Locations", "Adventure Focus", "Local Knowledge"],
        color: "from-purple-500 to-pink-500"
      },
    ],
    heroButton: "Let's Go",
  },
  ja: {
    sections: {
      packages: "レッスンパッケージ ❄️",
    },
    packages: [
      { 
        title: "プライベートレッスン", 
        desc: "目標に合わせた1対1の集中コーチング。個別フィードバックで迅速な上達。",
        icon: "🎯",
        features: ["個別指導", "柔軟なスケジュール", "最大の上達"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "グループレッスン", 
        desc: "友達や家族と楽しく学びながら技術を向上させましょう。",
        icon: "👨‍👩‍👧‍👦",
        features: ["グループ学習", "コスト効率", "チームビルディング"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "ガイドツアー", 
        desc: "隠れたスポットや未踏雪、絶景の地形を発見。ツアー以上の冒険体験。",
        icon: "🏔️",
        features: ["隠れスポット", "アドベンチャー", "現地知識"],
        color: "from-purple-500 to-pink-500"
      },
    ],
    heroButton: "行こう",
  },
  zh: {
    sections: {
      packages: "课程套餐 ❄️",
    },
    packages: [
      { 
        title: "私人课程", 
        desc: "针对目标的一对一辅导。个性化反馈实现快速进步。",
        icon: "🎯",
        features: ["个性化指导", "灵活安排", "最大进步"],
        color: "from-blue-500 to-cyan-500"
      },
      { 
        title: "团体课程", 
        desc: "与朋友和家人一起在轻松愉快的环境中提升技术。",
        icon: "👨‍👩‍👧‍👦",
        features: ["社交学习", "性价比高", "团队建设"],
        color: "from-emerald-500 to-green-500"
      },
      { 
        title: "导游之旅", 
        desc: "发现隐秘雪地、原始雪域和极致地形。不只是旅行——是一场冒险。",
        icon: "🏔️",
        features: ["隐秘地点", "冒险导向", "当地知识"],
        color: "from-purple-500 to-pink-500"
      },
    ],
    heroButton: "出发吧",
  },
};

interface SkiPackagesProps {
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

export default function SkiPackages({ language }: SkiPackagesProps) {
  const { sections, packages, heroButton } = content[language];

  return (
    <motion.section
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[600px] flex items-center"
      style={{ backgroundImage: "url('/images/ski2.jpg')" }}
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
              {language === 'en' && 'Choose Your Experience'}
              {language === 'ja' && '体験を選ぶ'}
              {language === 'zh' && '选择您的体验'}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
              {sections.packages}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto max-w-sm rounded-full"
          />
        </motion.div>

        {/* Enhanced Packages Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {packages.map((pkg, i) => (
            <motion.div 
              key={i} 
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Glass Morphism Card */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col">
                
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div 
                  className="text-4xl mb-6 text-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {pkg.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold text-white text-center mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  {pkg.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-white/90 text-lg font-light text-center mb-6 flex-1"
                >
                  {pkg.desc}
                </motion.p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, j) => (
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
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${pkg.color} flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200`}
                      />
                      <span className="group-hover/item:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href="/contact"
                  className={`group/btn relative bg-gradient-to-r ${pkg.color} text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {heroButton}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>

                {/* Hover Effect Line */}
                <motion.div 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${pkg.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${pkg.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
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
            {language === 'en' && 'All packages include professional equipment guidance and safety briefing. Custom packages available upon request.'}
            {language === 'ja' && 'すべてのパッケージにはプロの装備指導と安全説明が含まれます。カスタムパッケージもご相談ください。'}
            {language === 'zh' && '所有套餐包含专业设备指导和安全说明。可根据要求提供定制套餐。'}
          </motion.p>
          
          <motion.a
            href="/packages"
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {language === 'en' && 'View All Packages'}
              {language === 'ja' && 'すべてのパッケージを見る'}
              {language === 'zh' && '查看所有套餐'}
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