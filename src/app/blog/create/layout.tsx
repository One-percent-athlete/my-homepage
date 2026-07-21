import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function BlogCreateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const authorized = await verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!authorized) redirect("/mission-control/login?next=/blog/create");
  return children;
}
