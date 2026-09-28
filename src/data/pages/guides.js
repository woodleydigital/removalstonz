/**
 * SHARED — the outer, informational section. Written once for every market.
 *
 * High-stakes content policy (docs/CONTENT-VERIFICATION.md, B2): customs and
 * biosecurity material describes the framework and names the responsible
 * authority — the New Zealand Customs Service and the Ministry for Primary
 * Industries. It does not state allowances, thresholds, fees or qualifying
 * periods as fact, because those change and getting them wrong costs a reader
 * real money. Both high-stakes pages carry a visible review date, enforced by
 * audit.mjs.
 */

import { R } from '../routes.js';
import { MARKET_ORDER, MARKETS } from '../markets.js';

const c = (...items) => [{ href: R.global, label: 'Home' }, ...items];
const GUIDES = { href: R.guides, label: 'Guides' };
const gc = (item) => c(GUIDES, item);
const PUB = '2026-09-28';

const CUSTOMS_SRC = { name: 'New Zealand Customs Service', url: 'https://www.customs.govt.nz/' };
const MPI_SRC = { name: 'Ministry for Primary Industries — Biosecurity New Zealand', url: 'https://www.mpi.govt.nz/' };

export const guidesHub = {
  path: R.guides,
  template: 'hub',
  title: 'Guides to Moving to New Zealand | Customs, Biosecurity, Timing',
  h1: 'Guides to moving to New Zealand',
  lede:
    'Five guides to the parts of a move to New Zealand that catch people out, whichever country they are leaving: customs, biosecurity, sea against air, the planning timeline, and how to compare quotes.',
  description:
    'Practical guides to moving to New Zealand: NZ customs rules for personal effects, MPI biosecurity, sea against air freight, a checklist and comparing quotes.',
  published: PUB,
  updated: PUB,
  crumbs: c(GUIDES),
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'If you read only one of these before you book, read the [biosecurity guide](/guides/new-zealand-biosecurity-what-you-cannot-bring/). New Zealand\'s border rules on soil, plants, wood and animal products are stricter than almost anywhere, and they decide what is worth packing at all.',
        'Then read the [customs guide](/guides/new-zealand-customs-personal-effects/), because whether your goods come in free of duty and GST depends on your status and on how long you have owned them — questions to settle before the packers arrive.'
      ]
    },
    {
      type: 'cards',
      heading: 'The guides',
      cols: 2,
      items: [
        { href: R.biosecurity, eyebrow: 'Read this first', title: 'Biosecurity: what you cannot bring', body: 'What MPI looks for in household goods, what needs cleaning, what to leave behind, and what inspection costs.', cta: 'Biosecurity rules' },
        { href: R.customs, eyebrow: 'Before you pack', title: 'NZ customs rules for personal effects', body: 'Who qualifies for the concession, what NZ Customs will ask to see, and the items that need a permit.', cta: 'Customs rules' },
        { href: R.seaVsAir, eyebrow: 'Decision', title: 'Sea against air freight', body: 'Cost, time and what each suits — and the split shipment most families choose.', cta: 'Compare' },
        { href: R.checklist, eyebrow: 'Planning', title: 'Moving to New Zealand checklist', body: 'What to do at six months, three months, one month and the week you go.', cta: 'The checklist' },
        { href: R.compareQuotes, eyebrow: 'Choosing a mover', title: 'How to compare removal quotes', body: 'The charges most often left out of an international quote, and how to line two quotes up fairly.', cta: 'Compare quotes' }
      ]
    },
    { type: 'h2', text: 'Guides for the country you are leaving' },
    {
      type: 'p',
      text: 'Shipping times depend on the origin, so each country has its own: '
        + MARKET_ORDER.map((k) => `[${MARKETS[k].short}](${R[k].times})`).join(', ')
        + '. Each explains where the weeks go on that particular route.'
    },
    { type: 'h2', text: 'What these guides do not cover' },
    {
      type: 'p',
      text: 'We write about moving belongings to New Zealand. We do not give immigration, tax or legal advice. Visa categories, residence applications and tax residence are matters for Immigration New Zealand, Inland Revenue and a qualified adviser — not for a moving company\'s website. Where those topics touch a shipment, and the customs concession very much does, we explain the connection and point you at the authority responsible.'
    }
  ],
  next: [
    { href: R.calculator, label: 'Work out your shipment volume', why: 'The number every quote is built from.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Arrival ports and delivery by city.' },
    { href: R.global, label: 'Choose the country you are moving from', why: 'Costs and quotes for your route.' }
  ]
};

