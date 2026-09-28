#!/usr/bin/env node
/**
 * Render the raster brand assets from the SVG logo set:
 *   src/assets/img/og-default.png        1200×630 social sharing image
 *   src/assets/img/apple-touch-icon.png  180×180 home-screen icon
 *
 * Needs Playwright's Chromium (not a site dependency — brand tooling only):
 *   node scripts/brand/raster.mjs
 * Set PLAYWRIGHT_MODULE if playwright is not resolvable from here.
 */

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const IMG = join(ROOT, 'src/assets/img');
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const font = (await readFile(join(ROOT, 'src/assets/fonts/outfit-latin-700.woff2'))).toString('base64');
const svg = (name) => readFile(join(IMG, name), 'utf8');
const reversed = await svg('removals-to-nz-logo-reversed.svg');
const favicon = await svg('favicon.svg');

const og = `<!doctype html><html><head><style>
@font-face { font-family: Outfit; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 700; }
html, body { margin: 0; }
body {
  width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 80px;
  font-family: Outfit, sans-serif; color: #eef3f8;
  background:
    radial-gradient(ellipse 55% 75% at 92% 0%, rgba(127, 111, 199, .45), transparent 70%),
    linear-gradient(170deg, #0c2233 0%, #172a4f 55%, #3a3470 100%);
  display: flex; flex-direction: column; justify-content: space-between;
}
.logo svg { height: 150px; width: auto; display: block; }
h1 { font-size: 64px; line-height: 1.05; margin: 0; letter-spacing: -1px; max-width: 16ch; }
p { margin: 18px 0 0; font-size: 28px; color: #7fdce6; letter-spacing: .5px; }
.foot { display: flex; justify-content: space-between; align-items: end; font-size: 24px; color: #afc0cc; }
.swell { height: 10px; width: 280px; border-radius: 10px; background: #12a3b5; }
</style></head><body>
<div class="logo">${reversed}</div>
<div><h1>International removals to New Zealand</h1>
<p>From the UK · USA · Australia · Canada · Europe</p></div>
<div class="foot"><span>removalstonz.com</span><span class="swell"></span></div>
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
    .replace('rx="28"', 'rx="0"')
    .replace('<svg', '<svg style="width:180px;height:180px;display:block"')}</body></html>`);
  await icon.screenshot({ path: join(IMG, 'apple-touch-icon.png') });
  console.log('wrote og-default.png, apple-touch-icon.png');
} finally {
  await browser.close();
}
