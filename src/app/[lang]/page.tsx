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

const supportedLocales = ["en", "ja", "zh"] as const;
type Locale = (typeof supportedLocales)[number];

// Page props: params is a Promise because App Router expects it for dynamic routes
interface PageProps {
  params: Promise<{ lang: string }>;
}

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
