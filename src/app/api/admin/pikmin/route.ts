import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { pikminDecorItems } from "@/db/schema";
import { expandPikminSets, PIKMIN_COLORS, STANDARD_PIKMIN_SETS } from "@/lib/pikmin-catalog";

const sameOrigin = (request: NextRequest) => !request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin;

export async function GET() {
  let items = await db.select().from(pikminDecorItems).orderBy(asc(pikminDecorItems.category), asc(pikminDecorItems.decor), asc(pikminDecorItems.id));
  if (!items.length) {
    await db.insert(pikminDecorItems).values(expandPikminSets(STANDARD_PIKMIN_SETS)).onConflictDoNothing();
    items = await db.select().from(pikminDecorItems).orderBy(asc(pikminDecorItems.category), asc(pikminDecorItems.decor), asc(pikminDecorItems.id));
  }
  return NextResponse.json(items, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (!Number.isInteger(body.id) || typeof body.owned !== "boolean") return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  const [item] = await db.update(pikminDecorItems).set({ owned: body.owned }).where(eq(pikminDecorItems.id, body.id)).returning();
  return NextResponse.json(item);
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const decor = typeof body.decor === "string" ? body.decor.trim() : "";
  const colors = Array.isArray(body.colors) ? body.colors.filter((color: unknown): color is string => typeof color === "string" && PIKMIN_COLORS.includes(color as typeof PIKMIN_COLORS[number])) : [];
  if (!category || category.length > 120 || !decor || decor.length > 160 || !colors.length) return NextResponse.json({ error: "Category, decor name, and at least one valid color are required" }, { status: 400 });
  const created = await db.insert(pikminDecorItems).values(colors.map((color: string) => ({ category, decor, color, event: body.event !== false, owned: false, active: true }))).onConflictDoNothing().returning();
  if (!created.length) return NextResponse.json({ error: "This decor set already contains all selected colors" }, { status: 409 });
  return NextResponse.json(created, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const category = request.nextUrl.searchParams.get("category") || "";
  const decor = request.nextUrl.searchParams.get("decor") || "";
  if (!category || !decor) return NextResponse.json({ error: "Category and decor are required" }, { status: 400 });
  await db.delete(pikminDecorItems).where(and(eq(pikminDecorItems.category, category), eq(pikminDecorItems.decor, decor)));
  return NextResponse.json({ status: "deleted" });
}
