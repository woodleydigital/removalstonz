/**
 * UK MARKET — /uk/. The primary market: largest search demand by far.
 *
 * Query templates targeted, from the supplied Ahrefs UK data (Sept 2026):
 *   removals to new zealand (800) ............................ /uk/
 *   international removals uk to new zealand (350) ........... /uk/
 *   international removals to new zealand (200) .............. /uk/
 *   uk to new zealand removals / removals from (the) uk ... (150 each) /uk/
 *   house / household removals to new zealand (150 / 80) ..... household
 *   furniture removals (uk) to new zealand (150 / 90) ........ furniture
 *   small removals / part load removals to nz (100 / 90) ..... part load
 *   cheap removals to new zealand (90) ....................... part load + cost
 *   removals to new zealand costs (90) ....................... cost
 *   overseas removals to new zealand (70) .................... /uk/
 *
 * The home, cost and shipping-time pages are hreflang equivalents of the other
 * markets' pages. Service pages and collection areas are UK-only (no cluster).
 */

import { R } from '../routes.js';

const U = R.uk;
const HOME = { href: R.global, label: 'Home' };
const UK = { href: U.home, label: 'UK' };
const c = (...items) => [HOME, UK, ...items];
const SERVICES = { href: U.services, label: 'Services' };
const sc = (item) => c(SERVICES, item);
const PUB = '2026-09-28';

const UK_AREAS = ['United Kingdom', 'New Zealand'];

export const ukHome = {
  path: U.home,
  market: 'uk',
  hreflangGroup: 'home',
  template: 'home',
  title: 'Removals to New Zealand from the UK | Door-to-Door Moving',
  h1: 'Removals to New Zealand from the UK',
  lede:
    'International removals from anywhere in the UK to anywhere in New Zealand — household moves, part loads and full containers, packed for New Zealand biosecurity and delivered to your door.',
  description:
    'UK to New Zealand removals: household moves, part loads and containers from anywhere in the UK, packed for NZ biosecurity and delivered door to door.',
  published: PUB,
  updated: PUB,
  crumbs: [HOME, UK],
  heroCta: { href: U.cost, label: 'See what it costs' },
  heroTrust: [
    '**Collection anywhere in mainland Britain** — Northern Ireland on request',
    '**Door to door** — one written quote from your UK home to your New Zealand one',
    '**Priced from volumes we publish** — so you can check the arithmetic'
  ],
  serviceCatalogue: [
    { name: 'Household removals to New Zealand', href: U.household },
    { name: 'Part load and small removals to New Zealand', href: U.partLoad },
    { name: 'Furniture removals to New Zealand', href: U.furniture },
    { name: 'Container shipping to New Zealand', href: U.container },
    { name: 'Excess baggage to New Zealand', href: U.baggage }
  ],
  service: {
    name: 'International removals from the United Kingdom to New Zealand',
    type: 'International household removals',
    description:
      'Door-to-door packing, export documentation, sea and air freight, New Zealand customs and MPI biosecurity clearance and delivery for people relocating from the United Kingdom to New Zealand.',
    areaServed: UK_AREAS,
    audience: 'People and families relocating from the United Kingdom to New Zealand'
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Most UK households moving to New Zealand ship between 10 m³ and 35 m³ by sea in a shared container, and should plan on ten to sixteen weeks door to door. It is one of the longest removal routes in the world — roughly six to eight weeks of that is the voyage itself — so the date you are packed is usually two to three months before you want your things.',
        'Two things decide the price: the volume you ship, and whether it travels as a part load or fills a container of its own. The third thing, specific to New Zealand, is biosecurity: how clean your garden and outdoor items are decides how quickly they clear.'
      ]
    },
    {
      type: 'cards',
      heading: 'Start with the number that drives your quote',
      intro: 'Every UK–New Zealand move is priced from cubic metres. Get that right and the rest follows.',
      cols: 3,
      items: [
        { href: R.calculator, eyebrow: 'Tool', title: 'Volume calculator', body: 'Count your furniture and boxes and get a cubic-metre figure, using per-item volumes we publish in full.', cta: 'Work out my volume' },
        { href: U.cost, eyebrow: 'Costs', title: 'What a move to NZ costs', body: 'How UK–New Zealand pricing is built, what each size of move involves, and how to keep it down.', cta: 'See the cost breakdown' },
        { href: U.times, eyebrow: 'Timing', title: 'How long it takes', body: 'Where the ten to sixteen weeks actually go, and which stages you can shorten.', cta: 'Shipping times' }
      ]
    },
    {
      type: 'cards',
      heading: 'Removals from the UK to New Zealand',
      cols: 3,
      items: [
        { href: U.household, title: 'Household removals', body: 'A whole house packed, shipped and delivered — the standard move for a family emigrating.', cta: 'House removals' },
        { href: U.partLoad, title: 'Part load and small removals', body: 'A flat, a few rooms or a handful of pieces, sharing a container to keep the cost down.', cta: 'Small removals' },
        { href: U.furniture, title: 'Furniture removals', body: 'Individual pieces, antiques and heirlooms, crated where they need it.', cta: 'Furniture removals' },
        { href: U.container, title: 'Container shipping', body: 'Your own 20ft or 40ft container — the fastest and cheapest per cubic metre for larger homes and cars.', cta: 'Containers' },
        { href: U.baggage, title: 'Excess baggage', body: 'Boxes and suitcases only, for students, working holidays and light movers.', cta: 'Excess baggage' },
        { href: U.collection, title: 'UK collection areas', body: 'Where we collect from, and how your location affects dates.', cta: 'Collection areas' }
      ]
    },
    { type: 'journey', heading: 'Where the weeks actually go', intro: 'Proportions of a typical UK to New Zealand part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'Why the New Zealand end is the part that matters' },
    {
      type: 'p',
      text: 'Any UK removals company can put your belongings in a container to Auckland. The difference between a smooth move and an expensive one shows up when the container is opened in New Zealand: your goods have to be released by NZ Customs and by the Ministry for Primary Industries, and MPI will inspect anything that might carry soil, seeds or insects. A spade with earth on it, a wicker chair or a pair of walking boots can hold up a whole shipment and add treatment costs.'
    },
    {
      type: 'p',
      text: 'So we deal with biosecurity at the start, not the end. At survey we go through the shed, the garage and the garden with you and tell you what is worth cleaning and shipping and what is cheaper to sell and replace. The packers keep outdoor items together and list them clearly, so if MPI wants to look, it takes minutes rather than days.'
    },
    {
      type: 'steps',
      items: [
        { title: 'Survey and written quote', body: 'A video or home survey sets the volume and flags anything needing cleaning or crating. Your quote lists the New Zealand charges and the exclusions.' },
        { title: 'Packing and collection in the UK', body: 'Export packing, a numbered inventory and collection from your home, anywhere in mainland Britain.' },
        { title: 'Sailing from a UK port', body: 'Shared container or your own, usually from Southampton, Felixstowe or London Gateway, on a six-to-eight-week voyage.' },
        { title: 'NZ Customs and MPI clearance', body: 'Documents lodged, the concession applied where you qualify, and any inspection attended.' },
        { title: 'Delivery in New Zealand', body: 'To your door anywhere from Northland to Southland, unpacked to the level you asked for.' }
      ]
    },
    { type: 'h2', text: 'What a comparison site will not tell you' },
    {
      type: 'ul',
      items: [
        '**You probably ship less than you think.** Furniture is expensive to send twelve thousand miles, UK appliances need adapting to New Zealand plugs, and many NZ rentals are furnished. The cheapest cubic metre is the one you sell before you go.',
        '**A cheap groupage rate can be a slow move.** A shared container waits to fill. That is fine if you plan for it, and infuriating if you were told "eight weeks" by someone quoting port to port.',
        '**New Zealand destination charges are where quotes stop being comparable.** Depot handling, clearance, MPI inspection and delivery are real costs. A quote that leaves them out is incomplete, not cheaper.'
      ]
    },
    {
      type: 'note',
      paragraphs: [
        '**On the figures used here.** Cost and transit ranges are planning figures for the UK–New Zealand lane, not rates; no rate is issued without a survey. Customs and biosecurity rules are described in general terms — confirm current requirements with the [New Zealand Customs Service](https://www.customs.govt.nz/) and [MPI](https://www.mpi.govt.nz/) before you ship.'
      ]
    },
    { type: 'lead', heading: 'Get your UK to New Zealand removals quote', id: 'quote-foot' }
  ],
  faqs: [
    { q: 'How much does it cost to move to New Zealand from the UK?', a: 'It depends on volume far more than anything else: a part load of boxes and a few pieces of furniture is a different proposition from a full 40ft container. The [UK cost guide](/uk/cost-of-moving-to-new-zealand-from-uk/) sets out how pricing is built and what each size of move involves.' },
    { q: 'How long does shipping from the UK to New Zealand take?', a: 'Plan on ten to sixteen weeks door to door by sea and one to three weeks by air. The [shipping times guide](/uk/shipping-times-uk-to-new-zealand/) shows where the weeks go.' },
    { q: 'Do you collect from anywhere in the UK?', a: 'Yes — England, Scotland and Wales, with Northern Ireland on request. See [UK collection areas](/uk/collection-areas/).' },
    { q: 'Can I take my garden furniture and tools?', a: 'Yes, if they are completely clean. New Zealand biosecurity is strict about soil and plant matter. Read [what you cannot bring](/guides/new-zealand-biosecurity-what-you-cannot-bring/) before deciding.' },
    { q: 'Will I pay tax on my belongings in New Zealand?', a: 'Usually not, if you are emigrating or returning home and your goods are used personal effects. New goods can attract GST. The [customs guide](/guides/new-zealand-customs-personal-effects/) explains the concession.' }
  ],
  next: [
    { href: U.cost, label: 'What a move to New Zealand costs from the UK', why: 'Planning ranges by shipment size, and the charges to check in any quote.' },
    { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'Read before you sort the shed.' },
    { href: R.destinations, label: 'Removals to Auckland, Wellington, Christchurch and more', why: 'Which port serves your new city.' }
  ]
};

