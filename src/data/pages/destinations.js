/**
 * SHARED — New Zealand destination pages.
 *
 * These belong to no market: the New Zealand end of a move is the same
 * whichever country it starts in, so each city is written once and linked from
 * every market. No hreflang — there is no equivalent page to point at.
 *
 * Each page carries city-specific routing (which port, which inland leg),
 * delivery constraints and local realities rather than a swapped city name.
 * Nothing here claims a local office: the operator is not yet confirmed
 * (docs/CONTENT-VERIFICATION.md, V-01). Pages exist only for cities with a
 * genuinely different delivery story; smaller towns are covered on the hub.
 */

import { R } from '../routes.js';

const c = (...items) => [{ href: R.global, label: 'Home' }, ...items];
const DEST = { href: R.destinations, label: 'Destinations' };
const dc = (item) => c(DEST, item);

const PUB = '2026-09-28';

const next = (...extra) => [
  ...extra,
  { href: R.biosecurity, label: 'What you cannot bring into New Zealand', why: 'MPI biosecurity applies at every port, and it is the most common cause of delay.' },
  { href: R.calculator, label: 'Work out your shipment volume', why: 'The number every quote is built from.' }
];

export const destinationsHub = {
  path: R.destinations,
  template: 'hub',
  title: 'Removals to Auckland, Wellington, Christchurch and Across NZ',
  h1: 'Where in New Zealand we deliver',
  lede:
    'Everywhere in New Zealand, North Island and South. What changes between destinations is the arrival port, the inland leg and the access at your door — not the customs or biosecurity process.',
  description:
    'International removals to Auckland, Wellington, Christchurch, Tauranga, Hamilton, Queenstown and across New Zealand: arrival ports and delivery by city.',
  published: PUB,
  updated: PUB,
  crumbs: c(DEST),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'International removals to New Zealand arrive at one of a handful of container ports: Auckland and Tauranga for most of the North Island, Wellington (CentrePort) for the lower North Island, and Lyttelton and Port Chalmers for the South Island. From the port, your goods are cleared by NZ Customs and MPI, then delivered by road.',
        'So the destination question is really two questions: which port is closest to you on the sailing your shipment is booked on, and how easy your house is to reach with a removal truck. Hills, steep driveways and apartment lifts matter more in New Zealand than people expect.'
      ]
    },
    {
      type: 'cards',
      heading: 'Destination cities',
      cols: 3,
      items: [
        { href: R.auckland, title: 'Removals to Auckland', body: 'New Zealand\'s largest city and main arrival point, with its own port and cargo railed from Tauranga.', cta: 'Moving to Auckland' },
        { href: R.wellington, title: 'Removals to Wellington', body: 'CentrePort on the doorstep, but some of the steepest residential access in the country.', cta: 'Moving to Wellington' },
        { href: R.christchurch, title: 'Removals to Christchurch', body: 'Lyttelton through the road tunnel, then a flat city with good truck access.', cta: 'Moving to Christchurch' },
        { href: R.tauranga, title: 'Removals to Tauranga', body: 'New Zealand\'s busiest container port, and a fast-growing Bay of Plenty city.', cta: 'Moving to Tauranga' },
        { href: R.hamilton, title: 'Removals to Hamilton', body: 'An inland city between the two big North Island ports.', cta: 'Moving to Hamilton' },
        { href: R.queenstown, title: 'Removals to Queenstown', body: 'Central Otago delivery by road from the South Island ports, with alpine access to plan for.', cta: 'Moving to Queenstown' }
      ]
    },
    { type: 'h2', text: 'Moving somewhere else in New Zealand?' },
    {
      type: 'p',
      text: 'Dunedin, Nelson, Napier and Hastings, New Plymouth, Palmerston North, Rotorua, Whangārei, Invercargill and rural addresses are all regular destinations. Each is delivered by road from the nearest suitable port, which changes the delivery date rather than the process. We have not built a page for each because there is nothing town-specific we could honestly add — [ask us](/get-a-quote/) and we will give you the routing for your actual address.'
    },
    { type: 'h2', text: 'What the destination changes about your quote' },
    {
      type: 'table',
      caption: 'What varies between New Zealand destinations, and what does not.',
      head: ['Factor', 'Varies by city?', 'Why'],
      rows: [
        ['Arrival port', 'Yes', 'Auckland, Tauranga, Wellington, Lyttelton or Port Chalmers, depending on the sailing'],
        ['Inland delivery', 'Significantly', 'A Queenstown or rural delivery is a long road leg from any port'],
        ['Customs process', 'No', 'NZ Customs applies the same rules at every port'],
        ['Biosecurity inspection', 'No', 'MPI rules are national; inspection depends on your goods, not your city'],
        ['Access at the door', 'By house, not by city', 'Steep sections, long driveways and apartment lifts drive delivery cost'],
        ['Storage on arrival', 'Somewhat', 'Most useful in Auckland and Queenstown, where finding a rental can take time']
      ]
    },
    { type: 'h2', text: 'Access: the delivery question to answer early' },
    {
      type: 'p',
      text: 'New Zealand houses are often on sloping sections, down long shared driveways, or up steps from the road. A 40ft container cannot be parked outside most suburban homes, and many deliveries transfer to a smaller truck at a depot. Tell us about the property when you know it — or tell us you are going into temporary accommodation first, which is common, and we will quote storage-in-transit instead.'
    }
  ],
  faqs: [
    { q: 'Can I change the delivery address after the goods have left?', a: 'Usually, yes, within New Zealand — the shipment is cleared at the port and delivered by road, so a new address changes the delivery leg rather than the whole move. Tell us as early as you can.' },
    { q: 'Can my shipment arrive in Auckland if I am moving to the South Island?', a: 'It can, but it is rarely cheaper. Sailings that call at Lyttelton or Port Chalmers avoid a long domestic leg, including the Cook Strait crossing.' },
    { q: 'Do you deliver to rural addresses and islands?', a: 'Yes, including Waiheke and the Marlborough Sounds, with the extra transport priced into the quote after we know the address.' }
  ],
  next: next({ href: R.customs, label: 'New Zealand customs rules for personal effects', why: 'The same at every port.' })
};

