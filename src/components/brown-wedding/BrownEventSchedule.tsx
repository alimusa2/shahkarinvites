import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Check, Download } from 'lucide-react';

interface EventTimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  attire: string;
}

const EVENTS: EventTimelineItem[] = [
  {
    id: 'arrival',
    time: '07:00 PM',
    title: 'Arrival & Welcome Reception',
    subtitle: 'Warm Greetings & Refreshments',
    description: 'Guests arrive to classical live instrumental music, rose petal welcoming, and warm spiced saffron tea.',
    attire: 'Formal Evening / Traditional Elegance',
  },
  {
    id: 'nikah',
    time: '08:00 PM',
    title: 'Sacred Nikah Ceremony',
    subtitle: 'The Exchange of Vows & Blessings',
    description: 'Solemnization of marriage under the illuminated antique-gold floral arch with close family and loved ones.',
    attire: 'Modest Formal Attire',
  },
  {
    id: 'dinner',
    time: '09:15 PM',
    title: 'Royal Dinner Feast',
    subtitle: 'Mughlai & Contemporary Culinary Delights',
    description: 'An exquisite celebratory banquet featuring traditional royal recipes, live barbecue stations, and artisanal desserts.',
    attire: 'Formal Traditional',
  },
  {
    id: 'farewell',
    time: '10:30 PM',
    title: 'Rukhsati & Sparkler Send-Off',
    subtitle: 'Blessings for a Lifetime Ahead',
    description: 'A heartfelt send-off for the newlyweds accompanied by prayers, warm candlelight, and celebratory sparklers.',
    attire: 'Celebration Formal',
  },
];

interface BrownEventScheduleProps {
  partnerOne?: string;
  partnerTwo?: string;
  weddingDate?: string;
  venueName?: string;
}

export const BrownEventSchedule: React.FC<BrownEventScheduleProps> = ({
  partnerOne = 'Aayan',
  partnerTwo = 'Meher',
  weddingDate = 'Saturday, October 24, 2026',
  venueName = 'The Royal Palm Garden & Pavilion',
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('nikah');
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    // Generate .ics file for mobile & desktop calendar
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Cardiva//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${partnerOne} & ${partnerTwo} Wedding Celebration`,
      `DESCRIPTION:Wedding Celebration of ${partnerOne} & ${partnerTwo} at ${venueName}`,
      `LOCATION:${venueName}`,
      'DTSTART:20261024T140000Z',
      'DTEND:20261024T180000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${partnerOne}-${partnerTwo}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  const selectedEvent = EVENTS.find((e) => e.id === selectedEventId) || EVENTS[1];

  return (
    <div className="w-full max-w-lg mx-auto my-10 px-4 select-none">
      <div className="relative rounded-t-[100px] rounded-b-2xl p-6 sm:p-8 bg-[#24140F] border border-[#B88A55]/40 shadow-2xl overflow-hidden">
        {/* Candlelight Glow */}
        <div
          className="bw-candle-glow absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-36 rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 106, 0.22) 0%, rgba(184, 138, 85, 0.08) 60%, transparent 80%)',
          }}
        />

        {/* Section Header */}
        <div className="text-center pt-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#382118] border border-[#B88A55]/30 mb-2">
            <Calendar size={11} className="text-[#D4A86A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D7BD] font-sans font-medium">
              Itinerary
            </span>
          </div>

          <h3 className="bw-font-script text-3xl sm:text-4xl text-[#FFF1DC] mt-1 drop-shadow">
            Celebration Schedule
          </h3>
          <p className="text-xs uppercase tracking-wider text-[#B88A55] font-sans mt-0.5">
            {weddingDate}
          </p>
        </div>

        {/* Timeline Event Selector List */}
        <div className="flex flex-col gap-2.5 mb-6">
          {EVENTS.map((event) => {
            const isSelected = event.id === selectedEventId;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEventId(event.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#382118] border-[#D4A86A] shadow-md -translate-y-0.5'
                    : 'bg-[#1D100B] border-[#B88A55]/25 hover:border-[#B88A55]/60 hover:bg-[#28160E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-semibold transition-colors ${
                      isSelected
                        ? 'bg-[#B88A55] text-[#24140F]'
                        : 'bg-[#2A160E] text-[#D4A86A] border border-[#B88A55]/30'
                    }`}
                  >
                    <Clock size={15} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-[#FFF1DC] font-medium leading-tight">
                      {event.title}
                    </h4>
                    <span className="text-[11px] text-[#B88A55] font-sans">
                      {event.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span
                    className={`text-xs font-sans font-medium tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-[#B88A55]/20 text-[#FFF1DC] border border-[#B88A55]/40'
                        : 'text-[#E8D7BD]/70'
                    }`}
                  >
                    {event.time}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Event Details Card */}
        <div className="p-4 rounded-xl bg-[#1D100B] border border-[#B88A55]/30 mb-5 animate-fade-in">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#B88A55]/20">
            <span className="text-[11px] uppercase tracking-wider text-[#D4A86A] font-sans font-medium">
              Program Details
            </span>
            <span className="text-xs text-[#FFF1DC] font-sans font-semibold">
              {selectedEvent.time}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#E8D7BD] font-serif leading-relaxed mb-3">
            {selectedEvent.description}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-[#B88A55]/15 text-[11px] text-[#B88A55] font-sans">
            <Sparkles size={12} className="text-[#D4A86A]" />
            <span>Recommended Attire: <strong className="text-[#FFF1DC] font-normal">{selectedEvent.attire}</strong></span>
          </div>
        </div>

        {/* Add to Calendar Action */}
        <div className="pt-4 border-t border-[#B88A55]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-[11px] uppercase tracking-wider text-[#E8D7BD] font-sans">
              Save the Moment
            </p>
            <p className="text-[10px] text-[#8E6534] font-serif">
              Sync reminder to your phone calendar
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#B88A55] hover:bg-[#D4A86A] text-[#24140F] font-semibold text-xs uppercase tracking-wider font-sans transition-all active:scale-95 shadow-md"
            aria-label="Add wedding date to device calendar"
          >
            {calendarAdded ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                <span>Added to Calendar</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Add to Calendar (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
