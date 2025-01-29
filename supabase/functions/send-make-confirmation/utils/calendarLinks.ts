export const formatDateForCalendar = (date: string, time: string, isOutlook = false): string => {
  const dateTime = new Date(`${date} ${time}`);
  if (isOutlook) {
    return dateTime.toISOString().replace(/[-:]/g, '').split('.')[0];
  }
  return dateTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
};

export const getCalendarLinks = () => {
  const startTime = formatDateForCalendar('2025-03-05', '17:00');
  const endTime = formatDateForCalendar('2025-03-05', '20:00');
  const outlookStartTime = formatDateForCalendar('2025-03-05', '17:00', true);
  const outlookEndTime = formatDateForCalendar('2025-03-05', '20:00', true);
  
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const eventTitle = "Microsoft Copilot Conference";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  const outlookLink = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(description)}&startdt=${outlookStartTime}&enddt=${outlookEndTime}&location=${encodeURIComponent(location)}`;

  return { googleLink, outlookLink };
};