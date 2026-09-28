/**
 * JSON-LD generation.
 *
 * Playbook rule 07: emit structured data ONLY for entities and properties that
 * are represented in the visible content of the same page. Nothing here invents
 * ratings, reviews, prices, authorship or credentials. Every value is read from
 * src/data/site.js (the entity source of truth) or from the page's own visible
 * fields, so schema and copy cannot drift apart.
 */

import { SITE_URL, OPERATOR, BRAND_ENTITY, CONTACT, AFFILIATIONS } from '../data/site.js';
import { MARKETS, MARKET_ORDER, marketOf } from '../data/markets.js';
import { asset, assetSize } from './assets.js';

const abs = (path) => (path.startsWith('http') ? path : SITE_URL + path);

/** Stable @ids so the same entity is recognised across every page. */
export const IDS = {
  organisation: BRAND_ENTITY.id,
  operator: OPERATOR.id,
  website: `${SITE_URL}/#website`
};

/**
 * The site's entity backbone, emitted on every page.
 *
 * Removals to NZ is a division of International Moving Company (IMC). The graph
 * says so in both directions: IMC names the division as `subOrganization`, and
 * the division names IMC as `parentOrganization`.
 *
 * Everything asserted here is visible somewhere on the site. Properties that
 * depend on a particular page's content — affiliations, the service catalogue —
 * are gated on that page rather than emitted sitewide (playbook rule 07).
 */
export function organisationGraph(page = {}) {
  const logoPath = asset(BRAND_ENTITY.logo);
  const market = page.market ? MARKETS[page.market] : null;
  const nodes = [];

  const organisation = {
    '@type': 'Organization',
    '@id': IDS.organisation,
    name: BRAND_ENTITY.name,
    url: BRAND_ENTITY.url,
    description: BRAND_ENTITY.description,
    disambiguatingDescription: BRAND_ENTITY.legalNote,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: abs(logoPath),
      contentUrl: abs(logoPath),
      ...(assetSize(BRAND_ENTITY.logo) || {}),
      caption: `${BRAND_ENTITY.name} logo`
    },
    image: { '@id': `${SITE_URL}/#logo` },
    email: CONTACT.email,
    // Where the organisation works: every origin market plus New Zealand.
    areaServed: [
      ...MARKET_ORDER.filter((k) => k !== 'europe').map((k) => ({ '@type': 'Country', name: MARKETS[k].name })),
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Country', name: 'New Zealand' }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT.email,
      areaServed: MARKET_ORDER.flatMap((k) => MARKETS[k].countries),
      availableLanguage: ['en']
    }
  };
  const phone = market ? CONTACT.phones[market.key] : null;
  if (phone) organisation.telephone = phone;

  // The parent company. Its @id is the one IMC's own site uses, and it is
  // typed as IMC types itself (Organization — IMC manages moves; it does not
  // claim to own fleets). The relationship is declared in both directions.
  if (OPERATOR.confirmed) {
    const parent = {
      '@type': 'Organization',
      '@id': IDS.operator,
      name: OPERATOR.name,
      alternateName: OPERATOR.shortName,
      url: OPERATOR.url,
      description: OPERATOR.description,
      subOrganization: { '@id': IDS.organisation }
    };
    if (OPERATOR.legalName) parent.legalName = OPERATOR.legalName;
    if (OPERATOR.sameAs.length) parent.sameAs = OPERATOR.sameAs;
    nodes.push(parent);
    organisation.parentOrganization = { '@id': IDS.operator };
  }

  // Affiliations are asserted only where the affiliations block is rendered.
  if (page.showsAffiliations && AFFILIATIONS.members.length) {
    organisation.memberOf = AFFILIATIONS.members.map((m) => ({
      '@type': 'Organization',
      name: m.name,
      ...(m.url ? { url: m.url } : {})
    }));
  }

  // The service catalogue is asserted only where the services are listed.
  if (page.serviceCatalogue && page.serviceCatalogue.length) {
    organisation.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: market ? `Removals to New Zealand ${market.from}` : 'Removals to New Zealand',
      itemListElement: page.serviceCatalogue.map((sv, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: sv.name,
          url: abs(sv.href)
        }
      }))
    };
  }

  const website = {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: SITE_URL,
    name: BRAND_ENTITY.name,
    publisher: { '@id': IDS.organisation },
    // One site, several English-language markets.
    inLanguage: ['en', ...MARKET_ORDER.map((k) => MARKETS[k].htmlLang).filter((l) => l !== 'en')]
  };

  return [...nodes, organisation, website];
}

