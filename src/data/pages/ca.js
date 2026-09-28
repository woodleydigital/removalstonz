/**
 * CANADA MARKET — /ca/ (en-CA).
 *
 * Canadian vocabulary ("moving", "movers"), both units (metric is official
 * but many people think in square and cubic feet), Canadian dates, and the
 * points that genuinely differ: Vancouver as the main gateway, the choice
 * between railing west and sailing from Montreal or Halifax for eastern
 * provinces, winter pickups, 120 V appliances and left-hand-drive vehicles.
 */

import { R } from '../routes.js';

const M = R.ca;
const HOME = { href: R.global, label: 'Home' };
const CA = { href: M.home, label: 'Canada' };
const c = (...items) => [HOME, CA, ...items];
const PUB = '2026-09-28';
const AREAS = ['Canada', 'New Zealand'];

export const caHome = {
  path: M.home,
  market: 'ca',
  hreflangGroup: 'home',
  template: 'home',
  title: 'Moving to New Zealand from Canada | International Movers',
  h1: 'Moving to New Zealand from Canada',
  eyebrow: 'International moving · Canada to New Zealand',
  h1Accent: 'from Canada',
  lede:
    'International moving from anywhere in Canada to anywhere in New Zealand — from Vancouver, Calgary, Toronto, Montréal, Halifax and everywhere between, cleared through NZ biosecurity and delivered door to door.',
  description:
    'Moving to New Zealand from Canada: door-to-door international moving via Vancouver, Montreal or Halifax, shared and full containers, NZ biosecurity-ready packing.',
  published: PUB,
  updated: PUB,
  crumbs: [HOME, CA],
  heroCta: { href: M.cost, label: 'See what it costs' },
  heroTrust: [
    '**Pickup in every province** — territories on request',
    '**Volumes in cubic metres and cubic feet** — whichever you think in',
    '**Door to door** — one written quote from your Canadian home to your New Zealand one'
  ],
  service: {
    name: 'International moving from Canada to New Zealand',
    type: 'International household moving',
    description:
      'Door-to-door packing, export, ocean and air freight, New Zealand customs and MPI biosecurity clearance and delivery for households moving from Canada to New Zealand.',
    areaServed: AREAS,
    audience: 'Households relocating from Canada to New Zealand'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Most moves from Canada to New Zealand ship through Vancouver, three to four weeks across the Pacific from Auckland. From Ontario, Québec and the Atlantic provinces, the shipment either travels west by rail or truck first, or sails from Montréal or Halifax on a longer ocean route. Either way, plan on eight to fifteen weeks door to door for a shared container.',
        'As with a US move, much of what is in a Canadian home runs on 120 volts, and New Zealand runs on 230. Deciding what to leave behind is the first and biggest saving.'
      ]
    },
    {
      type: 'cards',
      heading: 'Plan a move from Canada',
      cols: 3,
      items: [
        { href: R.calculator, eyebrow: 'Tool', title: 'Volume calculator', body: 'Your shipment in cubic metres and cubic feet, item by item.', cta: 'Estimate my volume' },
        { href: M.cost, eyebrow: 'Costs', title: 'What moving to NZ costs', body: 'How quotes are built, west versus east, and shared versus your own container.', cta: 'See the cost guide' },
        { href: M.times, eyebrow: 'Timing', title: 'Shipping times from Canada', body: 'Vancouver, Montréal and Halifax compared.', cta: 'Shipping times' }
      ]
    },
    { type: 'journey', heading: 'Where the weeks actually go', intro: 'Proportions of a typical Canada to New Zealand shared-container move, using the midpoint of each planning range.' },
    { type: 'h2', text: 'West or east: how your move is routed' },
    {
      type: 'p',
      text: 'From British Columbia and Alberta, the answer is simple: Vancouver. From further east there is a real choice. Railing or trucking a shipment to Vancouver adds cross-country transport but keeps the Pacific crossing short. Sailing from Montréal or Halifax avoids the land leg but means a much longer voyage, usually via the Panama Canal or a transhipment hub. The better option changes with schedules and rates; a good quote tells you which one it assumes.'
    },
    { type: 'h2', text: 'What to leave in Canada' },
    {
      type: 'ul',
      items: [
        '**Appliances and 120 V electronics.** New Zealand\'s 230 V, 50 Hz supply will not run most Canadian appliances without transformers. Dual-voltage devices are fine with a plug adapter.',
        '**Your vehicle, in most cases.** New Zealand drives on the left and restricts left-hand-drive vehicles. Check with NZ Transport Agency Waka Kotahi before you ship one.',
        '**Winter gear you will not use.** Snow blowers and heavy winter tires rarely earn their freight — although the South Island does have real winters.',
        '**Anything that has been in the dirt.** Garden tools, bikes, hockey and camping gear must be spotless for MPI.'
      ]
    },
    { type: 'h2', text: 'Winter pickups' },
    {
      type: 'p',
      text: 'A January pickup in Winnipeg or Edmonton is a different job from one in July. Snow, ice and cold affect loading, and some items — electronics, instruments, anything with liquid in it — need care when packed in deep cold and shipped into a New Zealand summer. Movers plan for it; tell them about anything sensitive. A winter move also has an upside: you arrive in the Southern Hemisphere summer.'
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used here.** Cost and transit ranges are planning figures, not rates; no rate is issued without a survey. Customs and biosecurity rules are described in general terms — confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and [MPI](https://www.mpi.govt.nz/).'
      ]
    },
    { type: 'lead', heading: 'Get your Canada to New Zealand moving quote', id: 'quote-foot' }
  ],
  faqs: [
    { q: 'How long does it take to ship household goods from Canada to New Zealand?', a: 'Plan on eight to fifteen weeks door to door by sea; about three to four weeks at sea from Vancouver. See [shipping times from Canada](/ca/shipping-times-canada-to-new-zealand/).' },
    { q: 'How much does it cost to move from Canada to New Zealand?', a: 'It depends on volume, your province and whether you share a container. The [Canada cost guide](/ca/cost-of-moving-to-new-zealand-from-canada/) explains how quotes are built.' },
    { q: 'Can I take my Canadian car to New Zealand?', a: 'Left-hand-drive vehicles face restrictions in New Zealand. Check eligibility with NZ Transport Agency Waka Kotahi before shipping one; most people sell and buy locally.' },
    { q: 'Will my bedding fit New Zealand beds?', a: 'Not always. Canadian Queen beds are close to a New Zealand Queen, but a Canadian King is wider than a New Zealand King, so King linen and frames may not fit.' }
  ],
  next: [
    { href: M.cost, label: 'What moving to New Zealand costs from Canada', why: 'How quotes are built, west and east.' },
    { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'The rules that decide what is worth packing.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Which port serves which city.' }
  ]
};

