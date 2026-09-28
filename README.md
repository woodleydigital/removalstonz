# Removals to NZ

Lead-generation website for **removalstonz.com** — international removals to
New Zealand from the **UK** (primary market), the **USA**, **Australia**,
**Canada** and **Europe**.

Built on the same static generator and pre-publish quality gate as
removalstochina.com, extended for international targeting from the start:
market subfolders, generated hreflang clusters, localised forms and copy, and
an audit that fails the build on any hreflang error.

```bash
npm run build     # render dist/
npm run audit     # run the pre-publish quality gate against dist/
npm run check     # build, then audit — use this before every deploy
npm run dev       # build and serve at http://localhost:4321
```

No dependencies. Node 22.

---

## Before this site can capture a lead

1. **Point the form at a real endpoint** — `src/data/nav.js`, `LEAD_FORM.action`.
   See [`docs/LEAD-FORM.md`](docs/LEAD-FORM.md). Every lead carries a `_market`
   field for routing.
2. **Make the enquiry mailbox live** — `enquiries@removalstonz.com`.
3. **Confirm the operating company** — `src/data/site.js`, `OPERATOR`. Left as a
   placeholder by instruction; nothing about it renders until
   `confirmed: true`.

The full pre-launch list is [`docs/CONTENT-VERIFICATION.md`](docs/CONTENT-VERIFICATION.md).

---

## International structure

| URL | Market | `lang` / hreflang |
|---|---|---|
| `/` | Global chooser | `en` / `x-default` |
| `/uk/` | United Kingdom | `en-GB` |
| `/us/` | United States | `en-US` |
| `/au/` | Australia | `en-AU` |
| `/ca/` | Canada | `en-CA` |
| `/europe/` | Ireland and continental Europe | `en` / `en-IE`, `en-NL`, `en-DE`, `en-FR` … (16 codes) |

Each market has its own home, cost page, shipping-times page and quote page;
the UK also has five service pages and a collection-areas page. Everything
about the New Zealand end — six destination cities, customs, biosecurity,
guides and the volume calculator — is written once at the root and shared.

hreflang clusters (home, cost, shipping times) are computed from the route map
in `src/lib/i18n.js`, emitted identically in each page `<head>` and in
`sitemap.xml`, and verified by the audit for validity, self-reference,
x-default, reciprocity and completeness. There is no geo-redirect: visitors
choose their market with a plain-link switcher, and a JS-only banner may
suggest one.

Full rationale and how to add a market: [`docs/INTERNATIONAL-SEO.md`](docs/INTERNATIONAL-SEO.md).

---

## Layout

```
src/
  data/
    markets.js         MARKET REGISTRY — prefixes, hreflang, lang, vocabulary, form labels
    routes.js          Every URL, named once
    site.js            Entity source of truth (operator pending — V-01)
    nav.js             Per-market navigation, footer and lead-form config
    journey.js         Door-to-door timeline for each origin market
    calculator.js      Published survey inventory, ~190 items
    pages/
      index.js         THE ROUTE MAP — every route, market, template and cluster
      global.js        Chooser, calculator, about, contact, legal, quote, thank-you
      uk.js            UK market: home, 5 services, cost, times, collection areas
      us.js au.js ca.js europe.js   Other markets: home, cost, times
      quotes.js        Generated per-market quote pages (noindex)
      destinations.js  Shared: NZ destinations hub and six cities
      guides.js        Shared: customs, biosecurity, sea vs air, checklist, comparing quotes
  lib/
    i18n.js            hreflang clusters and the market switcher
    schema.js          JSON-LD graph, per-market inLanguage and areaServed
    components.js      Header, switcher, banner, localised lead form, calculator, blocks
    html.js assets.js  Helpers
  templates/           layout.js (the HTML shell) and page templates
  assets/              CSS (NZ pounamu palette), JS, SVG logos
scripts/
  build.mjs            Static build, sitemap with hreflang, llms.txt, robots.txt
  audit.mjs            Pre-publish quality gate, including international checks
  serve.mjs            Local preview server
docs/
  INTERNATIONAL-SEO.md   How international targeting works and how to extend it
  CONTENT-VERIFICATION.md Pre-launch register and editorial rules
  LEAD-FORM.md           Field contract
  DEPLOY.md              Vercel, domains, Search Console
```

### Adding a page

1. Write it as a data object in the right `src/data/pages/*.js` file. Set
   `market` for a market page; add `hreflangGroup` only if the same page exists
   in other markets.
2. Add it to `PAGES` in `src/data/pages/index.js`.
3. Link to it from a hub or related page — the audit fails on orphans.
4. `npm run check`.

---

## The quality gate

Everything removalstochina.com enforces — content in the initial HTML, 300-word
floor, self-canonicals, one H1, unique titles and descriptions, JSON-LD that
matches visible content, no ratings or prices in schema, no currency figures in
copy, alt text and labels, no broken links or orphans, no near-duplicates, and
named authorities plus review dates on the customs and biosecurity guides —
plus the international checks:

- `<html lang>` matches each page's market
- hreflang codes valid and registered, none duplicated
- every target exists, is indexable and self-canonical
- every target links back under a real language code
- every member of a cluster carries the identical set, with an x-default
- noindexed pages carry no hreflang
- sitemap alternates match the page `<head>` exactly

Current state: **48 documents, 40 indexable, 0 critical failures.** Three
warnings flag About, Contact and Legal as short (under 500 words), which is
expected for those pages.

---

## Brand

Same layout and component system as removalstochina.com, recoloured for New
Zealand: pounamu (greenstone) teal on near-black, with a silver-fern grey
accent. The logo keeps the family's isometric crate with a route arrow
curving south-east.

| Token | Value | Note |
|---|---|---|
| `--brand` | `#12A58A` | Pounamu teal — marks and accents |
| `--brand-deep` | `#0E7C66` | 5.1:1 on white |
| `--brand-darker` | `#0A5F4F` | 7.6:1 on white — buttons and links |
| `--accent` | `#7FD6C2` | On dark backgrounds, 10.9:1 on ink |
| `--ink` | `#111517` | |

---

## Deployment

Vercel, configured by `vercel.json`; build command `npm run check`, so a failed
audit blocks the deploy. `removalstonz.com` (apex) must be the primary domain.
See [`docs/DEPLOY.md`](docs/DEPLOY.md).
