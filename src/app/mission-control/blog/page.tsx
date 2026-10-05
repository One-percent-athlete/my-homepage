import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function ManageBlog() {
  const entries = await db.select({ id: posts.id, title: posts.title, slug: posts.slug, showInGallery: posts.showInGallery })
    .from(posts).orderBy(desc(posts.createdAt));
  return <main className="admin-console">
    <header><div><p>BLOG & GALLERY</p><h1>Manage your posts</h1></div><Link href="/blog/create">Create a post →</Link></header>
    <p className="mb-6">Edit a post to replace its cover image or choose whether it appears in the gallery.</p>
    <Link href="/mission-control" className="underline">← Mission Control</Link>
    <section className="admin-inbox">
      {entries.length ? entries.map(post => <article key={post.id}>
        <div><span>{post.showInGallery ? "IN GALLERY" : "BLOG ONLY"}</span></div>
        <h2>{post.title}</h2>
        <Link href={`/mission-control/blog/${post.slug}/edit`}>Edit post & gallery photo →</Link>
        <Link href={`/blog/${post.slug}`} className="ml-6">View post</Link>
      </article>) : <p className="admin-empty">No posts yet. Create a post to add your first gallery photo.</p>}
    </section>
  </main>;
}