export const caCost = {
  path: M.cost,
  market: 'ca',
  hreflangGroup: 'cost',
  template: 'guide',
  title: 'Cost of Moving to New Zealand from Canada | Moving Costs',
  h1: 'What it costs to move to New Zealand from Canada',
  lede:
    'How Canada to New Zealand moving quotes are built, how your province changes the price, and what each size of home involves in cubic metres and cubic feet.',
  description:
    'Cost of moving to New Zealand from Canada: how quotes are built from volume, west versus east routing, shared versus full containers, and charges to check.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.cost, label: 'Cost of moving to New Zealand' }),
  service: {
    name: 'Canada to New Zealand moving quotation and cost planning',
    type: 'International moving pricing',
    description: 'Cost structure and planning ranges for household moves from Canada to New Zealand.',
    areaServed: AREAS
  },
  sections: [
    'How a Canada to New Zealand quote is built',
    'Your province and the price',
    'Home size and how it ships',
    'Questions to ask every mover',
    'Saving money on a move from Canada'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A move from Canada to New Zealand is priced from the volume of your shipment. Add the Canadian origin work, the transport to a port, the ocean freight and the New Zealand destination services, and you have the quote. Where you live in Canada matters more than on most routes, because the country is wide and most New Zealand sailings leave from its western edge.',
        '**We do not publish rates**, because Pacific freight moves with fuel, capacity and season. Here is the structure instead.'
      ]
    },
    { type: 'h2', text: 'How a Canada to New Zealand quote is built' },
    {
      type: 'table',
      caption: 'The parts of a moving quote from Canada to New Zealand.',
      head: ['Part', 'What it covers', 'What drives the cost'],
      rows: [
        ['Canadian origin', 'Survey, packing, pickup, export paperwork', 'Volume, access, season'],
        ['Transport to the port', 'Rail or truck to Vancouver, or to Montréal or Halifax', 'Your province'],
        ['Ocean freight', 'Shared or your own container', 'Volume, route, season'],
        ['New Zealand destination', 'Port and warehouse handling, customs, MPI, delivery', 'Volume, NZ city, access'],
        ['Options', 'Insurance, storage, crating', 'Your circumstances']
      ]
    },
    { type: 'h2', text: 'Your province and the price' },
    {
      type: 'p',
      text: 'British Columbia is closest to the Pacific gateway, so BC moves have the smallest land leg. Alberta and the Prairies add a rail or truck journey west. Ontario and Québec sit at the crossover, where sailing from Montréal can compete with going west. The Atlantic provinces often sail from Halifax. None of this changes the New Zealand end, but it can change the total by a meaningful amount — which is why a quote should name the port it assumes.'
    },
    { type: 'h2', text: 'Home size and how it ships' },
    {
      type: 'table',
      caption: 'Typical volumes for Canadian homes and how each ships to New Zealand. Planning figures.',
      head: ['Home', 'Volume', 'How it ships', 'Door to door'],
      rows: [
        ['Boxes and suitcases', 'Under 2 m³ (70 cu ft)', 'Air, or a small shared shipment', '1–3 weeks air'],
        ['Condo or one-bedroom', '5–12 m³ (175–425 cu ft)', 'Shared container', '10–15 weeks'],
        ['Two to three-bedroom house', '12–30 m³ (425–1,050 cu ft)', 'Shared or 20ft container', '8–15 weeks'],
        ['Larger family home', '30–67 m³ (1,050–2,350 cu ft)', '40ft container', '8–12 weeks']
      ]
    },
    { type: 'h2', text: 'Questions to ask every mover' },
    {
      type: 'ul',
      items: [
        'Which Canadian port does this quote assume, and is the land leg included?',
        'Is it door to door, including New Zealand customs, MPI and delivery?',
        'What volume is it based on, and was it surveyed?',
        'How are MPI inspection and any treatment charged?',
        'What does marine insurance cost, and on what valuation?'
      ]
    },
    {
      type: 'p',
      text: 'Our [guide to comparing quotes](/guides/comparing-international-removal-quotes/) explains why each question matters.'
    },
    { type: 'h2', text: 'Saving money on a move from Canada' },
    {
      type: 'ol',
      items: [
        '**Leave 120 V appliances** and heavy winter equipment behind.',
        '**Downsize furniture** sized for a large Canadian basement.',
        '**Be flexible on dates** so a shared container fills around you.',
        '**Pick up outside the deep-winter months** if you can.',
        '**Compare door-to-door quotes that name the same port.**'
      ]
    }
  ],
  faqs: [
    { q: 'Is it cheaper to move to New Zealand from Vancouver than from Toronto?', a: 'Usually, because there is no cross-country leg. From Toronto, compare routing west with sailing from Montréal.' },
    { q: 'Do Canadian movers price by weight or volume for New Zealand?', a: 'International ocean moves are priced by volume. Domestic Canadian moves are often priced by weight, which is why the numbers look different.' }
  ],
  next: [
    { href: R.calculator, label: 'Estimate your volume', why: 'In cubic metres and cubic feet.' },
    { href: M.times, label: 'How long shipping from Canada takes', why: 'Route and timing go together.' },
    { href: R.compareQuotes, label: 'How to compare moving quotes', why: 'Line quotes up on the same basis.' }
  ]
};

