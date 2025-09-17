"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Define a state to hold the current cursor color classes
  const [cursorColor, setCursorColor] = useState('bg-yellow-400 border-yellow-400');
  
  // Use the usePathname hook to get the current route
  const pathname = usePathname();

  // Memoize the colorMap object to prevent it from being recreated on every render
  const colorMap = useMemo(() => ({
    '/web': 'bg-teal-400 border-teal-400',
    '/travel': 'bg-pink-400 border-pink-400',
    '/ski': 'bg-blue-400 border-blue-400',
    '/blog': 'bg-red-500 border-red-500',
    default: 'bg-yellow-400 border-yellow-400',
  }), []);

  useEffect(() => {
    // Determine the new color classes based on the current pathname
    const newColor = colorMap[pathname] || colorMap.default;
    setCursorColor(newColor);
    
    // The rest of your cursor animation logic from the original code
    let circleX = 0;
    let circleY = 0;

    const updateCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      if (dotRef.current) {
        const dotSize = dotRef.current.offsetWidth;
        dotRef.current.style.transform = `translate3d(${x - dotSize / 2}px, ${y - dotSize / 2}px, 0)`;
      }
    };

    const animateCircle = () => {
      const { x: mouseX, y: mouseY } = mousePos.current;

      circleX += (mouseX - circleX) * 0.2;
      circleY += (mouseY - circleY) * 0.2;

      if (circleRef.current) {
        const circleSize = circleRef.current.offsetWidth;
        circleRef.current.style.transform = `translate3d(${circleX - circleSize / 2}px, ${circleY - circleSize / 2}px, 0)`;
      }

      requestAnimationFrame(animateCircle);
    };

    window.addEventListener("mousemove", updateCursor);
    animateCircle();

    return () => window.removeEventListener("mousemove", updateCursor);
  }, [pathname, colorMap]); // The dependencies are now stable

  return (
    <>
      <div
        ref={dotRef}
        // Dynamically apply the color class from state
        className={`fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none shadow-lg ${cursorColor.split(' ')[0]}`}
      />
      <div
        ref={circleRef}
        // Dynamically apply the color class from state
        className={`fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border-2 pointer-events-none ${cursorColor.split(' ')[1]}`}
      />
    </>
  );
}