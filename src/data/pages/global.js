/**
 * GLOBAL PAGES — belong to no market.
 *
 * `/` is the global chooser and the hreflang x-default for the market homes:
 * the page Google shows an English speaker it has no market for. It must be a
 * real page (not a redirect or a bare list of flags), because it is also the
 * page most external links will point at.
 */

import { R } from '../routes.js';
import { CONTACT, OPERATOR } from '../site.js';

const HOME = { href: R.global, label: 'Home' };
const c = (...items) => [HOME, ...items];

export const chooser = {
  path: R.global,
  template: 'home',
  hreflangGroup: 'home',
  xDefault: true,
  title: 'Removals to New Zealand | UK, USA, Australia, Canada, Europe',
  h1: 'Removals to New Zealand, door to door.',
  lede:
    'Household removals, part loads and full containers to New Zealand from the UK, the USA, Australia, Canada and Europe — priced from a published inventory, packed for New Zealand biosecurity, and delivered to your door.',
  description:
    'International removals to New Zealand from the UK, USA, Australia, Canada and Europe. Door-to-door moving, part loads and containers, packed for NZ biosecurity.',
  published: '2026-09-28',
  updated: '2026-09-28',
  crumbs: [HOME],
  heroCta: { href: '#where-are-you-moving-from', label: 'Choose where you are moving from' },
  eyebrow: 'International removals to New Zealand',
  h1Accent: 'door to door.',
  heroTrust: [
    '**One agreed plan, door to door** — collection, international transport, NZ clearance and delivery',
    '**Priced from volumes we publish** — so two quotes can be compared on one basis',
    '**Packed with MPI biosecurity in mind** — the step most overseas movers underestimate'
  ],
  service: {
    name: 'International removals to New Zealand',
    type: 'International household removals',
    description:
      'Door-to-door packing, export documentation, sea and air freight, New Zealand customs and biosecurity clearance, and delivery for people relocating to New Zealand.',
    areaServed: ['United Kingdom', 'United States', 'Australia', 'Canada', 'New Zealand'],
    audience: 'People and families relocating to New Zealand'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A move to New Zealand is priced, timed and cleared very differently depending on where it starts. From Australia the sailing is a week or two and the whole move can be done in a month or so; from the UK or Europe it is one of the longest removal lanes in the world, and ten to sixteen weeks door to door is normal for a shared container.',
        'What every route has in common is the New Zealand end: NZ Customs and the Ministry for Primary Industries (MPI) both have to release your goods, and New Zealand biosecurity is stricter than almost anywhere else. That part is the same whichever country you leave from, so it is written once and shared across the site.'
      ]
    },
    {
      type: 'cards',
      heading: 'Where are you moving from?',
      intro:
        'Each country has its own pages for costs, shipping times and quotes, written for how moves actually work from there.',
      cols: 3,
      items: [
        {
          href: R.uk.home,
          eyebrow: 'Most moves',
          title: 'From the United Kingdom',
          body: 'Nationwide collection, part loads and containers from Southampton, Felixstowe and London Gateway. Ten to sixteen weeks door to door by sea.',
          cta: 'UK to New Zealand'
        },
        {
          href: R.us.home,
          eyebrow: 'West and East Coast',
          title: 'From the United States',
          body: 'Pickup nationwide, consolidated through the West Coast, Gulf and East Coast gateways. Priced by volume, not by weight.',
          cta: 'USA to New Zealand'
        },
        {
          href: R.au.home,
          eyebrow: 'Trans-Tasman',
          title: 'From Australia',
          body: 'The shortest lane: a week or two at sea from Sydney, Melbourne, Brisbane or Fremantle. Biosecurity sets the pace, not the ship.',
          cta: 'Australia to New Zealand'
        },
        {
          href: R.ca.home,
          eyebrow: 'Vancouver and the east',
          title: 'From Canada',
          body: 'Most moves route through Vancouver; eastern provinces sail from Montreal or Halifax or rail west first.',
          cta: 'Canada to New Zealand'
        },
        {
          href: R.europe.home,
          eyebrow: 'Including Ireland',
          title: 'From Europe',
          body: 'Collection across Ireland and continental Europe, shipped through Rotterdam, Antwerp and Hamburg.',
          cta: 'Europe to New Zealand'
        },
        {
          href: R.destinations,
          eyebrow: 'The New Zealand end',
          title: 'Where in New Zealand we deliver',
          body: 'Auckland, Wellington, Christchurch, Tauranga, Hamilton, Queenstown and everywhere between — which port serves which city.',
          cta: 'NZ destinations'
        }
      ]
    },
    { type: 'h2', text: 'The three things that decide how a move to New Zealand goes' },
    {
      type: 'ul',
      items: [
        '**Volume, not rooms.** Every international quote is built from cubic metres (or cubic feet). The [volume calculator](/tools/moving-volume-calculator/) publishes every per-item figure it uses, so you can check any quote against the same standard.',
        '**Biosecurity, not just customs.** New Zealand inspects household goods for soil, seeds, insects and untreated wood. Muddy boots, a used lawnmower or a wicker chair can hold a shipment up and add treatment charges. Read [what you cannot bring](/guides/new-zealand-biosecurity-what-you-cannot-bring/) before anything is packed.',
        '**Paperwork timing.** Personal effects concessions depend on your visa or residence status and on the goods having been owned and used before you arrive. The [customs guide](/guides/new-zealand-customs-personal-effects/) explains the framework and what NZ Customs will ask to see.'
      ]
    },
    { type: 'h2', text: 'How a move to New Zealand works, from any country' },
    {
      type: 'steps',
      items: [
        {
          title: 'Survey and written quote',
          body: 'A video or in-home survey sets the real volume and spots anything that needs cleaning, crating or leaving behind for biosecurity reasons. The quote lists what is included and what is not.'
        },
        {
          title: 'Export packing and collection',
          body: 'Everything is wrapped and inventoried to export standard. The inventory matters twice: NZ Customs and MPI both work from it.'
        },
        {
          title: 'Sea or air freight',
          body: 'A shared container for most households, your own 20ft or 40ft container for larger homes and vehicles, or air freight for the first few boxes you need.'
        },
        {
          title: 'NZ Customs and MPI clearance',
          body: 'Your documents are lodged, and MPI decides whether the shipment needs inspection. Clean, well-listed goods clear fastest.'
        },
        {
          title: 'Delivery anywhere in New Zealand',
          body: 'From the arrival port — usually Auckland, Tauranga, Wellington or Lyttelton — to your door, with unpacking to the level you asked for.'
        }
      ]
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used across this site.** Transit and cost ranges are planning figures, published so you can budget and sense-check quotes. They are not rates, and no rate is issued without a survey. Customs and biosecurity rules are described in general terms and change; confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and the [Ministry for Primary Industries](https://www.mpi.govt.nz/) before you ship.'
      ]
    }
  ],
  faqs: [
    {
      q: 'How long does it take to ship household goods to New Zealand?',
      a: 'It depends almost entirely on where you start. Plan on four to eight weeks door to door from Australia, eight to fifteen from North America, and ten to sixteen from the UK or Europe for a shared container. Each country page has its own [shipping times](/uk/shipping-times-uk-to-new-zealand/) breakdown.'
    },
    {
      q: 'What does it cost to move to New Zealand?',
      a: 'The honest answer is a volume: until you know how many cubic metres you are shipping, any price is a guess. Start with the [volume calculator](/tools/moving-volume-calculator/), then read the cost page for your country, for example [moving to New Zealand from the UK](/uk/cost-of-moving-to-new-zealand-from-uk/).'
    },
    {
      q: 'Is New Zealand biosecurity really that strict?',
      a: 'Yes. New Zealand protects agriculture and native ecosystems that have no defence against many overseas pests, and MPI can inspect, treat or destroy items that carry soil, seeds or insects. Cleaning outdoor gear before packing is the single most useful thing you can do.'
    },
    {
      q: 'Which New Zealand port will my things arrive at?',
      a: 'Most shipments arrive at Auckland or Tauranga for the North Island and Lyttelton for the South Island, with Wellington and Port Chalmers also in use. The [destinations page](/destinations/) explains which port serves which city.'
    }
  ],
  next: [
    { href: R.uk.home, label: 'Removals to New Zealand from the UK', why: 'Our largest market, with a full set of service pages.' },
    { href: R.biosecurity, label: 'New Zealand biosecurity: what you cannot bring', why: 'Read before anything is packed, whichever country you leave from.' },
    { href: R.calculator, label: 'Work out your shipment volume', why: 'The number every quote to New Zealand is built from.' }
  ]
};

