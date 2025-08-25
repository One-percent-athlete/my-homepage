"use client";

import { useState, useEffect, useMemo } from "react";
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
import { usePathname } from "next/navigation";

export default function Contact() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const localeKey = (["en", "ja", "zh"] as const).includes(locale as any)
    ? (locale as "en" | "ja" | "zh")
    : "en";

  // Translations
  const t = useMemo(() => ({
    en: {
      title: "Get in Touch",
      subtitle: "Open for freelance projects, collaborations, or just a chat about your next big idea. Reach me via any method below.",
      contacts: [
        { icon: <FaEnvelope />, label: "Email", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: <FaPhoneAlt />, label: "Phone", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: <FaGithub />, label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: <FaInstagram />, label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: <FaFacebook />, label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ]
    },
    ja: {
      title: "お問い合わせ",
      subtitle: "フリーランスプロジェクト、コラボレーション、または次の大きなアイデアについての雑談も歓迎です。以下の方法でご連絡ください。",
      contacts: [
        { icon: <FaEnvelope />, label: "メール", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: <FaPhoneAlt />, label: "電話", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: <FaGithub />, label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: <FaInstagram />, label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: <FaFacebook />, label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ]
    },
    zh: {
      title: "联系我",
      subtitle: "欢迎自由职业项目、合作，或聊聊你的下一个大想法。请通过以下方式联系我。",
      contacts: [
        { icon: <FaEnvelope />, label: "邮箱", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: <FaPhoneAlt />, label: "电话", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: <FaGithub />, label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: <FaInstagram />, label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: <FaFacebook />, label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line 二维码", src: "/qrcodes/line-qr.png" },
        { label: "Wechat 二维码", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp 二维码", src: "/qrcodes/whatsapp-qr.png" },
      ]
    },
  })[localeKey], [localeKey]);

  // Particles state (client-only)

  type Particle = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  trailLength: number;
};

const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const particleData = Array.from({ length: 20 }).map(() => ({
      startX: Math.random() * 1200 - 600,
      startY: Math.random() * 800 - 400,
      endX: Math.random() * 1200 - 600,
      endY: Math.random() * 800 - 400,
      duration: 10 + Math.random() * 10,
      trailLength: 20 + Math.random() * 30,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6 text-center overflow-hidden text-white"
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
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

      {/* Background circles */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-yellow-400 rounded-full opacity-20 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-10 animate-pulse blur-3xl"></div>

      {/* Title & subtitle */}
      <motion.h2 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold mb-6 relative z-10">
        {t.title}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg mb-12 text-gray-300 max-w-xl mx-auto relative z-10">
        {t.subtitle}
      </motion.p>

      {/* Contact list */}
      <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 relative z-10">
        {t.contacts.map((contact, index) => (
          <motion.li key={index} whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center bg-gray-800/80 hover:bg-gray-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 cursor-pointer hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50">
            <span className="text-4xl mb-4 text-yellow-400">{contact.icon}</span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <a href={contact.link} className="text-gray-300 hover:text-yellow-400 transition-colors break-words">{contact.value}</a>
          </motion.li>
        ))}
      </motion.ul>

      {/* QR Codes */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.8 }} className="flex flex-wrap justify-center gap-10 relative z-10">
        {t.qrcodes.map((qr, index) => (
          <motion.div key={index} whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-800/80 rounded-3xl p-4 shadow-2xl backdrop-blur-lg cursor-pointer hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50">
            <Image src={qr.src} alt={qr.label} className="mb-2 object-cover" width={128} height={128} />
            <span className="text-gray-300">{qr.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
