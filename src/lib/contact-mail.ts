import {
  DEFAULT_FORMSUBMIT_INBOX,
  getContactEnquirySubjectPrefix,
} from '@/lib/contact-defaults';
import { enquiryCourseTitleFromSlug } from '@/lib/contact-enquiry-validation';

/**
 * Who receives enquiry emails (SMTP `to:`).
 * Set `CONTACT_RECIPIENT_EMAIL` in Vercel (comma-separated for multiple). If unset, defaults to
 * `CONTACT_SMTP_USER` so the inbox matches the sending account.
 */
function getContactRecipientEmails(fallbackSmtpUser: string): string[] {
  const raw = stripSurroundingQuotes(process.env.CONTACT_RECIPIENT_EMAIL);
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

/** Avoid `.env` mistakes like CONTACT_SMTP_PASS="xxxx" keeping literal quotes in the value. */
function stripSurroundingQuotes(raw: string | undefined): string {
  const t = (raw ?? '').trim();
  if (t.length >= 2) {
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
      return t.slice(1, -1).trim();
    }
  }
  return t;
}

/** Gmail app passwords are 16 chars; Google often shows them with spaces — spaces are stripped for SMTP. */
function normalizeSmtpPassword(raw: string | undefined): string {
  const t = stripSurroundingQuotes(raw);
  if (!t) return '';
  return t.replace(/\s+/g, '');
}

/** Template / example values should not count as real SMTP (avoids 535 when placeholder left in .env.local). */
function isPlaceholderSmtpPassword(pass: string): boolean {
  const p = pass.toLowerCase();
  return (
    /^REPLACE_WITH/i.test(pass) ||
    p === 'your-16-char-app-password' ||
    p.includes('paste_your') ||
    p.includes('changeme')
  );
}

function smtpUserFromEnv(): string {
  return stripSurroundingQuotes(process.env.CONTACT_SMTP_USER);
}

function smtpPasswordFromEnv(): string {
  return normalizeSmtpPassword(process.env.CONTACT_SMTP_PASS);
}

export function isSmtpConfigured(): boolean {
  const pass = smtpPasswordFromEnv();
  return Boolean(smtpUserFromEnv() && pass && !isPlaceholderSmtpPassword(pass));
}

export async function sendContactEnquiryEmail(payload: ContactPayload): Promise<void> {
  const user = smtpUserFromEnv();
  const pass = smtpPasswordFromEnv();
  if (!user || !pass || isPlaceholderSmtpPassword(pass)) {
    throw new Error('Email is not configured (missing CONTACT_SMTP_USER / CONTACT_SMTP_PASS).');
  }

  const host = process.env.CONTACT_SMTP_HOST?.trim() || 'smtp.gmail.com';
  const portRaw = process.env.CONTACT_SMTP_PORT?.trim();
  const portNum = portRaw ? Number(portRaw) : NaN;
  const port =
    Number.isFinite(portNum) && portNum > 0 && portNum <= 65535
      ? portNum
      : 465;
  const secure =
    process.env.CONTACT_SMTP_SECURE === 'true'
      ? true
      : process.env.CONTACT_SMTP_SECURE === 'false'
        ? false
        : port === 465;

  const from =
    stripSurroundingQuotes(process.env.CONTACT_FROM) ||
    `ZS Soft Tech Website <${user}>`;

  const courseTitle = courseLabelFromSlug(payload.courseSlug);
  const subjectPrefix = getContactEnquirySubjectPrefix();
  const subject = `${subjectPrefix} — ${courseTitle}`;

  const safeName = escapeHtml(payload.name);
  const safePhone = escapeHtml(payload.phone);
  const safeEmail = escapeHtml(payload.email || '—');
  const safeCourse = escapeHtml(courseTitle);
  const safeMessage = escapeHtml(payload.message || '—').replace(/\n/g, '<br/>');

  const text = [
    subjectPrefix,
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
  <h2 style="margin:0 0 12px">${escapeHtml(subjectPrefix)}</h2>
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

/** FormSubmit inbox: server prefers CONTACT_*; aligns with client NEXT_PUBLIC_FORMSUBMIT_EMAIL when set. */
function getFormSubmitInbox(): string {
  return (
    process.env.CONTACT_FORMSUBMIT_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL?.trim() ||
    DEFAULT_FORMSUBMIT_INBOX
  );
}

/**
 * When SMTP env vars are not set, deliver via FormSubmit (no app password needed).
 * Inbox must be activated once at https://formsubmit.co
 * Set CONTACT_FORMSUBMIT_EMAIL or NEXT_PUBLIC_FORMSUBMIT_EMAIL (see contact-defaults.ts).
 */
export async function sendContactViaFormSubmit(
  payload: ContactPayload
): Promise<void> {
  const inbox = getFormSubmitInbox();
  const courseTitle = courseLabelFromSlug(payload.courseSlug);
  const subjectPrefix = getContactEnquirySubjectPrefix();
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`;

  const body: Record<string, string> = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '—',
    course: courseTitle,
    message: payload.message || '—',
    _subject: `${subjectPrefix} — ${courseTitle}`,
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
