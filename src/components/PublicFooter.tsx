"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function PublicFooter() {
  const pathname = usePathname();
  if (["/", "/web"].includes(pathname) || pathname.startsWith("/mission-control") || pathname.startsWith("/blog/create")) return null;
  return <Footer />;
}
