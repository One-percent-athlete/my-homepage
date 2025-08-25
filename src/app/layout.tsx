import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryu | Adventurer & Engineer | Freelance Web Developer",
  description:
    "Ryu is a freelance engineer, web app developer, and adventurer who has visited 80+ countries. Specializing in modern web apps, engineering solutions, and global exploration.",
  keywords: [
    "freelance engineer",
    "web app developer",
    "next.js portfolio",
    "adventurer",
    "ski instructor",
    "travel engineer",
  ],
  authors: [{ name: "Ryu" }],
  creator: "Ryu",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Ryu — Adventurer & Engineer",
    description:
      "Freelance engineer, web app developer, and adventurer. Building modern apps while exploring 80+ countries.",
    url: "https://yourdomain.com",
    siteName: "Ryu Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // make a 1200x630px cover image
        width: 1200,
        height: 630,
        alt: "Ryu — Adventurer & Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryu — Adventurer & Engineer",
    description:
      "Freelance engineer, developer, and adventurer. Helping businesses build modern web apps.",
    images: ["/images/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
