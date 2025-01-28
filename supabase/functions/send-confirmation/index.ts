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
    const message = language === 'en' 
      ? `Thank you for registering, ${name}! We look forward to seeing you at the event.`
      : `תודה על ההרשמה ${name}! אנחנו מצפים לראותך באירוע.`;
    
    const companyInfo = company ? (language === 'en' 
      ? `\nCompany: ${company}` 
      : `\nחברה: ${company}`) : '';

    const emailResponse = await resend.emails.send({
      from: "Microsoft Copilot Event <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: `
        <div dir="${language === 'he' ? 'rtl' : 'ltr'}" style="font-family: Arial, sans-serif;">
          <h2>${message}</h2>
          ${companyInfo}
          <p style="margin-top: 20px;">
            ${language === 'en' 
              ? 'Best regards,<br>The Microsoft Copilot Team' 
              : 'בברכה,<br>צוות Microsoft Copilot'}
          </p>
        </div>
      `,
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
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);