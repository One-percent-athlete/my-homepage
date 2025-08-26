import { getTranslation } from "../i18n";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Travels from "@/components/Travels";
import Skills from "@/components/Skills";
import Quote from "@/components/Quote";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

interface PageProps {
  params: { lang: string };
}

const supportedLocales = ["en", "ja", "zh"] as const;
type Locale = (typeof supportedLocales)[number];

export default function Page({ params }: PageProps) {
  const { lang } = params; // <-- remove 'await'

  // Type guard to ensure lang is a valid Locale
  const locale: Locale = supportedLocales.includes(lang as Locale)
    ? (lang as Locale)
    : "en";

  const t = getTranslation(locale);

  return (
    <main>
      <ScrollIndicator />
      <Navbar />
      <Hero data={t.hero} />
      <Travels data={t.travels} />
      <Quote data={t.quote} />
      <Skills data={t.skills} />
      <Projects data={t.projects} />
      <Contact data={t.contact} />
      <Footer />
    </main>
  );
}
