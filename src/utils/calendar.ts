export function downloadCalendarIcs(event = {
  title: "Ayesha & Hamza's Wedding Celebration",
  description: "Wedding celebration of Ayesha & Hamza at The Grand Palace, Lahore. Nikah: 6:00 PM, Dinner: 7:30 PM, Rukhsati: 11:00 PM.",
  location: "The Grand Palace, Lahore, Pakistan",
  startDate: "20261220T130000Z", // 18:00 PKT = 13:00 UTC
  endDate: "20261220T190000Z",   // 24:00 PKT = 19:00 UTC
}) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cardiva Digital Invitations//PK',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${event.startDate}`,
    `DTEND:${event.endDate}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'ayesha-hamza-wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getGoogleCalendarUrl(event = {
  title: "Ayesha & Hamza's Wedding Celebration",
  details: "Wedding celebration of Ayesha & Hamza at The Grand Palace, Lahore. Nikah: 6:00 PM, Dinner: 7:30 PM.",
  location: "The Grand Palace, Lahore, Pakistan",
  dates: "20261220T130000Z/20261220T190000Z",
}) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.details,
    location: event.location,
    dates: event.dates,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
