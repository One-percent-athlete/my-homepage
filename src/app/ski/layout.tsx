import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ski Lessons & Mountain Adventures | Professional Ski Instructor",
  description: "Master the mountain with private ski lessons and guided adventures. 10+ years of expertise. CSIA Level 3 Candidate. Book your unforgettable ski experience today!",
  keywords: "ski lessons, snowboarding, mountain guide, private instructor, backcountry skiing, ski touring, avalanche safety",
  openGraph: {
    title: "Ski Lessons & Mountain Adventures | Professional Ski Instructor",
    description: "Master the mountain with private ski lessons and guided adventures. 10+ years of expertise.",
    type: "website",
    locale: "en_US",
    siteName: "Ski Adventures",
    images: [
      {
        url: "/images/ski-og.jpg",
        width: 1200,
        height: 630,
        alt: "Ski Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ski Lessons & Mountain Adventures | Professional Ski Instructor",
    description: "Master the mountain with private ski lessons and guided adventures. 10+ years of expertise.",
    images: ["/images/ski-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

interface SkiLayoutProps {
  children: React.ReactNode;
}

export default function SkiLayout({ children }: SkiLayoutProps) {
  return children;
}