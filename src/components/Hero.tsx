'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ContactUsLink from '@/components/ContactUsLink';
import { FEATURE_INTERNSHIPS } from '@/lib/feature-flags';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

type CtaTarget = 'contact' | 'courses' | 'internships';

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  gradient: string;
  highlight: string;
  image: string;
  overlayClass: string;
  primaryTo?: CtaTarget;
  secondaryTo?: CtaTarget;
};

const allSlides: HeroSlide[] = [
  {
    id: 5,
    title: 'Break the “No Experience — No Job” Cycle',
    subtitle:
      'Class-to-career internships with real projects, mentorship, and a clear path into tech — open to every degree background.',
    cta: 'Explore Internships',
    ctaSecondary: 'Contact Us',
    gradient: 'from-secondary/40 via-primary/25 to-accent/30',
    highlight: 'Internships',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=70',
    overlayClass: 'bg-black/65',
    primaryTo: 'internships',
    secondaryTo: 'contact',
  },
  {
    id: 1,
    title: 'Python & Data Analysis — 45-Day Fast Track',
    subtitle:
      'Summer AI course in Nandyal for Inter, Degree & B.Tech. Starts 6 Apr 2026 — Mon–Fri, expert trainer, limited batches.',
    cta: 'Enquire Now',
    ctaSecondary: 'View All Courses',
    gradient: 'from-primary/35 via-secondary/25 to-accent/30',
    highlight: '45-Day Fast Track',
    image: '/images/hero/hero-python-45day-fasttrack.png',
    overlayClass: 'bg-black/70',
    primaryTo: 'contact',
    secondaryTo: 'courses',
  },
  {
    id: 2,
    title: 'Learn Tomorrow’s Tech — Starting in Nandyal',
    subtitle:
      'Agentic AI, Gen AI, Full Stack, DevOps, and System Design — hands-on programs designed for real industry work.',
    cta: 'Explore Courses',
    ctaSecondary: 'Book Free Demo',
    gradient: 'from-primary/35 via-secondary/25 to-accent/30',
    highlight: 'AI-First',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=70',
    overlayClass: 'bg-black/65',
    primaryTo: 'courses',
    secondaryTo: 'contact',
  },
  {
    id: 3,
    title: 'Build Skills That Stay Relevant',
    subtitle:
      'Strong engineering fundamentals, practical AI workflows, and projects you can show in interviews — training built for real roles.',
    cta: 'Explore Courses',
    ctaSecondary: 'Contact Us',
    gradient: 'from-secondary/35 via-primary/20 to-accent/30',
    highlight: 'Career Ready',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=70',
    overlayClass: 'bg-black/65',
    primaryTo: 'courses',
    secondaryTo: 'contact',
  },
  {
    id: 4,
    title: 'Premium Software Training in Nandyal',
    subtitle:
      'Expert mentors, live projects, and placement guidance — so you can grow from classroom learning to interview-ready confidence.',
    cta: 'View All Courses',
    ctaSecondary: 'WhatsApp Us',
    gradient: 'from-primary/30 via-accent/20 to-secondary/30',
    highlight: '150+ Placed',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=70',
    overlayClass: 'bg-black/65',
    primaryTo: 'courses',
    secondaryTo: 'contact',
  },
];

const slides: HeroSlide[] = FEATURE_INTERNSHIPS
  ? allSlides
  : allSlides.filter((s) => s.primaryTo !== 'internships');

const primaryBtnClass =
  'group px-7 py-3.5 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-95 transition-all shadow-xl shadow-primary/30 flex items-center gap-2 tracking-wide';
const secondaryBtnClass =
  'group px-7 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2 border border-white/25 tracking-wide';

function hrefFor(target: CtaTarget): string {
  if (target === 'internships') return '/internships';
  if (target === 'courses') return '/courses';
  return '/contact';
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-deep">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[currentSlide].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`} />
        </motion.div>
      </AnimatePresence>

      <div
        className={`absolute inset-0 transition-colors duration-500 ${slides[currentSlide].overlayClass ?? 'bg-black/65'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/85 via-dark-bg/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-brand-deep/40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[90vh] flex flex-col justify-center py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55 }}
              className="max-w-4xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/35 text-orange-100 border border-white/30 text-[11px] font-semibold tracking-[0.14em] uppercase mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {slides[currentSlide].highlight}
              </span>

              <h1 className="page-heading hero-copy mb-5">
                {slides[currentSlide].title}
              </h1>

              <p className="section-lead hero-copy-muted max-w-2xl mb-9">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                {(() => {
                  const slide = slides[currentSlide];
                  const primary = slide.primaryTo ?? 'courses';
                  const secondary = slide.secondaryTo ?? 'contact';
                  const primaryEl =
                    primary === 'contact' ? (
                      <ContactUsLink className={primaryBtnClass}>
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </ContactUsLink>
                    ) : (
                      <Link href={hrefFor(primary)} className={primaryBtnClass}>
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    );
                  const secondaryEl =
                    secondary === 'contact' ? (
                      <ContactUsLink className={secondaryBtnClass}>
                        <Play className="w-4 h-4" />
                        {slide.ctaSecondary}
                      </ContactUsLink>
                    ) : (
                      <Link href={hrefFor(secondary)} className={secondaryBtnClass}>
                        <Play className="w-4 h-4" />
                        {slide.ctaSecondary}
                      </Link>
                    );
                  return (
                    <>
                      {primaryEl}
                      {secondaryEl}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/65'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-colors backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-colors backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
