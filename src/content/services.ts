import type { ServicePageContent, ServicePageKey } from './site';

/**
 * Copy for the five service landing pages. Every claim here comes from the
 * owner's published site or is general pet-care knowledge; nothing about
 * neighborhoods, reviews, hours or credentials is asserted.
 *
 * Voice: plain, specific, a little local. No em dashes, no filler.
 */
export const SERVICE_PAGES: Record<ServicePageKey, ServicePageContent> = {
  dogWalking: {
    key: 'dogWalking',
    intro:
      "Solo dog walks for Pittsburgh dogs who need more than a lap around the block. Jennifer walks your dog on a schedule that fits your day, then sends a photo and a quick message so you know how it went.",
    prices: ['soloWalk', 'packWalk'],
    headings: {
      included: "What's included in every Pittsburgh dog walk",
      steps: 'How dog walking works',
      goodFor: 'Who solo walks are made for',
      local: 'Walking dogs in Pittsburgh: hills, salt and hot pavement',
      faq: 'Dog walking in Pittsburgh: your questions answered',
    },
    included: [
      {
        title: 'A walk built around your dog',
        body: "Sniffy, speedy, shy or senior, the pace and route fit the dog on the other end of the leash. Every walk gets personalized attention.",
      },
      {
        title: 'Photo and message updates',
        body: "You hear how the walk went, with a photo when there's a good one.",
      },
      {
        title: 'Early mornings, evenings and weekends',
        body: 'Walks fit around your workday, your commute and your Saturday plans, not the other way around.',
      },
      {
        title: 'Senior dogs and medications welcome',
        body: 'Jennifer is experienced with senior pets, medications and special diets, so older dogs and dogs on a schedule are in good hands.',
      },
      {
        title: 'A free meet & greet first',
        body: 'You, your dog and Jennifer meet before anything is booked, so nobody is surprised on day one.',
      },
    ],
    steps: [
      {
        title: 'Call or text',
        body: "Tell Jennifer your dog's name, your neighborhood and when you'd like walks.",
      },
      {
        title: 'Meet & greet',
        body: 'A free first meeting to cover routines, leash habits, quirks and anything else Jennifer should know.',
      },
      {
        title: 'Start walking',
        body: 'Walks happen on your schedule. Book a regular slot or just the days you need.',
      },
      {
        title: 'Get the update',
        body: 'A photo and a message after the walk, so you never have to wonder.',
      },
    ],
    goodFor: [
      'Dogs who are home alone during a long workday',
      'High-energy dogs who need a real outing',
      'Senior dogs who do better with a gentler pace',
      'Households with long commutes, travel days or a brand-new schedule',
    ],
    localNotes: [
      {
        title: 'Pittsburgh is built on hills',
        body: "Steep streets and city steps turn a short walk into a real workout. That's great for energetic dogs, and it's a good reason to match the route to your dog's fitness, especially for seniors and short-legged breeds.",
      },
      {
        title: 'Salt and slush season',
        body: "Road salt can irritate paws from winter into early spring. Wiping paws after a snowy walk helps, and it's worth telling Jennifer if your dog wears boots.",
      },
      {
        title: 'Hot pavement in July',
        body: 'Asphalt gets hot enough to hurt paws. Early-morning and evening walks are easier on every dog, and those are exactly the times Jennifer offers.',
      },
    ],
    faqs: [
      {
        q: 'How much does a dog walker cost in Pittsburgh?',
        a: 'At Tails to Trails, a 30-minute solo walk is $15. A 60-minute group (pack) walk is $20. Those are the actual prices, posted up front.',
      },
      {
        q: 'What times are dog walks available?',
        a: "Jennifer offers flexible scheduling: early mornings, evenings and weekends. Tell her what your day looks like and she'll work around it.",
      },
      {
        q: 'Can you walk a senior dog or a dog on medication?',
        a: "Yes. Jennifer is experienced with senior pets, medications and special diets, and she personalizes each walk to the dog's needs.",
      },
      {
        q: "What's the difference between a solo walk and a pack walk?",
        a: 'A solo walk is 30 minutes of one-on-one time for $15. A pack walk is a 60-minute group walk for $20, where dogs socialize, build confidence and burn off energy together.',
      },
      {
        q: 'Is Tails to Trails insured?',
        a: 'Yes. Tails to Trails, LLC is a trusted and insured pet care business in Pittsburgh, PA.',
      },
      {
        q: 'How do I get started with dog walking?',
        a: 'Call or text 412-709-0057 to set up a free meet & greet. You, your dog and Jennifer meet first, so everyone knows what to expect before the first walk.',
      },
    ],
    related: ['packWalks', 'boarding', 'yardCleanup'],
    cta: {
      heading: "Let's find your dog's walk",
      body: "Text or call Jennifer to set up a free meet & greet. Tell her about your dog and when you'd like walks.",
      smsBody:
        "Hi Jennifer! I found Tails to Trails online and I'd like to set up dog walks for my dog. Could we schedule a free meet & greet?",
    },
    schema: {
      serviceType: 'Dog walking',
      name: 'Dog Walking in Pittsburgh, PA',
      description:
        'Solo dog walks in Pittsburgh, PA: 30 minutes for $15, with photo and message updates and flexible early-morning, evening and weekend scheduling.',
    },
  },

  packWalks: {
    key: 'packWalks',
    intro:
      "A 60-minute group walk for dogs who would rather be with friends. Pack walks burn energy, build confidence and send dogs home pleasantly tired, for $20 a walk.",
    prices: ['packWalk', 'soloWalk'],
    headings: {
      included: 'What your dog gets on a Pittsburgh pack walk',
      steps: 'How pack walks work',
      goodFor: 'Who pack walks are made for',
      local: 'Group dog walking in Pittsburgh',
      faq: 'Pack walks in Pittsburgh: your questions answered',
    },
    included: [
      {
        title: 'Socialize and make new pals',
        body: 'Supervised time with other dogs gives social dogs a place to practice good manners and burn off steam.',
      },
      {
        title: 'Build confidence and better behavior',
        body: 'Regular group outings can help shy or over-excited dogs get comfortable around other dogs.',
      },
      {
        title: 'Exercise for body and mind',
        body: "A full hour of walking, sniffing and following the pack tires a dog out in a way a quick trip around the block can't.",
      },
      {
        title: 'Photo and message updates',
        body: "You hear how your dog did, with a photo when the pack is looking good.",
      },
      {
        title: 'A free meet & greet first',
        body: 'Before your dog joins a group, you meet Jennifer for free and talk through how your dog does around other dogs.',
      },
    ],
    steps: [
      {
        title: 'Call or text',
        body: 'Tell Jennifer about your dog: age, size, energy level, and how they usually do around other dogs.',
      },
      {
        title: 'Meet & greet',
        body: 'A free first meeting to decide together whether a pack walk or a solo walk suits your dog best.',
      },
      {
        title: 'Join the pack',
        body: 'A 60-minute group walk on a schedule that fits your week.',
      },
      {
        title: 'Get the update',
        body: 'A photo and a message after the walk.',
      },
    ],
    goodFor: [
      'Friendly, social dogs',
      'Dogs with energy to spare',
      'Dogs who could use practice around other dogs (talk to Jennifer first)',
      'Anyone who wants an hour-long outing for $5 more than a 30-minute solo walk',
    ],
    localNotes: [
      {
        title: 'Apartment and rowhouse dogs',
        body: 'Plenty of Pittsburgh dogs live in apartments and rowhouses with little or no yard. A long group walk gives them room to move and other dogs to meet.',
      },
      {
        title: 'Exercise that ignores the forecast',
        body: "Gray, rainy and slushy days are part of life here, and a dog's energy doesn't check the weather. A scheduled pack walk keeps the routine going when you'd rather stay in.",
      },
    ],
    faqs: [
      {
        q: 'What is a pack walk?',
        a: "A pack walk is a group dog walk. At Tails to Trails it lasts 60 minutes and costs $20, and it's built around socializing, confidence and exercise for body and mind.",
      },
      {
        q: 'How much do group dog walks cost in Pittsburgh?',
        a: 'A 60-minute pack walk is $20. For comparison, a 30-minute solo walk is $15.',
      },
      {
        q: 'Is my dog a good fit for a pack walk?',
        a: "Group walks work best for dogs who enjoy other dogs. That's what the free meet & greet is for: tell Jennifer how your dog behaves around other dogs, and you'll decide together whether a pack walk or a solo walk is the better fit.",
      },
      {
        q: 'When are pack walks available?',
        a: "Jennifer offers flexible scheduling: early mornings, evenings and weekends. Text or call 412-709-0057 to ask what's open for group walks.",
      },
      {
        q: 'Will I hear how the walk went?',
        a: 'Yes. You get photo and message updates, so you always know how your dog is doing.',
      },
    ],
    related: ['dogWalking', 'boarding', 'yardCleanup'],
    cta: {
      heading: 'Ready to join the pack?',
      body: 'Text or call to set up a free meet & greet and find out if your dog is a pack-walk dog.',
      smsBody:
        "Hi Jennifer! I found Tails to Trails online and I'm interested in pack walks for my dog. Could we set up a free meet & greet?",
    },
    schema: {
      serviceType: 'Group dog walking',
      name: 'Pack Walks (Group Dog Walking) in Pittsburgh, PA',
      description:
        '60-minute group dog walks in Pittsburgh, PA for $20, with socializing, exercise and photo updates.',
    },
  },

  boarding: {
    key: 'boarding',
    intro:
      "Overnight care for your dog in a real home, not a kennel. Dog boarding is $30 a night, cat boarding is $20 a night, and every stay starts with a free meet & greet.",
    prices: ['dogBoarding', 'catBoarding'],
    headings: {
      included: "What's included in in-home dog boarding",
      steps: 'How boarding works',
      goodFor: 'Who in-home boarding is made for',
      local: 'Dog sitting and boarding in Pittsburgh: before you go',
      faq: 'Dog boarding and dog sitting in Pittsburgh: your questions answered',
    },
    included: [
      {
        title: 'A real home, not a kennel',
        body: 'Your dog stays in a home environment with personal attention, not in a kennel run.',
      },
      {
        title: "One person's full attention",
        body: "In Jennifer's words: \"Whether it's a solo walk or overnight boarding, your pet gets my full attention.\"",
      },
      {
        title: 'Medication and special diets',
        body: 'Jennifer is experienced with medications, special diets and senior pet care routines, so older dogs and dogs on a schedule are welcome.',
      },
      {
        title: 'Photo and message updates',
        body: "While you're away, you get regular photos and messages so you know your pet is happy and safe.",
      },
      {
        title: 'Cats too',
        body: 'Cat boarding is $20 a night. If your cat would rather stay home, see cat sitting visits.',
      },
      {
        title: 'A free meet & greet first',
        body: 'Meet before the stay, so your dog and Jennifer are not strangers on the first night.',
      },
    ],
    steps: [
      {
        title: 'Call or text with your dates',
        body: "Tell Jennifer when you're traveling and who's coming: name, age and size.",
      },
      {
        title: 'Meet & greet',
        body: 'A free, no-pressure introduction to go over routines, feeding, medication and quirks.',
      },
      {
        title: 'Share the routine',
        body: 'Food, schedule, favorite toys, and the thing your dog does at 3 a.m. Jennifer wants to know all of it.',
      },
      {
        title: 'Enjoy your trip',
        body: 'Photos and messages along the way, so you can relax and still know how things are going.',
      },
    ],
    goodFor: [
      'Travelers who would rather not use a kennel',
      'Dogs who do better in a calm home than in a busy facility',
      'Senior dogs and dogs on medication',
      'Cat owners who need overnight care at $20 a night',
    ],
    localNotes: [
      {
        title: 'Flying out of PIT or driving to the lake?',
        body: 'Whether it is a flight from Pittsburgh International or a long weekend at the lake, text Jennifer your dates as early as you can so she can plan around them.',
      },
      {
        title: 'Pack a piece of home',
        body: 'A familiar blanket, toy or worn T-shirt helps many dogs settle in. Bring the food your dog already eats so there are no tummy surprises.',
      },
      {
        title: 'Tell Jennifer about the odd-hours habits',
        body: 'Pacing, window barking, a midnight snack routine: the things your dog does after dark are worth sharing at the meet & greet.',
      },
    ],
    faqs: [
      {
        q: 'How much does dog boarding cost in Pittsburgh?',
        a: 'At Tails to Trails, dog boarding is $30 a night and cat boarding is $20 a night.',
      },
      {
        q: 'Is dog boarding in a home or a kennel?',
        a: 'A real home. Dogs board in a real home environment, not a kennel.',
      },
      {
        q: "What's the difference between a dog sitter and dog boarding?",
        a: "People often search for a dog sitter when they need someone to look after their dog while they're away. At Tails to Trails, overnight dog care means in-home boarding, and daytime care means dog walks.",
      },
      {
        q: 'Can you give my dog medication while I am away?',
        a: 'Yes. Jennifer is experienced with medications, special diets and senior pet care routines.',
      },
      {
        q: 'Will I get updates during the stay?',
        a: 'Yes. You get regular photos and messages, so you always know your pet is happy and safe.',
      },
      {
        q: 'Do you board cats too?',
        a: "Yes. Cat boarding is $20 a night. If you'd rather your cat stay home, 30-minute cat sitting visits are $15.",
      },
      {
        q: 'How do I book a boarding stay?',
        a: "Call or text 412-709-0057 with your dates and your pet's name. A free meet & greet comes first.",
      },
    ],
    related: ['catSitting', 'dogWalking', 'packWalks'],
    cta: {
      heading: 'Heading out of town?',
      body: 'Text or call with your dates. A free meet & greet comes first, so your dog and Jennifer can get acquainted before the stay.',
      smsBody:
        "Hi Jennifer! I found Tails to Trails online and I'd like to ask about boarding for my pet. Could we set up a free meet & greet?",
    },
    schema: {
      serviceType: 'Pet boarding',
      name: 'In-Home Dog & Cat Boarding in Pittsburgh, PA',
      description:
        'Overnight in-home boarding in Pittsburgh, PA: $30 a night for dogs, in a real home and not a kennel, and $20 a night for cats.',
    },
  },

  catSitting: {
    key: 'catSitting',
    intro:
      "Your cat stays in their own home, and Jennifer comes to them. Each 30-minute visit is $15 and covers food, water, litter, play and medication, with photo updates so you can see for yourself.",
    prices: ['catVisit', 'catBoarding'],
    headings: {
      included: 'What happens on every cat sitting visit',
      steps: 'How cat sitting works',
      goodFor: 'Who cat sitting is made for',
      local: 'Cat sitting in Pittsburgh: what to know',
      faq: 'Cat sitting in Pittsburgh: your questions answered',
    },
    included: [
      {
        title: 'Feeding and fresh water',
        body: 'Meals the way your cat likes them, and a fresh bowl of water every visit.',
      },
      {
        title: 'Litter box care',
        body: 'A clean box on every visit.',
      },
      {
        title: 'Playtime and cuddles',
        body: 'Time with a human who actually plays, because a bored cat redecorates.',
      },
      {
        title: 'Medication and special diets',
        body: 'Oral medications, eye drops and special diets are all part of the visit.',
      },
      {
        title: 'Photo updates',
        body: 'A picture of your cat, so you can confirm they are fine and mildly offended that you left.',
      },
    ],
    steps: [
      {
        title: 'Call or text',
        body: "Tell Jennifer about your cat and the dates you'll be away.",
      },
      {
        title: 'Meet & greet',
        body: "A free first visit to meet your cat and learn the routine: where the food lives, what the meds are, and which closet is the favorite hiding spot.",
      },
      {
        title: 'Visits begin',
        body: 'A 30-minute visit at your home, as often as your cat needs.',
      },
      {
        title: 'Get the photo',
        body: 'A picture and a message after each visit.',
      },
    ],
    goodFor: [
      'Cats who hate carriers and car rides',
      'Cats on medication or special diets',
      'Shy cats who feel safest at home',
      'Weekend trips, long vacations and everything in between',
    ],
    localNotes: [
      {
        title: 'Older houses have lots of hiding spots',
        body: "Pittsburgh's older homes are full of radiators, basements and creaky stairs, and a nervous cat will find every one. Tell Jennifer where your cat likes to hide and where the food and litter box live.",
      },
      {
        title: 'Check the window screens',
        body: 'Before you leave, make sure window screens are secure, especially in upper-floor apartments. Cats take birds and squirrels personally.',
      },
    ],
    faqs: [
      {
        q: 'How much does a cat sitter cost in Pittsburgh?',
        a: 'A 30-minute cat sitting visit with Tails to Trails is $15.',
      },
      {
        q: 'What happens during a cat sitting visit?',
        a: 'Feeding, fresh water, litter box care, playtime and cuddles, medication if your cat needs it, and photo updates so you can see for yourself.',
      },
      {
        q: 'Can you give my cat medication?',
        a: 'Yes. Jennifer is experienced with oral medications, eye drops and special diets.',
      },
      {
        q: 'How often should a cat sitter visit?',
        a: "Most cats do well with at least one visit a day while you're away. Cats on medication, older cats and longer trips can call for more. Text Jennifer your dates and your cat's routine and you can work out a schedule together.",
      },
      {
        q: 'Do you offer overnight cat boarding?',
        a: 'Yes. Overnight cat boarding is $20 a night. Text or call to ask how it works for your cat.',
      },
    ],
    related: ['boarding', 'dogWalking', 'yardCleanup'],
    cta: {
      heading: 'Your cat, at home, in good hands',
      body: "Text or call to set up a free meet & greet. Tell Jennifer about your cat's routine, medications and favorite hiding spots.",
      smsBody:
        "Hi Jennifer! I found Tails to Trails online and I'd like to set up cat sitting visits. Could we schedule a free meet & greet?",
    },
    schema: {
      serviceType: 'Cat sitting',
      name: 'Cat Sitting in Pittsburgh, PA',
      description:
        '30-minute cat sitting visits in Pittsburgh, PA for $15: feeding, fresh water, litter box care, playtime, medication and photo updates.',
    },
  },

  yardCleanup: {
    key: 'yardCleanup',
    intro:
      'Jennifer handles the messy part. Regular pet waste and yard waste removal keeps your yard fresh and usable, for $30 a visit.',
    prices: ['yardCleanup'],
    headings: {
      included: 'What yard clean up includes',
      steps: 'How yard clean up works',
      goodFor: 'Who yard clean up is made for',
      local: 'Pittsburgh yard clean up, season by season',
      faq: 'Yard clean up in Pittsburgh: your questions answered',
    },
    included: [
      {
        title: 'Regular yard waste removal',
        body: 'Jennifer picks up and removes pet waste and yard waste so your outdoor space stays fresh.',
      },
      {
        title: 'Scheduled around you',
        body: 'A schedule that fits your yard and your household, not a one-size-fits-all route.',
      },
      {
        title: 'Easy to add',
        body: 'Already have Jennifer walking your dog? Mention yard clean up when you text.',
      },
    ],
    steps: [
      {
        title: 'Call or text',
        body: 'Tell Jennifer where you are in Pittsburgh and how many dogs use the yard.',
      },
      {
        title: 'Talk through the yard',
        body: 'Gate access, where to clean, and how often you would like visits.',
      },
      {
        title: 'Visits begin',
        body: 'Jennifer comes on the schedule you set, at $30 a visit.',
      },
      {
        title: 'Enjoy the yard',
        body: 'Walk across it in bare feet. Host the cookout. Watch where you step a lot less.',
      },
    ],
    goodFor: [
      'Households with one dog or several',
      'People who would rather spend weekends on a trail than in the yard',
      'Anyone tired of watching where they step',
    ],
    localNotes: [
      {
        title: 'Spring thaw reveals everything',
        body: "Snow covers a lot. When it melts, a regular yard clean up keeps winter's leftovers from turning into a spring project.",
      },
      {
        title: 'Pittsburgh yards come in every shape',
        body: 'Sloped, narrow, terraced, shared: tell Jennifer about your yard so visits go smoothly.',
      },
    ],
    faqs: [
      {
        q: 'How much does yard clean up cost?',
        a: 'Yard clean up with Tails to Trails is $30 per visit.',
      },
      {
        q: 'What does yard clean up include?',
        a: 'Regular yard waste removal, including pet waste pickup, so your yard stays fresh. Jennifer handles the messy part.',
      },
      {
        q: 'How often can you visit?',
        a: 'Visits are scheduled around you. Text or call 412-709-0057 and tell Jennifer how often you would like her to come.',
      },
      {
        q: 'How do I get started with yard clean up?',
        a: 'Call or text 412-709-0057 with your neighborhood and a little about your yard, and Jennifer will let you know the next step.',
      },
    ],
    related: ['dogWalking', 'boarding', 'packWalks'],
    cta: {
      heading: 'Let Jennifer redd up the yard',
      body: 'Text or call to get yard clean up on the calendar. It is $30 a visit.',
      smsBody:
        "Hi Jennifer! I found Tails to Trails online and I'd like to ask about yard clean up. Could you let me know the next step?",
    },
    schema: {
      serviceType: 'Yard clean up',
      name: 'Yard Clean Up in Pittsburgh, PA',
      description:
        'Regular pet waste and yard waste removal in Pittsburgh, PA for $30 a visit.',
    },
  },
};
