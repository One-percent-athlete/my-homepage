import { readdir, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Use the image processor bundled with Next.js.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
const sharp = nextRequire('sharp');
const gallery = new URL('../public/gallery/', import.meta.url);
const variants = [
  { name: 'thumbnails', size: 1200, quality: 78 },
  { name: 'lightbox', size: 2400, quality: 85 },
];
const files = (await readdir(gallery)).filter(file => /\.jpg$/i.test(file));
let originalBytes = 0;
const totals = {};
for (const variant of variants) {
  await mkdir(new URL(`${variant.name}/`, gallery), { recursive: true });
  totals[variant.name] = 0;
}
// Process sequentially to limit memory use with large camera originals.
for (const file of files) {
  const source = fileURLToPath(new URL(file, gallery));
  originalBytes += (await stat(source)).size;
  for (const { name, size, quality } of variants) {
    const output = fileURLToPath(new URL(`${name}/${file.replace(/\.jpg$/i, '.webp')}`, gallery));
    const result = await sharp(source)
      .rotate()
      .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    totals[name] += result.size;
  }
}
console.log(JSON.stringify({ images: files.length, originalBytes, ...totals }, null, 2));
