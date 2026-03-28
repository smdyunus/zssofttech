'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Wifi, MonitorPlay, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { courses } from '@/lib/data/courses';

interface FeaturedCoursesProps {
  showHeader?: boolean;
  limit?: number;
}

const badgeStyles: Record<string, string> = {
  'Best in Market': 'bg-amber-500 text-white',
  Bestseller: 'bg-amber-500 text-white',
  'Career Ready': 'bg-emerald-600 text-white',
  Hot: 'bg-red-600 text-white',
  Popular: 'bg-blue-600 text-white',
  New: 'bg-purple-600 text-white',
};

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10',
  Intermediate: 'text-blue-400 bg-blue-400/10',
  Advanced: 'text-purple-400 bg-purple-400/10',
};

const modeIcon = (mode: string) => {
  if (mode === 'Online') return <Wifi className="w-3 h-3" />;
  if (mode === 'Offline') return <MapPin className="w-3 h-3" />;
  return <MonitorPlay className="w-3 h-3" />;
};

export default function FeaturedCourses({ showHeader = true, limit }: FeaturedCoursesProps) {
  const displayCourses = limit ? courses.slice(0, limit) : courses;

  return (
    <section className="py-16 lg:py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3 px-3 py-1 bg-primary/10 rounded-full">
              Our Programs
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Master Software Development
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Structured courses designed to make you{' '}
              <span className="text-primary font-semibold">job-ready</span>.
            </p>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-gray-800/60 bg-[#141414] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Course Image */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-600"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                {/* Badge */}
                {course.badge && (
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${badgeStyles[course.badge] || 'bg-gray-700 text-white'}`}>
                    {course.badge}
                  </span>
                )}

                {/* Hero Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-black text-white/20 tracking-tighter pointer-events-none select-none">
                    {course.heroText || course.shortTitle}
                  </span>
                </div>

                {/* Mode + Level */}
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${levelColors[course.level] || 'text-gray-400 bg-gray-700/60'}`}>
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold text-gray-300 bg-black/50">
                    {modeIcon(course.mode)}
                    {course.mode}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Category + Duration */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] text-primary/80 uppercase tracking-widest font-semibold">
                    {course.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Clock className="w-3 h-3" />
                    {course.durationHours || course.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {course.description}
                </p>

                {/* Key Highlights */}
                <ul className="space-y-1.5 mb-4">
                  {course.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/70 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-gray-800/80 border border-gray-700/60 text-gray-400 text-[10px] rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-800/80 border border-gray-700/60 text-gray-500 text-[10px] rounded font-medium">
                      +{course.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-4">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{course.duration}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800/60 mt-auto">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all duration-200 group/link"
                  >
                    Course Details
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                  {course.price && (
                    <div className="text-right">
                      {course.originalPrice && (
                        <span className="block text-[11px] text-gray-500 line-through font-semibold">
                          {course.originalPrice}
                        </span>
                      )}
                      <span className="font-extrabold text-foreground text-base">{course.price}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
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
