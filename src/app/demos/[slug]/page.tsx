import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoExperience from "./DemoExperience";
import { demoSlugs, demoTitles, type DemoSlug } from "./demo-data";

export function generateStaticParams() {
  return demoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!demoSlugs.includes(slug as DemoSlug)) return {};
  return {
    title: `${demoTitles[slug as DemoSlug]} — Live Demo | Ryu Suzuki`,
    description: `An interactive ${demoTitles[slug as DemoSlug]} product demo by Ryu Suzuki.`,
    robots: { index: true, follow: true },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!demoSlugs.includes(slug as DemoSlug)) notFound();
  return <DemoExperience slug={slug as DemoSlug} />;
}
