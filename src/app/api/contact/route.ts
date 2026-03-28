import { NextResponse } from 'next/server';
import { courses } from '@/lib/data/courses';
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

function validPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

function validEmail(email: string): boolean {
  if (!email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  const message = typeof b.message === 'string' ? b.message.trim() : '';

  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!phone || !validPhone(phone)) {
    return NextResponse.json(
      { error: 'Enter a valid 10-digit mobile number.' },
      { status: 400 }
    );
  }
  if (!validEmail(email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 }
    );
  }
  if (!courseSlug || !courses.some((c) => c.slug === courseSlug)) {
    return NextResponse.json(
      { error: 'Please select a valid course.' },
      { status: 400 }
    );
  }

  const payload = { name, phone, email, courseSlug, message };

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
    return NextResponse.json(
      {
        error:
          'Could not send your enquiry. If this persists, use WhatsApp or phone on the contact page.',
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
