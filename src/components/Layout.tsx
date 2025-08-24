'use client'

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="md:hidden mt-2 flex flex-col space-y-2 bg-blue-500 p-4 rounded"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 container mx-auto p-4">{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} My Next.js App
      </footer>
    </div>
  );
}
