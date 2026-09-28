/**
 * hreflang clusters, computed from the route map.
 *
 * A page joins a cluster by declaring `hreflangGroup`. Every indexable member
 * of the cluster lists every member — itself included — plus an x-default.
 * Because each page's list is derived from the same set, the annotations are
 * reciprocal by construction; audit.mjs verifies it anyway from the built HTML.
 *
 * x-default is the member flagged `xDefault: true` (the global chooser at `/`
 * for the home cluster). Clusters without one fall back to the UK page, the
 * primary market, which is the best page for an English speaker we have no
 * market for.
 *
 * Noindexed pages never join a cluster: hreflang pointing at a noindexed URL
 * is ignored by Google and flagged as an error in Search Console.
 */

import { SITE_URL } from '../data/site.js';
import { MARKETS, MARKET_ORDER } from '../data/markets.js';

export function buildAlternates(pages) {
  const groups = new Map();
  for (const p of pages) {
    if (!p.hreflangGroup || p.noindex) continue;
    if (!groups.has(p.hreflangGroup)) groups.set(p.hreflangGroup, []);
    groups.get(p.hreflangGroup).push(p);
  }

  const byPath = new Map();
  for (const [group, members] of groups) {
    const marketMembers = MARKET_ORDER.map((k) => members.find((p) => p.market === k)).filter(Boolean);
    const xDefault = members.find((p) => p.xDefault) || members.find((p) => p.market === 'uk');
    if (!xDefault) throw new Error(`hreflang group "${group}" has no x-default candidate`);

    const links = [];
    for (const p of marketMembers) {
      for (const code of MARKETS[p.market].hreflang) {
        links.push({ hreflang: code, href: SITE_URL + p.path, path: p.path, market: p.market });
      }
    }
    links.push({ hreflang: 'x-default', href: SITE_URL + xDefault.path, path: xDefault.path, market: null });

    for (const p of members) byPath.set(p.path, links);
  }
  return byPath;
}

/**
 * The equivalent of `page` in each market, for the visible market switcher.
 * Uses the hreflang cluster when there is one, and the market home otherwise,
 * so the switcher always offers all five markets and never a dead end.
 */
export function switcherLinks(page) {
  const alts = page.alternates || [];
  return MARKET_ORDER.map((k) => {
    const hit = alts.find((a) => a.market === k);
    return {
      market: k,
      label: MARKETS[k].switcherLabel,
      href: hit ? hit.path : MARKETS[k].prefix,
      current: page.market === k
    };
  });
}