export const auckland = {
  path: R.auckland,
  template: 'destination',
  title: 'International Removals to Auckland | Moving to Auckland, NZ',
  h1: 'International removals to Auckland',
  lede:
    'Most people moving to New Zealand move to Auckland, and most shipments arrive there — either at the Ports of Auckland or at Tauranga and then by rail. Here is how delivery in the city actually works.',
  description:
    'Removals to Auckland from overseas: arrival via Ports of Auckland or Tauranga, delivery across the isthmus, apartment and villa access, and storage on arrival.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.auckland, label: 'Auckland' }),
  service: {
    name: 'International removals to Auckland',
    type: 'International household removals',
    description: 'Door-to-door international removals to addresses across the Auckland region, including customs and MPI clearance.',
    areaServed: ['New Zealand']
  },
  sections: ['How shipments reach Auckland', 'Delivery across the region', 'Access at your door', 'Storage while you find a home'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Your shipment will arrive either at the Ports of Auckland on the city waterfront or at Tauranga, two hundred kilometres south-east, and travel on to Auckland by rail or road. Which one depends on the shipping line, not on you, and it changes the arrival date by days rather than weeks.',
        'Once cleared, delivery is by truck across the region — from the North Shore and Hibiscus Coast to Manukau, Papakura and the western suburbs. The bigger variables are traffic, the property, and whether you have somewhere to live yet.'
      ]
    },
    { type: 'h2', text: 'How shipments reach Auckland' },
    {
      type: 'p',
      text: 'Shared-container (groupage) shipments are unpacked at a depot, where your goods are separated from everyone else\'s, presented to NZ Customs and MPI, and then loaded onto a removal truck. A full container of your own can go direct to your door if the street allows it, or be unloaded at the depot and delivered in a smaller truck if it does not.'
    },
    { type: 'h2', text: 'Delivery across the region' },
    {
      type: 'table',
      caption: 'How delivery differs across the Auckland region. Planning guidance only.',
      head: ['Area', 'Typical property', 'What to plan for'],
      rows: [
        ['Central isthmus (Ponsonby, Grey Lynn, Mt Eden, Remuera)', 'Villas and bungalows on narrow streets', 'Tight parking, steps to the front door, sometimes a smaller truck'],
        ['CBD and city fringe', 'Apartments', 'Lift bookings, loading-dock times and building-manager rules'],
        ['North Shore and Hibiscus Coast', 'Family homes, often sloping sections', 'Harbour Bridge traffic windows; steep driveways'],
        ['West and South Auckland', 'Newer subdivisions and larger sections', 'Generally good access; longer drive from the depot'],
        ['Waiheke and Gulf islands', 'Varied', 'A vehicle ferry leg, priced separately']
      ]
    },
    { type: 'h2', text: 'Access at your door' },
    {
      type: 'p',
      text: 'Auckland\'s older suburbs were built before trucks, and a lot of its newer ones were built on hills. The questions we ask at survey are the ones that change the delivery cost: can a truck park outside, how many steps up to the door, is the driveway shared, and for apartments, is there a goods lift and does it need booking. A long carry or a shuttle vehicle is quoted in advance rather than discovered on the day.'
    },
    { type: 'h2', text: 'Storage while you find a home' },
    {
      type: 'p',
      text: 'Many families arrive in Auckland into short-term accommodation and look for a rental or a house to buy afterwards. Rather than time the sailing against a lease you do not have yet, most choose storage-in-transit: the shipment is cleared and held in a secure store and delivered when you have an address. It is cheaper to plan this at the start than to arrange it when the ship is already in.'
    }
  ],
  faqs: [
    { q: 'How long after the ship arrives will my things be delivered in Auckland?', a: 'Typically one to three weeks for a shared container, covering unloading, customs and MPI clearance and booking the delivery. A full container of your own is usually quicker.' },
    { q: 'Will my shipment be inspected by MPI in Auckland?', a: 'Possibly. MPI decides based on the inventory and your goods, not the city. Clean outdoor items and an accurate inventory make inspection quicker if it is called.' }
  ],
  next: next({ href: R.hamilton, label: 'Removals to Hamilton', why: 'If you are looking just south of Auckland.' })
};

