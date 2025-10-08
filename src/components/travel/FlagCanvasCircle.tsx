"use client";

import { useEffect, useRef } from "react";

// Full list of 63 country codes
const countries = [
  "ar", // Argentina
  "au", // Australia
  "br", // Brazil
  "ca", // Canada
  "cl", // Chile
  "cn", // China
  "co", // Colombia
  "cr", // Costa Rica
  "fr", // France
  "de", // Germany
  "gr", // Greece
  "is", // Iceland
  "in", // India
  "it", // Italy
  "jp", // Japan
  "ke", // Kenya
  "mx", // Mexico
  "nl", // Netherlands
  "nz", // New Zealand
  "pt", // Portugal
  "es", // Spain
  "ch", // Switzerland
  "th", // Thailand
  "tr", // Turkey
  "gb", // United Kingdom
  "us", // United States
  "sg", // Singapore
  "za", // South Africa
  "tw", // Taiwan
  "ua", // Ukraine (unique & recognizable)
  "eg", // Egypt
  "my"  // Malaysia
];


interface FlagCanvasCircleProps {
  scrollY: number;
}

export default function FlagCanvasCircle({ scrollY }: FlagCanvasCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const radiusBase = 250;
    let rotation = 0;
    let animationFrameId: number;

    // Load all flag images
    countries.forEach((code) => {
      const img = new Image();
      img.src = `https://flagcdn.com/w40/${code}.png`; // 40px flags
      img.onload = () => {
        images.push(img);
      };
    });

    const render = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (images.length === countries.length) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = radiusBase + scrollY * 0.5;
        const opacity = Math.max(1 - scrollY / 2000, 0);

        ctx.globalAlpha = opacity;

        images.forEach((img, i) => {
          const angle = (i / images.length) * 2 * Math.PI + rotation;
          const x = centerX + Math.cos(angle) * radius - 10; // 10 = half flag width
          const y = centerY + Math.sin(angle) * radius - 10; // 10 = half flag height
          ctx.drawImage(img, x, y, 40, 40);
        });

        rotation += 0.002; // rotation speed
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
    />
  );
}
