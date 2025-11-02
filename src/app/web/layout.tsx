import type { Metadata } from 'next';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Bridges to a Global Audience | Multilingual Web Development',
  description: 'We build multilingual websites that connect your business with a global audience. Professional web development with internationalization and localization expertise.',
  keywords: 'multilingual websites, web development, internationalization, localization, global audience, responsive design, SEO optimization',
  openGraph: {
    title: 'Bridges to a Global Audience | Multilingual Web Development',
    description: 'We build multilingual websites that connect your business with a global audience. Professional web development with internationalization expertise.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Multilingual Web Development',
    images: [
      {
        url: '/images/web-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Multilingual Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridges to a Global Audience | Multilingual Web Development',
    description: 'We build multilingual websites that connect your business with a global audience.',
    images: ['/images/web-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface WebLayoutProps {
  children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
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