export const wellington = {
  path: R.wellington,
  template: 'destination',
  title: 'International Removals to Wellington | Moving to Wellington, NZ',
  h1: 'International removals to Wellington',
  lede:
    'Wellington\'s port is minutes from the city centre. Its houses are another matter: steep streets, steps from the road and narrow access make delivery the part of a Wellington move to plan properly.',
  description:
    'Removals to Wellington from overseas: arrival at CentrePort, delivery to hillside homes and apartments, steep access, and the Hutt Valley and Kāpiti.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.wellington, label: 'Wellington' }),
  service: {
    name: 'International removals to Wellington',
    type: 'International household removals',
    description: 'Door-to-door international removals to Wellington, the Hutt Valley, Porirua and Kāpiti, including customs and MPI clearance.',
    areaServed: ['New Zealand']
  },
  sections: ['How shipments reach Wellington', 'The access question', 'Across the region', 'Timing a Wellington delivery'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Shipments for Wellington arrive either at CentrePort, beside the city centre, or at Auckland or Tauranga and come south by road or rail. Direct calls at Wellington are less frequent than at the northern ports, so the route depends on your sailing.',
        'The harder part of a Wellington move is usually the final few metres. Many houses in Kelburn, Northland, Brooklyn, Khandallah and the eastern suburbs sit above or below the road, reached by steps, a steep path or a private lane. That is the first thing we ask about.'
      ]
    },
    { type: 'h2', text: 'How shipments reach Wellington' },
    {
      type: 'p',
      text: 'On arrival, a shared container is devanned at a depot, your goods are cleared by NZ Customs and MPI, and delivery is booked. If your shipment arrives in the North Island\'s northern ports, add a few days for the trip down State Highway 1 or the rail line.'
    },
    { type: 'h2', text: 'The access question' },
    {
      type: 'p',
      text: 'In Wellington a removal truck often cannot reach the door. Common situations, and what they mean for the quote:'
    },
    {
      type: 'ul',
      items: [
        '**Steps up or down from the road.** Every item is carried, and large pieces may need extra crew. We count steps at survey — really.',
        '**Narrow streets on the hills.** A full-size truck may not get round the bends, so goods transfer to a smaller vehicle.',
        '**No off-street parking.** Some streets need a parking permit or a traffic plan for a removal truck.',
        '**Apartments in Te Aro and the CBD.** Lift bookings and loading-dock rules, as in any city.',
        '**Cable-car and walkway-only homes.** They exist. Tell us, and we will work out how.'
      ]
    },
    { type: 'h2', text: 'Across the region' },
    {
      type: 'p',
      text: 'Lower Hutt, Upper Hutt, Porirua and the Kāpiti Coast are generally flatter with better truck access, and are delivered from the same depot. Wairarapa addresses, over the Remutaka hill, are a longer road leg and are quoted accordingly.'
    },
    { type: 'h2', text: 'Timing a Wellington delivery' },
    {
      type: 'p',
      text: 'Wellington weather is a genuine factor: high winds can stop work on exposed hillside deliveries, especially for large items carried up steps. We plan deliveries with a little slack for it, and we would rather move a delivery by a day than carry a sofa up a hillside in a gale.'
    }
  ],
  faqs: [
    { q: 'Is it more expensive to deliver to a hillside home in Wellington?', a: 'It can be, because it takes more crew and more time. Knowing about steps and access at survey means the cost is in your quote, not added on the day.' },
    { q: 'Can my shipment go straight to Wellington rather than Auckland?', a: 'Where a sailing calls at CentrePort, yes. Otherwise it comes south from Auckland or Tauranga by road or rail, which is included in a door-to-door quote.' }
  ],
  next: next({ href: R.christchurch, label: 'Removals to Christchurch', why: 'The South Island\'s main destination, across Cook Strait.' })
};

