"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { depthOpacity, sceneDepth, travelDistance, homeGateProjection, publishJourneyFrame, isTunnelRoute } from "@/lib/space-journey";

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
    let extraDistance = 0;
    let touchY: number | null = null;
    let current = media.matches ? 0 : travelDistance(window.scrollY, window.innerHeight);

    function paint(distance: number) {
      if (!context || !canvas || !backdrop) return;
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const extent = Math.max(width * 0.94, height * 0.9);
      const journeyFrame = { distance, width, height, reduced: media.matches };

      // Draw far-to-near, with entry/exit fades so recycled gates never pop in.
      const gates = Array.from({ length: isTunnelRoute(pathname) ? 18 : 12 }, (_, index) => ({ index, depth: sceneDepth(1.1 + index * 2, distance, 0.2, 24.2) })).sort((a, b) => b.depth - a.depth);
      if (portal.complete && portal.naturalWidth) {
        for (const { index, depth } of gates) {
          if (isTunnelRoute(pathname) && !media.matches) {
            const gate = homeGateProjection(index, journeyFrame);
            if (!gate.opacity) continue;
            context.globalAlpha = gate.opacity * Math.min(0.9, 0.22 + 0.8 / Math.max(0.2, gate.depth));
            context.drawImage(portal, gate.centerX - gate.width / 2, gate.centerY - gate.height / 2, gate.width, gate.height);
            continue;
          }
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
      publishJourneyFrame(journeyFrame);
    }

    function tick(time: number) {
      frame = 0;
      if (disposed || document.hidden) return;
      const target = media.matches ? 0 : travelDistance(window.scrollY, height) + extraDistance;
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
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      density = Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      current = media.matches ? 0 : travelDistance(window.scrollY, height) + extraDistance;
      paint(current);
    }

    function motionChange() {
      cancelAnimationFrame(frame);
      frame = 0;
      extraDistance = 0;
      current = media.matches ? 0 : travelDistance(window.scrollY, height);
      paint(current);
    }

    // Native scroll handles the page. Only unused input at the bottom advances
    // the camera, so there is no scroll trap or second animation inside menus.
    function advanceAtBottom(delta: number, event: Event) {
      if (isTunnelRoute(pathname) || media.matches || delta <= 0 || document.hidden) return;
      const root = document.documentElement;
      const bottom = Math.max(0, root.scrollHeight - window.innerHeight);
      if (window.scrollY < bottom - 1 || document.querySelector('[aria-modal="true"]')) return;
      if (getComputedStyle(document.body).overflowY === "hidden") return;
      for (const node of event.composedPath()) {
        if (!(node instanceof Element) || node === root || node === document.body) continue;
        if (node.matches('input,textarea,select,[contenteditable="true"]')) return;
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return;
      }
      extraDistance += travelDistance(delta, height);
      schedule();
    }

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
      advanceAtBottom(event.deltaY * unit, event);
    }
    function onTouchStart(event: TouchEvent) { touchY = event.touches.length === 1 ? event.touches[0].clientY : null; }
    function onTouchMove(event: TouchEvent) {
      if (event.touches.length !== 1) { touchY = null; return; }
      const next = event.touches[0].clientY;
      if (touchY !== null) advanceAtBottom(touchY - next, event);
      touchY = next;
    }
    function onTouchEnd() { touchY = null; }
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof Element && event.target.closest('a,button,input,textarea,select,[contenteditable="true"]')) return;
      const delta = event.key === "ArrowDown" ? 40 : event.key === "PageDown" || event.key === " " ? height * 0.85 : 0;
      advanceAtBottom(delta, event);
    }

    portal.onload = schedule;
    portal.src = "/images/space/threshold-frame.png";
    resize();
    const onScroll = () => { if (!media.matches) schedule(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      portal.onload = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
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
