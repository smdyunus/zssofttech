"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Brain,
  Bot,
  Database,
  Clock,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  Briefcase,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const programs = [
  {
    id: "pdi",
    code: "PDI",
    title: "Python & Data Analysis Internship",
    duration: "3 Months",
    stipend: "NA",
    fee: "40k + GST",
    feeInstallment: "25k + 25k",
    effectiveCost: "40K",
    expectedLPA: "3-4 LPA",
    projects: "1 Live Project",
    interviews: "3",
    skills: ["Python", "Data Analysis"],
    documents: "Internship Certificate",
    gradient: "from-blue-600 to-cyan-500",
    icon: Database,
    popular: false,
  },
  {
    id: "sdi",
    code: "SDI",
    title: "Software Development Internship",
    duration: "6 Months",
    stipend: "Rs 10k/month",
    fee: "110k + GST",
    feeInstallment: "60k + 60k",
    effectiveCost: "50K",
    expectedLPA: "4-6 LPA",
    projects: "2 Live Projects",
    interviews: "5",
    skills: [
      "Full Stack (Java, MERN, Python)",
      "DevOps (AWS)",
    ],
    documents:
      "Offer Letter, ID Card, Company Email, Pay Slips, Bank Statement, Experience Letter",
    gradient: "from-purple-600 to-pink-500",
    icon: Globe,
    popular: false,
  },
  {
    id: "sai",
    code: "SAI",
    title: "Software Dev + Data Analysis",
    duration: "8 Months",
    stipend: "Rs 10k/month",
    fee: "150k + GST",
    feeInstallment: "80k + 80k",
    effectiveCost: "70K",
    expectedLPA: "5-7 LPA",
    projects: "2 Live Projects",
    interviews: "5",
    skills: [
      "Full Stack",
      "DevOps (AWS)",
      "Python",
      "Data Analysis",
    ],
    documents:
      "Offer Letter, ID Card, Company Email, Pay Slips, Bank Statement, Experience Letter",
    gradient: "from-amber-500 to-orange-500",
    icon: Smartphone,
    popular: true,
  },
  {
    id: "dmi",
    code: "DMI",
    title: "Data Science + ML Internship",
    duration: "8 Months",
    stipend: "Rs 10k/month",
    fee: "170k + GST",
    feeInstallment: "90k + 90k",
    effectiveCost: "90K",
    expectedLPA: "8-10 LPA",
    projects: "2 Live Projects",
    interviews: "5",
    skills: [
      "Python",
      "Data Analysis",
      "Machine Learning",
      "Agentic AI",
    ],
    documents:
      "Offer Letter, ID Card, Company Email, Pay Slips, Bank Statement, Experience Letter",
    gradient: "from-primary to-emerald-500",
    icon: Brain,
    popular: false,
  },
  {
    id: "smi",
    code: "SMI",
    title: "Software Dev + ML Internship",
    duration: "10 Months",
    stipend: "Rs 15k/month",
    fee: "250k + GST",
    feeInstallment: "130k + 130k",
    effectiveCost: "100K",
    expectedLPA: "10+ LPA",
    projects: "2 Live Projects",
    interviews: "Unlimited",
    skills: [
      "Full Stack",
      "DevOps (AWS)",
      "Python + DA",
      "Machine Learning",
      "Agentic AI",
    ],
    documents:
      "Offer Letter, ID Card, Company Email, Pay Slips, Bank Statement, Experience Letter, PF",
    gradient: "from-rose-500 to-red-500",
    icon: Bot,
    popular: true,
  },
];

export function Programs() {
  return (
    <section id="premium-programs" className="py-24 bg-background-alt scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Model 2 · Premium training program
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
            Paid tracks — deeper mentoring & placement support
          </h2>
          <p className="mt-4 text-lg text-foreground-muted max-w-2xl mx-auto">
            Optional intensive programs for learners who want structured training, extended mentorship, and interview
            readiness. <strong className="text-foreground">Separate from the free AICTE-format internship model</strong>{" "}
            above — fees apply only if you choose one of these tracks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "group relative rounded-2xl overflow-hidden bg-card border hover:shadow-xl transition-all duration-300",
                program.popular
                  ? "border-primary shadow-lg ring-1 ring-primary/20"
                  : "border-border"
              )}
            >
              {program.popular && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div
                className={`p-6 bg-gradient-to-r ${program.gradient}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <program.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/20 text-white">
                    {program.code}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {program.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {program.stipend}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Fee & Expected LPA */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background-alt text-center">
                    <div className="text-xs text-foreground-muted mb-1">
                      Program fee (indicative)
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {program.fee}
                    </div>
                    <div className="text-[10px] text-foreground-muted mt-0.5">
                      Instalment option: {program.feeInstallment}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 text-center">
                    <div className="text-xs text-foreground-muted mb-1">
                      Career prep focus
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      {program.expectedLPA}
                    </div>
                    <div className="text-[10px] text-foreground-muted mt-0.5">
                      Not a salary guarantee · support bundle: {program.effectiveCost}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                    Skills You&apos;ll Learn
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {program.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-background-alt text-foreground-muted border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key highlights */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {program.projects}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" />
                    {program.interviews} Interviews
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    {program.documents.length > 40
                      ? program.documents.substring(0, 40) + "..."
                      : program.documents}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Users className="h-4 w-4 text-primary shrink-0" />
                    Resume Building Included
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    buttonClassName({ size: "default", className: "w-full group/btn py-3 min-h-0" }),
                    program.popular && "bg-primary hover:bg-primary-dark"
                  )}
                >
                  Enquire — premium {program.code}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center space-y-2"
        >
          <p className="text-sm text-foreground-muted font-medium max-w-3xl mx-auto">
            Eligibility and stipend (where mentioned) are track-specific and confirmed in writing before enrolment.
            GST and statutory components as applicable.{" "}
            <strong className="text-foreground">Placement outcomes depend on market conditions and your readiness</strong>
            — we provide training and assistance, not a guaranteed job or package.
          </p>
          <p className="text-xs text-foreground-muted/60 max-w-2xl mx-auto">
            * This section describes only the <strong className="text-foreground/80">premium training model</strong>. The
            free AICTE-format internship is described above and carries no compulsory program fee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
