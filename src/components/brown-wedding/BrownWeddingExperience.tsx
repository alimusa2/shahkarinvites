import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrownCinematicIntro } from './BrownCinematicIntro';
import { BrownSilkTransition } from './BrownSilkTransition';
import { BrownAtmosphere } from './BrownAtmosphere';
import { BrownInvitationCard } from './BrownInvitationCard';
import { BrownCountdown } from './BrownCountdown';
import { BrownEventSchedule } from './BrownEventSchedule';
import { BrownVenueLocation } from './BrownVenueLocation';
import { BrownMemoriesGallery } from './BrownMemoriesGallery';
import { BrownInteractiveRSVP } from './BrownInteractiveRSVP';
import { BrownSurpriseHeart } from './BrownSurpriseHeart';
import { BrownFinalSection } from './BrownFinalSection';
import { brownAudio } from './BrownAudioController';

import './brown-wedding.css';

interface BrownWeddingExperienceProps {
  partnerOne?: string;
  partnerTwo?: string;
  weddingDate?: string;
  venueName?: string;
  videoSrc?: string;
}

export const BrownWeddingExperience: React.FC<BrownWeddingExperienceProps> = ({
  partnerOne = 'Ayesha',
  partnerTwo = 'Zayd',
  weddingDate = 'Saturday, October 24, 2026',
  venueName = 'The Royal Palm Garden & Pavilion',
  videoSrc = '/wedding-animation.mp4',
}) => {
  const navigate = useNavigate();
  // State machine: 'intro' (playing video) -> 'transitioning' (smooth crossfade & gold silk sweep) -> 'invitation' (fully opened)
  const [stage, setStage] = useState<'intro' | 'transitioning' | 'invitation'>('intro');
  const [isMuted, setIsMuted] = useState(brownAudio.getIsMuted());
  const [, setHasCardOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync mute state
  useEffect(() => {
    const unsub = brownAudio.subscribe((muted) => setIsMuted(muted));
    return unsub;
  }, []);

  // Ensure scroll is at top upon mounting
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleIntroComplete = () => {
    // Initiate smooth crossfade transition
    setStage('transitioning');
  };

  const handleTransitionEnd = () => {
    setStage('invitation');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setHasCardOpened(false);
    setStage('intro');
  };

  const handleScrollToTop = () => {
    const el = document.getElementById('invitation-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    brownAudio.toggleMute();
  };

  return (
    <div
      ref={containerRef}
      className="bw-card-root min-h-screen min-h-[100svh] w-full bg-[#120906] text-[#F7F0E5] relative overflow-x-hidden selection:bg-[#B88A55]/30 selection:text-[#FFF1DC]"
    >
      {/* CINEMATIC INTRO VIDEO OVERLAY (Mounts on top; dissolves seamlessly into the card) */}
      {(stage === 'intro' || stage === 'transitioning') && (
        <BrownCinematicIntro
          onComplete={handleIntroComplete}
          videoSrc={videoSrc}
          isExiting={stage === 'transitioning'}
        />
      )}

      {/* LUXURY GOLDEN SILK VEIL CROSSFADE DURING TRANSITION */}
      {stage === 'transitioning' && (
        <BrownSilkTransition onTransitionEnd={handleTransitionEnd} durationMs={1100} />
      )}

      {/* INVITATION SUITE (Mounted continuously beneath the video so reveal is 100% flicker-free) */}
      <div
        className={`relative w-full transition-all duration-1000 ease-out ${
          stage === 'intro'
            ? 'opacity-40 scale-[0.97] pointer-events-none'
            : stage === 'transitioning'
            ? 'opacity-90 scale-[0.99] pointer-events-none'
            : 'opacity-100 scale-100 animate-fade-in'
        }`}
      >
        {/* Persistent Floating Safe-Area Controls Header */}
        <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-40 flex items-center justify-between pointer-events-none bw-safe-top">
          {/* Return to Cardiva */}
          <button
            onClick={() => navigate('/')}
            type="button"
            className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24140F]/90 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] hover:border-[#D4A86A] text-xs transition-all active:scale-95 shadow-md"
            aria-label="Return to Cardiva website"
          >
            <ArrowLeft size={13} />
            <span className="text-[11px] font-sans">Cardiva Home</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            type="button"
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24140F]/90 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] hover:border-[#D4A86A] text-xs transition-all active:scale-95 shadow-md"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#D4A86A] animate-pulse" />}
            <span className="text-[10px] uppercase tracking-wider font-sans">
              {isMuted ? 'Muted' : 'Audio On'}
            </span>
          </button>
        </header>

        <BrownAtmosphere>
          <main className="w-full flex flex-col items-center pt-16 sm:pt-20 pb-20 px-2 sm:px-4">
            {/* 3D INVITATION CARD & INNER CEREMONY DETAILS */}
            <BrownInvitationCard
              partnerOne={partnerOne}
              partnerTwo={partnerTwo}
              weddingDate={weddingDate}
              venueName={venueName}
              onOpenStateChange={(open) => setHasCardOpened(open)}
            />

            {/* LIVE WEDDING COUNTDOWN */}
            <section aria-label="Celebration Countdown" className="w-full max-w-lg">
              <BrownCountdown />
            </section>

            {/* ITINERARY & CELEBRATION SCHEDULE */}
            <section aria-label="Event Itinerary" className="w-full max-w-lg">
              <BrownEventSchedule
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
                weddingDate={weddingDate}
                venueName={venueName}
              />
            </section>

            {/* INTERACTIVE VENUE MAP & LOCATION GUIDE */}
            <section aria-label="Venue Location and Directions" className="w-full max-w-lg">
              <BrownVenueLocation
                venueName={venueName}
                mapQuery="Royal Palm Golf and Country Club, Lahore"
              />
            </section>

            {/* CHERISHED MOMENTS GALLERY */}
            <section aria-label="Wedding Memories Gallery" className="w-full max-w-lg">
              <BrownMemoriesGallery />
            </section>

            {/* INTERACTIVE RSVP & GUEST BLESSINGS */}
            <section aria-label="RSVP and Guestbook" className="w-full max-w-lg">
              <BrownInteractiveRSVP
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
              />
            </section>

            {/* SACRED WEDDING BLESSING */}
            <section aria-label="Heartfelt Wedding Blessing" className="w-full max-w-lg">
              <BrownSurpriseHeart />
            </section>

            {/* CLOSING & REPLAY */}
            <section aria-label="Closing & Replay" className="w-full max-w-lg">
              <BrownFinalSection
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
                onReplay={handleReplay}
                onScrollToTop={handleScrollToTop}
              />
            </section>
          </main>
        </BrownAtmosphere>
      </div>
    </div>
  );
};
