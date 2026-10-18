import React from 'react';
import { Palette, Edit3, Eye, Send } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Choose a Design',
    description: 'Explore our collection of premium invitation templates crafted with rich Pakistani heritage.',
    icon: Palette,
  },
  {
    number: '02',
    title: 'Personalize',
    description: 'Add couple names, family announcements, multi-event schedules, venue map, and photographs.',
    icon: Edit3,
  },
  {
    number: '03',
    title: 'Preview',
    description: 'Experience the 3D animated envelope and interactive details exactly as your guests will see it.',
    icon: Eye,
  },
  {
    number: '04',
    title: 'Share',
    description: 'Instantly publish your personalized link and send via WhatsApp, Instagram, or high-res QR code.',
    icon: Send,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative bg-background-secondary/50 border-y border-gold-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Simple &amp; Seamless
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-light">
            From design selection to your guest’s WhatsApp screen in four effortless steps.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-[1px] -translate-y-8 bg-gradient-to-r from-transparent via-gold-border to-transparent -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Badge Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-background-card border border-gold-champagne/50 group-hover:border-gold-champagne flex items-center justify-center text-gold-champagne transition-all duration-300 shadow-md group-hover:shadow-gold-sm group-hover:scale-105">
                      <span className="font-serif text-lg font-semibold tracking-wider text-gold-light">
                        {step.number}
                      </span>
                    </div>

                    <div className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-gold-champagne text-background-main flex items-center justify-center text-[10px] shadow">
                      <Icon size={12} strokeWidth={2.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-ivory mb-2 tracking-wide group-hover:text-gold-light transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
