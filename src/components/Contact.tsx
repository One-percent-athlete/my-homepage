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
} from "react-icons/fa";
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
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, website }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
    <section
      id="contact"
      className="contact-world relative pt-24 pb-12 px-6 text-center overflow-hidden text-white"
    > 
      <FloatingButtons />
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

      {/* Title & Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 relative z-10 text-yellow-400"
      >
        {contactData.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg mb-12 text-gray-300 max-w-xl mx-auto relative z-10"
      >
        {contactData.subtitle}
      </motion.p>

      {/* Contacts */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 relative z-10"
      >
        {contactData.contacts.map((contact) => (
          <motion.li
            key={contact.label}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center bg-gray-800/80 hover:bg-gray-700/80 rounded-3xl p-6 backdrop-blur-lg transition-all duration-300 hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50 hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-yellow-400 md:hover:border-yellow-400 md:hover:shadow-[0_0_40px_orange]
              shadow-[0_0_30px_orange] md:shadow-none border-1 border-yellow-400"
          >
            <span className="text-4xl mb-4 text-yellow-400">
              {iconMap[contact.icon]}
            </span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <a
              href={contact.link}
              className="text-gray-300 hover:text-yellow-400 transition-colors break-words cursor-none"
            >
              {contact.value}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      {/* QR Codes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-10 relative z-10"
      >
        {contactData.qrcodes.map((qr) => (
          <motion.div
            key={qr.label}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-800/80 rounded-3xl p-4 backdrop-blur-lg hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50 hover:shadow-[0_0_40px_cyan] sm:hover:scale-105
              md:border-yellow-400 md:hover:border-yellow-400 md:hover:shadow-[0_0_40px_orange]
              shadow-[0_0_30px_orange] md:shadow-none border-1 border-yellow-400"
          >
            <Image
              src={qr.src}
              alt={`${qr.label} QR code`}
              className="mb-2 object-cover"
              width={128}
              height={128}
            />
            <span className="text-gray-300">{qr.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="max-w-xl mx-auto mt-12 p-8 bg-gray-900/80 rounded-3xl backdrop-blur-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-6 text-yellow-400">Send a Message</h3>
        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={6}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition-colors shadow-lg cursor-none"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && <p className="mt-4 text-green-400 font-semibold">Message sent successfully!</p>}
        {status === "error" && <p className="mt-4 text-red-500 font-semibold">Failed to send message. Try again.</p>}
      </motion.form>
    </section>
      <Footer />
      </>
  );
}