/* ------------------------------------------------------------------ */

export const ukServices = {
  path: U.services,
  market: 'uk',
  template: 'hub',
  title: 'UK to New Zealand Removal Services | Removals to NZ',
  h1: 'Removal services from the UK to New Zealand',
  lede:
    'Five ways to get your belongings from the UK to New Zealand, depending on how much you are taking and how quickly you need it.',
  description:
    'UK to New Zealand removal services: household removals, part loads and small moves, furniture, full containers and excess baggage — which one fits your move.',
  published: PUB,
  updated: PUB,
  crumbs: c(SERVICES),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'The service follows the volume. Under about two cubic metres — boxes and suitcases — is excess baggage. From there to around twenty cubic metres, a part load in a shared container is usually cheapest. Above that, a container of your own starts to compete, and for a family home or a car it usually wins.'
      ]
    },
    {
      type: 'cards',
      heading: 'Choose by what you are moving',
      cols: 2,
      items: [
        { href: U.household, eyebrow: 'Most families', title: 'Household removals', body: 'The whole house, packed by a crew, shipped and delivered.', cta: 'Household removals' },
        { href: U.partLoad, eyebrow: 'Smaller moves', title: 'Part load and small removals', body: 'Share a container and pay only for your space.', cta: 'Part loads' },
        { href: U.furniture, eyebrow: 'Specific pieces', title: 'Furniture removals', body: 'Single items, antiques, pianos and art, crated as needed.', cta: 'Furniture' },
        { href: U.container, eyebrow: 'Larger homes', title: 'Container shipping', body: 'A 20ft or 40ft container of your own, with a car if you like.', cta: 'Containers' },
        { href: U.baggage, eyebrow: 'Light movers', title: 'Excess baggage', body: 'Boxes and suitcases, by sea or air.', cta: 'Excess baggage' }
      ]
    },
    { type: 'h2', text: 'Which service fits which volume' },
    {
      type: 'table',
      caption: 'How shipment size maps to service on the UK–New Zealand lane. Planning guidance only.',
      head: ['Volume', 'Typical home', 'Usual service'],
      rows: [
        ['Under 2 m³', 'Boxes and suitcases', '[Excess baggage](/uk/services/excess-baggage-to-new-zealand/)'],
        ['2–15 m³', 'Studio to two-bedroom flat', '[Part load](/uk/services/part-load-removals-to-new-zealand/)'],
        ['15–30 m³', 'Two to three-bedroom house', 'Part load or a [20ft container](/uk/services/container-shipping-to-new-zealand/)'],
        ['30–67 m³', 'Three to five-bedroom house', '40ft container'],
        ['Any, plus a car', 'Any', 'A container of your own']
      ]
    },
    { type: 'h2', text: 'What every service includes' },
    {
      type: 'p',
      text: 'Whichever you choose, the New Zealand part of the move is the same: customs clearance, MPI biosecurity, and delivery to your door. Export packing and inventory are included on all household services; for excess baggage you can pack yourself. Storage, insurance and crating are quoted as options so you can see what each one costs.'
    }
  ],
  faqs: [
    { q: 'Can I combine services?', a: 'Yes — the most common combination is a sea shipment for the household and a small air or excess-baggage consignment for essentials.' }
  ],
  next: [
    { href: U.cost, label: 'What each service costs to plan for', why: 'The UK–New Zealand cost guide.' },
    { href: R.calculator, label: 'Work out your volume', why: 'To see which band you are in.' }
  ]
};

