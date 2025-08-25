"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaClipboard,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [copied, setCopied] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
  };

  const personalContacts = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "ryu@example.com",
      link: "mailto:ryu@example.com",
      copyable: true,
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: "+81 90-xxxx-xxxx",
      link: "tel:+8190xxxxxxx",
      copyable: true,
    },
  ];

  const socialContacts = [
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/ryu",
      link: "https://github.com/ryu",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/ryu",
      link: "https://linkedin.com/in/ryu",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      value: "@ryu",
      link: "https://twitter.com/ryu",
    },
  ];

  const qrCodes = [
    { label: "Email QR", src: "/qr-email.png" },
    { label: "LinkedIn QR", src: "/qr-linkedin.png" },
  ];

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6 text-center overflow-hidden text-white"
    >
      <Toaster position="top-right" />

      {/* Background floating circles */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-yellow-400 rounded-full opacity-20 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-10 animate-pulse blur-3xl"></div>

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6"
      >
        Get in Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg mb-12 text-gray-300 max-w-xl mx-auto"
      >
        Open for freelance projects, collaborations, or just a chat about your
        next big idea. Reach me via any method below.
      </motion.p>

      {/* Personal Contacts */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
      >
        {personalContacts.map((contact, index) => (
          <motion.li
            key={index}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 0 25px rgba(255, 255, 0, 0.4)",
            }}
            className="flex flex-col items-center bg-gray-800 hover:bg-gray-700 rounded-3xl p-6 shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <span
              className="text-4xl mb-4 text-yellow-400"
              aria-hidden="true"
            >
              {contact.icon}
            </span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <div className="flex items-center gap-2">
              <a
                href={contact.link}
                className="text-gray-300 hover:text-yellow-400 transition-colors break-words"
                aria-label={`Contact via ${contact.label}`}
              >
                {contact.value}
              </a>
              {contact.copyable && (
                <button
                  onClick={() => handleCopy(contact.value, contact.label)}
                  className="text-gray-400 hover:text-yellow-400"
                  aria-label={`Copy ${contact.label}`}
                >
                  <FaClipboard />
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Social Contacts */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
      >
        {socialContacts.map((contact, index) => (
          <motion.li
            key={index}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 0 25px rgba(255, 255, 0, 0.4)",
            }}
            className="flex flex-col items-center bg-gray-800 hover:bg-gray-700 rounded-3xl p-6 shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <span
              className="text-4xl mb-4 text-yellow-400"
              aria-hidden="true"
            >
              {contact.icon}
            </span>
            <h3 className="font-bold text-xl mb-2">{contact.label}</h3>
            <a
              href={contact.link}
              className="text-gray-300 hover:text-yellow-400 transition-colors break-words"
              aria-label={`Visit ${contact.label}`}
              target="_blank"
              rel="noopener noreferrer"
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
        className="flex flex-wrap justify-center gap-10 overflow-x-auto py-4"
      >
        {qrCodes.map((qr, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="flex flex-col items-center bg-gray-800 rounded-3xl p-4 shadow-2xl cursor-pointer relative"
          >

            <Image src={qr.src} alt={qr.label} width={128} height={128} />
            <span className="text-gray-300">{qr.label}</span>
            <span className="absolute -top-6 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Scan me!
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
