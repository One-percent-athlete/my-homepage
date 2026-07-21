import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import MissionLogin from "./login/page";

export const dynamic = "force-dynamic";

export default async function MissionControlLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const authorized = await verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);

  // Middleware performs the redirect. This server gate is a second boundary in
  // case a private route is rendered directly or middleware is misconfigured.
  if (!authorized) return <MissionLogin />;
  return children;
}
