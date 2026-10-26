// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });

const isValidEmail = (value: string) =>
  /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !message.trim() ||
      !isValidEmail(email)
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.EMAIL_TO!,
      subject: `New Message from ${name} on your Portfolio`,
      replyTo: email,
      html: `<p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${safeMessage}</p>`,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
