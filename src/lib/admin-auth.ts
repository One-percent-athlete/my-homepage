export const SESSION_DURATION_SECONDS = 60 * 30;
export const ADMIN_COOKIE = "ryu_mission_session_v2";

const encode = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

async function hmac(value: string) {
  const secret = process.env.MISSION_CONTROL_SECRET;
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return encode(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

export async function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  return `${expires}.${await hmac(String(expires))}`;
}

export async function verifyAdminSession(token?: string | null) {
  if (!token || !process.env.MISSION_CONTROL_SECRET) return false;
  const [expires, signature] = token.split(".");
  const now = Math.floor(Date.now() / 1000);
  const expiry = Number(expires);
  if (!expires || !signature || !/^\d+$/.test(expires) || expiry <= now || expiry > now + SESSION_DURATION_SECONDS + 30) return false;
  const expected = await hmac(expires);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) mismatch |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  return mismatch === 0;
}

export async function passwordMatches(candidate: string) {
  const expected = process.env.MISSION_CONTROL_PASSWORD;
  if (!expected || !candidate) return false;
  const digest = async (value: string) => encode(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
  const [left, right] = await Promise.all([digest(candidate), digest(expected)]);
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return mismatch === 0;
}
