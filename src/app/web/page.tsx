"use client";

import { useState, useEffect } from 'react';
import { motion, backOut, easeInOut } from 'framer-motion';
import { useLanguage } from "@/app/context/LanguageContext";
import FloatingButtons from '@/components/FloatingButtons';
import WebBackground from '@/components/web/WebBackground';
import LogoShowcase from '@/components/web/LogoShowcase';
import SkillCardGrid from '@/components/web/SkillCardGrid';
import ProjectCardGrid from '@/components/web/ProjectCardGrid';
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Web() {
  const { language } = useLanguage();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 500); // delay before showing
    return () => clearTimeout(timer);
  }, []);

  // Multilingual texts
  const heroTexts = {
    en: {
      title: "Bridges to a Global Audience",
      subtitle: "Your business has a global vision. We build the digital foundation to make it a reality. From elegant design to seamless functionality, we create websites that speak your customers' language—literally.",
      button: "Reach Out Now",
    },
    ja: {
      title: "グローバルなオーディエンスへの架け橋",
      subtitle: "あなたのビジネスにはグローバルなビジョンがあります。私たちは、それを実現するデジタル基盤を構築します。優れたデザインからシームレスな機能まで、顧客の言語で伝わるウェブサイトを作ります。",
      button: "今すぐお問い合わせ",
    },
    zh: {
      title: "通向全球受众的桥梁",
      subtitle: "您的业务有全球愿景。我们建立数字基础，使其成为现实。从优雅的设计到无缝的功能，我们创建能够与客户“对话”的网站。",
      button: "立即联系",
    },
  };

  const sectionHeaders = {
    en: { 
      skills: "My Skills", 
      projects: "Projects", 
      ready: "Ready to Start Your Project?", 
      subtitle: "Let’s build something amazing together. Get in touch today and bring your vision to life.",
      cta: "Contact Me" 
    },
    ja: { 
      skills: "私のスキル", 
      projects: "プロジェクト", 
      ready: "プロジェクトを始める準備はできていますか？", 
      subtitle: "一緒に素晴らしいものを作りましょう。今日お問い合わせいただき、あなたのビジョンを形にしましょう。",
      cta: "お問い合わせ" 
    },
    zh: { 
      skills: "我的技能", 
      projects: "项目", 
      ready: "准备好开始您的项目了吗？", 
      subtitle: "让我们一起打造惊人的作品。今天就联系，让您的愿景成为现实。",
      cta: "联系我" 
    },
  };

  return (
    <>
      <CustomCursor />
      <FloatingButtons />

      {/* Fixed background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <WebBackground />
      </div>

      {/* Scrollable main content */}
      <div className="w-full min-h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-auto scrollbar-hide">

        {/* Hero Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center relative z-10">
          <motion.header
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold text-teal-400 mb-4 tracking-tight">
              {heroTexts[language].title}
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-neutral-300">
              {heroTexts[language].subtitle}
            </p>

            {/* Neon Button */}
            <div
              className={`mt-8 transition-all duration-700 ease-out ${
                showButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <a href="/contact" className="neon-btn relative">
                <h2 className="text-3xl md:text-4xl font-semibold">{heroTexts[language].button}</h2>
                <span></span><span></span><span></span><span></span>
              </a>
            </div>
          </motion.header>

          {/* Logo Showcase */}
          <div className="w-full py-4 px-4 sm:px-6 md:px-8">
            <LogoShowcase />
          </div>
        </section>

        {/* My Skills Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-12 text-teal-400">{sectionHeaders[language].skills}</h2>
            <SkillCardGrid />
          </div>
        </section>

        {/* Projects Section */}
        <section className="snap-start w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-12 text-teal-400">{sectionHeaders[language].projects}</h2>
            <ProjectCardGrid />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-8 bg-transparent text-center relative z-10">
          <motion.h2
            className="text-5xl sm:text-6xl font-extrabold mb-6 text-teal-400 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeInOut }}
          >
            {sectionHeaders[language].ready}
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto text-neutral-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
          >
            {sectionHeaders[language].subtitle}
          </motion.p>

          <motion.a
            href="/contact"
            className="px-10 py-5 rounded-full bg-teal-400 text-white font-bold text-xl shadow-[0_0_25px_cyan] hover:shadow-[0_0_40px_cyan] transition-all duration-300 ease-in-out cursor-none"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: backOut }}
          >
            {sectionHeaders[language].cta}
          </motion.a>
        </section>

      </div>

      {/* Footer outside scroll-snap container */}
      <Footer />
    </>
  );
}
