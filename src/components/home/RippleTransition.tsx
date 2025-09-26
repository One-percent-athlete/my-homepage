"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type RippleProps = {
  x: number;
  y: number;
  onComplete: () => void;
  colorClass?: string;
  borderClass?: string;
  duration?: number;
};

export default function RippleTransition({
  x,
  y,
  onComplete,
  colorClass = "bg-yellow-300",
  borderClass = "border-white border-opacity-50 border-150",
  duration = 0.4,
}: RippleProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState(0);

  // Calculate ripple size to cover viewport
  useEffect(() => {
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    setSize(diagonal * 2);
  }, []);

  useEffect(() => {
    if (!circleRef.current || !counterRef.current || size === 0) return;

    const steps = duration * 50; // ~50ms interval for progress
    let currentStep = 0;

    // Animate progress counter
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) clearInterval(progressInterval);
    }, (duration * 1000) / steps);

    // Animate the ripple circle
    gsap.fromTo(
      circleRef.current,
      {
        width: 0,
        height: 0,
        x: x,
        y: y,
        borderRadius: "50%",
        opacity: 1,
        filter: "drop-shadow(0 0 0px yellow)",
      },
      {
        width: size,
        height: size,
        x: x - size / 2,
        y: y - size / 2,
        borderRadius: "50%",
        opacity: 1,
        duration: duration * 2.5, // faster than original
        filter: "drop-shadow(0 0 60px yellow)",
        onComplete: () => {
          clearInterval(progressInterval);
          setProgress(100);

          // Pop effect for 100% counter
          gsap.fromTo(
            counterRef.current,
            { scale: 0.8 },
            { scale: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }
          );

          setTimeout(onComplete, 10); // show effect a bit longer before page transition
        },
      }
    );
  }, [x, y, size, duration, onComplete]);

  return (
    <>
      {/* Expanding ripple */}
      <div
        ref={circleRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none ${colorClass} ${borderClass} border-50`}
      />

      {/* Counter always centered */}
      <div
        ref={counterRef}
        className="fixed top-1/2 left-1/2 z-[10000] transform -translate-x-1/2 -translate-y-1/2 font-bold text-6xl text-white pointer-events-none"
      >
        {progress}%
      </div>

      {/* Solid overlay after ripple */}
      {progress >= 100 && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none ${colorClass} flex items-center justify-center`}
        >
        </div>
      )}
    </>
  );
}
