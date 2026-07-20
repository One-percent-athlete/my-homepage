"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Radio } from "lucide-react";

export default function MissionLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setError(data.error || "Authentication failed"); setLoading(false); return; }
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") ? next : "/mission-control");
    router.refresh();
  }

  return <main className="admin-login"><div className="admin-login-grid" aria-hidden="true"/><form onSubmit={submit}><p><Radio size={14}/> PRIVATE FREQUENCY</p><div className="admin-lock"><KeyRound size={26}/></div><h1>Mission Control</h1><span>Authorized operator access only.</span><label htmlFor="mission-password">Access key</label><input id="mission-password" type="password" value={password} onChange={event=>setPassword(event.target.value)} autoComplete="current-password" autoFocus required/>{error&&<strong role="alert">{error}</strong>}<button disabled={loading}>{loading?"VERIFYING SIGNAL…":"ENTER CONTROL ROOM"}</button></form></main>;
}
