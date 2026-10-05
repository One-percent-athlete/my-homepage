import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import BlogPostEditor from "@/components/blog/BlogPostEditor";

export const dynamic = "force-dynamic";

export default async function EditBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!post) notFound();
  return <BlogPostEditor initialPost={{ ...post, coverImage: post.coverImage ?? "", videoUrl: post.videoUrl ?? "" }} />;
}
