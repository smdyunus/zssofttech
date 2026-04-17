"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";

export function InternshipTwoModels() {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Two clear paths
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
            Choose what fits your goal
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            <strong className="text-foreground">ZS Soft Tech offers free internship opportunities.</strong>{" "}
            Candidates who require structured training & mentorship can opt for our{" "}
            <strong className="text-foreground">premium training program</strong>.
          </p>
          <p className="mt-4 text-sm text-foreground-muted">
            Both tracks are described transparently below. There is no mandatory fee to participate in the{" "}
            <span className="text-foreground font-medium">AICTE-norms–aligned internship learning model</span>.
            Premium training is optional and clearly priced separately.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Model 1 — AICTE internship */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 to-card p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-base"
                aria-hidden
              >
                🟢
              </span>
              Model 1 — AICTE internship (learning-based)
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Free / learning-based
            </h3>
            <ul className="space-y-3 text-foreground-muted text-sm leading-relaxed mb-6">
              <li className="flex gap-2">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  <strong className="text-foreground">No compulsory program fee</strong> for this internship
                  learning model (documentation & completion as per institutional requirements).
                </span>
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Structured around <strong className="text-foreground">AICTE-recommended internship elements</strong>
                  : learning objectives, weekly engagement, mentor review, activity log, and outcome assessment.
                </span>
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Ideal for <strong className="text-foreground">college / university records</strong>, NBA–NAAC
                  documentation support, and building an evidence-backed portfolio.
                </span>
              </li>
            </ul>
            <p className="text-xs text-foreground-muted border-t border-border/60 pt-4 mb-6">
              Credit mapping and final institutional approval rest with your college / AICTE-approved institution.
              ZS Soft Tech issues a <strong className="text-foreground">completion / experience certificate</strong>{" "}
              for the engagement completed with us.
            </p>
            <Link
              href="#aicte-internship"
              className={buttonClassName({
                variant: "outline",
                size: "xl",
                className: "w-full sm:w-auto border-emerald-500/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10",
              })}
            >
              View AICTE-format details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </motion.article>

          {/* Model 2 — Premium */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border-2 border-sky-500/40 bg-gradient-to-b from-sky-500/10 to-card p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm mb-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-base"
                aria-hidden
              >
                🔵
              </span>
              Model 2 — Premium training program
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Paid · advanced mentoring
            </h3>
            <ul className="space-y-3 text-foreground-muted text-sm leading-relaxed mb-6">
              <li className="flex gap-2">
                <Sparkles className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                <span>
                  <strong className="text-foreground">Deeper curriculum</strong>, extended mentorship, placement
                  assistance, and interview readiness — for learners who want an intensive, fee-based program.
                </span>
              </li>
              <li className="flex gap-2">
                <GraduationCap className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                <span>
                  Fees, instalments, and inclusions are listed openly in the{" "}
                  <strong className="text-foreground">premium section</strong> below — no hidden charges beyond what
                  is stated.
                </span>
              </li>
            </ul>
            <Link
              href="#premium-programs"
              className={buttonClassName({
                size: "xl",
                className: "w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white",
              })}
            >
              View premium tracks & fees
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
