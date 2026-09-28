import { esc, join, map, inline, slugify } from '../lib/html.js';
import {
  leadForm,
  calculator,
  volumeAssumptions,
  answerBlock,
  faqBlock,
  factsList,
  stepsList,
  cardGrid,
  nextSteps,
  note,
  trustStrip,
  journeyDiagram,
  affiliations,
  meta,
  toc
} from '../lib/components.js';

/* ------------------------------------------------------------------ *
 * Block renderer
 *
 * Page data describes content as an ordered list of typed blocks. Each block
 * has one dominant function — answer, evidence, comparison, instruction,
 * navigation, conversion or disclosure (playbook 4.5). Keeping block order in
 * data means the DOM order, the reading order and the visual order cannot
 * diverge, which is what the visual-semantics guidance asks for.
 * ------------------------------------------------------------------ */
export function renderBlocks(blocks, page) {
  return map(blocks, (b) => renderBlock(b, page));
}

function renderBlock(b, page) {
  switch (b.type) {
    case 'answer':
      return answerBlock(map(b.paragraphs, (p) => `<p>${inline(p)}</p>`));

    case 'facts':
      return factsList(b.items);

    case 'h2':
      return `<h2 id="${slugify(b.text)}">${esc(b.text)}</h2>`;

    case 'h3':
      return `<h3 id="${slugify(b.text)}">${esc(b.text)}</h3>`;

    case 'p':
      return `<p>${inline(b.text)}</p>`;

    case 'lede':
      return `<p class="lede">${inline(b.text)}</p>`;

    case 'ul':
      return `<ul>${map(b.items, (i) => `<li>${inline(i)}</li>`)}</ul>`;

    case 'ol':
      return `<ol>${map(b.items, (i) => `<li>${inline(i)}</li>`)}</ol>`;

    case 'steps':
      return stepsList(b.items);

    case 'table':
      return `
<div class="table-scroll">
  <table>
    ${b.caption ? `<caption>${inline(b.caption)}</caption>` : ''}
    <thead><tr>${map(b.head, (h) => `<th scope="col">${esc(h)}</th>`)}</tr></thead>
    <tbody>${map(b.rows, (r) => `<tr>${map(r, (c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`))}</tr>`)}</tbody>
  </table>
</div>`;

    case 'note':
      return note(map(b.paragraphs, (p) => `<p>${inline(p)}</p>`));

    case 'sources':
      return `
<h2 id="sources-and-how-we-checked-this">Sources and how we checked this</h2>
<p>${inline(b.intro)}</p>
<ul>${map(
        b.items,
        (s) =>
          `<li>${s.url ? `<a href="${esc(s.url)}" rel="nofollow noopener">${esc(s.name)}</a>` : `${esc(s.name)}`} — ${inline(s.supports)}</li>`
      )}</ul>`;

    case 'cards':
      return `${b.heading ? `<h2 id="${slugify(b.heading)}">${esc(b.heading)}</h2>` : ''}
        ${b.intro ? `<p>${inline(b.intro)}</p>` : ''}
        ${cardGrid(b.items, b.cols || 3)}`;

    case 'calculator':
      return calculator({ heading: b.heading, id: b.id || 'calc' });

    case 'volume-assumptions':
      return volumeAssumptions();

    case 'journey':
      return journeyDiagram({ heading: b.heading, intro: b.intro, market: b.market || page.market || 'uk' });

    case 'affiliations':
      return affiliations({ heading: b.heading, intro: b.intro });

    case 'faq':
      return faqBlock(page.faqs);

    case 'lead':
      return `<div class="section--brand" style="border-radius:16px;padding:1.25rem;margin:2.5rem 0">
        ${leadForm({ id: b.id || 'quote', heading: b.heading, sub: b.sub, source: page.path, market: page.market })}
      </div>`;

    case 'html':
      return b.html;

    default:
      throw new Error(`Unknown block type: ${b.type}`);
  }
}

/* ------------------------------------------------------------------ *
 * Templates
 * ------------------------------------------------------------------ */

/**
 * IMC's display headline sets its closing phrase in the light accent
 * ("International moving. / Clearly managed."). `h1Accent` names that trailing
 * phrase; the H1 text itself is unchanged, so titles and audits are unaffected.
 */
function heroH1(page) {
  const a = page.h1Accent;
  if (!a || !page.h1.endsWith(a)) return esc(page.h1);
  return `${esc(page.h1.slice(0, -a.length).trimEnd())} <span class="h1-accent">${esc(a)}</span>`;
}

/**
 * Home — hero with the conversion component beside the value proposition.
 * Used for every market home and for the global chooser at `/`. The hero's
 * secondary button is data (`heroCta`), so each market links to its own
 * cost page and the chooser links to the market list.
 */
export function homeTemplate(page) {
  return `
<section class="hero">
  <div class="wrap">
    <div class="hero__grid">
      <div class="hero__intro">
        ${page.eyebrow ? `<p class="eyebrow eyebrow--corner">${esc(page.eyebrow)}</p>` : ''}
        <h1>${heroH1(page)}</h1>
        <p class="hero__lede">${esc(page.lede)}</p>
        ${page.heroCta ? `<div class="btn-row">
          <a class="btn btn--ghost btn--lg" href="${esc(page.heroCta.href)}">${esc(page.heroCta.label)}</a>
        </div>` : ''}
      </div>
      <div class="hero__form">
        ${leadForm({ id: 'quote', source: `${page.market || 'global'}-home-hero`, onDark: true, market: page.market })}
      </div>
      <div class="hero__trust-wrap">
        <ul class="hero__trust">
          ${map(page.heroTrust, (t) => `<li>${inline(t)}</li>`)}
        </ul>
      </div>
    </div>
  </div>
</section>
${trustStrip(page)}
<div class="wrap section">
  <div class="prose">
    ${renderBlocks(page.blocks, page)}
    ${faqBlock(page.faqs)}
    ${nextSteps(page.next)}
  </div>
</div>`;
}

/** Hub page — definition, scope, intent map, curated children. */
export function hubTemplate(page) {
  return `
<div class="wrap section">
  <div class="prose">
    <h1>${esc(page.h1)}</h1>
    ${page.lede ? `<p class="lede">${inline(page.lede)}</p>` : ''}
    ${renderBlocks(page.blocks, page)}
  </div>
</div>
<div class="wrap">
  <div class="prose">
    ${page.faqs ? faqBlock(page.faqs) : ''}
    ${nextSteps(page.next)}
  </div>
</div>
<div class="wrap section">
  ${leadForm({ id: 'quote', source: page.path, market: page.market })}
</div>`;
}

/** Service page — offer, audience, process, limitations, evidence, next step. */
export function serviceTemplate(page) {
  return `
<div class="wrap section">
  <div>
    <div class="prose">
      <h1>${esc(page.h1)}</h1>
      ${page.lede ? `<p class="lede">${inline(page.lede)}</p>` : ''}
      ${meta(page)}
      ${renderBlocks(page.blocks, page)}
      ${faqBlock(page.faqs)}
      ${nextSteps(page.next)}
    </div>
  </div>
</div>
<div class="wrap section section--tint" style="border-radius:16px">
  ${leadForm({ id: 'quote', source: page.path, heading: page.quoteHeading, market: page.market })}
</div>`;
}

/** Guide — answer-first, task-ordered, information-gain block, sources. */
export function guideTemplate(page) {
  return `
<article class="wrap section">
  <div class="prose">
    <h1>${esc(page.h1)}</h1>
    ${page.lede ? `<p class="lede">${inline(page.lede)}</p>` : ''}
    ${meta(page)}
    ${toc(page.sections)}
    ${renderBlocks(page.blocks, page)}
    ${faqBlock(page.faqs)}
    ${nextSteps(page.next)}
  </div>
</article>
<div class="wrap section">
  ${leadForm({ id: 'quote', source: page.path, market: page.market })}
</div>`;
}

/** Destination page — genuine local operation, process and constraints. */
export function destinationTemplate(page) {
  return guideTemplate(page);
}

/** Plain page — about, contact, legal. */
export function pageTemplate(page) {
  return `
<div class="wrap section wrap--narrow">
  <div class="prose">
    <h1>${esc(page.h1)}</h1>
    ${page.lede ? `<p class="lede">${inline(page.lede)}</p>` : ''}
    ${meta(page)}
    ${renderBlocks(page.blocks, page)}
    ${faqBlock(page.faqs)}
    ${page.next ? nextSteps(page.next) : ''}
  </div>
</div>`;
}

/** Dedicated conversion page — form is the whole point, minimal distraction. */
export function quoteTemplate(page) {
  return `
<div class="wrap section">
  <h1>${esc(page.h1)}</h1>
  ${page.lede ? `<p class="lede">${inline(page.lede)}</p>` : ''}
  <div class="quote-grid">
    <div>
      ${leadForm({
        id: 'quote',
        source: page.path,
        heading: 'Tell us about your move',
        sub: 'Five short questions.',
        market: page.market
      })}
    </div>
    <div class="prose">
      ${renderBlocks(page.blocks, page)}
      ${faqBlock(page.faqs)}
      ${page.next ? nextSteps(page.next) : ''}
    </div>
  </div>
</div>`;
}

export const TEMPLATES = {
  home: homeTemplate,
  hub: hubTemplate,
  service: serviceTemplate,
  guide: guideTemplate,
  destination: destinationTemplate,
  page: pageTemplate,
  quote: quoteTemplate
};
