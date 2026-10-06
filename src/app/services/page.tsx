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
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/40" />
        <div className="relative z-10 container mx-auto px-6 py-10 sm:py-12 flex flex-col items-start">
          <p className="text-xs uppercase tracking-widest text-orange-300 font-semibold mb-2">
            ZS Soft Tech · Nandyal
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-snug">
            Technology services designed for businesses, students, and teams.
          </h1>
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
