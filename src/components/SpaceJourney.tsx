"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { depthOpacity, sceneDepth, travelDistance } from "@/lib/space-journey";

// Seeded positions keep the star field stable across route changes and back-scroll.
const stars = Array.from({ length: 150 }, (_, index) => {
  const random = (offset: number) => {
    const value = Math.sin((index + 1) * 127.1 + offset * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };
  return { x: (random(1) - 0.5) * 11, y: (random(2) - 0.5) * 9, z: 0.3 + random(3) * 11, size: 0.5 + random(4) * 1.3 };
});

export default function SpaceJourney() {
  const pathname = usePathname();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const privatePage = pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create");

  useEffect(() => {
    const canvas = canvasRef.current;
    const backdrop = backdropRef.current;
    if (privatePage || !canvas || !backdrop) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portal = new window.Image();
    let width = 1;
    let height = 1;
    let density = 1;
    let frame = 0;
    let previousTime = 0;
    let disposed = false;
    let current = media.matches ? 0 : travelDistance(window.scrollY, window.innerHeight);

    function paint(distance: number) {
      if (!context || !canvas || !backdrop) return;
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.53;
      const centerY = height * 0.49;
      const extent = Math.max(width * 0.94, height * 0.9);

      // Draw far-to-near, with entry/exit fades so recycled gates never pop in.
      const gates = Array.from({ length: 12 }, (_, index) => sceneDepth(1.1 + index * 2, distance, 0.2, 24.2)).sort((a, b) => b - a);
      if (portal.complete && portal.naturalWidth) {
        for (const depth of gates) {
          const gateWidth = extent / depth;
          const gateHeight = gateWidth * portal.naturalHeight / portal.naturalWidth;
          context.globalAlpha = depthOpacity(depth, 0.2, 24.2) * Math.min(0.72, 0.17 + 0.62 / depth);
          context.drawImage(portal, centerX - gateWidth / 2, centerY - gateHeight / 2, gateWidth, gateHeight);
        }
      }

      const focal = Math.max(width, height) * 0.66;
      for (const star of stars.slice(0, width < 600 ? 85 : stars.length)) {
        const depth = sceneDepth(star.z, distance * 0.85);
        const x = centerX + star.x * focal / depth;
        const y = centerY + star.y * focal / depth;
        if (x < -5 || x > width + 5 || y < -5 || y > height + 5) continue;
        const size = Math.min(2.4, star.size / depth + 0.35);
        context.globalAlpha = depthOpacity(depth) * Math.min(0.75, 0.22 + 0.8 / depth);
        context.fillStyle = "#d1e8ff";
        context.beginPath();
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      // Atmosphere moves much more slowly than the portals and nearby particles.


      backdrop.style.transform = `scale(${1.08 + Math.min(distance, 20) * 0.006}) translate3d(${Math.sin(distance * 0.09) * -1.8}%, ${Math.sin(distance * 0.07) * 1.2}%, 0)`;
      canvas.dataset.distance = distance.toFixed(3);
      canvas.dataset.motion = media.matches ? "reduced" : "scroll";
      canvas.dataset.scene = "threshold";
    }

    function tick(time: number) {
      frame = 0;
      if (disposed || document.hidden) return;
      const target = media.matches ? 0 : travelDistance(window.scrollY, height);
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 75));
      if (Math.abs(target - current) < 0.001) current = target;
      paint(current);
      if (current !== target) frame = requestAnimationFrame(tick);
    }

    function schedule() {
      if (disposed || document.hidden || frame) return;
      previousTime = 0;
      frame = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      density = Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      current = media.matches ? 0 : travelDistance(window.scrollY, height);
      paint(current);
    }

    function motionChange() {
      cancelAnimationFrame(frame);
      frame = 0;
      current = media.matches ? 0 : travelDistance(window.scrollY, height);
      paint(current);
    }

    portal.onload = schedule;
    portal.src = "/images/space/threshold-frame.png";
    resize();
    const onScroll = () => { if (!media.matches) schedule(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      portal.onload = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", schedule);
      media.removeEventListener("change", motionChange);
    };
  }, [pathname, privatePage]);

  if (privatePage) return null;
  return <div className="space-journey" data-scene="threshold" aria-hidden="true">
    <div ref={backdropRef} className="space-atmosphere" />
    <canvas ref={canvasRef} className="space-portals" />
  </div>;
}
