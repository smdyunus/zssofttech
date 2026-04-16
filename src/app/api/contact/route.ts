import { NextResponse } from 'next/server';
import {
  enquiryPhoneDigits,
  validateEnquiryCourseSlug,
  validateEnquiryEmailOptional,
  validateEnquiryMessage,
  validateEnquiryName,
  validateEnquiryPhone,
} from '@/lib/contact-enquiry-validation';
import {
  isSmtpConfigured,
  sendContactEnquiryEmail,
  sendContactViaFormSubmit,
} from '@/lib/contact-mail';

export const runtime = 'nodejs';

/**
 * GET /api/contact — tells the client whether server SMTP is configured (no secrets).
 *
 * POST /api/contact
 * 1) If CONTACT_SMTP_USER + CONTACT_SMTP_PASS → Nodemailer.
 * 2) Else → FormSubmit (server-side; may fail on some hosts).
 */

export async function GET() {
  return NextResponse.json({ smtpConfigured: isSmtpConfigured() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const courseSlug = typeof b.course === 'string' ? b.course.trim() : '';
  const message = typeof b.message === 'string' ? b.message : '';

  const nameErr = validateEnquiryName(name);
  if (nameErr) {
    return NextResponse.json({ error: nameErr }, { status: 400 });
  }
  const phoneErr = validateEnquiryPhone(phone);
  if (phoneErr) {
    return NextResponse.json({ error: phoneErr }, { status: 400 });
  }
  const emailErr = validateEnquiryEmailOptional(email);
  if (emailErr) {
    return NextResponse.json({ error: emailErr }, { status: 400 });
  }
  const courseErr = validateEnquiryCourseSlug(courseSlug);
  if (courseErr) {
    return NextResponse.json({ error: courseErr }, { status: 400 });
  }
  const messageErr = validateEnquiryMessage(message);
  if (messageErr) {
    return NextResponse.json({ error: messageErr }, { status: 400 });
  }

  const payload = {
    name: name.trim(),
    phone: enquiryPhoneDigits(phone),
    email: email.trim(),
    courseSlug: courseSlug.trim(),
    message: message.trim(),
  };

  try {
    if (isSmtpConfigured()) {
      await sendContactEnquiryEmail(payload);
    } else {
      console.warn(
        '[api/contact] SMTP not set; using FormSubmit fallback (CONTACT_FORMSUBMIT_EMAIL or zssofttech@gmail.com)'
      );
      await sendContactViaFormSubmit(payload);
    }
  } catch (err) {
    console.error('[contact]', err);
    const details =
      process.env.NODE_ENV === 'development' && err instanceof Error
        ? err.message
        : undefined;
    return NextResponse.json(
      {
        error:
          'Could not send your enquiry. If this persists, use WhatsApp or phone on the contact page.',
        ...(details ? { details } : {}),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
