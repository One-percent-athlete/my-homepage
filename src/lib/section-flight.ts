const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

// Long sections stay steady until their last content leaves the reading area.
export function sectionFlight(top: number, height: number, viewport: number, mobile = false) {
  const view = Math.max(1, viewport);
  const entering = ease(clamp((top / view - 0.58) / 0.5));
  const leaving = ease(clamp((0.42 - (top + height) / view) / 0.5));
  const strength = mobile ? 0.38 : 1;
  return {
    x: leaving * 90 * strength,
    y: (entering * 80 - leaving * 55) * strength,
    z: (-entering * 300 + leaving * 150) * strength,
    rotate: (entering * 4 - leaving * 3) * strength,
    opacity: 1 - Math.max(entering, leaving) * (mobile ? 0.55 : 0.85),
  };
}