export const customs = {
  path: R.customs,
  template: 'guide',
  title: 'NZ Customs Rules for Personal Effects and Household Goods',
  h1: 'New Zealand customs rules for personal effects',
  lede:
    'How NZ Customs treats household goods shipped to New Zealand: who can bring them in free of duty and GST, what you will be asked for, and the items that need permission first.',
  description:
    'NZ Customs rules for shipping household goods and personal effects to New Zealand: the concession, documents, timing, new goods, vehicles and restricted items.',
  published: PUB,
  updated: PUB,
  crumbs: gc({ href: R.customs, label: 'NZ customs rules' }),
  sections: [
    'Two agencies, one border',
    'The personal effects concession',
    'What you will be asked for',
    'Timing: you, then your goods',
    'New goods, gifts and things bought for the move',
    'Items that need a permit or are restricted',
    'Vehicles',
    'Sources and how we checked this'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Household goods shipped to New Zealand are cleared by the **New Zealand Customs Service** (Te Mana Ārai o Aotearoa), which assesses duty and GST, and by the **Ministry for Primary Industries** (MPI), which decides the biosecurity risk. Both have to release a shipment before it can be delivered.',
        'People arriving to live in New Zealand for the first time, and New Zealanders returning home, can usually bring in personal and household effects without paying duty or GST — provided the goods were theirs and in use before they came, and are for their own use. The detail of who qualifies and on what conditions is set by NZ Customs and changes, so this guide explains the framework and where to check it.'
      ]
    },
    { type: 'h2', text: 'Two agencies, one border' },
    {
      type: 'p',
      text: 'NZ Customs deals with the revenue and the prohibited-goods side: duty, GST, and items such as weapons and objectionable material. MPI deals with biosecurity: soil, plants, wood, food and animal products. Your mover\'s customs broker lodges one set of documents and works with both, but they make separate decisions. Biosecurity has [its own guide](/guides/new-zealand-biosecurity-what-you-cannot-bring/).'
    },
    { type: 'h2', text: 'The personal effects concession' },
    {
      type: 'p',
      text: 'The concession exists for people genuinely relocating. In general terms, NZ Customs looks at three things:'
    },
    {
      type: 'ol',
      items: [
        '**Who you are.** A first-time arrival taking up residence, or a New Zealand citizen or resident returning after living overseas. Visitors and short-term workers are treated differently.',
        '**How long the goods have been yours.** The concession is for effects you owned and used before arriving, not for goods bought to take with you.',
        '**What happens to them next.** Goods admitted under the concession are for your own use; selling or disposing of them within a set period can make duty and GST payable after all.'
      ]
    },
    {
      type: 'note',
      paragraphs: [
        '**Check your own position with NZ Customs before you ship.** Qualifying periods, the treatment of vehicles and the conditions attached to the concession are set by Customs and are not reproduced here, because they change. Their guidance on bringing household goods to New Zealand is the authority.'
      ]
    },
    { type: 'h2', text: 'What you will be asked for' },
    {
      type: 'ul',
      items: [
        '**Your passport**, with evidence of your arrival in New Zealand.',
        '**Evidence of your status** — a residence or work visa, or New Zealand citizenship or residence.',
        '**An unaccompanied baggage declaration**, the Customs form for goods travelling separately from you.',
        '**A detailed inventory** of what is in the shipment. MPI uses this too, so vague entries ("misc. boxes") cause questions.',
        '**The shipping documents** — the bill of lading or air waybill — which your mover supplies.'
      ]
    },
    { type: 'h2', text: 'Timing: you, then your goods' },
    {
      type: 'p',
      text: 'NZ Customs generally expects you to have arrived in New Zealand before your unaccompanied effects are cleared, and asks for evidence of your arrival. If your goods would get there first — likely on the trans-Tasman route, less likely from the UK — the practical answer is to time the sailing later or plan for a short period in storage.'
    },
    { type: 'h2', text: 'New goods, gifts and things bought for the move' },
    {
      type: 'p',
      text: 'New items, especially those still boxed, are the usual trigger for a duty or GST assessment, because they fall outside a concession designed for goods you have used. It is often cheaper to buy large appliances in New Zealand, where they will also suit the local power supply and plugs.'
    },
    { type: 'h2', text: 'Items that need a permit or are restricted' },
    {
      type: 'ul',
      items: [
        '**Firearms and ammunition** — require a permit from New Zealand Police before import.',
        '**Weapons** such as flick knives, knuckledusters and some martial-arts equipment — restricted or prohibited.',
        '**Medicines** — personal quantities of prescription medicine are treated differently from larger amounts; controlled drugs are restricted.',
        '**Alcohol and tobacco** — subject to limits and duty; do not pack them in a household shipment without asking.',
        '**Protected species** — ivory, tortoiseshell, some corals, furs and timbers fall under CITES and need permits.',
        '**Objectionable material** — prohibited.'
      ]
    },
    { type: 'h2', text: 'Vehicles' },
    {
      type: 'p',
      text: 'Cars and motorbikes are cleared by NZ Customs, inspected by MPI (they must be clean, particularly underneath) and then need entry certification and compliance through NZ Transport Agency Waka Kotahi before they can be registered. Whether a vehicle qualifies for a concession depends on your status and how long you have owned and used it. Shipping a car is often, but not always, worth it; ask before you commit.'
    },
    {
      type: 'sources',
      intro: 'This guide describes the general framework. It was checked against the following primary sources on the review date shown, and is reviewed every six months.',
      items: [
        { ...CUSTOMS_SRC, supports: 'duty and GST, the personal effects concession, the unaccompanied baggage declaration, and prohibited and restricted goods.' },
        { ...MPI_SRC, supports: 'biosecurity clearance of household goods and vehicles.' },
        { name: 'NZ Transport Agency Waka Kotahi', url: 'https://www.nzta.govt.nz/', supports: 'entry certification and compliance of imported vehicles.' },
        { name: 'New Zealand Police — Firearms Safety Authority', url: 'https://www.firearmssafetyauthority.govt.nz/', supports: 'permits to import firearms.' }
      ]
    }
  ],
  faqs: [
    { q: 'Do I pay GST on my household goods when I move to New Zealand?', a: 'Usually not, if you are moving to live in New Zealand or returning as a citizen or resident and the goods are your own, used effects. New goods and goods that fall outside the concession can attract GST and duty.' },
    { q: 'Can my shipment arrive in New Zealand before I do?', a: 'It can arrive, but it generally cannot be cleared until you have. Plan the sailing or a short storage period around your own arrival.' },
    { q: 'Who fills in the customs paperwork?', a: 'You sign the declaration; your mover\'s customs broker prepares and lodges the entry, and your inventory supports both the Customs and the MPI decision.' }
  ],
  next: [
    { href: R.biosecurity, label: 'Biosecurity: what you cannot bring', why: 'The other half of New Zealand border clearance.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'When to sort out documents in the run-up to the move.' },
    { href: R.global, label: 'Removals to New Zealand from your country', why: 'Costs and timings for your route.' }
  ]
};

