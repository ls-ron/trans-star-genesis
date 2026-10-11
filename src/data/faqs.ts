// Home page FAQ. Questions follow real searches (see SEO.md section 4). Facts only.
import type { Faq } from './schema';
import { guide } from './site';

export const homeFaqs: Faq[] = [
  {
    q: "What's included in the free first delivery?",
    a: "One delivery for each new business, at no charge. If the job needs a return trip or a second load, that part is billed. Urgent loads can sometimes be the first delivery. We'll sort that out on the call.",
  },
  {
    q: 'How much does refrigerated transport cost in Auckland?',
    a: 'It depends on how many pallets, how far, what time and how often you ship. We quote each job, prices excl. GST, and your first delivery with us is free.',
  },
  {
    q: 'Can you carry chilled, frozen and dry goods in one load?',
    a: 'Yes. Chilled, frozen and dry goods can share a load, each kept at its own temperature.',
    more: { href: '/dry-goods-delivery-auckland/', text: 'More on dry goods and pallet delivery.' },
  },
  {
    q: 'How do you record temperatures?',
    a: "By hand. We check the unit's set point and the product temperature at every pick-up and drop and write them down. If you need proof, we'll send a photo of the reading the same day.",
    more: { href: guide.href, text: 'Read our guide to transport temperatures.' },
  },
  {
    q: 'Are you a refrigerated courier?',
    a: "We're a refrigerated truck service rather than a parcel courier, but there's no minimum load. One pallet or a full truck.",
  },
  {
    q: 'Where do you go?',
    a: "Anywhere in the Auckland region, Sunday to Friday, at any time of day. We're based in Ellerslie.",
  },
  { q: 'Is there a minimum?', a: 'No. One pallet or a full truck. We prefer regular runs, booked at least 48 hours ahead.' },
  { q: 'Do prices include GST?', a: 'No. All prices are quoted excluding GST.' },
];
