import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Contact | Professional Services - Ski, Travel & Web Development",
  description: "Get in touch with Ryu for ski lessons, travel adventures, web development, or collaborations. Professional services across multiple domains.",
  keywords: "contact, ski instructor, travel guide, web development, multilingual websites, booking, consultation, collaboration",
  openGraph: {
    title: "Contact | Professional Services - Ski, Travel & Web Development",
    description: "Get in touch with Ryu for professional services across ski instruction, travel adventures, and web development.",
    type: "website",
    locale: "en_US",
    siteName: "Ryu Professional Services",
    images: [
      {
        url: "/images/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Ryu - Professional Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Professional Services - Ski, Travel & Web Development",
    description: "Get in touch with Ryu for professional services across multiple domains.",
    images: ["/images/contact-og.jpg"],
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

interface ContactLayoutProps {
  children: React.ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}