import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'gunjanmehta.contact@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // If Resend API key is available, use it
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: TO_EMAIL,
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        html: `
          <h2>New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (result.error) {
        console.error('Resend API error:', result.error);
        throw new Error(`Resend failed: ${JSON.stringify(result.error)}`);
      }

      console.log('Email sent successfully via Resend:', result.data?.id);
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    }

    // Fallback: Log to console (for development)
    console.log('Contact form submission:', { name, email, message });
    console.log(`Forward this to: ${TO_EMAIL}`);

    return NextResponse.json({
      success: true,
      message: 'Message received. Email service not configured yet.'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Contact API error:', errorMessage);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
