import type { ComponentPropsWithoutRef } from "react";

/** Semantic content; HomeTunnel projects this into the existing canvas gate. */
export default function PortalSection({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={`${className ?? ""} tunnel-section`} {...props} />;
}
