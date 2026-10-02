import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Inspect the real JSX and translated collections without mounting animations.
function renderComponent(path, props = {}, language = 'en', exportName = 'default') {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(compiled, {
    exports,
    require: id => {
      if (id === 'react') return { useEffect() {}, useState: value => [value, () => {}], useRef: value => ({ current: value }) };
      if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
      if (id === 'framer-motion') return { motion: new Proxy({}, { get: (_, tag) => tag }), AnimatePresence: 'fragment' };
      if (id === '@/app/context/LanguageContext') return { useLanguage: () => ({ language }) };
      if (id === '@/components/WorkJourney') return { useWorkJourney: () => renderComponent('../src/components/WorkJourney.tsx', {}, language, 'useWorkJourney') };
      if (id === '@/lib/exploration') return { recordWorldStep() {} };
      if (id === 'lucide-react' || id.startsWith('react-icons/')) return new Proxy({}, { get: (_, icon) => icon });
      if (id.startsWith('@/components/') || id === '@/app/page' || id === 'next/link' || id === 'next/image') return { __esModule: true, default: id };
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  return exports[exportName](props);
}

function findAll(node, predicate) {
  if (Array.isArray(node)) return node.flatMap(child => findAll(child, predicate));
  if (!node || typeof node !== 'object') return [];
  return [...(predicate(node) ? [node] : []), ...findAll(node.props?.children, predicate)];
}

test('Work offers nine reusable chapters in every language', () => {
  for (const language of ['en','ja','zh']) {
    const work = renderComponent('../src/components/WorkJourney.tsx', {}, language, 'useWorkJourney');
    assert.equal(work.content.props.children.flat(Infinity).length, 9);
    assert.equal(work.labels.length, 9);
    assert.ok(work.labels.every(label => label.length > 0));
  }
});

test('Travel and Ski retain their content outside the tunnel', () => {
  for (const language of ['en','ja','zh']) {
    for (const path of ['../src/components/travel/TravelContent.tsx','../src/components/ski/SkiContent.tsx']) {
      const tree = renderComponent(path, {}, language);
      assert.equal(findAll(tree, node => node.type === '@/components/HomeTunnel').length, 0);
      assert.equal(findAll(tree, node => node.type === 'main').length, 1);
    }
    const ski = renderComponent('../src/components/ski/SkiContent.tsx', {}, language);
    const packages = findAll(ski, node => node.type === '@/components/ski/SkiPackages');
    assert.equal(packages.length, 1);
    assert.equal(packages[0].props.packageIndex, undefined);
  }
});

test('the final portals link to all four other worlds in every language', () => {
  for (const language of ['en','ja','zh']) {
    const tree = renderComponent('../src/components/WorldPortals.tsx', {}, language);
    const links = findAll(tree, node => node.props?.['data-world-portal'] === true);
    assert.deepEqual(Array.from(links, node => node.props.href), ['/travel','/ski','/blog','/gallery']);
  }
});

test('unified toolkit retains nine tools without role explanations in every language', () => {
  for (const language of ['en', 'ja', 'zh']) {
    const work=renderComponent('../src/components/WorkJourney.tsx',{},language,'useWorkJourney');
    assert.equal(findAll(work.content,node=>node.type==='@/components/web/SkillCardGrid').length,1);
    const tree=renderComponent('../src/components/web/SkillCardGrid.tsx',{},language);
    const titles=findAll(tree,node=>node.type==='h3').map(node=>node.props.children);
    assert.equal(titles.length,9);
    assert.equal(findAll(tree,node=>node.type==='button').length,0);
    assert.equal(findAll(tree,node=>node.props?.id==='capability-readout').length,0);
    assert.equal(findAll(work.content,node=>node.type==='@/components/web/LogoShowcase').length,0,'there is no duplicate showcase chapter');
    assert.equal(new Set(titles).size, 9);
    assert.ok(titles.includes('Python') && titles.includes('Node.js'));
  }
});

test('each build has its own chapter and retains its original live demo link', () => {
  for (const language of ['en', 'ja', 'zh']) {
    const work=renderComponent('../src/components/WorkJourney.tsx',{},language,'useWorkJourney');
    const chapters=findAll(work.content,node=>node.type==='@/components/web/ProjectCardGrid');
    assert.equal(chapters.length,6);
    assert.ok(chapters.every(node=>node.props.count===1));
    const batches = [0,1,2,3,4,5].map(startIndex => {
      const tree = renderComponent('../src/components/web/ProjectCardGrid.tsx', { startIndex, count: 1 }, language);
      const links = findAll(tree, node => node.type === 'a' && node.props.href?.startsWith('/demos/'));
      return new Set(links.map(node => node.props.href));
    });
    assert.ok(batches.every(batch=>batch.size===1));
    assert.equal(new Set(batches.flatMap(batch=>[...batch])).size, 6);
    assert.ok(batches[5].has('/demos/smart-matching'));
  }
});

test('ski package chapters retain each lesson option and its contact action', () => {
  for (const language of ['en', 'ja', 'zh']) {
    const all = renderComponent('../src/components/ski/SkiPackages.tsx', { language });
    const titles = findAll(all, node => node.type === 'h3').map(node => node.props.children);
    assert.equal(titles.length, 3);
    for (let packageIndex = 0; packageIndex < 3; packageIndex++) {
      const tree = renderComponent('../src/components/ski/SkiPackages.tsx', { language, packageIndex });
      const headings = findAll(tree, node => node.type === 'h3');
      assert.equal(headings.length, 1);
      assert.equal(headings[0].props.children, titles[packageIndex]);
      assert.ok(findAll(tree, node => node.type === 'a' && node.props.href === '/contact').length >= 1);
    }
  }
});

test('Home composes the full seventeen-chapter journey and Work opens at chapter six', () => {
  for (const language of ['en','ja','zh']) {
    const tree=renderComponent('../src/components/MainJourney.tsx',{},language);
    const [tunnel]=findAll(tree,node=>node.type==='@/components/HomeTunnel');
    assert.equal(tunnel.props.workStart,6);
    assert.equal(tunnel.props.contactStart,16);
    assert.equal(tunnel.props.showNavigation,false);
    const [contact]=findAll(tunnel,node=>node.type==='@/components/Contact');
    assert.equal(contact.props.embedded,true);
    assert.equal(tunnel.props.labels.length,17);
    const flatten=node=>Array.isArray(node) ? node.flatMap(flatten) : node?.type==='fragment' ? node.props.children.flatMap(flatten) : [node];
    assert.equal(tunnel.props.children.flatMap(flatten).length,17);
    assert.equal(findAll(tunnel,node=>node.type==='@/components/WorldPortals').length,1);
  }
  const work=renderComponent('../src/app/web/page.tsx');
  assert.equal(work.type,'@/components/MainJourney');
  assert.equal(work.props.initialWorld,'web');
});

test('Contact keeps the existing form, validation and contact methods inside its square', () => {
  const tree=renderComponent('../src/components/Contact.tsx',{embedded:true});
  assert.equal(findAll(tree,node=>node.type==='@/components/FloatingButtons').length,0);
  assert.equal(findAll(tree,node=>node.type==='section' && node.props.id==='contact').length,1);
  const [form]=findAll(tree,node=>node.type==='form');
  assert.equal(typeof form.props.onSubmit,'function');
  assert.equal(findAll(form,node=>node.props.id==='contact-email')[0].props.required,true);
  assert.equal(findAll(form,node=>node.props.id==='contact-message')[0].props.minLength,10);
  assert.ok(findAll(tree,node=>node.type==='a' && node.props.href?.startsWith('mailto:')).length>0);
  const route=renderComponent('../src/app/contact/page.tsx');
  assert.equal(route.props.initialWorld,'contact');
});
