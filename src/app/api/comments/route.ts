// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { comments } from "@/db/schema";

// // GET /api/comments?postId=<id>
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const postId = searchParams.get("postId");

//     if (!postId) return NextResponse.json({ error: "postId query parameter is required" }, { status: 400 });

//     const postComments = await db
//       .select()
//       .from(comments)
//       .where(comments.postId, "=", postId)
//       .all();

//     return NextResponse.json(postComments);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
//   }
// }

// // POST /api/comments
// export async function POST(req: NextRequest) {
//   try {
//     const { postId, content } = await req.json();

//     if (!postId || !content) return NextResponse.json({ error: "postId and content are required" }, { status: 400 });

//     const newComment = await db
//       .insert(comments)
//       .values({ postId, content })
//       .returning();

//     return NextResponse.json(newComment[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
//   }
// }