export const christchurch = {
  path: R.christchurch,
  template: 'destination',
  title: 'International Removals to Christchurch | Moving to Christchurch',
  h1: 'International removals to Christchurch',
  lede:
    'Christchurch is the South Island\'s main destination. Shipments arrive at Lyttelton, come through the road tunnel, and are delivered across a largely flat city with good access.',
  description:
    'Removals to Christchurch from overseas: arrival at Lyttelton, delivery across Christchurch and Canterbury, and onward delivery to the rest of the South Island.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.christchurch, label: 'Christchurch' }),
  service: {
    name: 'International removals to Christchurch',
    type: 'International household removals',
    description: 'Door-to-door international removals to Christchurch and Canterbury, including customs and MPI clearance at Lyttelton.',
    areaServed: ['New Zealand']
  },
  sections: ['How shipments reach Christchurch', 'Delivery in Christchurch', 'Canterbury and beyond', 'Why the arrival port matters here'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Christchurch is served by Lyttelton, a deep-water port on the other side of the Port Hills, linked to the city by road tunnel. Direct sailings to Lyttelton avoid the long road and ferry journey from the North Island, which is why we book them wherever the schedule allows.',
        'Delivery in the city itself is among the most straightforward in New Zealand: the plains are flat, much of the housing was rebuilt after the earthquakes, and most streets take a removal truck. The hill suburbs are the exception.'
      ]
    },
    { type: 'h2', text: 'How shipments reach Christchurch' },
    {
      type: 'p',
      text: 'Shared-container shipments are devanned at a Christchurch depot, cleared by NZ Customs and MPI, then delivered. If your goods land in the North Island instead, they come south by road and the Cook Strait ferry, or by coastal shipping — a real extra leg that a quote should show separately.'
    },
    { type: 'h2', text: 'Delivery in Christchurch' },
    {
      type: 'ul',
      items: [
        '**The flat suburbs** — Riccarton, Papanui, Fendalton, Burnside, Halswell, the new subdivisions — generally have easy truck access and off-street parking.',
        '**The Port Hills** — Cashmere, Huntsbury, Mount Pleasant, Sumner — have steep driveways and narrow roads, planned for like Wellington.',
        '**Central city apartments** — a newer and growing part of the market, with building rules for lifts and loading.'
      ]
    },
    { type: 'h2', text: 'Canterbury and beyond' },
    {
      type: 'p',
      text: 'Rolleston, Lincoln, Rangiora, Kaiapoi and the Selwyn and Waimakariri districts are delivered from Christchurch in a day. For addresses further afield — Timaru, Ashburton, the West Coast, Nelson and Marlborough — Christchurch is usually the clearance point, with a longer road leg on top.'
    },
    { type: 'h2', text: 'Why the arrival port matters here' },
    {
      type: 'p',
      text: 'On a North Island arrival, a South Island move gains an inter-island leg: road transport to Wellington, the ferry, and the drive south. That adds time and cost and one more handling. When comparing quotes for Christchurch, check which port each one assumes. A quote to Auckland is not a quote to Christchurch.'
    }
  ],
  faqs: [
    { q: 'Do international shipments go directly to Lyttelton?', a: 'Many do, on sailings that call there, typically after a North Island call. Where they do not, your goods are brought south; a door-to-door quote should include that leg.' },
    { q: 'Can you deliver to Christchurch and the West Coast in one move?', a: 'Yes. Split deliveries are common for families with a house and a holiday home or a business; tell us at survey so the inventory is split correctly.' }
  ],
  next: next({ href: R.queenstown, label: 'Removals to Queenstown', why: 'Further south, with a longer road leg.' })
};

