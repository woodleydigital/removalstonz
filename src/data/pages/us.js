/**
 * US MARKET — /us/ (en-US).
 *
 * Americans search "moving to New Zealand", "international movers" and
 * "shipping household goods", not "removals" — the supplied US file (which
 * only captured "removals" terms) under-represents this market. Copy uses US
 * vocabulary, cubic feet first, US date format, and the facts that genuinely
 * differ for a US move: 110 V appliances, left-hand-drive cars, bed sizes,
 * inland pickup to a coastal gateway, and pricing by volume rather than weight.
 */

import { R } from '../routes.js';

const M = R.us;
const HOME = { href: R.global, label: 'Home' };
const US = { href: M.home, label: 'USA' };
const c = (...items) => [HOME, US, ...items];
const PUB = '2026-09-28';
const AREAS = ['United States', 'New Zealand'];

export const usHome = {
  path: M.home,
  market: 'us',
  hreflangGroup: 'home',
  template: 'home',
  title: 'Moving to New Zealand from the USA | International Movers',
  h1: 'Moving to New Zealand from the USA',
  lede:
    'International moving from anywhere in the United States to anywhere in New Zealand — shared containers, full containers and air freight, cleared through NZ biosecurity and delivered to your door.',
  description:
    'International movers from the USA to New Zealand: door-to-door household moving, shared and full containers, priced by cubic feet, cleared through NZ biosecurity.',
  published: PUB,
  updated: PUB,
  crumbs: [HOME, US],
  heroCta: { href: M.cost, label: 'See what it costs' },
  heroTrust: [
    '**Pickup in all 48 contiguous states** — Alaska and Hawaii on request',
    '**Priced by volume, not weight** — with every item\'s cubic feet published',
    '**Door to door** — one written quote from your US home to your NZ one'
  ],
  service: {
    name: 'International moving from the United States to New Zealand',
    type: 'International household moving',
    description:
      'Door-to-door packing, export, ocean and air freight, New Zealand customs and MPI biosecurity clearance and delivery for households moving from the United States to New Zealand.',
    areaServed: AREAS,
    audience: 'Households relocating from the United States to New Zealand'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Most US households moving to New Zealand ship somewhere between 400 and 1,200 cubic feet by sea and should plan on eight to fourteen weeks door to door. From the West Coast the ocean leg is about three to four weeks; from the Gulf or East Coast it is closer to six or seven.',
        'Two things surprise Americans most. International moves are priced by **volume**, not by the weight a domestic mover would use. And a lot of what is in a US home does not work in New Zealand — the power supply is 230 volts, so most American appliances stay behind.'
      ]
    },
    {
      type: 'cards',
      heading: 'Plan a US to New Zealand move',
      cols: 3,
      items: [
        { href: R.calculator, eyebrow: 'Tool', title: 'Volume calculator', body: 'Count your furniture and boxes and get a total in cubic feet and cubic meters.', cta: 'Estimate my volume' },
        { href: M.cost, eyebrow: 'Costs', title: 'What moving to NZ costs', body: 'How international quotes are built, shared container versus your own, and what to leave behind.', cta: 'See the cost guide' },
        { href: M.times, eyebrow: 'Timing', title: 'Shipping times from the US', body: 'West Coast versus East Coast, and where the weeks really go.', cta: 'Shipping times' }
      ]
    },
    { type: 'journey', heading: 'Where the weeks actually go', intro: 'Proportions of a typical US to New Zealand shared-container move, using the midpoint of each planning range.' },
    { type: 'h2', text: 'What to leave in the United States' },
    {
      type: 'p',
      text: 'The cheapest cubic foot is the one you do not ship. On a US move to New Zealand, these are the usual candidates:'
    },
    {
      type: 'ul',
      items: [
        '**Appliances and most electronics.** New Zealand runs on 230 V at 50 Hz; US appliances are built for 120 V at 60 Hz. Washers, dryers, refrigerators, microwaves and power tools generally will not work without heavy transformers. Dual-voltage laptops and phone chargers are fine with a plug adapter.',
        '**Your car, usually.** New Zealand drives on the left and restricts left-hand-drive vehicles. Check with NZ Transport Agency Waka Kotahi before shipping one; for most American cars, selling in the US and buying in New Zealand is simpler.',
        '**Oversized furniture.** A sectional or a California King bed built for a large US home may not fit a New Zealand house, and US King and Queen bedding does not match NZ sizes exactly.',
        '**The garage and yard.** Mowers, tools, grills and yard furniture must be spotless for MPI biosecurity. Many are not worth the cleaning.'
      ]
    },
    { type: 'h2', text: 'How a US move to New Zealand works' },
    {
      type: 'steps',
      items: [
        { title: 'Virtual or in-home survey', body: 'A consultant walks through your home, usually by video, and gives you a written quote in cubic feet with the exclusions listed.' },
        { title: 'Packing and pickup', body: 'A crew packs everything to export standard, builds a numbered inventory, and picks up from your home.' },
        { title: 'To the gateway port', body: 'Your shipment travels to a consolidation point — typically Los Angeles, Oakland, Seattle, Houston, Savannah or New York/New Jersey — and is loaded for New Zealand.' },
        { title: 'Ocean freight', body: 'Shared container or your own, three to seven weeks at sea depending on the coast.' },
        { title: 'NZ Customs, MPI and delivery', body: 'Cleared at Auckland, Tauranga, Wellington or Lyttelton, then delivered and unpacked.' }
      ]
    },
    { type: 'h2', text: 'Why New Zealand biosecurity matters for Americans' },
    {
      type: 'p',
      text: 'New Zealand checks household goods for soil, seeds, insects and untreated wood far more closely than most countries. Shipments of vehicles and machinery from the United States can also fall under seasonal measures for the brown marmorated stink bug, which MPI applies during the Northern Hemisphere autumn and winter. Clean everything that has been outdoors, and read [what you cannot bring](/guides/new-zealand-biosecurity-what-you-cannot-bring/) before the packers arrive.'
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used here.** Cost and transit ranges are planning figures, not rates; no rate is issued without a survey. Customs and biosecurity rules are summarized in general terms — confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and [MPI](https://www.mpi.govt.nz/).'
      ]
    },
    { type: 'lead', heading: 'Get your US to New Zealand moving quote', id: 'quote-foot' }
  ],
  faqs: [
    { q: 'How much does it cost to move from the US to New Zealand?', a: 'It depends on volume and on whether you share a container or have your own. The [US cost guide](/us/cost-of-moving-to-new-zealand-from-usa/) explains how quotes are built and what each size of move involves.' },
    { q: 'How long does it take to ship household goods from the US to New Zealand?', a: 'Plan on eight to fourteen weeks door to door by sea; about three to four weeks of ocean transit from the West Coast and six to seven from the East. See [US shipping times](/us/shipping-times-usa-to-new-zealand/).' },
    { q: 'Can I bring my American appliances to New Zealand?', a: 'Most will not run on New Zealand\'s 230-volt supply without a transformer. Dual-voltage electronics are fine. Most families sell large appliances before moving.' },
    { q: 'Do I pay duty on my household goods in New Zealand?', a: 'Usually not, if you are moving to live there and the goods are used personal effects. New goods can attract GST. The [customs guide](/guides/new-zealand-customs-personal-effects/) explains the concession.' }
  ],
  next: [
    { href: M.cost, label: 'What moving to New Zealand costs from the US', why: 'How quotes are built, and how to keep them down.' },
    { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'The rules that decide what is worth packing.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Which port serves which city.' }
  ]
};

