// src/app/[lang]/page.tsx
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Travels from "@/components/Travels";
import Skills from "@/components/Skills";
import Quote from "@/components/Quote";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getTranslation } from "../i18n";

interface PageProps {
  params: { lang: string }; // sync page
}

const supportedLocales = ["en", "ja", "zh"] as const;
type Locale = (typeof supportedLocales)[number];

export default function Page({ params }: PageProps) {
  const { lang } = params; // safe for sync pages

  // Validate locale
  const locale: Locale = supportedLocales.includes(lang as Locale)
    ? (lang as Locale)
    : "en"; // fallback

  // Translation data
  const t = getTranslation(locale);

  return (
    <main>
      <ScrollIndicator />
      <Navbar />
      <Hero data={t.hero} />
      <Quote data={t.quote} />
      <Skills data={t.skills} />
      <Projects data={t.projects} />
      <Travels data={t.travels} />
      <Contact data={t.contact} />
      <Footer />
    </main>
  );
}
