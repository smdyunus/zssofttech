'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Python & Data Analysis — 45-Day Fast Track',
    subtitle:
      'Summer AI course in Nandyal for Inter, Degree & B.Tech. Starts 6 Apr 2026 — Mon–Fri, expert trainer, limited batches.',
    cta: 'Enquire Now',
    ctaSecondary: 'View All Courses',
    gradient: 'from-blue-600/30 via-purple-600/20 to-cyan-600/30',
    highlight: '45-Day Fast Track',
    image: '/images/hero/hero-python-45day-fasttrack.png',
    overlayClass: 'bg-black/50',
  },
  {
    id: 2,
    title: 'Master the Future of Technology in Nandyal',
    subtitle: 'From Agentic AI & Gen AI to Full Stack Development, DevOps, and System Design — get industry-ready with hands-on training.',
    cta: 'Explore Courses',
    ctaSecondary: 'Book Free Demo',
    gradient: 'from-blue-600/30 via-purple-600/20 to-cyan-600/30',
    highlight: 'AI-First',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=70',
    overlayClass: 'bg-black/50',
  },
  {
    id: 3,
    title: 'Build Engineering Skills that AI Can\'t Replace',
    subtitle: 'Real fundamentals while learning how to leverage AI to code better, faster and smarter. 100% Job-ready training.',
    cta: 'Explore Courses',
    ctaSecondary: 'Contact Us',
    gradient: 'from-purple-600/30 via-blue-600/20 to-pink-600/30',
    highlight: '90% Placement',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=70',
    overlayClass: 'bg-black/50',
  },
  {
    id: 4,
    title: 'Real-Time Software Training Institute',
    subtitle: 'Join the Best Software Training Institute & Upgrade Your Skills! Expert trainers, hands-on projects, placement assistance.',
    cta: 'View All Courses',
    ctaSecondary: 'WhatsApp Us',
    gradient: 'from-cyan-600/30 via-blue-600/20 to-purple-600/30',
    highlight: '150+ Placed',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=70',
    overlayClass: 'bg-black/50',
  },
];

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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
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
        className={`absolute inset-0 transition-colors duration-500 ${slides[currentSlide].overlayClass ?? 'bg-black/50'}`}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[85vh] flex flex-col justify-center py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-primary text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {slides[currentSlide].highlight}
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight tracking-tight mb-3 text-white drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed mb-6">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={currentSlide === 0 ? '/contact' : '/courses'}
                  className="group px-5 py-2.5 bg-gradient-primary text-white rounded-lg font-semibold text-xs hover:opacity-90 transition-all shadow-xl flex items-center gap-1.5"
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href={currentSlide === 0 ? '/courses' : '/contact'}
                  className="group px-5 py-2.5 bg-white/20 backdrop-blur text-white rounded-lg font-semibold text-xs hover:bg-white/30 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" />
                  {slides[currentSlide].ctaSecondary}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-6 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
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
