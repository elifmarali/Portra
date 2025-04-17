// app/api/send/route.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); 
const emailTo= process.env.FROM_TO;

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: emailTo!, 
      subject: subject,
      html:`<p> email : ${email}  </p> <p> message : ${message}  </p> <p> subject : ${subject}  </p>`
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
