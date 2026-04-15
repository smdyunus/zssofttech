"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export function InternshipHero() {
  return (
    <section className="relative pt-32 pb-20 bg-dark-bg overflow-hidden min-h-[70vh] flex items-center">
      {/* Background Image */}
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
            ZS Soft Tech — Class to Career Internship
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Break the{" "}
            <span className="gradient-text">
              &ldquo;No Experience — No Job&rdquo;
            </span>{" "}
            Cycle
          </h1>

          <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
            Stuck in the &ldquo;No Experience, No Job&rdquo; loop? Join our
            Class to Career Internship — learn, work on real projects, earn a
            stipend, and step confidently into your career. Any degree eligible.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/contact"
              className={buttonClassName({ size: "xl", className: "group" })}
            >
              Apply Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#programs" className={buttonClassName({ variant: "outline", size: "xl" })}>
              View Programs & Pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
