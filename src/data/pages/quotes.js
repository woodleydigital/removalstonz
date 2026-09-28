/**
 * Market quote pages — /uk/get-a-quote/, /us/get-a-quote/ and so on.
 *
 * Each market gets its own quote page so the header button never takes a
 * reader out of their market, and the form asks for a postcode, ZIP or postal
 * code in their own terms. They are NOINDEXED on purpose: five near-identical
 * form pages would be thin duplicates of each other, "get a quote" is not a
 * query anyone ranks for, and a noindexed page must stay out of hreflang
 * clusters. The market home, which carries the same form, is what ranks.
 */

import { R } from '../routes.js';
import { MARKETS } from '../markets.js';

const WORDS = {
  uk: { who: 'UK', noun: 'removals', start: 'collection', local: 'the survey can be done by video or at your UK home' },
  us: { who: 'US', noun: 'moving', start: 'pickup', local: 'the survey can be done by video or at your home anywhere in the US' },
  au: { who: 'Australia', noun: 'removals', start: 'pickup', local: 'the survey can be done by video or at your home in Australia' },
  ca: { who: 'Canada', noun: 'moving', start: 'pickup', local: 'the survey can be done by video or at your home in Canada' },
  europe: { who: 'Europe', noun: 'removals', start: 'collection', local: 'the survey is usually done by video for European moves' }
};

export function makeQuotePage(key) {
  const m = MARKETS[key];
  const w = WORDS[key];
  return {
    path: R[key].quote,
    market: key,
    template: 'quote',
    noindex: true,
    title: `Get a ${w.who} to New Zealand ${w.noun === 'moving' ? 'Moving' : 'Removals'} Quote | Removals to NZ`,
    h1: `Get your ${w.who} to New Zealand ${w.noun} quote`,
    lede: 'Five short questions, and a move consultant replies with a written estimate and a survey slot.',
    description: `Request a written quote for ${w.noun} to New Zealand ${m.from}.`,
    crumbs: [
      { href: R.global, label: 'Home' },
      { href: m.prefix, label: m.short },
      { href: R[key].quote, label: 'Get a quote' }
    ],
    blocks: [
      { type: 'h2', text: 'What happens after you send this' },
      {
        type: 'steps',
        items: [
          { title: 'A written reply', body: 'Usually within one working day, from a consultant who handles your route.' },
          { title: 'A survey', body: `For anything bigger than a few boxes, ${w.local}. No household move can be priced properly from a form.` },
          { title: 'An itemised quote', body: `${w.start[0].toUpperCase() + w.start.slice(1)} and packing, freight, and New Zealand destination charges shown separately, with exclusions listed.` }
        ]
      },
      { type: 'h2', text: 'What we will ask at the survey' },
      {
        type: 'p',
        text: 'So you can have the answers ready: your visa or residence status and when you expect to arrive, the New Zealand town you are moving to and whether you have an address yet, anything that has been used outdoors, anything that needs crating, and whether a vehicle is coming.'
      },
      {
        type: 'cards',
        heading: 'Not ready for a quote yet?',
        cols: 2,
        items: [
          { href: R.calculator, title: 'Work out your volume first', body: 'The figure that drives every price.', cta: 'Open the calculator' },
          { href: R[key].cost, title: 'See how costs are built', body: `What a move ${m.from} involves, by size.`, cta: 'See costs' }
        ]
      }
    ]
  };
}