export const caTimes = {
  path: M.times,
  market: 'ca',
  hreflangGroup: 'times',
  template: 'guide',
  title: 'Shipping Times from Canada to New Zealand | Household Goods',
  h1: 'How long shipping from Canada to New Zealand takes',
  lede:
    'Eight to fifteen weeks door to door for most Canadian moves by sea — and how your province, and the port your shipment leaves from, change that.',
  description:
    'How long shipping household goods from Canada to New Zealand takes: Vancouver, Montreal and Halifax routings, customs and MPI clearance, and delivery.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.times, label: 'Shipping times' }),
  sections: ['The short answer', 'Where the weeks actually go', 'Routing by province', 'Arriving in the right season'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Plan on eight to fifteen weeks from pickup in Canada to delivery in New Zealand for a shared container. From Vancouver, the Pacific crossing is about three to four weeks. From Montréal or Halifax, the ocean leg is closer to six or seven. Consolidation, clearance and delivery account for the rest.'
      ]
    },
    { type: 'h2', text: 'The short answer' },
    {
      type: 'p',
      text: 'West of Ontario, expect the shorter end of the range. From the east, expect the longer end whichever way your goods are routed — the cross-country rail journey and the long Atlantic-to-Pacific voyage take similar time.'
    },
    { type: 'h2', text: 'Where the weeks actually go' },
    { type: 'journey', market: 'ca', heading: 'Canada to New Zealand, door to door', intro: 'Proportions of a typical shared-container move, using the midpoint of each planning range.' },
    { type: 'h2', text: 'Routing by province' },
    {
      type: 'table',
      caption: 'Typical routing from Canada to New Zealand. Planning figures; schedules change.',
      head: ['Pickup', 'Usual routing', 'Ocean transit'],
      rows: [
        ['British Columbia', 'Vancouver (or Prince Rupert)', 'About 3–4 weeks'],
        ['Alberta, Saskatchewan, Manitoba', 'Rail or truck to Vancouver', 'About 3–4 weeks, plus the land leg'],
        ['Ontario and Québec', 'West to Vancouver, or from Montréal', 'About 3–7 weeks, depending on route'],
        ['Atlantic provinces', 'Halifax', 'About 6–7 weeks']
      ]
    },
    { type: 'h2', text: 'Arriving in the right season' },
    {
      type: 'p',
      text: 'New Zealand\'s seasons are the reverse of Canada\'s. If you pack in the Canadian autumn, your goods arrive in the New Zealand summer, so send summer clothes by [air](/guides/sea-vs-air-freight-to-new-zealand/) or in your suitcase and let the parkas take the slow route. Also plan around your own arrival: NZ Customs generally will not clear your goods until you are in the country.'
    }
  ],
  faqs: [
    { q: 'What is the fastest way to ship household goods from Canada to New Zealand?', a: 'Your own container from Vancouver, sailing on a date you choose. For a few boxes, air freight takes one to three weeks.' },
    { q: 'Can winter weather delay my move?', a: 'Snow can delay pickups and rail connections across the Prairies and the Rockies. Build a little slack into a winter move.' }
  ],
  next: [
    { href: M.cost, label: 'What moving to New Zealand costs from Canada', why: 'The price side of routing.' },
    { href: R.customs, label: 'NZ customs rules for household goods', why: 'What clearance needs from you.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'Working back from your flight.' }
  ]
};
