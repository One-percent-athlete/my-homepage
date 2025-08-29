"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaLine, FaWeixin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full text-gray-300 bg-gray-800 border-t-4 border-yellow-400 overflow-hidden pt-8 md:pt-16 md:pb-24 px-6">

      {/* Background text */}
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-[9vw] md:text-[6vw] select-none pointer-events-none text-center md:whitespace-nowrap whitespace-normal"
        style={{
          color: "rgba(255, 204, 0, 0.15)",
          textShadow: "2px 2px 20px rgba(255,204,0,0.3)",
          lineHeight: 1.1,
        }}
      >
        ONE PERCENT JOURNEY
      </h1>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 pb-10">
        
        {/* Navigation links */}
        <div className="flex flex-row gap-6 text-sm flex-wrap justify-center md:justify-start">
          {["Skills", "Projects", "Travels", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="px-3 py-2 rounded-md border border-yellow-400 text-yellow-400
                        scale-110 shadow-[0_0_15px_rgba(255,204,0,0.5)]
                        hover:border-yellow-400 hover:text-yellow-300 cursor-none
                        transition transform md:hover:scale-125 md:hover:shadow-[0_0_15px_rgba(255,204,0,0.6)]"
            >
              {label}
            </a>
          ))}
          <Link
            href="/gallery"
            className="px-3 py-2 rounded-md border border-yellow-400 text-yellow-400
                       scale-110 shadow-[0_0_15px_rgba(255,204,0,0.5)]
                       hover:border-yellow-400 hover:text-yellow-300 cursor-none
                       transition transform md:hover:scale-125 md:hover:shadow-[0_0_15px_rgba(255,204,0,0.6)]"
          >
            Gallery
          </Link>
        </div>

        {/* Contact & Social Icons */}
        <div className="flex flex-wrap md:flex-row items-center gap-4 md:gap-6 justify-center md:justify-end mt-4 md:mt-0">

          {/* Email & Phone */}
          <div className="flex gap-4">
            {[ 
              { icon: FaEnvelope, href: "mailto:one.percent.athlete@gmail.com" },
              { icon: FaPhoneAlt, href: "tel:+8107045618976" },
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="p-4 rounded-full border border-yellow-400 text-yellow-500
                           bg-transparent shadow-[0_0_15px_rgba(255,204,0,0.5)] cursor-none
                           transition transform hover:scale-125 hover:shadow-[0_0_25px_rgba(255,204,0,0.7)]
                           md:p-3 md:text-yellow-400 md:hover:scale-110 md:hover:shadow-[0_0_20px_rgba(255,204,0,0.7)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-3 md:mt-0 flex-wrap justify-center">
            {[ 
              { icon: FaGithub, url: "https://github.com/One-percent-athlete" },
              { icon: FaLinkedin, url: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
              { icon: FaInstagram, url: "https://www.instagram.com/ryu.free.spirit/" },
              { icon: FaFacebook, url: "https://www.facebook.com/ryu.suzuki.super/" },
              { icon: FaLine, url: "https://line.me/ti/p/hkL8_yg15L" },
              { icon: FaWeixin, url: "https://wechat/" },
            ].map(({ icon: Icon, url }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                className="p-4 rounded-full border border-yellow-400 text-yellow-500
                          bg-transparent shadow-[0_0_15px_rgba(255,204,0,0.5)] cursor-none
                          transition transform hover:scale-125 hover:shadow-[0_0_25px_rgba(255,204,0,0.7)]
                          md:p-3 md:text-yellow-400 md:hover:scale-110 md:hover:shadow-[0_0_20px_rgba(255,204,0,0.7)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="md:mt-10 text-center text-xs text-gray-400 relative z-10">
        Built with ❤️ by Ryu • Powered by Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
