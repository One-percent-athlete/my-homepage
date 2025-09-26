// src/app/api/blog/[slug]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/blog/[slug]
export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        comments: true,
        postTags: { include: { tag: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT /api/blog/[slug]
export async function PUT(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  try {
    const body = await req.json();
    const { title, content, coverImage, videoUrl, tags } = body;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        coverImage,
        videoUrl,
        postTags: {
          deleteMany: {}, // remove all previous tags
          create: tags.map((tag: string) => ({
            tag: { connectOrCreate: { where: { name: tag }, create: { name: tag } } },
          })),
        },
      },
      include: { postTags: { include: { tag: true } } },
    });

    return NextResponse.json(updatedPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/blog/[slug]
export async function DELETE(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  try {
    await prisma.post.delete({ where: { slug } });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
