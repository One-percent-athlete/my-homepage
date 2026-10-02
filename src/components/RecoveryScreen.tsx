"use client";

import Link from "next/link";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";

const copy = {
  en: { missing: "This world is off the map.", missingText: "We couldn’t find that page. Choose another world or return to base.", error: "The signal was interrupted.", errorText: "This page couldn’t load. You can try again or return to base.", retry: "Try again", home: "Return to Home" },
  ja: { missing: "この世界はマップの外です。", missingText: "ページが見つかりません。別の世界を選ぶか、ホームへ戻ってください。", error: "通信が途切れました。", errorText: "ページを読み込めませんでした。再試行するか、ホームへ戻ってください。", retry: "再試行", home: "ホームへ戻る" },
  zh: { missing: "这个世界不在地图上。", missingText: "找不到此页面。请选择其他世界，或返回首页。", error: "讯号中断了。", errorText: "此页面暂时无法加载。请重试或返回首页。", retry: "重试", home: "返回首页" },
};

export default function RecoveryScreen({ kind, retry, showMap = true }: { showMap?: boolean; kind: "missing" | "error"; retry?: () => void }) {
  const { language } = useLanguage();
  const t = copy[language];
  return <main className="page-recovery" data-page-state={kind === "missing" ? "not-found" : "error"}>
    {showMap && <FloatingButtons />}<span className="recovery-code">{kind === "missing" ? "404" : "SIGNAL LOST"}</span>
    <h1>{kind === "missing" ? t.missing : t.error}</h1><p>{kind === "missing" ? t.missingText : t.errorText}</p>
    <div>{retry && <button type="button" onClick={retry}>{t.retry}</button>}<Link href="/">{t.home}</Link></div>
  </main>;
}
