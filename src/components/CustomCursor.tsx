"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let circleX = 0;
    let circleY = 0;

    const updateCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      // Dot follows instantly, center it
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
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none bg-yellow-400 shadow-lg"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border-2 border-yellow-400 pointer-events-none"
      />
    </>
  );
}
