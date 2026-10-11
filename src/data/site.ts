// Confirmed business facts used across the site. Change them here, not in components.
export const site = {
  name: 'TRANS STAR',
  legalName: 'TRANS STAR LTD',
  url: 'https://transstar.co.nz',
  phone: { display: '022 075 1526', href: 'tel:+64220751526', intl: '+64220751526' },
  email: 'trans_starnz@yahoo.co.nz',
  region: 'Auckland, New Zealand',
  // Google Business Profile is a service-area business with the street hidden: never publish the street.
  locality: 'Ellerslie',
  postalCode: '1051',
  summary:
    'Small Auckland refrigerated transport company. Chilled, frozen and dry goods across the Auckland region, Sunday to Friday, at any time of day.',
};

export interface Service {
  href: string;
  name: string;
  temp: string;
  blurb: string;
  linkText: string;
  serviceType: string;
}

// The three service pages. Order is the order they appear on the home page and in the footer.
export const services: Service[] = [
  {
    href: '/chilled-freight-auckland/',
    name: 'Chilled freight',
    temp: 'Set points from 2°C',
    blurb: 'Dairy, fresh meat, seafood, produce and chilled ready meals, kept cold from pick-up to dock.',
    linkText: 'Chilled freight in Auckland',
    serviceType: 'Chilled freight transport',
  },
  {
    href: '/frozen-freight-auckland/',
    name: 'Frozen freight',
    temp: 'Down to −18°C',
    blurb: 'Frozen meat, seafood, ready meals and ingredients, held frozen hard across Auckland.',
    linkText: 'Frozen freight in Auckland',
    serviceType: 'Frozen freight transport',
  },
  {
    href: '/dry-goods-delivery-auckland/',
    name: 'Dry goods',
    temp: 'No refrigeration needed',
    blurb: 'Pallets of dry and ambient goods, on their own or riding with a chilled or frozen load.',
    linkText: 'Dry goods and pallet delivery',
    serviceType: 'Dry goods and pallet delivery',
  },
];

export const guide = {
  href: '/chilled-frozen-transport-temperatures/',
  name: 'Transport temperatures guide',
  linkText: 'Guide to chilled and frozen transport temperatures',
};

// Shared JSON-LD id for the business, so every page's Service/Article points at the same entity.
export const businessId = `${site.url}/#business`;

// Every page, for the sitemap.
export const pages = ['/', ...services.map((s) => s.href), guide.href];
