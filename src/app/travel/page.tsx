"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { motion, type Variants } from 'framer-motion';
import { FaCompass, FaMapMarkedAlt, FaPlane, FaQuoteLeft } from 'react-icons/fa';

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Travel() {
  return (
    <>
      <FloatingButtons />
      <div className="bg-neutral-900 text-neutral-100 min-h-screen py-20 px-4 sm:px-8 font-sans">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-lime-400 mb-4 tracking-tight">
            Crafting Your Adventure
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-neutral-300">
            My journey began with a single backpack and a love for languages. I believe that travel isn&apos;t just about seeing new places&mdash;it&apos;s about finding yourself in them. I&apos;ll help you skip the tourist traps and discover the authentic heart of your destination.
          </p>
        </motion.header>

        <main className="max-w-7xl mx-auto">
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-lime-400">How We Work</h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-lime-400 transition-colors duration-300">
                <div className="text-4xl text-lime-400 mb-4">
                  <FaMapMarkedAlt />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Itineraries</h3>
                <p className="text-neutral-400">No more generic tours. I create a day-by-day plan tailored to your interests, budget, and travel style.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-lime-400 transition-colors duration-300">
                <div className="text-4xl text-lime-400 mb-4">
                  <FaCompass />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Insights &amp; Tips</h3>
                <p className="text-neutral-400">Get the inside scoop on hidden gems, off-the-beaten-path restaurants, and cultural nuances only a local would know.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-lime-400 transition-colors duration-300">
                <div className="text-4xl text-lime-400 mb-4">
                  <FaPlane />
                </div>
                <h3 className="text-xl font-bold mb-2">Booking Assistance</h3>
                <p className="text-neutral-400">From flights and accommodations to local tours and transportation, I help with every step of the planning process.</p>
              </motion.div>
            </motion.div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-lime-400">What Clients Say</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-lime-500">
                <FaQuoteLeft className="text-lime-400 text-3xl mb-4" />
                <p className="italic text-neutral-300 mb-4">&quot;I would have never found the amazing local market and tiny ramen shop without the personalized plan. It made my trip to Sapporo truly unforgettable!&quot;</p>
                <p className="font-bold text-neutral-200">- Alex R., California, USA</p>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-lime-500">
                <FaQuoteLeft className="text-lime-400 text-3xl mb-4" />
                <p className="italic text-neutral-300 mb-4">&quot;The consultation was a game-changer. It saved me hours of research and gave me the confidence to explore a country where I didn&apos;t speak the language.&quot;</p>
                <p className="font-bold text-neutral-200">- Sarah P., London, UK</p>
              </motion.div>
            </motion.div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-lime-400">Our Packages</h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-lime-500">
                <h3 className="text-2xl font-bold mb-2">The &quot;Planner&quot;</h3>
                <p className="text-neutral-400">A one-hour phone consultation and a detailed PDF guide with my top recommendations for your destination.</p>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-lime-500">
                <h3 className="text-2xl font-bold mb-2">The &quot;Explorer&quot;</h3>
                <p className="text-neutral-400">A full-service package including a detailed day-by-day itinerary, booking assistance, and ongoing support for a week-long trip.</p>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-lime-500">
                <h3 className="text-2xl font-bold mb-2">The &quot;Quick Q&amp;A&quot;</h3>
                <p className="text-neutral-400">A 30-minute call to answer all your travel questions and get quick, expert advice before your trip.</p>
              </motion.div>
            </motion.div>
          </section>

          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-100 mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Let&apos;s create your perfect journey, tailored just for you.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full text-neutral-900 bg-lime-400 hover:bg-lime-300 transition-colors duration-300 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCompass className="mr-2 text-xl" />
              Book a Free Consultation
            </motion.a>
          </section>
        </main>
      </div>
    </>
  );
}