"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

type RippleProps = {
  x: number;
  y: number;
  onComplete: () => void;
  colorClass?: string;
  duration?: number;
};

export default function RippleTransition({
  x,
  y,
  onComplete,
  colorClass = "bg-gradient-to-br from-yellow-400 to-orange-500",
  duration = 0.6,
}: RippleProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState(0);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    setSize(diagonal * 2);
  }, []);

  useEffect(() => {
    // On mobile, use simpler transition without ripple
    if (isMobile) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Desktop ripple effect
    if (!circleRef.current || !counterRef.current || size === 0) return;

    const steps = duration * 60;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) clearInterval(progressInterval);
    }, (duration * 1000) / steps);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(progressInterval);
        setProgress(100);
        
        gsap.to(counterRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setTimeout(onComplete, 100);
          }
        });
      }
    });

    tl.fromTo(circleRef.current,
      {
        width: 0,
        height: 0,
        x: x,
        y: y,
        borderRadius: "50%",
        opacity: 0.8,
        rotation: 0,
      },
      {
        width: size,
        height: size,
        x: x - size / 2,
        y: y - size / 2,
        borderRadius: "50%",
        opacity: 1,
        rotation: 180,
        duration: duration * 1.5,
        ease: "power2.inOut",
      }
    ).to(circleRef.current, {
      opacity: 0.9,
      duration: duration * 0.5,
      ease: "power1.in",
    }, "-=0.2");

    gsap.fromTo(counterRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

  }, [x, y, size, duration, onComplete, isMobile]);

  // On mobile, show simple loading screen
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-xl font-bold">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced ripple with gradient */}
      <div
        ref={circleRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none ${colorClass} mix-blend-screen opacity-80`}
        style={{
          filter: "blur(10px)",
        }}
      />

      {/* Enhanced counter */}
      <div
        ref={counterRef}
        className="fixed top-1/2 left-1/2 z-[10000] transform -translate-x-1/2 -translate-y-1/2 font-black text-8xl text-white pointer-events-none text-center drop-shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #FFFFFF, #FFD700, #FFFFFF)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          animation: "shimmer 1s linear infinite",
        }}
      >
        {progress}%
        <div className="text-sm font-normal mt-2 opacity-70">
          Loading...
        </div>
      </div>

      {/* Background overlay */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none bg-black opacity-0"
        style={{
          animation: "fadeIn 0.5s forwards",
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          to { opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
}