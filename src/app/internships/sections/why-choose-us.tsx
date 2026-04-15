"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Code2,
  Trophy,
  BookOpen,
  Target,
} from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Live Projects",
    description:
      "Work on real client projects — not toy exercises. Build production-grade applications that go into actual deployments.",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Learn directly from senior engineers and architects with 10+ years of industry experience.",
  },
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "A carefully designed learning path covering modern tech stacks, best practices, and AI integration.",
  },
  {
    icon: Trophy,
    title: "Certificate & Portfolio",
    description:
      "Earn an industry-recognized certificate and build a professional portfolio you can showcase to employers.",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description:
      "Resume reviews, mock interviews, and direct referrals to partner companies and open positions.",
  },
  {
    icon: Rocket,
    title: "Fast-Track to Employment",
    description:
      "Top-performing interns get direct job offers at ZS Soft Tech or partner organizations.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
            More Than Just an Internship
          </h2>
          <p className="mt-4 text-lg text-foreground-muted max-w-2xl mx-auto">
            We don&apos;t just teach you code — we prepare you for a career in
            technology with hands-on experience and real outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
