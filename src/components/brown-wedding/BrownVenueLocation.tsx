import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Car, Sparkles, Compass } from 'lucide-react';

interface BrownVenueLocationProps {
  venueName?: string;
  address?: string;
  city?: string;
  mapQuery?: string;
}

export const BrownVenueLocation: React.FC<BrownVenueLocationProps> = ({
  venueName = 'The Royal Palm Garden & Pavilion',
  address = '52-B Canal Bank Road, Royal Enclave',
  city = 'Lahore, Pakistan',
  mapQuery = 'Royal Palm Golf and Country Club, Lahore',
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'details'>('map');

  const fullAddress = `${venueName}, ${address}, ${city}`;
  const encodedQuery = encodeURIComponent(mapQuery || fullAddress);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodedQuery}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-lg mx-auto my-10 px-4 select-none">
      {/* Arched Section Container */}
      <div className="relative rounded-t-[100px] rounded-b-2xl p-6 sm:p-8 bg-[#24140F] border border-[#B88A55]/40 shadow-2xl overflow-hidden">
        {/* Candlelight Ambient Glow */}
        <div
          className="bw-candle-glow absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-40 rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 106, 0.25) 0%, rgba(184, 138, 85, 0.08) 60%, transparent 80%)',
          }}
        />

        {/* Section Header */}
        <div className="text-center pt-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#382118] border border-[#B88A55]/30 mb-2">
            <Compass size={11} className="text-[#D4A86A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D7BD] font-sans font-medium">
              Venue & Location
            </span>
          </div>

          <h3 className="bw-font-script text-3xl sm:text-4xl text-[#FFF1DC] mt-1 drop-shadow">
            The Celebration Venue
          </h3>

          <p className="bw-font-serif text-lg text-[#E8D7BD] mt-1 font-medium">
            {venueName}
          </p>
          <p className="text-xs text-[#B88A55] font-sans tracking-wide mt-0.5">
            {address} • {city}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'map'
                ? 'bg-[#B88A55] text-[#24140F] font-semibold shadow-md'
                : 'bg-[#382118] text-[#E8D7BD] border border-[#B88A55]/30 hover:border-[#D4A86A]'
            }`}
          >
            Live Map View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'details'
                ? 'bg-[#B88A55] text-[#24140F] font-semibold shadow-md'
                : 'bg-[#382118] text-[#E8D7BD] border border-[#B88A55]/30 hover:border-[#D4A86A]'
            }`}
          >
            Venue Guide & Amenities
          </button>
        </div>

        {/* View 1: Styled Map View */}
        {activeTab === 'map' && (
          <div className="animate-fade-in flex flex-col items-center">
            {/* Map Frame with Antique Gold Border */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#B88A55]/50 shadow-inner bg-[#1A0E0A]">
              <iframe
                title="Celebration Venue Location"
                src={`https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 filter contrast-[1.08] saturate-[0.85] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Luxury Tint Overlay */}
              <div
                className="absolute inset-0 pointer-events-none border border-[#B88A55]/30 rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(36, 20, 15, 0.7)',
                }}
              />
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mt-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#382118] hover:bg-[#4A2E23] border border-[#B88A55]/50 text-[#FFF1DC] text-xs font-sans font-medium transition-all active:scale-95 shadow"
              >
                <Navigation size={13} className="text-[#D4A86A]" />
                <span>Google Maps</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#382118] hover:bg-[#4A2E23] border border-[#B88A55]/50 text-[#FFF1DC] text-xs font-sans font-medium transition-all active:scale-95 shadow"
              >
                <MapPin size={13} className="text-[#D4A86A]" />
                <span>Apple Maps</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>
            </div>
          </div>
        )}

        {/* View 2: Venue Guide & Amenities */}
        {activeTab === 'details' && (
          <div className="animate-fade-in flex flex-col gap-3 py-2">
            <div className="p-3.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/25 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#382118] text-[#D4A86A] mt-0.5">
                <Car size={16} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#FFF1DC] font-sans font-semibold">
                  Complimentary Valet Parking
                </h4>
                <p className="text-xs text-[#E8D7BD]/80 font-serif leading-relaxed mt-0.5">
                  Chauffeured valet service is provided at the main pavilion archway entrance.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/25 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#382118] text-[#D4A86A] mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#FFF1DC] font-sans font-semibold">
                  Climate-Controlled Marquee
                </h4>
                <p className="text-xs text-[#E8D7BD]/80 font-serif leading-relaxed mt-0.5">
                  The ceremony and banquet hall are fully climate-controlled with indoor candlelight lounge seating.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/25 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#382118] text-[#D4A86A] mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#FFF1DC] font-sans font-semibold">
                  Gate Entrance
                </h4>
                <p className="text-xs text-[#E8D7BD]/80 font-serif leading-relaxed mt-0.5">
                  Kindly enter through Gate #2 (Pavilion VIP Gate) upon presenting your digital invitation card.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Copy Address Button */}
        <div className="mt-5 pt-4 border-t border-[#B88A55]/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#E8D7BD]/70 font-sans truncate pr-2">
            <MapPin size={12} className="text-[#D4A86A] shrink-0" />
            <span className="truncate">{venueName}</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#382118] hover:bg-[#4A2E23] border border-[#B88A55]/40 text-[#FFF1DC] text-xs font-sans transition-all active:scale-95 shrink-0"
            aria-label="Copy address"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} className="text-[#D4A86A]" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
