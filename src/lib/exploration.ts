export type Fragment = "build" | "travel" | "summit";
const FRAGMENT_KEY = "ryu-signal-fragments";

function readArray(key: string): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export function getFragments(): Fragment[] {
  return readArray(FRAGMENT_KEY).filter((value): value is Fragment => ["build", "travel", "summit"].includes(value));
}

export function recordWorldStep(world: Fragment, step: number, required: number) {
  const stepKey = `ryu-${world}-steps`;
  const steps = Array.from(new Set([...readArray(stepKey), String(step)]));
  window.localStorage.setItem(stepKey, JSON.stringify(steps));
  let fragments = getFragments();
  if (steps.length >= required && !fragments.includes(world)) {
    fragments = [...fragments, world];
    window.localStorage.setItem(FRAGMENT_KEY, JSON.stringify(fragments));
  }
  window.dispatchEvent(new CustomEvent("ryu-progress", { detail: { fragments, world, complete: steps.length >= required } }));
  return { steps: steps.length, fragments, complete: steps.length >= required };
}
