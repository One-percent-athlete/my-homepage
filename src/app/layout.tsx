import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryu | Adventurer & Engineer | Freelance Web Developer",
  icons: {
    icon: "/favicon.ico",
    apple: "/onepercentlogo.png",
    shortcut: "/favicon.ico",
  },
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
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager (only this – it can send to GA4) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P3NZ4WT7');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ GTM Noscript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3NZ4WT7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ❌ REMOVE this entire GA block if you're using GTM */}
        {/* If you really need direct GA4, keep it but fix strategy:
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EHNC14Q4CJ"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EHNC14Q4CJ');
          `}
        </Script>
        */}

        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}