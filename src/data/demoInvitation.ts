export interface EventScheduleItem {
  id: string;
  title: string;
  time: string;
  icon: 'mosque' | 'dinner' | 'car';
  description?: string;
}

export interface InvitationData {
  bismillahText: string;
  bismillahEnglish: string;
  parentsText: string;
  brideName: string;
  groomName: string;
  invitationText: string;
  occasion: string;
  date: string;
  dateDisplay: {
    dayName: string;
    month: string;
    day: string;
    year: string;
    time: string;
  };
  venue: string;
  city: string;
  country: string;
  mapQuery: string;
  storyQuote: string;
  storyParagraph: string;
  coupleImage: string;
  schedule: EventScheduleItem[];
  dressCode: string;
  dressCodeNote: string;
  rsvpDeadline: string;
  targetTimestamp: number; // For countdown
}

export const DEMO_INVITATION: InvitationData = {
  bismillahText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahEnglish: 'In the name of Allah, the Most Gracious, the Most Merciful',
  parentsText: 'TOGETHER WITH THEIR FAMILIES',
  brideName: 'Ayesha',
  groomName: 'Hamza',
  invitationText: 'REQUEST THE PLEASURE OF YOUR COMPANY',
  occasion: 'AT THEIR WEDDING CELEBRATION',
  date: '2026-12-20',
  dateDisplay: {
    dayName: 'SUNDAY',
    month: 'DEC',
    day: '20',
    year: '2026',
    time: 'AT 6:00 PM',
  },
  venue: 'The Grand Palace',
  city: 'Lahore',
  country: 'Pakistan',
  mapQuery: 'The Grand Palace, Main Boulevard, Gulberg, Lahore, Pakistan',
  storyQuote: 'Two hearts, one journey. A lifetime of memories in the making.',
  storyParagraph: 'From the quiet beginnings of friendship to a shared vision of tomorrow, our story has been blessed by the grace of God and the warmth of family. We look forward to beginning our greatest chapter surrounded by the people who mean the world to us.',
  coupleImage: '/assets/couple.jpg',
  schedule: [
    {
      id: 'nikah',
      title: 'Nikah Ceremony',
      time: '6:00 PM',
      icon: 'mosque',
      description: 'Sacred vows and prayers',
    },
    {
      id: 'dinner',
      title: 'Royal Dinner',
      time: '7:30 PM',
      icon: 'dinner',
      description: 'Traditional celebratory feast',
    },
    {
      id: 'rukhsati',
      title: 'Rukhsati',
      time: '11:00 PM',
      icon: 'car',
      description: 'Blessings and farewell',
    },
  ],
  dressCode: 'Traditional Formal',
  dressCodeNote: 'Sherwanis, Kurta Pajamas, Sarees, and Formal Lehengas in festive celebratory colors.',
  rsvpDeadline: '10 December 2026',
  // Target timestamp: 20 Dec 2026 18:00:00 GMT+5
  targetTimestamp: new Date('2026-12-20T18:00:00+05:00').getTime(),
};
