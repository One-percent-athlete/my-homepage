"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function LoadingScreen() {
  const { language } = useLanguage();
  const copy = { en: ["Loading your next world", "Preparing the view…"], ja: ["次の世界を読み込み中", "画面を準備しています…"], zh: ["正在加载下一个世界", "正在准备画面…"] }[language];
  return <div className="page-loading" data-page-state="loading" role="status" aria-live="polite"><div className="loading-orbit" aria-hidden="true" /><p>{copy[0]}</p><small>{copy[1]}</small></div>;
}
