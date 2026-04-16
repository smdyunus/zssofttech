import {
  DEFAULT_FORMSUBMIT_INBOX,
  getContactEnquirySubjectPrefix,
} from '@/lib/contact-defaults';
import { enquiryCourseTitleFromSlug } from '@/lib/contact-enquiry-validation';

export const FORMSUBMIT_INBOX =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? DEFAULT_FORMSUBMIT_INBOX;

export const FORCE_BROWSER_FORMSUBMIT =
  process.env.NEXT_PUBLIC_CONTACT_FORCE_FORMSUBMIT === 'true';

export type ContactEnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  courseSlug: string;
  message: string;
};

export async function submitEnquiryViaBrowserFormSubmit(
  payload: ContactEnquiryPayload
): Promise<void> {
  const courseTitle = enquiryCourseTitleFromSlug(payload.courseSlug);
  const email = payload.email.trim();
  const subjectPrefix = getContactEnquirySubjectPrefix();
  const body: Record<string, string | boolean> = {
    name: payload.name,
    phone: payload.phone,
    email: email || '—',
    course: courseTitle,
    message: payload.message,
    _subject: `${subjectPrefix} — ${courseTitle}`,
    _captcha: false,
  };
  if (email) {
    body._replyto = email;
    body._cc = email;
  }

  const url = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_INBOX)}`;
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
    /* ignore */
  }

  if (!res.ok) {
    throw new Error(
      parsed.message ||
        `Could not send (${res.status}). Confirm FormSubmit for ${FORMSUBMIT_INBOX}.`
    );
  }
  if (parsed.success === 'false') {
    throw new Error(
      parsed.message ||
        'FormSubmit rejected the request. Activate this email once at formsubmit.co (check inbox).'
    );
  }
}

export async function getContactMailDelivery(): Promise<'smtp' | 'forms'> {
  if (FORCE_BROWSER_FORMSUBMIT) return 'forms';
  try {
    const r = await fetch('/api/contact');
    const d = (await r.json()) as { smtpConfigured?: boolean };
    return d.smtpConfigured ? 'smtp' : 'forms';
  } catch {
    return 'forms';
  }
}

export type ContactSubmitResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      smtpUnavailable?: boolean;
      hint?: string;
    };

export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
  mailDelivery: 'smtp' | 'forms'
): Promise<ContactSubmitResult> {
  if (mailDelivery === 'smtp') {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        course: payload.courseSlug,
        message: payload.message,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      hint?: string;
      details?: string;
      ok?: boolean;
    };
    if (!res.ok) {
      if (res.status === 503 && data.error === 'email_not_configured') {
        return {
          ok: false,
          error:
            'We can’t deliver this enquiry by email yet. Please use WhatsApp or call us—we’ll respond right away.',
          smtpUnavailable: true,
          hint: data.hint,
        };
      }
      const base = data.error || 'Something went wrong. Please try again.';
      const withDetails =
        process.env.NODE_ENV === 'development' && data.details
          ? `${base} (${data.details})`
          : base;
      return {
        ok: false,
        error: withDetails,
      };
    }
    return { ok: true };
  }

  try {
    await submitEnquiryViaBrowserFormSubmit(payload);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error ? e.message : 'Network error. Please try again.',
    };
  }
}
