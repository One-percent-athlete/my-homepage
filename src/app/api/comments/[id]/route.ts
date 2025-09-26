// src/app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to extract the comment ID from the URL
function getId(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/"); // e.g., /api/comments/<id>
  return parts[parts.length - 1]; // last part is ID
}

// GET /api/comments/:id
export async function GET(req: NextRequest) {
  const id = getId(req);
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!comment)
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch comment" }, { status: 500 });
  }
}

// PUT /api/comments/:id
export async function PUT(req: NextRequest) {
  const id = getId(req);
  try {
    const { content } = await req.json();
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

// DELETE /api/comments/:id
export async function DELETE(req: NextRequest) {
  const id = getId(req);
  try {
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
