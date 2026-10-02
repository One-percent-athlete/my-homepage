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
import { useLanguage } from "@/app/context/LanguageContext";

// Map icon strings to React components
const iconMap = {
  envelope: <FaEnvelope aria-hidden="true" />,
  phone: <FaPhoneAlt aria-hidden="true" />,
  github: <FaGithub aria-hidden="true" />,
  linkedin: <FaLinkedin aria-hidden="true" />,
  instagram: <FaInstagram aria-hidden="true" />,
  facebook: <FaFacebook aria-hidden="true" />,
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
      value: "+81 70-4561-8976",
      link: "tel:+817045618976",
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

const contactCopy = {
  en: { title:"Get in Touch", subtitle:"Have a project in mind? Tell me about your idea, what you need, and when you’d like to get started.", phone:"Phone", form:"Send a Message", name:"Your Name", email:"Your Email", phonePlaceholder:"Your Phone Number", message:"Your Message", sending:"Sending...", send:"Send Message", success:"Message sent successfully!", error:"Failed to send message. Try again." },
  ja: { title:"お問い合わせ", subtitle:"プロジェクトのアイデアはありますか？ご相談内容や目標、希望の時期を聞かせてください。", phone:"電話", form:"メッセージを送る", name:"お名前", email:"メールアドレス", phonePlaceholder:"電話番号", message:"メッセージ", sending:"送信中...", send:"送信する", success:"メッセージを送信しました。", error:"送信できませんでした。もう一度お試しください。" },
  zh: { title:"联系我", subtitle:"有项目想法吗？告诉我你的想法、需求，以及希望开始的时间。", phone:"电话", form:"发送消息", name:"姓名", email:"电子邮箱", phonePlaceholder:"电话号码", message:"留言内容", sending:"发送中...", send:"发送消息", success:"消息发送成功！", error:"发送失败，请重试。" },
};

export default function Contact({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "section" : "main";
  const { language } = useLanguage();
  const t = contactCopy[language];
  useEffect(() => {
    const revealMessaging = () => {
      if (window.location.hash === "#messaging-apps") {
        const details = document.getElementById("messaging-apps") as HTMLDetailsElement | null;
        if (details) details.open = true;
      }
    };
    revealMessaging();
    window.addEventListener("hashchange", revealMessaging);
    return () => window.removeEventListener("hashchange", revealMessaging);
  }, []);
  const extra = {
    en: { optional: "optional", hint: "Tell me about your idea, goals, or timing (at least 10 characters).", direct: "Other ways to connect", qr: "Messaging apps & QR codes" },
    ja: { optional: "任意", hint: "アイデア、目標、時期などを10文字以上でお聞かせください。", direct: "その他の連絡方法", qr: "メッセージアプリ・QRコード" },
    zh: { optional: "选填", hint: "请介绍你的想法、目标或时间安排（至少10个字符）。", direct: "其他联系方式", qr: "聊天应用与二维码" },
  }[language];
   // --- Form state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
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
        setPhone("");
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
    <Container
      id="contact"
      className="contact-world contact-refresh relative pb-12 px-6 text-center overflow-hidden text-white"
    >
      {!embedded && <FloatingButtons />}
      {/* Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 relative z-10 text-yellow-400"
      >
        {t.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg mb-12 text-gray-300 max-w-xl mx-auto relative z-10"
      >
        {t.subtitle}
      </motion.p>

      <div className="contact-layout">
      {/* Contact Form */}
      <motion.form
        aria-labelledby="contact-form-title" aria-busy={status === "sending"}
        onSubmit={handleSubmit}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="contact-primary-form p-8 bg-gray-900/80 rounded-3xl"
      >
        <h2 id="contact-form-title" className="text-2xl font-bold mb-6 text-yellow-400">{t.form}</h2>
        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <fieldset disabled={status === "sending"}>
        <label className="contact-label" htmlFor="contact-name">{t.name}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name" maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <label className="contact-label" htmlFor="contact-email">{t.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email" maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <label className="contact-label" htmlFor="contact-message">{t.message}</label>
        <textarea
          id="contact-message"
          name="message"
          minLength={10} maxLength={5000} aria-describedby="message-hint"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={4}
          required
        ></textarea><p id="message-hint" className="contact-field-hint">{extra.hint}</p>

        <label className="contact-label" htmlFor="contact-phone">{t.phonePlaceholder} <span>({extra.optional})</span></label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel" maxLength={40}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="w-full py-4 px-6 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition-colors shadow-lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? t.sending : t.send}
        </button>

        </fieldset>
        <div role="status" aria-live="polite">
          {status === "success" && <p className="mt-4 text-green-400 font-semibold">{t.success}</p>}
          {status === "error" && <p className="mt-4 text-red-500 font-semibold">{t.error}</p>}
        </div>
      </motion.form>
      <aside className="contact-secondary">
        <h2>{extra.direct}</h2>
      {/* Contacts */}
      <motion.ul
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="contact-methods"
      >
        {contactData.contacts.map((contact) => (
          <motion.li
            key={contact.label}

            className="contact-method"
          >
            <span className="contact-method-icon">
              {iconMap[contact.icon]}
            </span>
            <h3 className="contact-method-label">{contact.icon === "phone" ? t.phone : contact.label}</h3>
            <a
              href={contact.link}
              className="text-gray-300 hover:text-yellow-400 transition-colors break-words"
            >
              {contact.value}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <details id="messaging-apps" className="contact-messaging"><summary>{extra.qr}</summary>
      {/* QR Codes */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="contact-qr-grid"
      >
        {contactData.qrcodes.map((qr) => (
          <motion.div
            key={qr.label}

            className="contact-qr"
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


      </details>
      </aside>
      </div>
    </Container>
      </>
  );
}