/* ------------------------------------------------------------------ */

export const volumeCalculator = {
  path: R.calculator,
  template: 'guide',
  title: 'Moving Volume Calculator for New Zealand | m³ and Cubic Feet',
  h1: 'Moving volume calculator',
  lede:
    'Count what you are shipping, room by room, and get a cubic-metre and cubic-foot total — using per-item volumes published in full underneath, so you can check the arithmetic.',
  description:
    'Free moving volume calculator for removals to New Zealand. Room-by-room inventory in m³ and cubic feet, with every per-item volume published.',
  published: '2026-09-28',
  updated: '2026-09-28',
  crumbs: c({ href: R.calculator, label: 'Volume calculator' }),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Every quote for a move to New Zealand — from any country — is built from the volume of your shipment. Movers in the UK, Europe, Australia and New Zealand talk in cubic metres; movers in the United States and Canada often talk in cubic feet. This calculator gives you both.',
        'The total tells you whether you are looking at excess baggage, a part load in a shared container, or a container of your own, which is the biggest single decision in the price.'
      ]
    },
    { type: 'calculator', heading: 'Estimate your shipment volume' },
    { type: 'h2', text: 'How to get an accurate figure' },
    {
      type: 'ul',
      items: [
        '**Count what is going, not what you own.** New Zealand homes are often sold or let furnished, and furniture is expensive to ship on a long lane. Decide what stays before you count.',
        '**Leave out what biosecurity will make difficult.** Used garden tools, outdoor furniture, wicker and anything that has been in soil can be shipped, but only spotlessly clean. Some families decide it is not worth it.',
        '**Count cartons generously.** People underestimate boxes more than furniture. A typical two-bedroom home fills forty to sixty cartons.',
        '**Remember a vehicle is separate.** Cars and motorbikes are not in this inventory; they change the shipment to a container of your own.'
      ]
    },
    { type: 'volume-assumptions' },
    {
      type: 'note',
      paragraphs: [
        '**These are planning volumes for packed items.** They include export wrapping, which is why a sofa here is larger than its tape-measure size. A surveyor confirms the real volume before any rate is issued.'
      ]
    }
  ],
  faqs: [
    {
      q: 'How many cubic feet are in a cubic metre?',
      a: 'About 35.3. The calculator shows both, and the published table gives every item in both units.'
    },
    {
      q: 'How much fits in a 20ft container?',
      a: 'About 33 m³ (roughly 1,150 cubic feet) of usable space — typically a two to three-bedroom home. A 40ft container holds about 67 m³.'
    }
  ],
  next: [
    { href: R.uk.cost, label: 'What a move from the UK costs', why: 'Turn your volume into a planning range for the UK lane.' },
    { href: R.us.cost, label: 'What a move from the USA costs', why: 'The same, for moves priced in cubic feet.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'Check two quotes against the same volume and the same inclusions.' }
  ]
};

