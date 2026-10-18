import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { ProcessSection } from '../components/ProcessSection';
import { TemplateGallery } from '../components/TemplateGallery';
import { OccasionsSection } from '../components/OccasionsSection';
import { PricingSection } from '../components/PricingSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { CustomizerModal } from '../components/CustomizerModal';
import { InquiryModal } from '../components/InquiryModal';
import { CardivaLoader } from '../components/CardivaLoader';
import { InvitationTemplate } from '../data/templates';
import { PricingTier } from '../data/pricing';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('emerald-elegance');
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const seen = sessionStorage.getItem('cardiva_loader_seen');
    if (seen) {
      setIsLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('cardiva_loader_seen', 'true');
    setIsLoading(false);
  };

  const handleSelectTemplate = (template: InvitationTemplate) => {
    setSelectedTemplateId(template.id);
    setCustomizerOpen(true);
  };

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setInquiryOpen(true);
  };

  const handleOccasionClick = (_occasion: string) => {
    const el = document.getElementById('templates');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-main text-text-primary selection:bg-gold-champagne/30 selection:text-gold-light">
      {/* Engaging Luxury Card Unfolding Loading Effect */}
      {isLoading && <CardivaLoader onComplete={handleLoaderComplete} />}

      <Navbar onOpenCustomizer={() => setCustomizerOpen(true)} />

      <main className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Section B: Hero */}
        <Hero onOpenCustomizer={() => setCustomizerOpen(true)} />

        {/* Section C: Features */}
        <FeatureSection />

        {/* Section D: How It Works */}
        <ProcessSection />

        {/* Section E: Invitation Templates */}
        <TemplateGallery
          onSelectTemplate={handleSelectTemplate}
          selectedTemplateId={selectedTemplateId}
        />

        {/* Section G: Additional Occasions */}
        <OccasionsSection onSelectOccasion={handleOccasionClick} />

        {/* Section H: Pricing */}
        <PricingSection onSelectTier={handleSelectTier} />

        {/* Section I: Final CTA */}
        <FinalCTA
          onOpenCustomizer={() => setCustomizerOpen(true)}
          onExploreDesigns={() => {
            const el = document.getElementById('templates');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Section J: Footer */}
      <Footer onOpenContact={() => setInquiryOpen(true)} />

      {/* Interactive Modals */}
      <CustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        defaultTemplateId={selectedTemplateId}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  );
};
