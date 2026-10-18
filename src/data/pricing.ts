export interface PricingTier {
  id: string;
  name: string;
  pricePKR: string;
  usdEquivalent: string;
  tagline: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    pricePKR: 'PKR 1,499',
    usdEquivalent: '~$5.50',
    tagline: 'Ideal for intimate family gatherings & announcements.',
    features: [
      'Access to curated invitation template',
      'Personalized couple & parents names',
      'Essential event date, time & venue',
      'Instant shareable WhatsApp & web link',
      'Direct Google Maps venue navigation',
      'Mobile-optimized responsive design',
      '30 days active link hosting',
    ],
    ctaText: 'Choose Starter',
  },
  {
    id: 'premium',
    name: 'Premium',
    pricePKR: 'PKR 2,999',
    usdEquivalent: '~$11.00',
    tagline: 'Our most loved package for complete wedding celebrations.',
    isPopular: true,
    badge: 'Most Popular',
    features: [
      'Complete 3D animated envelope opening',
      'All premium Mughal & floral design themes',
      'Multi-event schedule (Nikah, Dinner, Rukhsati)',
      'Interactive RSVP system with live guest counter',
      'Couple story & high-resolution portrait gallery',
      'One-tap "Add to Calendar" (.ics & Google)',
      'Atmospheric music & audio chimes toggle',
      'Live wedding countdown timer',
      'Unlimited WhatsApp & social link shares',
      '90 days active link hosting & support',
    ],
    ctaText: 'Choose Premium',
  },
  {
    id: 'signature',
    name: 'Signature Bespoke',
    pricePKR: 'PKR 5,999',
    usdEquivalent: '~$21.50',
    tagline: 'Exquisite tailored digital experience for luxury weddings.',
    features: [
      'Bespoke visual art direction & custom monogram',
      'Everything in Premium tier included',
      'Personalized audio soundtrack / family voice note',
      'Custom Urdu / Arabic calligraphy of names',
      'VIP RSVP management & CSV guest export',
      'Custom domain or custom branded vanity URL',
      'Priority dedicated designer on WhatsApp',
      '1 full year active hosting & unlimited updates',
    ],
    ctaText: 'Inquire for Signature',
    badge: 'VIP Bespoke',
  },
];