/* ------------------------------------------------------------------ */

export const getAQuote = {
  path: R.quote,
  template: 'quote',
  noindex: true,
  title: 'Plan Your Move to New Zealand | Removals to NZ',
  h1: 'Get your New Zealand removals quote',
  lede: 'Tell us where you are moving from and five short things about the move, and a move consultant replies with a written estimate.',
  description: 'Request a written quote for removals to New Zealand from the UK, USA, Australia, Canada or Europe.',
  crumbs: c({ href: R.quote, label: 'Get a quote' }),
  blocks: [
    { type: 'h2', text: 'Moving from one of these countries?' },
    {
      type: 'p',
      text: 'Each has its own quote page with the questions phrased the way moves work there: [UK](/uk/get-a-quote/), [USA](/us/get-a-quote/), [Australia](/au/get-a-quote/), [Canada](/ca/get-a-quote/) and [Europe](/europe/get-a-quote/). The form on this page works for anywhere.'
    },
    { type: 'h2', text: 'What happens next' },
    {
      type: 'steps',
      items: [
        { title: 'A written reply', body: 'Usually within one working day, from a consultant who handles your route.' },
        { title: 'A survey', body: 'By video or in person for anything bigger than a few boxes. No household move can be priced accurately from a form.' },
        { title: 'An itemised quote', body: 'Origin charges, freight and New Zealand destination charges shown separately, with exclusions listed.' }
      ]
    }
  ]
};

/* ------------------------------------------------------------------ */

