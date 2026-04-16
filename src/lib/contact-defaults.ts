/**
 * Default inbox for FormSubmit (contact page + chat) when CONTACT_FORMSUBMIT_EMAIL /
 * NEXT_PUBLIC_FORMSUBMIT_EMAIL are unset. Override via those env vars if needed.
 */
export const DEFAULT_FORMSUBMIT_INBOX = 'info.zssoft@gmail.com';

/** Default subject prefix when no env override (SMTP + FormSubmit, contact + chat). */
export const CONTACT_ENQUIRY_SUBJECT_PREFIX = 'ZS Soft Tech enquiry';

/**
 * Subject / heading prefix for enquiry emails.
 * - Server (SMTP, POST /api/contact FormSubmit): set `CONTACT_ENQUIRY_SUBJECT_PREFIX` in Vercel (runtime).
 * - Browser FormSubmit: set `NEXT_PUBLIC_CONTACT_ENQUIRY_SUBJECT_PREFIX` (requires rebuild after change).
 */
export function getContactEnquirySubjectPrefix(): string {
  if (typeof process === 'undefined' || !process.env) {
    return CONTACT_ENQUIRY_SUBJECT_PREFIX;
  }
  return (
    process.env.CONTACT_ENQUIRY_SUBJECT_PREFIX?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_ENQUIRY_SUBJECT_PREFIX?.trim() ||
    CONTACT_ENQUIRY_SUBJECT_PREFIX
  );
}
