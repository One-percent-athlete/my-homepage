import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function mountTransition({ reduced = false } = {}) {
  const source = readFileSync(new URL('../src/components/WorldTransition.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const document = new EventTarget();
  const effects = [];
  const timers = new Map();
  const pushes = [];
  const states = [];
  let sequence = 0;
  class Element { constructor(anchor) { this.anchor = anchor; } closest() { return this.anchor; } }
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, document, Element, URL,
    window: { location: { href: 'http://localhost:3000/', origin: 'http://localhost:3000' }, matchMedia: () => ({ matches: reduced }) },
    setTimeout: (fn, delay) => { const id = ++sequence; timers.set(id, { fn, delay }); return id; },
    clearTimeout: id => timers.delete(id),
    require: id => {
      if (id === 'react') return { useEffect: callback => effects.push(callback), useRef: value => ({ current: value }), useState: value => [value, next => states.push(next)] };
      if (id === 'next/navigation') return { usePathname: () => '/', useRouter: () => ({ push: path => pushes.push(path) }) };
      if (id === '@/app/context/LanguageContext') return { useLanguage: () => ({ language: 'en' }) };
      if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
      throw new Error(id);
    },
  });
  exports.default();
  const cleanup = effects.map(callback => callback());
  return {
    pushes, states,
    click(path, props = {}) {
      const anchor = { href: new URL(path, 'http://localhost:3000/').href, target: '', hasAttribute: () => false, ...props.anchor };
      const event = new Event('click', { cancelable: true });
      Object.defineProperty(event, 'target', { value: new Element(anchor) });
      Object.assign(event, { button: 0, ...props });
      document.dispatchEvent(event);
      return event;
    },
    advance(delay) { for (const [id, timer] of [...timers]) if (timer.delay <= delay) { timers.delete(id); timer.fn(); } },
    unmount() { cleanup.forEach(fn => fn?.()); },
  };
}

test('world links show a transition before routing to the selected destination', () => {
  for (const destination of ['/travel', '/ski', '/blog', '/gallery']) {
    const view = mountTransition();
    view.advance(180);
    assert.equal(view.click(destination).defaultPrevented, true);
    assert.equal(view.states.at(-1), destination);
    assert.equal(view.pushes.length, 0);
    view.advance(450);
    assert.deepEqual(view.pushes, [destination]);
    view.unmount();
  }
});

test('modified clicks, external links and reduced motion retain normal navigation', () => {
  for (const [destination, props] of [['/travel', { ctrlKey: true }], ['/ski', { metaKey: true }], ['/blog', { button: 1 }], ['/gallery', { anchor: { target: '_blank' } }], ['https://example.com/travel', {}], ['/contact', {}]]) {
    const view = mountTransition();
    assert.equal(view.click(destination, props).defaultPrevented, false);
    view.advance(450);
    assert.equal(view.pushes.length, 0);
    view.unmount();
  }
  const reduced = mountTransition({ reduced: true });
  assert.equal(reduced.click('/ski').defaultPrevented, false);
  assert.equal(reduced.states.includes('/ski'), false);
  reduced.unmount();
});

test('leaving the transition cancels delayed navigation', () => {
  const view = mountTransition();
  view.click('/travel');
  view.unmount();
  view.advance(8000);
  assert.equal(view.pushes.length, 0);
});

test('rapid portal clicks keep the original transition destination', () => {
  const view=mountTransition();
  view.click('/ski');
  assert.equal(view.click('/travel').defaultPrevented,true);
  view.advance(450);
  assert.deepEqual(view.pushes,['/ski']);
  view.unmount();
});
