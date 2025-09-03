// src/app/[lang]/page.tsx
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Travels from "@/components/Travels";
import Quote from "@/components/Quote";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import SkillsExperience from "@/components/SkillsExperience";
import { getTranslation } from "../i18n";
const supportedLocales = ["en", "ja", "zh"] as const;
type Locale = (typeof supportedLocales)[number];

// Page props: params is a Promise because App Router expects it for dynamic routes
interface PageProps {
  params: Promise<{ lang: string }>;
}

// app/page.tsx (or app/[locale]/page.tsx)

export const metadata = {
  title: "Ryu | Full-Stack Engineer (Django, SQL, MongoDB, React, Next.js)",
  description:
    "Portfolio of Ryu, a full-stack engineer specializing in backend development with Django, SQL, and MongoDB, and modern frontend with React, Next.js, and Tailwind CSS. Experienced in building scalable applications, REST APIs, and intuitive user interfaces.",
  keywords: [
    "Ryu",
    "Full Stack Engineer",
    "Backend Developer",
    "Frontend Developer",
    "Django Developer",
    "Python Developer",
    "SQL Database Engineer",
    "MongoDB Developer",
    "React Developer",
    "Next.js Developer",
    "Tailwind CSS Developer",
    "REST API Developer",
    "UI/UX Engineer",
    "Portfolio",
  ],
  openGraph: {
    title: "Ryu | Full-Stack Engineer & Web Developer",
    description:
      "Ryu is a full-stack engineer with expertise in Django, SQL, MongoDB for backend systems, and React, Next.js, Tailwind CSS for frontend. Explore portfolio projects and contact for collaboration.",
    url: "https://www.ryu.dev", // ← replace with your domain
    siteName: "Ryu Portfolio",
    images: [
      {
        url: "/images/og-portfolio.jpg", // 1200x630 preview image
        width: 1200,
        height: 630,
        alt: "Ryu - Full-Stack Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryu | Full-Stack Engineer (Django, React, SQL, MongoDB)",
    description:
      "Full-stack engineer skilled in Django, SQL, MongoDB, React, Next.js, and Tailwind CSS. Building scalable backend systems and modern frontend applications.",
    images: ["/images/og-portfolio.jpg"],
  },
};


export default async function Page({ params }: PageProps) {
  // Await params first
  const { lang } = await params;

  // Validate locale
  const locale: Locale = supportedLocales.includes(lang as Locale)
    ? (lang as Locale)
    : "en";

  // If getTranslation is async, await it
  const t = await getTranslation(locale);



  return (
    <main style={{ cursor: "none" }}>
      <ScrollIndicator />
      <Navbar />
      <Hero data={t.hero} />
      <Quote data={t.quote} />
      <SkillsExperience data={t.skills} />
      <Projects data={t.projects} />
      <Travels data={t.travels} />
      <Contact data={t.contact} />
      <Footer />
    </main>
  );
}
