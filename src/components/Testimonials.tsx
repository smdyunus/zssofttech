'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-secondary mb-4 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Real stories from real students who transformed their careers with ZS Soft Tech.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 md:p-12 text-center">
                  <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />

                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                    &quot;{testimonials[current].content}&quot;
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: testimonials[current].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      )
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 mb-4">
                      <Image
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-muted">{testimonials[current].role}</div>
                    <div className="text-sm text-primary mt-1">
                      Joined: {testimonials[current].joinedCompany}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      {testimonials[current].course}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
