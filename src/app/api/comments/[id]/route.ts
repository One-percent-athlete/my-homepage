// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { comments } from "@/db/schema";

// // GET /api/comments/:id
// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const id = url.pathname.split("/").pop();

//   if (!id) return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });

//   try {
//     const comment = await db
//       .select()
//       .from(comments)
//       .where(comments.id, "=", id)
//       .limit(1);

//     if (!comment[0]) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

//     return NextResponse.json(comment[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch comment" }, { status: 500 });
//   }
// }

// // PUT /api/comments/:id
// export async function PUT(req: NextRequest) {
//   const url = new URL(req.url);
//   const id = url.pathname.split("/").pop();

//   if (!id) return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });

//   try {
//     const { content } = await req.json();
//     if (!content) return NextResponse.json({ error: "Content is required" }, { status: 400 });

//     const updated = await db
//       .update(comments)
//       .set({ content })
//       .where(comments.id, "=", id)
//       .returning();

//     return NextResponse.json(updated[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
//   }
// }

// // DELETE /api/comments/:id
// export async function DELETE(req: NextRequest) {
//   const url = new URL(req.url);
//   const id = url.pathname.split("/").pop();

//   if (!id) return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });

//   try {
//     await db.delete(comments).where(comments.id, "=", id);
//     return NextResponse.json({ message: "Comment deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
//   }
// }
