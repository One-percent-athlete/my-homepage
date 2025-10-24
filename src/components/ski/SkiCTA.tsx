"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    ctaButton: "Book Your Ski Adventure! 🎿",
    subtitle: "Ready to experience the mountains like never before?"
  },
  ja: {
    ctaButton: "スキーアドベンチャーを予約する！ 🎿",
    subtitle: "これまでにない山の体験を準備できましたか？"
  },
  zh: {
    ctaButton: "预订你的滑雪冒险！ 🎿",
    subtitle: "准备好体验前所未有的山地冒险了吗？"
  },
};

interface SkiCTAProps {
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
    y: 30, 
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

export default function SkiCTA({ language }: SkiCTAProps) {
  const { ctaButton, subtitle } = content[language];

  return (
    <motion.section 
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[400px] flex items-center"
      style={{ backgroundImage: "url('/images/ski.jpg')" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-slate-900/40 to-blue-900/30 rounded-2xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.div 
          variants={containerVariants}
        >
          {/* Professional Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              {language === 'en' && 'Limited Spots Available'}
              {language === 'ja' && '残りわずか'}
              {language === 'zh' && '名额有限'}
            </span>
          </motion.div>

          {/* Main CTA Content */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                {language === 'en' && 'Ready to Ride?'}
                {language === 'ja' && '準備はできましたか？'}
                {language === 'zh' && '准备好滑雪了吗？'}
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-white/80 font-light mb-8 max-w-2xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              {subtitle}
            </motion.p>

            {/* Animated Divider */}
            <motion.div
              variants={itemVariants}
              className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto max-w-md rounded-full mb-10"
            />
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.a
            href="/contact"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold text-xl sm:text-2xl py-6 px-16 rounded-2xl shadow-2xl hover:shadow-3xl cursor-pointer overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              background: "linear-gradient(135deg, rgb(125, 211, 252) 0%, rgb(3, 105, 161) 100%)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-sky-900 to-blue-800 -z-10" />
            
            <span className="relative z-10 flex items-center gap-4">
              {ctaButton}
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                →
              </motion.span>
            </span>

            {/* Floating Particles */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.a>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <p className="text-white/60 text-sm font-medium flex items-center justify-center gap-4 flex-wrap">
              <span>✅ {language === 'en' ? 'Free Consultation' : language === 'ja' ? '無料相談' : '免费咨询'}</span>
              <span>•</span>
              <span>⏱️ {language === 'en' ? 'Flexible Scheduling' : language === 'ja' ? '柔軟なスケジュール' : '灵活安排'}</span>
              <span>•</span>
              <span>🎯 {language === 'en' ? 'All Skill Levels' : language === 'ja' ? '全スキルレベル' : '所有技能级别'}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}