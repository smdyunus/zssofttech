"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Code2,
  BadgeCheck,
  BookOpen,
  LineChart,
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Transparent two-track model",
    description:
      "Free AICTE-norms–aligned internship learning on one side; optional premium training with clear fees on the other. You always know what you are signing up for.",
  },
  {
    icon: Code2,
    title: "Hands-on engineering practice",
    description:
      "Guided tasks, code reviews, and small deliverables suitable for portfolios and college internship files — not theory-only sessions.",
  },
  {
    icon: Users,
    title: "Mentor-led reviews",
    description:
      "Regular checkpoints with mentors for feedback, professionalism, and quality — aligned with how good internship programs are run.",
  },
  {
    icon: BookOpen,
    title: "Structured documentation",
    description:
      "Weekly activity logs, objectives, and assessment artefacts that institutions commonly expect for internship records.",
  },
  {
    icon: BadgeCheck,
    title: "Completion evidence",
    description:
      "Completion / experience certificate from ZS Soft Tech for engagements completed satisfactorily (wording as per track).",
  },
  {
    icon: LineChart,
    title: "Career support (premium)",
    description:
      "For premium learners: extended interview prep, resume clinics, and placement assistance — without over-promising fixed salaries.",
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
            Why students choose ZS Soft Tech
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
            Clarity, structure, and honest guidance
          </h2>
          <p className="mt-4 text-lg text-foreground-muted max-w-2xl mx-auto">
            Whether you need a <strong className="text-foreground">college-ready internship file</strong> or a{" "}
            <strong className="text-foreground">deeper paid program</strong>, we focus on skills you can demonstrate in
            interviews — not hype.
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
              <h3 className="mt-5 text-xl font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-3 text-foreground-muted leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
