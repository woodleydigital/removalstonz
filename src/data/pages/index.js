/**
 * ROUTE MAP.
 *
 * Every route, its market, its template and its hreflang cluster. audit.mjs
 * validates the built site against this list.
 *
 *   GLOBAL (lang "en", no market)
 *     /                          chooser — x-default for the market homes
 *     /destinations/*            shared NZ destination pages (no hreflang)
 *     /guides/*  /tools/*        shared informational pages (no hreflang)
 *     /about/ /contact/ /legal/  trust
 *     /get-a-quote/              conversion (noindex): IMC's embedded form
 *
 *   MARKETS  /uk/ /us/ /au/ /ca/ /europe/
 *     home   ─┐
 *     cost   ─┼─ hreflang clusters across all five markets
 *     times  ─┘
 *     get-a-quote/  (noindex, never in a cluster)
 *     UK only: services/*, collection-areas/
 */

import { chooser, volumeCalculator, getAQuote, about, contact, legal } from './global.js';
import { destinationsHub, auckland, wellington, christchurch, tauranga, hamilton, queenstown } from './destinations.js';
import { guidesHub, customs, biosecurity, seaVsAir, checklist, compareQuotes } from './guides.js';
import {
  ukHome, ukServices, ukHousehold, ukPartLoad, ukFurniture, ukContainer, ukBaggage,
  ukCost, ukTimes, ukCollection
} from './uk.js';
import { MARKET_PAGES } from './markets-other.js';
import { makeQuotePage } from './quotes.js';
import { MARKET_ORDER } from '../markets.js';
import { R } from '../routes.js';

export const PAGES = [
  // Global
  chooser,

  // UK — primary market
  ukHome, ukServices, ukHousehold, ukPartLoad, ukFurniture, ukContainer, ukBaggage,
  ukCost, ukTimes, ukCollection,

  // US, Australia, Canada, Europe
  ...MARKET_PAGES,

  // Shared New Zealand content
  destinationsHub, auckland, wellington, christchurch, tauranga, hamilton, queenstown,
  guidesHub, biosecurity, customs, seaVsAir, checklist, compareQuotes,
  volumeCalculator,

  // Trust and conversion
  about, contact, legal, getAQuote,
  ...MARKET_ORDER.map(makeQuotePage)
];

/** Sitemap priority and change frequency by role. Used only for sitemap.xml. */
export const SITEMAP_HINTS = {
  '/': { priority: '1.0', changefreq: 'monthly' },
  ...Object.fromEntries(MARKET_ORDER.flatMap((k) => [
    [R[k].home, { priority: k === 'uk' ? '1.0' : '0.9', changefreq: 'monthly' }],
    [R[k].cost, { priority: '0.9', changefreq: 'monthly' }],
    [R[k].times, { priority: '0.8', changefreq: 'monthly' }]
  ])),
  [R.destinations]: { priority: '0.8', changefreq: 'monthly' },
  [R.guides]: { priority: '0.7', changefreq: 'monthly' },
  [R.calculator]: { priority: '0.8', changefreq: 'yearly' }
};
