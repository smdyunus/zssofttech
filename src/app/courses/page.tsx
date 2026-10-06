import type { Metadata } from 'next';
import FeaturedCourses from '@/components/FeaturedCourses';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Explore industry-ready courses in Full Stack Development (MERN, Java), Agentic AI, Gen AI, AWS DevOps, Azure Cloud, Data Analytics, Medical Coding, and System Design at ZS Soft Tech, Nandyal.',
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=70"
          alt="Courses at ZS Soft Tech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/40" />
        <div className="relative z-10 container mx-auto px-6 py-8 sm:py-10 flex flex-col items-start">
          <p className="text-xs uppercase tracking-widest text-orange-300 font-semibold mb-2">
            ZS Soft Tech · Nandyal
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-xl leading-snug">
            Master Software Development with our structured courses designed to make you{' '}
            <span className="text-orange-400">job-ready.</span>
          </h1>
        </div>
      </section>

      <FeaturedCourses showHeader={false} />
      <CTASection />
    </>
  );
}
