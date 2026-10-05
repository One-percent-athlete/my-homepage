"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
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
  en: { title:"What would you like to build together?", subtitle:"Tell me what you’re imagining—a useful app, a new website, or an idea you’re still figuring out. We can start with a conversation.", phone:"Phone", form:"Tell me about your idea", name:"Your Name", email:"Your Email", phonePlaceholder:"Your Phone Number", message:"What do you have in mind?", sending:"Sending...", send:"Send Message", success:"Thanks for reaching out", received:"Your message has been received.", reply:"I’ll reply to", next:"to talk about your idea and the next steps.", another:"Send another message", back:"Explore my work", sent:"Your message", error:"Your message hasn’t been sent. Your draft is still here—please try again, or email me directly." },
  ja: { title:"一緒に、何をつくりましょうか？", subtitle:"便利なアプリ、新しいウェブサイト、まだ形になっていないアイデア。思い描いていることを聞かせてください。まずは会話から始めましょう。", phone:"電話", form:"アイデアを聞かせてください", name:"お名前", email:"メールアドレス", phonePlaceholder:"電話番号", message:"どんなことを考えていますか？", sending:"送信中...", send:"送信する", success:"ご連絡ありがとうございます", received:"メッセージを受け取りました。", reply:"返信先：", next:"アイデアや次のステップについて、このアドレスに返信します。", another:"別のメッセージを送る", back:"作品を見る", sent:"送信したメッセージ", error:"送信できませんでした。入力内容は残っています。再度お試しいただくか、メールで直接ご連絡ください。" },
  zh: { title:"你想和我一起创造什么？", subtitle:"实用的应用、新的网站，或还在构思的想法，都可以告诉我。我们可以从一次交流开始。", phone:"电话", form:"聊聊你的想法", name:"姓名", email:"电子邮箱", phonePlaceholder:"电话号码", message:"你有什么想法？", sending:"发送中...", send:"发送消息", success:"谢谢你的联系", received:"你的消息已收到。", reply:"我会回复至", next:"一起聊聊你的想法和下一步。", another:"再发送一条消息", back:"探索我的作品", sent:"你的消息", error:"消息尚未发送，草稿已保留。请重试，或直接通过邮件联系我。" },
};

export default function Contact({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "section" : "main";
  const { language } = useLanguage();
  const t = contactCopy[language];
  const [editingField, setEditingField] = useState<string | null>(null);
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const mobile = window.matchMedia("(max-width: 699px)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    const focusedField = () => {
      const field = document.activeElement;
      return field instanceof HTMLElement && contact.contains(field) && field.matches('input:not([tabindex="-1"]),textarea,select') ? field : null;
    };
    const clearEditing = () => {
      delete document.body.dataset.contactEditing;
      document.body.style.removeProperty("--contact-viewport-height");
      document.body.style.removeProperty("--contact-viewport-top");
      setEditingField(null);
    };
    const revealField = () => {
      const field = focusedField();
      if (!mobile.matches || !field) return;
      document.body.dataset.contactEditing = "true";
      const viewport = window.visualViewport;
      document.body.style.setProperty("--contact-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      document.body.style.setProperty("--contact-viewport-top", `${viewport?.offsetTop ?? 0}px`);
      setEditingField(field.id);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!focusedField()) return;
        if (contact.closest(".home-tunnel-layer")) {
          const label = contact.querySelector<HTMLLabelElement>(`label[for="${field.id}"]`);
          const bar = contact.querySelector(".contact-focus-bar");
          const top = (bar?.getBoundingClientRect().bottom ?? contact.getBoundingClientRect().top) + 16;
          contact.scrollTop += (label ?? field).getBoundingClientRect().top - top;
        } else field.scrollIntoView({ block: "center", behavior: "instant" });
      });
    };
    const focus = () => { if (focusedField()) { clearTimeout(timer); revealField(); } else blur(); };
    const blur = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (!focusedField()) clearEditing(); }, 350);
    };
    contact.addEventListener("focusin", focus);
    contact.addEventListener("focusout", blur);
    window.addEventListener("resize", revealField);
    window.visualViewport?.addEventListener("resize", revealField);
    window.visualViewport?.addEventListener("scroll", revealField);
    return () => {
      clearTimeout(timer); cancelAnimationFrame(frame); clearEditing();
      contact.removeEventListener("focusin", focus); contact.removeEventListener("focusout", blur);
      window.removeEventListener("resize", revealField);
      window.visualViewport?.removeEventListener("resize", revealField);
      window.visualViewport?.removeEventListener("scroll", revealField);
    };
  }, []);
  const fields = ["contact-name", "contact-email", "contact-message", "contact-phone"];
  const fieldLabels = [t.name, t.email, t.message, t.phonePlaceholder];
  const editingIndex = fields.indexOf(editingField ?? "");
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
  const [submitted, setSubmitted] = useState<{name:string;email:string;message:string} | null>(null);
  const sendingRef = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current || status === "success") return;
    sendingRef.current = true;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, website }),
      });

      const acknowledgment: unknown = await res.json();
      if (res.ok && acknowledgment && typeof acknowledgment === "object" && "status" in acknowledgment && acknowledgment.status === "success") {
        setSubmitted({name:name.trim(),email:email.trim(),message:message.trim()});
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setWebsite("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <>
    <Container
      id="contact"
      className="contact-world contact-refresh relative pb-12 px-6 text-center overflow-hidden text-white"
    >
      {!embedded && <FloatingButtons />}
      <div className="contact-focus-bar">
        <span><small>{language === "ja" ? "お問い合わせ" : language === "zh" ? "联系我" : "Contact"} · {editingIndex + 1} / 4</small><strong>{fieldLabels[editingIndex]}</strong></span>
        <button type="button" onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); setEditingField(null); delete document.body.dataset.contactEditing; document.body.style.removeProperty("--contact-viewport-height"); document.body.style.removeProperty("--contact-viewport-top"); }}>{language === "ja" ? "完了" : language === "zh" ? "完成" : "Done"}</button>
      </div>
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
        {status === "success" && submitted ? <div className="contact-success" role="status" aria-live="polite">
          <CheckCircle2 size={44} aria-hidden="true"/>
          <p className="contact-success-kicker">{t.received}</p>
          <h2 id="contact-form-title" ref={successRef} tabIndex={-1}>{language === "ja" ? `${submitted.name}さん、${t.success}。` : language === "zh" ? `${t.success}，${submitted.name}。` : `${t.success}, ${submitted.name}.`}</h2>
          <p>{t.reply} <strong>{submitted.email}</strong> {t.next}</p>
          <div className="contact-sent-summary"><small>{t.sent}</small><p>{submitted.message.length > 240 ? submitted.message.slice(0,240) + "…" : submitted.message}</p></div>
          <div className="contact-success-actions"><a href="/web">{t.back} <ArrowUpRight size={16} aria-hidden="true"/></a><button type="button" onClick={() => {setStatus("idle");setSubmitted(null);requestAnimationFrame(() => nameRef.current?.focus());}}>{t.another}</button></div>
        </div> : <>
        <h2 id="contact-form-title" className="text-2xl font-bold mb-6 text-yellow-400">{t.form}</h2>
        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <fieldset disabled={status === "sending"}>
        <label className="contact-label" htmlFor="contact-name">{t.name}</label>
        <input
          ref={nameRef}
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
          {status === "error" && <p className="mt-4 text-red-500 font-semibold">{t.error}</p>}
        </div>
        </>}
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
