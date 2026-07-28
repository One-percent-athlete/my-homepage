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
  ".travel-world > div > section",
  ".ski-world > header",
  ".ski-world main > section",
  ".journal-world > header",
  ".journal-world > section",
  ".journal-world > main",
  ".journal-world > footer",
  ".between-world > section",
  ".contact-world",
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
    const moveGlow = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        body.style.setProperty("--pointer-x", `${event.clientX}px`);
        body.style.setProperty("--pointer-y", `${event.clientY}px`);
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
        if (element.classList.contains("motion-reveal")) return;
        element.classList.add("motion-reveal");
        element.dataset.revealDirection = revealIndex % 3 === 1 ? "left" : revealIndex % 3 === 2 ? "right" : "up";
        element.style.setProperty("--reveal-delay", `${Math.min(revealIndex % 4, 3) * 45}ms`);
        revealIndex += 1;
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

    window.addEventListener("pointermove", moveGlow, { passive: true });
    window.addEventListener("pointerdown", pulse, { passive: true });
    return () => {
      cancelAnimationFrame(pointerFrame);
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("pointermove", moveGlow);
      window.removeEventListener("pointerdown", pulse);
      document.querySelectorAll(".signal-ripple").forEach((ring) => ring.remove());
    };
  }, [pathname]);

  return <div className="site-ambient" aria-hidden="true" />;
}
