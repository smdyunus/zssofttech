'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  ShieldCheck,
  GraduationCap,
  Building2,
  Users,
  BriefcaseBusiness,
  Lightbulb,
} from 'lucide-react';

const services = [
  {
    title: 'Software Development',
    icon: Globe,
    description: 'Scalable web applications and business platforms built for long-term growth.',
    image:
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&q=75',
  },
  {
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Cross-platform and native apps for Android and iOS with production-ready delivery.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=75',
  },
  {
    title: 'QA & Automation Testing',
    icon: ShieldCheck,
    description: 'Reliable quality engineering through manual testing and automation pipelines.',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=75',
  },
  {
    title: 'Internship Programs',
    icon: GraduationCap,
    description: 'Structured internship tracks with practical learning, mentorship, and outcomes clarity.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=75',
  },
  {
    title: 'Corporate Training',
    icon: Building2,
    description: 'Role-based upskilling programs for engineering and delivery teams.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=75',
  },
  {
    title: 'Placement Support',
    icon: Users,
    description: 'Resume support, interview preparation, and practical career guidance.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=75',
  },
  {
    title: 'IT Consulting',
    icon: BriefcaseBusiness,
    description: 'Strategic consulting for architecture, execution planning, and technology decisions.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=75',
  },
  {
    title: 'Digital Solutions',
    icon: Lightbulb,
    description: 'Digital-first solutions for operations, customer engagement, and automation workflows.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=75',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900">Core Capabilities</h2>
          <p className="text-base text-slate-500 mt-4 max-w-3xl mx-auto">
            End-to-end technology solutions for startups, institutions, and growing teams.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-center">
                  <service.icon className="w-4 h-4 text-slate-700" />
                </div>
              </div>
              <div className="p-5">
                <p className="font-semibold text-slate-900 text-base mb-2">{service.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="text-sm font-medium text-primary hover:text-primary/90"
                >
                  Learn more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
