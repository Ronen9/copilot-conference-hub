import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const { name, email, company, language }: EmailRequest = await req.json();
    console.log("Received request:", { name, email, company, language });

    const subject = language === 'en' ? 'Registration Confirmation' : 'אישור הרשמה';
    const htmlContent = language === 'en' 
      ? `
        <h1>Thank you for registering, ${name}!</h1>
        <p>Your registration has been received successfully.</p>
        ${company ? `<p>Company: ${company}</p>` : ''}
        <p>We look forward to seeing you at the event.</p>
        <br>
        <p>Best regards,</p>
        <p>The Event Team</p>
      `
      : `
        <div dir="rtl">
          <h1>תודה על ההרשמה, ${name}!</h1>
          <p>הרשמתך התקבלה בהצלחה.</p>
          ${company ? `<p>חברה: ${company}</p>` : ''}
          <p>אנחנו מצפים לראותך באירוע.</p>
          <br>
          <p>בברכה,</p>
          <p>צוות האירוע</p>
        </div>
      `;

    const emailResponse = await resend.emails.send({
      from: "Copilot Event <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: htmlContent,
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);