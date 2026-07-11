import { NextRequest, NextResponse } from 'next/server';

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
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'portfolio@resend.dev',
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
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email via Resend');
      }

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
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
