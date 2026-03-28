/** Dispatched when the user opens Contact again so the enquiry form leaves the “thank you” state. */
export const CONTACT_ENQUIRY_RESET_EVENT = 'zssofttech:contact-enquiry-reset';

export function dispatchContactEnquiryReset(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONTACT_ENQUIRY_RESET_EVENT));
}
