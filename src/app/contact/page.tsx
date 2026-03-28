import { Suspense } from 'react';
import ContactPageClient from './ContactPageClient';

export default function ContactPage() {
  return (
    <Suspense fallback={<section className="py-20 lg:py-28 bg-background" />}>
      <ContactPageClient />
    </Suspense>
  );
}