export const usCost = {
  path: M.cost,
  market: 'us',
  hreflangGroup: 'cost',
  template: 'guide',
  title: 'Cost of Moving to New Zealand from the USA | Shipping Costs',
  h1: 'What it costs to move to New Zealand from the USA',
  lede:
    'How international movers price a US to New Zealand move, what different home sizes involve in cubic feet, and why weight — the number a domestic mover uses — does not apply.',
  description:
    'Cost of moving to New Zealand from the USA: how international quotes are priced by cubic feet, shared versus full containers, and the charges often left out.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.cost, label: 'Cost of moving to New Zealand' }),
  service: {
    name: 'US to New Zealand moving quotation and cost planning',
    type: 'International moving pricing',
    description: 'Cost structure and planning ranges for household moves from the United States to New Zealand.',
    areaServed: AREAS
  },
  sections: [
    'Volume, not weight',
    'What goes into a US to New Zealand quote',
    'Home size, cubic feet and how it ships',
    'The inland leg',
    'Ways to lower the cost'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'An international move from the US to New Zealand is priced from the volume of your shipment in cubic feet. Once that is known, the quote is the sum of US origin services, ocean freight and New Zealand destination services, plus options like insurance and storage.',
        '**We do not publish rates.** Transpacific freight moves with fuel, capacity and season, and a number printed here would be out of date within weeks. What we publish is how the price is built, so you can budget and compare quotes line by line.'
      ]
    },
    { type: 'h2', text: 'Volume, not weight' },
    {
      type: 'p',
      text: 'If you have moved within the US, you were probably charged by weight. Ocean freight is sold by space in a container, so international movers price by cubic feet (or cubic meters). A home full of light but bulky furniture costs more to ship overseas than its weight suggests; a garage of heavy tools costs less. Our [volume calculator](/tools/moving-volume-calculator/) gives you the cubic feet for every item.'
    },
    { type: 'h2', text: 'What goes into a US to New Zealand quote' },
    {
      type: 'table',
      caption: 'The parts of an international moving quote from the US to New Zealand.',
      head: ['Part', 'What it covers', 'What drives the cost'],
      rows: [
        ['US origin', 'Survey, packing, pickup, export paperwork, trucking to the gateway port', 'Volume, access, distance to the coast'],
        ['Ocean freight', 'Shared container (LCL) or your own (FCL)', 'Volume, coast of departure, season'],
        ['New Zealand destination', 'Port and warehouse handling, customs, MPI, delivery, unpacking', 'Volume, destination city, home access'],
        ['Options', 'Marine insurance, storage, crating, long carries, GST on new items', 'Your circumstances']
      ]
    },
    { type: 'h2', text: 'Home size, cubic feet and how it ships' },
    {
      type: 'table',
      caption: 'Typical volumes for US homes and how each ships to New Zealand. Planning figures.',
      head: ['Home', 'Typical volume', 'How it ships', 'Door to door'],
      rows: [
        ['Boxes and suitcases', 'Under 70 cu ft', 'Air freight or a small shared shipment', '1–3 weeks air; 8–14 sea'],
        ['Studio or one-bedroom apartment', '175–400 cu ft', 'Shared container (LCL)', '10–14 weeks'],
        ['Two-bedroom home', '400–700 cu ft', 'Shared container', '10–14 weeks'],
        ['Three-bedroom home', '700–1,150 cu ft', 'Shared or a 20ft container', '8–14 weeks'],
        ['Four bedrooms and up', '1,150–2,350 cu ft', '40ft container', '8–12 weeks']
      ]
    },
    {
      type: 'p',
      text: 'A 20ft container holds about 1,150 cubic feet of household goods and a 40ft about 2,350. Somewhere around 800–1,000 cubic feet, your own container starts to compete with a shared one on price and beats it on speed.'
    },
    { type: 'h2', text: 'The inland leg' },
    {
      type: 'p',
      text: 'New Zealand services leave from a handful of gateway ports. If you live in Denver, Chicago or Dallas, your shipment is trucked or railed to one of them first, and that inland leg is a real part of the price. It is also why West Coast pickups tend to be cheaper and faster: they are already at the gateway. When comparing quotes, check that the inland leg is included — and that the quote runs to your door in New Zealand, not to the port. Our [guide to comparing quotes](/guides/comparing-international-removal-quotes/) lists what else to check.'
    },
    { type: 'h2', text: 'Ways to lower the cost' },
    {
      type: 'ol',
      items: [
        '**Sell 120 V appliances** rather than shipping things that will not work.',
        '**Skip the car** unless you have checked it can be registered in New Zealand.',
        '**Downsize furniture** that will not fit a smaller New Zealand home.',
        '**Clean or sell yard equipment** — MPI treatment fees can exceed its value.',
        '**Be flexible on dates** so a shared container fills around you.',
        '**Get two or three surveyed quotes** and compare them on the same cubic feet.'
      ]
    }
  ],
  faqs: [
    { q: 'Is it cheaper to ship from the West Coast?', a: 'Usually, because the ocean leg is shorter and there is no long inland haul. From the Midwest or East, the extra transport is part of the quote.' },
    { q: 'Should I buy moving insurance for a US to NZ move?', a: 'Yes. Carrier liability on international freight is limited and based on weight, not value. Marine insurance is offered as an option on every quote.' },
    { q: 'Why do quotes differ so much?', a: 'Usually because of the volume estimate or what is excluded — most often New Zealand destination charges. Compare quotes on the same cubic feet and the same inclusions.' }
  ],
  next: [
    { href: R.calculator, label: 'Estimate your volume in cubic feet', why: 'The number every quote is built from.' },
    { href: M.times, label: 'How long shipping from the US takes', why: 'Speed and cost are linked.' },
    { href: R.compareQuotes, label: 'How to compare international moving quotes', why: 'Spot what a cheap quote leaves out.' }
  ]
};

