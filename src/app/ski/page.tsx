// app/ski/page.tsx

"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { motion, type Variants } from "framer-motion";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

export default function Ski() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative w-full h-[28rem] bg-cover bg-center" style={{ backgroundImage: "url('/images/ski-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center px-4"
          >
            <motion.h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-xl tracking-tight"
              variants={itemVariants}
            >
              Master the Mountain 🏔️
            </motion.h1>
            <motion.p
              className="mt-4 text-xl sm:text-2xl text-gray-200 font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Private Ski Lessons & Guided Adventures with 10+ Years of Expertise
            </motion.p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <motion.section
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you&apos;re a <span className="font-semibold text-blue-700">first-timer</span> or an{" "}
            <span className="italic">advanced rider</span>, my lessons help you build confidence and refine your technique. 
            As a certified guide, I&apos;ll take you to hidden powder stashes and the best terrain for an unforgettable experience.
          </p>
        </motion.section>

        {/* Expertise */}
        <motion.section
          id="expertise"
          className="bg-gradient-to-r from-blue-50 to-cyan-50 p-10 rounded-2xl shadow-xl mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-10 text-center"
            variants={itemVariants}
          >
            Your Expertise ⛷️
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Certifications</h3>
              <ul className="text-gray-600 space-y-1">
                <li>✅ PSIA Level 3 Certified</li>
                <li>✅ AIARE 1 Avalanche Safety</li>
                <li>✅ Wilderness First Responder</li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Experience</h3>
              <p className="text-gray-600">10+ seasons teaching & guiding</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Special Skills</h3>
              <ul className="text-gray-600 space-y-1">
                <li>👨‍👩‍👧 Teaching families & kids</li>
                <li>🎿 Backcountry touring & guiding</li>
                <li>🏂 Freeride & carving techniques</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Packages */}
        <motion.section
          id="packages"
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-600 to-cyan-400 mb-12 text-center"
            variants={itemVariants}
          >
            Lesson Packages ❄️
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Private Lesson",
                desc: "Focused 1-on-1 coaching tailored to your goals. Rapid progress with personalized feedback.",
              },
              {
                title: "Group Lesson",
                desc: "Learn with friends & family in a fun, social setting while improving technique together.",
              },
              {
                title: "Guided Tour",
                desc: "Discover secret stashes, untouched snow, and epic terrain. More than a tour — an adventure.",
              },
            ].map((pkg, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 
                           hover:shadow-2xl hover:scale-105 transition-all duration-300"
                variants={cardVariants}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                <p className="text-gray-700 mb-6">{pkg.desc}</p>
                <a
                  href="#booking-form"
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 
                             text-white font-bold py-2 px-6 rounded-full shadow-md 
                             hover:shadow-lg hover:scale-105 transition"
                >
                  Learn More
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="testimonials"
          className="bg-white p-10 rounded-2xl shadow-lg mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-8 text-center"
            variants={itemVariants}
          >
            What My Clients Say 💬
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.blockquote
              className="p-6 bg-blue-50 rounded-xl shadow-md italic text-gray-700"
              variants={itemVariants}
            >
              “Ryu is the best instructor I’ve ever had. Patient, fun, and helped me finally conquer black runs!”
              <footer className="mt-4 text-sm font-semibold text-blue-700">— Sarah, USA</footer>
            </motion.blockquote>
            <motion.blockquote
              className="p-6 bg-blue-50 rounded-xl shadow-md italic text-gray-700"
              variants={itemVariants}
            >
              “The guided tour was incredible. He showed us hidden spots I never would have found on my own.”
              <footer className="mt-4 text-sm font-semibold text-blue-700">— Kenji, Japan</footer>
            </motion.blockquote>
          </div>
        </motion.section>

        {/* Booking Steps */}
        <motion.section
          id="booking-process"
          className="bg-gradient-to-r from-blue-50 to-cyan-50 p-10 rounded-2xl shadow-lg mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-10 text-center"
            variants={itemVariants}
          >
            Simple Booking Process 📅
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            {["Choose Your Lesson", "Fill Out the Form", "Confirm the Details", "Meet Me on the Mountain"].map(
              (step, i) => (
                <motion.div key={i} className="flex flex-col items-center" variants={itemVariants}>
                  <div className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-full mb-4 text-lg font-bold shadow-md">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          id="faq"
          className="max-w-3xl mx-auto mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-10 text-center"
            variants={itemVariants}
          >
            Frequently Asked Questions ❓
          </motion.h2>
          <div className="space-y-6">
            {[
              { q: "What level do I need to be?", a: "Any! From complete beginners to experts, I tailor lessons to you." },
              { q: "Do you provide equipment?", a: "No, but I can recommend trusted rental shops nearby." },
              { q: "Where do lessons take place?", a: "At major ski resorts or backcountry areas by request." },
            ].map((faq, i) => (
              <motion.div key={i} className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                <h3 className="font-bold text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 mt-2">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          id="call-to-action"
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <a
            href="#booking-form"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition transform"
          >
            Book Your Ski Adventure! 🎿
          </a>
        </motion.section>
      </main>

      {/* Floating Action Buttons */}
      <FloatingButtons />
    </div>
  );
}
