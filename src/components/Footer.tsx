"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-gray-900 text-gray-300 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg">One Percent Journey</h3>
          <p>© 2025 Ryu. All rights reserved.</p>
        </div>

        {/* Middle - Navigation links */}
        <div className="text-center">
          <h3 className="font-bold mb-2">Navigate</h3>
          <div className="flex flex-col space-y-1">
            <a href="#travels" className="hover:text-yellow-400 transition">Travels</a>
            <a href="#skills" className="hover:text-yellow-400 transition">Skills</a>
            <a href="#projects" className="hover:text-yellow-400 transition">Projects</a>
            <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
          </div>
        </div>

        {/* Right - Social & Contact */}
        <div className="text-center md:text-right">
          <h3 className="font-bold mb-2">Contact</h3>
          <div className="flex justify-center md:justify-end gap-3 mb-2">
            <a href="mailto:ryu@example.com" className="hover:text-yellow-400 transition">Email</a>
            <a href="tel:+1234567890" className="hover:text-yellow-400 transition">Phone</a>
          </div>
          <div className="flex justify-center md:justify-end gap-3">
            <a href="https://github.com/yourusername" target="_blank" className="hover:text-yellow-400 transition"><FaGithub size={18} /></a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-yellow-400 transition"><FaLinkedin size={18} /></a>
            <a href="https://twitter.com/yourusername" target="_blank" className="hover:text-yellow-400 transition"><FaTwitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
