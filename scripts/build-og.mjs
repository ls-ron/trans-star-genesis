// Builds public/og-image.png (1200x630): the wordmark on navy. Placeholder social-share image,
// used until assets/photos/og-share.jpg exists (see src/layouts/Base.astro).
// Usage: npm run og

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const W = 1200;
const H = 630;
const NAVY = '#1D3A66';

const src = fs.readFileSync(path.join(ROOT, 'assets/logo-wordmark-on-navy.svg'), 'utf8');
const [, , vbW, vbH] = src.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
const inner = src.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const markW = 760;
const markH = (markW / vbW) * vbH;
const x = (W - markW) / 2;
const y = (H - markH) / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <svg x="${x}" y="${y}" width="${markW}" height="${markH}" viewBox="0 0 ${vbW} ${vbH}">${inner}</svg>
</svg>`;

const out = path.join(ROOT, 'public/og-image.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote public/og-image.png');
