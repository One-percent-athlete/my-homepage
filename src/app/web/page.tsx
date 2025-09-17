"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { motion, type Variants } from 'framer-motion';
import { FaGlobe, FaCogs, FaHandsHelping, FaRocket } from 'react-icons/fa';

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

export default function Web() {
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
                <h1 className="text-4xl sm:text-6xl font-extrabold text-teal-400 mb-4 tracking-tight">
                Bridges to a Global Audience
                </h1>
                <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-neutral-300">
                Your business has a global vision. We build the digital foundation to make it a reality. From elegant design to seamless functionality, we create websites that speak your customers' language—literally.
                </p>
            </motion.header>

            <main className="max-w-7xl mx-auto">
                <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">What We Do</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-teal-400 transition-colors duration-300">
                    <div className="text-4xl text-teal-400 mb-4">
                        <FaGlobe />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Strategic Localization</h3>
                    <p className="text-neutral-400">We go beyond simple translation. We adapt your content for cultural context, local idioms, and regional preferences to ensure your brand resonates authentically.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-teal-400 transition-colors duration-300">
                    <div className="text-4xl text-teal-400 mb-4">
                        <FaCogs />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Technical Excellence</h3>
                    <p className="text-neutral-400">We build clean, fast, and SEO-friendly sites on platforms like <strong className="text-teal-400">WordPress</strong>, <strong className="text-teal-400">Shopify</strong>, or with custom code to ensure a seamless user experience.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border border-neutral-700 hover:border-teal-400 transition-colors duration-300">
                    <div className="text-4xl text-teal-400 mb-4">
                        <FaHandsHelping />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Full-Service Solutions</h3>
                    <p className="text-neutral-400">From initial design and content strategy to ongoing maintenance and support, we handle every step of your project, so you can focus on your business.</p>
                    </motion.div>
                </motion.div>
                </section>

                <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">Our Process</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-teal-500">
                    <h3 className="text-2xl font-bold mb-2">1. Discovery Call</h3>
                    <p className="text-neutral-400">We discuss your goals, target audience, and project scope to create a tailored strategy.</p>
                    </motion.div>

                    <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-teal-500">
                    <h3 className="text-2xl font-bold mb-2">2. Design & Development</h3>
                    <p className="text-neutral-400">We build a custom site with a focus on your chosen languages and functionality, bringing your vision to life.</p>
                    </motion.div>

                    <motion.div variants={cardVariants} className="bg-neutral-800 p-8 rounded-xl shadow-lg border-l-4 border-teal-500">
                    <h3 className="text-2xl font-bold mb-2">3. Launch & Optimization</h3>
                    <p className="text-neutral-400">We handle the technical launch and ensure your site is optimized for search engines in all languages.</p>
                    </motion.div>
                </motion.div>
                </section>

                <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">Our Work</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                    className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-700"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    >
                    <img src="/images/mockup-1.jpg" alt="Mockup of a multilingual e-commerce site" className="w-full h-auto object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-teal-400 mb-2">E-commerce Expansion for "GlobaGoods"</h3>
                        <p className="text-neutral-400">
                        <strong className="text-neutral-200">Challenge:</strong> A fast-growing startup needed to enter new markets in Europe and Asia without redesigning their entire platform.
                        </p>
                        <p className="text-neutral-400 mt-2">
                        <strong className="text-neutral-200">Solution:</strong> We integrated a robust multilingual solution, allowing for seamless content translation, currency conversion, and localized SEO. The result was a 150% increase in international traffic.
                        </p>
                    </div>
                    </motion.div>
                    <motion.div
                    className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-700"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    >
                    <img src="/images/mockup-2.jpg" alt="Mockup of a corporate website with different language versions" className="w-full h-auto object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-teal-400 mb-2">Localized Corporate Site for "Tech Innovate Inc."</h3>
                        <p className="text-neutral-400">
                        <strong className="text-neutral-200">Challenge:</strong> A tech company needed to build trust in new regions by providing their company information and product specs in local languages.
                        </p>
                        <p className="text-neutral-400 mt-2">
                        <strong className="text-neutral-200">Solution:</strong> We developed a custom, high-performance site with dynamic language switching and region-specific content, improving user engagement and brand perception globally.
                        </p>
                    </div>
                    </motion.div>
                </div>
                </section>

                <section className="text-center mb-16">
                <h2 className="text-3xl font-bold text-neutral-100 mb-6">
                    Ready to Go Global?
                </h2>
                <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
                    Let's discuss your project and build a website that connects you with customers worldwide.
                </p>
                <motion.a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full text-neutral-900 bg-teal-400 hover:bg-teal-300 transition-colors duration-300 shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaRocket className="mr-2 text-xl" />
                    Let's Discuss Your Project
                </motion.a>
                </section>
            </main>
            </div>

    </>
  );
}