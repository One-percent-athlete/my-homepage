import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


type CategoryType = "TECH_BUSINESS" | "TRAVEL_CULTURE" | "SKI_SNOW";

function parseCategory(input: string): CategoryType {
  if (["TECH_BUSINESS", "TRAVEL_CULTURE", "SKI_SNOW"].includes(input)) {
    return input as CategoryType;
  }
  throw new Error(`Invalid category: ${input}`);
}

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
  try {
    const { title, slug, content, coverImage, videoUrl, tags, authorId, category } =
      await req.json();

    if (!title || !slug || !content || !authorId || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enumCategory = parseCategory(category);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage,
        videoUrl,
        authorId,
        category: enumCategory, // ✅ Now recognized by Prisma Client
        postTags: {
          create: (tags || []).map((tag: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      } as any,
      include: { postTags: { include: { tag: true } }, author: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