export const about = {
  path: R.about,
  template: 'page',
  title: 'About Removals to NZ | International Removals to New Zealand',
  h1: 'About Removals to NZ',
  lede:
    'Removals to NZ is the New Zealand removals division of International Moving Company (IMC), arranging door-to-door moves from the UK, the USA, Australia, Canada and Europe.',
  description:
    'Removals to NZ is the New Zealand division of International Moving Company (IMC): who is behind it, how moves are managed, and the rules this site follows.',
  published: '2026-09-28',
  updated: '2026-09-28',
  crumbs: c({ href: R.about, label: 'About' }),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'We move households to New Zealand. That is the whole of what this site is about: one destination country, five origin markets, and the specific things that make a move to New Zealand different from a move anywhere else — distance, and biosecurity.'
      ]
    },
    { type: 'h2', text: 'How a move is carried out' },
    {
      type: 'p',
      text: 'A move to New Zealand has three legs: packing and export at origin, the international freight, and customs, biosecurity clearance and delivery in New Zealand. We quote all three together, so there is one written price and one point of contact from the survey to the day your boxes are unpacked.'
    },
    {
      type: 'p',
      text: 'Removals to NZ is the New Zealand removals division of [International Moving Company (IMC)](https://internationalmoving.company/), which manages worldwide door-to-door household removals. IMC brings collection, international transport and home delivery into one agreed plan, with the services and responsibilities explained at each stage. This site applies that approach to one destination.'
    },
    { type: 'h2', text: 'The people behind IMC' },
    {
      type: 'p',
      text: '**Warwick Woodley** brings more than four decades of hands-on experience in international moving and freight forwarding. A former FIDI Academy trainer, he has trained moving professionals around the world.'
    },
    {
      type: 'p',
      text: '**Maiane Cassanego** previously worked at New Zealand Van Lines before joining the Export Division at CaroTrans, and brings that relocation and export experience to helping clients understand each stage of their move.'
    },
    {
      type: 'p',
      text: 'Their full profiles are on [IMC\'s about page](https://internationalmoving.company/about-us/).'
    },
    { type: 'h2', text: 'The rules this site follows' },
    {
      type: 'ul',
      items: [
        '**No published rates.** Freight rates to New Zealand move with fuel, season and capacity. We publish how a price is built and planning ranges, and we quote only after a survey.',
        '**Volumes in the open.** The [volume calculator](/tools/moving-volume-calculator/) publishes every per-item figure it uses, so you can check our arithmetic and anyone else\'s.',
        '**Customs and biosecurity in general terms, with the authority named.** Rules change. Our guides explain the framework and point you to the [New Zealand Customs Service](https://www.customs.govt.nz/) and the [Ministry for Primary Industries](https://www.mpi.govt.nz/) for the current position.',
        '**No invented reviews.** There are no testimonials or star ratings on this site. If we add reviews, they will come from an independent platform you can check.'
      ]
    },
    { type: 'h2', text: 'Why one site for five countries' },
    {
      type: 'p',
      text: 'The New Zealand end of every move is the same, and it is where most of the difficulty lies. Writing that part once, properly, is better than five thinner versions. The origin end is different in every country — ports, distances, how people measure a move, even what they call it — so each country has its own pages for [the UK](/uk/), [the USA](/us/), [Australia](/au/), [Canada](/ca/) and [Europe](/europe/).'
    },
    {
      type: 'p',
      text: 'We do not give immigration, tax or legal advice. Where a visa or residence question affects your shipment, we explain the connection and point you to the authority responsible.'
    }
  ],
  next: [
    { href: R.contact, label: 'Contact us', why: 'How to reach a move consultant.' },
    { href: R.guides, label: 'Guides to moving to New Zealand', why: 'Customs, biosecurity, timing and the checklist.' }
  ]
};

