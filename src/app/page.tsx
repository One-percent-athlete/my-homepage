// app/page.tsx (Updated)
import React from 'react';
import HeroSection from "@/components/home/HeroSection";
import ButtonSection from "@/components/home/ButtonSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // ... (your existing metadata)
};

export default function Home() {
  return (
    <main>
      <HeroSection>
        <ButtonSection />
      </HeroSection>
    </main>
  );
}