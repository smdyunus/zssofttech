'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FEATURE_SHOW_COURSE_FEES } from '@/lib/feature-flags';
import { courses } from '@/lib/data/courses';

interface FeaturedCoursesProps {
  showHeader?: boolean;
  limit?: number;
}

export default function FeaturedCourses({ showHeader = true, limit }: FeaturedCoursesProps) {
  const displayCourses = limit ? courses.slice(0, limit) : courses;

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label mb-3">Our Programs</span>
            <h2 className="section-heading text-foreground mb-4">
              Learn Skills That Get You Hired
            </h2>
            <p className="section-lead section-lead-center text-muted">
              From beginner-friendly tracks to advanced programs — pick a course,
              learn with hands-on projects, and build the confidence to start your
              IT career in Nandyal.
            </p>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {displayCourses.map((course, index) => {
            const features = [
              `${course.mode} Classes`,
              `Duration: ${course.duration}`,
              `Level: ${course.level}`,
              ...course.highlights.slice(0, 2),
            ].slice(0, 5);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border/80 bg-white shadow-[0_8px_30px_rgba(42,20,80,0.06)] hover:shadow-[0_20px_50px_rgba(42,20,80,0.12)] hover:border-secondary/25 transition-all duration-300"
              >
                {/* Gradient header */}
                <div className="relative bg-gradient-to-br from-primary via-primary-dark to-brand-deep px-5 pt-7 pb-9 min-h-[158px] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 mb-1.5">
                    {course.categoryLabel}
                  </p>
                  <h3 className="relative text-xl font-extrabold text-white leading-tight line-clamp-2 tracking-tight">
                    {course.shortTitle}
                  </h3>
                  <p className="relative text-sm text-white/90 mt-1.5 line-clamp-2">
                    {course.highlights[0] || course.description}
                  </p>
                  {course.badge && (
                    <span className="absolute bottom-3 left-5 inline-flex items-center px-2.5 py-1 rounded-md bg-white text-[10px] font-bold text-brand-deep shadow-sm">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Feature list */}
                <div className="px-5 py-4 flex-grow bg-white">
                  <ul className="divide-y divide-border/80">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 py-2.5 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Snapshot / pricing band */}
                <div className="px-5 py-4 bg-primary/[0.06] border-t border-primary/10">
                  <p className="text-sm font-bold text-brand-deep mb-2">
                    {FEATURE_SHOW_COURSE_FEES && course.price ? 'Best Price' : 'Program Snapshot'}
                  </p>
                  {FEATURE_SHOW_COURSE_FEES && course.price ? (
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground">Training</span>
                        <span className="font-bold text-primary">{course.price}</span>
                      </div>
                      {course.originalPrice && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted">List price</span>
                          <span className="text-muted line-through">{course.originalPrice}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground">Mode</span>
                        <span className="font-semibold text-secondary">{course.mode}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground">Duration</span>
                        <span className="font-bold text-primary">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground">Mode</span>
                        <span className="font-semibold text-secondary">{course.mode}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground">Level</span>
                        <span className="font-semibold text-brand-deep">{course.level}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="p-4 pt-3 bg-white">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:brightness-110 hover:gap-3"
                  >
                    View Course Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {limit && courses.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              View All {courses.length} Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
