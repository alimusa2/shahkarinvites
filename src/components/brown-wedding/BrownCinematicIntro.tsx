import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { brownAudio } from './BrownAudioController';

interface BrownCinematicIntroProps {
  onComplete: () => void;
  videoSrc?: string;
  durationSeconds?: number;
}

export const BrownCinematicIntro: React.FC<BrownCinematicIntroProps> = ({
  onComplete,
  videoSrc = '/wedding%20aniamtion.mp4',
  durationSeconds = 5,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSrc, setCurrentSrc] = useState(videoSrc);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(brownAudio.getIsMuted());

  useEffect(() => {
    const unsub = brownAudio.subscribe((muted) => setIsMuted(muted));
    return unsub;
  }, []);

  // Handle video autoplay politely
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.play().catch(() => {
        // Fallback to muted if browser blocks unmuted playback
        video.muted = true;
        video.play().catch(() => {
          setVideoError(true);
        });
      });
    }

    // Try starting ambient soundtrack if sound is unmuted
    brownAudio.startMusic();
  }, [isMuted]);

  // Timed progress counter (0 to 100% over durationSeconds)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const pct = Math.min(100, (elapsed / durationSeconds) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [durationSeconds, onComplete]);

  const toggleSound = () => {
    const newMuted = brownAudio.toggleMute();
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#170C08] flex items-center justify-center overflow-hidden select-none">
      {/* Background Video or Fallback Canvas */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={currentSrc}
          playsInline
          autoPlay
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            if (currentSrc !== '/lv_0_20261018142737.mp4') {
              setCurrentSrc('/lv_0_20261018142737.mp4');
            } else {
              setVideoError(true);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
          style={{ objectPosition: 'center' }}
        />
      ) : null}

      {/* Cinematic Dark Chocolate Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(36, 20, 15, 0.45) 0%, rgba(23, 12, 8, 0.92) 80%, #0F0705 100%),
            linear-gradient(to bottom, rgba(23, 12, 8, 0.6) 0%, transparent 30%, transparent 70%, rgba(23, 12, 8, 0.85) 100%)
          `,
        }}
      />

      {/* Fallback emblem only displayed if video fails to load */}
      {videoError && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-sm animate-fade-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{
              border: '1px solid rgba(184, 138, 85, 0.4)',
              boxShadow: '0 0 25px rgba(184, 138, 85, 0.25)',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-[#D4A86A] animate-ping" />
          </div>
        </div>
      )}

      {/* Minimalist Bottom Edge Golden Progress Line (unobtrusive, no text) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/40 z-20 pointer-events-none" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#B88A55] via-[#FFF1DC] to-[#D4A86A] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Controls: Audio Mute & Skip Intro */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto bw-safe-top">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24140F]/80 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] text-xs transition-all active:scale-95 shadow-md"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse" />}
          <span className="text-[10px] uppercase tracking-wider font-sans">
            {isMuted ? 'Muted' : 'Music On'}
          </span>
        </button>

        {/* Skip Intro */}
        <button
          onClick={onComplete}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24140F]/80 backdrop-blur-md border border-[#B88A55]/50 text-[#D4A86A] hover:text-[#FFF1DC] hover:border-[#D4A86A] text-xs font-medium tracking-wider uppercase transition-all active:scale-95 shadow-md"
          aria-label="Skip cinematic intro"
        >
          <span className="text-[11px] font-sans">Skip</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
