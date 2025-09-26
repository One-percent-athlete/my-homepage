import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // Fetch all posts
  try {
    const posts = await prisma.post.findMany({
      include: { postTags: { include: { tag: true } }, author: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Create a new post
  try {
    const { title, slug, content, coverImage, videoUrl, tags } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage,
        videoUrl,
        authorId: "YOUR_USER_ID", // Replace with authenticated user
        postTags: {
          create: tags.map((tag: string) => ({
            tag: { connectOrCreate: { where: { name: tag }, create: { name: tag } } },
          })),
        },
      },
      include: { postTags: { include: { tag: true } } },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
