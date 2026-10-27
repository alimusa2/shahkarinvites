import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrownCinematicIntro } from './BrownCinematicIntro';
import { BrownSilkTransition } from './BrownSilkTransition';
import { BrownAtmosphere } from './BrownAtmosphere';
import { BrownInvitationCard } from './BrownInvitationCard';
import { BrownMemoriesGallery } from './BrownMemoriesGallery';
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
  partnerOne = 'Aayan',
  partnerTwo = 'Meher',
  weddingDate = 'Saturday, October 24, 2026',
  venueName = 'The Royal Palm Garden & Pavilion',
  videoSrc = '/wedding%20aniamtion.mp4',
}) => {
  const navigate = useNavigate();
  // State machine: 'intro' (0-5s) -> 'transition' (5-7s) -> 'invitation' (7s+)
  const [stage, setStage] = useState<'intro' | 'transition' | 'invitation'>('intro');
  const [isMuted, setIsMuted] = useState(brownAudio.getIsMuted());
  const [hasCardOpened, setHasCardOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync mute state
  useEffect(() => {
    const unsub = brownAudio.subscribe((muted) => setIsMuted(muted));
    return unsub;
  }, []);

  // Ensure scroll is at top upon mounting or stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [stage]);

  const handleIntroComplete = () => {
    setStage('transition');
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
      {/* SECTION A — CINEMATIC INTRO (0-5s) */}
      {stage === 'intro' && (
        <BrownCinematicIntro
          onComplete={handleIntroComplete}
          videoSrc={videoSrc}
          durationSeconds={5}
        />
      )}

      {/* SECTION B — VIDEO-TO-CARD TRANSITION (5-7s) */}
      {stage === 'transition' && (
        <>
          <BrownSilkTransition onTransitionEnd={handleTransitionEnd} durationMs={1800} />
          {/* Pre-render card atmosphere in background so transition reveals it seamlessly */}
          <div className="opacity-70 scale-95 transition-all duration-1000">
            <BrownAtmosphere>
              <BrownInvitationCard
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
                weddingDate={weddingDate}
                venueName={venueName}
              />
            </BrownAtmosphere>
          </div>
        </>
      )}

      {/* SECTIONS C THROUGH I — COMPLETE INTERACTIVE WEDDING CARD SUITE (7s+) */}
      {stage === 'invitation' && (
        <div className="animate-fade-in relative w-full">
          {/* Persistent Floating Controls Bar (Safe Area Compliant) */}
          <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-50 flex items-center justify-between pointer-events-none bw-safe-top">
            {/* Return to website */}
            <button
              onClick={() => navigate('/')}
              type="button"
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#24140F]/85 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] text-xs transition-all active:scale-95 shadow-md"
              aria-label="Return to Cardiva website"
            >
              <ArrowLeft size={13} />
              <span className="text-[11px] font-sans">Cardiva Home</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24140F]/85 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] text-xs transition-all active:scale-95 shadow-md"
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#D4A86A] animate-pulse" />}
              <span className="text-[10px] uppercase tracking-wider font-sans">
                {isMuted ? 'Muted' : 'Audio On'}
              </span>
            </button>
          </header>

          <BrownAtmosphere>
            <main className="w-full flex flex-col items-center pt-16 sm:pt-20 pb-16">
              {/* SECTION C & D & E: 3D INVITATION CARD & PERSONAL MESSAGE */}
              <BrownInvitationCard
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
                weddingDate={weddingDate}
                venueName={venueName}
                onOpenStateChange={(open) => setHasCardOpened(open)}
              />

              {/* SECTION F: MEMORIES GALLERY */}
              <section aria-label="Memories Gallery" className="w-full">
                <BrownMemoriesGallery />
              </section>

              {/* SECTION G: HIDDEN MESSAGE / POP-UP SURPRISE HEART */}
              <section aria-label="Secret Love Note" className="w-full">
                <BrownSurpriseHeart />
              </section>

              {/* SECTIONS H & I: FINAL EMOTIONAL MESSAGE & END CARD */}
              <section aria-label="Closing & Replay" className="w-full">
                <BrownFinalSection
                  onReplay={handleReplay}
                  onScrollToTop={handleScrollToTop}
                />
              </section>
            </main>
          </BrownAtmosphere>
        </div>
      )}
    </div>
  );
};