export const ukHousehold = {
  path: U.household,
  market: 'uk',
  template: 'service',
  title: 'House Removals to New Zealand from the UK | Household Moves',
  h1: 'Household removals to New Zealand from the UK',
  lede:
    'A whole home packed in the UK and unpacked in New Zealand: the standard service for a family emigrating, a returning Kiwi, or anyone relocating for work.',
  description:
    'House and household removals from the UK to New Zealand: full export packing, a biosecurity-aware inventory, sea freight and delivery to your new home.',
  published: PUB,
  updated: PUB,
  crumbs: sc({ href: U.household, label: 'Household removals' }),
  service: {
    name: 'Household removals from the UK to New Zealand',
    type: 'International household removals',
    description: 'Full-service door-to-door household removal from the United Kingdom to New Zealand, including export packing, freight, clearance and delivery.',
    areaServed: UK_AREAS,
    audience: 'Households emigrating from the United Kingdom to New Zealand'
  },
  quoteHeading: 'Get a household removals quote',
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A household removal to New Zealand means a crew packs everything to export standard at your UK home, lists every item on a numbered inventory, and loads it for a sea voyage of six to eight weeks. In New Zealand, your goods are cleared by Customs and MPI and delivered to your new home, where the crew unpacks, reassembles furniture and takes the packing away.',
        'Most UK homes ship between 15 m³ and 40 m³. Where that falls decides whether you share a container or have your own.'
      ]
    },
    { type: 'h2', text: 'Who this service is for' },
    {
      type: 'ul',
      items: [
        '**Families emigrating** on a skilled-migrant or work visa, taking a house\'s worth of furniture.',
        '**Returning New Zealanders** coming home after years in the UK.',
        '**Retirees** joining children who have already emigrated — often a downsizing move.',
        '**Employer-funded relocations**, where the scope is set by a relocation policy.'
      ]
    },
    { type: 'h2', text: 'What is included' },
    {
      type: 'table',
      caption: 'A standard UK to New Zealand household removal.',
      head: ['Stage', 'Included as standard', 'Optional'],
      rows: [
        ['Survey', 'Video or in-home survey and written quote', '—'],
        ['UK packing', 'Export wrapping and cartons, numbered inventory, dismantling', 'Packing by you, to save cost'],
        ['Collection and export', 'Loading, transport to the port, export paperwork', 'Storage before sailing'],
        ['Freight', 'Sea freight, shared or your own container', 'Air freight for essentials'],
        ['NZ clearance', 'Customs and MPI documentation', 'Inspection and treatment fees, if incurred'],
        ['Delivery', 'Delivery, unpacking, reassembly, debris removal', 'Storage-in-transit; long-carry extras']
      ]
    },
    { type: 'h2', text: 'What to decide before the survey' },
    {
      type: 'p',
      text: 'The cheapest way to reduce a quote to New Zealand is to decide what stays behind. Three categories are worth thinking through:'
    },
    {
      type: 'ul',
      items: [
        '**Large appliances.** UK washing machines, fridges and dryers work on New Zealand\'s power supply but need the plugs changing, and they take up a lot of container space. Many people sell them.',
        '**The shed and garden.** Everything must be cleaned spotless for MPI. For a mower that is ten years old, it is rarely worth it.',
        '**Furniture that suits a British house.** New Zealand homes are often open-plan and single-storey. A tall dresser or a heavy wardrobe may not fit the house you move into.'
      ]
    },
    { type: 'h2', text: 'Timing a family move' },
    {
      type: 'p',
      text: 'Allow ten to sixteen weeks door to door. Most families are packed a week or two before they fly, spend the first two months in New Zealand in furnished accommodation, and have a small [air or excess-baggage consignment](/uk/services/excess-baggage-to-new-zealand/) of essentials sent ahead. The NZ school year starts in late January or early February, which drives a lot of UK moves into the autumn.'
    }
  ],
  faqs: [
    { q: 'How much does a three-bedroom house cost to move to New Zealand?', a: 'A typical three-bedroom UK house is 25–35 m³, which sits at the point where a 20ft container competes with a part load. The [cost guide](/uk/cost-of-moving-to-new-zealand-from-uk/) explains how to compare the two.' },
    { q: 'Do I need to be in New Zealand when my goods arrive?', a: 'Yes, in practice. Clearance normally needs evidence that you have arrived. If your goods might arrive first, we plan a short period of storage.' },
    { q: 'Can you pack just some of it?', a: 'Yes. Many families pack books and clothes themselves and leave fragile and bulky items to the crew. Cartons you pack are listed as "packed by owner", which matters for insurance.' }
  ],
  next: [
    { href: U.container, label: 'Your own container from the UK', why: 'If your home is 25 m³ or more, or you are taking a car.' },
    { href: U.cost, label: 'What a household move costs', why: 'Planning ranges and the charges to check.' },
    { href: R.customs, label: 'NZ customs rules for your household goods', why: 'The concession and the documents you will need.' }
  ]
};