export const tauranga = {
  path: R.tauranga,
  template: 'destination',
  title: 'International Removals to Tauranga | Moving to the Bay of Plenty',
  h1: 'International removals to Tauranga',
  lede:
    'Tauranga has New Zealand\'s busiest container port, so a move here often ends only a short drive from where the ship docks.',
  description:
    'Removals to Tauranga and the Bay of Plenty from overseas: arrival at the Port of Tauranga, delivery to Mount Maunganui, Papamoa and the Western Bay.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.tauranga, label: 'Tauranga' }),
  service: {
    name: 'International removals to Tauranga',
    type: 'International household removals',
    description: 'Door-to-door international removals to Tauranga and the Bay of Plenty, including customs and MPI clearance.',
    areaServed: ['New Zealand']
  },
  sections: ['Why Tauranga is well placed', 'Delivery across the Bay of Plenty', 'Coastal homes', 'Moving here to retire'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'The Port of Tauranga at Mount Maunganui handles more containers than any other port in New Zealand, and many international sailings call there first. For a move to Tauranga that means the shortest possible final leg — your goods can be delivered a day or two after clearance.',
        'The Bay of Plenty is one of the fastest-growing parts of the country, popular with families and with people retiring from overseas, and its newer subdivisions generally have good truck access.'
      ]
    },
    { type: 'h2', text: 'Why Tauranga is well placed' },
    {
      type: 'p',
      text: 'Because so much freight arrives here, a Tauranga move rarely waits for an onward domestic leg. A shared container may still be devanned at a depot, but it is a local one. If your shipment arrives in Auckland instead, the road trip south adds a few days and is part of a door-to-door price.'
    },
    { type: 'h2', text: 'Delivery across the Bay of Plenty' },
    {
      type: 'table',
      caption: 'Typical delivery considerations around the Bay of Plenty.',
      head: ['Area', 'What to plan for'],
      rows: [
        ['Mount Maunganui and Papamoa', 'Beachside apartments with lift bookings; busy summer traffic'],
        ['Tauranga city and Otūmoetai', 'Established suburbs, some narrow streets and sloping sections'],
        ['Bethlehem, Pyes Pa and new subdivisions', 'Generally easy access and parking'],
        ['Te Puke, Katikati, Ōmokoroa', 'Rural and lifestyle blocks; long driveways, orchard access'],
        ['Rotorua and Whakatāne', 'A longer road leg, quoted from the port']
      ]
    },
    { type: 'h2', text: 'Coastal homes' },
    {
      type: 'p',
      text: 'Delivery to beachfront and harbour-edge properties is usually straightforward, but summer holiday traffic around the Mount can make delivery windows harder to find between Christmas and late January. If your arrival lands in that period, we plan for it.'
    },
    { type: 'h2', text: 'Moving here to retire' },
    {
      type: 'p',
      text: 'Many moves to Tauranga are downsizing moves — a household from a larger overseas home going into a smaller New Zealand one. The best money you can save is deciding before the survey what will not fit. Shipping a dining table to New Zealand to sell it on arrival is a costly way to own it for three months.'
    }
  ],
  faqs: [
    { q: 'Will my shipment definitely arrive at Tauranga?', a: 'Not definitely — that depends on the shipping line and sailing. Many do; others arrive in Auckland and come south by road. Your quote will say which.' },
    { q: 'Do you deliver to lifestyle blocks and orchards?', a: 'Yes. Long driveways and farm access are fine with notice; we may use a smaller truck.' }
  ],
  next: next({ href: R.auckland, label: 'Removals to Auckland', why: 'The other main North Island arrival point.' })
};

