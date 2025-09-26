"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingButtons from "../../components/FloatingButtons";
import Footer from "@/components/Footer";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import FlagCanvasCircle from "@/components/travel/FlagCanvasCircle";
import LogoShowcase from "@/components/travel/LogoShowcase";

export default function TravelPage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -600]);

    return (
        <>
        <CustomCursor />
        <FloatingButtons />
        <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 overflow-hidden">

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen z-20">
                <FlagCanvasCircle scrollY={scrollY} />

                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl font-extrabold drop-shadow-lg text-orange-400 z-10"
                >
                    ✈️ Discover Your Next Adventure
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-6 text-xl text-gray-300 max-w-2xl z-10"
                >
                    Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments. Where will your heart take you next?
                </motion.p>
                <motion.a
                    href="/contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-8 inline-block px-8 py-4 text-lg font-bold rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-colors"
                >
                    Let&apos;s Go
                </motion.a>
            </section>

            {/* Destinations Grid */}
            <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
                {[
                    {
                        title: "Tropical Paradise",
                        img: "/images/beach.jpg",
                        desc: "Soak up the sun, feel the sand between your toes, and sip on fresh coconut water.",
                    },
                    {
                        title: "Mountain Escape",
                        img: "/images/mountain.jpg",
                        desc: "Breathe in crisp air, chase waterfalls, and find peace among majestic peaks.",
                    },
                    {
                        title: "City Lights",
                        img: "/images/city.jpg",
                        desc: "Get lost in buzzing streets, taste local delights, and dance the night away.",
                    },
                ].map((place, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                    >
                        <Image src={place.img} alt={place.title} className="rounded-lg" width={600} height={400} />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-orange-400">{place.title}</h3>
                            <p className="mt-3 text-gray-300">{place.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Parallax Showcase */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/nature.jpg')",
                        y: yParallax,
                    }}
                />
                <div className="relative z-10 text-center">
                    <h2 className="text-5xl font-extrabold drop-shadow-xl text-orange-400">🌄 Breathtaking Views</h2>
                    <p className="mt-4 text-xl text-gray-200">Let nature remind you how small the world makes you feel.</p>
                </div>
            </section>

            {/* Testimonials / Why Me */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h2 className="text-4xl font-bold text-center mb-12 text-orange-400">❤️ Why Me ?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Backpacked for 6 years", icon: "🎒" },
                        { name: "Visited 60+ countries", icon: "🌏" },
                        { name: "Hitchhiked NY → LA", icon: "🛣️" },
                        { name: "Walked Camino de Santiago", icon: "🥾" },
                        { name: "Multilanguage Speaker", icon: "🗣️" },
                        { name: "Deckhand / Underwater Guide", icon: "⚓" },
                        { name: "Snow Mountain Guide", icon: "🏔️" },
                        { name: "City Tour Guide", icon: "🏙️" },
                        { name: "Volunteered in Nepal, Bangladesh, Tanzania", icon: "🌍" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h4 className="mt-2 font-semibold text-orange-400 text-lg">{item.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Extra Parallax Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/adventure.jpg')",
                        y: yParallax,
                    }}
                />
                <div className="relative z-10 text-center">
                    <h2 className="text-5xl font-extrabold drop-shadow-xl text-orange-400">🌍 Endless Adventures</h2>
                    <p className="mt-4 text-xl text-gray-200">Every step brings a new story to tell.</p>
                </div>
            </section>
            <LogoShowcase direction="right" />
            {/* Call to Action */}
            <section
                id="cta-section"
                className="text-center px-6 py-24 bg-gradient-to-r from-cyan-700 to-indigo-800"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-extrabold drop-shadow-md text-orange-400"
                >
                    🌍 The world is waiting for you
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-4 text-lg text-gray-300"
                >
                    Pack your bags and let your soul wander. Adventure is just a heartbeat away.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 text-lg font-bold rounded-full bg-orange-400 text-white shadow-lg hover:bg-orange-500"
                >
                    Start Exploring
                </motion.button>
            </section>

            <LogoShowcase direction="left" />
        </div>
        <Footer />
        </>
    );
}
