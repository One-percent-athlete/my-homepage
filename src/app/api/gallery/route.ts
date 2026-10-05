import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, isNotNull, ne } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { cloudinaryGalleryImage } from "@/lib/gallery-images";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 24;

export async function GET(request: NextRequest) {
  const offset = Number(request.nextUrl.searchParams.get("offset") ?? "0");
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > 100000) {
    return NextResponse.json({ error: "Invalid gallery page" }, { status: 400 });
  }
  try {
    const rows = await db.select({ id: posts.id, title: posts.title, slug: posts.slug, coverImage: posts.coverImage })
      .from(posts).where(and(eq(posts.showInGallery, true), isNotNull(posts.coverImage), ne(posts.coverImage, "")))
      .orderBy(desc(posts.createdAt), desc(posts.id)).limit(PAGE_SIZE + 1).offset(offset);
    const images = rows.slice(0, PAGE_SIZE).flatMap(post => {
      const thumbnail = cloudinaryGalleryImage(post.coverImage!, 1200);
      const full = cloudinaryGalleryImage(post.coverImage!, 2400);
      return thumbnail && full ? [{ id: post.id, title: post.title, slug: post.slug, thumbnail, full }] : [];
    });
    return NextResponse.json({ images, nextOffset: rows.length > PAGE_SIZE ? offset + PAGE_SIZE : null },
      { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const detail = error as { code?: string; cause?: { code?: string } };
    console.error("Gallery query failed:", detail.cause?.code ?? detail.code ?? "unknown");
    return NextResponse.json({ error: "Blog photos could not be loaded." }, { status: 503 });
  }
}
