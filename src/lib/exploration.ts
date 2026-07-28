export type Fragment = "build" | "travel" | "summit";
const FRAGMENT_KEY = "ryu-signal-fragments";
const BETWEEN_UNLOCKED_AT_KEY = "ryu-between-unlocked-at";
const WORLD_KEY = "ryu-worlds";
const STEP_KEYS = ["ryu-build-steps", "ryu-travel-steps", "ryu-summit-steps"];
export const BETWEEN_ACCESS_DURATION_MS = 72 * 60 * 60 * 1000;

function readArray(key: string): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export function getFragments(): Fragment[] {
  const fragments = readArray(FRAGMENT_KEY).filter((value): value is Fragment => ["build", "travel", "summit"].includes(value));
  if (fragments.length < 3) return fragments;

  const storedUnlockedAt = Number(window.localStorage.getItem(BETWEEN_UNLOCKED_AT_KEY));
  if (!Number.isFinite(storedUnlockedAt) || storedUnlockedAt <= 0) {
    window.localStorage.setItem(BETWEEN_UNLOCKED_AT_KEY, String(Date.now()));
    return fragments;
  }

  if (Date.now() - storedUnlockedAt < BETWEEN_ACCESS_DURATION_MS) return fragments;

  window.localStorage.removeItem(FRAGMENT_KEY);
  window.localStorage.removeItem(BETWEEN_UNLOCKED_AT_KEY);
  STEP_KEYS.forEach((key) => window.localStorage.removeItem(key));
  window.localStorage.setItem(WORLD_KEY, JSON.stringify(readArray(WORLD_KEY).filter((world) => world !== "/between")));
  window.dispatchEvent(new CustomEvent("ryu-progress", { detail: { fragments: [], expired: true } }));
  return [];
}

export function getBetweenAccessRemainingMs() {
  const fragments = getFragments();
  if (fragments.length < 3) return 0;
  const unlockedAt = Number(window.localStorage.getItem(BETWEEN_UNLOCKED_AT_KEY));
  return Math.max(0, BETWEEN_ACCESS_DURATION_MS - (Date.now() - unlockedAt));
}

export function recordWorldStep(world: Fragment, step: number, required: number) {
  const stepKey = `ryu-${world}-steps`;
  const steps = Array.from(new Set([...readArray(stepKey), String(step)]));
  window.localStorage.setItem(stepKey, JSON.stringify(steps));
  let fragments = getFragments();
  if (steps.length >= required && !fragments.includes(world)) {
    fragments = [...fragments, world];
    window.localStorage.setItem(FRAGMENT_KEY, JSON.stringify(fragments));
    if (fragments.length >= 3) {
      window.localStorage.setItem(BETWEEN_UNLOCKED_AT_KEY, String(Date.now()));
    }
  }
  window.dispatchEvent(new CustomEvent("ryu-progress", { detail: { fragments, world, complete: steps.length >= required } }));
  return { steps: steps.length, fragments, complete: steps.length >= required };
}
