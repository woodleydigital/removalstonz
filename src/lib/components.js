import { esc, map, join, inline, slugify, fmtDate } from './html.js';
import { assetImg, assetAnyExt } from './assets.js';
import { BRAND_ENTITY, OPERATOR, CONTACT, AFFILIATIONS, ENQUIRY } from '../data/site.js';
import { ITEM_GROUPS, LOAD_BANDS, CONTAINER_CAPACITY } from '../data/calculator.js';
import { JOURNEYS, journeyShares } from '../data/journey.js';
import { navFor, footerNavFor } from '../data/nav.js';
import { MARKETS, MARKET_ORDER, marketOf, quoteHref } from '../data/markets.js';
import { switcherLinks } from './i18n.js';

// The NZ mark in the IMC door construction. As on internationalmoving.company,
// the mark is always paired with the company name in live HTML text.
const MARK = '/img/rtnz-mark.svg';

/** Mark + name lockup, shared by header and footer. */
function brandLockup(cls) {
  const m = assetImg(MARK);
  return `<img src="${esc(m.src)}" width="${m.width}" height="${m.height}" alt=""${cls === 'site-footer__brand' ? ' loading="lazy"' : ''}>
        <span class="brand-name">${esc(BRAND_ENTITY.name)}<small>${esc(BRAND_ENTITY.endorsement)}</small></span>`;
}

/* ------------------------------------------------------------------ *
 * Market switcher
 *
 * Plain links, in the initial HTML, to this page's equivalent in every market
 * (or that market's home when there is no equivalent). This is how a reader —
 * and a crawler — moves between markets. It never redirects anyone.
 * ------------------------------------------------------------------ */
export function marketSwitcher(page, variant = 'bar') {
  const links = switcherLinks(page);
  const item = (l) =>
    `<li><a href="${esc(l.href)}" hreflang="${esc(MARKETS[l.market].hreflang[0])}"${l.current ? ' aria-current="true"' : ''}>${esc(l.label)}</a></li>`;
  return `
<nav class="market-switch market-switch--${variant}" aria-label="Choose the country you are moving from">
  <div class="wrap">
    <span class="market-switch__label">Moving from</span>
    <ul>${map(links, item, '')}</ul>
  </div>
</nav>`;
}

/**
 * Market suggestion banner. Empty and hidden in the HTML; app.js fills it only
 * when the visitor's browser language or time zone points to a different
 * market than the page they are on. Fixed-position, so showing it cannot
 * shift the layout. The destinations it may offer are the same links as the
 * switcher, handed over as data.
 */
