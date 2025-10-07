"use client";

import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } };
const cardVariants: Variants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120 } } };

export default function Ski() {
  const { language } = useLanguage();

  // Multilingual content
  const content = {
    en: {
      heroTitle: "Master the Mountain 🏔️",
      heroSubtitle: "Private Ski Lessons & Guided Adventures with 10+ Years of Expertise",
      heroButton: "Let's Go",
      intro: "Whether you're a first-timer or an advanced rider, my lessons help you build confidence and refine your technique. As a certified guide, I'll take you to hidden powder stashes and the best terrain for an unforgettable experience.",
      expertise: [
        { title: "Certifications", content: ["✅ CSIA Level 3 Candidate", "✅ AIARE 1 Avalanche Safety", "✅ Wilderness First Responder"] },
        { title: "Experience", content: ["6+ seasons teaching & guiding"] },
        { title: "Special Skills", content: ["👨‍👩‍👧 Teaching families & kids", "🎿 Backcountry touring & guiding", "🏂 Freeride & carving techniques"] },
      ],
      packages: [
        { title: "Private Lesson", desc: "Focused 1-on-1 coaching tailored to your goals. Rapid progress with personalized feedback." },
        { title: "Group Lesson", desc: "Learn with friends & family in a fun, social setting while improving technique together." },
        { title: "Guided Tour", desc: "Discover secret stashes, untouched snow, and epic terrain. More than a tour — an adventure." },
      ],
      testimonials: [
        { quote: "Ryu is the best instructor I've ever had. Patient, fun, and helped me finally conquer black runs!", author: "Sarah, USA" },
        { quote: "The guided tour was incredible. He showed us hidden spots I never would have found on my own.", author: "Kenji, Japan" },
      ],
      bookingSteps: ["Reach Out", "Set a Date and Time", "Meet Me on the Mountain", "Enjoy Your Adventure"],
      faqs: [
        { q: "What level do I need to be?", a: "Any! From complete beginners to experts, I tailor lessons to you." },
        { q: "Do you provide equipment?", a: "No, but I can recommend trusted rental shops nearby." },
        { q: "Where do lessons take place?", a: "At major ski resorts or backcountry areas by request." },
      ],
      ctaButton: "Book Your Ski Adventure! 🎿",
      sections: {
        expertise: "Your Expertise ⛷️",
        packages: "Lesson Packages ❄️",
        testimonials: "What My Clients Say 💬",
        booking: "Simple Booking Process 📅",
        faq: "Frequently Asked Questions ❓",
      },
    },
    ja: {
      heroTitle: "山を制覇しよう 🏔️",
      heroSubtitle: "10年以上の経験によるプライベートスキー指導＆ガイドアドベンチャー",
      heroButton: "行こう",
      intro: "初心者でも上級者でも、私のレッスンは自信をつけ、技術を磨く手助けをします。認定ガイドとして、隠れたパウダースポットや最高のゲレンデにご案内します。",
      expertise: [
        { title: "資格", content: ["✅ CSIA レベル3候補", "✅ AIARE 1 雪崩安全", "✅ 野外救急法認定"] },
        { title: "経験", content: ["6年以上の指導・ガイド経験"] },
        { title: "特別スキル", content: ["👨‍👩‍👧 家族・子供への指導", "🎿 バックカントリーツアー・ガイド", "🏂 フリーライド & カービング技術"] },
      ],
      packages: [
        { title: "プライベートレッスン", desc: "目標に合わせた1対1の集中コーチング。個別フィードバックで迅速な上達。" },
        { title: "グループレッスン", desc: "友達や家族と楽しく学びながら技術を向上させましょう。" },
        { title: "ガイドツアー", desc: "隠れたスポットや未踏雪、絶景の地形を発見。ツアー以上の冒険体験。" },
      ],
      testimonials: [
        { quote: "リュウは私が今まで出会った中で最高のインストラクターです。忍耐強く、楽しく、ついにブラックコースを制覇できました！", author: "サラ, USA" },
        { quote: "ガイドツアーは素晴らしかったです。自分では見つけられなかった隠れスポットを教えてくれました。", author: "ケンジ, 日本" },
      ],
      bookingSteps: ["連絡する", "日程を決める", "山で会う", "冒険を楽しむ"],
      faqs: [
        { q: "どのレベルが必要ですか？", a: "誰でもOK！初心者から上級者まで、あなたに合わせてレッスンします。" },
        { q: "装備は提供されますか？", a: "いいえ、近くの信頼できるレンタルショップを紹介できます。" },
        { q: "レッスンはどこで行われますか？", a: "主要なスキーリゾートやバックカントリーで希望に応じて行います。" },
      ],
      ctaButton: "スキーアドベンチャーを予約する！ 🎿",
      sections: {
        expertise: "あなたの専門知識 ⛷️",
        packages: "レッスンパッケージ ❄️",
        testimonials: "クライアントの声 💬",
        booking: "簡単予約プロセス 📅",
        faq: "よくある質問 ❓",
      },
    },
    zh: {
      heroTitle: "征服雪山 🏔️",
      heroSubtitle: "10年以上经验的私人滑雪课程与指导冒险",
      heroButton: "出发吧",
      intro: "无论您是初学者还是高级滑雪者，我的课程都能帮助您建立信心并提升技巧。作为认证向导，我将带您前往隐秘雪地和最佳地形，带来难忘体验。",
      expertise: [
        { title: "证书", content: ["✅ CSIA 三级候选", "✅ AIARE 1 雪崩安全", "✅ 野外急救认证"] },
        { title: "经验", content: ["6+ 季教学与指导经验"] },
        { title: "特殊技能", content: ["👨‍👩‍👧 教授家庭和儿童", "🎿 高山滑雪与导游", "🏂 自由滑与雕刻技巧"] },
      ],
      packages: [
        { title: "私人课程", desc: "针对目标的一对一辅导。个性化反馈实现快速进步。" },
        { title: "团体课程", desc: "与朋友和家人一起在轻松愉快的环境中提升技术。" },
        { title: "导游之旅", desc: "发现隐秘雪地、原始雪域和极致地形。不只是旅行——是一场冒险。" },
      ],
      testimonials: [
        { quote: "Ryu 是我遇到过最棒的教练。有耐心、有趣，帮我最终征服了黑道！", author: "Sarah, 美国" },
        { quote: "导游之旅太棒了。他带我们去了我自己根本找不到的隐藏地点。", author: "Kenji, 日本" },
      ],
      bookingSteps: ["联系我", "设定日期和时间", "山上见面", "享受你的冒险"],
      faqs: [
        { q: "我需要什么水平？", a: "任何水平！从初学者到专家，我会为您量身定制课程。" },
        { q: "提供装备吗？", a: "不提供，但我可以推荐附近可靠的租赁店。" },
        { q: "课程在哪里进行？", a: "在主要滑雪场或根据要求的高山区域进行。" },
      ],
      ctaButton: "预订你的滑雪冒险！ 🎿",
      sections: {
        expertise: "你的专业技能 ⛷️",
        packages: "课程套餐 ❄️",
        testimonials: "客户评价 💬",
        booking: "简单预订流程 📅",
        faq: "常见问题 ❓",
      },
    },
  };

  const { heroTitle, heroSubtitle, heroButton, intro, expertise, packages, testimonials, bookingSteps, faqs, ctaButton, sections } = content[language];

  return (
    <>
      <CustomCursor />
      <div className="bg-white min-h-screen text-gray-800">
        {/* Hero Section */}
        <header className="relative w-full h-[28rem] bg-cover bg-center" style={{ backgroundImage: "url('/images/ski-hero.jpg')" }}>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center px-4">
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-700 drop-shadow-xl tracking-tight" variants={itemVariants}>
                {heroTitle}
              </motion.h1>
              <motion.p className="mt-4 text-xl sm:text-2xl text-gray-600 font-light max-w-2xl mx-auto" variants={itemVariants}>
                {heroSubtitle}
              </motion.p>
              <motion.a
                href="#booking-form"
                className="mt-8 inline-block bg-gradient-to-r from-sky-300 to-sky-700 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:scale-105 transition transform"
                variants={itemVariants}
              >
                {heroButton}
              </motion.a>
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16 space-y-20">

          {/* Introduction */}
          <motion.section className="text-center max-w-3xl mx-auto" initial="hidden" animate="visible" variants={itemVariants}>
            <p className="text-lg sm:text-xl leading-relaxed">{intro}</p>
          </motion.section>

          {/* Expertise */}
          <motion.section className="bg-sky-50 p-10 rounded-2xl shadow-xl" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-10 text-center" variants={itemVariants}>
              {sections.expertise}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {expertise.map((exp, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{exp.title}</h3>
                  <ul className="text-gray-600 space-y-1">{exp.content.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Packages */}
          <motion.section initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-12 text-center" variants={itemVariants}>
              {sections.packages}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {packages.map((pkg, i) => (
                <motion.div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300" variants={cardVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                  <p className="text-gray-700 mb-6">{pkg.desc}</p>
                  <a href="#booking-form" className="inline-block bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
                    {heroButton}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section className="bg-sky-50 p-10 rounded-2xl shadow-lg" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-8 text-center" variants={itemVariants}>
              {sections.testimonials}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.blockquote key={i} className="p-6 bg-white rounded-xl shadow-md italic text-gray-700" variants={itemVariants}>
                  {t.quote}
                  <footer className="mt-4 text-sm font-semibold text-sky-700">— {t.author}</footer>
                </motion.blockquote>
              ))}
            </div>
          </motion.section>

          {/* Booking Steps */}
          <motion.section className="bg-sky-50 p-10 rounded-2xl shadow-lg" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-10 text-center" variants={itemVariants}>
              {sections.booking}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
              {bookingSteps.map((step, i) => (
                <motion.div key={i} className="flex flex-col items-center" variants={itemVariants}>
                  <div className="w-14 h-14 flex items-center justify-center bg-sky-600 text-white rounded-full mb-4 text-lg font-bold shadow-md">{i + 1}</div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-10 text-center" variants={itemVariants}>
              {sections.faq}
            </motion.h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div key={i} className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                  <h3 className="font-bold text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600 mt-2">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section className="text-center" initial="hidden" animate="visible" variants={itemVariants}>
            <a href="#booking-form" className="inline-block bg-gradient-to-r from-sky-500 to-sky-400 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition transform">
              {ctaButton}
            </a>
          </motion.section>
        </main>

        {/* Floating Buttons */}
        <FloatingButtons />
      </div>
      <Footer />
    </>
  );
}
