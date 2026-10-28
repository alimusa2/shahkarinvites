import React from 'react';
import { PRICING_TIERS, PricingTier } from '../data/pricing';
import { Check, Sparkles, AlertCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tier: PricingTier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Transparent Investment
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight mb-4">
            Simple, Accessible Pricing
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-light">
            Crafted for Pakistani celebrations of every scale. No hidden fees or recurring subscriptions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? 'bg-gradient-to-b from-background-card via-[#122319] to-background-card border-2 border-gold-champagne shadow-gold-md lg:-translate-y-2'
                  : 'bg-background-card/80 border border-gold-border/30 hover:border-gold-border/70 hover:shadow-gold-sm'
              }`}
            >
              {/* Most popular badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted text-background-main shadow-md flex items-center gap-1.5">
                    <Sparkles size={11} />
                    <span>{tier.badge}</span>
                  </span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-ivory mb-2 tracking-wide">
                    {tier.name}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-light min-h-[38px]">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display in PKR */}
                <div className="mb-8 pb-6 border-b border-gold-border/20">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-ivory tracking-tight">
                      {tier.pricePKR}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted uppercase tracking-wider block mt-1">
                    One-time payment • Includes hosting ({tier.usdEquivalent})
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary font-light">
                      <span className="w-4 h-4 rounded-full bg-gold-border/20 text-gold-champagne flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectTier(tier)}
                  className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted text-background-main hover:brightness-110 shadow-gold-sm hover:shadow-gold-md'
                      : 'border border-gold-border hover:border-gold-champagne text-gold-champagne hover:bg-gold-champagne/10'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explicit Backend Disclaimer Notice */}
        <div className="mt-12 p-4 rounded-xl bg-background-card/50 border border-gold-border/20 max-w-2xl mx-auto flex items-start gap-3 text-xs text-text-muted">
          <AlertCircle size={16} className="text-gold-champagne shrink-0 mt-0.5" />
          <p>
            <strong className="text-gold-champagne/90">Demonstration pricing:</strong> These are current live package rates in Pakistani Rupees. Complete order fulfillment, direct WhatsApp onboarding, and payment processing are managed via customer inquiry during this preview release.
          </p>
        </div>

      </div>
    </section>
  );
};