export function breadcrumbSchema(crumbs, pageUrl) {
  if (!crumbs || crumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(pageUrl)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href)
    }))
  };
}

export function webPageSchema(page) {
  const url = abs(page.path);
  const node = {
    '@type': page.schemaPageType || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.organisation },
    inLanguage: marketOf(page).htmlLang
  };
  if (page.published) node.datePublished = page.published;
  if (page.updated) node.dateModified = page.updated;
  if (page.crumbs && page.crumbs.length > 1) {
    node.breadcrumb = { '@id': `${url}#breadcrumb` };
  }
  if (page.primaryImage) {
    node.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: abs(page.primaryImage.src),
      caption: page.primaryImage.alt
    };
  }
  return node;
}

/**
 * Service schema. `offers` is omitted deliberately: we publish no fixed prices,
 * so asserting an Offer with a price would contradict the visible content.
 */
export function serviceSchema(page) {
  if (!page.service) return null;
  const url = abs(page.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: page.service.name,
    serviceType: page.service.type,
    description: page.service.description,
    provider: { '@id': IDS.organisation },
    areaServed: (page.service.areaServed || ['New Zealand']).map((name) => ({
      '@type': 'Country',
      name
    })),
    audience: page.service.audience
      ? { '@type': 'Audience', audienceType: page.service.audience }
      : undefined,
    mainEntityOfPage: { '@id': `${url}#webpage` }
  };
}

/**
 * FAQPage. Only emitted when the visible page renders the same questions and
 * answers — build.mjs passes the rendered FAQ block, not a separate list.
 */
export function faqSchema(page) {
  if (!page.faqs || !page.faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${abs(page.path)}#faq`,
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

/** Article schema for guides. Author is the organisation — we do not invent people. */
export function articleSchema(page) {
  if (page.template !== 'guide') return null;
  const url = abs(page.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: page.h1,
    description: page.description,
    datePublished: page.published,
    dateModified: page.updated,
    // Matches the visible byline, "Written by the Removals to NZ team".
    author: { '@id': IDS.organisation },
    publisher: { '@id': IDS.organisation },
    isPartOf: { '@id': `${url}#webpage` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    inLanguage: marketOf(page).htmlLang
  };
}

/** HowTo for genuinely sequential processes rendered as numbered steps. */
export function howToSchema(page) {
  if (!page.howTo) return null;
  const url = abs(page.path);
  return {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: page.howTo.name,
    description: page.howTo.description,
    step: page.howTo.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body
    }))
  };
}

/**
 * A hub page's main entity is the set of pages it curates. Emitted only where
 * the page actually renders that list as cards.
 */
export function hubListSchema(page) {
  if (page.template !== 'hub' || !page.blocks) return null;
  const cards = page.blocks.filter((b) => b.type === 'cards').flatMap((b) => b.items || []);
  if (cards.length < 2) return null;
  return {
    '@type': 'ItemList',
    '@id': `${abs(page.path)}#list`,
    name: page.h1,
    numberOfItems: cards.length,
    itemListElement: cards.map((cd, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cd.title,
      url: abs(cd.href)
    }))
  };
}

/** Assemble the page graph, dropping empty nodes and stripping undefined keys. */
export function buildGraph(page) {
  const nodes = [
    ...organisationGraph(page),
    webPageSchema(page),
    hubListSchema(page),
    breadcrumbSchema(page.crumbs, page.path),
    serviceSchema(page),
    articleSchema(page),
    howToSchema(page),
    faqSchema(page)
  ].filter(Boolean);

  return JSON.stringify(
    { '@context': 'https://schema.org', '@graph': nodes },
    (_k, v) => (v === undefined ? undefined : v)
  );
}