export function marketBanner(page) {
  const links = Object.fromEntries(switcherLinks(page).map((l) => [l.market, l.href]));
  const names = Object.fromEntries(MARKET_ORDER.map((k) => [k, MARKETS[k].from]));
  return `<div class="market-banner" data-market-banner hidden
     data-current="${esc(page.market || '')}"
     data-links="${esc(JSON.stringify(links))}"
     data-names="${esc(JSON.stringify(names))}" role="region" aria-label="Suggested country"></div>`;
}

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */
export function header(page) {
  const link = (item) => {
    const current = item.href === page.path;
    return `<li><a href="${esc(item.href)}"${current ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  };
  const home = page.market ? MARKETS[page.market].prefix : '/';
  return `
${marketSwitcher(page, 'bar')}
<header class="site-header">
  <div class="wrap">
    <div class="site-header__bar">
      <a class="site-header__logo" href="${esc(home)}" aria-label="${esc(BRAND_ENTITY.name)}, ${esc(BRAND_ENTITY.endorsement)} — home">
        ${brandLockup('site-header__logo')}
      </a>
      <span class="site-header__spacer"></span>
      <!-- The checkbox is the drawer mechanism so the nav opens without JS. Its
           visible label is display:none above 1000px, which leaves the control
           unnamed to a screen reader, so it carries its own name. -->
      <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="Menu">
      <label for="nav-toggle" class="nav-toggle__label">Menu</label>
      <nav class="site-nav" aria-label="Main">
        <ul>
          ${map(navFor(page.market), link)}
          <li><a class="btn btn--primary" href="${esc(quoteHref(page))}" data-cta="header">Plan your move</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>`;
}

/* ------------------------------------------------------------------ *
 * Breadcrumbs
 * ------------------------------------------------------------------ */
export function breadcrumbs(crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  const last = crumbs.length - 1;
  return `
<nav class="crumbs" aria-label="Breadcrumb">
  <div class="wrap">
    <ol>
      ${map(
        crumbs,
        (c, i) =>
          `<li>${i === last ? `<span aria-current="page">${esc(c.label)}</span>` : `<a href="${esc(c.href)}">${esc(c.label)}</a>`}</li>`
      )}
    </ol>
  </div>
</nav>`;
}

/* ------------------------------------------------------------------ *
 * Enquiry form — IMC's own, embedded
 *
 * The form, its validation, its routing and its email delivery all live on
 * internationalmoving.company (/embed/enquiry/). This renders the frame and
 * nothing else, so there is one form to maintain across IMC's sites.
 *
 *  - The URL tags the enquiry with this site, the reader's market and the page,
 *    and prefills "New Zealand" as the destination.
 *  - The frame reserves the form's first-step height up front (no layout shift)
 *    and app.js resizes it to each step from IMC's postMessage reports.
 *  - The hero frame loads eagerly; frames further down load lazily.
 *  - A plain link to IMC's full quote page sits under every frame, so a blocked
 *    or failed embed never strands someone who wants to enquire.
 * ------------------------------------------------------------------ */
export function leadForm(opts = {}) {
  const { id = 'quote', source = 'generic', market = null, eager = false } = opts;
  const params = new URLSearchParams({
    source: ENQUIRY.source,
    ...(market ? { market } : {}),
    page: String(source).startsWith('/') ? source : `/${source}`,
    to: ENQUIRY.destination
  });
  const src = `${ENQUIRY.origin}${ENQUIRY.path}?${params.toString()}`;
  const fallback = `${ENQUIRY.origin}${ENQUIRY.fallbackPath}`;
  return `
<div class="lead lead--embed" id="${esc(id)}">
  <iframe class="lead__frame" src="${esc(src)}" title="Plan your move — enquiry form from International Moving Company"
          loading="${eager ? 'eager' : 'lazy'}" data-enquiry-frame data-origin="${esc(ENQUIRY.origin)}"
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <p class="lead__fallback">Form not loading? <a href="${esc(fallback)}" rel="noopener">Plan your move on internationalmoving.company</a>.</p>
</div>`;
}

/* ------------------------------------------------------------------ *
 * Volume calculator — centerpiece functional component
 *
 * Visual-semantics note: this is deliberately placed high on the pages that
 * own cost and volume intent. It is what makes the page a task-completing
 * commercial resource rather than a passive article, and the published
 * assumption table below it is the page's information-gain asset.
 * ------------------------------------------------------------------ */
export function calculator(opts = {}) {
  const { heading = 'Estimate your shipment volume', id = 'calc' } = opts;

  // Cost-of-retrieval note: the DOM id is a short generated token rather than a
  // slug of the item name. Each id appears four times per row (label, input and
  // both steppers) across 190 rows, so a 30-character semantic id costs about
  // 23 kB of markup that no reader or crawler benefits from — the visible label
  // carries the meaning. `name` is dropped for the same reason: these inputs sit
  // outside any form and were never submitted.
  let n = 0;
  const row = (item) => {
    const el = `${id}${n++}`;
    return `
      <li class="calc__row">
        <label class="calc__label" for="${el}">${esc(item.label)}</label>
        <span class="stepper">
          <button type="button" data-step-delta="-1" data-step-for="${el}"
                  aria-label="One fewer ${esc(item.label)}">&minus;</button>
          <input type="number" id="${el}" value="0" min="0" max="99"
                 inputmode="numeric" data-cbm="${item.cbm}">
          <button type="button" data-step-delta="1" data-step-for="${el}"
                  aria-label="One more ${esc(item.label)}">+</button>
        </span>
      </li>`;
  };

  // One collapsible section per room. Every row is in the initial HTML — the
  // <details> element hides it visually without removing it from the document.
  const group = (g, i) => `
    <details class="calc__room"${i === 0 ? ' open' : ''}>
      <summary>
        <span>${esc(g.name)}</span>
        <small data-room-total="${esc(g.name)}"></small>
      </summary>
      <ul class="calc__rows">${map(g.items, row)}</ul>
    </details>`;

  return `
<div class="calc" data-calculator id="${esc(id)}"
     data-calc-loads="${esc(JSON.stringify(LOAD_BANDS.map((b) => ({ max: b.max === Infinity ? 9999 : b.max, label: b.label }))))}">
  <h2>${esc(heading)}</h2>

  <div class="calc__out" role="status" aria-live="polite">
    <b data-calc-total>0.0 m³</b>
    <span data-calc-cbm>about 0 cubic feet</span>
    <span data-calc-load>Add items to see the likely load type</span>
  </div>

  <p class="calc__noscript">
    This calculator needs JavaScript. The volume of every item it uses is published in the
    <a href="#volume-assumptions">inventory table</a> below, so you can add the figures up by hand.
  </p>

  <div data-calc-controls hidden>
    <p class="calc__intro">
      Work through the rooms you are shipping. Every volume is published in the table below,
      so the total you get here is a figure you can check and take into any quote.
    </p>
    ${map(ITEM_GROUPS, group)}
    <p class="source-note">
      Figures are planning volumes for packed items, not measurements of your own belongings.
      A surveyor confirms the volume before any rate is issued.
    </p>
    <p class="source-note">When you plan your move, add this total to the notes — it saves a step at survey.</p>
    <a class="btn btn--primary btn--block" href="#quote" data-cta="calculator">Plan your move</a>
  </div>
</div>`;
}

/** The published assumptions behind the calculator — the information-gain asset. */
export function volumeAssumptions() {
  const rows = ITEM_GROUPS.flatMap((g) => [
    `<tr class="rowgroup"><th scope="colgroup" colspan="4">${esc(g.name)}</th></tr>`,
    ...g.items.map(
      (i) =>
        `<tr><th scope="row">${esc(i.label)}</th><td>${i.cbm.toFixed(2)}</td><td>${(i.cbm * 35.315).toFixed(1)}</td><td>${esc(i.pack)}</td></tr>`
    )
  ]);
  const itemCount = ITEM_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return `
<h2 id="volume-assumptions">The inventory this site prices from</h2>
<p>
  Every estimate on this site is built from the ${itemCount} items below — a full international
  survey inventory. We publish it in full, with the volume and the packing method for each item,
  so you can check the arithmetic and compare quotes from different movers on the same basis.
  A quote for 18 m³ and a quote for 22 m³ are not comparable if the two firms measured
  differently.
</p>
<div class="table-scroll table-scroll--tall">
  <table>
    <caption>
      Planning volumes and international packing method for each item. Volumes are for packed
      items and include the wrapping, not the bare dimensions of the furniture.
    </caption>
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">m³</th><th scope="col">cu ft</th>
        <th scope="col">Packed as</th>
      </tr>
    </thead>
    <tbody>${join(rows)}</tbody>
  </table>
</div>
<div class="table-scroll">
  <table>
    <caption>Standard usable loading volumes for dry shipping containers.</caption>
    <thead><tr><th scope="col">Container</th><th scope="col">Usable volume</th><th scope="col">Roughly equivalent to</th></tr></thead>
    <tbody>${map(
      CONTAINER_CAPACITY,
      (c) => `<tr><th scope="row">${esc(c.name)}</th><td>${c.cbm} m³</td><td>${esc(c.note)}</td></tr>`
    )}</tbody>
  </table>
</div>`;
}

/* ------------------------------------------------------------------ *
 * Affiliations
 *
 * Renders nothing until the operator's affiliations are confirmed and listed
 * in site.js (docs/CONTENT-VERIFICATION.md, V-01). When they are, each card
 * shows the partner-supplied logo if the file exists and a typographic badge
 * if it does not, so a missing file never leaves a broken image.
 * ------------------------------------------------------------------ */
export const missingLogos = [];
function resolveLogo(m) {
  if (!m.logo) return null;
  const base = m.logo.replace(/\.[a-z0-9]+$/i, '');
  const hit = assetAnyExt(base);
  if (!hit && !missingLogos.includes(m.logo)) missingLogos.push(m.logo);
  return hit;
}

export function affiliations(opts = {}) {
  if (!AFFILIATIONS.members.length) return '';
  const { heading = 'Affiliations', intro = AFFILIATIONS.intro } = opts;

  const card = (m) => {
    const img = resolveLogo(m);
    const mark = img
      ? `<img class="affil__logo" src="${esc(img.src)}" alt="${esc(m.name)} logo"
             width="${img.width}" height="${img.height}" loading="lazy" decoding="async">`
      : `<span class="affil__badge" aria-hidden="true">${esc(
          m.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase()
        )}</span>`;
    const title = m.url
      ? `<a href="${esc(m.url)}" rel="nofollow noopener">${esc(m.name)}</a>`
      : esc(m.name);
    return `
    <li class="affil__item">
      <div class="affil__mark">${mark}</div>
      <div>
        <h3 class="affil__name">${title}</h3>
        <p class="affil__rel">${esc(m.relationship)}</p>
        <p class="affil__note">${esc(m.note)}</p>
      </div>
    </li>`;
  };

  return `
<section class="affil" aria-labelledby="affiliations">
  <h2 id="affiliations">${esc(heading)}</h2>
  <p class="affil__intro">${inline(intro)}</p>
  <ul class="affil__list">${map(AFFILIATIONS.members, card)}</ul>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Journey diagram — one per origin market
 *
 * Built in HTML and CSS rather than SVG on purpose: SVG text scales with the
 * viewport, plain elements keep the type responsive. The bar carries
 * proportion; the list beneath carries identity, the range and the reasoning,
 * so identity is never colour-alone and the list doubles as the table view.
 * ------------------------------------------------------------------ */
export function journeyDiagram(opts = {}) {
  const key = opts.market || 'uk';
  const journey = JOURNEYS[key];
  const stages = journeyShares(key);
  const {
    heading = 'Where the weeks actually go',
    intro = 'Proportions of a typical part-load shipment, using the midpoint of each published range.'
  } = opts;
  const sea = stages.find((s) => s.id === 'sea');
  const seaShare = Math.round(sea.share);

  const segment = (s) => `
      <div class="journey__seg" style="--seg:${s.share.toFixed(2)}%;--seg-colour:${s.colour};--seg-ink:${s.ink}">
        <span class="journey__seg-label">${esc(s.range)}</span>
      </div>`;

  const item = (s) => `
      <div class="journey__key-row">
        <dt><span class="journey__swatch" style="--seg-colour:${s.colour}"></span>${esc(s.name)}</dt>
        <dd>
          <b>${esc(s.range)}</b> <span class="journey__share">about ${Math.round(s.share)}% of the timeline</span>
          <span class="journey__note">${esc(s.note)}</span>
        </dd>
      </div>`;

  return `
<figure class="journey">
  <figcaption class="journey__caption">
    <strong>${esc(heading)}.</strong> ${esc(intro)}
    Sea transit is about ${seaShare}% of it — which is why a quoted sailing time of
    &ldquo;${esc(sea.range)}&rdquo; answers a different question from
    &ldquo;when will my things arrive&rdquo;.
  </figcaption>

  <div class="journey__bar" role="img"
       aria-label="Stacked bar showing a typical ${esc(journey.totalLabel)} shipment split into four stages: ${esc(
         stages.map((s) => `${s.name}, ${s.range}, about ${Math.round(s.share)} per cent`).join('; ')
       )}.">
    ${map(stages, segment)}
  </div>
  <p class="journey__scale"><span>${esc(journey.originLabel)}</span><span>${esc(journey.totalLabel)}</span><span>Delivery in New Zealand</span></p>

  <dl class="journey__key">${map(stages, item)}</dl>
</figure>`;
}

/* ------------------------------------------------------------------ *
 * Content blocks
 * ------------------------------------------------------------------ */
export function answerBlock(html) {
  return `<div class="answer">${html}</div>`;
}

export function faqBlock(faqs) {
  if (!faqs || !faqs.length) return '';
  return `
<h2 id="questions">Questions people ask before booking</h2>
<div class="faq">
  ${map(
    faqs,
    (f) => `
  <details>
    <summary>${esc(f.q)}</summary>
    <p>${inline(f.a)}</p>
  </details>`
  )}
</div>`;
}

export function factsList(facts) {
  if (!facts || !facts.length) return '';
  return `<dl class="facts">${map(
    facts,
    (f) => `<div><dt>${esc(f.k)}</dt><dd>${inline(f.v)}</dd></div>`
  )}</dl>`;
}

export function stepsList(steps) {
  return `<ol class="steps">${map(
    steps,
    (s) => `<li><h3>${esc(s.title)}</h3><p>${inline(s.body)}</p></li>`
  )}</ol>`;
}

export function cardGrid(cards, cols = 3) {
  return `<div class="grid grid--${cols}">${map(
    cards,
    (c) => `
    <a class="card card--link" href="${esc(c.href)}">
      ${c.eyebrow ? `<span class="card__eyebrow">${esc(c.eyebrow)}</span>` : ''}
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.body)}</p>
      <p class="card__cta mb-0">${esc(c.cta || 'Read more')} →</p>
    </a>`
  )}</div>`;
}

