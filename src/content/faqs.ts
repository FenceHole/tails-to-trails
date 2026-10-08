import type { FaqItem } from './site';

/**
 * Home page FAQ. Rendered as visible text AND emitted as FAQPage JSON-LD
 * from this same array, so the two can never drift apart.
 * Answers are plain text, one paragraph each.
 */
export const HOME_FAQS: readonly FaqItem[] = [
  {
    q: 'How much does dog walking cost in Pittsburgh?',
    a: 'With Tails to Trails, a 30-minute solo walk is $15 and a 60-minute group (pack) walk is $20. The plan builder on this page adds up your total.',
  },
  {
    q: 'Do you offer dog sitting and overnight dog boarding in Pittsburgh?',
    a: 'Yes. In-home boarding is $30 a night for dogs and $20 a night for cats. Dogs board in a real home, not a kennel.',
  },
  {
    q: 'How much does a cat sitter cost in Pittsburgh?',
    a: 'A 30-minute cat sitting visit is $15. It includes feeding, fresh water, litter box care, playtime, medication and photo updates. Overnight cat boarding is $20 a night.',
  },
  {
    q: 'What happens at the free meet & greet?',
    a: "You, your pet and Jennifer meet before anything is booked. You go over routines, quirks, medications and scheduling, and make sure it's a good fit. It's a free, no-pressure introduction.",
  },
  {
    q: 'Is Tails to Trails insured?',
    a: 'Yes. Tails to Trails, LLC is a trusted and insured pet care business in Pittsburgh, PA.',
  },
  {
    q: 'Can you care for senior pets or pets that take medication?',
    a: 'Yes. Jennifer is experienced with medications, special diets and senior pet care routines, including oral medications and eye drops.',
  },
  {
    q: "Will I get updates while I'm away?",
    a: 'Yes. You get regular photos and messages, so you always know your pet is happy and safe.',
  },
  {
    q: 'What days and times can you walk my dog?',
    a: 'Scheduling is flexible: early mornings, evenings and weekends. Text or call 412-709-0057 with the times you need.',
  },
  {
    q: 'Which Pittsburgh neighborhoods do you serve?',
    a: 'Tails to Trails is based in Pittsburgh, PA. Text or call 412-709-0057 with your neighborhood or ZIP code and Jennifer will tell you if she can help.',
  },
  {
    q: 'What is yard clean up?',
    a: 'Yard clean up is regular yard waste removal, including pet waste pickup, so your outdoor space stays fresh. It is $30 a visit.',
  },
  {
    q: 'How do I book Tails to Trails?',
    a: 'Call or text 412-709-0057 to set up a free meet & greet. You can also use the plan builder on this page and send your plan to Jennifer as a text message.',
  },
];
