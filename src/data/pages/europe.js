/**
 * EUROPE MARKET — /europe/ (lang "en"; hreflang en-IE, en-NL, en-DE, …).
 *
 * One English-language page set for Ireland and continental Europe. English is
 * the working language of most international moves from the region, and it is
 * the language our European audience searches in for "removals to New
 * Zealand". A translated market (e.g. /de/) can be added later as its own
 * hreflang set without disturbing this one.
 *
 * What genuinely differs from the UK pages: collection across many countries
 * into the Rotterdam / Antwerp / Hamburg hubs, EU export formalities, Swiss and
 * Norwegian non-EU customs, 230 V appliances (same voltage as NZ, different
 * plug), European bed sizes, and left-hand-drive cars.
 */

import { R } from '../routes.js';

const M = R.europe;
const HOME = { href: R.global, label: 'Home' };
const EU = { href: M.home, label: 'Europe' };
const c = (...items) => [HOME, EU, ...items];
const PUB = '2026-09-28';
const AREAS = ['Ireland', 'Netherlands', 'Belgium', 'Germany', 'France', 'Switzerland', 'New Zealand'];

export const europeHome = {
  path: M.home,
  market: 'europe',
  hreflangGroup: 'home',
  template: 'home',
  title: 'Removals to New Zealand from Europe and Ireland | International',
  h1: 'Removals to New Zealand from Europe',
  eyebrow: 'Europe to New Zealand removals',
  h1Accent: 'from Europe',
  lede:
    'International removals to New Zealand from Ireland, the Netherlands, Germany, France, Switzerland, Scandinavia and the rest of Europe — collected from your home, shipped from Europe\'s main ports and delivered to your door.',
  description:
    'Removals to New Zealand from Ireland and continental Europe: collection at your home, shipped via Rotterdam, Antwerp or Hamburg, delivered door to door.',
  published: PUB,
  updated: PUB,
  crumbs: [HOME, EU],
  heroCta: { href: M.cost, label: 'See what it costs' },
  heroTrust: [
    '**Collection across Ireland and continental Europe**',
    '**Surveys by video, in English** — wherever you are',
    '**Door to door** — one written quote from your European home to your NZ one'
  ],
  service: {
    name: 'International removals from Europe to New Zealand',
    type: 'International household removals',
    description:
      'Door-to-door packing, export, sea and air freight, New Zealand customs and MPI biosecurity clearance and delivery for households moving from Ireland and continental Europe to New Zealand.',
    areaServed: AREAS,
    audience: 'Households relocating from Europe to New Zealand, including returning New Zealanders'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Moves from Europe to New Zealand are collected from your home, brought to one of the big North Sea container hubs — Rotterdam, Antwerp, Hamburg or Bremerhaven — and shipped on a voyage of six to eight weeks, usually with a transhipment in Asia. Door to door, plan on ten to sixteen weeks for a shared container.',
        'The European end has its own considerations: EU export formalities, different rules again in Switzerland and Norway, and household goods from many European countries being subject to seasonal biosecurity measures on arrival in New Zealand.'
      ]
    },
    {
      type: 'cards',
      heading: 'Plan a move from Europe',
      cols: 3,
      items: [
        { href: R.calculator, eyebrow: 'Tool', title: 'Volume calculator', body: 'Your shipment in cubic metres, item by item, with every figure published.', cta: 'Work out my volume' },
        { href: M.cost, eyebrow: 'Costs', title: 'What a move from Europe costs', body: 'How quotes are built, collection distance, and shared versus your own container.', cta: 'See the cost guide' },
        { href: M.times, eyebrow: 'Timing', title: 'Shipping times from Europe', body: 'From collection to delivery, stage by stage.', cta: 'Shipping times' }
      ]
    },
    { type: 'journey', heading: 'Where the weeks actually go', intro: 'Proportions of a typical Europe to New Zealand part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'Where we collect from' },
    {
      type: 'table',
      caption: 'Typical routing from European countries to New Zealand. Planning guidance.',
      head: ['Country', 'Usual export hub', 'Notes'],
      rows: [
        ['Ireland', 'Dublin, then a hub port', 'A feeder or short-sea leg to the main European or UK services'],
        ['Netherlands and Belgium', 'Rotterdam or Antwerp', 'Closest to the main hubs; widest choice of dates'],
        ['Germany, Austria, Switzerland', 'Hamburg, Bremerhaven or Rotterdam', 'Switzerland is outside the EU customs area'],
        ['France, Spain, Portugal, Italy', 'Antwerp, Rotterdam or a Mediterranean port', 'Depends on the sailing and the volume'],
        ['Denmark, Sweden, Norway, Finland', 'Hamburg or Bremerhaven', 'Norway is outside the EU customs area'],
        ['Poland and Central Europe', 'Hamburg or Rotterdam', 'Longer road leg to the hub']
      ]
    },
    { type: 'h2', text: 'What travels well, and what does not' },
    {
      type: 'ul',
      items: [
        '**Appliances generally work.** Continental Europe and New Zealand both run on 230 V, 50 Hz. The plug is different, so you will need adapters or new plugs fitted — but, unlike North American moves, the appliances themselves are usable.',
        '**Beds and linen may not fit.** European mattress sizes (140, 160 or 180 × 200 cm) do not match New Zealand\'s Single, Double, Queen and King. Frames usually ship fine; fitted sheets may not fit.',
        '**Cars are complicated.** New Zealand drives on the left and restricts left-hand-drive vehicles. Check with NZ Transport Agency Waka Kotahi before shipping one.',
        '**Garden and outdoor items need real cleaning.** Goods from many European countries face extra scrutiny during the seasonal brown marmorated stink bug measures, which apply to vehicles and machinery in particular.'
      ]
    },
    { type: 'h2', text: 'Returning New Zealanders' },
    {
      type: 'p',
      text: 'Plenty of New Zealanders spend years in Amsterdam, Berlin, Dublin or Copenhagen before coming home. Returning citizens and residents can generally bring used personal and household effects back without duty or GST, under conditions set by NZ Customs. The [customs guide](/guides/new-zealand-customs-personal-effects/) explains how the concession works and what you will be asked for.'
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used here.** Cost and transit ranges are planning figures, not rates; no rate is issued without a survey. Customs and biosecurity rules are described in general terms — confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and [MPI](https://www.mpi.govt.nz/).'
      ]
    },
    { type: 'lead', heading: 'Get your Europe to New Zealand removals quote', id: 'quote-foot' }
  ],
  faqs: [
    { q: 'How long does it take to ship household goods from Europe to New Zealand?', a: 'Plan on ten to sixteen weeks door to door by sea. The voyage itself is six to eight weeks. See [shipping times from Europe](/europe/shipping-times-europe-to-new-zealand/).' },
    { q: 'Do you move from Ireland to New Zealand?', a: 'Yes. Irish moves are collected from your home and connect to the main European or UK sailings.' },
    { q: 'Can I use my European appliances in New Zealand?', a: 'Generally yes — the voltage is the same. You will need the plugs changed or adapters.' },
    { q: 'Is the site available in other languages?', a: 'Not yet. Our consultants work in English, and surveys are usually done by video call.' }
  ],
  next: [
    { href: M.cost, label: 'What a move from Europe costs', why: 'How quotes are built from your country.' },
    { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'The rules that decide what is worth packing.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Arrival ports and delivery by city.' }
  ]
};

