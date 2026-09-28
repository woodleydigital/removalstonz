/**
 * SINGLE SOURCE OF TRUTH FOR ENTITY DATA
 * ======================================
 * Playbook rule 06 (entity consistency) and 4.7 (entity + structured-data system).
 *
 * Every fact in this file must be traceable to a primary source. Where a value is
 * awaiting client confirmation it is listed in docs/CONTENT-VERIFICATION.md.
 * Nothing in this file may be invented.
 *
 * OPERATOR: Removals to NZ is a division of International Moving Company
 * (IMC), internationalmoving.company. Only what IMC itself publishes is stated
 * here — its name, short name, URL and description, and the @id its own JSON-LD
 * uses, so both sites describe one organisation. Its registered legal name,
 * company number and address are not published there and remain V-01.
 */

/**
 * Canonical origin. Serve the apex and redirect www -> apex, so every
 * canonical, hreflang, og:url, sitemap entry and JSON-LD @id is a direct hit
 * rather than a redirect hop. If the host ever becomes www-primary, change it
 * here only.
 */
export const SITE_URL = 'https://removalstonz.com';

/** IMC colour roles (internationalmoving.company/brand/). See docs/BRAND.md. */
export const BRAND = {
  ink: '#142D3B',
  accent: '#167D8D',
  actionHover: '#116A78',
  paper: '#F6F3ED',
  muted: '#526572',
  lightAccent: '#A7D2CE'
};

/** The parent company. Everything here is as published on internationalmoving.company. */
export const OPERATOR = {
  confirmed: true,
  // IMC's own JSON-LD @id, so this site's graph points at the same entity.
  id: 'https://internationalmoving.company/#organization',
  name: 'International Moving Company',
  shortName: 'IMC',
  url: 'https://internationalmoving.company/',
  description:
    'International relocation management company focused on worldwide door-to-door household removals.',
  // Not published by IMC — supply before launch (V-01). Rendered only when set.
  legalName: null,
  companyNumber: null,
  registeredAddress: null,
  sameAs: []
};

/**
 * Affiliations, as published by the operating company. Empty until the
 * operator is confirmed — do not carry over removalstochina.com's networks.
 */
export const AFFILIATIONS = {
  intro: '',
  members: []
};

export const BRAND_ENTITY = {
  id: `${SITE_URL}/#organisation`,
  name: 'Removals to NZ',
  byline: 'the Removals to NZ team',
  endorsement: 'by International Moving Company',
  legalNote: 'Removals to NZ is the New Zealand removals division of International Moving Company (IMC).',
  url: SITE_URL,
  logo: '/img/rtnz-mark.svg', // logical path; resolved to its hashed URL at build
  description:
    'Door-to-door international removals, part loads and container shipping to New Zealand from the United Kingdom, the United States, Australia, Canada and Europe.',
  areaServedFrom: ['United Kingdom', 'United States', 'Australia', 'Canada', 'Europe'],
  areaServedTo: ['New Zealand']
};

/**
 * Offices. None are published until the operator is confirmed (V-01).
 * Shape: { key, role, city, country, countryCode, phone, source }
 */
export const OFFICES = [];

/**
 * Enquiry contact. The address is on the site's own domain and must be live
 * before launch (V-02). Phone numbers are per market and null until supplied —
 * header and footer render email-only while they are null. Do not invent them.
 */
export const CONTACT = {
  email: 'enquiries@removalstonz.com',
  phones: { uk: null, us: null, au: null, ca: null, europe: null },
  responseCommitment: 'We reply to written quote requests within one working day.'
};

export const FACT_CONFIDENCE = ['sourced', 'planning'];

export const REVIEW_INTERVALS = {
  price: 90, // days — freight rates move constantly
  regulation: 180, // customs and biosecurity framework
  transit: 90, // schedules
  evergreen: 365
};
