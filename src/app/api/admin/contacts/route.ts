import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function GET() {
  const messages = await db.select({ id: contacts.id, name: contacts.name, email: contacts.email, phone: contacts.phone, message: contacts.message, createdAt: contacts.createdAt }).from(contacts).orderBy(desc(contacts.createdAt)).limit(100);
  return NextResponse.json(messages, { headers: { "Cache-Control": "no-store" } });
}
