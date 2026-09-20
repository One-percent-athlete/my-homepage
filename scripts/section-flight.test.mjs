import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionFlight } from '../src/lib/section-flight.ts';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('incoming sections approach from behind, outgoing sections pass the viewer', () => {
  const incoming = sectionFlight(900, 900, 900);
  const reading = sectionFlight(0, 900, 900);
  const outgoing = sectionFlight(-800, 900, 900);
  assert.ok(incoming.z < 0 && incoming.y > 0 && incoming.opacity < 1);
  assert.equal(reading.z, 0);
  assert.equal(reading.opacity, 1);
  assert.ok(outgoing.z > 0 && outgoing.y < 0 && outgoing.opacity < 1);
});

test('long content stays fully readable throughout the middle of its scroll', () => {
  for (const top of [0, -600, -1400]) {
    const state = sectionFlight(top, 2400, 900);
    assert.equal(state.opacity, 1);
    assert.equal(state.z, 0);
  }
});

test('reverse scrolling restores the same pose without accumulated drift', () => {
  const start = sectionFlight(700, 900, 900);
  sectionFlight(-700, 900, 900);
  assert.deepEqual(sectionFlight(700, 900, 900), start);
});

test('mobile motion is smaller and less faded; extreme positions remain bounded', () => {
  const full = sectionFlight(900, 900, 900);
  const mobile = sectionFlight(900, 900, 900, true);
  assert.ok(Math.abs(mobile.z) < Math.abs(full.z));
  assert.ok(mobile.opacity > full.opacity);
  for (const top of [-1e6, 0, 1e6]) {
    const state = sectionFlight(top, 900, 0);
    assert.ok(Object.values(state).every(Number.isFinite));
    assert.ok(state.opacity >= 0.14 && state.opacity <= 1);
  }
});

test('component responds to reduced motion and cleans up scroll work', () => {
  const window = new EventTarget();
  const document = new EventTarget();
  const media = new EventTarget();
  const values = new Map();
  const classes = new Set();
  const element = {
    offsetTop: 800, offsetHeight: 900, offsetParent: null,
    style: { setProperty: (key, value) => values.set(key, value), removeProperty: key => values.delete(key) },
    classList: { add: (...names) => names.forEach(name => classes.add(name)), remove: (...names) => names.forEach(name => classes.delete(name)), toggle: (name, on) => on ? classes.add(name) : classes.delete(name) },
  };
  Object.assign(window, { innerWidth: 1440, innerHeight: 900, scrollY: 0, matchMedia: () => media });
  Object.assign(document, { hidden: false, querySelectorAll: () => [element] });
  media.matches = false;
  const queue = new Map();
  let sequence = 0;
  let cleanup;
  let disconnected = false;
  const exports = {};
  const source = readFileSync(new URL('../src/components/FloatingSections.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(compiled, {
    exports, window, document,
    ResizeObserver: class { observe() {} disconnect() { disconnected = true; } },
    requestAnimationFrame: callback => { queue.set(++sequence, callback); return sequence; },
    cancelAnimationFrame: id => queue.delete(id),
    require: id => {
      if (id === 'react') return { useEffect: fn => { cleanup = fn(); } };
      if (id === 'next/navigation') return { usePathname: () => '/' };
      if (id === '@/lib/section-flight') return { sectionFlight };
      throw new Error(id);
    },
  });
  const flush = () => { const pending = [...queue.values()]; queue.clear(); pending.forEach(fn => fn()); };
  exports.default();
  assert.ok(Number(values.get('--flight-opacity')) < 1);
  media.matches = true;
  media.dispatchEvent(new Event('change')); flush();
  assert.equal(values.size, 0, 'reduced motion removes animated styles');
  media.matches = false;
  media.dispatchEvent(new Event('change')); flush();
  assert.ok(values.has('--flight-transform'));
  window.dispatchEvent(new Event('scroll'));
  assert.equal(queue.size, 1);
  cleanup();
  assert.equal(queue.size, 0);
  assert.equal(values.size, 0);
  assert.equal(classes.size, 0);
  assert.ok(disconnected);
  window.dispatchEvent(new Event('scroll'));
  assert.equal(queue.size, 0);
});
