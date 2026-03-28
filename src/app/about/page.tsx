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
              <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                About ZS Soft Tech
              </h1>
              <p className="text-gray-200 text-sm mt-1">Nandyal&apos;s Premier IT Training Hub</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Our <span className="gradient-text">Story</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Founded in 2024 with a vision to bring world-class technology education to
              Nandyal, ZS Soft Tech is a premium IT Training & Software
              Development Hub. In just 2 years, we have placed 150+ students and
              established ourselves as the go-to institute for Full Stack, AI, DevOps,
              and Testing training. Our mission is to empower the next
              generation of tech professionals with industry-ready skills,
              hands-on experience, and the confidence to thrive in the global
              tech ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-sm text-muted">
                To be the leading technology education hub in Andhra Pradesh,
                producing industry-ready professionals who compete globally.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-sm text-muted">
                Deliver cutting-edge, hands-on technology training with
                personalized mentorship and guaranteed career support.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Roots</h3>
              <p className="text-sm text-muted">
                Born in Nandyal, built for the world. We take pride in our
                local roots while maintaining global standards of excellence.
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
