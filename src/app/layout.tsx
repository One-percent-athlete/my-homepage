import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryu | Adventurer & Engineer | Freelance Web Developer",
  description: "Ryu is a freelance engineer, web app developer, and adventurer who has visited 80+ countries.",
  metadataBase: new URL("https://www.37x.jp/"),
  openGraph: {
    title: "Ryu — Adventurer & Engineer",
    description: "Freelance engineer, web app developer, and adventurer. Building modern apps while exploring 80+ countries.",
    url: "https://www.37x.jp/",
    siteName: "Ryu Portfolio",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Ryu — Adventurer & Engineer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryu — Adventurer & Engineer",
    description: "Freelance engineer, developer, and adventurer. Helping businesses build modern web apps.",
    images: ["/images/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3NZ4WT7');
          `}
        </Script>

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WQVTT6KTM3" />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WQVTT6KTM3');
          `}
        </Script>

        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3NZ4WT7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