export const biosecurity = {
  path: R.biosecurity,
  template: 'guide',
  title: 'NZ Biosecurity: What You Cannot Bring in a Household Move',
  h1: 'New Zealand biosecurity: what you cannot bring',
  lede:
    'New Zealand checks household goods for soil, seeds, insects, untreated wood and animal products. Here is what MPI looks for, what to clean, what to leave behind — and what happens if something is found.',
  description:
    'MPI biosecurity rules for household goods shipped to New Zealand: outdoor items, wood and wicker, food, animal products, cleaning, inspection and treatment.',
  published: PUB,
  updated: PUB,
  crumbs: gc({ href: R.biosecurity, label: 'Biosecurity' }),
  sections: [
    'Why New Zealand is this strict',
    'The items MPI looks at hardest',
    'Leave these behind',
    'How to clean for biosecurity',
    'What happens at inspection',
    'Sources and how we checked this'
  ],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Biosecurity clearance for household goods is the job of the **Ministry for Primary Industries** (MPI), through Biosecurity New Zealand. MPI assesses every shipment from its inventory and can inspect it, require cleaning or treatment, or refuse items altogether. The costs of inspection and treatment are charged to the owner.',
        'Most household goods pass without difficulty. The problems come from a predictable list: anything with soil on it, outdoor and sports gear, untreated wood and wicker, plant material and animal products. Clean them, list them clearly, or leave them behind.'
      ]
    },
    { type: 'h2', text: 'Why New Zealand is this strict' },
    {
      type: 'p',
      text: 'New Zealand\'s economy depends on agriculture, forestry and horticulture, and its native plants and birds evolved without most of the world\'s pests. A single fruit fly, a snail on a garden chair or a fungus in the soil on a spade can do lasting damage. That is why the rules apply to your belongings with the same seriousness as commercial cargo.'
    },
    { type: 'h2', text: 'The items MPI looks at hardest' },
    {
      type: 'table',
      caption: 'Common household items with a biosecurity risk, and what to do about each.',
      head: ['Item', 'Why it is a risk', 'What to do'],
      rows: [
        ['Garden tools, lawnmowers, wheelbarrows', 'Soil, seeds, plant matter', 'Scrub to bare metal; drain fuel and oil from mowers; or sell before you go'],
        ['Outdoor furniture, barbecues, trampolines', 'Insects, egg masses, snails, spiders', 'Wash, dry and check the undersides and joints'],
        ['Bikes, golf clubs, fishing and camping gear', 'Soil in treads and bags, water in tents', 'Clean tyres and cleats; dry tents fully; empty and wash bags'],
        ['Footwear, especially boots', 'Soil in the tread', 'Scrub the soles; pack separately and list them'],
        ['Wooden items with bark, carvings, untreated timber', 'Wood-boring insects', 'Check for holes and dust; declare them'],
        ['Wicker, cane, rattan, bamboo, straw', 'Insects and fungi', 'Inspect carefully; some items are treated on arrival'],
        ['Vacuum cleaners', 'Soil and seeds in the bag', 'Empty and clean them'],
        ['Used animal equipment — saddles, kennels, cages, aquariums', 'Animal disease, soil', 'Clean thoroughly; declare them'],
        ['Vehicles, trailers and boats', 'Soil underneath, insects inside', 'Professionally clean the underbody, wheel arches and interior']
      ]
    },
    { type: 'h2', text: 'Leave these behind' },
    {
      type: 'ul',
      items: [
        '**Food of any kind**, including spices, tea and anything opened. It is not worth the inspection.',
        '**Plants, cuttings, bulbs and seeds**, including seed packets and potpourri.',
        '**Soil and sand**, including in plant pots and ornaments.',
        '**Honey and used beekeeping equipment.**',
        '**Raw animal products** — untreated skins, feathers, bones, shells.',
        '**Firewood and pine cones.**'
      ]
    },
    { type: 'h2', text: 'How to clean for biosecurity' },
    {
      type: 'p',
      text: 'Clean means no visible soil, plant matter or insects anywhere — including inside wheel rims, under mower decks, in the tread of boots and in the seams of tents. Clean items before the packers arrive, let them dry completely (damp items grow mould on a long sea voyage), and ask the crew to pack outdoor items together so they can be presented easily if MPI asks to see them.'
    },
    {
      type: 'p',
      text: 'Wooden packing crates must meet the international ISPM 15 standard — heat-treated or fumigated and marked. Any competent mover builds crates this way; it is worth checking if you are crating something yourself.'
    },
    { type: 'h2', text: 'What happens at inspection' },
    {
      type: 'p',
      text: 'If MPI calls an inspection, the relevant parts of your shipment are opened, usually at the depot, and examined. Items found with contamination may be cleaned or treated (by heat or fumigation) at your cost, sent back, or destroyed. An inspection also adds time. A clear inventory and clean goods are the only reliable way to keep both the cost and the delay down.'
    },
    {
      type: 'sources',
      intro: 'This guide describes the general framework. It was checked against the following primary sources on the review date shown, and is reviewed every six months.',
      items: [
        { ...MPI_SRC, supports: 'biosecurity requirements for personal effects and household goods, risk items, inspection and treatment.' },
        { ...CUSTOMS_SRC, supports: 'joint border clearance of unaccompanied goods.' },
        { name: 'International Plant Protection Convention — ISPM 15', url: 'https://www.ippc.int/', supports: 'the standard for wood packaging material.' }
      ]
    }
  ],
  faqs: [
    { q: 'Can I bring my garden tools to New Zealand?', a: 'Yes, if they are completely clean — no soil, seeds or plant material. Many people decide cleaning a shed full of tools is not worth it and buy new ones on arrival.' },
    { q: 'Who pays if MPI inspects my shipment?', a: 'The owner. Inspection and any cleaning or treatment are charged to you, which is why many quotes list them as exclusions. Ask how yours handles it.' },
    { q: 'Can I ship outdoor furniture to New Zealand?', a: 'Yes, clean and dry. Wicker and untreated timber pieces are the ones most likely to be inspected or treated.' }
  ],
  next: [
    { href: R.customs, label: 'NZ customs rules for personal effects', why: 'The duty and GST side of the same border.' },
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'When to clean, sell and sort in the run-up to packing day.' },
    { href: R.calculator, label: 'Work out your shipment volume', why: 'Once you know what is going.' }
  ]
};