export const ukPartLoad = {
  path: U.partLoad,
  market: 'uk',
  template: 'service',
  title: 'Part Load and Small Removals to New Zealand from the UK',
  h1: 'Part load and small removals to New Zealand',
  lede:
    'Share a container and pay only for the space you use — the usual way to send a flat, a few rooms or a handful of pieces from the UK to New Zealand.',
  description:
    'Part load and small removals from the UK to New Zealand: share a container, pay for your space only, and what the trade-off in timing actually is.',
  published: PUB,
  updated: PUB,
  crumbs: sc({ href: U.partLoad, label: 'Part load and small removals' }),
  service: {
    name: 'Part load removals from the UK to New Zealand',
    type: 'Groupage (LCL) international removals',
    description: 'Shared-container (groupage) removals for smaller volumes from the United Kingdom to New Zealand, door to door.',
    areaServed: UK_AREAS,
    audience: 'People moving a small home or a few items from the UK to New Zealand'
  },
  quoteHeading: 'Get a part load quote',
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A part load (also called groupage or LCL — less than container load) puts your belongings into a container shared with other people\'s moves to New Zealand. Your goods are packed and wrapped at home, collected, and consolidated at a UK depot, then loaded with other shipments. You pay for the cubic metres you use, not the whole box.',
        'For anything from a few pieces to a two-bedroom flat — roughly 2 m³ to 15 m³ — it is almost always the cheapest way to move. The trade-off is time: the container sails when it is full.'
      ]
    },
    { type: 'h2', text: 'Is a part load right for you?' },
    {
      type: 'table',
      caption: 'Part load against your own container, for smaller moves.',
      head: ['', 'Part load', 'Your own container'],
      rows: [
        ['Best volume', 'About 2–20 m³', '25 m³ and above'],
        ['What you pay for', 'Your cubic metres, subject to a minimum', 'The whole container'],
        ['Timing', 'Waits for the container to fill; less predictable', 'Sails on a date you choose'],
        ['Handling', 'Loaded and unloaded at depots at both ends', 'Loaded at your door, usually'],
        ['Door-to-door planning range', '12–16 weeks', '10–13 weeks']
      ]
    },
    { type: 'h2', text: 'What "small removals" really costs' },
    {
      type: 'p',
      text: 'Small moves carry a minimum charge, and New Zealand destination charges have a fixed element whatever the volume. That means the cost per cubic metre of a very small shipment is high. If you are close to the minimum, it is often worth adding things rather than leaving them: filling your space costs little extra. Below about two cubic metres, [excess baggage](/uk/services/excess-baggage-to-new-zealand/) is usually better value.'
    },
    { type: 'h2', text: 'How to make a part load go faster' },
    {
      type: 'ul',
      items: [
        '**Be flexible on the collection date.** Consolidation is the one stage you can influence. A week either way can mean catching the next container rather than waiting for the one after.',
        '**Be ready early.** Having everything packed and documents sorted means your goods go on the first available sailing.',
        '**Choose a main port.** Shipments to Auckland and Tauranga fill fastest; South Island part loads can wait longer.'
      ]
    },
    { type: 'h2', text: 'Cheap removals to New Zealand, honestly' },
    {
      type: 'p',
      text: 'A cheap part-load quote is usually cheap because it stops at a New Zealand port, or because the volume was guessed low. Check both. Our [guide to comparing quotes](/guides/comparing-international-removal-quotes/) lists the charges most often left out, and the [volume calculator](/tools/moving-volume-calculator/) lets you check the cubic metres against a published standard.'
    }
  ],
  faqs: [
    { q: 'What is the minimum for a part load to New Zealand?', a: 'Most movers have a minimum volume charge on groupage — often around one to two cubic metres. Below that, excess baggage is usually better value.' },
    { q: 'Is my furniture safe in a shared container?', a: 'Yes, when it is export-wrapped and inventoried properly. Every item is labelled with your name and number, and shipments are separated in the container.' },
    { q: 'How long does a part load from the UK take?', a: 'Plan on twelve to sixteen weeks door to door, allowing for consolidation at both ends. See [UK shipping times](/uk/shipping-times-uk-to-new-zealand/).' }
  ],
  next: [
    { href: U.baggage, label: 'Excess baggage to New Zealand', why: 'For just boxes and suitcases.' },
    { href: U.times, label: 'How long shipping from the UK takes', why: 'Where the weeks go on a part load.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'Make sure a cheap quote is a complete one.' }
  ]
};

