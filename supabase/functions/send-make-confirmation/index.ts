import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

const getEmailTemplate = (registration: RegistrationEmail) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  
  if (registration.language === 'en') {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">Registration Confirmation</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px;">
          <p style="margin-top: 0;">Dear ${registration.name},</p>
          
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
    `;
  } else {
    return `
    <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">אישור הרשמה</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px;">
          <p style="margin-top: 0;">שלום ${registration.name},</p>
          
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
    `;
  }
};

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

const handler = async (req: Request): Promise<Response> => {
  console.log("Processing make.com webhook request");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registration: RegistrationEmail = await req.json();
    console.log("Received registration:", registration);

    const webhookUrl = Deno.env.get("MAKE_WEBHOOK_URL");
    if (!webhookUrl) {
      throw new Error("MAKE_WEBHOOK_URL is not configured");
    }

    const emailHtml = getEmailTemplate(registration);
    
    const webhookData = {
      name: registration.name,
      email: registration.email,
      company: registration.company || '',
      language: registration.language,
      emailHtml: emailHtml
    };

    // Log the webhook URL for debugging
    console.log("Raw webhook URL from env:", webhookUrl);

    // Always construct the full webhook URL with the EU2 domain
    const fullWebhookUrl = webhookUrl.startsWith('http') 
      ? webhookUrl 
      : `https://hook.eu2.make.com/webhook/${webhookUrl}`;
    
    console.log("Constructed webhook URL:", fullWebhookUrl);

    const response = await fetch(fullWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook error details:");
      console.error("Status:", response.status);
      console.error("Status text:", response.statusText);
      console.error("Response body:", errorText);
      console.error("Request URL:", fullWebhookUrl);
      console.error("Request body:", JSON.stringify(webhookData, null, 2));
      throw new Error(`Webhook request failed (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log("Webhook response:", result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-make-confirmation function:", error);
    console.error("Error stack:", error.stack);
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
