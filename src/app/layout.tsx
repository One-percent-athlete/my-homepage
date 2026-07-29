import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import SiteMotion from "@/components/SiteMotion";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.37x.jp/"),
  title: "Ryu Suzuki | Engineer, Creator & Global Explorer",
  description: "Meet Ryu Suzuki—an independent engineer, creator and adventurer building memorable digital experiences with perspective from 80+ countries.",
  icons: {
    icon: "/favicon.ico",
    apple: "/onepercentlogo.png",
    shortcut: "/favicon.ico",
  },
  verification: { google: "C0k8OsoXitZWwJedeoF1dNc6Qhwwv1xOrToWZCmZzEw" },
  openGraph: {
    title: "Ryu Suzuki — Engineer, Creator & Global Explorer",
    description: "I build digital worlds—then explore the real one.",
    url: "https://www.37x.jp/",
    siteName: "Ryu Suzuki",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ryu Suzuki — Engineer, Creator & Global Explorer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryu Suzuki — Engineer, Creator & Global Explorer",
    description: "I build digital worlds—then explore the real one.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTHTFS5N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NTHTFS5N');`}
        </Script>
        <LanguageProvider><SiteMotion />{children}<PublicFooter /></LanguageProvider>
      </body>
    </html>
  );
}
