import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  videoUrl?: string;
  category: string;
  createdAt: string;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound(); // triggers 404 page

  const post: BlogPost = await res.json();

  return (
    <>
    <CustomCursor />
    <FloatingButtons />
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="rounded-lg mb-6" />}
      <p className="text-gray-700">{post.content}</p>
    </main>
    </>
  );
}