export const seaVsAir = {
  path: R.seaVsAir,
  template: 'guide',
  title: 'Sea vs Air Freight to New Zealand | Which to Use for Your Move',
  h1: 'Sea against air freight to New Zealand',
  lede:
    'Sea freight is how nearly every household gets to New Zealand. Air freight is how the first few boxes get there while you wait. Here is how to decide what goes which way.',
  description:
    'Sea against air freight for a move to New Zealand: cost, transit time, what each suits, and why most families split their shipment between the two.',
  published: PUB,
  updated: PUB,
  crumbs: gc({ href: R.seaVsAir, label: 'Sea against air' }),
  sections: ['The short answer', 'Side by side', 'The split shipment', 'What should go by air', 'When air makes sense for everything'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'Ship the household by sea and, if you need them quickly, send a small consignment of essentials by air. Air freight to New Zealand costs several times as much per cubic metre as sea, and the gap is largest on the long routes from Europe and North America, where the time saving is also largest.',
        'From Australia the arithmetic is different: sea transit is short enough that many families send everything by sea and simply pack a bigger suitcase.'
      ]
    },
    { type: 'h2', text: 'The short answer' },
    {
      type: 'p',
      text: 'Sea for furniture, books, kitchenware and anything you can live without for a few months. Air for work equipment, children\'s things, bedding and the clothes for the season you arrive into — remember that New Zealand\'s seasons are the reverse of the Northern Hemisphere\'s.'
    },
    { type: 'h2', text: 'Side by side' },
    {
      type: 'table',
      caption: 'Sea against air freight to New Zealand. Transit times are planning ranges and vary by origin.',
      head: ['', 'Sea freight', 'Air freight'],
      rows: [
        ['Door to door from the UK or Europe', '10–16 weeks', '1–3 weeks'],
        ['Door to door from North America', '8–15 weeks', '1–3 weeks'],
        ['Door to door from Australia', '4–8 weeks', 'About 1–2 weeks'],
        ['Cost per cubic metre', 'Lowest, especially in a full container', 'Several times higher; charged on volume or weight, whichever is greater'],
        ['Best for', 'Furniture and most of a household', 'A few boxes of essentials'],
        ['Customs and MPI', 'The same process', 'The same process']
      ]
    },
    { type: 'h2', text: 'The split shipment' },
    {
      type: 'p',
      text: 'Most families moving from the UK, Europe or North America send a small air consignment — often a cubic metre or two — and the rest by sea. It costs more than sending everything by sea, and much less than living in a furnished rental with nothing of your own for three months, or buying things twice.'
    },
    { type: 'h2', text: 'What should go by air' },
    {
      type: 'ul',
      items: [
        'Clothes for the season you arrive into, and for work.',
        'Children\'s school things and a few favourite toys.',
        'A laptop, documents you need to keep with you, and anything you cannot replace.',
        'Bedding and towels, if you are moving into an unfurnished home.',
        'Kitchen basics, if you are not.'
      ]
    },
    {
      type: 'p',
      text: 'Keep passports, visas, certificates and anything valuable in your hand luggage, not in either shipment.'
    },
    { type: 'h2', text: 'When air makes sense for everything' },
    {
      type: 'p',
      text: 'For a single person or a couple with only a few boxes and suitcases, a sea minimum charge can make a very small shipment poor value, and air — or [excess baggage](/uk/services/excess-baggage-to-new-zealand/) — may come out closer than you would expect. Ask for both prices.'
    }
  ],
  faqs: [
    { q: 'Is air freight to New Zealand charged by weight or volume?', a: 'By whichever is greater once volume is converted to a chargeable weight. Bulky, light items like bedding cost more by air than their weight suggests.' },
    { q: 'Do air shipments go through MPI too?', a: 'Yes. The same customs and biosecurity rules apply, and an air shipment with a pair of muddy boots in it waits just as long.' }
  ],
  next: [
    { href: R.checklist, label: 'Moving to New Zealand checklist', why: 'When to book each shipment.' },
    { href: R.calculator, label: 'Work out your shipment volume', why: 'Split it into the air part and the sea part.' },
    { href: R.compareQuotes, label: 'How to compare removal quotes', why: 'Check what each price actually includes.' }
  ]
};

