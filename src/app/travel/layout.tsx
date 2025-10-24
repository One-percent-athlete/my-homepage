import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Adventures | Discover Your Next Journey",
  description: "Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments. Join experienced traveler for your next adventure.",
  keywords: "travel, adventure, backpacking, world tour, cultural experiences, hiking, exploration",
  openGraph: {
    title: "Travel Adventures | Discover Your Next Journey",
    description: "Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments.",
    type: "website",
    locale: "en_US",
    siteName: "Travel Adventures",
    images: [
      {
        url: "/images/travel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Travel Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Adventures | Discover Your Next Journey",
    description: "Escape the ordinary and step into a world full of colors, cultures, and unforgettable moments.",
    images: ["/images/travel-og.jpg"],
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

interface TravelLayoutProps {
  children: React.ReactNode;
}

export default function TravelLayout({ children }: TravelLayoutProps) {
  return children;
}