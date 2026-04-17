"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { instituteInfo } from "@/lib/data/institute";

const waDigits = instituteInfo.contact.whatsapp.replace(/\D/g, "");
const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(
  "Hi ZS Soft Tech — I'd like to know more about (1) the free AICTE-format internship or (2) the premium training program."
)}`;

export function InternshipCTA() {
  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            Counselling · Nandyal
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Not sure which track fits you?
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
            Message us with your course, semester, and goal. We&apos;ll help you pick the{" "}
            <strong className="text-white/90">free internship model</strong> or the{" "}
            <strong className="text-white/90">premium program</strong> — only what you need.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={buttonClassName({ size: "xl", className: "group" })}>
              Contact / apply
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({ variant: "outline", size: "xl" })}
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
