"use client";

import { useEffect } from "react";

export default function MagicalCursorSparks() {
  useEffect(() => {
    let sparkId = 0;

    const handleMove = (e: MouseEvent) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      // Random size
      const size = 4 + Math.random() * 4;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${Math.max(size / 2, 1)}px`;

      // Cursor position
      sparkle.style.left = e.pageX + "px";
      sparkle.style.top = e.pageY + "px";

      // Random direction and distance
      const angle = Math.random() * 2 * Math.PI;
      const distance = 40 + Math.random() * 60;
      const xMove = Math.cos(angle) * distance;
      const yMove = Math.sin(angle) * distance;

      // Random speed (shorter/longer flight)
      const speed = 0.6 + Math.random() * 0.4;

      // Rotate spark along motion
      const deg = (angle * 180) / Math.PI;
      sparkle.style.setProperty("--dx", `${xMove}px`);
      sparkle.style.setProperty("--dy", `${yMove}px`);
      sparkle.style.setProperty("--angle", `${deg}deg`);
      sparkle.style.setProperty("--speed", `${speed}s`);

      // Append to body
      document.body.appendChild(sparkle);

      // Remove after animation
      setTimeout(() => sparkle.remove(), speed * 1000);
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <style jsx global>{`
      .sparkle {
        position: absolute;
        background: linear-gradient(0deg, rgba(255,223,128,1) 0%, rgba(255,200,80,0.6) 50%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%) rotate(var(--angle));
        filter: blur(1px);
        animation: shoot var(--speed) ease-out forwards;
        z-index: 9999;
      }

      @keyframes shoot {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(var(--angle)) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--angle)) scale(0.2);
        }
      }

      body {
        cursor: auto; /* Keep default arrow */
      }
    `}</style>
  );
}
