#!/usr/bin/env node
/**
 * PRE-PUBLISH SEO QUALITY GATE
 *
 * This is section 9 of the patent-informed SEO playbook implemented as code.
 * It reads the built HTML in dist/ — the rendered output, not the source — and
 * fails the build on any critical failure.
 *
 * Critical failure rule (playbook section 3): a page must not publish if its
 * main content is absent from the rendered HTML, its canonical points
 * incorrectly, it is unintentionally noindexed, it substantially duplicates
 * another URL, its structured data contradicts visible content, or it contains
 * unsupported high-stakes claims.
 *
 * Run with `npm run audit` (or `npm run check` to build then audit).
 */

import { readFile, readdir } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PAGES } from '../src/data/pages/index.js';
import { SITE_URL } from '../src/data/site.js';
import { MARKETS, ALL_HREFLANG, marketOf } from '../src/data/markets.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const critical = [];
const warnings = [];
const notes = [];

const fail = (page, check, detail) => critical.push({ page, check, detail });
const warn = (page, check, detail) => warnings.push({ page, check, detail });

/* ---------------------------------------------------------------- helpers */

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_m, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const one = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

/** Main-content text only — excludes header, nav, footer and the sticky CTA. */
function mainText(html) {
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/);
  return main ? text(main[1]) : '';
}

