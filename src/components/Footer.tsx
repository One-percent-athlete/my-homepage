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

export default function Footer() {
  const contactLinks = [
    { icon: FaEnvelope, href: "mailto:one.percent.athlete@gmail.com" },
    { icon: FaPhoneAlt, href: "tel:+8107045618976" },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/One-percent-athlete" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
    { icon: FaInstagram, url: "https://www.instagram.com/ryu.free.spirit/" },
    { icon: FaFacebook, url: "https://www.facebook.com/ryu.suzuki.super/" },
    { icon: FaLine, url: "https://line.me/ti/p/hkL8_yg15L" },
    { icon: FaWeixin, url: "https://wechat/" },
  ];

  return (
    <footer className="relative w-full text-gray-300 bg-gray-800 border-t-4 border-yellow-400 overflow-x-hidden pt-8 md:pt-16 md:pb-24 px-4">

      {/* Background text */}
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   font-extrabold text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[4vw]
                   select-none pointer-events-none text-center break-words"
        style={{
          color: "rgba(255, 204, 0, 0.15)",
          textShadow: "2px 2px 20px rgba(255,204,0,0.3)",
          lineHeight: 1.1,
        }}
      >
        ONE PERCENT 37X
      </h1>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-6 pb-10">

        {/* Links container */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-[220px] sm:max-w-none">

          {/* Contact links */}
          {contactLinks.map(({ icon: Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-yellow-400 text-yellow-500 md:cursor-none
                         bg-transparent shadow-[0_0_10px_rgba(255,204,0,0.5)]
                         transition transform hover:scale-110 hover:shadow-[0_0_20px_rgba(255,204,0,0.7)]"
            >
              <Icon size={18} className="md:w-5 md:h-5" />
            </a>
          ))}

          {/* Social links */}
          {socialLinks.map(({ icon: Icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-yellow-400 text-yellow-500 md:cursor-none
                         bg-transparent shadow-[0_0_10px_rgba(255,204,0,0.5)]
                         transition transform hover:scale-110 hover:shadow-[0_0_20px_rgba(255,204,0,0.7)]"
            >
              <Icon size={18} className="md:w-5 md:h-5" />
            </a>
          ))}

        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-xs sm:text-sm text-gray-400 md:mt-10 relative z-10">
        Built with ❤️ by Ryu • Powered by Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
