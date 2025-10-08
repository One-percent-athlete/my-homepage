import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import { notFound } from "next/navigation";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params; // ✅ await required in Next.js 14+

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
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-purple-500">{post.title}</h1>
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-lg shadow-lg mb-8 object-cover"
          />
        )}
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </div>
    </>
  );
}
