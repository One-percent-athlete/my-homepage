import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  // extract slug from the pathname
  const url = new URL(req.url);
  const segments = url.pathname.split("/"); // ['/api','blog','slug']
  const slug = segments[segments.length - 1];

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post.length) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post[0]);
}
