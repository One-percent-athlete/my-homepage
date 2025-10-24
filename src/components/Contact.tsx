"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

// Map icon strings to React components
const iconMap = {
  envelope: <FaEnvelope aria-label="Email" />,
  phone: <FaPhoneAlt aria-label="Phone" />,
  github: <FaGithub aria-label="GitHub" />,
  linkedin: <FaLinkedin aria-label="LinkedIn" />,
  instagram: <FaInstagram aria-label="Instagram" />,
  facebook: <FaFacebook aria-label="Facebook" />,
} as const;

type IconKey = keyof typeof iconMap;

type ContactItem = {
  icon: IconKey;
  label: string;
  value: string;
  link: string;
};

type QrCodeItem = {
  label: string;
  src: string;
};

// Real contact data
const contactData: {
  title: string;
  subtitle: string;
  contacts: ContactItem[];
  qrcodes: QrCodeItem[];
} = {
  title: "Get in Touch",
  subtitle:
    "Open for freelance projects, collaborations, or just a chat about your next big idea. Reach me via any method below.",
  contacts: [
    {
      icon: "envelope",
      label: "Email",
      value: "one.percent.athlete@gmail.com",
      link: "mailto:one.percent.athlete@gmail.com",
    },
    {
      icon: "phone",
      label: "Phone",
      value: "+81 07-4561-8976",
      link: "tel:+810745618976",
    },
    {
      icon: "github",
      label: "Github",
      value: "github.com/One-percent-athlete",
      link: "https://github.com/One-percent-athlete",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/ryu",
      link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/",
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "@ryu.free.spirit",
      link: "https://www.instagram.com/ryu.free.spirit/",
    },
    {
      icon: "facebook",
      label: "Facebook",
      value: "@ryu.suzuki.super",
      link: "https://www.facebook.com/ryu.suzuki.super/",
    },
  ],
  qrcodes: [
    { label: "Line QR", src: "/qrcodes/line-qr.png" },
    { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
    { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
  ],
};

export default function Contact() {
  // Particle effect
  type Particle = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
  };

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const particleData: Particle[] = Array.from({ length: 20 }).map(() => ({
      startX: Math.random() * vw,
      startY: Math.random() * vh,
      endX: Math.random() * vw,
      endY: Math.random() * vh,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(particleData);
  }, []);

   // --- Form state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 px-6 text-center overflow-hidden text-white"
    > 
      <CustomCursor />
      <FloatingButtons />
      
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Subtle gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
          initial={{ x: p.startX, y: p.startY, opacity: 0.5, scale: 1 }}
          animate={{
            x: p.endX,
            y: p.endY,
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Header Section */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-black mb-6 relative z-10 text-yellow-400"
          >
            {contactData.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-4">
              {contactData.subtitle}
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-cyan-400 mx-auto rounded-full" />
          </motion.div>
        </motion.div>

        {/* Enhanced Contacts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {contactData.contacts.map((contact) => (
            <motion.div
              key={contact.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex flex-col items-center bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/30 transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20 group"
            >
              <div className="text-4xl mb-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                {iconMap[contact.icon]}
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">{contact.label}</h3>
              <a
                href={contact.link}
                className="text-gray-300 hover:text-yellow-400 transition-colors break-words text-center cursor-none group-hover:underline"
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced QR Codes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {contactData.qrcodes.map((qr) => (
            <motion.div
              key={qr.label}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20"
            >
              <div className="bg-white rounded-xl p-3 mb-4 shadow-inner">
                <Image
                  src={qr.src}
                  alt={`${qr.label} QR code`}
                  className="object-cover"
                  width={120}
                  height={120}
                />
              </div>
              <span className="text-gray-300 font-medium">{qr.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
            <div className="text-center mb-8">
              <motion.h3 
                className="text-3xl font-bold mb-2 text-yellow-400"
                whileHover={{ scale: 1.05 }}
              >
                Send a Message
              </motion.h3>
              <p className="text-gray-400">Let's start a conversation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  required
                />
              </div>

              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                required
              />

              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 resize-none"
                rows={6}
                required
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg cursor-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 font-semibold text-center p-3 bg-green-400/10 rounded-xl border border-green-400/30"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-400 font-semibold text-center p-3 bg-red-400/10 rounded-xl border border-red-400/30"
                >
                  Failed to send message. Try again.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

    </section>
      <Footer /></>
  );
}