export function nextSteps(links) {
  if (!links || !links.length) return '';
  return `
<nav class="next-steps" aria-label="Next steps">
  <h2>Where to go next</h2>
  <ul>
    ${map(
      links,
      (l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a><p>${esc(l.why)}</p></li>`
    )}
  </ul>
</nav>`;
}

export function note(html) {
  return `<div class="note">${html}</div>`;
}

/**
 * Trust strip. Only claims that are true of the service as designed: no
 * founding year, office count or accreditation appears until the operator is
 * confirmed (V-01).
 */
export function trustStrip(page) {
  const m = page && page.market ? MARKETS[page.market] : null;
  return `
<div class="trust-strip">
  <div class="wrap">
    <ul>
      <li><b>Door to door</b> — ${esc(m ? `${m.term === 'moving' ? 'pickup' : 'collection'} ${m.from.replace('from ', 'in ')}` : 'collection')} to delivery in New Zealand</li>
      <li><b>Biosecurity planned in</b> — what to clean, list or leave behind for MPI</li>
      <li><b>Published volumes</b> — compare quotes on one basis</li>
      <li><b>Written estimates</b> — with the exclusions listed</li>
    </ul>
  </div>
</div>`;
}

export function meta(page) {
  if (!page.published) return '';
  const locale = marketOf(page).dateLocale;
  // Playbook 4.10: a visible review date only where a substantive review
  // occurred — every page here is reviewed on the interval in its data.
  const bits = [
    `<span>Published ${fmtDate(page.published, locale)}</span>`,
    page.updated ? `<span>Last reviewed ${fmtDate(page.updated, locale)}</span>` : null,
    // The visible byline and the Article author in JSON-LD are the same entity.
    `<span>Written by ${esc(BRAND_ENTITY.byline)}</span>`
  ];
  return `<div class="meta">${join(bits.filter(Boolean), '')}</div>`;
}

export function toc(sections) {
  if (!sections || sections.length < 4) return '';
  return `
