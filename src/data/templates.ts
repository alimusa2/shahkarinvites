export interface InvitationTemplate {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  theme: {
    bg: string;
    cardBg: string;
    accent: string;
    text: string;
    border: string;
  };
  image: string;
  badge?: string;
  tags: string[];
}

export const TEMPLATES: InvitationTemplate[] = [
  {
    id: 'emerald-elegance',
    name: 'Emerald Elegance',
    category: 'Wedding & Walima',
    subtitle: 'Mughal Arch & Garden Roses',
    description: 'Deep velvet emerald canvas framed by delicate ivory roses, warm fairy lights, and champagne-gold calligraphy.',
    theme: {
      bg: '#07160F',
      cardBg: '#0D2419',
      accent: '#D6B777',
      text: '#F5F0E6',
      border: 'rgba(214, 183, 119, 0.35)',
    },
    image: '/assets/emerald-card.jpg',
    badge: 'Signature Bestseller',
    tags: ['Nikah', 'Baraat', 'Walima'],
  },
  {
    id: 'ivory-heritage',
    name: 'Ivory Heritage',
    category: 'Nikah & Reception',
    subtitle: 'Embossed Cotton & Antique Filigree',
    description: 'Timeless hand-crafted cotton paper aesthetic with fine Mughal arch embossing and antique gold flourishes.',
    theme: {
      bg: '#141311',
      cardBg: '#F5F0E6',
      accent: '#9A7836',
      text: '#1C1915',
      border: 'rgba(154, 120, 54, 0.3)',
    },
    image: '/assets/ivory-card.jpg',
    badge: 'Classic Heritage',
    tags: ['Nikah', 'Formal Reception'],
  },
  {
    id: 'midnight-royal',
    name: 'Midnight Royal',
    category: 'Baraat & Royal Reception',
    subtitle: 'Black Velvet & Baroque Gold',
    description: 'Regal midnight black accented with intricate baroque gold borders and Islamic geometric architecture.',
    theme: {
      bg: '#08080A',
      cardBg: '#121217',
      accent: '#E5C178',
      text: '#F5F0E6',
      border: 'rgba(229, 193, 120, 0.4)',
    },
    image: '/assets/midnight-card.jpg',
    badge: 'Royal Edition',
    tags: ['Baraat', 'Walima', 'VIP Gala'],
  },
  {
    id: 'floral-romance',
    name: 'Floral Romance',
    category: 'Nikah & Reception',
    subtitle: 'Blush Watercolor & Foil Botanicals',
    description: 'Romantic blush tones layered with soft watercolor washes, blooming english roses, and delicate fairy-lit arches.',
    theme: {
      bg: '#140E10',
      cardBg: '#211418',
      accent: '#E4A8B3',
      text: '#F8EEF0',
      border: 'rgba(228, 168, 179, 0.3)',
    },
    image: '/assets/floral-card.jpg',
    tags: ['Nikah', 'Baraat', 'Walima'],
  },
  {
    id: 'mehndi-celebration',
    name: 'Mehndi Celebration',
    category: 'Mehndi & Mayun',
    subtitle: 'Olive Velvet, Marigold & Tassels',
    description: 'Festive olive and sage hues framed by marigold garlands, traditional golden jhumka motifs, and celebratory warmth.',
    theme: {
      bg: '#11140E',
      cardBg: '#1C2216',
      accent: '#E5B842',
      text: '#F7F4EA',
      border: 'rgba(229, 184, 66, 0.35)',
    },
    image: '/assets/mehndi-card.jpg',
    badge: 'Festive Special',
    tags: ['Mehndi', 'Mayun', 'Sangeet'],
  },
  {
    id: 'brown-luxury',
    name: 'Espresso & Antique Gold',
    category: 'Wedding & Walima',
    subtitle: 'Dark Walnut Arch & Foil Florals',
    description: 'Opulent espresso and walnut canvas adorned with antique gold filigree, warm candlelight, floating petals, and handcrafted paper unfolding.',
    theme: {
      bg: '#170C08',
      cardBg: '#24140F',
      accent: '#B88A55',
      text: '#F7F0E5',
      border: 'rgba(184, 138, 85, 0.4)',
    },
    image: '/assets/brown-card/cover.jpg',
    badge: 'New Luxury Edition',
    tags: ['Nikah', 'Walima', 'VIP Edition'],
  },
];
