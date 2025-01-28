import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as emailjs from 'npm:@emailjs/browser';
import { corsHeaders } from './utils.ts';
import { getEnglishTemplate } from './templates/english.ts';
import { getHebrewTemplate } from './templates/hebrew.ts';

interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

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

    console.log("Sending email to:", registration.email);

    // Initialize EmailJS with credentials
    emailjs.init({
      publicKey: Deno.env.get("EMAILJS_PUBLIC_KEY"),
      privateKey: Deno.env.get("EMAILJS_PRIVATE_KEY")
    });

    const emailResponse = await emailjs.send(
      Deno.env.get("EMAILJS_SERVICE_ID"),
      Deno.env.get("EMAILJS_TEMPLATE_ID"),
      {
        to_email: registration.email,
        to_name: registration.name,
        subject: template.subject,
        message: template.html,
        language: registration.language
      }
    );

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
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