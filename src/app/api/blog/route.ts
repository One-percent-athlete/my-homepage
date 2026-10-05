import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { isDuplicateSlug, validateBlogInput } from "@/lib/blog-input";

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
  return NextResponse.json(allPosts);
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    const cookieAuthorized = await verifyAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
    const legacyAuthorized = Boolean(process.env.BLOG_ADMIN_TOKEN && token === process.env.BLOG_ADMIN_TOKEN);
    if (!cookieAuthorized && !legacyAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const input = validateBlogInput(await req.json());
    if (input.error) return NextResponse.json({ error: input.error }, { status: 400 });

    const [newPost] = await db
      .insert(posts)
      .values(input.data!)
      .returning();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (isDuplicateSlug(error)) return NextResponse.json({ error: "That slug is already used by another post." }, { status: 409 });
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid post" }, { status: 400 });
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
