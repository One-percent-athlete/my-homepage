import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.37x.jp";
  const res = await fetch(`${baseUrl}/api/blog/${params.slug}`, { cache: "no-store" });

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
      url: `${baseUrl}/blog/${params.slug}`,
      type: "article",
    },
  };
}


interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.37x.jp";

  const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  return (
  <>
    <CustomCursor />
    <FloatingButtons />

    <article className="relative bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white min-h-screen pt-20 pb-32 px-6">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          {post.title}
        </h1>

        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-2xl shadow-2xl mb-10 w-full object-cover"
          />
        )}

        <div className="prose prose-invert prose-lg max-w-none leading-relaxed text-gray-200">
          <p>{post.content}</p>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-transform transform hover:scale-105"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </article>
  </>
);
}
