import type { Metadata, Viewport } from "next";
import Script from "next/script";

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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface SkiLayoutProps {
  children: React.ReactNode;
}

export default function SkiLayout({ children }: SkiLayoutProps) {
  return <>
          {/*<!-- Google tag (gtag.js) --> */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EHNC14Q4CJ" />
          <Script id="ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EHNC14Q4CJ');
            `}
          </Script>
          {children}
        </>;
}