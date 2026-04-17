"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export function InternshipHero() {
  return (
    <section className="relative pt-32 pb-20 bg-dark-bg overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=75"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark-bg/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            Internships & career readiness · ZS Soft Tech
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Build skills the{" "}
            <span className="gradient-text">right way</span>
            <span className="text-white/90"> — transparently</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Start with our <strong className="text-white">free, AICTE-norms–aligned internship</strong> (learning &
            documentation). If you want deeper mentoring and placement-focused training, explore our{" "}
            <strong className="text-white">optional premium program</strong> — clearly separated, with fees listed
            upfront.
          </p>

          <div className="mt-4 flex items-start gap-2 text-sm text-white/55 max-w-2xl">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400/90 mt-0.5" />
            <span>
              No misleading claims: institutional credit and your college&apos;s formal internship approval stay with
              your institution where applicable — not something we substitute for. We provide structured learning,
              mentor review, and completion / experience certificates from ZS Soft Tech.
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/contact"
              className={buttonClassName({ size: "xl", className: "group" })}
            >
              Talk to counsellor
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#aicte-internship"
              className={buttonClassName({ variant: "outline", size: "xl" })}
            >
              AICTE-format internship
            </Link>
            <Link
              href="#premium-programs"
              className={buttonClassName({ variant: "outline", size: "xl", className: "border-white/30 text-white hover:bg-white/10" })}
            >
              Premium training & fees
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
