// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // your drizzle db instance
import { contacts } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

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

    console.log("Contact form submitted:", newContact);

    return NextResponse.json({ status: "success", data: newContact });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
