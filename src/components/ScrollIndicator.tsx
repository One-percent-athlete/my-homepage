"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "#top", label: "Top" },
  { href: "#travels", label: "Travels" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const ScrollIndicator: FC = () => {
  const [active, setActive] = useState<string>("#top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < 100) {
        setActive("#top");
        return;
      }

      navItems.forEach((item) => {
        if (item.href === "#top") return;
        const section = document.querySelector(item.href) as HTMLElement;
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollTop >= offsetTop - 100 && scrollTop < offsetBottom - 100) {
            setActive(item.href);
          }
        }
      });
    };

    handleScroll(); // initial check

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden md:flex fixed top-6 right-6 flex-col items-end space-y-4 z-50">
      {navItems.map((item, i) => {
        const isActive = active === item.href;

        return (
          <motion.a
            key={i}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              if (item.href === "#top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                document
                  .querySelector(item.href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            className="relative group flex items-center justify-center"
          >
            {/* Dot */}
            <motion.span
              animate={{
                scale: isActive ? [1.3, 1.6, 1.3] : 1,
                boxShadow: isActive
                  ? [
                      "0 0 10px rgba(250,204,21,0.6), 0 0 20px rgba(250,204,21,0.3)",
                      "0 0 15px rgba(250,204,21,0.8), 0 0 30px rgba(250,204,21,0.4)",
                      "0 0 10px rgba(250,204,21,0.6), 0 0 20px rgba(250,204,21,0.3)",
                    ]
                  : "0 0 4px rgba(0,0,0,0.2)",
                background: isActive
                  ? "radial-gradient(circle at 30% 30%, #facc15, #eab308)"
                  : "radial-gradient(circle at 30% 30%, #ffffff, #f3f4f6)",
              }}
              transition={{
                duration: 1.2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="w-5 h-5 rounded-full border-2 border-yellow-400"
            ></motion.span>

            {/* Tooltip */}
            <span className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap
              bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-white">
              {item.label}
              <span className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-yellow-400"></span>
            </span>
          </motion.a>
        );
      })}
    </div>
  );
};

export default ScrollIndicator;
