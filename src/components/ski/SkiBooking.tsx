"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    sections: {
      booking: "Simple Booking Process 📅",
    },
    bookingSteps: ["Reach Out", "Set a Date and Time", "Meet Me on the Mountain", "Enjoy Your Adventure"],
  },
  ja: {
    sections: {
      booking: "簡単予約プロセス 📅",
    },
    bookingSteps: ["連絡する", "日程を決める", "山で会う", "冒険を楽しむ"],
  },
  zh: {
    sections: {
      booking: "简单预订流程 📅",
    },
    bookingSteps: ["联系我", "设定日期和时间", "山上见面", "享受你的冒险"],
  },
};

interface SkiBookingProps {
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

export default function SkiBooking({ language }: SkiBookingProps) {
  const { sections, bookingSteps } = content[language];

  return (
    <motion.section
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[400px] flex items-center"
      style={{ backgroundImage: "url('/images/ski3.jpg')" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-slate-900/40 to-blue-900/30 rounded-2xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
        >
          {/* Professional Badge - Updated for Booking Process */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              {language === 'en' && 'Easy & Fast Booking'}
              {language === 'ja' && '簡単迅速な予約'}
              {language === 'zh' && '简单快速预订'}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
              {sections.booking}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto max-w-sm rounded-full"
          />
        </motion.div>
        

        {/* Booking Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
          variants={containerVariants}
        >
          {bookingSteps.map((step, i) => (
            <motion.div 
              key={i} 
              className="group flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              {/* Step Number with Enhanced Hover */}
              <motion.div 
                className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl mb-4 text-xl font-bold shadow-2xl group-hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {i + 1}
                </span>
                
                {/* Floating Animation */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              </motion.div>

              {/* Step Text */}
              <motion.p 
                className="text-white/90 text-lg font-medium group-hover:text-white group-hover:font-semibold transition-all duration-300 px-4"
                whileHover={{ scale: 1.05 }}
              >
                {step}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {language === 'en' && 'Start Booking'}
              {language === 'ja' && '予約を開始'}
              {language === 'zh' && '开始预订'}
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