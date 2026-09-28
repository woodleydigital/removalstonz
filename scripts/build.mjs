#!/usr/bin/env node
/**
 * Static site build.
 *
 * Produces a fully pre-rendered site in dist/. Every indexable route is a real
 * HTML file with its title, canonical, robots directive, H1, primary copy and
 * contextual internal links present in the initial HTML — the playbook's rule
 * 01 and section 4.3, satisfied by construction rather than by configuration.
 *
 * No dependencies. Node 20+.
 */

import { mkdir, writeFile, readFile, rm, readdir, copyFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

import { PAGES, SITEMAP_HINTS } from '../src/data/pages/index.js';
import { SITE_URL, BRAND_ENTITY, CONTACT } from '../src/data/site.js';
import { MARKETS, MARKET_ORDER } from '../src/data/markets.js';
import { buildAlternates } from '../src/lib/i18n.js';
import { layout } from '../src/templates/layout.js';
import { TEMPLATES } from '../src/templates/index.js';
import { missingLogos } from '../src/lib/components.js';
import { setAssetManifest } from '../src/lib/assets.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const hash = (content) => createHash('sha256').update(content).digest('hex').slice(0, 8);

/**
 * Read an image's intrinsic size from its own bytes, so width/height attributes
 * are always the file's real dimensions rather than a number someone typed.
 * PNG carries them in the IHDR chunk; SVG in its viewBox or width/height.
 */
function imageSize(buf, ext) {
  if (ext === '.png' && buf.length > 24 && buf.readUInt32BE(12) === 0x49484452) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (ext === '.svg') {
    const head = buf.toString('utf8', 0, 1024);
    const vb = head.match(/viewBox=["']\s*[-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
    const w = head.match(/\bwidth=["'](\d+)/i);
    const h = head.match(/\bheight=["'](\d+)/i);
    if (w && h) return { width: +w[1], height: +h[1] };
  }
  return {};
}

/**
 * Copy images out to dist under content-hashed names, returning a manifest of
 * logical path -> { src, width, height }. Hashing is what makes it safe to
 * cache them immutably: a changed file gets a new URL, so no stale copy can
 * survive.
 */
async function copyImages(from, to, prefix = '/img') {
  await mkdir(to, { recursive: true });
  const entries = [];
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    if (entry.isDirectory()) {
      entries.push(...(await copyImages(src, join(to, entry.name), `${prefix}/${entry.name}`)));
      continue;
    }
    const buf = await readFile(src);
    const ext = extname(entry.name);
    const stem = entry.name.slice(0, -ext.length || undefined);
    const hashed = `${stem}.${hash(buf)}${ext}`;
    await writeFile(join(to, hashed), buf);
    entries.push([
      `${prefix}/${entry.name}`,
      { src: `${prefix}/${hashed}`, ...imageSize(buf, ext.toLowerCase()) }
    ]);
  }
  return entries;
}

async function writePage(path, html) {
  // "/services/" -> dist/services/index.html ; "/" -> dist/index.html
  const file = path === '/' ? 'index.html' : join(path.replace(/^\/|\/$/g, ''), 'index.html');
  const out = join(DIST, file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
  return out;
}

/**
 * sitemap.xml with hreflang. Each URL in a cluster lists the whole cluster as
 * xhtml:link alternates — the same set its <head> carries, from the same
 * computation, so the two can never disagree.
 */
function sitemap(pages) {
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const hint = SITEMAP_HINTS[p.path] || { priority: '0.6', changefreq: 'yearly' };
      return [
        '  <url>',
        `    <loc>${SITE_URL}${p.path}</loc>`,
        ...(p.alternates || []).map(
          (a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`
        ),
        p.updated ? `    <lastmod>${p.updated}</lastmod>` : null,
        `    <changefreq>${hint.changefreq}</changefreq>`,
        `    <priority>${hint.priority}</priority>`,
        '  </url>'
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/**
 * /llms.txt — a curated, machine-readable map of the site.
 *
 * An assistant asked "what does moving to New Zealand from the UK cost" arrives
 * with no crawl of its own. Handed one small markdown file, it gets the market
 * structure, the route list and what each route is for, without fetching forty
 * documents. Generated from the page data, so it cannot drift.
 */
function llmsTxt(pages) {
  const indexable = pages.filter((p) => !p.noindex);
  const entry = (p) => `- [${p.h1 || p.title}](${SITE_URL}${p.path}): ${p.description}`;
  const claimed = new Set();
  const section = (heading, match) => {
    const rows = indexable.filter((p) => !claimed.has(p.path) && match(p));
    rows.forEach((p) => claimed.add(p.path));
    return rows.length ? [`## ${heading}`, '', ...rows.map(entry), ''].join('\n') : null;
  };

  const blocks = [
    ...MARKET_ORDER.map((k) => section(`Moving to New Zealand ${MARKETS[k].from}`, (p) => p.market === k)),
    section('New Zealand destinations', (p) => p.path.startsWith('/destinations/')),
    section('Guides and tools', (p) => /^\/(guides|tools)\//.test(p.path)),
    section('About and legal', (p) => /^\/(about|legal|contact)\//.test(p.path))
  ].filter(Boolean);
  const home = indexable.find((p) => p.path === '/');

  return [
    `# ${BRAND_ENTITY.name}`,
    '',
    `> ${BRAND_ENTITY.description}`,
    '',
    'The site is organised by the country you are moving FROM: /uk/, /us/, /au/, /ca/ and /europe/ each carry their own costs, shipping times and quote form. Everything about the New Zealand end — destination cities, NZ Customs, MPI biosecurity and planning guides — is shared by all markets.',
    '',
    'Prices on this site are planning ranges, never quotes: a quote follows a survey. Every figure a reader could act on carries a review date on the page that states it.',
    '',
    home ? entry(home) : null,
    home ? '' : null,
    ...blocks,
    '## Contact',
    '',
    `- Enquiries: ${CONTACT.email}`,
    `- Quote request form: ${SITE_URL}/get-a-quote/`,
    `- Full route list with hreflang: ${SITE_URL}/sitemap.xml`,
    ''
  ]
    .filter((line) => line !== null)
    .join('\n');
}

const robots = () => `# ${SITE_URL}/robots.txt
# robots.txt controls crawling. Indexing is controlled by meta robots on each
# page — see the playbook, section 4.3.

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

/**
 * HTML minifier — a cost-of-retrieval measure, not a vanity metric.
 *
 * Deliberately conservative. It strips comments, removes leading indentation and
 * collapses blank lines, which is where nearly all the waste in a templated
 * document lives. It does NOT join adjacent tags (`>\n<` -> `><`): that would
 * silently delete meaningful whitespace between inline elements and glue words
 * together. Content inside pre, textarea and script is left untouched.
 */
function minifyHtml(html) {
  const protect = [];
  // Park anything whitespace-sensitive before touching the document.
  html = html.replace(
    /<(pre|textarea|script)\b[\s\S]*?<\/\1>/gi,
    (m) => `\u0000${protect.push(m) - 1}\u0000`
  );

  html = html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '') // drop authoring comments
    .replace(/^[ \t]+/gm, '') // drop indentation
    .replace(/[ \t]+$/gm, '') // drop trailing spaces
    .replace(/\n{2,}/g, '\n') // collapse blank lines
    .trim();

  return html.replace(/\u0000(\d+)\u0000/g, (_m, i) => protect[Number(i)]);
}

/**
 * Minimal JS minifier: strips comments and indentation, nothing else.
 *
 * It does not rename or restructure anything, so the shipped bundle still reads
 * as the source did — but comments and indentation are 44% of this file, and
 * they are pure cost of retrieval. The scanner tracks string, template and
 * regex state so a `//` inside a string or a `/.../` literal is never mistaken
 * for a comment, and the result is compiled before it is written: a strip that
 * broke the syntax fails the build rather than shipping.
 */
function minifyJs(src) {
  let out = '';
  let i = 0;
  let prev = ''; // last significant character emitted, for regex-vs-division
  while (i < src.length) {
    const c = src[i];
    const next = src[i + 1];

    if (c === '/' && next === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && next === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      let j = i + 1;
      while (j < src.length && src[j] !== quote) j += src[j] === '\\' ? 2 : 1;
      out += src.slice(i, j + 1);
      prev = quote;
      i = j + 1;
      continue;
    }
    // A `/` after a value is division; after an operator or punctuation it opens
    // a regex literal, whose contents must survive untouched.
    if (c === '/' && !/[\w)\]}'"`]/.test(prev)) {
      let j = i + 1;
      let inClass = false;
      while (j < src.length) {
        if (src[j] === '\\') j += 2;
        else if (src[j] === '[') { inClass = true; j++; }
        else if (src[j] === ']') { inClass = false; j++; }
        else if (src[j] === '/' && !inClass) break;
        else j++;
      }
      while (j + 1 < src.length && /[gimsuyd]/.test(src[j + 1])) j++;
      out += src.slice(i, j + 1);
      prev = '/';
      i = j + 1;
      continue;
    }
    out += c;
    if (!/\s/.test(c)) prev = c;
    i++;
  }

  return out
    .replace(/^[ \t]+/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/** Minimal, safe CSS minifier: strips comments and collapses whitespace. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

async function build() {
  const started = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // --- Assets, content-hashed so they can be cached immutably -------------
  // The IMC identity uses system fonts only (Georgia and Arial), so there are
  // no webfonts to hash or preload.
  const cssRaw = await readFile(join(SRC, 'assets/css/main.css'), 'utf8');
  const css = minifyCss(cssRaw);
  const cssHash = hash(css);
  await mkdir(join(DIST, 'css'), { recursive: true });
  await writeFile(join(DIST, 'css', `main.${cssHash}.css`), css, 'utf8');

  const jsRaw = await readFile(join(SRC, 'assets/js/app.js'), 'utf8');
  const js = minifyJs(jsRaw);
  // Compile it. A minifier that produced invalid JS must never reach dist/.
  new Script(js, { filename: 'app.js' });
  const jsHash = hash(js);
  await mkdir(join(DIST, 'js'), { recursive: true });
  await writeFile(join(DIST, 'js', `app.${jsHash}.js`), js, 'utf8');

  // Images must be hashed and registered before any page renders, because the
  // templates resolve their src attributes through the manifest.
  const imageManifest = await copyImages(join(SRC, 'assets/img'), join(DIST, 'img'));
  setAssetManifest(imageManifest);

  const assets = { cssHash, jsHash };

  // --- International targeting --------------------------------------------
  // hreflang clusters are derived from the route map once, then attached to
  // each page so the <head>, the sitemap and the market switcher all read
  // the same list.
  const alternates = buildAlternates(PAGES);
  for (const page of PAGES) page.alternates = alternates.get(page.path) || [];

  // --- Pages --------------------------------------------------------------
  const seenPaths = new Set();
  for (const page of PAGES) {
    if (seenPaths.has(page.path)) {
      throw new Error(`Duplicate route: ${page.path}`);
    }
    seenPaths.add(page.path);

    const template = TEMPLATES[page.template];
    if (!template) throw new Error(`Unknown template "${page.template}" for ${page.path}`);

    const body = template(page);
    const html = minifyHtml(layout(page, body, assets));
    await writePage(page.path, html);
  }

  // --- Crawl controls -----------------------------------------------------
  await writeFile(join(DIST, 'sitemap.xml'), sitemap(PAGES), 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robots(), 'utf8');
  await writeFile(join(DIST, 'llms.txt'), llmsTxt(PAGES), 'utf8');

  // --- Hosting config ------------------------------------------------------
  // Vercel reads vercel.json at the repo root, so nothing needs emitting here.
  // Netlify and Cloudflare Pages read a _headers file from the output instead;
  // set EMIT_HEADERS_FILE=1 to produce one for those hosts.
  if (process.env.EMIT_HEADERS_FILE) {
    await writeFile(
      join(DIST, '_headers'),
      `/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
`,
      'utf8'
    );
  }

  // 404 page so a host serving it does not return a soft 404 (playbook 4.2).
  await writeFile(
    join(DIST, '404.html'),
    minifyHtml(layout(
      {
        path: '/404/',
        template: 'page',
        noindex: true,
        title: 'Page not found | Removals to NZ',
        description: 'That page does not exist.',
        crumbs: [{ href: '/', label: 'Home' }]
      },
      `<div class="wrap section wrap--narrow"><div class="prose">
        <h1>That page does not exist</h1>
        <p>The link may be out of date, or the address may have a typo in it. Choose where you are moving from:</p>
        <ul>
          ${MARKET_ORDER.map((k) => `<li><a href="${MARKETS[k].prefix}">Removals to New Zealand ${MARKETS[k].from}</a></li>`).join('\n          ')}
          <li><a href="/destinations/">Where in New Zealand we deliver</a></li>
          <li><a href="/guides/">Guides to moving to New Zealand</a></li>
          <li><a href="/get-a-quote/">Get a quote</a></li>
        </ul>
      </div></div>`,
      assets
    )),
    'utf8'
  );

  const ms = Date.now() - started;
  console.log(`Built ${PAGES.length} pages in ${ms}ms`);
  console.log(`  css/main.${cssHash}.css  ${(css.length / 1024).toFixed(1)} kB`);
  console.log(
    `  js/app.${jsHash}.js      ${(js.length / 1024).toFixed(1)} kB` +
      `  (from ${(jsRaw.length / 1024).toFixed(1)} kB)`
  );
  console.log(`  img/                     ${imageManifest.length} files, content-hashed`);
  console.log(`  → ${DIST}`);

  if (missingLogos.length) {
    console.log('');
    console.log('  NOTE: affiliation logo file(s) not found, badge fallback used:');
    for (const l of missingLogos) console.log(`    ${l}  (drop the partner-supplied svg/png/webp at src/assets/img/)`);
  }
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
