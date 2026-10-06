'use client';

import { motion } from 'framer-motion';
import ContactUsLink from '@/components/ContactUsLink';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-70" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-5xl mx-auto premium-panel overflow-hidden relative"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative px-6 sm:px-12 py-14 sm:py-16 text-center">
            <div className="section-label mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Start Your Journey Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight">
              Ready to{' '}
              <span className="gradient-text">Transform Your Career?</span>
            </h2>

            <p className="text-muted text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of students who have launched successful tech careers
              from Nandyal. Your first step starts with a free counseling session.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <ContactUsLink className="btn-premium">
                Get Free Counseling
                <ArrowRight className="w-4 h-4" />
              </ContactUsLink>
              <a
                href={`https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=Hi%20ZS%20Soft%20Tech!%20I%27m%20interested%20in%20your%20courses.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-foreground border border-border bg-white hover:border-secondary/30 hover:bg-secondary/5 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                WhatsApp Us
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Free Demo Classes
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                EMI Options Available
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Placement Assistance
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
