"use client";

import { useState, useEffect } from "react";
import TravelContent from "@/components/travel/TravelContent";

export default function TravelPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <TravelContent scrollY={scrollY} />;
}