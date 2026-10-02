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

export type JourneyFrame = { distance: number; width: number; height: number; reduced: boolean };

// The canvas and live HTML consume the same eased camera position, including
// reverse scrolling, resizing and the final settled frame.
let latestFrame: JourneyFrame | null = null;
const frameListeners = new Set<(frame: JourneyFrame) => void>();

export function publishJourneyFrame(frame: JourneyFrame) {
  latestFrame = frame;
  frameListeners.forEach(listener => listener(frame));
}

export function subscribeJourneyFrame(listener: (frame: JourneyFrame) => void) {
  frameListeners.add(listener);
  if (latestFrame) listener(latestFrame);
  return () => { frameListeners.delete(listener); };
}

export const gateOrigin = (index: number) => 1.1 + index * 2;

export const isTunnelRoute = (pathname: string) => ["/", "/web", "/contact", "/between", "/travel", "/ski"].includes(pathname);

/** Shared projection for a tunnel square and its live HTML contents. */
export function homeGateProjection(index: number, frame: JourneyFrame) {
  const { width, height, distance } = frame;
  const ratio = width < 700 ? Math.max(1.15, Math.min(1.75, height / Math.max(1, width) * 0.82)) : 0.75;
  const extent = Math.min(width * 0.96, Math.max(200, height - 150) / ratio);
  const depth = gateOrigin(index) - distance;
  const gateWidth = extent / Math.max(0.2, depth);
  const opacity = depth <= 0.2 ? 0 : depthOpacity(depth, 0.2, 24.2);
  return { depth, width: gateWidth, height: gateWidth * ratio, centerX: width / 2, centerY: height / 2 + 20, opacity, ratio };
}