export const usTimes = {
  path: M.times,
  market: 'us',
  hreflangGroup: 'times',
  template: 'guide',
  title: 'Shipping Times from the USA to New Zealand | Household Goods',
  h1: 'How long shipping from the USA to New Zealand takes',
  lede:
    'Eight to fourteen weeks door to door by sea for most US moves — shorter from California and the Pacific Northwest, longer from the East Coast and the interior.',
  description:
    'How long shipping household goods from the USA to New Zealand takes: West Coast versus East Coast, inland pickups, customs and MPI clearance, and delivery.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.times, label: 'Shipping times' }),
  sections: ['Door to door, not port to port', 'Where the weeks actually go', 'West Coast, Gulf and East Coast', 'Getting your things sooner'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Plan on eight to fourteen weeks from pickup at your US home to delivery in New Zealand for a shared container. The ocean crossing is about three to four weeks from Los Angeles, Oakland or Seattle and roughly six to seven weeks from Houston, Savannah or New York; the rest is getting to the port, waiting for the container, and clearing New Zealand customs and biosecurity.'
      ]
    },
    { type: 'h2', text: 'Door to door, not port to port' },
    {
      type: 'p',
      text: 'An ocean schedule tells you when the ship sails and docks. Your move also includes packing, the inland leg to the gateway, the wait for a shared container to fill, unloading at a New Zealand warehouse, NZ Customs and MPI clearance, and scheduling delivery. Ask every mover for a door-to-door estimate.'
    },
    { type: 'h2', text: 'Where the weeks actually go' },
    { type: 'journey', market: 'us', heading: 'US to New Zealand, door to door', intro: 'Proportions of a typical shared-container move, using the midpoint of each planning range.' },
    { type: 'h2', text: 'West Coast, Gulf and East Coast' },
    {
      type: 'table',
      caption: 'Typical ocean routings from the US to New Zealand. Planning figures; schedules change.',
      head: ['Pickup region', 'Usual gateway', 'Ocean transit'],
      rows: [
        ['California, Nevada, Arizona', 'Los Angeles / Long Beach or Oakland', 'About 3–4 weeks'],
        ['Pacific Northwest, Mountain states', 'Seattle / Tacoma', 'About 3–4 weeks'],
        ['Texas, the South, Midwest', 'Houston, Savannah, or trucked west', 'About 4–7 weeks'],
        ['Northeast and Mid-Atlantic', 'New York / New Jersey', 'About 6–7 weeks']
      ]
    },
    {
      type: 'p',
      text: 'Interior pickups sometimes route west to a Pacific port even when an eastern port is closer by road, because the shorter ocean leg saves more time than the extra trucking costs. Your mover should tell you which gateway they plan to use.'
    },
    { type: 'h2', text: 'Getting your things sooner' },
    {
      type: 'ul',
      items: [
        '**Book your own container** to skip the consolidation wait.',
        '**Send essentials by air** — clothes for the season you arrive into (New Zealand\'s seasons are the reverse of the US), work gear and kids\' things. See [sea versus air](/guides/sea-vs-air-freight-to-new-zealand/).',
        '**Send your passport arrival page to your mover** as soon as you land in New Zealand, so clearance can start.',
        '**Clean outdoor items** so MPI inspection, if called, is quick.'
      ]
    }
  ],
  faqs: [
    { q: 'What is the fastest way to move household goods from the US to New Zealand?', a: 'Your own container from a West Coast port — often eight to ten weeks door to door. Air freight takes one to three weeks for a small shipment.' },
    { q: 'Can my shipment arrive before I do?', a: 'It can, but NZ Customs generally will not clear it until you have arrived. Time the sailing around your flight, or plan a short period in storage.' }
  ],
  next: [
    { href: M.cost, label: 'What moving to New Zealand costs from the US', why: 'The price side of the same decisions.' },
    { href: R.customs, label: 'NZ customs rules for household goods', why: 'What clearance needs from you.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'Working back from your flight.' }
  ]
};
