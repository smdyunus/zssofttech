'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { googleReviewStats, testimonials } from '@/lib/data/testimonials';
import { instituteInfo } from '@/lib/data/institute';

const AVATAR_COLORS = [
  'bg-secondary/15 text-secondary',
  'bg-primary/15 text-primary',
  'bg-emerald-500/15 text-emerald-700',
  'bg-amber-500/15 text-amber-700',
  'bg-sky-500/15 text-sky-700',
  'bg-rose-500/15 text-rose-700',
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

function avatarTone(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

function GoogleGLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    const amount = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-14"
        >
          <span className="section-label-purple mb-4">Recognition</span>
          <h2 className="section-heading text-foreground mb-3">
            What Students Say on Google
          </h2>
          <p className="section-lead section-lead-center text-muted mb-3">
            Honest reviews from learners who trained with us in Nandyal.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-foreground/80">
            <span className="font-bold text-foreground">{googleReviewStats.rating.toFixed(1)}</span>
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-muted">· {googleReviewStats.count} Google reviews</span>
          </div>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border text-muted hover:text-foreground hover:border-secondary/40 shadow-md transition-all"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border text-muted hover:text-foreground hover:border-secondary/40 shadow-md transition-all"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-1 md:px-12"
            style={{ scrollbarWidth: 'thin' }}
          >
            {testimonials.map((review, i) => (
              <motion.article
                key={review.id}
                data-review-card
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.05, 0.25), duration: 0.4 }}
                className="premium-card snap-start shrink-0 w-[min(100%,280px)] sm:w-[300px] p-5 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  {review.image ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border bg-secondary/5 shrink-0">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover object-top"
                        sizes="44px"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold ${avatarTone(review.name)}`}
                      aria-hidden
                    >
                      {initials(review.name)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-secondary truncate leading-snug">
                      {review.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{review.timeAgo}</p>
                  </div>
                  <GoogleGLogo className="w-5 h-5 shrink-0 mt-0.5" />
                </div>

                <div className="flex gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-none text-border'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex-1 max-h-[140px] overflow-y-auto pr-1 text-sm text-foreground/80 leading-relaxed">
                  {review.content}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={instituteInfo.mapPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            <GoogleGLogo className="w-4 h-4" />
            See all {googleReviewStats.count} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
