"use client";

import SpaceJourney from "@/components/SpaceJourney";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create")) return "private";
  if (pathname.startsWith("/web") || pathname === "/case-studies") return "build";
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
    if (pathname.startsWith("/ski")) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLButtonElement>(".ski-run-tabs button:first-child")?.click();
      });
    }

    if (reducedMotion) return;

    let pointerFrame = 0;
    let activeSurface: HTMLElement | null = null;
    const resetSurface = () => {
      activeSurface?.classList.remove("is-depth-active");
      activeSurface?.style.removeProperty("--surface-rx");
      activeSurface?.style.removeProperty("--surface-ry");
      activeSurface?.style.removeProperty("--surface-light-x");
      activeSurface?.style.removeProperty("--surface-light-y");
      activeSurface = null;
    };

    const moveDepth = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const activeBounds = activeSurface?.getBoundingClientRect();
        const insideActiveDeadZone = Boolean(
          activeBounds &&
          event.clientX >= activeBounds.left - 18 &&
          event.clientX <= activeBounds.right + 18 &&
          event.clientY >= activeBounds.top - 18 &&
          event.clientY <= activeBounds.bottom + 18
        );
        const target = insideActiveDeadZone
          ? activeSurface
          : event.target instanceof Element
            ? event.target.closest<HTMLElement>(DEPTH_SELECTOR)
            : null;

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

    const pulse = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const ring = document.createElement("span");
      ring.className = "signal-ripple";
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      ring.addEventListener("animationend", () => ring.remove(), { once: true });
      body.appendChild(ring);
    };

    window.addEventListener("pointermove", moveDepth, { passive: true });
    window.addEventListener("pointerdown", pulse, { passive: true });
    return () => {
      cancelAnimationFrame(pointerFrame);
      resetSurface();
      window.removeEventListener("pointermove", moveDepth);
      window.removeEventListener("pointerdown", pulse);
      document.querySelectorAll(".signal-ripple").forEach((ring) => ring.remove());
    };
  }, [pathname]);

  return <SpaceJourney />;
}
