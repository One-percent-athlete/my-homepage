import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, context: Params) {
  // Await context.params if using Next.js 13 App Router dynamic APIs
  const { params } = context;
  const { slug } = params;

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post || post.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post[0]);
}
