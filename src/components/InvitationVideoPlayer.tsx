import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play, Pause, Sparkles } from 'lucide-react';

interface InvitationVideoPlayerProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const InvitationVideoPlayer: React.FC<InvitationVideoPlayerProps> = ({
  onComplete,
  videoSrc = '/lv_0_20261018142737.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with sound first; fallback to muted if browser blocks it
    const tryAutoplay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch {
        // Browser prevented unmuted autoplay
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };

    tryAutoplay();
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
      setDuration(video.duration);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-main flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-950/40 via-background-main to-background-main pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-gold-champagne/5 blur-3xl pointer-events-none" />

      {/* Top Header / Branding */}
      <header className="relative z-10 w-full max-w-lg flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-champagne animate-pulse" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-champagne font-serif font-medium">
            Cardiva Haute Atelier
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-gold-champagne/20 border border-gold-border/60 text-gold-champagne hover:text-gold-light text-xs font-medium tracking-wider uppercase transition-all shadow-lg active:scale-95"
        >
          <span>Skip to Card</span>
          <SkipForward size={13} />
        </button>
      </header>

      {/* Video Container */}
      <div
        onClick={togglePlay}
        className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-gold-border/40 bg-black cursor-pointer group flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={onComplete}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          className="w-full h-full object-cover"
        />

        {/* Overlay Play/Pause indicator on click / pause */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold-champagne/90 text-background-main flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
              <Play size={28} className="translate-x-0.5 fill-current" />
            </div>
          </div>
        )}

        {/* Top Sound Notification Pill if muted by browser */}
        {isMuted && hasStarted && (
          <button
            onClick={toggleMute}
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-champagne/50 text-gold-light text-xs font-medium tracking-wide shadow-lg hover:bg-gold-champagne hover:text-background-main transition-colors"
          >
            <VolumeX size={14} className="text-amber-400" />
            <span>Tap to Unmute</span>
          </button>
        )}

        {/* Bottom Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2 pointer-events-auto"
        >
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-champagne to-gold-light transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gold-champagne/90 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-1 rounded-full hover:text-white transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={toggleMute}
                className="p-1 rounded-full hover:text-white transition-colors flex items-center gap-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span className="text-[10px] hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono opacity-80">
                {videoRef.current ? Math.floor(videoRef.current.currentTime) : 0}s
                {duration > 0 ? ` / ${Math.floor(duration)}s` : ''}
              </span>
              <button
                onClick={onComplete}
                className="px-2.5 py-1 rounded-full bg-gold-champagne/20 hover:bg-gold-champagne/30 text-gold-light text-[11px] font-medium tracking-wider uppercase transition-colors"
              >
                Enter →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtext info */}
      <footer className="relative z-10 mt-3 text-center">
        <p className="text-[11px] text-text-secondary font-light tracking-widest uppercase">
          Digital Wedding Suite • Loading Invitation Card
        </p>
      </footer>
    </div>
  );
};
