'use client';

import { motion } from 'framer-motion';
import ContactUsLink from '@/components/ContactUsLink';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to{' '}
            <span className="gradient-text">Transform Your Career?</span>
          </h2>

          <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of students who have launched successful tech careers
            from Nandyal. Your first step starts with a free counseling session.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <ContactUsLink className="group px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold text-base hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex items-center gap-2">
              Get Free Counseling
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ContactUsLink>
            <a
              href={`https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=Hi%20ZS%20Soft%20Tech!%20I%27m%20interested%20in%20your%20courses.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 glass text-foreground rounded-xl font-semibold text-base hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Free Demo Classes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              EMI Options Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Placement Assistance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
