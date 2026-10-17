import {
  ABOUT,
  BUSINESS,
  PAGES,
  PRICING,
  SITE_URL,
  formatPrice,
  pageUrl,
  type PageKey,
  type PriceKey,
} from '@/content/site';

/**
 * Plain-text summary for AI assistants and crawlers that read /llms.txt.
 * Built only from content/site.ts, so it can never disagree with the pages.
 */
export function buildLlmsTxt(): string {
  const order: PageKey[] = [
    'home',
    'dogWalking',
    'packWalks',
    'boarding',
    'catSitting',
    'petSitting',
    'yardCleanup',
    'meetGreet',
    'prices',
    'guide',
  ];
  const prices = (Object.keys(PRICING) as PriceKey[]).map((k) => {
    const it = PRICING[k];
    return `- ${it.name}: ${formatPrice(it.price)} per ${it.unit} (${it.detail})`;
  });
  return [
    `# ${BUSINESS.legalName}`,
    '',
    `> ${BUSINESS.descriptor}. A one-person dog walking, pet sitting and in-home boarding business in ${BUSINESS.region}. Free meet & greet before anything is booked.`,
    '',
    `Owner: ${BUSINESS.owner}. Phone and text: ${BUSINESS.phoneDisplay}. Website: ${SITE_URL}/`,
    '',
    ABOUT.quote,
    '',
    '## Prices',
    '',
    ...prices,
    '- Meet & greet: free',
    '',
    '## Pages',
    '',
    ...order.map((k) => `- [${PAGES[k].h1}](${pageUrl(k)}): ${PAGES[k].description}`),
    '',
  ].join('\n');
}
