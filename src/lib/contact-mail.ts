import { enquiryCourseTitleFromSlug } from '@/lib/contact-enquiry-validation';

/**
 * Who receives enquiry emails (SMTP `to:`).
 * Set `CONTACT_RECIPIENT_EMAIL` in Vercel (comma-separated for multiple). If unset, defaults to
 * `CONTACT_SMTP_USER` so the inbox matches the sending account.
 */
function getContactRecipientEmails(fallbackSmtpUser: string): string[] {
  const raw = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  if (raw) {
    const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }
  return [fallbackSmtpUser];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function courseLabelFromSlug(slug: string): string {
  return enquiryCourseTitleFromSlug(slug);
}

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  courseSlug: string;
  message: string;
};

/** Gmail app passwords are 16 chars; Google often shows them with spaces — SMTP expects no spaces. */
function normalizeSmtpPassword(raw: string | undefined): string {
  if (!raw) return '';
  return raw.trim().replace(/\s+/g, '');
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.CONTACT_SMTP_USER?.trim() && normalizeSmtpPassword(process.env.CONTACT_SMTP_PASS)
  );
}

export async function sendContactEnquiryEmail(payload: ContactPayload): Promise<void> {
  const user = process.env.CONTACT_SMTP_USER?.trim();
  const pass = normalizeSmtpPassword(process.env.CONTACT_SMTP_PASS);
  if (!user || !pass) {
    throw new Error('Email is not configured (missing CONTACT_SMTP_USER / CONTACT_SMTP_PASS).');
  }

  const host = process.env.CONTACT_SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.CONTACT_SMTP_PORT) || 465;
  const secure =
    process.env.CONTACT_SMTP_SECURE === 'true'
      ? true
      : process.env.CONTACT_SMTP_SECURE === 'false'
        ? false
        : port === 465;

  const from =
    process.env.CONTACT_FROM?.trim() || `ZS Soft Tech Website <${user}>`;

  const courseTitle = courseLabelFromSlug(payload.courseSlug);
  const subject = `New website enquiry — ${courseTitle}`;

  const safeName = escapeHtml(payload.name);
  const safePhone = escapeHtml(payload.phone);
  const safeEmail = escapeHtml(payload.email || '—');
  const safeCourse = escapeHtml(courseTitle);
  const safeMessage = escapeHtml(payload.message || '—').replace(/\n/g, '<br/>');

  const text = [
    'New enquiry from zssofttech.com',
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || '—'}`,
    `Course: ${courseTitle}`,
    '',
    'Message:',
    payload.message || '—',
  ].join('\n');

  const html = `
<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
  <h2 style="margin:0 0 12px">New website enquiry</h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${safeName}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td><strong>${safePhone}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${safeEmail}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Course</td><td>${safeCourse}</td></tr>
  </table>
  <p style="margin:16px 0 4px;color:#666;font-size:13px">Message</p>
  <div style="border-left:3px solid #3b82f6;padding:8px 12px;background:#f8fafc">${safeMessage}</div>
</body></html>`;

  const { default: nodemailer } = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: getContactRecipientEmails(user).join(', '),
    replyTo: payload.email.trim() || undefined,
    subject,
    text,
    html,
  });
}

/**
 * When SMTP env vars are not set, deliver via FormSubmit (no app password needed).
 * Inbox must be activated once at https://formsubmit.co
 * Override with CONTACT_FORMSUBMIT_EMAIL (defaults to zssofttech@gmail.com).
 */
export async function sendContactViaFormSubmit(
  payload: ContactPayload
): Promise<void> {
  const inbox =
    process.env.CONTACT_FORMSUBMIT_EMAIL?.trim() || 'zssofttech@gmail.com';
  const courseTitle = courseLabelFromSlug(payload.courseSlug);
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`;

  const body: Record<string, string> = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '—',
    course: courseTitle,
    message: payload.message || '—',
    _subject: `New website enquiry — ${courseTitle}`,
    _captcha: 'false',
  };
  const em = payload.email.trim();
  if (em) {
    body._replyto = em;
    body._cc = em;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  let parsed: { success?: string; message?: string } = {};
  try {
    parsed = JSON.parse(raw) as { success?: string; message?: string };
  } catch {
    /* FormSubmit may return plain text */
  }

  if (!res.ok) {
    throw new Error(
      parsed.message || `FormSubmit request failed (${res.status})`
    );
  }
  if (parsed.success === 'false') {
    throw new Error(parsed.message || 'FormSubmit rejected the submission');
  }
}
