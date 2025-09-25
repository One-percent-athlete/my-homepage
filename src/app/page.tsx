// app/page.tsx (Updated)
import React from 'react';
import HeroSection from "@/components/home/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryu - Web App Developer, Ski Instructor & Traveler",
  description: "Hi, I’m Ryu — Web App Developer, Ski Instructor, and World Traveler. Explore my multilingual website in English, Japanese, or Chinese.",
  metadataBase: new URL("https://www.37x.jp/"),
  openGraph: {
    title: "Ryu - Web App Developer, Ski Instructor & Traveler",
    description: "Explore my multilingual website in English, Japanese, or Chinese.",
    url: "https://www.37x.jp/",
    siteName: "Ryu Portfolio",
    images: [{ url: "/images/astro.jpg", width: 1200, height: 630, alt: "Ryu - Web App Developer, Ski Instructor & Traveler" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryu - Web App Developer, Ski Instructor & Traveler",
    description: "Explore my multilingual website in English, Japanese, or Chinese.",
    images: ["/images/astro.jpg"],
    creator: "@yourtwitterhandle",
  },
};


export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}