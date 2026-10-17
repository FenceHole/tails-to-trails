/**
 * Single source of truth for every business fact, price, page path and
 * page title on the site. Never hard-code a phone number, price or route
 * anywhere else; import it from here.
 *
 * Only facts the owner has already published are in this file. Do not add
 * reviews, ratings, years in business, certifications, neighborhoods, hours,
 * email, street address or social handles: none of those are known.
 */

/**
 * Public origin used for canonical URLs, Open Graph tags, the sitemap and
 * JSON-LD. Set VITE_SITE_URL at build time once the final domain is known.
 */
export const SITE_URL: string = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  'https://vet-van-fleet-infograph-716h.vercel.app'
).replace(/\/+$/, '');

export const BUSINESS = {
  name: 'Tails to Trails',
  legalName: 'Tails to Trails, LLC',
  owner: 'Jennifer',
  descriptor: 'Dog Walking & Pet Services by Jennifer',
  city: 'Pittsburgh',
  state: 'PA',
  region: 'Pittsburgh, PA',
  phoneDisplay: '412-709-0057',
  phoneE164: '+14127090057',
} as const;

export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;

/**
 * Pre-filled text message link. The `?&body=` form works on both iOS and
 * Android. Desktop browsers usually ignore sms: links, so anything that
 * relies on this should also offer a "copy message" or "call" fallback.
 */
export function smsHref(body?: string): string {
  const base = `sms:${BUSINESS.phoneE164}`;
  return body ? `${base}?&body=${encodeURIComponent(body)}` : base;
}

export const DEFAULT_SMS_BODY =
  "Hi Jennifer! I found Tails to Trails online and I'd like to set up a free meet & greet.";

/* ------------------------------------------------------------------ */
/* Prices. The ONLY place prices live. Flat prices, no add-ons known.   */
/* Multi-pet discounts, holiday rates and travel fees are NOT known.    */
/* ------------------------------------------------------------------ */

export type PageKey =
  | 'home'
  | 'dogWalking'
  | 'packWalks'
  | 'boarding'
  | 'catSitting'
  | 'yardCleanup';

export type ServicePageKey = Exclude<PageKey, 'home'>;

export type PriceUnit = 'walk' | 'night' | 'visit';

export interface PriceItem {
  key: string;
  /** Short name, e.g. for a menu row or a calculator line. */
  name: string;
  /** What the price buys, one short phrase. */
  detail: string;
  /** Whole US dollars. */
  price: number;
  unit: PriceUnit;
  /** Page that explains this service in depth. */
  page: ServicePageKey;
}

export const PRICING = {
  soloWalk: {
    key: 'soloWalk',
    name: 'Solo dog walk',
    detail: '30 minutes, just you and Jennifer',
    price: 15,
    unit: 'walk',
    page: 'dogWalking',
  },
  packWalk: {
    key: 'packWalk',
    name: 'Pack walk',
    detail: '60-minute group walk',
    price: 20,
    unit: 'walk',
    page: 'packWalks',
  },
  dogBoarding: {
    key: 'dogBoarding',
    name: 'Dog boarding',
    detail: 'Overnight in a real home, not a kennel',
    price: 30,
    unit: 'night',
    page: 'boarding',
  },
  catBoarding: {
    key: 'catBoarding',
    name: 'Cat boarding',
    detail: 'Overnight in-home boarding',
    price: 20,
    unit: 'night',
    page: 'boarding',
  },
  catVisit: {
    key: 'catVisit',
    name: 'Cat sitting visit',
    detail: '30 minutes at your home',
    price: 15,
    unit: 'visit',
    page: 'catSitting',
  },
  yardCleanup: {
    key: 'yardCleanup',
    name: 'Yard clean up',
    detail: 'Regular yard waste removal',
    price: 30,
    unit: 'visit',
    page: 'yardCleanup',
  },
} as const satisfies Record<string, PriceItem>;

export type PriceKey = keyof typeof PRICING;

export function formatPrice(price: number): string {
  return `$${price}`;
}

/** "$15 per walk", "$30 per night" */
export function priceLabel(key: PriceKey): string {
  const item = PRICING[key];
  return `${formatPrice(item.price)} per ${item.unit}`;
}

/* ------------------------------------------------------------------ */
/* Pages. Paths use a trailing slash; that form is the canonical URL.   */
/* h1 / title / description are final SEO copy: render h1 as the one    */
/* <h1> on that page, verbatim.                                         */
/* ------------------------------------------------------------------ */

export interface PageMeta {
  key: PageKey;
  /** Route path, leading and trailing slash. */
  path: string;
  /** Short label for navigation and footer links. */
  navLabel: string;
  /** The page's single <h1>. Keyworded on purpose; keep it plain. */
  h1: string;
  /** <title> tag. */
  title: string;
  /** <meta name="description"> and social description. */
  description: string;
}

