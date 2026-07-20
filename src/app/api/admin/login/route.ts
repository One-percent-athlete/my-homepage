import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSession, passwordMatches } from "@/lib/admin-auth";

const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const attempt = attempts.get(ip);
  if (attempt && attempt.reset > now && attempt.count >= 5) return NextResponse.json({ error: "Too many attempts. Wait fifteen minutes." }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  if (!(await passwordMatches(typeof body.password === "string" ? body.password : ""))) {
    attempts.set(ip, { count: attempt?.reset && attempt.reset > now ? attempt.count + 1 : 1, reset: now + 15 * 60 * 1000 });
    return NextResponse.json({ error: "Access key rejected" }, { status: 401 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ status: "authenticated" });
  response.cookies.set(ADMIN_COOKIE, await createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
