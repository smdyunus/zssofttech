import { courses } from '@/lib/data/courses';

export const ENQUIRY_NAME_MAX = 120;
export const ENQUIRY_MESSAGE_MAX = 4000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Digits only (for phone input / payload). */
export function enquiryPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function validateEnquiryName(name: string): string | null {
  const t = name.trim();
  if (!t) return 'Name is required';
  if (t.length < 2) {
    return 'Please enter your full name (at least 2 characters)';
  }
  if (t.length > ENQUIRY_NAME_MAX) {
    return `Name must be ${ENQUIRY_NAME_MAX} characters or fewer`;
  }
  return null;
}

/** Exactly 10 digits, Indian mobile (starts with 6–9). No country code in the field. */
export function validateEnquiryPhone(phone: string): string | null {
  const digits = enquiryPhoneDigits(phone);
  if (!digits) return 'Phone number is required';
  if (digits.length !== 10) {
    return 'Enter exactly 10 digits';
  }
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return 'Enter a valid mobile number (10 digits, starting with 6–9)';
  }
  return null;
}

export function validateEnquiryEmail(email: string): string | null {
  const t = email.trim();
  if (!t) return 'Email is required';
  if (!EMAIL_RE.test(t)) {
    return 'Enter a valid email address';
  }
  return null;
}

/** For API / chat: empty is OK; if provided, must be a valid address. */
export function validateEnquiryEmailOptional(email: string): string | null {
  const t = email.trim();
  if (!t) return null;
  if (!EMAIL_RE.test(t)) {
    return 'Enter a valid email address';
  }
  return null;
}

export function validateEnquiryMessage(message: string): string | null {
  const t = message.trim();
  if (!t) return 'Message is required';
  if (t.length > ENQUIRY_MESSAGE_MAX) {
    return `Message must be ${ENQUIRY_MESSAGE_MAX} characters or fewer`;
  }
  return null;
}

export function validateEnquiryCourseSlug(slug: string): string | null {
  const t = slug.trim();
  if (!t) return 'Please select a course';
  if (!courses.some((c) => c.slug === t)) {
    return 'Please select a valid course';
  }
  return null;
}
