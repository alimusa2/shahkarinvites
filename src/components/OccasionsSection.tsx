import React from 'react';
import { ArrowUpRight, Heart, Moon, Sun, Sparkles, Cake, Briefcase, Compass } from 'lucide-react';

interface OccasionItem {
  name: string;
  urdu: string;
  tagline: string;
  icon: React.ElementType;
}

const OCCASIONS: OccasionItem[] = [
  { name: 'Nikah', urdu: 'نکاح', tagline: 'Sacred vows & intimate family blessings', icon: Moon },
  { name: 'Baraat', urdu: 'بارات', tagline: 'Grand royal procession & celebratory banquet', icon: Compass },
  { name: 'Walima', urdu: 'ولیمہ', tagline: 'Elegant formal reception with loved ones', icon: Heart },
  { name: 'Mehndi & Mayun', urdu: 'مہندی', tagline: 'Festive marigolds, dholak rhythms & joy', icon: Sun },
  { name: 'Engagement', urdu: 'منگنی', tagline: 'The beautiful first promise of forever', icon: Sparkles },
  { name: 'Milestone Birthdays', urdu: 'سالگرہ', tagline: 'Golden jubilees, first birthdays & galas', icon: Cake },
  { name: 'Corporate & VIP Galas', urdu: 'تقریبات', tagline: 'Annual dinners, launch ceremonies & expos', icon: Briefcase },
];

interface OccasionsSectionProps {
  onSelectOccasion?: (occasion: string) => void;
}

export const OccasionsSection: React.FC<OccasionsSectionProps> = ({ onSelectOccasion }) => {
  return (
    <section className="py-20 sm:py-28 relative bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-gold-champagne/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
                Celebrations We Honor
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              Tailored for Every Special Gathering
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md font-light">
            From sacred Nikah ceremonies to celebratory Mehndi nights and prestigious corporate galas.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {OCCASIONS.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectOccasion?.(occ.name)}
                className="group relative p-6 rounded-xl bg-background-card/60 hover:bg-background-card border border-gold-border/25 hover:border-gold-champagne/60 transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 hover:shadow-gold-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gold-border/10 border border-gold-border/30 flex items-center justify-center text-gold-champagne group-hover:border-gold-champagne transition-colors">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="font-arabic text-xl text-gold-champagne/70 group-hover:text-gold-light transition-colors">
                    {occ.urdu}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                      {occ.name}
                    </h3>
                    <ArrowUpRight size={16} className="text-gold-champagne opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-text-secondary text-xs font-light">
                    {occ.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
