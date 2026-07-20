import FloatingButtons from "@/components/FloatingButtons";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // ✅ must await
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.37x.jp";
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    return {
      title: "Blog | One Percent 37x",
      description: "Read insightful articles from One Percent 37x.",
    };
  }

  const post = await res.json();

  return {
    title: `${post.title} | One Percent 37x`,
    description: post.content.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 150),
      images: post.coverImage ? [post.coverImage] : [],
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ this await fixes the typing

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.37x.jp";
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  return (
    <>
      <FloatingButtons />
      <article className="journal-entry relative text-white min-h-screen pt-20 pb-32 px-6">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="journal-entry-kicker">DECODED FIELD NOTE</p>
          <h1 className="text-5xl font-extrabold mb-6 text-center">
            {post.title}
          </h1>

          <figure className="journal-entry-figure">
            <Image
              src={post.coverImage || "/images/astro.jpg"}
              alt={`Cover image for ${post.title}`}
              width={1200}
              height={675}
              priority
              className="journal-entry-cover shadow-2xl w-full object-cover"
            />
            <figcaption>FIELD IMAGE / {post.category?.replaceAll("_", " ") || "JOURNAL ARCHIVE"}</figcaption>
          </figure>

          <div className="prose prose-invert prose-lg max-w-none leading-relaxed text-gray-200">
            <p>{post.content}</p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="journal-entry-back inline-block px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform transform hover:scale-105"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
