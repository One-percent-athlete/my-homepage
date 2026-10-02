"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function PublicFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create")) return null;
  return <Footer />;
}
