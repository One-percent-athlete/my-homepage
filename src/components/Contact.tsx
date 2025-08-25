"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaLine, FaWeixin, FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


export default function Contact() {
  const contacts = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "one.percent.athlete@gmail.com",
      link: "mailto:one.percent.athlete@gmail.com",
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: "+81 07-4561-8976",
      link: "tel:+810745618976",
    },
    {
      icon: <FaGithub />,
      label: "Github",
      value: "github.com/One-percent-athlete",
      link: "https://github.com/One-percent-athlete",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/ryu",
      link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      value: "@ryu.free.spirit",
      link: "https://www.instagram.com/ryu.free.spirit/",
    },
    {
      icon: <FaFacebook />,
      label: "Facebook",
      value: "@ryu.suzuki.super",
      link: "https://www.facebook.com/ryu.suzuki.super/",
    },
  ];

  const qrCodes = [
    { label: "Line QR", src: "/qrcodes/line-qr.png" },
    { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
    { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
];

  // Generate floating particles
  const particles = Array.from({ length: 15 });

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6 text-center overflow-hidden text-white"
    >
      {/* Floating glowing particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
          initial={{
            x: Math.random() * 1200 - 600,
            y: Math.random() * 800 - 400,
          }}
          animate={{
            x: Math.random() * 1200 - 600,
            y: Math.random() * 800 - 400,
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Background gradient circles */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-yellow-400 rounded-full opacity-20 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-10 animate-pulse blur-3xl"></div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 relative z-10"
      >
        Get in Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg mb-12 text-gray-300 max-w-xl mx-auto relative z-10"
      >
        Open for freelance projects, collaborations, or just a chat about your
        next big idea. Reach me via any method below.
      </motion.p>

      {/* Contact list */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 relative z-10"
      >
        {contacts.map((contact, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center bg-gray-800/80 hover:bg-gray-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 cursor-pointer"
          >
            <span className="text-4xl mb-4 text-yellow-400">{contact.icon}</span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <a
              href={contact.link}
              className="text-gray-300 hover:text-yellow-400 transition-colors break-words"
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
        {qrCodes.map((qr, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-800/80 rounded-3xl p-4 shadow-2xl backdrop-blur-lg cursor-pointer"
          >
            <Image src={qr.src} alt={qr.label} className="mb-2" width={128} height={128} />
            <span className="text-gray-300">{qr.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
