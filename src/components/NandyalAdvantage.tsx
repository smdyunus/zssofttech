'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Wifi,
  Users,
  IndianRupee,
  Laptop,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const advantages = [
  {
    icon: MapPin,
    title: 'World-Class, Right Here',
    description:
      'No need to relocate to Hyderabad or Bangalore. Get the same quality AI, DevOps, and Full Stack training in your hometown.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Excellence',
    description:
      'Premium tech education at a fraction of metro-city prices. Invest in skills, not rent.',
  },
  {
    icon: Laptop,
    title: 'Hybrid Learning',
    description:
      'Attend in-person labs with hands-on projects or join live online sessions. Your schedule, your choice.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description:
      'Personalized attention with batches of 15–20 students. Every doubt gets addressed, every student matters.',
  },
  {
    icon: Wifi,
    title: 'Industry-Grade Labs',
    description:
      'High-speed internet, cloud sandboxes, GPU-enabled workstations, and real deployment environments.',
  },
  {
    icon: ShieldCheck,
    title: 'Placement Guarantee',
    description:
      '100% Placement Assistance with interview prep, resume support, mock interviews, and referrals to hiring partners.',
  },
];

export default function NandyalAdvantage() {
  return (
    <section className="py-20 lg:py-28 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-accent mb-4 uppercase tracking-wider">
              Why Nandyal?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              The{' '}
              <span className="gradient-text-blue">Nandyal Advantage</span>
            </h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              World-class AI, DevOps, and Full Stack training is no longer
              limited to metro cities. ZS Soft Tech brings cutting-edge
              technology education to Nandyal — with the same curriculum,
              tools, and placement support that top-tier institutes offer.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Learn more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-5 rounded-xl border border-border/30 bg-background/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <adv.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">
                  {adv.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {adv.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
