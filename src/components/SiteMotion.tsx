"use client";

import { usePathname } from "next/navigation";
import { useEffect, type CSSProperties } from "react";

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

const ROOM_STARS = [
  [7, 15, 2, 0.35, 4.8], [13, 34, 1, 0.7, 3.1], [18, 69, 3, 0.85, 5.7],
  [23, 22, 1, 0.42, 4.2], [28, 51, 2, 0.75, 6.2], [32, 79, 1, 0.5, 3.7],
  [37, 12, 4, 0.9, 7.1], [41, 41, 1, 0.4, 5.3], [45, 64, 2, 0.8, 3.4],
  [49, 27, 1, 0.65, 6.7], [53, 76, 3, 0.9, 4.5], [57, 47, 1, 0.38, 5.9],
  [61, 18, 2, 0.72, 3.8], [65, 58, 1, 0.45, 6.5], [69, 85, 4, 0.95, 7.4],
  [73, 33, 1, 0.5, 4.1], [77, 67, 2, 0.82, 5.5], [81, 14, 1, 0.4, 6.9],
  [85, 45, 3, 0.88, 3.5], [90, 75, 1, 0.52, 5.1], [94, 26, 2, 0.76, 6.1],
  [10, 88, 1, 0.45, 7.6], [26, 91, 3, 0.9, 4.7], [43, 89, 1, 0.55, 3.3],
  [58, 94, 2, 0.72, 5.8], [74, 92, 1, 0.4, 6.4], [88, 90, 3, 0.86, 4.3],
] as const;

function worldFor(pathname: string) {
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create")) return "private";
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

  return (
    <div className="cosmic-room" aria-hidden="true">
      <div className="room-back-wall">
        <div className="room-nebula room-nebula-one" />
        <div className="room-nebula room-nebula-two" />
        <div className="room-stars">
          {ROOM_STARS.map(([left, top, size, opacity, duration], index) => (
            <i
              key={index}
              style={{
                "--star-left": `${left}%`,
                "--star-top": `${top}%`,
                "--star-size": `${size}px`,
                "--star-opacity": opacity,
                "--star-duration": `${duration}s`,
                "--star-delay": `${(index % 9) * -0.63}s`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className="room-plane room-ceiling" />
      <div className="room-plane room-wall-left" />
      <div className="room-plane room-wall-right" />
      <div className="room-plane room-floor" />
      <div className="room-perspective-lines">
        <i /><i /><i /><i />
      </div>
      <div className="room-shooting-stars">
        <i /><i /><i />
      </div>
      <div className="room-vignette" />
    </div>
  );
}
