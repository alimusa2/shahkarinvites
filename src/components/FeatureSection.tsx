import { Layers, Sparkles, Share2, UserCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: 'Premium Designs',
    description: 'Beautifully designed invitations inspired by modern luxury and timeless Pakistani traditions.',
  },
  {
    icon: Sparkles,
    title: 'Smooth Animations',
    description: 'Elegant transitions, 3D envelope opening, and interactive details that make every invitation memorable.',
  },
  {
    icon: Share2,
    title: 'Share Anywhere',
    description: 'Share your invitation instantly through WhatsApp, Instagram, QR code, or direct personal link.',
  },
  {
    icon: UserCheck,
    title: 'RSVP & Guest List',
    description: 'Make it easy for guests to confirm attendance and keep family headcounts organized in real-time.',
  },
];

export const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Why Choose Cardiva
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight mb-4">
            Reimagining the Wedding Invitation
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-light">
            Crafted for couples and families who appreciate bespoke aesthetics, effortless sharing, and unforgettable first impressions.
          </p>
        </div>

        {/* 4 Feature Columns matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-background-card/80 hover:bg-background-card p-7 rounded-2xl border border-gold-border/30 hover:border-gold-champagne/60 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-gold-sm hover:-translate-y-1"
              >
                {/* Gold Line Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-gold-border/10 border border-gold-border/50 flex items-center justify-center text-gold-champagne mb-5 group-hover:scale-110 group-hover:border-gold-champagne transition-all">
                  <Icon size={26} strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-xl text-ivory mb-3 tracking-wide">
                  {feature.title}
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Subtle bottom gold glow */}
                <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-champagne/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
