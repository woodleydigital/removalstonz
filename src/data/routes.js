/**
 * Every URL on the site, named once. Page data, navigation and templates import
 * from here rather than typing paths, so a renamed route cannot leave a broken
 * link behind (and the audit fails the build if one slips through anyway).
 */

import { MARKETS } from './markets.js';

const SLUG = { uk: 'uk', us: 'usa', au: 'australia', ca: 'canada', europe: 'europe' };

/** Routes that exist in every market. */
const marketRoutes = (key) => {
  const p = MARKETS[key].prefix;
  return {
    home: p,
    cost: `${p}cost-of-moving-to-new-zealand-from-${SLUG[key]}/`,
    times: `${p}shipping-times-${SLUG[key]}-to-new-zealand/`,
    quote: `${p}get-a-quote/`
  };
};

export const R = {
  global: '/',

  destinations: '/destinations/',
  auckland: '/destinations/auckland/',
  wellington: '/destinations/wellington/',
  christchurch: '/destinations/christchurch/',
  tauranga: '/destinations/tauranga/',
  hamilton: '/destinations/hamilton/',
  queenstown: '/destinations/queenstown/',

  guides: '/guides/',
  customs: '/guides/new-zealand-customs-personal-effects/',
  biosecurity: '/guides/new-zealand-biosecurity-what-you-cannot-bring/',
  seaVsAir: '/guides/sea-vs-air-freight-to-new-zealand/',
  checklist: '/guides/moving-to-new-zealand-checklist/',
  compareQuotes: '/guides/comparing-international-removal-quotes/',

  calculator: '/tools/moving-volume-calculator/',
  inventory: '/tools/moving-volume-calculator/#volume-assumptions',

  about: '/about/',
  contact: '/contact/',
  legal: '/legal/',
  quote: '/get-a-quote/',
  thankYou: '/thank-you/',

  uk: {
    ...marketRoutes('uk'),
    services: '/uk/services/',
    household: '/uk/services/household-removals-to-new-zealand/',
    partLoad: '/uk/services/part-load-removals-to-new-zealand/',
    furniture: '/uk/services/furniture-removals-to-new-zealand/',
    container: '/uk/services/container-shipping-to-new-zealand/',
    baggage: '/uk/services/excess-baggage-to-new-zealand/',
    collection: '/uk/collection-areas/'
  },
  us: marketRoutes('us'),
  au: marketRoutes('au'),
  ca: marketRoutes('ca'),
  europe: marketRoutes('europe')
};
