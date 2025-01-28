export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const formatDateForCalendar = (date: string, time: string) => {
  const eventDate = new Date(`${date}T${time}+02:00`);
  return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const getCalendarLinks = () => {
  const startTime = formatDateForCalendar('2025-03-05', '17:00');
  const endTime = formatDateForCalendar('2025-03-05', '20:00');
  
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const eventTitle = "Microsoft Copilot Conference";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`,
    outlook: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${startTime}%0ADTEND:${endTime}%0ASUMMARY:${eventTitle}%0ADESCRIPTION:${description}%0ALOCATION:${location}%0AEND:VEVENT%0AEND:VCALENDAR`
  };
};