export const ukFurniture = {
  path: U.furniture,
  market: 'uk',
  template: 'service',
  title: 'Furniture Removals from the UK to New Zealand | Ship Furniture',
  h1: 'Furniture removals from the UK to New Zealand',
  lede:
    'Shipping a few pieces of furniture — an heirloom dresser, a piano, a dining set — from the UK to New Zealand, packed and crated to survive the longest removal route there is.',
  description:
    'Furniture removals from the UK to New Zealand: single items, antiques, pianos and art, export wrapping and crating, and New Zealand biosecurity for wood.',
  published: PUB,
  updated: PUB,
  crumbs: sc({ href: U.furniture, label: 'Furniture removals' }),
  service: {
    name: 'Furniture removals from the UK to New Zealand',
    type: 'International furniture shipping',
    description: 'Collection, export wrapping, crating and shipping of individual furniture items from the United Kingdom to New Zealand.',
    areaServed: UK_AREAS
  },
  quoteHeading: 'Get a furniture shipping quote',
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Individual pieces of furniture go to New Zealand in a shared container as a part load. Each piece is export-wrapped — blankets, bubble wrap and cardboard — or crated in timber if it is fragile, valuable or glass-fronted. It is collected from your UK address and delivered to your door in New Zealand after customs and biosecurity clearance.',
        'Because a long sea voyage means months in a container, through changes in temperature and humidity, the packing matters more on this route than on almost any other.'
      ]
    },
    { type: 'h2', text: 'Worth shipping, or cheaper to replace?' },
    {
      type: 'p',
      text: 'Flat-pack and mass-produced furniture is almost never worth shipping to New Zealand; the freight often costs more than replacing it. Solid-wood pieces, antiques, family heirlooms and good-quality upholstered furniture usually are, both because they are expensive to replace and because they cannot be.'
    },
    { type: 'h2', text: 'Packing and crating' },
    {
      type: 'table',
      caption: 'How different pieces are usually packed for a UK–New Zealand voyage.',
      head: ['Item', 'Usual packing'],
      rows: [
        ['Sofas and upholstered chairs', 'Export wrapping; covers to keep clean and dry'],
        ['Wooden tables, chests and wardrobes', 'Blanket wrap and cardboard; dismantled where possible'],
        ['Glass-fronted cabinets, mirrors, marble tops', 'Timber crate'],
        ['Antiques and fine art', 'Custom crate; condition report before packing'],
        ['Pianos', 'Specialist handling and a crate or skid'],
        ['Beds and mattresses', 'Mattress bags and frame wrapping']
      ]
    },
    { type: 'h2', text: 'Biosecurity and wooden furniture' },
    {
      type: 'p',
      text: 'MPI looks closely at wood. Finished, varnished furniture is rarely a problem, but pieces with bark, raw or unfinished timber, woodworm holes or dust ("frass") will be inspected and may be treated. Wicker, rattan and cane furniture is also checked. Crates themselves must meet the ISPM 15 standard for wood packaging — heat-treated and stamped — which every export crate we build does.'
    },
    { type: 'h2', text: 'Antiques and CITES' },
    {
      type: 'p',
      text: 'Antique furniture with ivory inlay, tortoiseshell, or some tropical hardwoods such as Brazilian rosewood may need CITES permits to leave the UK and enter New Zealand. If you have a piece like this, tell us at survey so the paperwork is started early.'
    }
  ],
  faqs: [
    { q: 'Can I ship just one item of furniture to New Zealand?', a: 'Yes, as a part load. There is a minimum charge, so it is often worth sending a few boxes with it.' },
    { q: 'Should I insure furniture going to New Zealand?', a: 'Yes. Standard carrier liability is calculated by weight and is nowhere near the value of good furniture. Marine insurance is offered as an option on every quote.' }
  ],
  next: [
    { href: U.partLoad, label: 'Part load removals', why: 'How individual pieces actually travel.' },
    { href: R.biosecurity, label: 'Biosecurity: what you cannot bring', why: 'Particularly for wood, wicker and outdoor furniture.' },
    { href: R.calculator, label: 'Volume calculator', why: 'Every item\'s packed volume, published.' }
  ]
};

export const ukContainer = {
  path: U.container,
  market: 'uk',
  template: 'service',
  title: 'Container Shipping to New Zealand from the UK | 20ft and 40ft',
  h1: 'Container shipping from the UK to New Zealand',
  lede:
    'A 20ft or 40ft container of your own, loaded at your UK door and sealed until New Zealand. The fastest way for a larger home, and the only sensible way to take a car.',
  description:
    'Shipping a 20ft or 40ft container from the UK to New Zealand for household goods and cars: capacity, loading, timings and when it beats a part load.',
  published: PUB,
  updated: PUB,
  crumbs: sc({ href: U.container, label: 'Container shipping' }),
  service: {
    name: 'Full container load removals from the UK to New Zealand',
    type: 'Full container load (FCL) international removals',
    description: 'Sole-use 20ft and 40ft container shipping of household goods and vehicles from the United Kingdom to New Zealand.',
    areaServed: UK_AREAS
  },
  quoteHeading: 'Get a container quote',
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'With a full container load (FCL), the container is delivered to your UK home, packed and loaded there by the crew, sealed, and not opened again until New Zealand — unless Customs or MPI ask to see inside. There is no waiting for other people\'s goods, so it is the quickest option, typically ten to thirteen weeks door to door.',
        'A 20ft container holds about 33 m³, roughly a two-to-three-bedroom house. A 40ft holds about 67 m³, or a four-to-five-bedroom house. Above about 25 m³, your own container is often the same price as a part load or less.'
      ]
    },
    { type: 'h2', text: 'Container sizes' },
    {
      type: 'table',
      caption: 'Usable volume of standard containers for household removals.',
      head: ['Container', 'Usable volume', 'Typically fits'],
      rows: [
        ['20ft standard', 'About 33 m³', 'Two to three-bedroom house, or a smaller home plus a car'],
        ['40ft standard', 'About 67 m³', 'Four to five-bedroom house, or a family home plus a car'],
        ['40ft high cube', 'About 76 m³', 'Bulky, light loads that need extra height']
      ]
    },
    { type: 'h2', text: 'Loading at your door' },
    {
      type: 'p',
      text: 'A container arrives on a trailer and needs somewhere to park for the loading day — a 40ft container and its lorry are about 16 metres long. On a narrow street or a cul-de-sac, a council parking suspension may be needed, or the goods are packed at home and shuttled to a depot for loading. We check this at survey.'
    },
    { type: 'h2', text: 'Shipping a car in your container' },
    {
      type: 'p',
      text: 'A car goes in first, secured and chocked, with household goods loaded around it. Before it goes, the underbody, wheel arches and interior must be professionally cleaned for MPI. In New Zealand it will need entry certification and compliance through NZ Transport Agency Waka Kotahi, and it may attract duty and GST depending on your status and how long you have owned it. Right-hand-drive UK cars suit New Zealand roads, which helps.'
    },
    { type: 'h2', text: 'When a part load is still better' },
    {
      type: 'p',
      text: 'Under about 20 m³, a [part load](/uk/services/part-load-removals-to-new-zealand/) almost always costs less. Between 20 and 30 m³ it is worth pricing both: the crossover moves with freight rates, and the speed of your own container may be worth something to you.'
    }
  ],
  faqs: [
    { q: 'Can I pack the container myself?', a: 'You can, but export packing, securing the load and the inventory are what make a sole-use container clear quickly in New Zealand. Most people have it packed and loaded by the crew.' },
    { q: 'Where does my container arrive?', a: 'Usually Auckland or Tauranga for the North Island, and Lyttelton or Port Chalmers for the South Island. It may be delivered to your door on a trailer if the street allows.' }
  ],
  next: [
    { href: U.household, label: 'Household removals', why: 'The full-service move a container usually carries.' },
    { href: R.customs, label: 'NZ customs rules, including vehicles', why: 'What a car needs to clear.' },
    { href: U.cost, label: 'Container against part load costs', why: 'Where the crossover sits.' }
  ]
};

