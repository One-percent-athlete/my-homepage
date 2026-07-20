import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

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
    const { title, slug, content, coverImage, videoUrl, category } = await req.json();

    if (typeof title !== "string" || title.trim().length < 3 || title.length > 180 || typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || typeof content !== "string" || content.length < 10 || content.length > 100000) {
      return NextResponse.json({ error: "Invalid post" }, { status: 400 });
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        slug,
        content,
        coverImage,
        videoUrl,
        category,
      })
      .returning();
      console.log("Incoming body:", { title, slug, content, coverImage, videoUrl, category });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
