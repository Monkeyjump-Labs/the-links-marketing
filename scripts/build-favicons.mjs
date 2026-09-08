/**
 * Builds every favicon in `public/` from ONE source: the square brand logo at
 * `src/assets/images/links-logo-square.png`.
 *
 *   npm run favicons:build
 *
 * ── WHY A SCRIPT AND NOT JUST CHECKED-IN BINARIES ──────────────────────────
 *
 * The favicon it replaced was a 1.1KB .ico with no provenance — nobody could
 * say which artwork it came from or how to regenerate it at another size. Every
 * file this writes is derived, and the source and the crop are recorded here, so
 * a rebrand is: replace the source PNG, run this, commit.
 *
 * ── THE CROP IS A DECISION, AND IT WAS THE OWNER'S ─────────────────────────
 *
 * The source is a 3.24:1 wordmark ("THE LINKS / PREMIER INDOOR GOLF") sitting on
 * a square canvas that is mostly empty. Two crops were rendered at true size and
 * put to the owner on 2026-09-08:
 *
 *   the whole wordmark   at 16px it is a grey smear with no readable letter
 *   the ball mark alone  a 204x204 square inside the logo; legible at 16px
 *
 * The owner chose the whole wordmark, having seen both. So this trims the
 * artwork to its ink and centres it in a square — which is the most size the
 * wordmark can be given — rather than scaling the source with its empty margins,
 * which would waste roughly half the height on white.
 *
 * If that is ever revisited, the ball is `extract({ left: 1042, top: 618, width:
 * 204, height: 204 })` — measured, not eyeballed.
 *
 * ── THE .ICO IS PNG-PAYLOAD, WHICH IS FINE ─────────────────────────────────
 *
 * Entries are PNGs rather than BMPs. Every browser since IE11 reads that, it is
 * a quarter of the bytes, and it avoids hand-rolling a BMP encoder with an AND
 * mask. Written by hand because the repo has no ico dependency and this is 40
 * lines against a new package.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(root, 'src/assets/images/links-logo-square.png');
const PUBLIC = join(root, 'public');

/**
 * The ink bounding box of the source, measured by scanning it rather than
 * guessed. Re-measure if the artwork changes — a stale box crops the new mark.
 */
const INK = { left: 23, top: 618, width: 1965, height: 606 };

/** Trimmed to its ink, then centred on white in a square. */
async function squared() {
  return sharp(SOURCE)
    .flatten({ background: '#ffffff' })
    .extract(INK)
    .resize(INK.width, INK.width, { fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer();
}

/**
 * A slight sharpen after the downscale. At 16 and 32px a Lanczos reduction of
 * fine serif strokes goes soft enough to look like a rendering fault; this pulls
 * the edges back without haloing.
 */
async function png(base, size) {
  return sharp(base)
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .sharpen({ sigma: 0.5 })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** ICONDIR + ICONDIRENTRY[] + PNG payloads. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette size
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const base = await squared();

// 16/32/48 in the .ico: browsers pick per context (tab, bookmark bar, shortcut).
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(base, size) })));
await writeFile(join(PUBLIC, 'favicon.ico'), ico(icoImages));

// Standalone PNGs. 180 is Apple's home-screen size; 512 is the PWA/manifest size
// and the one that shows up in search results and share sheets.
const pngSizes = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-512.png', 512],
];
for (const [name, size] of pngSizes) {
  await writeFile(join(PUBLIC, name), await png(base, size));
}

const written = ['favicon.ico', ...pngSizes.map(([n]) => n)];
console.log(`favicons written from ${INK.width}x${INK.height} ink box:`);
for (const name of written) console.log(`  public/${name}`);