export const hamilton = {
  path: R.hamilton,
  template: 'destination',
  title: 'International Removals to Hamilton | Moving to the Waikato',
  h1: 'International removals to Hamilton',
  lede:
    'Hamilton is inland, roughly between New Zealand\'s two busiest ports, so a move here is always an arrival at the coast plus a short road leg.',
  description:
    'Removals to Hamilton and the Waikato from overseas: arrival at Auckland or Tauranga, delivery across Hamilton, Cambridge, Te Awamutu and rural Waikato.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.hamilton, label: 'Hamilton' }),
  service: {
    name: 'International removals to Hamilton',
    type: 'International household removals',
    description: 'Door-to-door international removals to Hamilton and the Waikato, including customs and MPI clearance.',
    areaServed: ['New Zealand']
  },
  sections: ['Two ports, one short drive', 'Delivery in and around Hamilton', 'Rural Waikato', 'Planning around a new job'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'There is no port in Hamilton, but there are two within easy reach: Auckland to the north and Tauranga to the east. Your shipment arrives at whichever one the sailing calls at, is cleared by NZ Customs and MPI there, and comes to Hamilton by road — usually a couple of hours\' drive.',
        'For most moves that road leg is a small part of the price. What matters more in the Waikato is the property itself, because a lot of people moving here are moving to lifestyle blocks and farms rather than suburban streets.'
      ]
    },
    { type: 'h2', text: 'Two ports, one short drive' },
    {
      type: 'p',
      text: 'The choice of port is the shipping line\'s, not yours, and for Hamilton it barely matters: both are within a few hours. A door-to-door quote includes the road leg; a quote "to Auckland" does not, and is worth questioning.'
    },
    { type: 'h2', text: 'Delivery in and around Hamilton' },
    {
      type: 'p',
      text: 'Hamilton is flat and spread out, and most suburbs — Rototuna, Flagstaff, Hillcrest, Chartwell — have good truck access and off-street parking. Cambridge, Te Awamutu and Huntly are delivered from the same run. The university and hospital bring a steady flow of academic and medical relocations, often with fixed start dates.'
    },
    { type: 'h2', text: 'Rural Waikato' },
    {
      type: 'p',
      text: 'Farm and lifestyle-block deliveries bring their own questions: gravel driveways, gates, bridges with weight limits, and sheds that are hard to reach. Biosecurity matters here too — if you are bringing farm equipment, horse gear or anything that has been on another country\'s land, it will need to be spotless to pass MPI. Read [what you cannot bring](/guides/new-zealand-biosecurity-what-you-cannot-bring/) before you decide to ship it.'
    },
    { type: 'h2', text: 'Planning around a new job' },
    {
      type: 'p',
      text: 'If you are starting work on a set date, a small air-freight consignment of essentials, followed by the main sea shipment, avoids living out of a suitcase for three months. See [sea against air freight](/guides/sea-vs-air-freight-to-new-zealand/).'
    }
  ],
  faqs: [
    { q: 'Is it more expensive to move to Hamilton than to Auckland?', a: 'Slightly, because of the road leg from the port, but the difference is usually small next to the freight itself.' },
    { q: 'Can you deliver farm equipment and machinery?', a: 'Yes, in a container, provided it is cleaned to MPI\'s standard. Machinery that has worked soil is a high biosecurity risk and is inspected closely.' }
  ],
  next: next({ href: R.tauranga, label: 'Removals to Tauranga', why: 'The Bay of Plenty, an hour and a half east.' })
};

