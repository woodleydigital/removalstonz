#!/usr/bin/env node
/**
 * Render the raster brand assets in the IMC style:
 *   src/assets/img/og-default.png        1200×630 social sharing image
 *   src/assets/img/apple-touch-icon.png  180×180 home-screen icon
 *
 * Brand tooling only — not a site dependency. Needs Playwright's Chromium:
 *   node scripts/brand/raster.mjs <fonts-dir>
 *
 * The site sets headings in Georgia and text in Arial, which are system fonts.
 * A build machine may have neither, so this renders with their open
 * metric-compatible equivalents — Gelasio (OFL) for Georgia and Arimo
 * (Apache 2.0) for Arial — read from <fonts-dir> as gelasio-400.woff2,
 * arimo-400.woff2 and arimo-700.woff2 (from @fontsource). Set
 * PLAYWRIGHT_MODULE if playwright is not resolvable from here.
 */

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const IMG = join(ROOT, 'src/assets/img');
const FONTS = process.argv[2] || '.';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const b64 = async (f) => (await readFile(join(FONTS, f))).toString('base64');
const [gelasio, arimo, arimoBold] = await Promise.all(['gelasio-400.woff2', 'arimo-400.woff2', 'arimo-700.woff2'].map(b64));
const svg = (name) => readFile(join(IMG, name), 'utf8');
const markRev = await svg('rtnz-mark-reversed.svg');
const favicon = await svg('favicon.svg');

const fontFaces = `
@font-face { font-family: Georgia; src: url(data:font/woff2;base64,${gelasio}) format("woff2"); font-weight: 400; }
@font-face { font-family: Arial; src: url(data:font/woff2;base64,${arimo}) format("woff2"); font-weight: 400; }
@font-face { font-family: Arial; src: url(data:font/woff2;base64,${arimoBold}) format("woff2"); font-weight: 700; }`;

// IMC hero, as a card: ink field, open-corner eyebrow, Georgia display with
// the closing phrase in the light accent, a teal rule.
const og = `<!doctype html><html><head><style>${fontFaces}
html, body { margin: 0; }
body {
  width: 1200px; height: 630px; box-sizing: border-box; padding: 64px 80px 60px;
  background: #142D3B; color: #fff; font-family: Arial, sans-serif;
  display: flex; flex-direction: column; justify-content: space-between;
  border-top: 10px solid #167D8D;
}
.lockup { display: flex; align-items: center; gap: 26px; }
.lockup svg { height: 64px; width: auto; display: block; }
.name { border-left: 1px solid rgba(255,255,255,.3); padding-left: 24px; font-weight: 700; font-size: 26px; letter-spacing: .5px; }
.name small { display: block; font-weight: 400; font-size: 19px; color: #A7D2CE; letter-spacing: .5px; margin-top: 4px; }
.eyebrow { display: flex; align-items: center; gap: 14px; font-weight: 700; font-size: 18px; letter-spacing: 3px; text-transform: uppercase; color: #E8EEF0; margin-bottom: 22px; }
.eyebrow::before { content: ""; width: 14px; height: 14px; border-top: 3px solid currentColor; border-left: 3px solid currentColor; }
h1 { font-family: Georgia, serif; font-weight: 400; font-size: 78px; line-height: 1.04; letter-spacing: -2.6px; margin: 0; }
h1 span { color: #A7D2CE; }
.foot { display: flex; justify-content: space-between; font-size: 22px; color: rgba(255,255,255,.75); border-top: 1px solid rgba(255,255,255,.18); padding-top: 22px; }
</style></head><body>
<div class="lockup">${markRev}<div class="name">Removals to NZ<small>by International Moving Company</small></div></div>
<div><div class="eyebrow">International removals</div>
<h1>Removals to New Zealand,<br><span>door to door.</span></h1></div>
<div class="foot"><span>From the UK · USA · Australia · Canada · Europe</span><span>removalstonz.com</span></div>
</body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(og, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(IMG, 'og-default.png') });

  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  // Apple rounds the corners itself, so the tile is rendered square.
  await icon.setContent(`<html><body style="margin:0">${favicon
    .replace(/rx="\d+"/, 'rx="0"')
    .replace('<svg', '<svg style="width:180px;height:180px;display:block"')}</body></html>`);
  await icon.screenshot({ path: join(IMG, 'apple-touch-icon.png') });
  console.log('wrote og-default.png, apple-touch-icon.png');
} finally {
  await browser.close();
}
