/**
 * AUSTRALIA MARKET — /au/ (en-AU).
 *
 * The trans-Tasman lane is unlike every other on the site: a short sailing,
 * frequent services, many competing removalists, and a large share of
 * returning New Zealanders. Copy uses Australian vocabulary ("removalists",
 * "backloading"), metric, and the points that genuinely differ: timing your
 * arrival against the goods, the returning-resident concession, right-hand-
 * drive cars that suit NZ, and biosecurity as the pacing stage.
 */

import { R } from '../routes.js';

const M = R.au;
const HOME = { href: R.global, label: 'Home' };
const AU = { href: M.home, label: 'Australia' };
const c = (...items) => [HOME, AU, ...items];
const PUB = '2026-09-28';
const AREAS = ['Australia', 'New Zealand'];

export const auHome = {
  path: M.home,
  market: 'au',
  hreflangGroup: 'home',
  template: 'home',
  title: 'Removals to New Zealand from Australia | Trans-Tasman Moves',
  h1: 'Removals to New Zealand from Australia',
  lede:
    'Trans-Tasman removals from Sydney, Melbourne, Brisbane, Perth, Adelaide and everywhere between — packed for New Zealand biosecurity and delivered door to door, usually within four to eight weeks.',
  description:
    'Trans-Tasman removals from Australia to New Zealand: part loads and containers from every capital, NZ biosecurity-ready packing, door to door in 4–8 weeks.',
  published: PUB,
  updated: PUB,
  crumbs: [HOME, AU],
  heroCta: { href: M.cost, label: 'See what it costs' },
  heroTrust: [
    '**Pickup from every state and territory** — metro and regional',
    '**Door to door across the Tasman** — one quote, one point of contact',
    '**Timed around your arrival** — so your goods are not waiting on you, or you on them'
  ],
  service: {
    name: 'Trans-Tasman removals from Australia to New Zealand',
    type: 'International household removals',
    description:
      'Door-to-door packing, export, sea and air freight, New Zealand customs and MPI biosecurity clearance and delivery for households moving from Australia to New Zealand.',
    areaServed: AREAS,
    audience: 'Households moving from Australia to New Zealand, including returning New Zealanders'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A trans-Tasman move is the shortest international removal to New Zealand: the sailing from an Australian capital-city port takes around one to two weeks, and four to eight weeks door to door is a sensible plan for a shared container. Many removalists quote for it, and prices are competitive.',
        'Because the sea leg is so short, the pacing stages are the ones either side of it: consolidation in Australia, and New Zealand customs and biosecurity clearance on arrival. MPI treats goods from Australia as seriously as goods from anywhere else, and trans-Tasman shipments are often full of outdoor gear.'
      ]
    },
    {
      type: 'cards',
      heading: 'Plan a move across the Tasman',
      cols: 3,
      items: [
        { href: R.calculator, eyebrow: 'Tool', title: 'Volume calculator', body: 'Room-by-room cubic metres, with every item\'s volume published.', cta: 'Work out my volume' },
        { href: M.cost, eyebrow: 'Costs', title: 'What a trans-Tasman move costs', body: 'How quotes are built, part load versus container, and backloading explained.', cta: 'See the cost guide' },
        { href: M.times, eyebrow: 'Timing', title: 'Shipping times to NZ', body: 'Why a one-week sailing becomes a six-week move.', cta: 'Shipping times' }
      ]
    },
    { type: 'journey', heading: 'Where the weeks actually go', intro: 'Proportions of a typical Australia to New Zealand part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'Coming home to New Zealand?' },
    {
      type: 'p',
      text: 'A large share of trans-Tasman moves are New Zealanders returning after years in Australia. Returning citizens and residents can generally bring used household goods and personal effects in without duty or GST, under conditions set by NZ Customs — goods you have owned and used, for your own use. New items bought just before the move are the usual exception. The [customs guide](/guides/new-zealand-customs-personal-effects/) explains the framework.'
    },
    {
      type: 'p',
      text: 'Australian citizens moving to New Zealand usually arrive on a resident visa under the Trans-Tasman Travel Arrangement, which is relevant to the same concession. Check your own position with NZ Customs before you ship.'
    },
    { type: 'h2', text: 'The timing trap on a short route' },
    {
      type: 'p',
      text: 'On long routes, goods almost always arrive after their owners. Across the Tasman, a shipment packed the day before you fly can easily land first — and NZ Customs generally will not clear unaccompanied goods until you have arrived. We plan the pickup date around your flight, or quote a few days of storage, so nothing sits at the wharf running up charges.'
    },
    { type: 'h2', text: 'What to clean before a trans-Tasman move' },
    {
      type: 'ul',
      items: [
        '**Outdoor settings, barbecues and trampolines** — spiders, egg sacs and insects hide in the joints and undersides.',
        '**Camping, fishing, surf and bike gear** — sand, soil and salt water all count.',
        '**Garden tools, mowers and whipper snippers** — scrubbed to bare metal and drained of fuel, or sold.',
        '**Boots and sports shoes** — footy boots and hiking boots especially.',
        '**Cars and trailers** — professionally cleaned underneath before they are shipped.'
      ]
    },
    {
      type: 'p',
      text: 'The full list is in the [biosecurity guide](/guides/new-zealand-biosecurity-what-you-cannot-bring/). Clean goods and a clear inventory are what keep clearance to days.'
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used here.** Cost and transit ranges are planning figures, not rates; no rate is issued without a survey. Customs and biosecurity rules are described in general terms — confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and [MPI](https://www.mpi.govt.nz/).'
      ]
    },
    { type: 'lead', heading: 'Get your Australia to New Zealand removals quote', id: 'quote-foot' }
  ],
  faqs: [
    { q: 'How long does it take to move from Australia to New Zealand?', a: 'Plan on four to eight weeks door to door for a part load and a little less for your own container. The sailing is about one to two weeks. See [trans-Tasman shipping times](/au/shipping-times-australia-to-new-zealand/).' },
    { q: 'Can I bring my car from Australia to New Zealand?', a: 'Often, yes — Australian cars are right-hand drive like New Zealand\'s. It must be cleaned for MPI and certified and complied through NZ Transport Agency Waka Kotahi, and it may attract duty or GST depending on your status.' },
    { q: 'Is it cheaper to use a removalist or ship it myself?', a: 'For anything more than a few boxes, a door-to-door removalist is usually cheaper once New Zealand port, customs, MPI and delivery charges are counted. See the [cost guide](/au/cost-of-moving-to-new-zealand-from-australia/).' },
    { q: 'Do returning New Zealanders pay GST on their belongings?', a: 'Generally not on used personal effects that qualify for the concession. New goods may attract GST. Confirm your position with NZ Customs.' }
  ],
  next: [
    { href: M.cost, label: 'What a move from Australia costs', why: 'How trans-Tasman quotes are built.' },
    { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'Clean before you pack.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Arrival ports and delivery by city.' }
  ]
};

