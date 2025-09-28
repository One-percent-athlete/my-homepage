import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
  return NextResponse.json(allPosts);
}

export async function POST(req: NextRequest) {
  try {
    const { title, slug, content, coverImage, videoUrl, category } = await req.json();

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

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
