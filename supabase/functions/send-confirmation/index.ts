import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const EMAILJS_PUBLIC_KEY = "nwBHzISaQ4b1Qomp-";
const EMAILJS_SERVICE_ID = "service_tvmk8uo";
const EMAILJS_TEMPLATE_ID = "template_h6rpozq";

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

const formatDateForCalendar = (date: string, time: string, forOutlook = false) => {
  if (forOutlook) {
    return `${date}T${time}:00`;
  }
  
  const eventDate = new Date(`${date}T${time}+02:00`);
  return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const getCalendarLinks = () => {
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

const getEnglishTemplate = (name: string) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  return {
    subject: "Welcome to Copilot Conference!",
    content: `
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
            <a href="${outlookLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Add to Outlook</a>
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
  const { googleLink, outlookLink } = getCalendarLinks();
  return {
    subject: "ברוכים הבאים לכנס Copilot!",
    content: `
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
            <a href="${googleLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">הוסף ליומן Google</a>
            <a href="${outlookLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">הוסף ליומן Outlook</a>
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registration: RegistrationEmail = await req.json();
    console.log("Received registration:", registration);

    const template = registration.language === 'en' 
      ? getEnglishTemplate(registration.name)
      : getHebrewTemplate(registration.name);

    // EmailJS API endpoint
    const emailjsEndpoint = "https://api.emailjs.com/api/v1.0/email/send";
    
    const emailjsPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: registration.email,
        to_name: registration.name,
        subject: template.subject,
        message_html: template.content,
        message: template.content,
        email_to: registration.email, // Add this explicit field
        recipient: registration.email, // Add another variation
        destination_email: registration.email, // And another
      },
    };

    console.log("Sending email via EmailJS to:", registration.email);
    console.log("Email payload:", JSON.stringify(emailjsPayload, null, 2));
    
    const res = await fetch(emailjsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://copilot-conference-hub.lovable.app",
        "Referer": "https://copilot-conference-hub.lovable.app/",
      },
      body: JSON.stringify(emailjsPayload),
    });

    const responseText = await res.text();
    console.log("EmailJS API response:", responseText);

    if (res.ok) {
      console.log("Email sent successfully to:", registration.email);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      console.error("EmailJS API error:", responseText);
      return new Response(JSON.stringify({ error: responseText }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in send-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);