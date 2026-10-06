// Builds the placeholder logo set from geometry + an outlined wordmark.
// Usage: npm run logo -- <path-to-Archivo-Expanded-ExtraBold.ttf>
// The font is only needed to outline the letters; it is not shipped with the site.
// Get a subset with: curl "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,800&text=TRANSTR%20"
// and download the .ttf URL in the returned CSS.

import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const RED = '#C8102E';
const NAVY = '#1D3A66';
const PAPER = '#F4F2ED';

const fontPath = process.argv[2];
if (!fontPath || !fs.existsSync(fontPath)) {
  console.error('Pass the path to an Archivo Expanded ExtraBold .ttf (see header comment).');
  process.exit(1);
}

const r2 = (n) => Math.round(n * 100) / 100;

// Five-point star, 10 vertices. Inner radius 0.40 of outer: a touch fuller than
// the geometric 0.382 so the points survive at 16px.
function starPoints(cx, cy, R, ratio = 0.4) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : R * ratio;
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}
const toPath = (pts) => 'M' + pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L') + 'Z';

// Star bounding box for R=50 centred at (0,0): x ±47.55, y -50..40.45
const STAR_W = 2 * 50 * Math.cos((18 * Math.PI) / 180); // 95.11
const STAR_H = 50 + 50 * Math.sin((54 * Math.PI) / 180); // 90.45
function star(x, y, h) {
  // place a star whose bounding box top-left is (x, y) and height is h
  const R = (h / STAR_H) * 50;
  const w = (h / STAR_H) * STAR_W;
  return { d: toPath(starPoints(x + w / 2, y + R, R)), w };
}

// 1. Mark only
const mark = star(0, 0, 90.45);
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r2(mark.w)} 90.45" role="img" aria-label="TRANS STAR"><path fill="${RED}" d="${mark.d}"/></svg>\n`;

// 2. Wordmark: star + outlined "TRANS STAR"
const font = opentype.parse(fs.readFileSync(fontPath).buffer);
const SIZE = 100;
const capH = (font.tables.os2.sCapHeight / font.unitsPerEm) * SIZE;
const starH = capH * 1.3;
const gap = SIZE * 0.34;
const starBox = star(0, 0, starH);
const textX = starBox.w + gap;
const baseline = starH / 2 + capH / 2; // centre the caps on the star
const textPath = font.getPath('TRANS STAR', textX, baseline, SIZE, { letterSpacing: 0.02 });
const bb = textPath.getBoundingBox();
const W = r2(bb.x2);
const H = r2(Math.max(starH, bb.y2));
const textD = textPath.toPathData(2);

const wordmark = (starFill, textFill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="TRANS STAR"><path class="wm-star" fill="${starFill}" d="${starBox.d}"/><path class="wm-text" fill="${textFill}" d="${textD}"/></svg>\n`;

// 3. Favicon: navy tile, red star with a cream outline (the flag's star treatment)
function tileSvg(size, radius) {
  const h = size * 0.66;
  const s = star(0, 0, h);
  const x = (size - s.w) / 2;
  const y = (size - h) / 2 + size * 0.02;
  const placed = star(x, y, h);
  const sw = size * 0.075;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/><path d="${placed.d}" fill="${PAPER}" stroke="${PAPER}" stroke-width="${r2(sw * 2)}" stroke-linejoin="round"/><path d="${placed.d}" fill="${RED}"/></svg>\n`;
}

function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, buf }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(buf.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.buf)]);
}

const out = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
  console.log('wrote', rel);
};

out('assets/logo.svg', markSvg);
out('assets/logo-wordmark.svg', wordmark(RED, 'currentColor'));
out('assets/logo-wordmark-on-navy.svg', wordmark(RED, PAPER));
out('assets/logo-wordmark-on-paper.svg', wordmark(RED, NAVY));

const favicon = tileSvg(32, 7);
out('public/favicon.svg', favicon);
const pngs = [];
for (const size of [16, 32, 48]) {
  pngs.push({ size, buf: await sharp(Buffer.from(favicon), { density: 72 * (size / 32) * 4 }).resize(size, size).png().toBuffer() });
}
out('public/favicon.ico', ico(pngs));
out('public/apple-touch-icon.png', await sharp(Buffer.from(tileSvg(180, 0))).png().toBuffer());
