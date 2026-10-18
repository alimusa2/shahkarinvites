import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InvitationLoader } from '../components/InvitationLoader';
import { InvitationEnvelope } from '../components/InvitationEnvelope';
import { InvitationExperience } from '../components/InvitationExperience';
import { TEMPLATES } from '../data/templates';

export const InvitationDemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Stages: 'loading' -> 'envelope' -> 'opened'
  const [stage, setStage] = useState<'loading' | 'envelope' | 'opened'>('loading');

  const theme = searchParams.get('theme') || 'emerald-elegance';
  const bride = searchParams.get('bride') || 'Ayesha';
  const groom = searchParams.get('groom') || 'Hamza';
  const venue = searchParams.get('venue') || 'The Grand Palace';
  const customDate = searchParams.get('date');

  const selectedTemplate = TEMPLATES.find((t) => t.id === theme) || TEMPLATES[0];

  const customData = {
    brideName: bride,
    groomName: groom,
    venue: venue,
    ...(customDate ? { date: customDate } : {}),
  };

  const handleAssetsLoaded = () => {
    setStage('envelope');
  };

  const handleEnvelopeComplete = () => {
    setStage('opened');
  };

  const handleReplay = () => {
    // Replay sequence from Stage 2 (Envelope) without resetting any user RSVP data
    setStage('envelope');
  };

  return (
    <main className="min-h-screen bg-background-main selection:bg-gold-champagne/30 selection:text-gold-light overflow-x-hidden">
      {/* Stage 1: Refined loading screen preloading essential assets */}
      {stage === 'loading' && (
        <InvitationLoader
          onLoaded={handleAssetsLoaded}
          cardImage={selectedTemplate.image}
          coupleImage="/assets/couple.jpg"
        />
      )}

      {/* Stage 2 & 3: Envelope Reveal & 6-step Interactive Opening Animation */}
      {stage === 'envelope' && (
        <InvitationEnvelope
          onOpenComplete={handleEnvelopeComplete}
          brideName={bride}
          groomName={groom}
          themeId={theme}
        />
      )}

      {/* Existing Complete Wedding Invitation Experience (Preserved 100%) */}
      {stage === 'opened' && (
        <div className="animate-fade-in">
          <InvitationExperience
            customData={customData}
            templateId={theme}
            onReplayEnvelope={handleReplay}
          />
        </div>
      )}
    </main>
  );
};
