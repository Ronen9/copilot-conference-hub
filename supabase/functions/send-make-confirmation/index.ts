import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { getEmailTemplate } from "./templates/emailTemplate.ts";

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

    let result;
    const responseText = await response.text();
    try {
      result = JSON.parse(responseText);
    } catch {
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