import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm"; // ✅ import eq

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug)) // ✅ use eq() function
    .limit(1);

  if (!post.length) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post[0]);
}
