"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main > header",
  "main > section",
  "main > footer",
  ".mission-site > header",
  ".mission-site > section",
  ".mission-site > footer",
  ".web-world > section",
  ".web-world > footer",
  ".travel-world > section",
  ".travel-world > div:not(.travel-story-stack) > section",
  ".ski-world > header",
  ".ski-world main > section",
  ".journal-world > header",
  ".journal-world > section",
  ".journal-world > main",
  ".journal-world > footer",
  ".between-world > section",
  ".contact-world",
].join(",");

const DEPTH_SELECTOR = [
  ".mission-card",
  ".build-console",
  ".capability-console",
  ".route-selector",
  ".ski-run-console",
  ".journal-grid article",
  ".protocol-console",
  ".artifact-lab",
  ".contact-world li:has(a)",
  ".travel-world [class~=\"rounded-3xl\"]",
  ".ski-world [class~=\"rounded-3xl\"]",
  ".admin-actions a",
  "button:has(img)",
].join(",");

function worldFor(pathname: string) {
  if (pathname.startsWith("/web")) return "build";
  if (pathname.startsWith("/travel")) return "travel";
  if (pathname.startsWith("/ski")) return "summit";
  if (pathname.startsWith("/between")) return "between";
  if (pathname.startsWith("/gallery")) return "archive";
  if (pathname.startsWith("/blog")) return "journal";
  if (pathname.startsWith("/contact")) return "contact";
  return "base";
}

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    body.classList.add("motion-ready");
    body.dataset.motionWorld = worldFor(pathname);

    if (reducedMotion) return;

    let pointerFrame = 0;
    let scrollFrame = 0;
    let activeSurface: HTMLElement | null = null;
    const resetSurface = () => {
      activeSurface?.classList.remove("is-depth-active");
      activeSurface?.style.removeProperty("--surface-rx");
      activeSurface?.style.removeProperty("--surface-ry");
      activeSurface?.style.removeProperty("--surface-light-x");
      activeSurface?.style.removeProperty("--surface-light-y");
      activeSurface = null;
    };
    const moveGlow = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const normalX = event.clientX / window.innerWidth - 0.5;
        const normalY = event.clientY / window.innerHeight - 0.5;
        body.style.setProperty("--pointer-x", `${event.clientX}px`);
        body.style.setProperty("--pointer-y", `${event.clientY}px`);
        body.style.setProperty("--scene-x", `${normalX * 28}px`);
        body.style.setProperty("--scene-y", `${normalY * 20}px`);
        body.style.setProperty("--scene-x-inverse", `${normalX * -20}px`);
        body.style.setProperty("--scene-y-inverse", `${normalY * -16}px`);
        body.style.setProperty("--scene-x-soft", `${normalX * 11}px`);
        body.style.setProperty("--scene-y-soft", `${normalY * 8}px`);
        body.style.setProperty("--scene-rx", `${normalY * -5}deg`);
        body.style.setProperty("--scene-ry", `${normalX * 7}deg`);
        body.style.setProperty("--scene-rx-soft", `${normalY * -2.3}deg`);
        body.style.setProperty("--scene-ry-soft", `${normalX * 3.4}deg`);

        const target = event.target instanceof Element ? event.target.closest<HTMLElement>(DEPTH_SELECTOR) : null;
        if (!target) {
          resetSurface();
          return;
        }
        if (activeSurface !== target) {
          resetSurface();
          activeSurface = target;
          activeSurface.classList.add("is-depth-active");
        }
        const bounds = target.getBoundingClientRect();
        const localX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
        const localY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
        target.style.setProperty("--surface-rx", `${localY * -4.5}deg`);
        target.style.setProperty("--surface-ry", `${localX * 6.5}deg`);
        target.style.setProperty("--surface-light-x", `${(localX + 1) * 50}%`);
        target.style.setProperty("--surface-light-y", `${(localY + 1) * 50}%`);
      });
    };

    const moveSceneWithScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, window.scrollY / available));
        body.style.setProperty("--scroll-shift", `${progress * -150}px`);
        body.style.setProperty("--scroll-shift-reverse", `${progress * 68}px`);
        body.style.setProperty("--scroll-shift-soft", `${progress * -45}px`);
        body.style.setProperty("--scroll-turn", `${progress * 115}deg`);
        body.style.setProperty("--scroll-turn-reverse", `${progress * -115}deg`);
        body.style.setProperty("--scroll-progress", String(progress));
      });
    };

    const pulse = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const ring = document.createElement("span");
      ring.className = "signal-ripple";
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      ring.addEventListener("animationend", () => ring.remove(), { once: true });
      body.appendChild(ring);
    };

    let revealIndex = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    const register = (root: ParentNode = document) => {
      const elements = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
      elements.forEach((element) => {
        if (!element.classList.contains("motion-reveal")) {
          element.classList.add("motion-reveal");
          element.dataset.revealDirection = revealIndex % 3 === 1 ? "left" : revealIndex % 3 === 2 ? "right" : "up";
          element.style.setProperty("--reveal-delay", `${Math.min(revealIndex % 4, 3) * 45}ms`);
          revealIndex += 1;
        }
        if (element.classList.contains("is-revealed")) return;
        observer.observe(element);
      });
    };

    register();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(REVEAL_SELECTOR) && !node.classList.contains("motion-reveal")) {
              node.classList.add("motion-reveal");
              node.dataset.revealDirection = "up";
              observer.observe(node);
            }
            register(node);
          }
        });
      });
    });
    mutations.observe(body, { childList: true, subtree: true });

    moveSceneWithScroll();
    window.addEventListener("pointermove", moveGlow, { passive: true });
    window.addEventListener("pointerdown", pulse, { passive: true });
    window.addEventListener("scroll", moveSceneWithScroll, { passive: true });
    return () => {
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(scrollFrame);
      resetSurface();
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("pointermove", moveGlow);
      window.removeEventListener("pointerdown", pulse);
      window.removeEventListener("scroll", moveSceneWithScroll);
      document.querySelectorAll(".signal-ripple").forEach((ring) => ring.remove());
      document.querySelectorAll<HTMLElement>(".motion-reveal").forEach((element) => {
        element.classList.remove("motion-reveal", "is-revealed");
        delete element.dataset.revealDirection;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return <>
    <div className="site-ambient" aria-hidden="true" />
    <div className="site-depth-scene" aria-hidden="true">
      <i className="depth-shard shard-one"/><i className="depth-shard shard-two"/><i className="depth-shard shard-three"/>
    </div>
  </>;
}
