/**
 * The door-to-door journey, as proportions of a typical sea shipment to New
 * Zealand — one timeline per origin market.
 *
 * VISUAL-SEMANTICS NOTE: the most common misunderstanding on every NZ lane is
 * that the sailing *is* the shipping time. It is not. A proportional bar makes
 * that unarguable at a glance, and it is also where the markets differ most:
 * from Australia the sailing is a sliver of the timeline, from the UK it is
 * more than half.
 *
 * `weeks` is the midpoint of each published range, so segment widths are
 * honest. The ranges are what the reader is given in words; midpoints only set
 * the geometry. All ranges are PLANNING figures (docs/CONTENT-VERIFICATION.md,
 * V-06) and are confirmed against current schedules at quotation.
 *
 * Colours are the validated categorical set carried over unchanged from
 * removalstochina.com (dataviz six-checks, light mode, adjacent pairs):
 *   lightness band PASS · chroma floor PASS · CVD separation PASS ΔE 19.6
 *   normal-vision floor PASS ΔE 20.0 · contrast vs surface PASS
 * They are deliberately not recoloured to the brand teal: teal beside the sea
 * blue would weaken the adjacent-pair separation. Every segment is also
 * direct-labelled, so identity never depends on colour alone.
 */

const COLOURS = ['#3C7628', '#0B72AE', '#A55F0C', '#8A47A8'];

const stages = (origin, pack, sea, arrival, clearance) => [
  {
    id: 'origin',
    name: `Packing, collection and consolidation ${origin}`,
    range: pack[0],
    weeks: pack[1],
    colour: COLOURS[0],
    note: pack[2]
  },
  {
    id: 'sea',
    name: 'Sea transit',
    range: sea[0],
    weeks: sea[1],
    colour: COLOURS[1],
    note: sea[2]
  },
  {
    id: 'arrival',
    name: 'Arrival and deconsolidation in New Zealand',
    range: arrival[0],
    weeks: arrival[1],
    colour: COLOURS[2],
    note: arrival[2]
  },
  {
    id: 'clearance',
    name: 'Customs, biosecurity and delivery',
    range: clearance[0],
    weeks: clearance[1],
    colour: COLOURS[3],
    note: clearance[2]
  }
];

const ARRIVAL_NOTE =
  'Unloading the shared container at the New Zealand port. A full container skips this stage entirely.';
const CLEARANCE_NOTE =
  'NZ Customs and Ministry for Primary Industries (MPI) biosecurity both have to release the goods. Clean outdoor items and an accurate inventory keep it short.';

export const JOURNEYS = {
  uk: {
    totalLabel: '10–16 weeks door to door',
    originLabel: 'Collection in the UK',
    stages: stages(
      'in the UK',
      ['1–4 weeks', 2.5, 'Your goods wait for a New Zealand-bound shared container to fill. Flexible packing dates shorten this more than anything else you can do.'],
      ['6–8 weeks', 7, 'One of the longest removal lanes in the world, usually with a transhipment in Asia. Predictable, and the stage you can do least about.'],
      ['1–2 weeks', 1.5, ARRIVAL_NOTE],
      ['1–3 weeks', 2, CLEARANCE_NOTE]
    )
  },
  us: {
    totalLabel: '8–14 weeks door to door',
    originLabel: 'Pickup in the US',
    stages: stages(
      'in the US',
      ['1–4 weeks', 2.5, 'Consolidation for New Zealand runs through a handful of gateway ports, so an inland pickup includes the trucking leg to the coast.'],
      ['3–7 weeks', 5, 'About three to four weeks from the West Coast; nearer six or seven from the Gulf or East Coast.'],
      ['1–2 weeks', 1.5, ARRIVAL_NOTE],
      ['1–3 weeks', 2, CLEARANCE_NOTE]
    )
  },
  au: {
    totalLabel: '4–8 weeks door to door',
    originLabel: 'Pickup in Australia',
    stages: stages(
      'in Australia',
      ['1–3 weeks', 2, 'Trans-Tasman groupage sails often, so consolidation is short — but it still sets your pickup date.'],
      ['1–2 weeks', 1.5, 'The trans-Tasman sailing is the shortest part of the move. It is the paperwork and biosecurity either side that take the time.'],
      ['0.5–1.5 weeks', 1, ARRIVAL_NOTE],
      ['1–2 weeks', 1.5, CLEARANCE_NOTE]
    )
  },
  ca: {
    totalLabel: '8–15 weeks door to door',
    originLabel: 'Pickup in Canada',
    stages: stages(
      'in Canada',
      ['1–4 weeks', 2.5, 'Most New Zealand groupage leaves from Vancouver; eastern pickups either rail west or sail from Montreal or Halifax.'],
      ['3–7 weeks', 5, 'Roughly three to four weeks from Vancouver; six or seven from the East Coast.'],
      ['1–2 weeks', 1.5, ARRIVAL_NOTE],
      ['1–3 weeks', 2, CLEARANCE_NOTE]
    )
  },
  europe: {
    totalLabel: '10–16 weeks door to door',
    originLabel: 'Collection in Europe',
    stages: stages(
      'in Europe',
      ['1–4 weeks', 2.5, 'Collections across Europe feed the Rotterdam, Antwerp and Hamburg groupage services to New Zealand.'],
      ['6–8 weeks', 7, 'Northern European ports to Auckland or Tauranga, typically with a transhipment on the way.'],
      ['1–2 weeks', 1.5, ARRIVAL_NOTE],
      ['1–3 weeks', 2, CLEARANCE_NOTE]
    )
  }
};

/** Share of the typical timeline, computed rather than hard-coded. */
export function journeyShares(market = 'uk') {
  const j = JOURNEYS[market];
  const total = j.stages.reduce((n, s) => n + s.weeks, 0);
  return j.stages.map((s) => ({ ...s, share: (s.weeks / total) * 100, total }));
}
