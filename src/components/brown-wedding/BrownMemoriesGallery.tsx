import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MemoryPhoto {
  url: string;
  caption?: string;
  alt: string;
  rotation?: number;
}

interface BrownMemoriesGalleryProps {
  photos?: MemoryPhoto[];
}

const DEFAULT_PHOTOS: MemoryPhoto[] = [
  {
    url: '/assets/brown-card/memory-1.jpg',
    caption: 'Sacred Nikah & Family Blessings',
    alt: 'Sacred Nikah ceremony moments',
    rotation: -2,
  },
  {
    url: '/assets/brown-card/memory-2.jpg',
    caption: 'Under the Lantern Glow & Floral Pavilion',
    alt: 'Candlelight banquet and celebration',
    rotation: 2.5,
  },
  {
    url: '/assets/brown-card/memory-3.jpg',
    caption: 'A Lifetime of Togetherness Begins',
    alt: 'Newlyweds celebration under fairy lights',
    rotation: -1.5,
  },
];

export const BrownMemoriesGallery: React.FC<BrownMemoriesGalleryProps> = ({
  photos = DEFAULT_PHOTOS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for mobile phones
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextPhoto();
    } else if (diff < -45) {
      prevPhoto();
    }
    setTouchStartX(null);
  };

  const current = photos[currentIndex];

  return (
    <div
      className="w-full max-w-md mx-auto my-6 px-4 flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Couple Memories Gallery"
    >
      {/* Section Header */}
      <div className="text-center mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88A55] font-sans font-medium">
          Cherished Moments
        </span>
        <h4 className="bw-font-script text-2xl text-[#E8D7BD] mt-0.5">
          Memories in Warm Light
        </h4>
      </div>

      {/* Polaroid Vintage Instant-Film Card */}
      <div
        className="relative bg-[#FAF6EE] p-3 sm:p-4 rounded-md bw-polaroid transition-all duration-500 max-w-[310px] sm:max-w-[340px] w-full"
        style={{
          transform: `rotate(${current.rotation ?? 0}deg)`,
          border: '1px solid rgba(184, 138, 85, 0.25)',
        }}
      >
        {/* Antique Gold Tape / Clip Detail at top */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#B88A55]/30 backdrop-blur-sm border border-[#B88A55]/40 rounded-sm shadow-sm"
          style={{ transform: 'translateX(-50%) rotate(-1deg)' }}
          aria-hidden="true"
        />

        {/* Photo Container */}
        <div className="relative aspect-square w-full bg-[#24140F] overflow-hidden rounded-sm shadow-inner">
          <img
            src={current.url}
            alt={current.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle Warm Amber Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 65%, rgba(36, 20, 15, 0.4) 100%)',
            }}
          />
        </div>

        {/* Polaroid Handwritten Caption Area */}
        <div className="pt-3 pb-1 text-center min-h-[50px] flex flex-col items-center justify-center">
          <p className="bw-font-script text-xl sm:text-2xl text-[#4A2E23] leading-snug">
            {current.caption}
          </p>
          <span className="text-[10px] text-[#8E6534] font-serif tracking-widest uppercase mt-0.5 opacity-70">
            {currentIndex + 1} of {photos.length}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full max-w-[280px] mt-4">
        <button
          onClick={prevPhoto}
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#24140F]/80 border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] hover:border-[#D4A86A] transition-all active:scale-90"
          aria-label="Previous photograph"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: idx === currentIndex ? 16 : 6,
                height: 6,
                backgroundColor: idx === currentIndex ? '#D4A86A' : 'rgba(184, 138, 85, 0.35)',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPhoto}
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#24140F]/80 border border-[#B88A55]/40 text-[#E8D7BD] hover:text-[#FFF1DC] hover:border-[#D4A86A] transition-all active:scale-90"
          aria-label="Next photograph"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
