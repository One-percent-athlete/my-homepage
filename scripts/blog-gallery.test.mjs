import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(path, imports = {}, globals = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, URL, console, process: { env: {} }, ...globals, require(id) {
    if (id in imports) return imports[id];
    throw new Error(`Unexpected import ${id}`);
  } });
  return exports;
}
const input = load('src/lib/blog-input.ts');
const images = load('src/lib/gallery-images.ts', { './blog-input': input });
const cover = 'https://res.cloudinary.com/demo/image/upload/v1/folder/cover.jpg';
const draft = { title: 'A new journey', slug: 'a-new-journey', content: 'A story about a new journey.', coverImage: cover, videoUrl: '', category: 'TRAVEL_CULTURE', showInGallery: true };

test('gallery sharing requires an uploaded image and a boolean preference', () => {
  assert.equal(input.validateBlogInput(draft).data.showInGallery, true);
  const legacy = { ...draft };
  delete legacy.showInGallery;
  assert.equal(input.validateBlogInput(legacy).data.showInGallery, false);
  for (const change of [{ coverImage: '' }, { showInGallery: 'true' }, { coverImage: 'https://evil.example/photo.jpg' }, { category: 'OTHER' }]) {
    assert.ok(input.validateBlogInput({ ...draft, ...change }).error);
  }
  assert.equal(input.validateBlogInput({ ...draft, coverImage: '', showInGallery: false }).data.showInGallery, false);
});

test('gallery delivery caps both dimensions while preserving version and folder', () => {
  assert.equal(images.cloudinaryGalleryImage(cover, 1200), 'https://res.cloudinary.com/demo/image/upload/c_limit,w_1200,h_1200,f_auto,q_auto/v1/folder/cover.jpg');
  assert.equal(images.cloudinaryGalleryImage('https://evil.example/a.jpg', 1200), null);
});

function apiHarness(initial = [], authorized = true) {
  const rows = initial.map(row => ({ ...row }));
  let writes = 0;
  const fields = Object.fromEntries(['id', 'title', 'slug', 'content', 'coverImage', 'videoUrl', 'category', 'showInGallery', 'createdAt'].map(key => [key, key]));
  const drizzle = { eq: (key, value) => row => row[key] === value, ne: (key, value) => row => row[key] !== value, isNotNull: key => row => row[key] != null, and: (...predicates) => row => predicates.every(fn => fn(row)), desc: key => key };
  const db = {
    select() {
      let predicate = () => true, count = Infinity, offset = 0;
      const query = {
        from() { return query; }, where(fn) { predicate = fn; return query; },
        orderBy() { return query; }, limit(value) { count = value; return query; }, offset(value) { offset = value; return query; },
        then(resolve) { return Promise.resolve(rows.filter(predicate).slice(offset, offset + count)).then(resolve); },
      };
      return query;
    },
    insert() { return { values(data) { return { async returning() { writes++; const row = { id: `post-${rows.length}`, ...data }; rows.push(row); return [row]; } }; } }; },
    update() { return { set(data) { return { where(predicate) { return { async returning() { writes++; const row = rows.find(predicate); if (!row) return []; Object.assign(row, data); return [row]; } }; } }; } }; },
  };
  const imports = {
    'next/server': { NextResponse: { json: (data, options = {}) => ({ data, status: options.status ?? 200, headers: options.headers }) } },
    '@/db': { db }, '@/db/schema': { posts: fields }, 'drizzle-orm': drizzle,
    '@/lib/admin-auth': { ADMIN_COOKIE: 'session', verifyAdminSession: async () => authorized },
    '@/lib/blog-input': input, '@/lib/gallery-images': images,
  };
  const request = (path, body = draft) => ({ url: `https://example.com${path}`, nextUrl: new URL(`https://example.com${path}`), cookies: { get() { return { value: 'session' }; } }, headers: { get() { return null; } }, json: async () => body });
  return { rows, writes: () => writes, request, create: load('src/app/api/blog/route.ts', imports), edit: load('src/app/api/blog/[slug]/route.ts', imports), gallery: load('src/app/api/gallery/route.ts', imports) };
}

