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

    // Validate required environment variables
    const publicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
    const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");
    const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
    const templateId = Deno.env.get("EMAILJS_TEMPLATE_ID");

    if (!publicKey || !privateKey || !serviceId || !templateId) {
      console.error("Missing required environment variables");
      throw new Error("Missing required environment variables");
    }

    // Initialize EmailJS with both public and private keys
    init({
      publicKey,
      privateKey,
    });

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
      serviceId,
      templateId,
      templateParams
    );

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
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
        details: error
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