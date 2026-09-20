"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sectionFlight } from "@/lib/section-flight";

const selector = ".mission-site > section, .web-world > section, .travel-world > section, .travel-story-stack > section";

export default function FloatingSections() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let dirty = true;
    let sections: { element: HTMLElement; top: number; height: number }[] = [];

    function measure() {
      sections = Array.from(document.querySelectorAll<HTMLElement>(selector)).map(element => {
        element.classList.add("flight-section");
        // Layout coordinates, independent of the animated transform.
        let top = 0;
        let parent: HTMLElement | null = element;
        while (parent) { top += parent.offsetTop; parent = parent.offsetParent as HTMLElement | null; }
        return { element, top, height: element.offsetHeight };
      });
      dirty = false;
    }

    function paint() {
      frame = 0;
      if (disposed || document.hidden) return;
      if (dirty) measure();
      const viewport = window.innerHeight;
      sections.forEach(({ element, top, height }, index) => {
        if (media.matches) {
          element.style.removeProperty("--flight-transform");
          element.style.removeProperty("--flight-opacity");
          element.classList.remove("flight-in-view");
          return;
        }
        const position = top - Math.max(0, window.scrollY);
        const motion = sectionFlight(position, height, viewport, window.innerWidth < 700);
        const side = index % 2 ? 1 : -1;
        element.style.setProperty("--flight-transform", `perspective(1400px) translate3d(${motion.x * side}px,${motion.y}px,${motion.z}px) rotateX(${motion.rotate}deg)`);
        element.style.setProperty("--flight-opacity", String(motion.opacity));
        element.classList.toggle("flight-in-view", position < viewport * 1.2 && position + height > -viewport * 0.2);
      });
    }

    function schedule() {
      if (!disposed && !frame) frame = requestAnimationFrame(paint);
    }
    function resize() { dirty = true; schedule(); }
    const observer = new ResizeObserver(resize);
    measure();
    sections.forEach(({ element }) => observer.observe(element));
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", schedule);
      media.removeEventListener("change", schedule);
      sections.forEach(({ element }) => {
        element.classList.remove("flight-section", "flight-in-view");
        element.style.removeProperty("--flight-transform");
        element.style.removeProperty("--flight-opacity");
      });
    };
  }, [pathname]);

  return null;
}
