import { GUIDE_FAQS, PRICES_FAQS } from '@/content/extra-pages';
import { HOME_FAQS } from '@/content/faqs';
import { SERVICE_PAGES } from '@/content/services';
import {
  BUSINESS,
  PAGES,
  PRICING,
  SITE_URL,
  pageUrl,
  type FaqItem,
  type ContentPageKey,
  type PageKey,
  type PriceKey,
} from '@/content/site';

/**
 * schema.org JSON-LD, built only from verified facts in content/site.ts.
 * Deliberately absent: aggregateRating, review, street address, opening
 * hours, sameAs. None of those are known, and made-up structured data is a
 * fast way to earn a manual action from Google.
 */

export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo-512.png`;
export const OG_IMAGE_ALT =
  'Tails to Trails: dog walking, pet sitting and in-home boarding in Pittsburgh, PA';

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const CITY = {
  '@type': 'City',
  name: BUSINESS.city,
  containedInPlace: { '@type': 'State', name: 'Pennsylvania' },
} as const;

function offerFor(key: PriceKey) {
  const item = PRICING[key];
  return {
    '@type': 'Offer',
    name: item.name,
    description: item.detail,
    price: item.price,
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: item.price,
      priceCurrency: 'USD',
      unitText: item.unit,
    },
    url: pageUrl(item.page),
  };
}

function businessNode() {
  const allPrices = Object.keys(PRICING) as PriceKey[];
  const lowest = Math.min(...allPrices.map((k) => PRICING[k].price));
  const highest = Math.max(...allPrices.map((k) => PRICING[k].price));
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.descriptor,
    description:
      'Dog walking, pack walks, in-home dog and cat boarding, cat sitting and yard clean up in Pittsburgh, PA, from Jennifer at Tails to Trails.',
    url: `${SITE_URL}/`,
    telephone: BUSINESS.phoneE164,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phoneE164,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Dog walking',
      'Pet sitting',
      'Cat sitting',
      'Dog boarding',
      'Pet waste removal',
    ],
    image: OG_IMAGE_URL,
    logo: LOGO_URL,
    priceRange: `$${lowest}-$${highest}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      addressCountry: 'US',
    },
    areaServed: CITY,
    founder: { '@type': 'Person', name: BUSINESS.owner },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet care services in Pittsburgh, PA',
      itemListElement: allPrices.map((key) => ({
        ...offerFor(key),
        itemOffered: {
          '@type': 'Service',
          name: `${PRICING[key].name} in ${BUSINESS.region}`,
          url: pageUrl(PRICING[key].page),
        },
      })),
    },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: 'en-US',
    publisher: { '@id': BUSINESS_ID },
  };
}

function faqNode(url: string, faqs: readonly FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/** Serialized JSON-LD graph for a page, safe to inline inside <script>. */
export function buildJsonLd(key: PageKey): string {
  const page = PAGES[key];
  const url = pageUrl(key);

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE_URL },
  };

  const graph: Record<string, unknown>[] = [
    businessNode(),
    websiteNode(),
    webPage,
  ];

  const breadcrumb = () => {
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
    return {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: PAGES.home.navLabel,
          item: `${SITE_URL}/`,
        },
        { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
      ],
    };
  };

  if (key === 'home') {
    graph.push(faqNode(url, HOME_FAQS));
  } else if (key === 'prices') {
    const allPrices = Object.keys(PRICING) as PriceKey[];
    graph.push(
      breadcrumb(),
      {
        '@type': 'OfferCatalog',
        '@id': `${url}#prices`,
        name: 'Tails to Trails prices in Pittsburgh, PA',
        url,
        itemListElement: allPrices.map((k) => ({
          ...offerFor(k),
          itemOffered: {
            '@type': 'Service',
            name: `${PRICING[k].name} in ${BUSINESS.region}`,
            provider: { '@id': BUSINESS_ID },
            url: pageUrl(PRICING[k].page),
          },
        })),
      },
      faqNode(url, PRICES_FAQS),
    );
  } else if (key === 'guide') {
    webPage['@type'] = ['WebPage', 'CollectionPage'];
    graph.push(breadcrumb(), faqNode(url, GUIDE_FAQS));
  } else {
    const service = SERVICE_PAGES[key as ContentPageKey];
    const offers =
      key === 'meetGreet'
        ? [
            {
              '@type': 'Offer',
              name: 'Free meet & greet',
              price: 0,
              priceCurrency: 'USD',
              url,
            },
          ]
        : service.prices.map(offerFor);
    graph.push(
      breadcrumb(),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        serviceType: service.schema.serviceType,
        name: service.schema.name,
        description: service.schema.description,
        url,
        provider: { '@id': BUSINESS_ID },
        areaServed: CITY,
        offers,
      },
      faqNode(url, service.faqs),
    );
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
