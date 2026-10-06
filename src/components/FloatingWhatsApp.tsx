'use client';

import { instituteInfo } from '@/lib/data/institute';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 6.9 2.7 9.8L4 44l10.5-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6-.8-8.5-2.2l-.6-.4-6.2 1.6 1.6-6-.4-.6C8.7 30 8 27.1 8 24 8 15.2 15.2 8 24 8s16 7.2 16 16-7.2 16-16 16zm8.8-11.9c-.5-.2-2.8-1.4-3.2-1.6-.4-.1-.7-.2-1 .2-.3.5-1.2 1.6-1.5 1.9-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-.9.2-.2.5-.5.7-.8.2-.2.3-.5.4-.8.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.4-3.3-.4-.8-.7-.7-1-.7h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.1 4.8 7.6 6.7 1.1.5 1.9.7 2.5.9 1.1.3 2 .3 2.8.2.9-.1 2.8-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.5-.3-.9-.5z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    "Hi ZS Soft Tech! I'm interested in your courses."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="group fixed bottom-6 left-6 z-[60] flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 rounded-full"
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/35 transition-transform group-hover:scale-105 group-hover:bg-[#20bd5b]">
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
          1
        </span>
      </span>

      <span className="relative hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-lg shadow-black/15 min-w-[7.25rem] justify-center">
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white shadow-[-1px_1px_1px_rgba(0,0,0,0.04)]"
        />
        <span className="group-hover:hidden">Contact us</span>
        <span className="hidden group-hover:inline">WhatsApp</span>
      </span>
    </a>
  );
}