export const europeCost = {
  path: M.cost,
  market: 'europe',
  hreflangGroup: 'cost',
  template: 'guide',
  title: 'Cost of Moving to New Zealand from Europe | Removals Costs',
  h1: 'What it costs to move to New Zealand from Europe',
  lede:
    'How removals from Ireland and continental Europe to New Zealand are priced, how far you are from a hub port changes the total, and what each size of move involves.',
  description:
    'Cost of moving to New Zealand from Europe: how quotes are built, collection distance to Rotterdam, Antwerp or Hamburg, part load versus container, charges to check.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.cost, label: 'Cost of moving to New Zealand' }),
  service: {
    name: 'Europe to New Zealand removals quotation and cost planning',
    type: 'International removals pricing',
    description: 'Cost structure and planning ranges for removals from Ireland and continental Europe to New Zealand.',
    areaServed: AREAS
  },
  sections: [
    'The five parts of a European quote',
    'Distance to the hub',
    'What each size of move involves',
    'Export formalities',
    'Spending less'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A removal from Europe to New Zealand is priced from your shipment\'s volume in cubic metres, plus the distance from your home to the export hub. Because European moves often involve a long road leg before the container is even loaded, where you live matters more than it does from the UK.',
        '**We do not publish rates** — Europe–Oceania freight changes too often. This page explains the structure of the price so you can budget and compare.'
      ]
    },
    { type: 'h2', text: 'The five parts of a European quote' },
    {
      type: 'table',
      caption: 'The parts of a removal quote from Europe to New Zealand.',
      head: ['Part', 'What it covers', 'What drives the cost'],
      rows: [
        ['Origin services', 'Survey, packing, inventory, collection', 'Volume, access, local labour costs'],
        ['Road leg to the hub', 'Transport to Rotterdam, Antwerp, Hamburg or Bremerhaven', 'Distance and border crossings'],
        ['Export formalities', 'EU export declaration, or Swiss or Norwegian export', 'Your country'],
        ['Sea freight', 'Shared or sole-use container to New Zealand', 'Volume, season, capacity'],
        ['New Zealand destination', 'Handling, customs, MPI, delivery, unpacking', 'Volume, NZ city, access']
      ]
    },
    { type: 'h2', text: 'Distance to the hub' },
    {
      type: 'p',
      text: 'From Rotterdam\'s hinterland, the road leg is short. From Munich, Milan or Madrid, it is a long drive, and for a part load it may be combined with other European collections on a groupage truck. That combination is efficient but adds a scheduling step. For a full container, the container is usually delivered to your home and trucked back to the port loaded.'
    },
    { type: 'h2', text: 'What each size of move involves' },
    {
      type: 'table',
      caption: 'How shipment size maps to service from Europe to New Zealand. Planning figures.',
      head: ['Volume', 'Typical home', 'How it ships', 'Door to door'],
      rows: [
        ['Under 2 m³', 'Boxes and suitcases', 'Air, or a small part load', '1–3 weeks air; 10–16 sea'],
        ['2–15 m³', 'Apartment', 'Part load', '12–16 weeks'],
        ['15–30 m³', 'Family apartment or small house', 'Part load or 20ft container', '10–16 weeks'],
        ['30–67 m³', 'Larger house', '40ft container', '10–13 weeks']
      ]
    },
    { type: 'h2', text: 'Export formalities' },
    {
      type: 'p',
      text: 'Household goods leaving the EU are exported under an export declaration, which your mover\'s forwarder files. Switzerland and Norway are outside the EU customs area and have their own export procedures; moves from there may also cross an EU border on the way to the hub, which the forwarder handles in transit. None of this is usually a cost you notice separately, but it is one reason to choose a mover used to your country.'
    },
    {
      type: 'p',
      text: 'On the New Zealand side, check each quote against our [guide to comparing quotes](/guides/comparing-international-removal-quotes/). Destination charges and MPI inspection are the usual gaps.'
    },
    { type: 'h2', text: 'Spending less' },
    {
      type: 'ol',
      items: [
        '**Ship less.** Heavy, inexpensive furniture rarely justifies its freight to New Zealand.',
        '**Keep the appliances you like** — they work on New Zealand power — and leave the rest.',
        '**Clean outdoor items thoroughly**, or sell them.',
        '**Be flexible on collection dates**, especially far from the hub ports.',
        '**Compare door-to-door quotes that include the road leg.**'
      ]
    }
  ],
  faqs: [
    { q: 'Is it cheaper to move to New Zealand from the Netherlands than from Italy?', a: 'Usually, because the road leg to the export hub is shorter. From southern Europe, a Mediterranean sailing is sometimes an alternative.' },
    { q: 'Do I need to be present for export customs?', a: 'No. Your mover\'s forwarder handles the export declaration; you provide your passport and an inventory.' }
  ],
  next: [
    { href: R.calculator, label: 'Work out your volume', why: 'Every quote is built from it.' },
    { href: M.times, label: 'How long shipping from Europe takes', why: 'Timing and routing together.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'What to check in any quote.' }
  ]
};

