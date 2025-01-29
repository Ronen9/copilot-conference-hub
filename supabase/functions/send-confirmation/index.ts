import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmail {
  name: string;
  email: string;
  language: 'en' | 'he';
}

const formatDateForCalendar = (date: string, time: string) => {
  const eventDate = new Date(`${date}T${time}+02:00`);
  return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const generateICSContent = () => {
  const startDate = '20250305T170000Z'; // March 5th, 2025, 17:00 UTC
  const endDate = '20250305T200000Z';   // March 5th, 2025, 20:00 UTC
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Copilot Conference//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${crypto.randomUUID()}
SUMMARY:Microsoft Copilot Conference
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
};

const getCalendarLinks = () => {
  const startTime = formatDateForCalendar('2025-03-05', '17:00');
  const endTime = formatDateForCalendar('2025-03-05', '20:00');
  
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const eventTitle = "Microsoft Copilot Conference";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  
  return { googleLink };
};

const getEnglishTemplate = (name: string) => {
  const { googleLink } = getCalendarLinks();
  return {
    subject: "Welcome to Copilot Conference!",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">Registration Confirmation</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px;">
          <p style="margin-top: 0;">Dear ${name},</p>
          
          <p>Thank you for registering for our Copilot Conference!</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">We're excited to have you join us for this event where we'll explore the future of productivity with Copilot</p>
          </div>
          
          <p>Location: Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)<br>
          Date: March 5th, 2025<br>
          Time: 17:00<br>
          Agenda: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>

          <div style="margin: 20px 0;">
            <p style="margin-bottom: 10px;"><strong>Add to your calendar:</strong></p>
            <a href="${googleLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Add to Google Calendar</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="margin-bottom: 0;">See you...</p>
        </div>
      </div>
    </div>
    `
  };
};

const getHebrewTemplate = (name: string) => {
  const { googleLink } = getCalendarLinks();
  return {
    subject: "ברוכים הבאים לכנס Copilot!",
    html: `
    <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">אישור הרשמה</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px;">
          <p style="margin-top: 0;">שלום ${name},</p>
          
          <p>תודה על הרשמתך לכנס Copilot!</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">אנחנו נרגשים לארח אותך באירוע שבו נציג את עתיד הפרודקטיביות עם קופיילוט</p>
          </div>
          
          <p>מקום: משרדי מיקרוסופט תל-אביב ב Reactor - מידטאון תל אביב (דרך מנחם בגין 144, קומה 50, תל אביב)<br>
          תאריך: 5 במרץ, 2025<br>
          שעה: 17:00<br>
          אג'נדה: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>

          <div style="margin: 20px 0;">
            <p style="margin-bottom: 10px;"><strong>הוסף ליומן שלך:</strong></p>
            <a href="${googleLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">הוסף ליומן Google</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="margin-bottom: 0;">נתראה...</p>
        </div>
      </div>
    </div>
    `
  };
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Processing confirmation email request");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registration: RegistrationEmail = await req.json();
    console.log("Received registration:", registration);

    const emailTemplate = registration.language === 'en' ? getEnglishTemplate(registration.name) : getHebrewTemplate(registration.name);
    const icsContent = generateICSContent();

    const res = await resend.emails.send({
      from: "Copilot Conference <onboarding@resend.dev>",
      to: [registration.email],
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      attachments: [
        {
          filename: 'copilot-conference.ics',
          content: icsContent,
        },
      ],
    });

    console.log("Email sent successfully:", res);

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);