export const PAGES = {
  home: {
    key: 'home',
    path: '/',
    navLabel: 'Home',
    h1: 'Dog Walking & Pet Sitting in Pittsburgh',
    title: 'Pittsburgh Dog Walker & Pet Sitter | Tails to Trails',
    description:
      'Pittsburgh dog walking from $15, pack walks, in-home dog & cat boarding, cat sitting and yard clean up. Free meet & greet. Call or text Jennifer: 412-709-0057.',
  },
  dogWalking: {
    key: 'dogWalking',
    path: '/dog-walking-pittsburgh/',
    navLabel: 'Dog Walking',
    h1: 'Dog Walking in Pittsburgh',
    title: 'Dog Walking in Pittsburgh, PA from $15 | Tails to Trails',
    description:
      'Solo dog walks in Pittsburgh from $15 for 30 minutes. Insured, with early-morning, evening and weekend times and a free meet & greet. Call or text 412-709-0057.',
  },
  packWalks: {
    key: 'packWalks',
    path: '/pack-walks-pittsburgh/',
    navLabel: 'Pack Walks',
    h1: 'Pack Walks & Group Dog Walking in Pittsburgh',
    title: 'Group Dog Walking in Pittsburgh, $20 | Tails to Trails',
    description:
      'Pack walks for Pittsburgh dogs: 60 minutes of socializing and exercise for $20. Insured, flexible schedule, free meet & greet. Call or text 412-709-0057.',
  },
  boarding: {
    key: 'boarding',
    path: '/dog-boarding-pittsburgh/',
    navLabel: 'Boarding & Sitting',
    h1: 'Dog Boarding & Dog Sitting in Pittsburgh',
    title: 'Dog Boarding & Dog Sitting in Pittsburgh | Tails to Trails',
    description:
      'In-home dog boarding in Pittsburgh for $30 a night (cats $20): a real home, not a kennel, with photo updates. Free meet & greet. Call or text 412-709-0057.',
  },
  catSitting: {
    key: 'catSitting',
    path: '/cat-sitting-pittsburgh/',
    navLabel: 'Cat Sitting',
    h1: 'Cat Sitting in Pittsburgh',
    title: 'Cat Sitter in Pittsburgh, PA, $15 Visits | Tails to Trails',
    description:
      'Cat sitting in Pittsburgh for $15 per 30-minute visit: feeding, fresh water, litter box, playtime, medication and photo updates. Free meet & greet.',
  },
  yardCleanup: {
    key: 'yardCleanup',
    path: '/yard-cleanup-pittsburgh/',
    navLabel: 'Yard Clean Up',
    h1: 'Yard Clean Up in Pittsburgh',
    title: 'Yard Clean Up in Pittsburgh, PA, $30/Visit | Tails to Trails',
    description:
      'Regular pet waste and yard clean up in Pittsburgh for $30 a visit. Jennifer handles the messy part. Call or text 412-709-0057.',
  },
} as const satisfies Record<PageKey, PageMeta>;

/** Top navigation / footer order for the five service pages. */
export const SERVICE_NAV: readonly PageMeta[] = [
  PAGES.dogWalking,
  PAGES.packWalks,
  PAGES.boarding,
  PAGES.catSitting,
  PAGES.yardCleanup,
];

export function pageUrl(key: PageKey): string {
  return `${SITE_URL}${PAGES[key].path}`;
}

/**
 * wouter route pattern for a page: the path without its trailing slash, so
 * both /dog-walking-pittsburgh and /dog-walking-pittsburgh/ match. Keep using
 * PAGES[key].path (with the slash) for links, so links hit the canonical URL.
 */
export function routePattern(key: PageKey): string {
  const { path } = PAGES[key];
  return path === '/' ? '/' : path.replace(/\/$/, '');
}

/* ------------------------------------------------------------------ */
/* Verified trust facts and promises (all published by the owner).      */
/* ------------------------------------------------------------------ */

export interface ContentItem {
  title: string;
  body: string;
}

export const TRUST_POINTS: readonly string[] = [
  'Free meet & greet',
  'Trusted & insured',
  'Pittsburgh local',
  'Photo & message updates',
  'Early mornings, evenings & weekends',
];

export const PROMISES: readonly ContentItem[] = [
  {
    title: 'Personalized attention',
    body: "No assembly-line pet care. Every visit is tailored to your pet's personality and needs.",
  },
  {
    title: 'Medication and senior pet experience',
    body: 'Experienced with medications, special diets, and senior pet care routines.',
  },
  {
    title: 'Photo and message updates',
    body: 'Regular photos and messages so you always know your pet is happy and safe.',
  },
  {
    title: 'A real home, not a kennel',
    body: 'Dogs board in a real home, not a kennel.',
  },
  {
    title: 'Flexible scheduling',
    body: 'Early mornings, evenings, weekends. Jennifer works around your schedule.',
  },
];

/** Jennifer's own words from the existing site. Quote verbatim. */
export const ABOUT = {
  greeting: "Hi, I'm Jennifer",
  quote:
    "I started Tails to Trails because I believe every pet deserves personalized, stress-free care. Whether it's a solo walk or overnight boarding, your pet gets my full attention.",
  meetAndGreet:
    "Let's make sure we're the right fit for your pet. Call or text to schedule a no-pressure introduction.",
} as const;

/* ------------------------------------------------------------------ */
/* Shared content shapes (data lives in services.ts and faqs.ts).       */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  /** Plain-text question. */
  q: string;
  /** Plain-text answer, one paragraph. Also used verbatim in FAQPage JSON-LD. */
  a: string;
}

export interface ServicePageContent {
  key: ServicePageKey;
  /** Plain-language intro shown directly under the H1. */
  intro: string;
  /** Prices to feature on the page. Look numbers up in PRICING. */
  prices: readonly PriceKey[];
  /** Keyworded H2s for each block. Render these verbatim. */
  headings: {
    included: string;
    steps: string;
    goodFor: string;
    local: string;
    faq: string;
  };
  included: readonly ContentItem[];
  /** Ordered how-it-works steps. */
  steps: readonly ContentItem[];
  /** Short "great for" list. */
  goodFor: readonly string[];
  /** Practical Pittsburgh-specific notes. */
  localNotes: readonly ContentItem[];
  faqs: readonly FaqItem[];
  /** Other pages to cross-link at the bottom. */
  related: readonly PageKey[];
  /** Closing call to action, with the pre-filled text message. */
  cta: { heading: string; body: string; smsBody: string };
  /** Feeds schema.org Service markup. */
  schema: { serviceType: string; name: string; description: string };
}
