import type { Metadata } from 'next';
import NandyalAdvantage from '@/components/NandyalAdvantage';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ZS Soft Tech — Nandyal\'s premier IT training & software development hub. Our vision, experience, and commitment to transforming careers in technology.',
};

export default function AboutPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative h-56 lg:h-72 rounded-2xl overflow-hidden mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200"
              alt="About ZS Soft Tech"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="page-heading hero-copy">
                About ZS Soft Tech
              </h1>
              <p className="hero-copy-muted text-sm sm:text-base mt-2 max-w-xl">
                Nandyal&apos;s premium IT training and software development hub
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-heading text-foreground mb-6">
              Our <span className="gradient-text">Story</span>
            </h2>
            <p className="section-lead section-lead-center max-w-3xl text-muted">
              Founded in 2024 to bring serious technology education to Nandyal,
              ZS Soft Tech is a premium IT training and software development hub.
              In two years we have placed 150+ students and become a trusted
              destination for Full Stack, AI, DevOps, and Testing. We focus on
              industry-ready skills, hands-on projects, and the confidence to
              grow in a global tech career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-sm text-muted leading-relaxed">
                To be Andhra Pradesh&apos;s leading technology education hub —
                developing professionals who compete with confidence anywhere.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-sm text-muted leading-relaxed">
                Deliver hands-on technology training with personal mentorship
                and practical career support at every stage.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Roots</h3>
              <p className="text-sm text-muted leading-relaxed">
                Born in Nandyal, built for the world. Local roots with global
                standards of craft, clarity, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <NandyalAdvantage />
      <CTASection />
    </>
  );
}