test('publishing adds one gallery image; editing replaces it; unchecking removes it', async () => {
  const api = apiHarness();
  const created = await api.create.POST(api.request('/api/blog'));
  assert.equal(created.status, 201);
  let gallery = await api.gallery.GET(api.request('/api/gallery'));
  assert.equal(gallery.data.images.length, 1);
  const identity = gallery.data.images[0].id;
  const revised = { ...draft, title: 'Updated journey', coverImage: cover.replace('cover.jpg', 'replacement.jpg') };
  assert.equal((await api.edit.PATCH(api.request('/api/blog/a-new-journey', revised))).status, 200);
  gallery = await api.gallery.GET(api.request('/api/gallery'));
  assert.equal(gallery.data.images.length, 1);
  assert.equal(gallery.data.images[0].id, identity);
  assert.equal(gallery.data.images[0].title, revised.title);
  assert.match(gallery.data.images[0].thumbnail, /replacement\.jpg$/);
  await api.edit.PATCH(api.request('/api/blog/a-new-journey', { ...revised, showInGallery: false }));
  assert.equal((await api.gallery.GET(api.request('/api/gallery'))).data.images.length, 0);
  assert.equal(api.rows.length, 1);
  assert.equal(api.rows[0].content, draft.content);
});

test('unauthorized or invalid requests cannot create or modify gallery entries', async () => {
  const locked = apiHarness([], false);
  assert.equal((await locked.create.POST(locked.request('/api/blog'))).status, 401);
  assert.equal((await locked.edit.PATCH(locked.request('/api/blog/a-new-journey'))).status, 401);
  assert.equal(locked.writes(), 0);
  const api = apiHarness();
  assert.equal((await api.create.POST(api.request('/api/blog', { ...draft, coverImage: '' }))).status, 400);
  assert.equal(api.writes(), 0);
  assert.equal((await api.edit.PATCH(api.request('/api/blog/missing'))).status, 404);
});

test('gallery hides unselected covers and paginates without loading blog content', async () => {
  const api = apiHarness([
    { ...draft, id: 'hidden', showInGallery: false },
    { ...draft, id: 'empty', coverImage: '' },
    ...Array.from({ length: 25 }, (_, index) => ({ ...draft, id: `visible-${index}` })),
  ]);
  const page = await api.gallery.GET(api.request('/api/gallery'));
  assert.equal(page.data.images.length, 24);
  assert.equal(page.data.nextOffset, 24);
  assert.equal(page.headers['Cache-Control'], 'no-store');
  assert.ok(page.data.images.every(image => !('content' in image)));
  const last = await api.gallery.GET(api.request('/api/gallery?offset=24'));
  assert.equal(last.data.images.length, 1);
  assert.equal(last.data.nextOffset, null);
  assert.equal((await api.gallery.GET(api.request('/api/gallery?offset=-1'))).status, 400);
});

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(child => nodes(child, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props?.children, predicate)];
}

function editor(initialPost, response = { ok: true, status: 200, json: async () => ({}) }) {
  const hooks = [], requests = [], navigation = [];
  let cursor = 0;
  const jsx = (type, props) => ({ type, props });
  const imports = {
    react: { useState(initial) { const slot = cursor++; if (!(slot in hooks)) hooks[slot] = initial; return [hooks[slot], next => { hooks[slot] = next; }]; } },
    'react/jsx-runtime': { jsx, jsxs: jsx }, 'next/navigation': { useRouter: () => ({ push: path => navigation.push(path), refresh() {} }) },
    'next-cloudinary': { CldUploadWidget: 'upload' }, uuid: { v4: () => 'tag' },
    'next/image': { __esModule: true, default: 'image' }, 'next/link': { __esModule: true, default: 'link' },
    '@/components/CustomCursor': { __esModule: true, default: 'cursor' }, '@/components/FloatingButtons': { __esModule: true, default: 'buttons' },
  };
  const component = load('src/components/blog/BlogPostEditor.tsx', imports, { fetch: async (url, options) => { requests.push({ url, ...options }); return response; } });
  const render = () => { cursor = 0; return component.default({ initialPost }); };
  return { render, requests, navigation, submit: () => nodes(render(), node => node.type === 'form')[0].props.onSubmit({ preventDefault() {} }) };
}

