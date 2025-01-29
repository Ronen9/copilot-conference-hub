import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

const getEmailTemplate = (registration: RegistrationEmail) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  
  const styles = `
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #9b87f5; padding: 20px; text-align: center; }
    .content { background-color: #ffffff; padding: 24px; }
    .button { display: inline-block; background-color: #9b87f5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px; font-weight: bold; }
    .details { margin: 20px 0; padding-left: 15px; border-left: 4px solid #9b87f5; }
    .rtl-details { margin: 20px 0; padding-right: 15px; border-right: 4px solid #9b87f5; border-left: none; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 10px !important; }
      .button { display: block !important; width: auto !important; margin: 10px 0 !important; text-align: center; }
      .logo { width: 150px !important; }
    }
  `;
  
  if (registration.language === 'en') {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <style>${styles}</style>
      </head>
      <body style="background-color: #F1F0FB;">
        <div class="container">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <div class="header">
              <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
                   alt="Microsoft Copilot Logo" 
                   class="logo"
                   style="max-width: 200px; height: auto;">
              <h2 style="color: #ffffff; margin: 10px 0 0 0;">Registration Confirmation</h2>
            </div>
            
            <div class="content" style="text-align: left;">
              <p style="margin-top: 0; font-size: 16px;">
                Dear ${registration.name},
              </p>
              
              <p style="font-size: 16px;">
                Thank you for registering for our Copilot Conference!
              </p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;">
                  We're excited to have you join us for this event where we'll explore the future of productivity with Copilot.
                </p>
              </div>
              
              <div class="details">
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>Location:</strong> Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv<br>
                  <span style="margin-left: 25px;">(144 Menachem Begin Rd., 50th floor, Tel Aviv)</span>
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>Date:</strong> March 5th, 2025
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>Time:</strong> 17:00
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>Agenda:</strong> <a href="https://copilot-conference-hub.lovable.app/" 
                     style="color: #9b87f5; text-decoration: none;">
                     copilot-conference-hub.lovable.app
                  </a>
                </p>
              </div>

              <div style="margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">
                  Add to your calendar:
                </p>
                <a href="${googleLink}" class="button">
                  Add to Google Calendar
                </a>
                <a href="${outlookLink}" class="button">
                  Add to Outlook
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              
              <p style="margin-bottom: 0; font-size: 16px; text-align: center;">
                See you at the event!
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  } else {
    return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <style>${styles}</style>
      </head>
      <body style="background-color: #F1F0FB;">
        <div class="container">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <div class="header">
              <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
                   alt="Microsoft Copilot Logo" 
                   class="logo"
                   style="max-width: 200px; height: auto;">
              <h2 style="color: #ffffff; margin: 10px 0 0 0;">אישור הרשמה</h2>
            </div>
            
            <div class="content" style="text-align: right;">
              <p style="margin-top: 0; font-size: 16px;">
                שלום ${registration.name},
              </p>
              
              <p style="font-size: 16px;">
                תודה על הרשמתך לכנס Copilot!
              </p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;">
                  אנחנו נרגשים לארח אותך באירוע שבו נציג את עתיד הפרודקטיביות עם קופיילוט
                </p>
              </div>
              
              <div class="rtl-details">
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>מקום:</strong> משרדי מיקרוסופט תל-אביב ב Reactor - מידטאון תל אביב<br>
                  <span style="margin-right: 25px;">(דרך מנחם בגין 144, קומה 50, תל אביב)</span>
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>תאריך:</strong> 5 במרץ, 2025
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>שעה:</strong> 17:00
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  <strong>אג'נדה:</strong> <a href="https://copilot-conference-hub.lovable.app/" 
                     style="color: #9b87f5; text-decoration: none;">
                     copilot-conference-hub.lovable.app
                  </a>
                </p>
              </div>

              <div style="margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">
                  הוסף ליומן שלך:
                </p>
                <a href="${googleLink}" class="button">
                  הוסף ליומן Google
                </a>
                <a href="${outlookLink}" class="button">
                  הוסף ליומן Outlook
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              
              <p style="margin-bottom: 0; font-size: 16px; text-align: center;">
                נתראה באירוע!
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  }
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

    console.log("Using webhook URL:", webhookUrl);
    console.log("Sending webhook data:", JSON.stringify(webhookData, null, 2));

    const response = await fetch(webhookUrl, {
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
      throw new Error(`Webhook request failed (${response.status}): ${errorText}`);
    }

    // Try to parse as JSON first, if it fails, return the text response
    let result;
    const responseText = await response.text();
    try {
      result = JSON.parse(responseText);
    } catch {
      // If response is not JSON, use the text response
      result = { message: responseText };
    }

    console.log("Webhook response:", result);

    return new Response(JSON.stringify({ success: true, result }), {
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
