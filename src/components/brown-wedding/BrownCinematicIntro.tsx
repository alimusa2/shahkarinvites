import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { brownAudio } from './BrownAudioController';

interface BrownCinematicIntroProps {
  onComplete: () => void;
  videoSrc?: string;
  isExiting?: boolean;
}

export const BrownCinematicIntro: React.FC<BrownCinematicIntroProps> = ({
  onComplete,
  videoSrc = '/wedding-animation.mp4',
  isExiting = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSrc, setCurrentSrc] = useState(videoSrc);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(brownAudio.getIsMuted());
  const hasCompletedRef = useRef(false);

  // Sync mute state with audio controller
  useEffect(() => {
    const unsub = brownAudio.subscribe((muted) => setIsMuted(muted));
    return unsub;
  }, []);

  const triggerCompletion = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Robust video playback & autoplay handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted autoplay, mute and retry immediately
          video.muted = true;
          video.play().catch(() => {
            // If playback still blocked, allow user skip or let timeout handle it
          });
        });
      }
    };

    attemptPlay();

    // Start ambient music if sound is enabled
    brownAudio.startMusic();
  }, [isMuted, currentSrc]);

  // Fallback timer if video stalls or takes too long to finish (~12s maximum)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        triggerCompletion();
      }
    }, 13000);

    return () => clearTimeout(fallbackTimer);
  }, [triggerCompletion]);

  // Video time update event to synchronize progress line with real playback
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const pct = Math.min(100, (video.currentTime / video.duration) * 100);
      setProgress(pct);
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    triggerCompletion();
  };

  const handleVideoError = () => {
    // Try alternate paths in order: /wedding-animation.mp4 -> /wedding aniamtion.mp4 -> /lv_0_20261018142737.mp4
    if (currentSrc === '/wedding-animation.mp4') {
      setCurrentSrc('/wedding%20aniamtion.mp4');
    } else if (currentSrc === '/wedding%20aniamtion.mp4' || currentSrc === '/wedding aniamtion.mp4') {
      setCurrentSrc('/lv_0_20261018142737.mp4');
    } else {
      setVideoError(true);
    }
  };

  const toggleSound = () => {
    const newMuted = brownAudio.toggleMute();
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#120906] flex items-center justify-center overflow-hidden select-none transition-all duration-1000 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Video Layer */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={currentSrc}
          playsInline
          autoPlay
          muted={isMuted}
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ objectPosition: 'center' }}
        />
      ) : null}

      {/* Elegant Shimmer Loader while video prepares */}
      {!videoLoaded && !videoError && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full border border-[#B88A55]/40 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(184,138,85,0.3)] bg-[#24140F]/60 backdrop-blur-md">
            <Sparkles size={24} className="text-[#D4A86A] animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A86A] font-sans font-medium">
            Preparing Wedding Suite...
          </span>
        </div>
      )}

      {/* Cinematic Dark Espresso & Gold Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(36, 20, 15, 0.3) 0%, rgba(23, 12, 8, 0.85) 75%, #0F0705 100%),
            linear-gradient(to bottom, rgba(23, 12, 8, 0.5) 0%, transparent 25%, transparent 75%, rgba(23, 12, 8, 0.8) 100%)
          `,
        }}
      />

      {/* Fallback emblem if video fails to load */}
      {videoError && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-sm animate-fade-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-[#24140F]/80 backdrop-blur-md"
            style={{
              border: '1.5px solid rgba(184, 138, 85, 0.5)',
              boxShadow: '0 0 30px rgba(184, 138, 85, 0.3)',
            }}
          >
            <Sparkles size={26} className="text-[#D4A86A]" />
          </div>
          <p className="bw-font-script text-3xl text-[#FFF1DC] mb-2">
            A Wedding Celebration
          </p>
          <button
            onClick={triggerCompletion}
            type="button"
            className="mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFF1DC] via-[#D4A86A] to-[#B88A55] text-[#24140F] font-semibold text-xs uppercase tracking-wider font-sans shadow-lg"
          >
            View Invitation Card
          </button>
        </div>
      )}

      {/* Bottom Minimalist Golden Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-black/50 z-20 pointer-events-none" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#B88A55] via-[#FFF1DC] to-[#D4A86A] transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(212,168,106,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Top Controls: Sound Toggle & Skip */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-auto bw-safe-top">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24140F]/85 backdrop-blur-md border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] text-xs transition-all active:scale-95 shadow-md"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#D4A86A] animate-pulse" />}
          <span className="text-[10px] uppercase tracking-wider font-sans">
            {isMuted ? 'Muted' : 'Music On'}
          </span>
        </button>

        {/* Skip Intro Directly to Invitation */}
        <button
          onClick={triggerCompletion}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24140F]/85 backdrop-blur-md border border-[#B88A55]/50 text-[#D4A86A] hover:text-[#FFF1DC] hover:border-[#D4A86A] text-xs font-medium tracking-wider uppercase transition-all active:scale-95 shadow-md group"
          aria-label="Skip to wedding invitation card"
        >
          <span className="text-[11px] font-sans">Skip to Card</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