export const checklist = {
  path: R.checklist,
  template: 'guide',
  title: 'Moving to New Zealand Checklist | 6 Months to Arrival',
  h1: 'Moving to New Zealand checklist',
  lede:
    'What to do, and when, for an international move to New Zealand — from six months out to the week after you land.',
  description:
    'A moving to New Zealand checklist from six months out to arrival: visas, quotes, biosecurity cleaning, customs documents, packing and delivery.',
  published: PUB,
  updated: PUB,
  crumbs: gc({ href: R.checklist, label: 'Checklist' }),
  sections: ['Six months before', 'Three months before', 'One month before', 'The week of the move', 'After you arrive'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'The long lead times on a move to New Zealand come from two places: the sea voyage (from the UK or Europe, well over two months) and the paperwork on both sides. Start with your visa and your volume, book the move around your own arrival date, and leave a clear month before packing day to sort, sell and clean.'
      ]
    },
    { type: 'h2', text: 'Six months before' },
    {
      type: 'ul',
      items: [
        'Confirm your visa or residence pathway with Immigration New Zealand. Your status affects the customs concession on your goods.',
        'Decide broadly what is coming. Long-haul freight is priced by volume, and New Zealand rentals are often furnished.',
        'Use the [volume calculator](/tools/moving-volume-calculator/) for a first estimate.',
        'Ask two or three movers for surveys. Compare them with [our quote checklist](/guides/comparing-international-removal-quotes/).'
      ]
    },
    { type: 'h2', text: 'Three months before' },
    {
      type: 'ul',
      items: [
        'Book the move. From the UK, Europe or North America, the packing date is often ten to twelve weeks before you want your goods.',
        'Decide on air freight for essentials — see [sea against air](/guides/sea-vs-air-freight-to-new-zealand/).',
        'Get vet advice early if you are relocating pets; MPI import requirements for animals take months and are handled by specialist pet shippers.',
        'Check whether a vehicle is worth shipping, including NZ compliance costs.'
      ]
    },
    { type: 'h2', text: 'One month before' },
    {
      type: 'ul',
      items: [
        'Clean everything that has been outdoors: tools, bikes, boots, camping and sports gear, outdoor furniture. Let it dry. See the [biosecurity guide](/guides/new-zealand-biosecurity-what-you-cannot-bring/).',
        'Use up or give away food, plants and garden chemicals — none of it should be packed.',
        'Gather documents: passport, visa, proof of address history, and anything showing how long you have owned high-value items.',
        'Sell or donate what is not coming. It is cheaper than shipping it to sell in New Zealand.'
      ]
    },
    { type: 'h2', text: 'The week of the move' },
    {
      type: 'ul',
      items: [
        'Set aside what travels with you — passports, documents, medicines, valuables — somewhere the packers will not touch.',
        'Walk the house with the crew leader and check the inventory before you sign it. NZ Customs and MPI both work from it.',
        'Keep a copy of the inventory and the shipping documents with you.'
      ]
    },
    { type: 'h2', text: 'After you arrive' },
    {
      type: 'ul',
      items: [
        'Send your mover a copy of your passport arrival details as soon as you land; clearance usually waits for it.',
        'Sign the customs declaration and answer any MPI queries promptly.',
        'Confirm the delivery address and access — steps, driveway, parking — or arrange storage until you have a home.'
      ]
    }
  ],
  next: [
    { href: R.customs, label: 'NZ customs rules for personal effects', why: 'The documents on this list, explained.' },
    { href: R.destinations, label: 'Where in New Zealand we deliver', why: 'Arrival ports and delivery by city.' },
    { href: R.global, label: 'Get a quote for your route', why: 'Choose the country you are moving from.' }
  ]
};

