import { esc, map } from '../lib/html.js';
import { SITE_URL, BRAND_ENTITY } from '../data/site.js';
import { marketOf, MARKETS } from '../data/markets.js';
import { buildGraph } from '../lib/schema.js';
import { asset } from '../lib/assets.js';
import { header, footer, breadcrumbs, stickyCta, marketBanner } from '../lib/components.js';

/**
 * The single HTML shell.
 *
 * Playbook rule 01 and 4.3: title, canonical, robots, H1, primary copy, primary
 * image and contextual internal links are all present in this initial HTML.
 * The one script is deferred and enhancement-only.
 *
 * International targeting lives here too: <html lang> per market, hreflang
 * alternates (computed in build.mjs from the route map), og:locale with its
 * alternates, and a `data-market` hook the market banner reads.
 */
export function layout(page, bodyHtml, assets) {
  const market = marketOf(page);
  const canonical = SITE_URL + page.path;
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  // Only advertise an OG image if one was actually built (see V-08).
  const ogImagePath = asset(page.ogImage || '/img/og-default.png');
  const favicon = asset('/img/favicon.svg');
  const touchIcon = asset('/img/apple-touch-icon.png');

  const alternates = page.alternates || [];
  const ogAlternates = [...new Set(
    alternates
      .filter((a) => a.market && a.market !== page.market)
      .map((a) => MARKETS[a.market].ogLocale)
  )];

  return `<!doctype html>
<html lang="${esc(market.htmlLang)}" data-market="${esc(page.market || 'global')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="robots" content="${robots}">
${map(alternates, (a) => `<link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}">`)}

<link rel="stylesheet" href="/css/main.${assets.cssHash}.css">
<!-- Sole inline script, and deliberately so. The lead form ships all five
     steps in the HTML because it must work without JavaScript; app.js then
     collapses it to one step. Marking the document before first paint lets CSS
     hide steps 2-5 up front, which avoids a layout shift. If app.js never
     arrives, the load handler drops the class and the full single-page form
     comes back, so the no-JS guarantee still holds. -->
<script data-critical>document.documentElement.className+=" pre-step";addEventListener("load",function(){if(!document.querySelector('.lead[data-enhanced="true"]'))document.documentElement.classList.remove("pre-step")})</script>
${favicon ? `<link rel="icon" href="${favicon}" type="image/svg+xml">` : ''}
${touchIcon ? `<link rel="apple-touch-icon" href="${touchIcon}">` : ''}
<meta name="theme-color" content="#111517">

<meta property="og:type" content="${page.template === 'guide' ? 'article' : 'website'}">
<meta property="og:site_name" content="${esc(BRAND_ENTITY.name)}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(canonical)}">
${ogImagePath ? `<meta property="og:image" content="${esc(SITE_URL + ogImagePath)}">` : ''}
<meta property="og:locale" content="${esc(market.ogLocale)}">
${map(ogAlternates, (l) => `<meta property="og:locale:alternate" content="${esc(l)}">`)}
<meta name="twitter:card" content="${ogImagePath ? 'summary_large_image' : 'summary'}">

<script type="application/ld+json">${buildGraph(page)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${marketBanner(page)}
${header(page)}
${breadcrumbs(page.crumbs)}
<main id="main">
${bodyHtml}
</main>
${footer(page)}
${stickyCta(page)}
<script src="/js/app.${assets.jsHash}.js" defer></script>
</body>
</html>
`;
}
