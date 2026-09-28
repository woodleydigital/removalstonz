/**
 * SINGLE SOURCE OF TRUTH FOR ENTITY DATA
 * ======================================
 * Playbook rule 06 (entity consistency) and 4.7 (entity + structured-data system).
 *
 * Every fact in this file must be traceable to a primary source. Where a value is
 * awaiting client confirmation it is listed in docs/CONTENT-VERIFICATION.md.
 * Nothing in this file may be invented.
 *
 * OPERATOR STATUS: the company that will carry out Removals to NZ moves has not
 * been confirmed yet. Until it is, `OPERATOR.confirmed` is false and:
 *   - no MovingCompany node is emitted in JSON-LD (schema.js),
 *   - no founding year, office, accreditation or network claim appears anywhere,
 *   - bylines and Article authorship name the Removals to NZ brand itself.
 * Fill in OPERATOR, set `confirmed: true`, and the build starts declaring the
 * parent/subsidiary relationship in both directions, as removalstochina.com does.
 */

/**
 * Canonical origin. Serve the apex and redirect www -> apex, so every
 * canonical, hreflang, og:url, sitemap entry and JSON-LD @id is a direct hit
 * rather than a redirect hop. If the host ever becomes www-primary, change it
 * here only.
 */
export const SITE_URL = 'https://removalstonz.com';

/** Brand palette: NZ pounamu (greenstone) teal on near-black. See main.css. */
export const BRAND = {
  brand: '#12A58A',
  brandDeep: '#0E7C66', // 5.1:1 on white
  brandDarker: '#0A5F4F', // 7.6:1 on white
  accent: '#7FD6C2',
  ink: '#111517'
};

/**
 * The operating company — PENDING (docs/CONTENT-VERIFICATION.md, V-01).
 * Leave every field null until supplied in writing. Nothing here renders while
 * `confirmed` is false.
 */
export const OPERATOR = {
  confirmed: false,
  id: `${SITE_URL}/#operator`,
  legalName: null,
  name: null,
  url: null,
  email: null,
  foundingDate: null,
  companyNumber: null,
  registeredAddress: null,
  sameAs: [],
  knowsAbout: [],
  description: null,
  accreditations: []
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
  legalNote: 'Removals to NZ arranges door-to-door international removals to New Zealand.',
  url: SITE_URL,
  logo: '/img/removals-to-nz-logo.svg', // logical path; resolved to its hashed URL at build
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
