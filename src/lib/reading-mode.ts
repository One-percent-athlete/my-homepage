export type ReadingMode = "journey" | "read";
export const READING_MODE_EVENT = "reading-mode-change";
const KEY = "ryu-reading-mode";
let volatileMode: ReadingMode | undefined;

export function getReadingMode(): ReadingMode {
  if (typeof window === "undefined") return "journey";
  if (volatileMode) return volatileMode;
  try { return window.localStorage.getItem(KEY) === "read" ? "read" : "journey"; }
  catch { return document.body.dataset.readingMode === "read" ? "read" : "journey"; }
}

export function setReadingMode(mode: ReadingMode) {
  document.body.dataset.readingMode = mode;
  try { window.localStorage.setItem(KEY, mode); volatileMode = undefined; }
  catch { volatileMode = mode; }
  window.dispatchEvent(new CustomEvent<ReadingMode>(READING_MODE_EVENT, { detail: mode }));
}
