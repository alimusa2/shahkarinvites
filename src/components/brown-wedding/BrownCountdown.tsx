import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface BrownCountdownProps {
  targetDateStr?: string;
}

export const BrownCountdown: React.FC<BrownCountdownProps> = ({
  targetDateStr = '2026-10-24T19:00:00',
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-sm mx-auto my-6 px-4 select-none">
      <div className="p-5 rounded-2xl bg-[#24140F]/90 border border-[#B88A55]/30 shadow-xl text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-1.5 text-[#D4A86A] mb-2">
          <Heart size={12} className="fill-[#D4A86A]/70" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D7BD] font-sans font-medium">
            Counting Down the Moments
          </span>
          <Heart size={12} className="fill-[#D4A86A]/70" />
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-2.5 rounded-xl bg-[#1D100B] border border-[#B88A55]/30 flex flex-col items-center justify-center shadow-inner"
            >
              <span className="font-serif text-xl sm:text-2xl text-[#FFF1DC] font-semibold leading-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#B88A55] font-sans mt-0.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
