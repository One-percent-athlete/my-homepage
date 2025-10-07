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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-[9vw] md:text-[6vw] select-none pointer-events-none text-center md:whitespace-nowrap whitespace-normal"
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
              key={label}
              href={`#${label.toLowerCase()}`}
              className="px-3 py-2 rounded-md border border-yellow-400 text-yellow-400
                        scale-110 shadow-[0_0_15px_rgba(255,204,0,0.5)]
                        hover:border-yellow-400 hover:text-yellow-300
                        transition transform md:hover:scale-125 md:hover:shadow-[0_0_15px_rgba(255,204,0,0.6)]"
            >
              <Icon size={18} className="md:w-5 md:h-5" />
            </a>
          ))}
          <Link
            href="/gallery"
            className="px-3 py-2 rounded-md border border-yellow-400 text-yellow-400
                      scale-110 shadow-[0_0_15px_rgba(255,204,0,0.5)]
                      hover:border-yellow-400 hover:text-yellow-300
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
                          bg-transparent shadow-[0_0_15px_rgba(255,204,0,0.5)]
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
                          bg-transparent shadow-[0_0_15px_rgba(255,204,0,0.5)]
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
        Built with ❤️ by One Percent • Powered by Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
