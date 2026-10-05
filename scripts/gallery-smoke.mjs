import assert from 'node:assert/strict';

const base = process.env.GALLERY_TEST_URL || 'http://localhost:3000';
const request = (path, options) => fetch(new URL(path, base), { signal: AbortSignal.timeout(60000), ...options });
const gallery = await request('/api/gallery');
assert.equal(gallery.status, 200, 'The gallery API must be available');
const data = await gallery.json();
assert.ok(Array.isArray(data.images));
assert.ok(data.images.length <= 24);
assert.ok(data.images.every(image => image.thumbnail.includes('c_limit,w_1200,h_1200') && image.full.includes('c_limit,w_2400,h_2400')));
const create = await request('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
assert.equal(create.status, 401, 'Anonymous publishing must be blocked');
const edit = await request('/api/blog/smoke-check-missing', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: '{}' });
assert.equal(edit.status, 401, 'Anonymous editing must be blocked');
const manager = await request('/mission-control/blog', { redirect: 'manual' });
assert.ok([307, 308].includes(manager.status));
assert.match(manager.headers.get('location'), /mission-control\/login/);
console.log(`Gallery API OK (${data.images.length} selected covers); anonymous writes and management access blocked.`);