export const europeTimes = {
  path: M.times,
  market: 'europe',
  hreflangGroup: 'times',
  template: 'guide',
  title: 'Shipping Times from Europe to New Zealand | Removals',
  h1: 'How long shipping from Europe to New Zealand takes',
  lede:
    'Ten to sixteen weeks door to door for most European moves by sea. Here is where the time goes, from your door to the hub, across two oceans, and through New Zealand clearance.',
  description:
    'How long shipping household goods from Europe to New Zealand takes: collection and consolidation, the voyage from Rotterdam or Hamburg, NZ customs and MPI.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: M.times, label: 'Shipping times' }),
  sections: ['The short answer', 'Where the weeks actually go', 'The voyage', 'Seasonal biosecurity measures'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Plan on ten to sixteen weeks from collection in Europe to delivery in New Zealand for a part load, and ten to thirteen for a container of your own. The sea voyage from the North Sea hubs is six to eight weeks; the rest is getting to the hub, waiting for a New Zealand container, clearance and delivery.'
      ]
    },
    { type: 'h2', text: 'The short answer' },
    {
      type: 'p',
      text: 'The biggest variable you control is how soon your goods reach a New Zealand container. From the Benelux and northern Germany, that is quick. From southern and eastern Europe, a groupage truck may collect over several days before reaching the hub. Tell your mover early, and be flexible on the collection date.'
    },
    { type: 'h2', text: 'Where the weeks actually go' },
    { type: 'journey', market: 'europe', heading: 'Europe to New Zealand, door to door', intro: 'Proportions of a typical part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'The voyage' },
    {
      type: 'p',
      text: 'Very few services run direct from Europe to New Zealand. Most containers tranship at a hub in Asia or the Middle East, or travel via the Panama Canal, before reaching Auckland, Tauranga, Wellington, Lyttelton or Port Chalmers. Transhipment is normal and built into these ranges. It is also the most common reason for a schedule to slip by a week.'
    },
    { type: 'h2', text: 'Seasonal biosecurity measures' },
    {
      type: 'p',
      text: 'During the Northern Hemisphere autumn and winter, New Zealand applies extra biosecurity measures for the brown marmorated stink bug to goods — especially vehicles and machinery — from a list of countries that includes much of Europe. That can mean treatment before shipping or on arrival, and extra time. If you are shipping a car, a motorbike or garden machinery between roughly September and April, ask your mover how it will be handled, and check [MPI\'s current requirements](/guides/new-zealand-biosecurity-what-you-cannot-bring/).'
    }
  ],
  faqs: [
    { q: 'What is the fastest way to move from Europe to New Zealand?', a: 'Your own container from a North Sea hub — about ten to thirteen weeks door to door. For a few boxes, air freight is one to three weeks.' },
    { q: 'Should I arrive in New Zealand before my shipment?', a: 'Yes. NZ Customs generally clears unaccompanied goods only after you have arrived. On this route, your goods will almost always arrive after you anyway.' }
  ],
  next: [
    { href: M.cost, label: 'What a move from Europe costs', why: 'The price side of the same decisions.' },
    { href: R.customs, label: 'NZ customs rules for household goods', why: 'What clearance needs from you.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'Working back from your flight.' }
  ]
};
