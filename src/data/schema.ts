// Small JSON-LD builders shared by pages. Facts only (see CLAUDE.md).
import { site, businessId } from './site';

export interface Faq {
  q: string;
  a: string;
  more?: { href: string; text: string };
}

const abs = (path: string) => new URL(path, site.url).href;

export const faqSchema = (items: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.more ? `${f.a} ${f.more.text}: ${abs(f.more.href)}` : f.a },
  })),
});

export const breadcrumbSchema = (trail: { name: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.href) })),
});

export const serviceSchema = (opts: { name: string; serviceType: string; description: string; href: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: abs(opts.href),
  provider: { '@id': businessId },
  areaServed: { '@type': 'AdministrativeArea', name: 'Auckland Region' },
});

export const articleSchema = (opts: { headline: string; description: string; href: string; date: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.headline,
  description: opts.description,
  url: abs(opts.href),
  datePublished: opts.date,
  dateModified: opts.date,
  author: { '@id': businessId },
  publisher: { '@id': businessId },
});
