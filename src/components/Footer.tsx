"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaLine, FaWeixin, FaTimes, FaBars } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
        {/* Left */}
        <div className="text-center md:text-left space-y-2">
          <h3 className="font-extrabold text-2xl text-yellow-400 tracking-wide">
            One Percent Journey
          </h3>
          <p className="text-sm text-gray-400">
            © 2025 All rights reserved.
          </p>
        </div>

        {/* Middle - Navigation */}
        <div className="text-center">
          <h3 className="font-bold text-lg mb-3 text-yellow-400 uppercase tracking-wide">
            Navigate
          </h3>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#travels" className="hover:text-yellow-300 hover:translate-x-1 transition transform duration-300">
              Travels
            </a>
            <a href="#skills" className="hover:text-yellow-300 hover:translate-x-1 transition transform duration-300">
              Skills
            </a>
            <a href="#projects" className="hover:text-yellow-300 hover:translate-x-1 transition transform duration-300">
              Projects
            </a>
            <a href="#contact" className="hover:text-yellow-300 hover:translate-x-1 transition transform duration-300">
              Contact
            </a>
          </div>
        </div>

        {/* Right - Contact & Social */}
        <div className="text-center md:text-right space-y-3">
          <h3 className="font-bold text-lg text-yellow-400 uppercase tracking-wide">
            Contact
          </h3>
          <div className="flex justify-center md:justify-end gap-6 text-sm">
            <a href="mailto:one.percent.athlete@gmail.com" className="hover:text-yellow-300 transition">Email</a>
            <a href="tel:+8107045618976" className="hover:text-yellow-300 transition">Phone</a>
          </div>
          <div className="flex justify-center md:justify-end gap-5 mt-3">
            <a href="https://github.com/One-percent-athlete" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/ryu-suzuki-7613a8299/" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/ryu.free.spirit/" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/ryu.suzuki.super/" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaFacebook size={18} />
            </a>
            <a href="https://line.me/ti/p/hkL8_yg15L" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaLine size={18} />
            </a>
            <a href="https://wechat/" target="_blank" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
              <FaWeixin size={18} />
            </a>            
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Built with ❤️ by Ryu • Powered by Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
