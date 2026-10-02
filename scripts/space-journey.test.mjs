import test from 'node:test';
import assert from 'node:assert/strict';
import { sceneDepth, travelDistance, depthOpacity, homeGateProjection, publishJourneyFrame, subscribeJourneyFrame, gateOrigin, isTunnelRoute } from '../src/lib/space-journey.ts';
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
  document.documentElement = { scrollHeight: 2700 };
  document.body = { dataset: {} };
  document.querySelector = () => null;
  const draws = [];
  const drawing = { setTransform() {}, clearRect() { draws.length = 0; }, drawImage(...args) { draws.push(args); }, beginPath() {}, arc() {}, fill() {} };
  const canvas = { dataset: {}, getContext: () => drawing };
  const globe = { dataset: {} };
  const refs = [canvas, globe, { style: {} }];
  const effects = [];
  const pending = new Map();
  let sequence = 0;
  let now = 0;
  Object.assign(window, { innerWidth: 1200, innerHeight: 900, scrollY: 0, devicePixelRatio: 2, matchMedia: () => media, Image: class { complete = true; naturalWidth = 1448; naturalHeight = 1086; } });
  const exports = {};
  const source = readFileSync(new URL('../src/components/SpaceJourney.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(compiled, {
    exports, window, document, Element: class {}, getComputedStyle: () => ({ overflowY: 'visible' }),
    requestAnimationFrame: fn => { const id = ++sequence; pending.set(id, fn); return id; },
    cancelAnimationFrame: id => pending.delete(id),
    require: id => {
      if (id === 'react') return { useRef: () => ({ current: refs.shift() }), useEffect: fn => effects.push(fn) };
      if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
      if (id === 'next/navigation') return { usePathname: () => route };
      if (id === '@/lib/reading-mode') return {getReadingMode:()=>document.body.dataset.readingMode==='read'?'read':'journey',READING_MODE_EVENT:'reading-mode-change'};
      if (id === '@/lib/earth-globe') return { createEarthPainter: target => rotation => { target.dataset.rotation = rotation.toFixed(3); } };
      if (id === '@/lib/space-journey') return { sceneDepth, travelDistance, depthOpacity, homeGateProjection, publishJourneyFrame, isTunnelRoute };
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  exports.default();
  const cleanup = effects.map(effect => effect());
  return {
    canvas, globe, media, pending, draws, window, document,
    input(type, props = {}) { const event = new Event(type); Object.assign(event, props); window.dispatchEvent(event); },
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

// Render the real HomeTunnel component with lightweight React/DOM adapters.
// This verifies that native scroll events update live content, not only math.
function mountHomeContent(view, { world = 'home', count = 6, workStart, contactStart, initialChapter = 0, nested = false, holdLastChapter = false } = {}) {
  const states = [];
  const refs = [];
  const effects = [];
  let stateIndex = 0;
  let refIndex = 0;
  let effectIndex = 0;
  const exports = {};
  const source = readFileSync(new URL('../src/components/HomeTunnel.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const jsx = (type, props) => ({ type, props });
  class LinkElement { constructor(anchor) { this.anchor=anchor; } closest() { return this.anchor; } }
  vm.runInNewContext(compiled, {
    exports, window: view.window, document: view.document, Element: LinkElement, CustomEvent, URL, Event,
    require: id => {
      if (id === 'react') return {
        Children: { toArray: children => Array.isArray(children) ? children : [children] },
        Fragment: "fragment", isValidElement: child => Boolean(child && child.props),
        useRef: initial => { const i = refIndex++; return refs[i] ??= { current: initial }; },
        useState: initial => { const i = stateIndex++; if (!(i in states)) states[i] = initial; return [states[i], value => { states[i] = value; }]; },
        useEffect: (callback, deps) => {
          const i = effectIndex++;
          const previous = effects[i];
          if (!previous || deps.some((dep, index) => dep !== previous.deps[index])) {
            previous?.cleanup?.();
            effects[i] = { callback, deps, pending: true };
          }
        },
      };
      if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
      if (id === '@/components/LoadingScreen') return { __esModule: true, default: 'LoadingScreen' };
      if (id === 'react-dom') return { createPortal: child => child };
      if (id === '@/lib/reading-mode') return {getReadingMode:()=>view.document.body.dataset.readingMode==='read'?'read':'journey',READING_MODE_EVENT:'reading-mode-change'};
      if (id === '@/lib/space-journey') return { gateOrigin, homeGateProjection, subscribeJourneyFrame, travelDistance };
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  view.window.location = { hash: '', href: 'http://localhost:3000/', origin: 'http://localhost:3000' };
  view.window.scrollTo = ({ top }) => view.scroll(top);
  const labels = Array.from({ length: count }, (_, index) => ['Identity', 'Facts', 'Missions', 'Loadout', 'Field note', 'Contact'][index] ?? `Chapter ${index + 1}`);
  const chapters = labels.map((label, index) => jsx('section', { id: ['about', 'facts', 'missions', 'loadout', 'field', 'contact'][index] ?? `chapter-${index + 1}`, children: label }));
  let gates = [];
  let buttons = [];
  let contents = [];
  let tree;
  let initialTree;
  function ids(node) {
    if (!node || typeof node !== 'object') return [];
    const children = Array.isArray(node.props?.children) ? node.props.children : [node.props?.children];
    return [...(node.props?.id ? [{ id: node.props.id }] : []), ...children.flatMap(ids)];
  }
  function attach(node) {
    if (Array.isArray(node)) { node.forEach(attach); return; }
    if (!node || typeof node !== 'object') return;
    const element = { getBoundingClientRect:()=>({top: Number(node.props?.["data-reading-chapter"] ?? 0)*1000-view.window.scrollY}), style: {}, dataset: {}, attributes: {}, inert: false, querySelectorAll: () => ids(node), setAttribute(name, value) { this.attributes[name] = value; } };
    if (node.props?.className === 'home-tunnel-gate') gates.push(element);
    if (node.props?.className?.includes('home-gate-content')) contents.push(node.props.className);
    if (node.type === 'button') buttons.push(node.props);
    if (typeof node.props?.ref === 'function') node.props.ref(element);
    else if (node.props?.ref) node.props.ref.current = element;
    attach(node.props?.children);
  }
  function render() {
    stateIndex = refIndex = effectIndex = 0;
    tree = exports.default({ children: nested ? [chapters[0], jsx('fragment', {children: chapters.slice(1)})] : chapters, labels, instruction: 'Scroll to navigate', world, workStart, contactStart, initialChapter, holdLastChapter });
    initialTree ??= tree;
    gates = []; buttons = []; contents = [];
    attach(tree);
    effects.forEach(effect => { if (effect.pending) { effect.pending = false; effect.cleanup = effect.callback(); } });
  }
  render(); render();
  return {
    get gates() { return gates; },
    get tree() { return tree; },
    get initialTree() { return initialTree; },
    get contents() { return contents; },
    chapterButton(index) { return buttons.filter(button => button.children === String(index + 1).padStart(2, '0'))[0]; },
    clickRoute(path, props={}) {
      const anchor={href:new URL(path,view.window.location.href).href,target:"",hasAttribute:()=>false};
      const event=new Event("click",{cancelable:true});
      Object.defineProperty(event,"target",{value:new LinkElement(anchor)});
      Object.assign(event,{button:0,...props});
      view.document.dispatchEvent(event);
      return event;
    },
    rerender: render,
    unmount() { effects.forEach(effect => effect.cleanup?.()); },
  };
}

test('native scroll grows live section content with the exact square, then restores on reverse', () => {
  const view = mountJourney();
  const content = mountHomeContent(view);
  const first = content.gates[0];
  const originalTransform = first.style.transform;
  const originalCenter = [first.style.left, first.style.top];
  const scale = () => Number(first.style.transform.match(/scale\(([^)]+)\)/)[1]);
  const startingScale = scale();
  assert.equal(first.inert, false);
  const runway = content.tree.props.children[0];
  assert.equal(runway.props.style.height, '900svh', 'real document height lets native wheel/touch scrolling advance the camera');
  view.scroll(200); view.settle();
  assert.ok(scale() > startingScale, 'section really grows after native scroll');
  assert.deepEqual([first.style.left, first.style.top], originalCenter, 'section stays centered, with no upward motion');
  const [, x, y, width, height] = view.draws.at(-1);
  assert.ok(Math.abs(width - scale() * 1280) < 0.001, 'content projection equals the rendered square width');
  assert.ok(Math.abs(x + width / 2 - parseFloat(first.style.left)) < 0.001);
  assert.ok(Math.abs(y + height / 2 - parseFloat(first.style.top)) < 0.001);
  view.scroll(1200); view.settle();
  assert.equal(first.style.visibility, 'hidden', 'passed content disappears instead of staying fixed on screen');
  assert.equal(content.gates[1].inert, false, 'the next section becomes interactive');
  view.scroll(0); view.settle();
  assert.equal(first.style.transform, originalTransform);
  content.unmount(); view.unmount();
});

test('chapter controls advance the native camera to the requested section', () => {
  const view = mountJourney();
  view.window.scrollTo = options => view.scroll(options.top);
  const content = mountHomeContent(view);
  content.chapterButton(2).onClick(); view.settle();
  assert.equal(view.window.scrollY, 2400);
  assert.equal(content.gates[2].inert, false);
  assert.equal(content.gates[0].style.visibility, 'hidden');
  content.unmount(); view.unmount();
});

test('reduced motion keeps all sections in the normal readable document', () => {
  const view = mountJourney(true);
  const content = mountHomeContent(view);
  assert.equal(content.tree.props.children[1].props.className, 'home-tunnel-static reading-layout');
  assert.equal(content.gates.length, 6);
  assert.ok(content.gates.every(gate=>gate.inert===false));
  content.unmount(); view.unmount();
});

test('unmounted section contents stop receiving camera updates', () => {
  const view = mountJourney();
  const content = mountHomeContent(view);
  const first = content.gates[0];
  const transform = first.style.transform;
  content.unmount();
  view.scroll(250); view.settle();
  assert.equal(first.style.transform, transform);
  view.unmount();
});

test('mobile squares and section contents share the same portrait projection', () => {
  const view = mountJourney();
  view.window.innerWidth = 390;
  view.window.innerHeight = 844;
  view.input('resize');
  const content = mountHomeContent(view);
  const first = content.gates[0];
  assert.equal(first.style.width, '420px');
  assert.ok(parseFloat(first.style.height) > parseFloat(first.style.width));
  const scale = () => Number(first.style.transform.match(/scale\(([^)]+)\)/)[1]);
  const originalScale = scale();
  view.scroll(150); view.settle();
  assert.ok(scale() > originalScale);
  const [, , , width] = view.draws.at(-1);
  assert.ok(Math.abs(width - scale() * 420) < 0.001);
  content.unmount(); view.unmount();
});

test('Work shares the exact square projection and reaches its final chapter', () => {
  for (const [world, count] of [['web', 8]]) {
    const view = mountJourney(false, `/${world}`);
    view.window.scrollTo = options => view.scroll(options.top);
    const content = mountHomeContent(view, { world, count });
    assert.equal(content.gates.length, count);
    assert.ok(content.contents.every(className => className.includes(`${world}-world`) && className.includes('tunnel-world-content')));
    const first = content.gates[0];
    const original = first.style.transform;
    view.scroll(200); view.settle();
    assert.notEqual(first.style.transform, original, `${world} responds to scrolling`);
    const scale = Number(first.style.transform.match(/scale\(([^)]+)\)/)[1]);
    const [, x, y, width, height] = view.draws.at(-1);
    assert.ok(Math.abs(width - scale * 1280) < 0.001, `${world} content matches its square`);
    assert.ok(Math.abs(x + width / 2 - parseFloat(first.style.left)) < 0.001);
    assert.ok(Math.abs(y + height / 2 - parseFloat(first.style.top)) < 0.001);
    content.chapterButton(count - 1).onClick(); view.settle();
    assert.equal(content.gates[count - 1].inert, false, `${world}'s final section can be used`);
    assert.equal(first.style.visibility, 'hidden');
    view.scroll(0); view.settle();
    assert.equal(first.style.transform, original);
    content.unmount(); view.unmount();
  }
});

test('world pages retain the static reading layout for reduced motion', () => {
  for (const world of ['web','travel','ski']) {
    const view = mountJourney(true, `/${world}`);
    const content = mountHomeContent(view, { world, count: 9 });
    assert.equal(content.tree.props.children[1].props.className, 'home-tunnel-static reading-layout');
    assert.equal(content.gates.length, 9);
    assert.ok(content.gates.every(gate=>gate.inert===false));
    content.unmount(); view.unmount();
  }
});

test('portal sprites are centered on the visible canvas', () => {
  const view = mountJourney(false, '/gallery');
  for (const [, x, y, width, height] of view.draws) {
    assert.ok(Math.abs(x + width / 2 - 600) < 0.0001);
    assert.ok(Math.abs(y + height / 2 - 450) < 0.0001);
  }
  assert.ok(view.draws.length > 0);
  view.unmount();
});

test('wheel input advances beyond non-tunnel pages and never doubles normal scroll', () => {
  const view = mountJourney(false, '/gallery');
  view.input('wheel', { deltaY: 900, deltaX: 0, deltaMode: 0 }); view.settle();
  assert.equal(view.canvas.dataset.distance, '0.000');
  view.scroll(1800); view.settle();
  assert.equal(view.canvas.dataset.distance, '3.000');
  view.input('wheel', { deltaY: 900, deltaX: 0, deltaMode: 0 }); view.settle();
  assert.equal(view.canvas.dataset.distance, '4.500');
  view.input('wheel', { deltaY: 900, deltaX: 0, deltaMode: 0, ctrlKey: true }); view.settle();
  assert.equal(view.canvas.dataset.distance, '4.500');
  view.scroll(900); view.settle();
  assert.equal(view.canvas.dataset.distance, '3.000', 'scrolling back immediately moves backward');
  view.unmount();
  view.input('wheel', { deltaY: 900, deltaX: 0, deltaMode: 0 });
  assert.equal(view.pending.size, 0);
});

test('touch and keyboard continue at non-tunnel bottom and reduced motion disables extra travel', () => {
  const view = mountJourney(false, '/gallery');
  view.scroll(1800); view.settle();
  view.input('touchstart', { touches: [{ clientY: 700 }] });
  view.input('touchmove', { touches: [{ clientY: 400 }] }); view.settle();
  assert.equal(view.canvas.dataset.distance, '3.500');
  view.input('touchend');
  view.input('keydown', { key: 'PageDown' }); view.settle();
  assert.equal(view.canvas.dataset.distance, '4.775');
  view.media.matches = true; view.media.dispatchEvent(new Event('change'));
  view.input('wheel', { deltaY: 900, deltaX: 0, deltaMode: 0 }); view.settle();
  assert.equal(view.canvas.dataset.distance, '0.000');
  view.unmount();
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

test('public destinations share the homepage scene and respect reduced motion', () => {
  for (const route of ['/', '/travel', '/web', '/ski', '/gallery', '/blog', '/contact']) {
    const view = mountJourney(false, route);
    assert.equal(view.canvas.dataset.scene, 'threshold');
    view.scroll(900); view.settle();
    assert.equal(view.canvas.dataset.distance, '1.500');
    view.media.matches = true; view.media.dispatchEvent(new Event('change'));
    assert.equal(view.canvas.dataset.distance, '0.000');
    view.unmount();
  }
});

test('combined journey changes the active header world on forward and reverse scroll', () => {
  const view = mountJourney();
  const changes = [];
  view.window.addEventListener('journey-page', event => changes.push(event.detail));
  const content = mountHomeContent(view, {count:15,workStart:6,nested:true});
  assert.equal(content.gates.length,15);
  assert.equal(view.document.body.dataset.journeyPage,'/');
  assert.ok(content.contents[0].includes('mission-site'));
  assert.ok(content.contents[6].includes('web-world'));
  view.scroll(7200); view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/web');
  assert.equal(content.gates[6].inert,false);
  view.scroll(6000); view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/');
  assert.deepEqual(changes,['/','/web','/']);
  view.scroll(16800); view.settle();
  assert.equal(content.gates[14].inert,false);
  const finalTransform=content.gates[14].style.transform;
  view.input('wheel',{deltaY:900,deltaX:0,deltaMode:0}); view.settle();
  assert.equal(content.gates[14].style.transform,finalTransform,'the last portals cannot be scrolled away');
  content.unmount();view.unmount();
});

test('direct Work entry starts at Work while keeping Home available behind it', () => {
  const view=mountJourney(false,'/web');
  const content=mountHomeContent(view,{count:15,workStart:6,initialChapter:6});
  view.settle();
  assert.equal(view.window.scrollY,7200);
  assert.equal(view.document.body.dataset.journeyPage,'/web');
  assert.equal(content.gates[6].inert,false);
  view.scroll(0);view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/');
  content.unmount();view.unmount();
});

test('Contact follows the world portals and restores the Work header on reverse scroll', () => {
  const view=mountJourney();
  const content=mountHomeContent(view,{count:16,workStart:6,contactStart:15});
  view.scroll(16800); view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/web');
  assert.equal(content.gates[14].inert,false);
  view.scroll(18000); view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/contact');
  assert.equal(view.document.body.dataset.motionWorld,'contact');
  assert.ok(content.contents[15].includes('contact-world'));
  assert.equal(content.gates[15].inert,false);
  view.input('wheel',{deltaY:900,deltaX:0,deltaMode:0});view.settle();
  assert.equal(content.gates[15].inert,false,'the final form stays interactive at the end');
  view.scroll(16800);view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/web');
  content.unmount();view.unmount();
});

test('direct Contact entry starts at the final form and allows scrolling back to Home', () => {
  const view=mountJourney(false,'/contact');
  const content=mountHomeContent(view,{count:16,workStart:6,contactStart:15,initialChapter:15});
  view.settle();
  assert.equal(view.window.scrollY,18000);
  assert.equal(view.document.body.dataset.journeyPage,'/contact');
  assert.equal(content.gates[15].inert,false);
  view.scroll(0);view.settle();
  assert.equal(view.document.body.dataset.journeyPage,'/');
  content.unmount();view.unmount();
});

test('Contact and Work navigation jump within the journey while modified clicks stay normal',()=>{
  const view=mountJourney();
  const content=mountHomeContent(view,{count:16,workStart:6,contactStart:15});
  assert.equal(content.clickRoute('/contact').defaultPrevented,true);view.settle();
  assert.equal(view.window.scrollY,18000);
  assert.equal(view.document.body.dataset.journeyPage,'/contact');
  assert.equal(content.clickRoute('/web').defaultPrevented,true);view.settle();
  assert.equal(view.window.scrollY,7200);
  assert.equal(view.document.body.dataset.journeyPage,'/web');
  assert.equal(content.clickRoute('/contact',{ctrlKey:true}).defaultPrevented,false);
  assert.equal(view.window.scrollY,7200);
  assert.equal(content.clickRoute('/').defaultPrevented,true);view.settle();
  assert.equal(view.window.scrollY,0);
  content.unmount();view.unmount();
});

test('startup shows a loader until the correct first projection is ready',()=>{
  const view=mountJourney(false,'/web');
  const content=mountHomeContent(view,{count:16,workStart:6,contactStart:15,initialChapter:6});
  assert.equal(content.initialTree.type,'LoadingScreen','the previous static layout is never rendered at startup');
  function find(node,predicate){if(Array.isArray(node))return node.flatMap(child=>find(child,predicate));if(!node||typeof node!=='object')return[];return[...(predicate(node)?[node]:[]),...find(node.props?.children,predicate)];}
  assert.equal(find(content.tree,node=>node.type==='LoadingScreen').length,1);
  view.settle();content.rerender();
  assert.equal(find(content.tree,node=>node.type==='LoadingScreen').length,0);
  assert.equal(find(content.tree,node=>node.props.className==='home-tunnel-stage')[0].props.style.visibility,'visible');
  assert.equal(content.gates[6].inert,false);
  content.unmount();view.unmount();
});

 test('Between shares the projected squares and holds its final contact action',()=>{
  const view=mountJourney(false,'/between');
  const content=mountHomeContent(view,{world:'between',count:5,holdLastChapter:true});
  view.settle();
  assert.ok(content.contents.every(value=>value.includes('between-world')));
  assert.equal(content.tree.props.children[0].props.style.height, String(100+4*2/1.5*100)+'vh');
  content.chapterButton(4).onClick();view.settle();
  assert.equal(content.gates[4].inert,false);
  const before=view.window.scrollY;
  view.input('wheel',{deltaY:1200});view.settle();
  assert.equal(view.window.scrollY,before,'extra input cannot scroll the final action away');
  content.unmount();view.unmount();
 });

 test('reading mode pauses the camera and switching back follows the chapter being read',()=>{
  const view=mountJourney(false,'/web');
  const content=mountHomeContent(view,{count:18,workStart:6,contactStart:17,initialChapter:6});
  view.settle();content.chapterButton(8).onClick();view.settle();
  const frozen=view.canvas.dataset.distance;
  view.document.body.dataset.readingMode='read';view.window.dispatchEvent(new Event('reading-mode-change'));
  content.rerender();content.rerender();
  assert.equal(content.tree.props.children[1].props.className,'home-tunnel-static reading-layout');
  assert.equal(view.window.scrollY,7850,'Read opens the same chapter');
  view.scroll(9400);view.settle();
  assert.equal(view.canvas.dataset.distance,frozen,'reading scroll never advances the camera');
  view.window.location.hash='#missions';
  view.document.body.dataset.readingMode='journey';view.window.dispatchEvent(new Event('reading-mode-change'));
  content.rerender();view.settle();content.rerender();
  assert.equal(view.window.scrollY,10800,'Journey returns to chapter nine rather than an old URL fragment');
  assert.equal(content.gates[9].inert,false);
  content.unmount();view.unmount();
 });
 test('a saved reading preference opens Work in the stationary layout',()=>{
  const view=mountJourney(false,'/web');
  view.document.body.dataset.readingMode='read';
  const content=mountHomeContent(view,{count:18,workStart:6,contactStart:17,initialChapter:6});
  content.rerender();
  assert.equal(content.tree.props.children[1].props.className,'home-tunnel-static reading-layout');
  assert.equal(view.window.scrollY,5850);
  content.unmount();view.unmount();
 });

test('Travel globe follows forward and reverse scroll and stays still with reduced motion', () => {
 const live=mountJourney(false,'/travel');live.settle();const start=live.globe.dataset.rotation;
 live.scroll(900);live.settle();assert.ok(Number(live.globe.dataset.rotation)>Number(start));
 live.scroll(0);live.settle();assert.equal(live.globe.dataset.rotation,start);live.unmount();
 const reduced=mountJourney(true,'/travel');const initial=reduced.globe.dataset.rotation;
 reduced.scroll(900);reduced.settle();assert.equal(reduced.globe.dataset.rotation,initial);reduced.unmount();
});

test('Travel and Ski section planes share the portal projection on forward and reverse scroll',()=>{
 for(const world of ['travel','ski']){
  const view=mountJourney(false,'/'+world);const content=mountHomeContent(view,{world,count:9});view.settle();
  view.scroll(720);view.settle();const projection=homeGateProjection(1,{distance:Number(view.canvas.dataset.distance),width:1200,height:900,reduced:false});
  const scale=Number(content.gates[1].style.transform.match(/scale\(([^)]+)\)/)[1]);
  assert.ok(Math.abs(parseFloat(content.gates[1].style.width)*scale-projection.width)<.001);
  view.scroll(0);view.settle();assert.equal(view.canvas.dataset.distance,'0.000');
  content.unmount();view.unmount();
 }
});
