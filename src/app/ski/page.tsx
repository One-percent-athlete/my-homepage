// app/ski/page.tsx

"use client";

import FloatingButtons from "@/components/FloatingButtons";
import { motion, type Variants } from 'framer-motion';

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

export default function Ski() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section with Image */}
      <header className="relative w-full h-96">
        <img
          src="https://images.unsplash.com/photo-1549488344-933e46123a3d"
          alt="Skier on a pristine, snowy mountain with a clear blue sky"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold text-center drop-shadow-lg p-4"
            variants={itemVariants}
          >
            Master the Mountain: Private Ski Lessons & Guiding 🏔️
          </motion.h1>
        </motion.div>
      </header>

      {/* Main Content Container */}
      <main className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <motion.section
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you're a first-timer or an advanced rider looking for a new challenge, my lessons are designed to help you **build confidence** and refine your technique. As a certified guide, I'll show you the **best terrain** and **hidden spots** on the mountain, ensuring you get the most out of your day.
          </p>
        </motion.section>

        {/* Your Expertise Section */}
        <motion.section
          id="expertise"
          className="bg-white p-8 rounded-lg shadow-lg mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center" variants={itemVariants}>
            Your Expertise ⛷️
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Certifications</h3>
              <ul className="text-gray-600 list-none space-y-1">
                <li>PSIA Level 3 Certified</li>
                <li>AIARE 1 Avalanche Safety</li>
                <li>Wilderness First Responder</li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Years of Experience</h3>
              <p className="text-gray-600">10+ seasons teaching and guiding</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Special Skills</h3>
              <ul className="text-gray-600 list-none space-y-1">
                <li>Specialist in teaching children and families</li>
                <li>Backcountry guiding and touring</li>
                <li>Freeride and advanced carving techniques</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Lesson Packages Section */}
        <motion.section
          id="packages"
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-8 text-center" variants={itemVariants}>
            Lesson Packages
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Private Lesson Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              variants={cardVariants}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Private Lesson</h3>
              <p className="text-gray-700 mb-4">
                Experience focused one-on-one attention with a lesson designed **specifically for your goals**. Perfect for quickly mastering new skills and getting personalized feedback.
              </p>
              <a href="#booking-form" className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </motion.div>

            {/* Group Lesson Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              variants={cardVariants}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Group Lesson</h3>
              <p className="text-gray-700 mb-4">
                Share the **thrill of learning** with friends and family! My group lessons are a fun and social way to improve your technique and enjoy the mountain together.
              </p>
              <a href="#booking-form" className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </motion.div>

            {/* Guided Tour Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              variants={cardVariants}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guided Tour</h3>
              <p className="text-gray-700 mb-4">
                Ready to explore? Let me lead you to the **best snow**, secret powder stashes, and most exciting terrain on the mountain. A guided adventure, not just a tour!
              </p>
              <a href="#booking-form" className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Me Section */}
        <motion.section
          id="philosophy"
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">Why Choose Me?</h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            My teaching philosophy is simple: **patience, encouragement, and fun**. I focus on creating a supportive and safe environment where you can build skills at your own pace. I believe that a little patience and a lot of positive feedback are the keys to a confident and successful day on the slopes!
          </p>
        </motion.section>

        {/* Booking Process Section */}
        <motion.section
          id="booking-process"
          className="bg-white p-8 rounded-lg shadow-lg mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center" variants={itemVariants}>
            Simple Booking Process
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mb-3 text-lg font-bold">1</div>
              <p className="text-gray-700 font-medium">Choose Your Lesson</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mb-3 text-lg font-bold">2</div>
              <p className="text-gray-700 font-medium">Fill Out Our Quick Form</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mb-3 text-lg font-bold">3</div>
              <p className="text-gray-700 font-medium">We Confirm the Details</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mb-3 text-lg font-bold">4</div>
              <p className="text-gray-700 font-medium">Meet Me on the Mountain!</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          id="call-to-action"
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <a
            href="#booking-form" // This should link to your actual booking form or calendar
            className="inline-block bg-yellow-500 text-white font-extrabold text-xl py-4 px-10 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-transform duration-300"
          >
            Book Your Ski Adventure!
          </a>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© {new Date().getFullYear()} Your Ski Guide. All Rights Reserved.</p>
      </footer>
      <FloatingButtons />
    </div>
  );
};