export const ukBaggage = {
  path: U.baggage,
  market: 'uk',
  template: 'service',
  title: 'Excess Baggage to New Zealand from the UK | Boxes and Suitcases',
  h1: 'Excess baggage to New Zealand from the UK',
  lede:
    'Boxes and suitcases only — for students, working holiday makers, people moving light, and families sending essentials ahead of the main shipment.',
  description:
    'Excess baggage and boxes from the UK to New Zealand by sea or air: collection, what to pack, biosecurity, and when it beats a part load.',
  published: PUB,
  updated: PUB,
  crumbs: sc({ href: U.baggage, label: 'Excess baggage' }),
  service: {
    name: 'Excess baggage shipping from the UK to New Zealand',
    type: 'Unaccompanied baggage shipping',
    description: 'Collection and shipping of boxes and suitcases from the United Kingdom to New Zealand by sea or air freight.',
    areaServed: UK_AREAS,
    audience: 'Students, working holiday makers and light movers from the UK'
  },
  quoteHeading: 'Get an excess baggage quote',
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Excess baggage is unaccompanied baggage: boxes and suitcases collected from your UK address and shipped separately from you, by sea or by air. It is the cheapest way to send a few boxes to New Zealand, and far cheaper than paying an airline for extra bags.',
        'By sea, plan on ten to sixteen weeks door to door; by air, one to three. The same NZ Customs and MPI rules apply as to a full household move.'
      ]
    },
    { type: 'h2', text: 'Who uses it' },
    {
      type: 'ul',
      items: [
        '**Working holiday makers** heading to New Zealand for a year or two.',
        '**Students** starting at a New Zealand university.',
        '**People moving light** who are selling their furniture in the UK.',
        '**Families** sending essentials by air ahead of a sea shipment.'
      ]
    },
    { type: 'h2', text: 'Sea or air' },
    {
      type: 'table',
      caption: 'Excess baggage from the UK to New Zealand, sea against air. Planning ranges.',
      head: ['', 'Sea', 'Air'],
      rows: [
        ['Door to door', '10–16 weeks', '1–3 weeks'],
        ['Priced by', 'Volume, with a minimum', 'Chargeable weight (volume or weight, whichever is more)'],
        ['Best for', 'Anything you can wait for', 'Clothes, work kit and what you need first']
      ]
    },
    { type: 'h2', text: 'Packing your boxes' },
    {
      type: 'ul',
      items: [
        'Use strong double-walled cartons or sturdy suitcases, and tape every seam.',
        'Label each one with your name and a number, and keep a list of what is in each — NZ Customs and MPI will want it.',
        'Do not pack food, plants, seeds, soil or anything that has been used outdoors unless it is spotless.',
        'Keep passports, money and valuables with you.'
      ]
    },
    { type: 'h2', text: 'When a part load makes more sense' },
    {
      type: 'p',
      text: 'Once you are past about two cubic metres — say fifteen to twenty large boxes, or a bicycle and some furniture — a [part load](/uk/services/part-load-removals-to-new-zealand/) is usually better value, and it includes professional packing.'
    }
  ],
  faqs: [
    { q: 'Can I send a bike as excess baggage to New Zealand?', a: 'Yes, boxed — and completely clean. Bikes are on MPI\'s list of items they look at closely because of soil in the tyres.' },
    { q: 'Do I pay duty on excess baggage?', a: 'Used personal effects usually come in free if you qualify for the concession. New items may attract GST. See the [customs guide](/guides/new-zealand-customs-personal-effects/).' }
  ],
  next: [
    { href: R.seaVsAir, label: 'Sea against air freight', why: 'Which way to send what.' },
    { href: U.partLoad, label: 'Part load removals', why: 'The next size up.' },
    { href: R.biosecurity, label: 'What you cannot pack', why: 'The biosecurity rules apply to boxes too.' }
  ]
};

/* ------------------------------------------------------------------ */