export const auCost = {
  path: M.cost,
  market: 'au',
  hreflangGroup: 'cost',
  template: 'guide',
  title: 'Cost of Moving to New Zealand from Australia | Removal Costs',
  h1: 'What it costs to move to New Zealand from Australia',
  lede:
    'How trans-Tasman removal quotes are put together, what each size of move involves, and why the cheapest-looking quote across the Tasman is often the one that stops at the wharf.',
  description:
    'Cost of moving to New Zealand from Australia: how removalists price trans-Tasman moves, part load against container, backloading, and NZ charges to check.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.cost, label: 'Cost of moving to New Zealand' }),
  service: {
    name: 'Australia to New Zealand removals quotation and cost planning',
    type: 'International removals pricing',
    description: 'Cost structure and planning ranges for removals from Australia to New Zealand.',
    areaServed: AREAS
  },
  sections: [
    'Where the money goes on a short route',
    'What each size of move involves',
    'Backloading, part loads and containers',
    'Wharf-to-wharf quotes',
    'Keeping the cost down'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Trans-Tasman removals are priced from the volume you ship, in cubic metres. Because the ocean leg is short, freight is a smaller share of the total than on any other route to New Zealand — packing, handling at both ends, New Zealand clearance and delivery make up most of the price.',
        '**We do not publish rates.** They move with fuel, shipping-line capacity and season. What follows is how the price is built, so you can budget and compare removalists fairly.'
      ]
    },
    { type: 'h2', text: 'Where the money goes on a short route' },
    {
      type: 'table',
      caption: 'The parts of an Australia to New Zealand removal quote.',
      head: ['Part', 'What it covers', 'Share of cost'],
      rows: [
        ['Australian origin', 'Packing, pickup, export documentation, transport to the port', 'Large — labour-heavy'],
        ['Sea freight', 'Trans-Tasman shipping, shared or sole-use container', 'Smaller than on long-haul routes'],
        ['New Zealand destination', 'Wharf and depot handling, customs, MPI, delivery, unpacking', 'Large — and the part most often left out'],
        ['Options', 'Insurance, storage, crating, car shipping', 'Depends on the move']
      ]
    },
    { type: 'h2', text: 'What each size of move involves' },
    {
      type: 'table',
      caption: 'How shipment size maps to service on the trans-Tasman lane. Planning figures.',
      head: ['Volume', 'Typical home', 'How it ships', 'Door to door'],
      rows: [
        ['Under 2 m³', 'Boxes and suitcases', 'Small part load or air', '4–8 weeks sea; about 1–2 air'],
        ['2–15 m³', 'Unit or two-bedroom home', 'Part load (shared container)', '4–8 weeks'],
        ['15–30 m³', 'Three-bedroom home', 'Part load or 20ft container', '4–7 weeks'],
        ['30–67 m³', 'Four bedrooms and up, or with a car', '40ft container', '3–6 weeks']
      ]
    },
    { type: 'h2', text: 'Backloading, part loads and containers' },
    {
      type: 'p',
      text: 'Australians used to interstate moves know backloading — sharing a truck that is returning anyway. The international equivalent is a part load in a shared container. It is the cheapest way across the Tasman for most smaller moves; the trade-off is waiting for the container to fill. For a family home, or when a car is coming too, your own container is often better value and quicker.'
    },
    { type: 'h2', text: 'Wharf-to-wharf quotes' },
    {
      type: 'p',
      text: 'Some trans-Tasman quotes cover only the freight and Australian end, leaving you to pay New Zealand wharf, depot, customs, MPI and delivery charges on arrival. They look much cheaper and are not. Ask every removalist, in writing, whether the price is door to door, and check it against our [guide to comparing quotes](/guides/comparing-international-removal-quotes/).'
    },
    { type: 'h2', text: 'Keeping the cost down' },
    {
      type: 'ol',
      items: [
        '**Take less.** Appliances work in New Zealand (both countries run on 230 V with the same plug), but bulky, cheap furniture rarely earns its freight.',
        '**Clean outdoor gear properly**, or sell it — MPI treatment is charged to you.',
        '**Be flexible on pickup dates** to catch the next shared container.',
        '**Time pickup to your flight** so there are no storage charges while your goods wait for you.',
        '**Compare door-to-door quotes only.**'
      ]
    }
  ],
  faqs: [
    { q: 'Can I use my Australian appliances in New Zealand?', a: 'Yes. Both countries use 230 V and the same plug type, which makes a trans-Tasman move one of the few where shipping appliances can make sense.' },
    { q: 'Is it cheaper to move from the east coast than from Perth?', a: 'Usually. Sailings from Sydney, Brisbane and Melbourne are more frequent and shorter; Perth shipments may route via the east coast.' },
    { q: 'Why is one removalist so much cheaper?', a: 'Check whether the quote is door to door. New Zealand destination charges are the most common omission on trans-Tasman quotes.' }
  ],
  next: [
    { href: R.calculator, label: 'Work out your volume', why: 'Every quote starts here.' },
    { href: M.times, label: 'How long a trans-Tasman move takes', why: 'The timing side of the same decisions.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'What wharf-to-wharf quotes leave out.' }
  ]
};

