import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

const formatDateForCalendar = (date: string, time: string) => {
  const eventDate = new Date(`${date}T${time}+02:00`);
  return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const getCalendarLinks = () => {
  const startTime = formatDateForCalendar('2025-03-05', '17:00');
  const endTime = formatDateForCalendar('2025-03-05', '20:00');
  
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const eventTitle = "Microsoft Copilot Conference";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  
  const outlookLink = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${startTime}%0ADTEND:${endTime}%0ASUMMARY:${eventTitle}%0ADESCRIPTION:${description}%0ALOCATION:${location}%0AEND:VEVENT%0AEND:VCALENDAR`;

  return { googleLink, outlookLink };
};

const getEnglishTemplate = (name: string) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  return {
    subject: "Welcome to Microsoft Copilot Conference!",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      @media only screen and (max-width: 600px) {
        .button-container {
          flex-direction: column !important;
        }
        .calendar-button {
          width: 100% !important;
          margin: 8px 0 !important;
        }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F8F9FA;">
      <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #9b87f5 0%, #8067f0 100%); padding: 30px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Registration Confirmed!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 32px;">
          <p style="margin-top: 0; font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
          
          <p style="font-size: 16px; color: #333;">Thank you for registering for the Microsoft Copilot Conference! We're excited to have you join us for this transformative event.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h2 style="color: #9b87f5; margin-top: 0; font-size: 20px;">Event Details</h2>
            <p style="margin: 8px 0;"><strong>📍 Location:</strong><br>Microsoft Tel Aviv offices at Reactor<br>Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor)</p>
            <p style="margin: 8px 0;"><strong>📅 Date:</strong><br>March 5th, 2025</p>
            <p style="margin: 8px 0;"><strong>⏰ Time:</strong><br>17:00 - 20:00</p>
            <p style="margin: 8px 0;"><strong>🔗 Event Website:</strong><br><a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5; text-decoration: none;">copilot-conference-hub.lovable.app</a></p>
          </div>

          <div style="margin: 24px 0;">
            <h3 style="color: #9b87f5; margin-bottom: 16px;">Add to Your Calendar</h3>
            <div class="button-container" style="display: flex; flex-direction: column; gap: 16px;">
              <a href="${googleLink}" target="_blank" class="calendar-button" style="display: inline-block; background-color: #9b87f5; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">Add to Google Calendar</a>
              <a href="${outlookLink}" download="copilot-conference.ics" class="calendar-button" style="display: inline-block; background-color: #FFD700; color: black; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">Add to Outlook Calendar</a>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          
          <p style="color: #666; font-style: italic;">We look forward to seeing you at the event!</p>
          <p style="color: #666; margin-bottom: 0;">Best regards,<br><strong>The Microsoft Copilot Team</strong></p>
        </div>
      </div>
    </div>
</body>
</html>`
  };
};

const getHebrewTemplate = (name: string) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  return {
    subject: "ברוכים הבאים לכנס Microsoft Copilot!",
    html: `<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      @media only screen and (max-width: 600px) {
        .button-container {
          flex-direction: column !important;
        }
        .calendar-button {
          width: 100% !important;
          margin: 8px 0 !important;
        }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F8F9FA;">
      <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #9b87f5 0%, #8067f0 100%); padding: 30px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">ההרשמה אושרה!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 32px;">
          <p style="margin-top: 0; font-size: 16px; color: #333;">שלום <strong>${name}</strong>,</p>
          
          <p style="font-size: 16px; color: #333;">תודה על הרשמתך לכנס Microsoft Copilot! אנחנו נרגשים לארח אותך באירוע המיוחד הזה.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h2 style="color: #9b87f5; margin-top: 0; font-size: 20px;">פרטי האירוע</h2>
            <p style="margin: 8px 0;"><strong>📍 מיקום:</strong><br>משרדי מיקרוסופט תל-אביב ב-Reactor<br>מידטאון תל אביב (דרך מנחם בגין 144, קומה 50)</p>
            <p style="margin: 8px 0;"><strong>📅 תאריך:</strong><br>5 במרץ, 2025</p>
            <p style="margin: 8px 0;"><strong>⏰ שעה:</strong><br>17:00 - 20:00</p>
            <p style="margin: 8px 0;"><strong>🔗 אתר האירוע:</strong><br><a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5; text-decoration: none;">copilot-conference-hub.lovable.app</a></p>
          </div>

          <div style="margin: 24px 0;">
            <h3 style="color: #9b87f5; margin-bottom: 16px;">הוסף ליומן שלך</h3>
            <div class="button-container" style="display: flex; flex-direction: column; gap: 16px;">
              <a href="${googleLink}" class="calendar-button" style="display: inline-block; background-color: #9b87f5; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">הוסף ליומן Google</a>
              <a href="${outlookLink}" download="copilot-conference.ics" class="calendar-button" style="display: inline-block; background-color: #8067f0; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">הוסף ליומן Outlook</a>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          
          <p style="color: #666; font-style: italic;">מצפים לראותך באירוע!</p>
          <p style="color: #666; margin-bottom: 0;">בברכה,<br><strong>צוות Microsoft Copilot</strong></p>
        </div>
      </div>
    </div>
</body>
</html>`
  };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registration: RegistrationEmail = await req.json();
    console.log("Received registration:", registration);

    const template = registration.language === 'en' 
      ? getEnglishTemplate(registration.name)
      : getHebrewTemplate(registration.name);

    console.log("Sending email to:", registration.email);
    
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: Deno.env.get("GMAIL_USER"),
          password: Deno.env.get("GMAIL_APP_PASSWORD"),
        },
      },
    });

    await client.send({
      from: "Microsoft Copilot Conference <copilot.conference@gmail.com>",
      to: registration.email,
      subject: template.subject,
      html: template.html,
      content: `Thank you for registering for the Microsoft Copilot Conference!

Event Details:
Location: Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor)
Date: March 5th, 2025
Time: 17:00 - 20:00

Visit https://copilot-conference-hub.lovable.app/ for more information.`,
    });

    await client.close();
    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);