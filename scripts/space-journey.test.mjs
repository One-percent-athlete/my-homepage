import test from 'node:test';
import assert from 'node:assert/strict';
import { sceneDepth, travelDistance, depthOpacity } from '../src/lib/space-journey.ts';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('scrolling advances the camera and reverse scrolling restores the same scene', () => {
  const origin = sceneDepth(4.2, travelDistance(0, 900));
  const forward = sceneDepth(4.2, travelDistance(600, 900));
  assert.ok(forward < origin);
  assert.equal(sceneDepth(4.2, travelDistance(0, 900)), origin);
});
test('objects stay beyond the near plane after arbitrarily long or reverse travel', () => {
  for (const distance of [-1000, -1, 0, 0.9, 1.1, 11.25, 1000]) {
    const depth = sceneDepth(1.1, distance);
    assert.ok(depth >= 0.2 && depth < 11.45);
  }
});
test('recycled objects are invisible at both boundaries', () => {
  assert.equal(depthOpacity(0.2), 0);
  assert.equal(depthOpacity(11.45), 0);
  assert.equal(depthOpacity(3), 1);
});
test('mobile overscroll cannot reverse the camera past the start', () => {
  assert.equal(travelDistance(-100, 844), 0);
  assert.ok(Number.isFinite(travelDistance(200, 0)));
});

// Exercise the actual component lifecycle with a browser event/animation harness.
function mountJourney(reduced = false, route = '/') {
  const window = new EventTarget();
  const document = new EventTarget();
  const media = new EventTarget();
  media.matches = reduced;
  document.hidden = false;
  const drawing = { setTransform() {}, clearRect() {}, drawImage() {}, beginPath() {}, arc() {}, fill() {} };
  const canvas = { dataset: {}, getContext: () => drawing };
  const refs = [canvas, { style: {} }];
  const effects = [];
  const pending = new Map();
  let sequence = 0;
  let now = 0;
  Object.assign(window, { innerWidth: 1200, innerHeight: 900, scrollY: 0, devicePixelRatio: 2, matchMedia: () => media, Image: class { complete = true; naturalWidth = 1448; naturalHeight = 1086; } });
  const exports = {};
  const source = readFileSync(new URL('../src/components/SpaceJourney.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(compiled, {
    exports, window, document,
    requestAnimationFrame: fn => { const id = ++sequence; pending.set(id, fn); return id; },
    cancelAnimationFrame: id => pending.delete(id),
    require: id => {
      if (id === 'react') return { useRef: () => ({ current: refs.shift() }), useEffect: fn => effects.push(fn) };
      if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
      if (id === 'next/navigation') return { usePathname: () => route };
      if (id === '@/lib/space-journey') return { sceneDepth, travelDistance, depthOpacity };
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  exports.default();
  const cleanup = effects.map(effect => effect());
  return {
    canvas, media, pending,
    scroll(y) { window.scrollY = y; window.dispatchEvent(new Event('scroll')); },
    settle() { for (let i = 0; pending.size && i < 200; i++) { const callbacks = [...pending.values()]; pending.clear(); now += 16; callbacks.forEach(fn => fn(now)); } assert.equal(pending.size, 0, 'animation must stop when idle'); },
    unmount() { cleanup.forEach(fn => fn?.()); },
  };
}

test('live scrolling settles, reverses, and stops scheduling after unmount', () => {
  const view = mountJourney();
  assert.equal(view.canvas.dataset.distance, '0.000');
  view.scroll(900); view.settle();
  assert.equal(view.canvas.dataset.distance, '1.500');
  view.scroll(0); view.settle();
  assert.equal(view.canvas.dataset.distance, '0.000');
  view.scroll(400); view.unmount();
  assert.equal(view.pending.size, 0);
  view.scroll(900);
  assert.equal(view.pending.size, 0);
});

test('reduced motion remains still and responds to preference changes at runtime', () => {
  const view = mountJourney(true);
  view.scroll(900);
  assert.equal(view.pending.size, 0);
  assert.equal(view.canvas.dataset.distance, '0.000');
  assert.equal(view.canvas.dataset.motion, 'reduced');
  view.media.matches = false; view.media.dispatchEvent(new Event('change'));
  assert.equal(view.canvas.dataset.distance, '1.500');
  view.scroll(1500); view.settle();
  assert.equal(view.canvas.dataset.distance, '2.500');
  view.media.matches = true; view.media.dispatchEvent(new Event('change'));
  assert.equal(view.canvas.dataset.distance, '0.000');
  view.unmount();
});

test('private routes do not create or animate the space scene', () => {
  const view = mountJourney(false, '/mission-control');
  view.scroll(900);
  assert.equal(view.pending.size, 0);
  assert.equal(view.canvas.dataset.distance, undefined);
  view.unmount();
});

test('each public destination selects its own scene and respects reduced motion', () => {
  for (const [route, scene] of [['/', 'threshold'], ['/travel', 'nebula'], ['/web', 'orbit']]) {
    const view = mountJourney(false, route);
    assert.equal(view.canvas.dataset.scene, scene);
    view.scroll(900); view.settle();
    assert.equal(view.canvas.dataset.distance, '1.500');
    view.media.matches = true; view.media.dispatchEvent(new Event('change'));
    assert.equal(view.canvas.dataset.distance, '0.000');
    view.unmount();
  }
});
