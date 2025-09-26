// src/app/api/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/blog → list all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true, postTags: { include: { tag: true } } },
    });
    
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/blog → create a new post
export async function POST(req: NextRequest) {
  try {
    const { title, slug, content, coverImage, videoUrl, tags, authorId } =
      await req.json();

    if (!title || !slug || !content || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage,
        videoUrl,
        authorId,
        postTags: {
          create: (tags || []).map((tag: string) => ({
            tag: { connectOrCreate: { where: { name: tag }, create: { name: tag } } },
          })),
        },
      },
      include: { postTags: { include: { tag: true } } },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
