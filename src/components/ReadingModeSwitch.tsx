"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getReadingMode, READING_MODE_EVENT, setReadingMode, type ReadingMode } from "@/lib/reading-mode";

const copy = {
  en: { label: "Viewing mode", journey: "Journey", read: "Read", reduced: "Reading layout follows your reduced-motion setting" },
  ja: { label: "表示モード", journey: "旅", read: "読む", reduced: "動きを減らす設定に合わせて読書表示にしています" },
  zh: { label: "浏览模式", journey: "旅程", read: "阅读", reduced: "阅读布局遵循你的减少动态效果设置" },
};

export default function ReadingModeSwitch() {
  const { language } = useLanguage();
  const t = copy[language];
  const [mode, setMode] = useState<ReadingMode>("journey");
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => { const next = getReadingMode(); setMode(next); document.body.dataset.readingMode = next; };
    const preference = () => setReduced(media.matches);
    read(); preference();
    window.addEventListener(READING_MODE_EVENT, read);
    window.addEventListener("storage", read);
    media.addEventListener("change", preference);
    return () => { window.removeEventListener(READING_MODE_EVENT, read); window.removeEventListener("storage", read); media.removeEventListener("change", preference); };
  }, []);
  return <div className="reading-mode-switch" role="group" aria-label={t.label} title={reduced ? t.reduced : t.label}>
    <button type="button" disabled={reduced} aria-pressed={!reduced && mode === "journey"} onClick={() => setReadingMode("journey")}>{t.journey}</button>
    <button type="button" aria-pressed={reduced || mode === "read"} onClick={() => setReadingMode("read")}>{t.read}</button>
  </div>;
}
