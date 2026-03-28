'use client';

import { motion } from 'framer-motion';
import { hiringPartners } from '@/lib/data/testimonials';

export default function HiringPartners() {
  const doubled = [...hiringPartners, ...hiringPartners];

  return (
    <section className="py-16 lg:py-20 bg-card/30 border-y border-border/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Our Students Work At{' '}
            <span className="gradient-text">Top Companies</span>
          </h2>
          <p className="text-muted text-sm">
            20+ hiring partners across India and abroad
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubled.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex-shrink-0 mx-6 px-8 py-4 rounded-xl border border-border/30 bg-card/50 flex items-center justify-center min-w-[180px] hover:border-primary/30 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
