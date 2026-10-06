'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { placedStudents } from '@/lib/data/placed-students';

const VISIBLE = 3;
const AUTO_MS = 4000;

export default function PlacedStudents() {
  const [start, setStart] = useState(0);
  const total = placedStudents.length;
  const maxStart = Math.max(0, total - VISIBLE);

  const next = useCallback(() => {
    setStart((prev) => (prev >= maxStart ? 0 : prev + 1));
  }, [maxStart]);

  const prev = useCallback(() => {
    setStart((prev) => (prev <= 0 ? maxStart : prev - 1));
  }, [maxStart]);

  useEffect(() => {
    if (total <= VISIBLE) return;
    const timer = setInterval(next, AUTO_MS);
    return () => clearInterval(timer);
  }, [next, total]);

  const visibleStudents = placedStudents.slice(start, start + VISIBLE);

  return (
    <section className="py-20 lg:py-28 bg-background-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4">Placements</span>
          <h2 className="section-heading text-foreground mb-4">
            Careers That{' '}
            <span className="gradient-text">Started Here</span>
          </h2>
          <p className="section-lead section-lead-center text-muted">
            Our learners are working as QA engineers and full stack developers at
            companies across India — proof that structured training turns into real roles.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted shadow-md transition-all hover:border-secondary/40 hover:text-foreground md:-translate-x-4"
            aria-label="Previous placed students"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted shadow-md transition-all hover:border-secondary/40 hover:text-foreground md:translate-x-4"
            aria-label="Next placed students"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="overflow-hidden px-2 sm:px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={start}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-3 gap-3 sm:gap-4"
              >
                {visibleStudents.map((student) => (
                  <article
                    key={student.id}
                    className="premium-card group overflow-hidden"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={student.image}
                        alt={student.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 220px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <h3 className="text-sm font-bold leading-snug text-white drop-shadow-sm">
                          {student.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-white/85">{student.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 p-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                            Joined
                          </p>
                          <p className="text-sm font-semibold leading-snug text-foreground">
                            {student.company}
                          </p>
                        </div>
                      </div>
                      <p className="pl-5 text-[11px] text-muted">{student.course}</p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === start ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-secondary/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
