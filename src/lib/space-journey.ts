/** Recycle scenery beyond the camera while preserving the same view on back-scroll. */
export function sceneDepth(origin: number, distance: number, near = 0.2, far = 11.45) {
  const span = far - near;
  return near + ((origin - distance - near) % span + span) % span;
}

export function travelDistance(scrollY: number, viewportHeight: number) {
  return Math.max(0, scrollY) / Math.max(1, viewportHeight) * 1.5;
}

export function depthOpacity(depth: number, near = 0.2, far = 11.45) {
  const entry = Math.min(1, (far - depth) / 1.4);
  const exit = Math.min(1, (depth - near) / 0.3);
  return Math.max(0, entry * exit);
}
