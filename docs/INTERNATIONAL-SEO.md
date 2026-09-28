# International targeting

How removalstonz.com targets the UK, the USA, Australia, Canada and Europe from
one domain, why it is built this way, and how to extend it without breaking it.

---

## 1. The structure

| URL | Audience | `<html lang>` | hreflang | og:locale |
|---|---|---|---|---|
| `/` | Global chooser | `en` | `x-default` for the home cluster | `en_GB` |
| `/uk/` | United Kingdom | `en-GB` | `en-GB` | `en_GB` |
| `/us/` | United States | `en-US` | `en-US` | `en_US` |
| `/au/` | Australia | `en-AU` | `en-AU` | `en_AU` |
| `/ca/` | Canada | `en-CA` | `en-CA` | `en_CA` |
| `/europe/` | Ireland and continental Europe | `en` | `en-IE`, `en-NL`, `en-BE`, `en-LU`, `en-DE`, `en-AT`, `en-CH`, `en-FR`, `en-ES`, `en-PT`, `en-IT`, `en-DK`, `en-SE`, `en-NO`, `en-FI`, `en-PL` | `en_IE` |
| `/destinations/*`, `/guides/*`, `/tools/*`, `/about/` … | Everyone | `en` | none | `en_GB` |

Everything is configured in one file: **`src/data/markets.js`**.

### Why subfolders on one .com

- All link equity accrues to one domain. A new market starts with the
  authority the site already has, instead of from zero on a new ccTLD.
- A `.com` is not tied to a country. **Do not set a country target** for the
  domain in Search Console — it serves five markets.
- Each folder can be added to Search Console as its own URL-prefix property
  (`https://removalstonz.com/us/` and so on) to see performance per market.

### Why every market is in its own folder, with a chooser at `/`

Decided with the client: no market gets the root, and `/` is a real page
(≥300 words, a quote form, links into every market and the shared NZ
content). It is the hreflang `x-default` — the page Google shows an English
speaker it has no market for — and the page most external links will point at.

### Why only some pages have hreflang

hreflang means "this page is the same thing for a different audience". It is
emitted **only between true equivalents**:

| Cluster | Members | x-default |
|---|---|---|
| `home` | `/uk/`, `/us/`, `/au/`, `/ca/`, `/europe/` | `/` |
| `cost` | each market's cost page | `/uk/cost-…` |
| `times` | each market's shipping-times page | `/uk/shipping-times-…` |

Shared New Zealand pages (destinations, customs, biosecurity, guides, the
calculator) exist once, for everyone. They have no equivalents, so they carry
no hreflang and use plain `lang="en"`.

UK-only pages — the five service pages and collection areas — have no
equivalents in other markets yet, so they carry no hreflang either. If a US
service page is added later, give both it and the UK one the same
`hreflangGroup` and they become a cluster automatically.

### Why the market quote pages are noindexed

Five near-identical form pages would be thin duplicates, "get a quote" is not a
query anyone ranks for, and a noindexed page must never be in a hreflang
cluster. The market home, which carries the same form, is what ranks.

### Why there is no geo-redirect

Googlebot crawls mostly from US IP addresses. An IP-based redirect would show it
the US site on every URL and hide the other four markets. Instead:

- **Market switcher** — plain links in the header and footer to this page's
  equivalent in every market (or that market's home). In the HTML, crawlable,
  never automatic.
- **Suggestion banner** — `app.js` compares the browser's language and time
  zone with the page's market and, if they differ, offers a link. Empty in the
  HTML, fixed-position (no layout shift), dismissal remembered, and silent for
  visitors already in New Zealand.

---

## 2. What makes the market pages different, not duplicated

The audit fails any two indexable pages with more than 50% overlap (8-word
shingles) and warns above 30%. Every market page currently clears the warning
threshold, because each is written for how moves actually work from there:

| | UK | USA | Australia | Canada | Europe |
|---|---|---|---|---|---|
| Vocabulary | removals, collection | moving, movers, pickup | removals, removalists, backloading | moving, movers, pickup | removals, collection |
| Units first | m³ | cubic feet | m³ | both | m³ |
| Dates | 28 September 2026 | September 28, 2026 | 28 September 2026 | September 28, 2026 | 28 September 2026 |
| Ports | Southampton, Felixstowe, London Gateway | LA/Long Beach, Oakland, Seattle, Houston, Savannah, NY/NJ | Sydney, Melbourne, Brisbane, Fremantle | Vancouver, Montréal, Halifax | Rotterdam, Antwerp, Hamburg, Dublin |
| Door to door | 10–16 weeks | 8–14 weeks | 4–8 weeks | 8–15 weeks | 10–16 weeks |
| Distinct issues | nationwide collection, part loads, five service pages | priced by volume not weight; 120 V appliances; LHD cars; bed sizes | goods arriving before you; returning Kiwis; appliances work; RHD cars | west vs east routing; winter pickups; 120 V | EU / Swiss / Norwegian export; 230 V but different plugs; EU bed sizes; stink-bug season |

The lead form is localised too: the origin field asks for a postcode, ZIP code
or postal code; US size options lead with cubic feet; and every submission
carries a hidden `_market` field.

---

## 3. What the audit enforces

`npm run audit` fails the build if any of these are wrong in the built HTML:

- `<html lang>` does not match the page's market
- a hreflang code is not registered in `markets.js`, or appears twice on a page
- a hreflang target does not exist, is noindexed, or canonicalises elsewhere
- a target does not link back under a real language code (x-default alone does
  not count)
- any two members of a cluster carry different hreflang sets
- a cluster has no x-default, or a market page has no self-reference
- a noindexed page carries hreflang
- the sitemap's `xhtml:link` alternates differ from the page's `<head>`

The `<head>` tags, the sitemap and the market switcher all come from one
computation in `src/lib/i18n.js`, so they cannot drift by accident; the audit
proves they did not.

---

## 4. Adding a market

1. Add it to `MARKETS` and `MARKET_ORDER` in `src/data/markets.js` — prefix,
   hreflang codes, `htmlLang`, `ogLocale`, vocabulary, form labels, ports.
2. Add its journey to `src/data/journey.js` and its slug to `src/data/routes.js`.
3. Write its home, cost and shipping-times pages with `market` and
   `hreflangGroup` set, and add them to the route map. Its quote page is
   generated.
4. `npm run check`. Every existing cluster gains the new market automatically.

**A translated market** (for example German at `/de/`) is the same process
with `hreflang: ['de-DE', 'de-AT', 'de-CH']` and `htmlLang: 'de'`. Remove the
matching `en-DE` / `en-AT` / `en-CH` codes from Europe only if you want German
speakers there to see the German pages instead; English-speaking browsers in
Germany will still get `/europe/`.

---

## 5. After launch

- Submit `https://removalstonz.com/sitemap.xml` in Search Console.
- Add the five market folders as URL-prefix properties.
- Watch **International targeting / hreflang** reports for "no return tags"
  errors — there should be none.
- Do not add a country target to the domain property.
- Build links into market folders, not just the root: a UK directory listing
  should point at `/uk/`, a US one at `/us/`.
