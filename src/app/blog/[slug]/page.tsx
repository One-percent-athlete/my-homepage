import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPostView from "@/components/blog/BlogPostView";

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

  return <BlogPostView post={post} />;
}
