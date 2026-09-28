/**
 * MARKET REGISTRY — the single source of truth for international targeting.
 * =========================================================================
 *
 * Removals to NZ serves five origin markets from one .com. Each market has its
 * own subfolder and its own commercial pages; everything about the New Zealand
 * end (destinations, customs, biosecurity, guides) is written once, at the
 * root, and shared by all of them.
 *
 *   /            global chooser — the hreflang x-default
 *   /uk/         United Kingdom  (primary market, largest search demand)
 *   /us/         United States
 *   /au/         Australia
 *   /ca/         Canada
 *   /europe/     Continental Europe and Ireland
 *
 * WHY SUBFOLDERS: one domain keeps all link equity in one place, a .com is not
 * geo-restricted, and a folder per market can be verified as its own property
 * in Search Console. Do NOT set a country target on the domain — it serves five
 * countries plus Europe.
 *
 * WHY HREFLANG ONLY ON EQUIVALENT PAGES: hreflang says "this page is the same
 * thing for a different audience". It is emitted only between pages that
 * genuinely are equivalents across markets (market home, cost page, shipping
 * times). Shared NZ pages have no alternates and carry no hreflang at all.
 *
 * WHY NO GEO-REDIRECT: Googlebot crawls mostly from the US. An IP redirect would
 * hide every non-US page from it. Visitors are offered their market by a
 * dismissible banner (app.js) and a plain-link market switcher, never forced.
 *
 * `hreflang` may list several codes for one URL. Europe uses this: one English
 * page annotated for each European country we collect from, which Google
 * supports. en-GB is deliberately NOT in Europe's list — it belongs to /uk/.
 */

export const MARKETS = {
  uk: {
    key: 'uk',
    prefix: '/uk/',
    name: 'United Kingdom',
    short: 'UK',
    switcherLabel: 'UK',
    from: 'from the UK',
    // BCP 47 codes. The first is the page's own <html lang>.
    hreflang: ['en-GB'],
    htmlLang: 'en-GB',
    ogLocale: 'en_GB',
    countries: ['GB'],
    // Vocabulary. UK and Australian searchers say "removals"; North Americans
    // say "moving" and "movers". The keyword data bears this out.
    term: 'removals',
    moverTerm: 'removals company',
    units: 'metric',
    originLabel: 'Collection postcode or town in the UK',
    originPlaceholder: 'e.g. SW1A 1AA or Manchester',
    ports: ['Southampton', 'Felixstowe', 'London Gateway', 'Liverpool'],
    dateLocale: 'en-GB'
  },
  us: {
    key: 'us',
    prefix: '/us/',
    name: 'United States',
    short: 'USA',
    switcherLabel: 'USA',
    from: 'from the USA',
    hreflang: ['en-US'],
    htmlLang: 'en-US',
    ogLocale: 'en_US',
    countries: ['US'],
    term: 'moving',
    moverTerm: 'moving company',
    units: 'imperial',
    originLabel: 'Pickup ZIP code or city in the US',
    originPlaceholder: 'e.g. 94110 or Denver, CO',
    ports: ['Los Angeles / Long Beach', 'Oakland', 'Seattle / Tacoma', 'Houston', 'Savannah', 'New York / New Jersey'],
    dateLocale: 'en-US'
  },
  au: {
    key: 'au',
    prefix: '/au/',
    name: 'Australia',
    short: 'Australia',
    switcherLabel: 'Australia',
    from: 'from Australia',
    hreflang: ['en-AU'],
    htmlLang: 'en-AU',
    ogLocale: 'en_AU',
    countries: ['AU'],
    term: 'removals',
    moverTerm: 'removalist',
    units: 'metric',
    originLabel: 'Pickup postcode or suburb in Australia',
    originPlaceholder: 'e.g. 2000 or Brisbane',
    ports: ['Sydney (Port Botany)', 'Melbourne', 'Brisbane', 'Fremantle', 'Adelaide'],
    dateLocale: 'en-AU'
  },
  ca: {
    key: 'ca',
    prefix: '/ca/',
    name: 'Canada',
    short: 'Canada',
    switcherLabel: 'Canada',
    from: 'from Canada',
    hreflang: ['en-CA'],
    htmlLang: 'en-CA',
    ogLocale: 'en_CA',
    countries: ['CA'],
    term: 'moving',
    moverTerm: 'moving company',
    units: 'metric',
    originLabel: 'Pickup postal code or city in Canada',
    originPlaceholder: 'e.g. M5V 2T6 or Calgary',
    ports: ['Vancouver', 'Prince Rupert', 'Montreal', 'Halifax'],
    dateLocale: 'en-CA'
  },
  europe: {
    key: 'europe',
    prefix: '/europe/',
    name: 'Europe',
    short: 'Europe',
    switcherLabel: 'Europe',
    from: 'from Europe',
    // English-language page for European audiences. Add a translated market
    // (e.g. /de/ with hreflang de-DE) later without disturbing these.
    hreflang: [
      'en-IE', 'en-NL', 'en-BE', 'en-LU', 'en-DE', 'en-AT', 'en-CH', 'en-FR',
      'en-ES', 'en-PT', 'en-IT', 'en-DK', 'en-SE', 'en-NO', 'en-FI', 'en-PL'
    ],
    htmlLang: 'en',
    ogLocale: 'en_IE',
    countries: ['IE', 'NL', 'BE', 'LU', 'DE', 'AT', 'CH', 'FR', 'ES', 'PT', 'IT', 'DK', 'SE', 'NO', 'FI', 'PL'],
    term: 'removals',
    moverTerm: 'international mover',
    units: 'metric',
    originLabel: 'Collection town and country in Europe',
    originPlaceholder: 'e.g. Amsterdam, Netherlands',
    ports: ['Rotterdam', 'Antwerp', 'Hamburg', 'Bremerhaven', 'Dublin'],
    dateLocale: 'en-IE'
  }
};

export const MARKET_ORDER = ['uk', 'us', 'au', 'ca', 'europe'];

/** Settings for pages that belong to no market: the chooser and shared NZ content. */
export const GLOBAL = {
  key: null,
  prefix: '/',
  htmlLang: 'en',
  ogLocale: 'en_GB',
  dateLocale: 'en-GB'
};

export const marketOf = (page) => (page && page.market ? MARKETS[page.market] : GLOBAL);

/** The market's own quote page, or the global one for shared pages. */
export const quoteHref = (page) => `${marketOf(page).prefix}get-a-quote/`;

/** All hreflang codes in use, for the audit's validity check. */
export const ALL_HREFLANG = MARKET_ORDER.flatMap((k) => MARKETS[k].hreflang);