export const ukCost = {
  path: U.cost,
  market: 'uk',
  hreflangGroup: 'cost',
  template: 'guide',
  title: 'Cost of Moving to New Zealand from the UK | Removals Costs',
  h1: 'What it costs to move to New Zealand from the UK',
  lede:
    'How UK to New Zealand removal prices are built, what each size of move involves, and where the difference between a cheap quote and a complete one usually hides.',
  description:
    'Removals to New Zealand costs from the UK: how quotes are built from volume, part load against container, and the NZ charges commonly left out.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: U.cost, label: 'Cost of moving to New Zealand' }),
  service: {
    name: 'UK to New Zealand removals quotation and cost planning',
    type: 'International removals pricing',
    description: 'Cost structure and planning ranges for removals from the United Kingdom to New Zealand.',
    areaServed: UK_AREAS
  },
  sections: [
    'How a UK to New Zealand quote is built',
    'Work out your volume first',
    'What each size of move involves',
    'Part load or your own container',
    'Seven ways to spend less'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Every UK to New Zealand removal quote is built from one number: the volume of your shipment in cubic metres. Packing labour, the freight and the New Zealand handling all scale from it. So the most useful first step is not to ask what a move costs but to work out how much you are shipping.',
        '**We do not publish rates.** Freight between Europe and New Zealand moves with fuel, season and shipping-line capacity, and any figure printed here would be wrong within weeks. What we publish instead is the structure of the cost, so you can budget and compare quotes properly.'
      ]
    },
    { type: 'h2', text: 'How a UK to New Zealand quote is built' },
    {
      type: 'table',
      caption: 'The four parts of a UK–New Zealand removal quote and what drives each.',
      head: ['Part', 'What it covers', 'What drives the cost'],
      rows: [
        ['UK origin', 'Survey, packing materials and labour, collection, export paperwork, haulage to the port', 'Volume, access at your home, distance from the port'],
        ['Freight', 'The sea or air movement', 'Volume, part load or container, sailing and season'],
        ['New Zealand destination', 'Port and depot handling, devanning, customs entry, MPI, delivery, unpacking', 'Volume, destination city, access, whether MPI inspects'],
        ['Variables', 'Insurance, storage, crating, long carries, duty or GST', 'Your circumstances — which is why the survey matters']
      ]
    },
    { type: 'h2', text: 'Work out your volume first' },
    {
      type: 'p',
      text: 'The [volume calculator](/tools/moving-volume-calculator/) is a full survey inventory — around 190 items, room by room, each with the packed volume and packing method. Count what you are shipping and it gives you the cubic-metre figure the rest of this page depends on.'
    },
    { type: 'h2', text: 'What each size of move involves' },
    {
      type: 'table',
      caption: 'How shipment size maps to service and timeline on the UK–New Zealand lane. Planning figures.',
      head: ['Volume', 'Typical UK home', 'How it ships', 'Door to door', 'Cost profile'],
      rows: [
        ['Under 2 m³', 'Boxes and suitcases', '[Excess baggage](/uk/services/excess-baggage-to-new-zealand/)', '10–16 weeks sea; 1–3 air', 'Dominated by minimum charges'],
        ['2–10 m³', 'Studio or one-bedroom flat', '[Part load](/uk/services/part-load-removals-to-new-zealand/)', '12–16 weeks', 'Fixed NZ charges weigh heavily per m³'],
        ['10–20 m³', 'Two-bedroom home', 'Part load', '12–16 weeks', 'The most common UK band'],
        ['20–33 m³', 'Three-bedroom house', 'Part load or [20ft container](/uk/services/container-shipping-to-new-zealand/)', '10–16 weeks', 'Price both; the crossover is here'],
        ['33–67 m³', 'Four to five-bedroom house', '40ft container', '10–13 weeks', 'Lowest cost per m³, and fastest']
      ]
    },
    { type: 'h2', text: 'Part load or your own container' },
    {
      type: 'p',
      text: 'With a part load you pay for your cubic metres; with a container you pay for the box, whether it is full or not. Somewhere between 20 and 30 m³ the two meet. The container is also faster, because there is no consolidation wait, and it is loaded once at your door and opened once in New Zealand. If you are near the crossover, ask for both prices.'
    },
    {
      type: 'p',
      text: 'Before you sign anything, run the quotes through our [guide to comparing removal quotes](/guides/comparing-international-removal-quotes/). New Zealand destination charges and MPI inspection are the two things most often missing from a low UK quote.'
    },
    { type: 'h2', text: 'Seven ways to spend less' },
    {
      type: 'ol',
      items: [
        '**Ship less.** Sell large appliances and flat-pack furniture in the UK.',
        '**Clean the garden gear properly — or sell it.** An MPI treatment fee can cost more than the mower is worth.',
        '**Be flexible on the packing date**, so a part load catches the next container.',
        '**Pack books, linen and clothes yourself**, and leave the fragile items to the crew.',
        '**Choose storage-in-transit over a rushed delivery** if you have no address yet.',
        '**Avoid peak season.** Summer and the run-up to the NZ school year are busiest.',
        '**Get two or three surveyed quotes**, and compare them line by line.'
      ]
    }
  ],
  faqs: [
    { q: 'Why will you not tell me a price?', a: 'Because a price without a volume is a guess, and a guess on a twelve-thousand-mile move is always revised upwards. Send us a volume from the calculator, or book a survey, and you get a written figure.' },
    { q: 'Is it cheaper to move to Auckland than Christchurch?', a: 'Often slightly, because more sailings call in the North Island. A direct sailing to Lyttelton narrows the gap.' },
    { q: 'Are removals to New Zealand cheaper in winter?', a: 'The UK autumn and winter can be quieter for packing crews, but freight rates depend on global shipping more than on season. Flexibility on dates usually saves more than any particular month.' }
  ],
  next: [
    { href: R.calculator, label: 'Work out your shipment volume', why: 'The figure every quote depends on.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'The charges most often left out.' },
    { href: U.times, label: 'How long shipping from the UK takes', why: 'The other half of the part-load decision.' }
  ]
};

