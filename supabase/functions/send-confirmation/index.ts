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
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Processing confirmation email request");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registration: RegistrationEmail = await req.json();
    console.log("Received registration:", registration);

    const companyText = registration.company 
      ? `from ${registration.company} ` 
      : '';

    const emailHtml = `
      <h2>Registration Confirmation</h2>
      <p>Dear ${registration.name},</p>
      <p>Thank you for registering for our Copilot Conference! ${companyText}</p>
      <p>We're excited to have you join us for this event where we'll explore the future of productivity with Microsoft Copilot.</p>
      <p>We'll send you more details about the event schedule and location soon.</p>
      <p>Best regards,<br>The Conference Team</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Copilot Conference <onboarding@resend.dev>",
        to: [registration.email],
        subject: "Welcome to Copilot Conference!",
        html: emailHtml,
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