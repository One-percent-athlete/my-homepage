import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to extract slug from the request URL
function getSlug(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/"); // e.g. /api/blog/my-slug
  return parts[parts.length - 1]; // last part is slug
}

// GET /api/blog/[slug]
export async function GET(req: NextRequest) {
  const slug = getSlug(req);

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true, comments: true, postTags: { include: { tag: true } } },
    });

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT
export async function PUT(req: NextRequest) {
  const slug = getSlug(req);
  const { title, content, coverImage, videoUrl, tags } = await req.json();

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        coverImage,
        videoUrl,
        postTags: {
          deleteMany: {}, // remove old tags
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

// DELETE
export async function DELETE(req: NextRequest) {
  const slug = getSlug(req);

  try {
    await prisma.post.delete({ where: { slug } });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
