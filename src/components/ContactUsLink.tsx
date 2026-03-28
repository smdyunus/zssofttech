'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dispatchContactEnquiryReset } from '@/lib/contact-enquiry-reset';

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

/** Use for any “Contact” nav link so revisiting /contact resets the enquiry thank-you state. */
export default function ContactUsLink({
  href = '/contact',
  className,
  children,
  onClick,
}: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        onClick?.();
        const pathOnly = href.split('?')[0] || href;
        if (pathname === '/contact' && pathOnly === '/contact') {
          dispatchContactEnquiryReset();
        }
      }}
    >
      {children}
    </Link>
  );
}
