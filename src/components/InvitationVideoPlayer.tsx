import React, { useRef, useEffect } from 'react';

interface InvitationVideoPlayerProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const InvitationVideoPlayer: React.FC<InvitationVideoPlayerProps> = ({
  onComplete,
  videoSrc = '/lv_0_20261018142737.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound first; fallback to muted if browser blocks unmuted autoplay
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none touch-none overscroll-none">
      {/* Ambient background for desktop viewports */}
      <div className="absolute inset-0 bg-background-main opacity-90 hidden sm:block pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-emerald-950/40 via-background-main/90 to-black hidden sm:block pointer-events-none" />

      {/* Video Container: Edge-to-edge 100% on mobile, luxury mobile frame on desktop */}
      <div className="relative w-full h-[100dvh] sm:h-[90vh] sm:max-h-[860px] sm:max-w-[430px] sm:rounded-3xl overflow-hidden sm:shadow-2xl sm:border sm:border-gold-border/30 bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          autoPlay
          onEnded={onComplete}
          className="w-full h-full object-cover"
        />

        {/* Minimalist Skip Button */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-gold-border/40 text-gold-champagne hover:text-gold-light text-xs font-medium tracking-wider uppercase transition-all active:scale-95 shadow-lg"
          aria-label="Skip to invitation"
        >
          <span>Skip</span>
          <span className="text-[10px]">→</span>
        </button>
      </div>
    </div>
  );
};
