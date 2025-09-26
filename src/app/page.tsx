"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Detect if device has a fine pointer (mouse/trackpad)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    setShowCursor(isDesktop);
  }, []);

  return (
    <main>
      {/* Only show on desktop */}
      {showCursor && <CustomCursor />}
      <HeroSection />
    </main>
  );
}
