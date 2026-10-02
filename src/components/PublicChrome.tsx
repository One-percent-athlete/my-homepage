"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PublicChrome() {
  const pathname = usePathname();
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout> | undefined;
    const show = () => { delete document.body.dataset.chromeScrolling; };
    const scroll = () => {
      document.body.dataset.chromeScrolling = "true";
      if (idle) clearTimeout(idle);
      idle = setTimeout(show, 280);
    };
    show();
    // Capture also covers a long form or menu being scrolled inside a square.
    document.addEventListener("scroll", scroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("scroll", scroll, true);
      if (idle) clearTimeout(idle);
      show();
    };
  }, [pathname]);
  return null;
}
