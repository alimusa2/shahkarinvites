import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, UserCheck, MessageSquare, Sparkles } from 'lucide-react';
import { brownAudio } from './BrownAudioController';

interface BrownInteractiveRSVPProps {
  partnerOne?: string;
  partnerTwo?: string;
  rsvpDeadline?: string;
}

export const BrownInteractiveRSVP: React.FC<BrownInteractiveRSVPProps> = ({
  partnerOne = 'Aayan',
  partnerTwo = 'Meher',
  rsvpDeadline = 'October 15, 2026',
}) => {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [blessing, setBlessing] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Audio chime effect
    brownAudio.playSealBreakSound();

    // Golden confetti blast
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 70,
        startVelocity: 18,
        origin: { x: originX, y: originY },
        colors: ['#B88A55', '#D4A86A', '#FFF1DC', '#E8D7BD', '#5C3A2D'],
        ticks: 85,
        gravity: 0.85,
        shapes: ['circle'],
        scalar: 0.85,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-lg mx-auto my-10 px-4 select-none"
    >
      <div className="relative rounded-t-[100px] rounded-b-2xl p-6 sm:p-8 bg-[#24140F] border border-[#B88A55]/40 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div
          className="bw-candle-glow absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-36 rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 106, 0.22) 0%, rgba(184, 138, 85, 0.08) 60%, transparent 80%)',
          }}
        />

        {/* Header */}
        <div className="text-center pt-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#382118] border border-[#B88A55]/30 mb-2">
            <UserCheck size={11} className="text-[#D4A86A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D7BD] font-sans font-medium">
              RSVP & Blessings
            </span>
          </div>

          <h3 className="bw-font-script text-3xl sm:text-4xl text-[#FFF1DC] mt-1 drop-shadow">
            Celebrate with Us
          </h3>
          <p className="text-xs text-[#E8D7BD]/80 font-serif mt-1">
            Kindly respond by <span className="text-[#D4A86A] font-medium">{rsvpDeadline}</span>
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Attendance Toggle */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  attending === 'yes'
                    ? 'bg-[#382118] border-[#D4A86A] text-[#FFF1DC] shadow-md'
                    : 'bg-[#1D100B] border-[#B88A55]/25 text-[#E8D7BD]/60 hover:border-[#B88A55]/50'
                }`}
              >
                <Heart size={16} className={attending === 'yes' ? 'fill-[#D4A86A] text-[#D4A86A]' : ''} />
                <span className="text-xs font-sans font-semibold uppercase tracking-wider">Joyfully Accept</span>
              </button>

              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  attending === 'no'
                    ? 'bg-[#382118] border-[#D4A86A] text-[#FFF1DC] shadow-md'
                    : 'bg-[#1D100B] border-[#B88A55]/25 text-[#E8D7BD]/60 hover:border-[#B88A55]/50'
                }`}
              >
                <span className="text-base leading-none">🕊️</span>
                <span className="text-xs font-sans font-semibold uppercase tracking-wider">Regretfully Decline</span>
              </button>
            </div>

            {/* Guest Name */}
            <div>
              <label htmlFor="guest-name" className="block text-[11px] uppercase tracking-wider text-[#D4A86A] font-sans font-medium mb-1.5">
                Your Name / Family Name
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. & Mrs. Tariq Ahmed"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/30 text-[#FFF1DC] placeholder-[#E8D7BD]/30 text-sm focus:outline-none focus:border-[#D4A86A] transition-colors"
              />
            </div>

            {/* Number of Guests (if attending) */}
            {attending === 'yes' && (
              <div className="animate-fade-in">
                <label className="block text-[11px] uppercase tracking-wider text-[#D4A86A] font-sans font-medium mb-1.5">
                  Number of Attendees
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`py-2 rounded-lg text-xs font-sans font-semibold transition-all ${
                        guestCount === num
                          ? 'bg-[#B88A55] text-[#24140F] shadow'
                          : 'bg-[#1D100B] border border-[#B88A55]/25 text-[#E8D7BD] hover:border-[#B88A55]/60'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Warm Wishes Blessing Note */}
            <div>
              <label htmlFor="blessing-note" className="block text-[11px] uppercase tracking-wider text-[#D4A86A] font-sans font-medium mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={12} />
                <span>Blessing Note for {partnerOne} & {partnerTwo}</span>
              </label>
              <textarea
                id="blessing-note"
                rows={3}
                value={blessing}
                onChange={(e) => setBlessing(e.target.value)}
                placeholder="Write a heartfelt prayer, wish, or warm message..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/30 text-[#FFF1DC] placeholder-[#E8D7BD]/30 text-sm focus:outline-none focus:border-[#D4A86A] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-full flex items-center justify-center gap-2 font-sans font-semibold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-xl hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #FFF1DC 0%, #D4A86A 50%, #B88A55 100%)',
                color: '#24140F',
              }}
            >
              <Send size={14} />
              <span>Confirm & Send Wishes</span>
              <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
            </button>
          </form>
        ) : (
          /* Submission Receipt */
          <div className="animate-fade-in text-center py-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#382118] border border-[#D4A86A] flex items-center justify-center text-[#D4A86A] mb-3 shadow-lg">
              <CheckCircle2 size={30} />
            </div>

            <span className="bw-font-script text-3xl text-[#FFF1DC]">
              Thank You!
            </span>
            <p className="bw-font-serif text-base text-[#E8D7BD] mt-1">
              Your response has been lovingly recorded.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-[#1D100B] border border-[#B88A55]/30 w-full max-w-sm text-left">
              <p className="text-xs text-[#D4A86A] font-sans font-semibold">
                Guest: <span className="text-[#FFF1DC] font-normal">{guestName || 'Valued Guest'}</span>
              </p>
              <p className="text-xs text-[#D4A86A] font-sans font-semibold mt-1">
                Attendance: <span className="text-[#FFF1DC] font-normal">{attending === 'yes' ? `Attending (${guestCount} guests)` : 'Regretfully unable to attend'}</span>
              </p>
              {blessing && (
                <p className="text-xs text-[#E8D7BD]/90 font-serif italic mt-2 border-t border-[#B88A55]/20 pt-2">
                  "{blessing}"
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-[#B88A55] hover:text-[#FFF1DC] font-sans uppercase tracking-wider underline transition-colors"
            >
              Update Response
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