export const auTimes = {
  path: M.times,
  market: 'au',
  hreflangGroup: 'times',
  template: 'guide',
  title: 'Shipping Times from Australia to New Zealand | Removals',
  h1: 'How long shipping from Australia to New Zealand takes',
  lede:
    'The sailing is short — about one to two weeks. The move is four to eight weeks door to door, and this page explains the difference.',
  description:
    'Australia to New Zealand shipping times for household removals: trans-Tasman sailings from each capital, consolidation, NZ customs and MPI, and delivery.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.times, label: 'Shipping times' }),
  sections: ['A short sailing, a longer move', 'Where the weeks actually go', 'Departure ports', 'Getting the timing right'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Allow four to eight weeks from pickup in Australia to delivery in New Zealand for a part load, and a little less for your own container. The trans-Tasman sailing itself is around one to two weeks including port time — the rest is consolidation, New Zealand customs and biosecurity, and delivery.'
      ]
    },
    { type: 'h2', text: 'A short sailing, a longer move' },
    {
      type: 'p',
      text: 'On the trans-Tasman route, the ship is the quickest part of the move. Waiting for a shared container to fill in Australia and clearing NZ Customs and MPI on arrival together take far longer than the voyage. That is good news: those are stages you can influence.'
    },
    { type: 'h2', text: 'Where the weeks actually go' },
    { type: 'journey', market: 'au', heading: 'Australia to New Zealand, door to door', intro: 'Proportions of a typical trans-Tasman part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'Departure ports' },
    {
      type: 'table',
      caption: 'Typical departure ports for removals to New Zealand. Planning guidance; schedules change.',
      head: ['Pickup', 'Usual port', 'Notes'],
      rows: [
        ['NSW and ACT', 'Sydney (Port Botany)', 'The most frequent trans-Tasman sailings'],
        ['Victoria and Tasmania', 'Melbourne', 'Frequent; Tasmania adds a Bass Strait leg'],
        ['Queensland and northern NSW', 'Brisbane', 'Frequent services to Auckland and Tauranga'],
        ['Western Australia', 'Fremantle', 'Fewer direct services; may route via the east coast'],
        ['South Australia and NT', 'Adelaide, or road to Melbourne', 'Depends on the sailing']
      ]
    },
    { type: 'h2', text: 'Getting the timing right' },
    {
      type: 'ul',
      items: [
        '**Arrive before your goods.** NZ Customs generally will not clear unaccompanied goods until you are in New Zealand.',
        '**Be ready on pickup day** — documents signed and outdoor items clean — so your shipment makes the first available sailing.',
        '**Send your passport arrival details** to your removalist as soon as you land.',
        '**Have a delivery address, or storage booked.** Goods waiting at a New Zealand depot for an address run up charges.'
      ]
    }
  ],
  faqs: [
    { q: 'What is the quickest way to move from Australia to New Zealand?', a: 'Your own container, on a sailing booked around your flight: often three to six weeks door to door. For a few boxes, air freight takes around a week or two.' },
    { q: 'Why can my goods not be delivered the day the ship arrives?', a: 'A shared container has to be unloaded and your goods separated, then cleared by NZ Customs and MPI before delivery can be booked.' }
  ],
  next: [
    { href: M.cost, label: 'What a trans-Tasman move costs', why: 'The price side of the same decisions.' },
    { href: R.customs, label: 'NZ customs rules for returning residents and new arrivals', why: 'What clearance needs from you.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'A shorter version applies across the Tasman.' }
  ]
};
