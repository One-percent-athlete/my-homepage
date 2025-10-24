import type { Metadata } from 'next';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

interface WebLayoutProps {
  children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
  return <>{children}</>;
}