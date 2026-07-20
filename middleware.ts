import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/casinest")) return new NextResponse("Not Found", { status: 404 });

  const loginPath = "/mission-control/login";
  const protectedPath = (pathname.startsWith("/mission-control") && pathname !== loginPath) || pathname.startsWith("/blog/create") || (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login");
  const authorized = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);

  if (pathname === loginPath && authorized) return NextResponse.redirect(new URL("/mission-control", request.url));
  if (!protectedPath || authorized) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const login = new URL(loginPath, request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|og.png).*)"] };