export const ukTimes = {
  path: U.times,
  market: 'uk',
  hreflangGroup: 'times',
  template: 'guide',
  title: 'How Long Does Shipping from the UK to New Zealand Take?',
  h1: 'How long shipping from the UK to New Zealand takes',
  lede:
    'Ten to sixteen weeks door to door by sea, one to three by air — and where every one of those weeks goes, including the stages you can shorten.',
  description:
    'UK to New Zealand shipping times stage by stage: packing, consolidation, the six-to-eight-week voyage, customs and MPI clearance, and delivery.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: U.times, label: 'Shipping times' }),
  sections: ['The honest answer', 'Where the weeks actually go', 'The route your container takes', 'The stages you can influence', 'Planning around your flight'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'By sea, allow ten to sixteen weeks from the day your home is packed in the UK to the day your goods are delivered in New Zealand. By air, one to three weeks. The sailing itself is typically six to eight weeks — this is one of the longest removal routes in the world — and the rest is consolidation, clearance and delivery.'
      ]
    },
    { type: 'h2', text: 'The honest answer' },
    {
      type: 'p',
      text: 'When a mover says "eight weeks", ask whether that is port to port or door to door. Port to port is the voyage. Door to door adds the wait for a shared container to fill in the UK, the unloading in New Zealand, NZ Customs and MPI clearance, and the delivery. That difference is often a month.'
    },
    { type: 'h2', text: 'Where the weeks actually go' },
    { type: 'journey', market: 'uk', heading: 'UK to New Zealand, door to door', intro: 'Proportions of a typical part load, using the midpoint of each planning range.' },
    { type: 'h2', text: 'The route your container takes' },
    {
      type: 'p',
      text: 'Most UK sailings to New Zealand leave from Southampton, Felixstowe or London Gateway, with some services from Liverpool. Very few go direct: containers usually tranship in Asia — Singapore, Tanjung Pelepas or a Chinese hub — or travel via the Panama Canal on some services, before a final leg to Auckland, Tauranga, Wellington, Lyttelton or Port Chalmers. Transhipment is normal and is built into the planning ranges here; it is also why schedules can slip by a week without anyone having done anything wrong.'
    },
    { type: 'h2', text: 'The stages you can influence' },
    {
      type: 'ul',
      items: [
        '**Consolidation.** Flexible packing dates let a part load catch the next container rather than wait for the one after. Your own container skips this stage.',
        '**Clearance.** Having your passport arrival details and documents to your mover as soon as you land, and clean outdoor items, keeps NZ Customs and MPI to days rather than weeks.',
        '**Delivery.** Having an address — or having storage already booked — means your goods do not sit at a depot waiting for a decision.'
      ]
    },
    { type: 'h2', text: 'Planning around your flight' },
    {
      type: 'p',
      text: 'Most families are packed a week or two before they fly and live in furnished accommodation for their first two or three months in New Zealand. A small [air consignment](/guides/sea-vs-air-freight-to-new-zealand/) of essentials, sent a week before you fly, is waiting when you land.'
    }
  ],
  faqs: [
    { q: 'What is the fastest way to ship household goods from the UK to New Zealand?', a: 'Your own container, sailing on a date you choose: typically ten to thirteen weeks door to door. For a few boxes, air freight at one to three weeks.' },
    { q: 'Can shipping to New Zealand be delayed?', a: 'Yes — port congestion, transhipment connections and weather all move schedules. A realistic plan includes a week or two of slack.' }
  ],
  next: [
    { href: U.cost, label: 'What a UK to New Zealand move costs', why: 'Speed and price are linked.' },
    { href: U.container, label: 'Your own container', why: 'The fastest sea option.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'Working back from your flight.' }
  ]
};

export const ukCollection = {
  path: U.collection,
  market: 'uk',
  template: 'guide',
  title: 'UK Collection Areas for Removals to New Zealand',
  h1: 'Where we collect from in the UK',
  lede:
    'We collect from anywhere in mainland Britain, with Northern Ireland on request. Here is what your location actually changes about dates and cost.',
  description:
    'UK collection for removals to New Zealand: nationwide coverage, how consolidation works outside the South East, and what your location changes.',
  published: PUB,
  updated: PUB,
  crumbs: c({ href: U.collection, label: 'UK collection areas' }),
  service: {
    name: 'UK collection for removals to New Zealand',
    type: 'Removals collection',
    description: 'Collection of household goods from addresses throughout the United Kingdom for shipment to New Zealand.',
    areaServed: ['United Kingdom']
  },
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'We collect from anywhere in England, Scotland and Wales, and from Northern Ireland on request. Where you live does not decide whether we can move you; it affects the collection date and, a little, the cost.',
        '**Rather than a page for every town, here is the actual rule:** the further you are from the South East container ports, the more your packing date is scheduled around consolidation runs rather than your preference. Everything else — packing, freight, New Zealand clearance — is identical.'
      ]
    },
    { type: 'h2', text: 'What your location changes' },
    {
      type: 'table',
      caption: 'How UK location affects a move to New Zealand.',
      head: ['Region', 'Collection', 'Effect on dates', 'Effect on cost'],
      rows: [
        ['London and the South East', 'Widest choice of dates', 'Closest to Southampton, Felixstowe and London Gateway', 'Smallest haulage element'],
        ['Midlands, East and South West', 'Regular', 'Good flexibility', 'Modest haulage element'],
        ['North of England and Wales', 'Regular', 'Dates scheduled around consolidation runs', 'Haulage to the port'],
        ['Scotland', 'Regular', 'Scheduled runs; allow more notice for Highlands and Islands', 'Longer haulage; islands priced separately'],
        ['Northern Ireland', 'On request', 'Via a ferry crossing', 'Ferry and haulage added']
      ]
    },
    { type: 'h2', text: 'Part loads outside the South East' },
    {
      type: 'p',
      text: 'For a part load, your goods are collected and taken to a depot, where they wait with other shipments before being loaded into a New Zealand container at the port. From the North or Scotland that run happens on set dates, so booking early gives you the most choice. For your own container, the container comes to you, wherever you are.'
    },
    { type: 'h2', text: 'Access at the UK end' },
    {
      type: 'p',
      text: 'Terraced streets, flats without lifts and town-centre parking restrictions all affect the collection day. We check them at survey, and arrange parking suspensions where a council requires them.'
    }
  ],
  faqs: [
    { q: 'Do you collect from the Scottish islands?', a: 'Yes, with a ferry leg priced into the quote. Allow extra notice.' },
    { q: 'Can you collect from two UK addresses?', a: 'Yes — for example a house and a storage unit, or a parent\'s home. Tell us at survey.' }
  ],
  next: [
    { href: U.home, label: 'Removals to New Zealand from the UK', why: 'The overview of the UK service.' },
    { href: U.times, label: 'How long it takes', why: 'Consolidation is part of the timeline.' },
    { href: U.partLoad, label: 'Part load removals', why: 'How most smaller UK moves travel.' }
  ]
};
