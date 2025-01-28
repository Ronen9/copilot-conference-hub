import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  company?: string;
  language: 'en' | 'he';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const { name, email, company, language }: EmailRequest = await req.json();
    
    console.log("Sending confirmation email to:", email);

    const subject = language === 'en' ? 'Registration Confirmation' : 'אישור הרשמה';
    
    const emailHtml = `
      <div dir="${language === 'he' ? 'rtl' : 'ltr'}" style="font-family: Arial, sans-serif; background-color: #f7f3ff; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 15px; padding: 30px; text-align: ${language === 'he' ? 'right' : 'left'};">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Microsoft_365_Copilot_Icon.svg/2048px-Microsoft_365_Copilot_Icon.svg.png" alt="Copilot Logo" style="width: 100px; height: auto;">
          </div>
          
          <h1 style="color: #6b46c1; text-align: center; margin-bottom: 30px;">
            ${language === 'he' ? 'אישור הרשמה' : 'Registration Confirmation'}
          </h1>

          <p style="color: #4a5568; margin-bottom: 20px;">
            ${language === 'he' ? `שלום ${name},` : `Hello ${name},`}
          </p>

          <p style="color: #4a5568; margin-bottom: 20px;">
            ${language === 'he' 
              ? 'תודה על הרשמתך לכנס Copilot!'
              : 'Thank you for registering for the Copilot conference!'}
          </p>

          <div style="background-color: #f7f3ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #6b46c1; margin-bottom: 15px;">
              ${language === 'he' ? 'פרטי האירוע:' : 'Event Details:'}
            </h3>
            <p style="color: #4a5568; margin-bottom: 10px;">
              ${language === 'he' 
                ? 'מקום: משרדי מיקרוסופט תל-אביב (דרך מנחם בגין 144, קומה 50, תל אביב)'
                : 'Location: Microsoft Tel Aviv Office (144 Menachem Begin Rd, Floor 50, Tel Aviv)'}
            </p>
            <p style="color: #4a5568; margin-bottom: 10px;">
              ${language === 'he' 
                ? 'תאריך: 5 במרץ, 2025'
                : 'Date: March 5, 2025'}
            </p>
            <p style="color: #4a5568;">
              ${language === 'he' 
                ? 'שעה: 17:00'
                : 'Time: 17:00'}
            </p>
          </div>

          <p style="color: #4a5568; margin-bottom: 20px;">
            ${language === 'he'
              ? 'לפרטים נוספים ניתן לבקר באתר הכנס:'
              : 'For more details, visit the conference website:'}
          </p>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://copilot-conference-hub.lovable.app" 
               style="background-color: #6b46c1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              ${language === 'he' ? 'לאתר הכנס' : 'Visit Conference Website'}
            </a>
          </div>

          <p style="color: #4a5568; margin-top: 30px;">
            ${language === 'he' 
              ? 'בברכה,<br>צוות Microsoft Copilot'
              : 'Best regards,<br>The Microsoft Copilot Team'}
          </p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Microsoft Copilot Event <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while sending the confirmation email",
        details: error.message || error
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);