export const compareQuotes = {
  path: R.compareQuotes,
  template: 'guide',
  title: 'How to Compare International Removal Quotes to New Zealand',
  h1: 'How to compare international removal quotes',
  lede:
    'Two quotes for a move to New Zealand are only comparable if they measure the same volume, go to the same place and include the same things. This is the checklist to get there.',
  description:
    'How to compare removal quotes for a move to New Zealand: volume, door-to-door scope, and the charges most often missing, from MPI inspection to insurance.',
  published: PUB,
  updated: PUB,
  crumbs: gc({ href: R.compareQuotes, label: 'Comparing quotes' }),
  sections: ['Line up four things first', 'The charges most often left out', 'Red flags', 'Questions to ask in writing'],
  blocks: [
    {
      type: 'answer',
      paragraphs: [
        'A much cheaper quote on a long international lane is almost always a smaller quote: a lower volume estimate, a delivery to the port rather than your door, or New Zealand charges left for you to pay on arrival. The freight itself costs every mover roughly the same.',
        'Line the quotes up on volume and scope first, then go through the list of commonly excluded charges below. The answers usually explain the whole difference.'
      ]
    },
    { type: 'h2', text: 'Line up four things first' },
    {
      type: 'ol',
      items: [
        '**The volume.** If one mover surveyed and another estimated from a phone call, compare both against the [published inventory](/tools/moving-volume-calculator/#volume-assumptions).',
        '**The endpoint.** Door to door, or to a New Zealand port? "To Auckland" can mean either.',
        '**The service level.** Full export packing, or you pack the cartons? Unpacking and reassembly, or delivery to the room?',
        '**The route.** Shared container or your own, and which arrival port. A South Island move landing in Auckland has a long leg still to come.'
      ]
    },
    { type: 'h2', text: 'The charges most often left out' },
    {
      type: 'ol',
      items: [
        '**New Zealand destination charges** — port and depot handling, devanning, delivery. The largest and most common omission.',
        '**Customs clearance and broker fees** in New Zealand.',
        '**MPI inspection and any cleaning or treatment.** Ask whether inspection attendance is included and how treatment is charged.',
        '**Marine transit insurance.** Rarely included as standard; carrier liability is nowhere near replacement value.',
        '**Long carry, stairs and shuttle vehicles** — common at New Zealand hillside homes.',
        '**Crating** for glass, marble, artwork and pianos, built to the ISPM 15 standard.',
        '**Storage**, at either end, and any port charges if goods cannot be cleared on arrival.',
        '**Duty and GST** on items that fall outside the concession — no mover can absorb an assessment.'
      ]
    },
    { type: 'h2', text: 'Red flags' },
    {
      type: 'ul',
      items: [
        'A price given without any survey for more than a few boxes.',
        'No written list of exclusions.',
        'A cubic-metre figure well below every other quote.',
        'Pressure to pay the full amount long before collection.'
      ]
    },
    { type: 'h2', text: 'Questions to ask in writing' },
    {
      type: 'p',
      text: 'Is this door to door? Which New Zealand port and depot? What volume is it based on? Which of the eight charges above are included? What happens to the price if MPI inspects? Get the answers in an email, not a phone call.'
    }
  ],
  next: [
    { href: R.uk.cost, label: 'What a move from the UK costs', why: 'Planning ranges for the UK lane.' },
    { href: R.us.cost, label: 'What a move from the USA costs', why: 'Planning ranges for North America.' },
    { href: R.biosecurity, label: 'Biosecurity: what you cannot bring', why: 'The source of the most common surprise charge.' }
  ]
};
