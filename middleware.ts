// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/casinest")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}