<nav class="toc" aria-label="On this page">
  <h2>On this page</h2>
  <ol>${map(sections, (s) => `<li><a href="#${slugify(s)}">${esc(s)}</a></li>`)}</ol>
</nav>`;
}

/* ------------------------------------------------------------------ *
 * Sticky mobile CTA + footer
 * ------------------------------------------------------------------ */
export function stickyCta(page) {
  return `
<div class="sticky-cta">
  <a class="btn btn--ghost" href="mailto:${esc(CONTACT.email)}" data-cta="sticky-email">Email us</a>
  <a class="btn btn--primary" href="${esc(quoteHref(page))}" data-cta="sticky-quote">Plan your move</a>
</div>`;
}

export function footer(page) {
  const col = (group) => `
    <div>
      <h2>${esc(group.title)}</h2>
      <ul>${map(group.links, (l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)}</ul>
    </div>`;
  const phone = page.market ? CONTACT.phones[page.market] : null;

  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__grid">
      <div>
        <a class="site-footer__brand" href="/" aria-label="${esc(BRAND_ENTITY.name)}, ${esc(BRAND_ENTITY.endorsement)} — home">
          ${brandLockup('site-footer__brand')}
        </a>
        <p>${esc(BRAND_ENTITY.legalNote)}</p>
        <ul>
          <li><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a></li>
          ${phone ? `<li><a href="tel:${esc(phone.replace(/\s/g, ''))}">${esc(phone)}</a></li>` : ''}
        </ul>
      </div>
      ${map(footerNavFor(page.market), col)}
    </div>
    ${marketSwitcher(page, 'footer')}
    <div class="site-footer__legal">
      <p>
        © ${new Date().getFullYear()} ${esc(OPERATOR.name)}. ${esc(BRAND_ENTITY.name)} is a division of
        <a href="${esc(OPERATOR.url)}">${esc(OPERATOR.name)} (${esc(OPERATOR.shortName)})</a>.
        <a href="/legal/">Legal and privacy</a>
      </p>
      <p>
        Guidance on this site describes general practice on international removals to New Zealand
        and is not customs, biosecurity, immigration or tax advice. Rules and freight rates change;
        check the review date on each page and confirm current requirements with NZ Customs and the
        Ministry for Primary Industries before you ship.
      </p>
    </div>
  </div>
</footer>`;
}
