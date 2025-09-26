import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        comments: true,
        postTags: { include: { tag: true } },
      },
    });

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { title, content, coverImage, videoUrl, tags } = await req.json();

    const post = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title,
        content,
        coverImage,
        videoUrl,
        postTags: {
          deleteMany: {}, // remove existing tags
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
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.post.delete({ where: { slug: params.slug } });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
