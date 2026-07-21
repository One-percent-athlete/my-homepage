import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!(await verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const messages = await db.select({ id: contacts.id, name: contacts.name, email: contacts.email, phone: contacts.phone, message: contacts.message, createdAt: contacts.createdAt }).from(contacts).orderBy(desc(contacts.createdAt)).limit(100);
  return NextResponse.json(messages, { headers: { "Cache-Control": "no-store" } });
}
