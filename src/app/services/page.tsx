import type { Metadata } from 'next';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore ZS Soft Tech services: software development, mobile app development, QA and automation testing, internship programs, corporate training, placement support, IT consulting, and digital solutions.',
};

export default function ServicesPage() {
  const serviceStats = [
    { label: 'Service Verticals', value: '8+' },
    { label: 'Delivery Model', value: 'Hybrid' },
    { label: 'Response Window', value: '24/7' },
    { label: 'Support Coverage', value: 'Pan India' },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=70"
          alt="ZS Soft Tech Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/92 via-dark-bg/72 to-brand-deep/45" />
        <div className="relative z-10 container mx-auto px-6 py-10 sm:py-12 flex flex-col items-start">
          <p className="banner-eyebrow mb-2">
            ZS Soft Tech · Nandyal
          </p>
          <h1 className="page-heading hero-copy max-w-2xl">
            Technology services for businesses, students, and growing teams
          </h1>
          <p className="mt-3 section-lead hero-copy-muted max-w-xl">
            From software delivery to training and career support — clear offerings built to scale with you.
          </p>
        </div>
      </section>

      <section className="py-8 bg-background border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {serviceStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/50 bg-card/40 px-4 py-4 text-center"
              >
                <p className="text-xl sm:text-2xl font-bold text-primary tabular-nums">{stat.value}</p>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-muted mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <CTASection />
    </>
  );
}
