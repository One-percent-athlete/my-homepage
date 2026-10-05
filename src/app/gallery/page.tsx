"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/app/context/LanguageContext";
import type { GalleryBlogImage } from "@/lib/gallery-images";
import { copy } from "./gallery-copy";
import styles from "./Gallery.module.css";

const files = ["0", "1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
const messages = {
  en: { journal: "From the journal", read: "Read the story →", loading: "Loading blog photos…", more: "Load more photos", error: "Blog photos could not be loaded. Your archive is still available.", retry: "Try again", previous: "Previous image", next: "Next image" },
  ja: { journal: "ジャーナルから", read: "記事を読む →", loading: "ブログの写真を読み込み中…", more: "写真をもっと見る", error: "ブログの写真を読み込めませんでした。アーカイブは引き続きご覧いただけます。", retry: "再試行", previous: "前の画像", next: "次の画像" },
  zh: { journal: "来自日志", read: "阅读故事 →", loading: "正在加载博客照片…", more: "加载更多照片", error: "无法加载博客照片。原有相册仍可浏览。", retry: "重试", previous: "上一张", next: "下一张" },
};

function thumbnailSizes(index: number) {
  const fraction = [7, 5, 4, 7, 5][index % 5] / 12;
  const gap = 12 * (1 - fraction) + 2;
  return `(max-width:760px) calc(100vw - 34px), (max-width:1500px) calc(${88 * fraction}vw - ${gap}px), calc(${100 * fraction}vw - ${180 * fraction + gap}px)`;
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const t = copy[language];
  const m = messages[language];
  const [selected, setSelected] = useState<number | null>(null);
  const [blogImages, setBlogImages] = useState<GalleryBlogImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [requestedOffset, setRequestedOffset] = useState(0);
  const frames = [
    ...files.map((file, index) => ({ id: `archive-${file}`, title: t.items[index][0], note: t.items[index][1], thumbnail: `/gallery/thumbnails/${file}.webp`, full: `/gallery/lightbox/${file}.webp`, slug: null as string | null })),
    ...blogImages.map(photo => ({ ...photo, note: m.journal })),
  ];
  const active = selected === null ? null : frames[selected];

  const loadPhotos = useCallback(async (offset: number, signal?: AbortSignal) => {
    setLoading(true); setError(false); setRequestedOffset(offset);
    try {
      const response = await fetch(`/api/gallery?offset=${offset}`, { cache: "no-store", signal });
      if (!response.ok) throw new Error("Gallery unavailable");
      const data: { images: GalleryBlogImage[]; nextOffset: number | null } = await response.json();
      if (signal?.aborted) return;
      setBlogImages(previous => offset === 0 ? data.images : [...previous, ...data.images.filter(image => !previous.some(old => old.id === image.id))]);
      setNextOffset(data.nextOffset);
    } catch {
      if (!signal?.aborted) setError(true);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadPhotos(0, controller.signal);
    return () => controller.abort();
  }, [loadPhotos]);

  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") setSelected(value => value === null ? null : (value - 1 + frames.length) % frames.length);
      if (event.key === "ArrowRight") setSelected(value => value === null ? null : (value + 1) % frames.length);
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [selected, frames.length]);

  return <main className={styles.archive}>
    <FloatingButtons />
    <header className={styles.hero}><p><Camera size={15} /> {t.world}</p><h1>{t.line1}<br /><em>{t.line2}</em></h1><span>{t.hint}</span></header>
    <section className={styles.grid}>
      {frames.map((frame, index) => <button key={frame.id} className={styles.frame} onClick={() => setSelected(index)}>
        <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
        <div className={styles.image}><Image src={frame.thumbnail} alt={frame.title} fill sizes={thumbnailSizes(index)} priority={index === 0} /></div>
        <div className={styles.caption}><div><h2>{frame.title}</h2><p>{frame.note}</p></div><Maximize2 size={17} /></div>
      </button>)}
    </section>
    <div className={styles.status}>
      {loading && <p role="status">{m.loading}</p>}
      {error && <><p role="alert">{m.error}</p><button onClick={() => void loadPhotos(requestedOffset)} disabled={loading}>{m.retry}</button></>}
      {!error && nextOffset !== null && <button onClick={() => void loadPhotos(nextOffset)} disabled={loading}>{m.more}</button>}
    </div>
    {active && selected !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setSelected(null)}>
      <button className={styles.close} onClick={() => setSelected(null)} aria-label={t.close}><X /></button>
      <button className={styles.previous} onClick={event => { event.stopPropagation(); setSelected((selected - 1 + frames.length) % frames.length); }} aria-label={m.previous}><ChevronLeft /></button>
      <div className={styles.lightboxImage} onClick={event => event.stopPropagation()}>
        <Image key={active.id} src={active.full} alt={active.title} fill sizes="(max-width:760px) calc(100vw - 20px), (max-width:1222px) 90vw, 1100px" loading="eager" />
        <div><span>{t.frame} {String(selected + 1).padStart(2, "0")}</span><h2>{active.title}</h2><p>{active.note}</p>{active.slug && <Link href={`/blog/${active.slug}`}>{m.read}</Link>}</div>
      </div>
      <button className={styles.next} onClick={event => { event.stopPropagation(); setSelected((selected + 1) % frames.length); }} aria-label={m.next}><ChevronRight /></button>
    </div>}
  </main>;
}
