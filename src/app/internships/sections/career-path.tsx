"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Rocket, Briefcase } from "lucide-react";

const stages = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Structured learning with curated curriculum and hands-on exercises.",
    color: "bg-blue-500",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Work on live client projects under the guidance of senior mentors.",
    color: "bg-primary",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploy real products, build your portfolio, and earn your certificate.",
    color: "bg-amber-500",
  },
  {
    icon: Briefcase,
    title: "Hired",
    description: "Get placed at ZS Soft Tech or our partner companies with a strong portfolio.",
    color: "bg-emerald-500",
  },
];

export function CareerPath() {
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
            Your Journey
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
            From Student to Professional
          </h2>
          <p className="mt-4 text-lg text-foreground-muted max-w-2xl mx-auto">
            A clear, structured path from learning to landing your dream tech
            job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector (desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6">
                <div
                  className={`inline-flex p-4 rounded-2xl ${stage.color} text-white shadow-lg`}
                >
                  <stage.icon className="h-7 w-7" />
                </div>
              </div>
              <div className="text-xs font-medium text-foreground-muted/50 mb-2 uppercase tracking-wider">
                Stage {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {stage.title}
              </h3>
              <p className="text-foreground-muted leading-relaxed max-w-xs mx-auto">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
