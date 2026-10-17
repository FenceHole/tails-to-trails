import type { ContentItem, FaqItem } from './site';

/**
 * Copy for the prices page and the Pittsburgh pet care guide.
 *
 * The prices page only repeats numbers from PRICING. The guide is general pet
 * care advice and says nothing about which parks, streets or neighborhoods
 * Jennifer serves, because that is not known.
 */

export const PRICES_INTRO =
  "These are Jennifer's actual prices, posted up front. No quote form and no \"contact us for pricing.\" The meet & greet that comes first is free.";

export const PRICES_FAQS: readonly FaqItem[] = [
  {
    q: 'How much does a dog walker cost in Pittsburgh?',
    a: 'At Tails to Trails, a 30-minute solo walk is $15 and a 60-minute group (pack) walk is $20.',
  },
  {
    q: 'How much does dog boarding cost in Pittsburgh?',
    a: 'Dog boarding at Tails to Trails is $30 a night, in a real home and not a kennel. Cat boarding is $20 a night.',
  },
  {
    q: 'How much does a cat sitter cost in Pittsburgh?',
    a: 'A 30-minute cat sitting visit at your home is $15. If you would rather your cat stay overnight in Jennifer\'s home, cat boarding is $20 a night.',
  },
  {
    q: 'How much is yard clean up?',
    a: 'Regular yard waste removal, including pet waste pickup, is $30 a visit.',
  },
  {
    q: 'Is the meet & greet really free?',
    a: 'Yes. You, your pet and Jennifer meet before anything is booked, and it costs nothing.',
  },
  {
    q: 'What if I have a question the price list does not answer?',
    a: 'Call or text 412-709-0057. Jennifer will tell you what she can do for your situation, whether that is more than one pet, a different schedule or a service that is not on the list.',
  },
];

export interface GuideSection extends ContentItem {
  id: string;
  /** Links to the service page that helps with this topic. */
  link: 'dogWalking' | 'catSitting' | 'boarding' | 'packWalks' | 'petSitting';
  linkLabel: string;
}

export const GUIDE_INTRO =
  'Pittsburgh is a good place for a dog. It is also hilly, salty in winter, sticky in July and loud around the Fourth. Here is what is worth knowing, from a local dog walker and pet sitter. This is general pet care advice. Your vet knows your pet best.';

export const GUIDE_SECTIONS: readonly GuideSection[] = [
  {
    id: 'winter',
    title: 'Winter: salt, ice and cold paws',
    body: 'Road and sidewalk salt can dry out and irritate paws from the first freeze into early spring. Wipe paws with a damp cloth after a walk, check between the toes for ice balls, and consider boots for dogs with sensitive feet. Short walks in the coldest stretch beat one long one, and small, short-haired and senior dogs usually need a coat.',
    link: 'dogWalking',
    linkLabel: 'Dog walking in Pittsburgh',
  },
  {
    id: 'summer',
    title: 'Summer: hot pavement and humid afternoons',
    body: 'Asphalt can burn paws long before the air feels dangerous. A simple test: if you cannot hold the back of your hand on the pavement for about seven seconds, it is too hot for your dog. Walk early or late, carry water, stay on grass or shade when you can, and never leave a dog in a parked car.',
    link: 'dogWalking',
    linkLabel: 'Early-morning and evening walks',
  },
  {
    id: 'hills',
    title: 'Hills and city steps',
    body: 'Steep streets and long staircases are a real workout. They are great for energetic dogs. They are harder on seniors, puppies, heavy dogs and short-legged breeds, so match the route to the dog. A slower, flatter loop with plenty of sniffing is still good exercise.',
    link: 'packWalks',
    linkLabel: 'Pack walks and group walking',
  },
  {
    id: 'ticks',
    title: 'Ticks and tall grass',
    body: 'Ticks are common in Pennsylvania, especially around wooded edges and tall grass. Check your dog after walks in those spots, and ask your vet about tick prevention that suits your dog.',
    link: 'dogWalking',
    linkLabel: 'Dog walking',
  },
  {
    id: 'fireworks',
    title: 'Fireworks, thunderstorms and noisy nights',
    body: 'Fourth of July and summer storms send many pets running. Keep dogs and cats indoors, make sure collars and ID tags are current, and give anxious pets a quiet room with a familiar blanket. If you are heading out for the holiday weekend, book care early.',
    link: 'boarding',
    linkLabel: 'In-home dog boarding',
  },
  {
    id: 'cats',
    title: 'Leaving a cat at home',
    body: 'Cats are independent, but they still need fresh water, a clean litter box, regular meals and company. Most cats do best with at least one visit a day while you travel, and a visit gives a sitter the chance to spot a problem early. Leave the vet contact, feeding amounts and any medication times where the sitter can find them.',
    link: 'catSitting',
    linkLabel: 'Cat sitting visits',
  },
  {
    id: 'travel',
    title: 'Before you travel',
    body: 'Share your dates early, especially for holidays. Write down the routine, including feeding, medication and quirks, and set up a meet & greet before the trip so your pet is not meeting the sitter for the first time on the day you leave.',
    link: 'petSitting',
    linkLabel: 'Pet sitting in Pittsburgh',
  },
];

export const GUIDE_FAQS: readonly FaqItem[] = [
  {
    q: 'How hot is too hot to walk a dog on pavement?',
    a: 'If you cannot comfortably hold the back of your hand on the pavement for about seven seconds, it is too hot for paws. Walk in the early morning or evening and choose grass or shade.',
  },
  {
    q: 'Is road salt bad for dogs?',
    a: 'Salt can irritate and dry out paws, and licking it off can upset a dog\'s stomach. Wipe paws after winter walks and ask your vet if your dog needs boots or paw balm.',
  },
  {
    q: 'How often should a cat be checked on while I am away?',
    a: 'Most cats do best with at least one visit a day. At Tails to Trails, a 30-minute cat sitting visit is $15.',
  },
  {
    q: 'Where can I book a Pittsburgh dog walker or pet sitter?',
    a: 'Call or text Jennifer at Tails to Trails, 412-709-0057, to set up a free meet & greet.',
  },
];
