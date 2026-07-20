"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "ja" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("ryu-language");
    if (saved === "en" || saved === "ja" || saved === "zh") {
      setLanguage(saved);
      document.documentElement.lang = saved === "ja" ? "ja" : saved === "zh" ? "zh-CN" : "en";
    }
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("ryu-language", next);
    document.documentElement.lang = next === "ja" ? "ja" : next === "zh" ? "zh-CN" : "en";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