test('editing uses PATCH, keeps the existing slug, and preserves a failed draft', async () => {
  const form = editor(draft, { ok: false, status: 500, json: async () => ({ error: 'Please retry' }) });
  nodes(form.render(), node => node.type === 'input' && node.props.value === draft.title)[0].props.onChange({ target: { value: 'Changed title' } });
  nodes(form.render(), node => node.props?.id === 'show-in-gallery')[0].props.onChange({ target: { checked: false } });
  await form.submit();
  assert.equal(form.requests[0].method, 'PATCH');
  assert.equal(form.requests[0].url, '/api/blog/a-new-journey');
  const body = JSON.parse(form.requests[0].body);
  assert.equal(body.slug, draft.slug);
  assert.equal(body.title, 'Changed title');
  assert.equal(body.showInGallery, false);
  assert.equal(nodes(form.render(), node => node.type === 'input' && node.props.value === 'Changed title').length, 1);
  assert.equal(nodes(form.render(), node => node.props?.role === 'alert')[0].props.children, 'Please retry');
  assert.equal(form.navigation.length, 0);
});

test('creation publishes the uploaded cover with the checked gallery preference', async () => {
  const form = editor();
  nodes(form.render(), node => node.type === 'input' && node.props.type === 'text')[0].props.onChange({ target: { value: draft.title } });
  nodes(form.render(), node => node.type === 'textarea')[0].props.onChange({ target: { value: draft.content } });
  nodes(form.render(), node => node.type === 'upload')[0].props.onSuccess({ info: { secure_url: cover } });
  nodes(form.render(), node => node.props?.id === 'show-in-gallery')[0].props.onChange({ target: { checked: true } });
  await form.submit();
  assert.equal(form.requests[0].method, 'POST');
  assert.equal(JSON.parse(form.requests[0].body).coverImage, cover);
  assert.equal(JSON.parse(form.requests[0].body).showInGallery, true);
  assert.deepEqual(form.navigation, ['/blog']);
});

function galleryView(response) {
  const hooks = [], effects = [];
  let cursor = 0;
  const jsx = (type, props) => ({ type, props });
  const component = load('src/app/gallery/page.tsx', {
    react: {
      useState(initial) { const slot = cursor++; if (!(slot in hooks)) hooks[slot] = initial; return [hooks[slot], next => { hooks[slot] = typeof next === 'function' ? next(hooks[slot]) : next; }]; },
      useCallback: fn => fn, useEffect: fn => effects.push(fn),
    },
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    'next/image': { __esModule: true, default: 'image' }, 'next/link': { __esModule: true, default: 'link' },
    'lucide-react': {}, '@/components/FloatingButtons': { __esModule: true, default: 'buttons' },
    '@/app/context/LanguageContext': { useLanguage: () => ({ language: 'en' }) },
    './gallery-copy': load('src/app/gallery/gallery-copy.ts'),
    './Gallery.module.css': { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) },
  }, { AbortController, fetch: async () => response });
  const render = () => { cursor = 0; return component.default(); };
  render();
  const cleanup = effects[0]();
  return { render, cleanup };
}

test('gallery combines archive and blog photos and opens the linked story in its lightbox', async () => {
  const photo = { id: 'post-one', title: draft.title, slug: draft.slug, thumbnail: images.cloudinaryGalleryImage(cover, 1200), full: images.cloudinaryGalleryImage(cover, 2400) };
  const view = galleryView({ ok: true, json: async () => ({ images: [photo], nextOffset: null }) });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(nodes(view.render(), node => node.type === 'image').length, 15);
  nodes(view.render(), node => node.type === 'button' && nodes(node, child => child.type === 'h2' && child.props.children === draft.title).length)[0].props.onClick();
  const dialog = nodes(view.render(), node => node.props?.role === 'dialog')[0];
  assert.equal(nodes(dialog, node => node.type === 'image')[0].props.src, photo.full);
  assert.equal(nodes(dialog, node => node.type === 'link')[0].props.href, `/blog/${draft.slug}`);
  view.cleanup();
});

test('gallery keeps its original photos and offers retry when blog photos fail', async () => {
  const view = galleryView({ ok: false });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(nodes(view.render(), node => node.type === 'image').length, 14);
  assert.equal(nodes(view.render(), node => node.props?.role === 'alert').length, 1);
  assert.equal(nodes(view.render(), node => node.type === 'button' && node.props.children === 'Try again').length, 1);
  view.cleanup();
});
