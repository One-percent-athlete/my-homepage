"use client";

import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import { motion, type Variants } from "framer-motion";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } };
const cardVariants: Variants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120 } } };

export default function Ski() {
  // Section Data
  const expertise = [
    { title: "Certifications", content: ["✅ CSIA Level 3 Candidate", "✅ AIARE 1 Avalanche Safety", "✅ Wilderness First Responder"] },
    { title: "Experience", content: ["6+ seasons teaching & guiding"] },
    { title: "Special Skills", content: ["👨‍👩‍👧 Teaching families & kids", "🎿 Backcountry touring & guiding", "🏂 Freeride & carving techniques"] },
  ];

  const packages = [
    { title: "Private Lesson", desc: "Focused 1-on-1 coaching tailored to your goals. Rapid progress with personalized feedback." },
    { title: "Group Lesson", desc: "Learn with friends & family in a fun, social setting while improving technique together." },
    { title: "Guided Tour", desc: "Discover secret stashes, untouched snow, and epic terrain. More than a tour — an adventure." },
  ];

  const testimonials = [
    { quote: "Ryu is the best instructor I&apos;ve ever had. Patient, fun, and helped me finally conquer black runs!", author: "Sarah, USA" },
    { quote: "The guided tour was incredible. He showed us hidden spots I never would have found on my own.", author: "Kenji, Japan" },
  ];

  const bookingSteps = ["Reach Out", "Set a Date and Time", "Meet Me on the Mountain", "Enjoy Your Adventure"];

  const faqs = [
    { q: "What level do I need to be?", a: "Any! From complete beginners to experts, I tailor lessons to you." },
    { q: "Do you provide equipment?", a: "No, but I can recommend trusted rental shops nearby." },
    { q: "Where do lessons take place?", a: "At major ski resorts or backcountry areas by request." },
  ];

  return (
    <>
      <CustomCursor />
      <div className="bg-white min-h-screen text-gray-800">
        {/* Hero Section */}
        <header className="relative w-full h-[28rem] bg-cover bg-center" style={{ backgroundImage: "url('/images/ski-hero.jpg')" }}>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center px-4">
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-700 drop-shadow-xl tracking-tight" variants={itemVariants}>
                Master the Mountain 🏔️
              </motion.h1>
              <motion.p className="mt-4 text-xl sm:text-2xl text-gray-600 font-light max-w-2xl mx-auto" variants={itemVariants}>
                Private Ski Lessons & Guided Adventures with 10+ Years of Expertise
              </motion.p>
              <motion.a
                href="#booking-form"
                className="mt-8 inline-block bg-gradient-to-r from-sky-300 to-sky-700 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:scale-105 transition transform"
                variants={itemVariants}
              >
                Let&apos;s Go
              </motion.a>
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16 space-y-20">

          {/* Introduction */}
          <motion.section className="text-center max-w-3xl mx-auto" initial="hidden" animate="visible" variants={itemVariants}>
            <p className="text-lg sm:text-xl leading-relaxed">
              Whether you&apos;re a <span className="font-semibold text-sky-600">first-timer</span> or an <span className="italic">advanced rider</span>, my lessons help you build confidence and refine your technique. 
              As a certified guide, I&apos;ll take you to hidden powder stashes and the best terrain for an unforgettable experience.
            </p>
          </motion.section>

          {/* Expertise */}
          <motion.section className="bg-sky-50 p-10 rounded-2xl shadow-xl" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-10 text-center" variants={itemVariants}>
              Your Expertise ⛷️
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {expertise.map((exp, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{exp.title}</h3>
                  <ul className="text-gray-600 space-y-1">
                    {exp.content.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Packages */}
          <motion.section initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-12 text-center" variants={itemVariants}>
              Lesson Packages ❄️
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {packages.map((pkg, i) => (
                <motion.div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300" variants={cardVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                  <p className="text-gray-700 mb-6">{pkg.desc}</p>
                  <a href="#booking-form" className="inline-block bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
                    Learn More
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section className="bg-sky-50 p-10 rounded-2xl shadow-lg" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-8 text-center" variants={itemVariants}>
              What My Clients Say 💬
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
              Simple Booking Process 📅
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
              Frequently Asked Questions ❓
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
              Book Your Ski Adventure! 🎿
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
