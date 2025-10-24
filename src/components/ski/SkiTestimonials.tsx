"use client";

import { motion, Variants } from "framer-motion";

const content = {
  en: {
    sections: {
      testimonials: "What My Clients Say 💬",
    },
    testimonials: [
      { 
        quote: "Ryu is the best instructor I&apos;ve ever had. Patient, fun, and helped me finally conquer black runs!",
        author: "Sarah, USA",
        rating: 5
      },
      { 
        quote: "The guided tour was incredible. He showed us hidden spots I never would have found on my own.", 
        author: "Kenji, Japan",
        rating: 5
      },
    ],
  },
  ja: {
    sections: {
      testimonials: "クライアントの声 💬",
    },
    testimonials: [
      { 
        quote: "リュウは私が今まで出会った中で最高のインストラクターです。忍耐強く、楽しく、ついにブラックコースを制覇できました！", 
        author: "サラ, USA",
        rating: 5
      },
      { 
        quote: "ガイドツアーは素晴らしかったです。自分では見つけられなかった隠れスポットを教えてくれました。", 
        author: "ケンジ, 日本",
        rating: 5
      },
    ],
  },
  zh: {
    sections: {
      testimonials: "客户评价 💬",
    },
    testimonials: [
      { 
        quote: "Ryu 是我遇到过最棒的教练。有耐心、有趣，帮我最终征服了黑道！", 
        author: "Sarah, 美国",
        rating: 5
      },
      { 
        quote: "导游之旅太棒了。他带我们去了我自己根本找不到的隐藏地点。", 
        author: "Kenji, 日本",
        rating: 5
      },
    ],
  },
};

interface SkiTestimonialsProps {
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

const cardVariants: Variants = {
  hidden: { 
    y: 40, 
    opacity: 0,
    rotateX: -10
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

export default function SkiTestimonials({ language }: SkiTestimonialsProps) {
  const { sections, testimonials } = content[language];

  return (
    <motion.section
      className="bg-cover bg-center bg-no-repeat bg-fixed p-10 rounded-2xl shadow-xl relative min-h-[500px] flex items-center"
      style={{ backgroundImage: "url('/images/ski4.jpg')" }}
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
          {/* Professional Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              {language === 'en' && 'Client Testimonials'}
              {language === 'ja' && 'クライアント評価'}
              {language === 'zh' && '客户评价'}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
              {sections.testimonials}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto max-w-sm rounded-full"
          />
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i} 
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Glass Morphism Card */}
              <div className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col">
                
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quote Icon */}
                <motion.div 
                  className="text-3xl mb-4 text-yellow-400"
                  whileHover={{ scale: 1.1 }}
                >
                  "
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote 
                  className="text-white/95 text-lg font-light leading-relaxed mb-6 flex-1 italic"
                  whileHover={{ scale: 1.01 }}
                >
                  {testimonial.quote}
                </motion.blockquote>

                {/* Author & Rating */}
                <div className="flex items-center justify-between">
                  <motion.footer 
                    className="text-white font-semibold text-base"
                    whileHover={{ x: 5 }}
                  >
                    — {testimonial.author}
                  </motion.footer>
                  
                  {/* Star Rating */}
                  <motion.div 
                    className="flex gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        className="text-yellow-400 text-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 1, 
                          delay: starIndex * 0.1,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Hover Effect Line */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
          <motion.p 
            className="text-white/80 text-lg font-light mb-8 max-w-2xl mx-auto drop-shadow-2xl"
            whileHover={{ scale: 1.02 }}
          >
            {language === 'en' && 'Join hundreds of satisfied skiers who have transformed their mountain experience.'}
            {language === 'ja' && '山の体験を変えた何百人もの満足したスキーヤーに加わりましょう。'}
            {language === 'zh' && '加入数百位已经改变山地体验的满意滑雪者行列。'}
          </motion.p>
          
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {language === 'en' && 'Share Your Experience'}
              {language === 'ja' && '体験を共有する'}
              {language === 'zh' && '分享您的体验'}
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