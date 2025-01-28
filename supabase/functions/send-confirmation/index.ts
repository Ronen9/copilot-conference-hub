import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { init, send } from "npm:@emailjs/nodejs";

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

    // Initialize EmailJS with the public key
    init(Deno.env.get("EMAILJS_PUBLIC_KEY") || '');

    const templateParams = {
      to_name: name,
      to_email: email,
      company: company || '',
      subject: language === 'en' ? 'Registration Confirmation' : 'אישור הרשמה',
      message: language === 'en' 
        ? `Thank you for registering! We look forward to seeing you at the event.`
        : `תודה על ההרשמה! אנחנו מצפים לראותך באירוע.`,
    };

    console.log("Sending email with params:", templateParams);

    const emailResponse = await send(
      Deno.env.get("EMAILJS_SERVICE_ID") || '',
      Deno.env.get("EMAILJS_TEMPLATE_ID") || '',
      templateParams,
      {
        publicKey: Deno.env.get("EMAILJS_PUBLIC_KEY") || '',
      }
    );

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
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