export const queenstown = {
  path: R.queenstown,
  template: 'destination',
  title: 'International Removals to Queenstown | Moving to Central Otago',
  h1: 'International removals to Queenstown',
  lede:
    'Queenstown is a long way from any port. A move here is an international shipment into the South Island followed by a mountain road leg, and it is worth planning for both.',
  description:
    'Removals to Queenstown and Central Otago from overseas: arrival via Port Chalmers or Lyttelton, the road leg inland, alpine access and winter deliveries.',
  published: PUB,
  updated: PUB,
  crumbs: dc({ href: R.queenstown, label: 'Queenstown' }),
  service: {
    name: 'International removals to Queenstown',
    type: 'International household removals',
    description: 'Door-to-door international removals to Queenstown, Wānaka and Central Otago, including customs and MPI clearance.',
    areaServed: ['New Zealand']
  },
  sections: ['How shipments reach Queenstown', 'Access on the hillsides', 'Winter deliveries', 'Wānaka, Arrowtown and Central Otago'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Queenstown shipments usually arrive at Port Chalmers near Dunedin or at Lyttelton near Christchurch, are cleared there, and travel inland by road — several hours from either. That road leg is a real part of the cost, and a quote that stops at the port is not a Queenstown quote.',
        'Once here, many homes are on steep sites with views, long private driveways and limited turning space. Both facts make a Queenstown survey more detailed than most.'
      ]
    },
    { type: 'h2', text: 'How shipments reach Queenstown' },
    {
      type: 'p',
      text: 'After clearance, goods are loaded onto a truck suited to the delivery — sometimes a smaller vehicle than the one that would be used in a city — and driven inland. Some movers transfer again at a local depot. Storage-in-transit near Queenstown is useful if you are waiting on a rental, which in this market can take time to find.'
    },
    { type: 'h2', text: 'Access on the hillsides' },
    {
      type: 'ul',
      items: [
        '**Steep and switchback driveways** in Fernhill, Sunshine Bay, Queenstown Hill and Jack\'s Point may not take a full-size truck.',
        '**Gravel roads and lifestyle blocks** around Arrowtown, Dalefield and the Gibbston Valley need dry-weather planning.',
        '**Apartments and holiday-let complexes** often have body-corporate rules on move times.',
        '**Views come with stairs.** Many homes are built into the slope, with living areas above or below the garage.'
      ]
    },
    { type: 'h2', text: 'Winter deliveries' },
    {
      type: 'p',
      text: 'Snow and ice can close alpine roads and make driveways unsafe from June to September. Deliveries in that season are booked with some flexibility, and we may recommend holding goods in store for a few days rather than risking a steep icy approach. If you have a choice, a spring or autumn arrival is simpler.'
    },
    { type: 'h2', text: 'Wānaka, Arrowtown and Central Otago' },
    {
      type: 'p',
      text: 'Wānaka, Cromwell, Alexandra and Arrowtown are delivered on the same inland runs. Dunedin itself, on the coast beside Port Chalmers, is a much shorter final leg and is quoted from the port directly.'
    }
  ],
  faqs: [
    { q: 'Is a move to Queenstown more expensive than to Christchurch?', a: 'Usually yes, because of the road leg inland and the access at many properties. The freight to New Zealand is the same; the last few hundred kilometres are not.' },
    { q: 'Can you store my goods in Queenstown until I find a house?', a: 'Yes. Storage-in-transit is common here, and cheaper to arrange at the start than once the goods are on the road.' }
  ],
  next: next({ href: R.christchurch, label: 'Removals to Christchurch', why: 'Lyttelton is one of the two ports that serve Queenstown.' })
};