export const contact = {
  path: R.contact,
  template: 'page',
  title: 'Contact Removals to NZ | Moving to New Zealand Enquiries',
  h1: 'Contact Removals to NZ',
  lede: 'The quickest way to a useful answer is the quote form; for anything else, email us.',
  description:
    'Contact Removals to NZ about a move to New Zealand from the UK, USA, Australia, Canada or Europe. Email, quote requests and what to include.',
  published: '2026-09-28',
  updated: '2026-09-28',
  crumbs: c({ href: R.contact, label: 'Contact' }),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        `Email [${CONTACT.email}](mailto:${CONTACT.email}). ${CONTACT.responseCommitment}`,
        'If you want a price, the [quote form](/get-a-quote/) asks exactly what a consultant needs and nothing more, so you will get a useful reply rather than a list of questions.'
      ]
    },
    { type: 'h2', text: 'What to include in an email' },
    {
      type: 'ul',
      items: [
        'The town you are moving from and the town in New Zealand you are moving to.',
        'Roughly how much is going — number of bedrooms, or a volume from the [calculator](/tools/moving-volume-calculator/).',
        'When you need to move, and whether your visa or residence is already granted.',
        'Anything unusual: a vehicle, a piano, artwork, a boat, a large garden or workshop.'
      ]
    },
    { type: 'h2', text: 'Which country page is for you' },
    {
      type: 'p',
      text: 'Pages are organised by the country you are moving from, because that decides the ports, the timeline and how the move is priced. Choose [the UK](/uk/), [the USA](/us/), [Australia](/au/), [Canada](/ca/) or [Europe](/europe/). If you are moving from somewhere else, email us — we will tell you honestly whether we can help.'
    },
    {
      type: 'p',
      text: 'We reply in writing because a move to New Zealand involves figures, dates and documents you will want to refer back to. A phone call is always available once a consultant has your details.'
    },
    { type: 'h2', text: 'Before you get in touch' },
    {
      type: 'p',
      text: 'Two pages answer most first questions. The [volume calculator](/tools/moving-volume-calculator/) turns a houseful of furniture into the cubic-metre figure every mover prices from, and the [biosecurity guide](/guides/new-zealand-biosecurity-what-you-cannot-bring/) explains which of your things New Zealand will want cleaned, inspected or left behind. Reading both before a survey makes the survey shorter and the quote more accurate, because the decisions that change the price are already made.'
    },
    {
      type: 'p',
      text: 'We cannot answer visa or immigration questions. Immigration New Zealand is the authority for those, and your employer or a licensed immigration adviser can help with your own circumstances.'
    }
  ]
};

export const legal = {
  path: R.legal,
  template: 'page',
  title: 'Legal and Privacy | Removals to NZ',
  h1: 'Legal and privacy',
  lede: 'What happens to the details you send us, and the terms on which this site gives information.',
  description:
    'How Removals to NZ uses the personal details submitted through its quote form, your rights over them, and the limits of the guidance on this site.',
  published: '2026-09-28',
  updated: '2026-09-28',
  crumbs: c({ href: R.legal, label: 'Legal and privacy' }),
  blocks: [
    { type: 'h2', text: 'Who is responsible for your data' },
    {
      type: 'p',
      text: OPERATOR.confirmed
        ? `${OPERATOR.legalName || `${OPERATOR.name} (${OPERATOR.shortName})`}${OPERATOR.companyNumber ? `, company number ${OPERATOR.companyNumber}` : ''}${OPERATOR.registeredAddress ? `, ${OPERATOR.registeredAddress}` : ''}, is responsible for personal data collected through this site.`
        : 'The registered company responsible for personal data collected through this site will be named here, with its registration number and address, before the quote form goes live.'
    },
    { type: 'h2', text: 'The enquiry form' },
    {
      type: 'p',
      text: 'The enquiry form on this site is International Moving Company\'s own form, shown in a frame from internationalmoving.company. What you type into it goes straight to IMC, not to this site: your origin and destination, move date and size, any item list and notes, and your name, phone number and email address. IMC uses those details to prepare your quote and get back to you. [IMC\'s privacy policy](https://internationalmoving.company/privacy-policy/) explains how they are handled and kept.'
    },
    {
      type: 'p',
      text: 'The form also tells IMC which page of this site you were on and which country section it belonged to, so your enquiry reaches the right person. This site itself sets no cookies and stores nothing you type. If you use the "Moving from" suggestion, the only thing it remembers is that you dismissed it, in your own browser.'
    },
    {
      type: 'p',
      text: 'We do not sell your details, and we do not add you to marketing lists without asking.'
    },
    { type: 'h2', text: 'Your rights' },
    {
      type: 'p',
      text: `Depending on where you live, data-protection law — for example UK GDPR, the EU GDPR, the Australian Privacy Act, Canada's PIPEDA, New Zealand's Privacy Act 2020 or US state privacy laws — gives you rights to see, correct and delete the personal data we hold about you, and to object to how it is used. Email [${CONTACT.email}](mailto:${CONTACT.email}) to use any of them.`
    },
    { type: 'h2', text: 'About the information on this site' },
    {
      type: 'p',
      text: 'Guidance on this site describes general practice for international removals to New Zealand. It is not customs, biosecurity, immigration, tax or legal advice. Costs and transit times are planning ranges, not quotes. Rules change: confirm current requirements with the New Zealand Customs Service, the Ministry for Primary Industries and Immigration New Zealand before you act.'
    },
    {
      type: 'p',
      text: 'The terms and conditions that apply to a move are the ones in your written quote, not anything on this site.'
    }
  ]
};
