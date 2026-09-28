/**
 * Navigation and lead-form configuration, per market.
 *
 * Playbook 4.4: global navigation stays focused on the most important areas.
 * Every long-tail page is reached from its hub, not from the header.
 *
 * A reader on a market page stays in that market: the header's cost and
 * shipping-time links and the quote button all point at their own market's
 * pages. Shared NZ pages (destinations, guides) sit in every market's nav.
 */

import { R } from './routes.js';
import { MARKETS, MARKET_ORDER } from './markets.js';

const SHARED = [
  { href: R.destinations, label: 'Destinations' },
  { href: R.guides, label: 'Guides' }
];

export function navFor(marketKey) {
  if (!marketKey) {
    return [
      { href: R.uk.home, label: 'From the UK' },
      { href: R.us.home, label: 'From the USA' },
      { href: R.au.home, label: 'From Australia' },
      ...SHARED,
      { href: R.about, label: 'About' }
    ];
  }
  const m = R[marketKey];
  const items = [];
  if (marketKey === 'uk') items.push({ href: R.uk.services, label: 'Services' });
  items.push({ href: m.cost, label: 'Costs' });
  items.push({ href: m.times, label: 'Shipping times' });
  items.push(...SHARED);
  return items;
}

/** Footer columns. The first column is market-specific; the rest are shared. */
export function footerNavFor(marketKey) {
  const planning = {
    title: 'New Zealand',
    links: [
      { href: R.auckland, label: 'Removals to Auckland' },
      { href: R.wellington, label: 'Removals to Wellington' },
      { href: R.christchurch, label: 'Removals to Christchurch' },
      { href: R.tauranga, label: 'Removals to Tauranga' },
      { href: R.hamilton, label: 'Removals to Hamilton' },
      { href: R.queenstown, label: 'Removals to Queenstown' }
    ]
  };
  const guides = {
    title: 'Plan your move',
    links: [
      { href: R.calculator, label: 'Volume calculator' },
      { href: R.customs, label: 'NZ customs rules' },
      { href: R.biosecurity, label: 'Biosecurity: what you cannot bring' },
      { href: R.checklist, label: 'Moving checklist' },
      { href: R.guides, label: 'All guides' },
      { href: R.about, label: 'About us' },
      { href: R.contact, label: 'Contact' },
      { href: R.legal, label: 'Legal and privacy' }
    ]
  };

  let first;
  if (marketKey === 'uk') {
    first = {
      title: 'From the UK',
      links: [
        { href: R.uk.household, label: 'Household removals' },
        { href: R.uk.partLoad, label: 'Part load and small removals' },
        { href: R.uk.furniture, label: 'Furniture removals' },
        { href: R.uk.container, label: 'Container shipping' },
        { href: R.uk.baggage, label: 'Excess baggage' },
        { href: R.uk.cost, label: 'What it costs' },
        { href: R.uk.collection, label: 'UK collection areas' }
      ]
    };
  } else {
    first = {
      title: 'Moving from',
      links: MARKET_ORDER.map((k) => ({
        href: R[k].home,
        label: `Removals to New Zealand ${MARKETS[k].from}`
      }))
    };
  }
  return [first, planning, guides];
}
