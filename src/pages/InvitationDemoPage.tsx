import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InvitationVideoPlayer } from '../components/InvitationVideoPlayer';
import { InvitationExperience } from '../components/InvitationExperience';

export const InvitationDemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Stages: 'video' (intro/loading video) -> 'opened' (full invitation suite & card)
  const [stage, setStage] = useState<'video' | 'opened'>('video');

  const theme = searchParams.get('theme') || 'emerald-elegance';
  const bride = searchParams.get('bride') || 'Ayesha';
  const groom = searchParams.get('groom') || 'Hamza';
  const venue = searchParams.get('venue') || 'The Grand Palace';
  const customDate = searchParams.get('date');

  const customData = {
    brideName: bride,
    groomName: groom,
    venue: venue,
    ...(customDate ? { date: customDate } : {}),
  };

  // Ensure scroll is at the top when mounting
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // When stage changes to 'opened', force scroll to top card on mobile and desktop
  useEffect(() => {
    if (stage === 'opened') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const raf = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 60);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [stage]);

  const handleVideoComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setStage('opened');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setStage('video');
  };

  return (
    <main className="min-h-screen bg-background-main selection:bg-gold-champagne/30 selection:text-gold-light overflow-x-hidden">
      {/* Intro & Loading Video Stage */}
      {stage === 'video' && (
        <InvitationVideoPlayer
          onComplete={handleVideoComplete}
          videoSrc="/lv_0_20261018142737.mp4"
        />
      )}

      {/* Complete Wedding Invitation Experience & Cards */}
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
