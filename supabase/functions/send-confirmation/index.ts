import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmail {
  name: string;
  email: string;
  company?: string;
  language: 'en' | 'he';
}

const getEmailTemplate = (registration: RegistrationEmail) => {
  const companyText = registration.company 
    ? registration.language === 'en'
      ? `from ${registration.company}`
      : `מחברת ${registration.company}`
    : '';

  if (registration.language === 'en') {
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
              <p style="margin-top: 0;">Dear ${registration.name},</p>
              
              <p>Thank you for registering for our Copilot Conference! ${companyText}</p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;">We're excited to have you join us for this event where we'll explore the future of productivity with Copilot</p>
              </div>
              
              <p>Location: Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)<br>
              Time: 17:00<br>
              Agenda: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              
              <p style="margin-bottom: 0;">Best regards,<br>Microsoft Team</p>
            </div>
          </div>
        </div>
      `
    };
  }

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
            <p style="margin-top: 0;">שלום ${registration.name},</p>
            
            <p>תודה על הרשמתך לכנס Copilot! ${companyText}</p>
            
            <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;">אנחנו נרגשים לארח אותך באירוע שבו נציג את עתיד הפרודקטיביות עם קופיילוט</p>
            </div>
            
            <p>מקום: משרדי מיקרוסופט תל-אביב ב Reactor - מידטאון תל אביב (דרך מנחם בגין 144, קומה 50, תל אביב)<br>
            שעה: 17:00<br>
            אג'נדה: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="margin-bottom: 0;">בברכה,<br>צוות מיקרוסופט</p>
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

    const emailTemplate = getEmailTemplate(registration);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Copilot Conference <onboarding@resend.dev>",
        to: [registration.email],
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      }),
    });

    console.log("Resend API response status:", res.status);

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully:", data);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("Resend API error:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);