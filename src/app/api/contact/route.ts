// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // your drizzle db instance
import { contacts } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (body.website) return NextResponse.json({ status: "success" });
    if (!name || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || phone.length > 40 || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ status: "error", message: "Invalid submission" }, { status: 400 });
    }

    // Insert into database
    const [newContact] = await db
      .insert(contacts)
      .values({
        name,
        email,
        phone,
        message,
      })
      .returning();

    return NextResponse.json({ status: "success", id: newContact.id }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
