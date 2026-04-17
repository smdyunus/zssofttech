"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Monitor,
  Target,
  ListChecks,
  Briefcase,
  Wrench,
  CalendarRange,
  ClipboardCheck,
  Award,
  Wallet,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

type Block = {
  n: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
};

function BlockCard({ block, delay }: { block: Block; delay: number }) {
  const Icon = block.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-lg font-mono text-emerald-600 dark:text-emerald-400 shrink-0">{block.n}</span>
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground pt-0.5">{block.title}</h3>
      </div>
      <div className="pl-0 sm:pl-12 text-sm text-foreground-muted leading-relaxed space-y-3">
        {block.children}
      </div>
    </motion.article>
  );
}

export function AicteInternshipSection() {
  const blocks: Block[] = [
    {
      n: "1",
      title: "Internship overview",
      icon: MapPin,
      children: (
        <>
          <p>
            <strong className="text-foreground">Example internship titles:</strong> Software Testing Intern · Full
            Stack Intern (final title agreed with your mentor / college format).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-foreground">
            <li>
              <strong>Duration:</strong> typically <strong>6–8 weeks</strong> or <strong>2–3 months</strong> (aligned
              with your college calendar where applicable).
            </li>
            <li>
              <strong>Mode:</strong> Online / offline / <strong>hybrid</strong> — set at onboarding.
            </li>
            <li>
              <strong>Location:</strong> <strong>Nandyal</strong> (in-person / hybrid) or <strong>remote</strong> where
              the engagement supports it.
            </li>
          </ul>
          <p className="text-xs border-l-2 border-emerald-500/40 pl-3 text-foreground-muted">
            Presented as an <strong className="text-foreground">academic-style training & practice</strong> opportunity
            — not a commercial “pay and join” product.
          </p>
        </>
      ),
    },
    {
      n: "2",
      title: "Objective (learning purpose)",
      icon: Target,
      children: (
        <p className="text-foreground border border-emerald-500/25 bg-emerald-500/5 rounded-xl px-4 py-3">
          This internship is designed to provide <strong>hands-on experience</strong> in{" "}
          <strong>real-time software development and testing practices</strong> under guidance — building skills,
          discipline, and documentation suitable for institutional evaluation.
        </p>
      ),
    },
    {
      n: "3",
      title: "Learning outcomes",
      icon: ListChecks,
      children: (
        <ul className="space-y-2">
          {[
            "Practical exposure to industry tools (e.g. Java, Selenium, Git, SQL, APIs — track-dependent).",
            "Understanding of SDLC, quality basics, and collaborative workflows (including Agile concepts where used).",
            "Participation in real-time or guided mini-projects with clear deliverables.",
            "Problem-solving, documentation, and teamwork habits suitable for employer and college review.",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      n: "4",
      title: "Roles & responsibilities",
      icon: Briefcase,
      children: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Work on guided mini-projects and scoped tasks aligned to learning outcomes.</li>
          <li>Participate in daily / weekly tasks, stand-ups or check-ins as defined by the mentor.</li>
          <li>Attend mentoring sessions and incorporate feedback on quality and professionalism.</li>
          <li>Maintain an activity log; submit interim updates and a <strong>final report / demo</strong> where required.</li>
        </ul>
      ),
    },
    {
      n: "5",
      title: "Tools & technologies (examples)",
      icon: Wrench,
      children: (
        <p>
          Examples by track: <strong className="text-foreground">Java</strong>,{" "}
          <strong className="text-foreground">Selenium</strong>, <strong className="text-foreground">SQL</strong>,{" "}
          <strong className="text-foreground">Git</strong>, <strong className="text-foreground">APIs</strong>, and
          related stack elements — final list is confirmed in your onboarding plan (not every tool in every cohort).
        </p>
      ),
    },
    {
      n: "6",
      title: "Training + internship structure (AICTE-style)",
      icon: CalendarRange,
      children: (
        <>
          <p>
            AICTE-style guidance emphasises <strong className="text-foreground">learning + practice</strong>. A typical
            structure:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Weeks 1–2:</strong> orientation, environment setup, and foundational / safety training.
            </li>
            <li>
              <strong>Mid phase:</strong> guided project work, reviews, and iteration.
            </li>
            <li>
              <strong>Final week(s):</strong> consolidation, evaluation, and completion evidence.
            </li>
          </ul>
        </>
      ),
    },
    {
      n: "7",
      title: "Evaluation method",
      icon: ClipboardCheck,
      children: (
        <ul className="space-y-2">
          {["Weekly assignments or checkpoints.", "Project / deliverable review with mentor feedback.", "Final assessment (demo, viva, or report — as agreed for your track)."].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      n: "8",
      title: "Certification",
      icon: Award,
      children: (
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
            <span>
              <strong className="text-foreground">Internship completion / experience certificate</strong> from ZS Soft
              Tech after satisfactory engagement and evaluation.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
            <span>
              <strong className="text-foreground">Performance-based recognition</strong> (e.g. commendation in
              certificate text) only where earned — not automatic.
            </span>
          </li>
        </ul>
      ),
    },
    {
      n: "9",
      title: "Stipend & fees (critical — Model 1 only)",
      icon: Wallet,
      children: (
        <>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>
                <strong className="text-foreground">No compulsory internship fee</strong> for this AICTE-aligned{" "}
                <em>learning internship</em> model.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>
                <strong className="text-foreground">Stipend:</strong> there is <strong>no default stipend</strong> on
                this track. A <strong>performance-based stipend or support</strong> may apply only when explicitly{" "}
                <strong>declared in writing before you start</strong> for a specific batch or project window — never as
                a hidden condition.
              </span>
            </li>
          </ul>
          <p className="text-xs border border-amber-500/30 bg-amber-500/5 rounded-lg px-3 py-2 text-foreground-muted">
            <strong className="text-foreground">Avoid confusion:</strong> optional, fee-based{" "}
            <strong>training & placement support</strong> is offered only as{" "}
            <strong className="text-foreground">Model 2 — Premium training</strong> (separate section, separate
            agreement). It is <strong>not</strong> mandatory to join the free internship.
          </p>
        </>
      ),
    },
    {
      n: "10",
      title: "Compliance & transparency",
      icon: Shield,
      children: (
        <>
          <p className="text-foreground border border-border rounded-xl px-4 py-3 bg-background-alt">
            ZS Soft Tech offers a structured internship program designed to provide{" "}
            <strong>practical exposure to real-time IT projects</strong>. The program includes guided learning, hands-on
            assignments, and project work under expert mentorship. This internship is{" "}
            <strong>for educational and skill-development purposes</strong> and is{" "}
            <strong>structured to align with commonly referenced AICTE internship guidance</strong> for transparency
            and institutional documentation — <strong>without implying AICTE endorsement of ZS Soft Tech as an entity</strong>.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>
                <strong className="text-foreground">No job or salary guarantee</strong> is offered as part of this
                internship model.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✔</span>
              <span>
                We aim to present the engagement as <strong className="text-foreground">academic, skill-based, and
                transparent</strong> — not as a marketing scheme or a disguised paid-training package.
              </span>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section id="aicte-internship" className="py-24 bg-background-alt scroll-mt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Model 1 · For institutional records
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-foreground flex flex-wrap items-center gap-2">
            <span aria-hidden>🎓</span>
            <span>AICTE-aligned internship structure</span>
          </h2>
          <p className="mt-4 text-foreground-muted leading-relaxed">
            The numbered blocks below are a <strong className="text-foreground">checklist-style layout</strong> many
            colleges map to internship files and accreditation-style documentation. Your{" "}
            <strong className="text-foreground">college</strong> remains responsible for{" "}
            <strong className="text-foreground">credit mapping and formal approval</strong>.
          </p>
        </motion.div>

        <div className="space-y-6">
          {blocks.map((b, i) => (
            <BlockCard key={b.n} block={b} delay={i * 0.04} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-6"
        >
          <div className="flex items-start gap-3 text-sm text-foreground-muted">
            <Monitor className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <p>
              Need <strong className="text-foreground">deeper paid mentoring</strong> or placement-focused training? That
              is only under <strong className="text-foreground">Model 2 — Premium</strong> (
              <Link href="#premium-programs" className="text-primary underline-offset-2 hover:underline">
                view fees section
              </Link>
              ).
            </p>
          </div>
          <Link href="/contact" className={buttonClassName({ size: "xl", className: "shrink-0 w-full sm:w-auto" })}>
            Apply / enquire — Model 1
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
