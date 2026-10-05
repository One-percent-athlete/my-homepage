import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { isDuplicateSlug, validateBlogInput } from "@/lib/blog-input";

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

export async function PATCH(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const authorized = await verifyAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!authorized && !(process.env.BLOG_ADMIN_TOKEN && token === process.env.BLOG_ADMIN_TOKEN)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const slug = decodeURIComponent(new URL(req.url).pathname.split("/").pop()!);
    const input = validateBlogInput(await req.json());
    if (input.error) return NextResponse.json({ error: input.error }, { status: 400 });
    const [post] = await db.update(posts).set(input.data!).where(eq(posts.slug, slug)).returning();
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    if (isDuplicateSlug(error)) return NextResponse.json({ error: "That slug is already used by another post." }, { status: 409 });
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid post" }, { status: 400 });
    return NextResponse.json({ error: "The post could not be saved. Please retry." }, { status: 500 });
  }
}
