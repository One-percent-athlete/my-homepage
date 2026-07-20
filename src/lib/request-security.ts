import { NextRequest } from "next/server";

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const publicHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
    const publicProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || request.nextUrl.protocol.replace(":", "");
    return originUrl.host === publicHost && originUrl.protocol === `${publicProtocol}:`;
  } catch {
    return false;
  }
}
