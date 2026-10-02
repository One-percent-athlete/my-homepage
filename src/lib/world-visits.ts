export const PUBLIC_WORLDS = ["/", "/web", "/travel", "/ski", "/blog", "/gallery", "/contact"];
const knownWorlds = [...PUBLIC_WORLDS, "/between"];
let memoryVisits: string[] = [];

export function visitedWorldFor(pathname: string) {
  if (pathname === "/case-studies") return "/web";
  if (pathname.startsWith("/blog/create") || pathname.startsWith("/mission-control")) return null;
  return knownWorlds.find(route => pathname === route || (route !== "/" && pathname.startsWith(`${route}/`))) ?? null;
}

export function getVisitedWorlds(): string[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem("ryu-worlds") || "[]");
    if (Array.isArray(stored)) memoryVisits = [...new Set([...memoryVisits, ...stored.filter((value): value is string => typeof value === "string" && knownWorlds.includes(value))])];
  } catch { /* Visits still work for this session when storage is unavailable. */ }
  return [...memoryVisits];
}

export function recordWorldVisit(pathname: string) {
  const route = visitedWorldFor(pathname);
  const visited = getVisitedWorlds();
  if (!route || visited.includes(route)) return visited;
  memoryVisits = [...visited, route];
  try { window.localStorage.setItem("ryu-worlds", JSON.stringify(memoryVisits)); } catch { /* Keep the in-memory visit. */ }
  window.dispatchEvent(new CustomEvent("world-visits"));
  return [...memoryVisits];
}

export function explorationProgress(visited: string[]) {
  const count = PUBLIC_WORLDS.filter(route => visited.includes(route)).length;
  return { count, total: PUBLIC_WORLDS.length, percentage: Math.round(count / PUBLIC_WORLDS.length * 100) };
}

export function nextUnvisitedWorld(visited: string[]) {
  return PUBLIC_WORLDS.find(route => !visited.includes(route)) ?? null;
}
