import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface RSVPSectionProps {
  deadline?: string;
  themeAccent?: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  deadline = '10 December 2026',
  themeAccent = '#D6B777',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if already submitted in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cardiva_rsvp_demo');
      if (saved) {
        const parsed = JSON.parse(saved);
        setName(parsed.name || '');
        setAttendance(parsed.attendance || 'attending');
        setGuestCount(parsed.guestCount || 2);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    setErrorMsg('');

    const rsvpData = {
      name: name.trim(),
      phone: phone.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('cardiva_rsvp_demo', JSON.stringify(rsvpData));
    } catch {
      // fallback
    }

    // Trigger celebration confetti if attending!
    if (attendance === 'attending') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#D6B777', '#F5F0E6', '#0D2419', '#E4A8B3'],
      });
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp-section" className="relative p-6 sm:p-8 rounded-3xl bg-background-card/90 border border-gold-border/40 shadow-xl max-w-lg mx-auto text-center my-8">
      {/* Decorative top motif */}
      <div className="w-10 h-10 rounded-full mx-auto mb-3 bg-gold-border/10 border border-gold-border/40 flex items-center justify-center text-gold-champagne">
        <Heart size={18} strokeWidth={1.5} />
      </div>

      <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-champagne block mb-1">
        Kindly RSVP By {deadline}
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-2">
        We Would Love to Celebrate With You
      </h3>
      <p className="text-text-secondary text-xs sm:text-sm font-light mb-6">
        Kindly confirm your presence so we may reserve your seats.
      </p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Guest Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
              Guest Name(s) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mr. & Mrs. Salman Farooq"
              className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
            />
          </div>

          {/* WhatsApp / Contact Number */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
              WhatsApp / Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300 1234567"
              className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
            />
          </div>

          {/* Attendance Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
              Will You Attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`py-2.5 px-3 rounded-xl border text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all ${
                  attendance === 'attending'
                    ? 'border-gold-champagne bg-gold-champagne/15 text-gold-light shadow-sm'
                    : 'border-gold-border/30 bg-background-main text-text-secondary hover:border-gold-border'
                }`}
              >
                <span>Accepts with pleasure</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('declining')}
                className={`py-2.5 px-3 rounded-xl border text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all ${
                  attendance === 'declining'
                    ? 'border-gold-champagne bg-gold-champagne/15 text-gold-light shadow-sm'
                    : 'border-gold-border/30 bg-background-main text-text-secondary hover:border-gold-border'
                }`}
              >
                <span>Regretfully declines</span>
              </button>
            </div>
          </div>

          {/* Number of Guests (Only if attending) */}
          {attendance === 'attending' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5">
                Number of Guests Attending: <span className="text-gold-light font-bold">{guestCount}</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestCount(num)}
                    className={`w-10 h-10 rounded-xl border text-xs font-semibold transition-all ${
                      guestCount === num
                        ? 'border-gold-champagne bg-gold-champagne text-background-main shadow-sm'
                        : 'border-gold-border/30 bg-background-main text-ivory hover:border-gold-border'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Message */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
              Wishes for the Couple (Optional)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sending you both endless prayers and congratulations on this joyous milestone..."
              className="w-full px-4 py-2 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-xs focus:outline-none focus:border-gold-champagne transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-widest shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
            >
              Submit RSVP
            </button>
          </div>

          <p className="text-[10px] text-text-muted text-center pt-1 italic">
            Demonstration mode: Your response will be saved locally in this browser.
          </p>
        </form>
      ) : (
        /* Confirmation State */
        <div className="py-6 text-center animate-fade-in">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={30} />
          </div>
          <h4 className="font-serif text-2xl text-ivory tracking-wide mb-1">
            RSVP Confirmed
          </h4>
          <p className="text-gold-light text-sm font-medium mb-2">
            Thank you, {name}!
          </p>
          <p className="text-text-secondary text-xs font-light max-w-xs mx-auto mb-6 leading-relaxed">
            {attendance === 'attending'
              ? `We have noted ${guestCount} guest${guestCount > 1 ? 's' : ''} for the celebration. We look forward to celebrating together!`
              : 'Your warm wishes have been shared with the couple. You will be dearly missed.'}
          </p>

          <button
            onClick={handleReset}
            className="text-[11px] uppercase tracking-wider text-text-muted hover:text-gold-champagne underline"
          >
            Update or Resubmit Response
          </button>
        </div>
      )}
    </section>
  );
};
