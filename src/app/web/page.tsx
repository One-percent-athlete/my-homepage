"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    const timer = setTimeout(() => setShowButton(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // All multilingual texts organized in one place
  const pageTexts = {
    en: {
      hero: {
        title: "Bridges to a Global Audience",
        subtitle: "Your business has a global vision. We build the digital foundation to make it a reality. From elegant design to seamless functionality, we create websites that speak your customers' language—literally.",
        button: "Reach Out Now",
      },
      sections: {
        skills: "Technical Expertise",
        skillsSubtitle: "Technologies I work with to bring ideas to life",
        projects: "Featured Projects", 
        projectsSubtitle: "A showcase of my recent work and creative solutions",
        ready: "Ready to Start Your Project?",
        readySubtitle: "Let's build something amazing together. Get in touch today and bring your vision to life.",
        cta: "Start Your Project"
      }
    },
    ja: {
      hero: {
        title: "グローバルなオーディエンスへの架け橋",
        subtitle: "あなたのビジネスにはグローバルなビジョンがあります。私たちは、それを実現するデジタル基盤を構築します。優れたデザインからシームレスな機能まで、顧客の言語で伝わるウェブサイトを作ります。",
        button: "今すぐお問い合わせ",
      },
      sections: {
        skills: "技術専門知識",
        skillsSubtitle: "アイデアを形にするために使用する技術",
        projects: "注目のプロジェクト",
        projectsSubtitle: "最近の作品と創造的なソリューションの展示",
        ready: "プロジェクトを始める準備はできていますか？",
        readySubtitle: "一緒に素晴らしいものを作りましょう。今日お問い合わせいただき、あなたのビジョンを形にしましょう。",
        cta: "プロジェクトを開始"
      }
    },
    zh: {
      hero: {
        title: "通向全球受众的桥梁",
        subtitle: "您的业务有全球愿景。我们建立数字基础，使其成为现实。从优雅的设计到无缝的功能，我们创建能够与客户'对话'的网站。",
        button: "立即联系",
      },
      sections: {
        skills: "专业技术",
        skillsSubtitle: "将想法变为现实所使用的技术",
        projects: "精选项目",
        projectsSubtitle: "展示我最近的作品和创意解决方案",
        ready: "准备好开始您的项目了吗？",
        readySubtitle: "让我们一起打造惊人的作品。今天就联系，让您的愿景成为现实。",
        cta: "开始您的项目"
      }
    },
  };

  const currentTexts = pageTexts[language];

  return (
    <>
      <CustomCursor />
      <FloatingButtons />

      {/* Fixed background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <WebBackground />
      </div>

      {/* Scrollable main content */}
      <div className="w-full min-h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-auto">

        {/* Hero Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center relative z-10">
          <motion.header
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-black text-teal-400 mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentTexts.hero.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto text-neutral-300 leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentTexts.hero.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`transition-all duration-700 ease-out ${
                showButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <a 
                href="/contact" 
                className="cursor-none inline-flex items-center px-12 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                {currentTexts.hero.button}
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>
          </motion.header>

          {/* Logo Showcase */}
          <div className="w-full max-w-6xl mx-auto py-8 px-4">
            <LogoShowcase />
          </div>
        </section>

        {/* Skills Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <SkillCardGrid 
              sectionTitle={currentTexts.sections.skills}
              sectionSubtitle={currentTexts.sections.skillsSubtitle}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="snap-start w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <ProjectCardGrid 
              sectionTitle={currentTexts.sections.projects}
              sectionSubtitle={currentTexts.sections.projectsSubtitle}
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="snap-start w-full min-h-screen flex flex-col items-center justify-center p-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl font-black text-teal-400 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {currentTexts.sections.ready}
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl mb-12 text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {currentTexts.sections.readySubtitle}
            </motion.p>

            <motion.a
              href="/contact"
              className="cursor-none inline-flex items-center px-14 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-2xl font-bold rounded-2xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentTexts.sections.cta}
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </div>
        </section>

      </div>

      {/* Footer outside scroll-snap container */}
      <Footer />
    </>
  );
}