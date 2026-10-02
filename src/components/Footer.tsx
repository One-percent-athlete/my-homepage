"use client";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaLine,
  FaWeixin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const contactLinks = [
    { label: "Email", icon: FaEnvelope, href: "mailto:one.percent.athlete@gmail.com" },
    { label: "Phone", icon: FaPhoneAlt, href: "tel:+817045618976" },
  ];

  const socialLinks = [
    { label: "GitHub", icon: FaGithub, url: "https://github.com/One-percent-athlete" },
    { label: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
    { label: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/ryu.free.spirit/" },
    { label: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/ryu.suzuki.super/" },
    { label: "LINE", icon: FaLine, url: "https://line.me/ti/p/hkL8_yg15L" },
    { label: "WeChat QR code", icon: FaWeixin, url: "/contact#messaging-apps" },
  ];

  return <footer className="public-footer">
    <span className="footer-signature">© {new Date().getFullYear()} Ryu Suzuki / 37°N</span>
    <nav className="footer-links" aria-label={{ en: "Contact and social links", ja: "連絡先・SNS", zh: "联系方式与社交平台" }[language]}>
      {contactLinks.map(({ icon: Icon, href, label }) => <a key={label} href={href} aria-label={label}><Icon size={15} aria-hidden="true" /></a>)}
      {socialLinks.map(({ icon: Icon, url, label }) => <a key={label} href={url} aria-label={label} target={url.startsWith("/") ? undefined : "_blank"} rel={url.startsWith("/") ? undefined : "noopener noreferrer"}><Icon size={15} aria-hidden="true" /></a>)}
    </nav>
  </footer>;
}