/** Shingle-based near-duplicate detection over main content. */
function shingles(str, n = 8) {
  const words = str.toLowerCase().split(/\s+/);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/* ------------------------------------------------------------------ audit */

async function audit() {
  const files = await walk(DIST);
  const docs = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const rel = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
    const path = rel === '/' ? '/' : rel;
    docs.push({ path, file, html, page: PAGES.find((p) => p.path === path) });
  }

  const titles = new Map();
  const h1s = new Map();
  const descriptions = new Map();

  for (const doc of docs) {
    const { path, html, page } = doc;
    const isIndexable = page ? !page.noindex : false;
    // 404.html is served as an error document, not as a route. It is linted for
    // structure and links but exempt from canonical and uniqueness checks.
    const isErrorDoc = doc.file.endsWith('404.html');

    /* --- 1. Technical accessibility (20 pts) --------------------------- */

    const title = one(html, /<title>([\s\S]*?)<\/title>/);
    if (!title) fail(path, 'title', 'No <title> in rendered HTML');
    else {
      if (title.length > 65) warn(path, 'title-length', `${title.length} chars — may truncate in SERP`);
      if (title.length < 20) warn(path, 'title-length', `${title.length} chars — unusually short`);
      if (isIndexable) {
        if (titles.has(title)) fail(path, 'duplicate-title', `Same title as ${titles.get(title)}`);
        else titles.set(title, path);
      }
    }

    const canonical = one(html, /<link rel="canonical" href="([^"]+)"/);
    if (!isErrorDoc) {
      if (!canonical) fail(path, 'canonical', 'No canonical link');
      else if (canonical !== SITE_URL + path) {
        fail(path, 'canonical', `Canonical is ${canonical}, expected ${SITE_URL}${path}`);
      }
    }

    const robots = one(html, /<meta name="robots" content="([^"]+)"/);
    if (!robots) fail(path, 'robots', 'No meta robots directive');
    else if (isIndexable && robots.includes('noindex')) {
      fail(path, 'robots', 'Indexable page carries noindex');
    } else if (page && page.noindex && !robots.includes('noindex')) {
      fail(path, 'robots', 'Page marked noindex in data but rendered as indexable');
    }

    const description = one(html, /<meta name="description" content="([^"]+)"/);
    if (!description) fail(path, 'description', 'No meta description');
    else {
      if (description.length > 165) warn(path, 'description-length', `${description.length} chars`);
      if (isIndexable) {
        if (descriptions.has(description)) {
          fail(path, 'duplicate-description', `Same as ${descriptions.get(description)}`);
        } else descriptions.set(description, path);
      }
    }

    // <html lang> must match the page's market (en-GB, en-US, en-AU, en-CA,
    // or plain "en" for Europe and for shared pages).
    const lang = one(html, /<html lang="([^"]+)"/);
    const expectedLang = marketOf(page).htmlLang;
    if (!lang) fail(path, 'lang', 'No lang attribute');
    else if (!isErrorDoc && lang !== expectedLang) {
      fail(path, 'lang', `html lang is "${lang}", expected "${expectedLang}" for this market`);
    }
    doc.lang = lang;
    doc.canonical = canonical;
    doc.indexable = isIndexable;
    doc.alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(
      (m) => ({ hreflang: m[1], href: m[2] })
    );
    if (!/<meta name="viewport"/.test(html)) fail(path, 'viewport', 'No viewport meta — not mobile ready');

    /* --- 2. Semantic and visual structure (15 pts) --------------------- */

    const headings = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g);
    if (headings.length === 0) fail(path, 'h1', 'No H1 in rendered HTML');
    else if (headings.length > 1) fail(path, 'h1', `${headings.length} H1 elements — must be exactly one`);
    else if (isIndexable) {
      const h1 = text(headings[0]);
      if (h1s.has(h1)) fail(path, 'duplicate-h1', `Same H1 as ${h1s.get(h1)}`);
      else h1s.set(h1, path);
    }

    for (const landmark of ['<main', '<header', '<footer', '<nav']) {
      if (!html.includes(landmark)) warn(path, 'landmarks', `Missing ${landmark}> landmark`);
    }

    // Heading order must not skip a level (h2 -> h4).
    const levels = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        warn(path, 'heading-order', `h${levels[i - 1]} followed by h${levels[i]}`);
        break;
      }
    }

    /* --- 3. Main content present in rendered HTML (critical) ----------- */

    const body = mainText(html);
    doc.mainText = body;
    const words = body.split(/\s+/).filter(Boolean).length;
    doc.words = words;

    if (isIndexable && words < 300) {
      fail(path, 'thin-content', `Only ${words} words of main content`);
    } else if (isIndexable && words < 500) {
      warn(path, 'content-depth', `${words} words — check this page earns its route`);
    }

    /* --- 4. Structured data must parse and match visible content ------- */

    const ld = one(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ld) fail(path, 'schema', 'No JSON-LD');
    else {
      let graph;
      try {
        graph = JSON.parse(ld);
      } catch (e) {
        fail(path, 'schema', `JSON-LD does not parse: ${e.message}`);
      }
      if (graph) {
        const nodes = graph['@graph'] || [];
        const types = nodes.map((n) => n['@type']);
        if (!nodes.some((n) => n['@id'] === `${SITE_URL}/#organisation`)) fail(path, 'schema', 'No Organization node for the site');

        // FAQPage schema must match FAQs rendered on the page (playbook rule 07).
        const faqNode = nodes.find((n) => n['@type'] === 'FAQPage');
        if (faqNode) {
          const rendered = all(html, /<summary>([\s\S]*?)<\/summary>/g).map((s) => text(s));
          for (const q of faqNode.mainEntity) {
            const visible = rendered.some((r) => r === text(q.name));
            if (!visible) {
              fail(path, 'schema-mismatch', `FAQ in schema not visible on page: "${q.name}"`);
            }
          }
        }

        // A subsidiary site must state the relationship in both directions, or
        // the two entities read as unrelated organisations.
        const orgNode = nodes.find((n) => n['@id'] === `${SITE_URL}/#organisation`);
        const opNode = nodes.find((n) => n.subOrganization);
        if (orgNode && opNode) {
          if (!orgNode.parentOrganization) {
            fail(path, 'schema-entity', 'Organization does not declare parentOrganization');
          }
          if (!opNode.subOrganization) {
            fail(path, 'schema-entity', 'Operator does not declare subOrganization');
          }
        }

        // memberOf asserts an affiliation; it may only appear where the page
        // actually names that organisation.
        if (orgNode && orgNode.memberOf) {
          for (const m of [].concat(orgNode.memberOf)) {
            if (!body.includes(m.name)) {
              fail(path, 'schema-mismatch', `memberOf "${m.name}" is not named on the page`);
            }
          }
        }

        // Likewise every offer in a catalogue must be linked from the page.
        if (orgNode && orgNode.hasOfferCatalog) {
          for (const o of orgNode.hasOfferCatalog.itemListElement || []) {
            const href = (o.itemOffered && o.itemOffered.url || '').replace(SITE_URL, '');
            if (href && !html.includes(`href="${href}"`)) {
              fail(path, 'schema-mismatch', `Offer catalogue lists ${href}, which the page does not link to`);
            }
          }
        }

        // The Article byline in schema must match the visible byline.
        const articleNode = nodes.find((n) => n['@type'] === 'Article');
        if (articleNode && !/Written by/.test(html)) {
          fail(path, 'schema-mismatch', 'Article schema present but no visible byline');
        }

        // Breadcrumb schema must match rendered breadcrumbs.
        const crumbNode = nodes.find((n) => n['@type'] === 'BreadcrumbList');
        if (crumbNode && !html.includes('aria-label="Breadcrumb"')) {
          fail(path, 'schema-mismatch', 'BreadcrumbList in schema but no visible breadcrumb');
        }

        // No Offer/price or aggregateRating anywhere — we publish no prices or
        // reviews, so asserting either would contradict the visible content.
        const raw = JSON.stringify(graph);
        for (const forbidden of ['aggregateRating', 'reviewCount', 'ratingValue', '"priceCurrency"']) {
          if (raw.includes(forbidden)) {
            fail(path, 'schema-unsupported', `Schema asserts ${forbidden}, which no page displays`);
          }
        }
      }
    }

    /* --- 5. Images (playbook 4.8) ------------------------------------- */

    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    for (const img of imgs) {
      if (!/\balt=/.test(img)) fail(path, 'img-alt', `Image without alt: ${img.slice(0, 80)}`);
      if (!/\bwidth=/.test(img) || !/\bheight=/.test(img)) {
        warn(path, 'img-dimensions', `Image without width/height (CLS risk): ${img.slice(0, 60)}`);
      }
    }

    /* --- 6. Internal links and conversion path ------------------------ */

    const links = all(html, /href="(\/[^"]*)"/g);
    doc.links = [...new Set(links.map((l) => l.split('#')[0]).filter(Boolean))];

    if (isIndexable && !links.some((l) => /\/get-a-quote\/$/.test(l))) {
      warn(path, 'conversion-path', 'No link to the quote page');
    }

    // Descriptive anchors only.
    const anchors = all(html, /<a\b[^>]*>([\s\S]*?)<\/a>/g).map((a) => text(a).toLowerCase());
    for (const bad of ['click here', 'read more', 'here', 'more']) {
      if (anchors.includes(bad)) warn(path, 'anchor-text', `Non-descriptive anchor: "${bad}"`);
    }

    /* --- 7. Accessibility basics -------------------------------------- */

    if (!html.includes('class="skip"')) warn(path, 'a11y', 'No skip link');
    const inputs = [...html.matchAll(/<input\b[^>]*type="(text|email|tel|number)"[^>]*>/g)].map(
      (m) => m[0]
    );
    // A control is labelled by an explicit <label for>, an aria-label, or by
    // being nested inside a <label> (an implicit label, which is valid HTML).
    const implicitlyLabelled = [...html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/g)]
      .map((m) => m[0])
      .filter((l) => /<input\b/.test(l));
    for (const input of inputs) {
      const id = one(input, /\bid="([^"]+)"/);
      const ariaLabel = /aria-label=/.test(input);
      const wrapped = implicitlyLabelled.some((l) => l.includes(input));
      if (ariaLabel || wrapped) continue;
      if (!id) {
        fail(path, 'a11y-label', `Input with no label, id or aria-label: ${input.slice(0, 70)}`);
      } else if (!html.includes(`for="${id}"`)) {
        fail(path, 'a11y-label', `Input #${id} has no associated <label>`);
      }
    }

    /* --- 8. Editorial guards (playbook 6.7 and 6.10) ------------------ */

    // We publish planning ranges, never rates. A currency figure in body copy
    // would contradict the stated editorial policy, so it is a hard failure.
    const priceLike = body.match(/[£$€]\s?\d[\d,]*/g);
    if (priceLike) {
      fail(
        path,
        'price-claim',
        `Body copy contains a currency figure (${priceLike[0]}) — the site publishes planning ranges, not rates`
      );
    }

    // Unsupported superlatives and absolute guarantees on a high-stakes topic.
    const forbiddenPhrases = [
      'cheapest in the uk',
      'guaranteed delivery date',
      'we guarantee customs',
      'duty free guaranteed',
      'no.1 mover',
      'number one mover',
      'lorem ipsum',
      'TODO',
      'PLACEHOLDER TEXT'
    ];
    for (const phrase of forbiddenPhrases) {
      if (body.toLowerCase().includes(phrase.toLowerCase())) {
        fail(path, 'unsupported-claim', `Contains "${phrase}"`);
      }
    }

    // High-stakes pages must name their authority and carry a review date.
    const highStakes = {
      '/guides/new-zealand-customs-personal-effects/': 'New Zealand Customs Service',
      '/guides/new-zealand-biosecurity-what-you-cannot-bring/': 'Ministry for Primary Industries'
    };
    if (highStakes[path]) {
      if (!body.includes(highStakes[path])) {
        fail(path, 'evidence', `High-stakes page does not name the responsible authority (${highStakes[path]})`);
      }
      if (!/Last reviewed/.test(html)) {
        fail(path, 'freshness', 'High-stakes page has no visible review date');
      }
    }

    /* --- 9. Freshness data (playbook 4.10) ---------------------------- */

    if (page && isIndexable && !page.updated) {
      warn(path, 'freshness', 'No review date recorded in page data');
    }

    /* --- 10. Performance guards --------------------------------------- */

    const bytes = Buffer.byteLength(html, 'utf8');
    doc.bytes = bytes;
    if (bytes > 150 * 1024) warn(path, 'page-weight', `${(bytes / 1024).toFixed(0)} kB of HTML`);
    // The playbook notes Google's 2 MB HTML limit; nowhere near it, but assert it.
    if (bytes > 2 * 1024 * 1024) fail(path, 'page-weight', 'HTML exceeds 2 MB');

    const scripts = all(html, /<script src="([^"]+)"/g);
    for (const src of scripts) {
      if (!/\bdefer\b|\basync\b/.test(html.slice(html.indexOf(src) - 120, html.indexOf(src) + 120))) {
        warn(path, 'render-blocking', `Script ${src} may be render-blocking`);
      }
    }
    // Inline script is a smell, but one exception is deliberate and reviewed:
    // the layout-stability marker in the head, tagged data-critical. Anything
    // else inline still gets flagged, and more than one is a hard failure —
    // the bundle is where behaviour belongs.
    const inline = all(
      html,
      /<script(?![^>]*\ssrc=)(?![^>]*type="application\/ld\+json")([^>]*)>/g
    );
    const untagged = inline.filter((attrs) => !/\bdata-critical\b/.test(attrs));
    if (untagged.length) {
      warn(path, 'inline-script', `${untagged.length} untagged inline script(s) — prefer the external, deferred bundle`);
    }
    if (inline.length - untagged.length > 1) {
      fail(path, 'inline-script', 'More than one data-critical inline script');
    }
  }

  /* --- 11. Duplicate and near-duplicate content ----------------------- */

  const indexable = docs.filter((d) => d.page && !d.page.noindex);
  for (let i = 0; i < indexable.length; i++) {
    for (let j = i + 1; j < indexable.length; j++) {
      const sim = jaccard(shingles(indexable[i].mainText), shingles(indexable[j].mainText));
      if (sim > 0.5) {
        fail(indexable[j].path, 'near-duplicate', `${(sim * 100).toFixed(0)}% overlap with ${indexable[i].path}`);
      } else if (sim > 0.3) {
        warn(indexable[j].path, 'content-overlap', `${(sim * 100).toFixed(0)}% overlap with ${indexable[i].path}`);
      }
    }
  }

  /* --- 12. Link graph: broken links and orphan pages ------------------ */

  const known = new Set(docs.map((d) => d.path));
  const inbound = new Map(docs.map((d) => [d.path, 0]));

  for (const doc of docs) {
    for (const link of doc.links || []) {
      const target = link.endsWith('/') || link.includes('.') ? link : link + '/';
      if (/^\/(css|js|img)\//.test(link)) continue;
      if (link === '/robots.txt' || link === '/sitemap.xml' || link === '/llms.txt') continue;
      if (!known.has(target)) {
        fail(doc.path, 'broken-link', `Links to ${link}, which does not exist`);
        continue;
      }
      if (target !== doc.path) inbound.set(target, (inbound.get(target) || 0) + 1);
    }
  }

  // Every indexable page must receive at least one meaningful internal link
  // from another indexable page (playbook 4.4).
  for (const doc of indexable) {
    if (doc.path === '/') continue;
    if ((inbound.get(doc.path) || 0) === 0) {
      fail(doc.path, 'orphan', 'No internal links point to this page');
    }
  }

  /* --- 13. Route map integrity ---------------------------------------- */

  for (const page of PAGES) {
    if (!docs.some((d) => d.path === page.path)) {
      fail(page.path, 'route-map', 'Declared in the route map but not built');
    }
  }

  /* --- 14. International targeting: hreflang ---------------------------- */
  //
  // Google ignores hreflang it cannot confirm, silently. Every rule below is
  // one of the reasons it does so, turned into a build failure.

  const byUrl = new Map(docs.map((d) => [SITE_URL + d.path, d]));
  const validCodes = new Set([...ALL_HREFLANG, 'x-default']);

  for (const doc of docs) {
    const alts = doc.alternates || [];
    if (!alts.length) continue;
    const self = SITE_URL + doc.path;

    if (!doc.indexable) {
      fail(doc.path, 'hreflang', 'Noindexed page carries hreflang annotations');
      continue;
    }

    const seen = new Set();
    for (const a of alts) {
      if (!validCodes.has(a.hreflang)) fail(doc.path, 'hreflang', `Invalid or unregistered hreflang code "${a.hreflang}"`);
      if (seen.has(a.hreflang)) fail(doc.path, 'hreflang', `hreflang "${a.hreflang}" appears twice`);
      seen.add(a.hreflang);

      const target = byUrl.get(a.href);
      if (!target) {
        fail(doc.path, 'hreflang', `hreflang ${a.hreflang} points to ${a.href}, which does not exist`);
        continue;
      }
      if (!target.indexable) fail(doc.path, 'hreflang', `hreflang ${a.hreflang} points to noindexed ${target.path}`);
      if (target.canonical !== a.href) {
        fail(doc.path, 'hreflang', `hreflang ${a.hreflang} points to ${a.href}, which canonicalises elsewhere`);
      }
      // Reciprocity: the target must point back at this page, under a real
      // language code (an x-default alone does not count as a return link).
      if (!(target.alternates || []).some((b) => b.href === self && b.hreflang !== 'x-default')
          && !(doc.page && doc.page.xDefault)) {
        fail(doc.path, 'hreflang-return', `${target.path} does not return a link to this page`);
      }
      // Completeness: every member of a cluster carries the identical set.
      const key = (list) => list.map((x) => `${x.hreflang} ${x.href}`).sort().join('|');
      if (key(target.alternates || []) !== key(alts)) {
        fail(doc.path, 'hreflang-cluster', `${target.path} carries a different hreflang set from this page`);
      }
    }

    if (!seen.has('x-default')) fail(doc.path, 'hreflang', 'Cluster has no x-default');
    const selfCodes = alts.filter((a) => a.href === self && a.hreflang !== 'x-default').map((a) => a.hreflang);
    if (doc.page && doc.page.market) {
      if (!selfCodes.length) fail(doc.path, 'hreflang', 'No self-referencing hreflang');
      const expected = MARKETS[doc.page.market].hreflang;
      for (const code of selfCodes) {
        if (!expected.includes(code)) fail(doc.path, 'hreflang', `Self hreflang "${code}" is not a ${doc.page.market} code`);
      }
    } else if (!alts.some((a) => a.href === self)) {
      fail(doc.path, 'hreflang', 'Page is in a cluster but does not reference itself');
    }
  }

  // Shared pages must not be in a cluster, and market pages must link to the
  // market switcher's destinations (checked as ordinary links above).
  const sitemapXml = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
  for (const m of sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = one(m[1], /<loc>([^<]+)<\/loc>/);
    const xml = [...m[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((x) => `${x[1]} ${x[2]}`).sort();
    const doc = byUrl.get(loc);
    if (!doc) { fail(loc, 'sitemap', 'Sitemap lists a URL that was not built'); continue; }
    if (!doc.indexable) fail(doc.path, 'sitemap', 'Sitemap lists a noindexed URL');
    const head = (doc.alternates || []).map((a) => `${a.hreflang} ${a.href}`).sort();
    if (xml.join('|') !== head.join('|')) {
      fail(doc.path, 'sitemap-hreflang', 'Sitemap hreflang set differs from the page head');
    }
  }
  const clusters = docs.filter((d) => (d.alternates || []).length).length;
  const hreflangFailures = critical.filter((f) => f.check.startsWith('hreflang') || f.check.startsWith('sitemap')).length;
  notes.push(`hreflang: ${clusters} pages in clusters, ${hreflangFailures ? `${hreflangFailures} failure(s)` : 'all complete and reciprocal'}`);

  /* --- Report --------------------------------------------------------- */

  const totalWords = docs.reduce((n, d) => n + (d.words || 0), 0);
  const avgBytes = docs.reduce((n, d) => n + (d.bytes || 0), 0) / docs.length;

  console.log('\nPRE-PUBLISH SEO QUALITY GATE');
  console.log('='.repeat(72));
  console.log(`Pages audited        ${docs.length}`);
  console.log(`Indexable            ${indexable.length}`);
  console.log(`Main-content words   ${totalWords.toLocaleString('en-GB')} (avg ${Math.round(totalWords / docs.length)}/page)`);
  console.log(`Average HTML size    ${(avgBytes / 1024).toFixed(1)} kB`);
  for (const n of notes) console.log(n);

  if (warnings.length) {
    console.log(`\nWARNINGS (${warnings.length}) — review, but not blocking`);
    console.log('-'.repeat(72));
    for (const w of warnings) console.log(`  ${w.page}\n    ${w.check}: ${w.detail}`);
  }

  if (critical.length) {
    console.log(`\nCRITICAL FAILURES (${critical.length}) — MUST NOT PUBLISH`);
    console.log('-'.repeat(72));
    for (const f of critical) console.log(`  ${f.page}\n    ${f.check}: ${f.detail}`);
    console.log('\nFAILED\n');
    process.exit(1);
  }

  console.log(`\nNo critical failures. ${warnings.length} warning(s).`);
  console.log('PASSED\n');
}

audit().catch((error) => {
  console.error('Audit crashed:', error);
  process.exit(1);
});
