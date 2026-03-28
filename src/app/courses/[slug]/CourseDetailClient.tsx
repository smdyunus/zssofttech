'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ContactUsLink from '@/components/ContactUsLink';
import {
  Clock,
  Monitor,
  CheckCircle2,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Shield,
  Wifi,
  MapPin,
  MonitorPlay,
  Award,
  Target,
  BookOpen,
  Zap,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import type { Course } from '@/lib/data/courses';

interface Props {
  course: Course;
  relatedCourses: Course[];
  instituteInfo: { contact: { whatsapp: string; phone: string }; name: string };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Advanced: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

const modeLabel = (mode: string) => {
  if (mode === 'Online') return { icon: <Wifi className="w-4 h-4" />, text: 'Online' };
  if (mode === 'Offline') return { icon: <MapPin className="w-4 h-4" />, text: 'Offline' };
  return { icon: <MonitorPlay className="w-4 h-4" />, text: 'Online / Offline' };
};

function WhatsAppSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 6.9 2.7 9.8L4 44l10.5-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6-.8-8.5-2.2l-.6-.4-6.2 1.6 1.6-6-.4-.6C8.7 30 8 27.1 8 24 8 15.2 15.2 8 24 8s16 7.2 16 16-7.2 16-16 16zm8.8-11.9c-.5-.2-2.8-1.4-3.2-1.6-.4-.1-.7-.2-1 .2-.3.5-1.2 1.6-1.5 1.9-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-.9.2-.2.5-.5.7-.8.2-.2.3-.5.4-.8.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.4-3.3-.4-.8-.7-.7-1-.7h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.1 4.8 7.6 6.7 1.1.5 1.9.7 2.5.9 1.1.3 2 .3 2.8.2.9-.1 2.8-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.5-.3-.9-.5z" />
    </svg>
  );
}

export default function CourseDetailClient({ course, relatedCourses, instituteInfo }: Props) {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const waUrl = `https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.title)}%20course.%20Please%20share%20more%20details.`;
  const enquiryUrl = `/contact?course=${encodeURIComponent(course.slug)}`;
  const modeInfo = modeLabel(course.mode);

  return (
    <main className="min-h-screen bg-background">
      {/* ──── HERO SECTION ──── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.image} alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-8 pb-12 lg:pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-300">{course.shortTitle}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-[11px] font-semibold rounded">{course.categoryLabel}</span>
                {course.badge && (
                  <span className="px-2.5 py-0.5 bg-amber-500/15 text-amber-400 text-[11px] font-semibold rounded">{course.badge}</span>
                )}
                <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded border ${levelColors[course.level]}`}>{course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">{course.title}</h1>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">{course.overview}</p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{course.duration}</span>
                <span className="flex items-center gap-1.5">{modeInfo.icon}<span>{modeInfo.text}</span></span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <ContactUsLink href={enquiryUrl} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 shadow-lg shadow-primary/20">
                  Enquiry
                  <ArrowRight className="w-4 h-4" />
                </ContactUsLink>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5b] text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-green-500/20">
                  <WhatsAppSvg className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right Sidebar - Course Details Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#111827] rounded-2xl border border-gray-800/60 p-6 sticky top-24">
              <div className="relative h-40 rounded-xl overflow-hidden mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.image} alt={course.shortTitle} className="w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black text-white/25 tracking-tighter">{course.heroText}</span>
                </div>
              </div>

              {course.price && (
                <div className="text-center mb-4">
                  {course.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mb-1">{course.originalPrice}</div>
                  )}
                  <span className="text-3xl font-extrabold text-foreground">{course.price}</span>
                </div>
              )}

              <ContactUsLink href={enquiryUrl} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity mb-4">
                Enquiry <ArrowRight className="w-4 h-4" />
              </ContactUsLink>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Category</span>
                  <span className="text-foreground font-medium">{course.category}</span>
                </div>
                <div className="border-t border-gray-800/40" />
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" />Duration</span>
                  <span className="text-foreground font-medium">{course.durationHours || course.duration}</span>
                </div>
                <div className="border-t border-gray-800/40" />
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-2"><Target className="w-4 h-4" />Level</span>
                  <span className="text-foreground font-medium">{course.level}</span>
                </div>
                <div className="border-t border-gray-800/40" />
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-2"><Monitor className="w-4 h-4" />Format</span>
                  <span className="text-foreground font-medium">{course.mode === 'Hybrid' ? 'Online / Offline' : course.mode}</span>
                </div>
                <div className="border-t border-gray-800/40" />
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" />Language</span>
                  <span className="text-foreground font-medium">English / Telugu</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── WHAT YOU'LL LEARN ──── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-2">
              Skills &amp; Value You&apos;ll Acquire
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-sm">
              Key competencies you will develop in this course
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.keyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-[#141414] border border-gray-800/50 hover:border-primary/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-gray-300 group-hover:text-foreground transition-colors leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── TECH STACK ──── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-8">
            Tech Stack You&apos;ll Learn
          </motion.h2>

          <div className="flex flex-wrap gap-3">
            {course.technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className="px-5 py-3 rounded-xl bg-[#141414] border border-gray-800/50 hover:border-primary/40 transition-all"
              >
                <span className="text-sm font-medium text-gray-300">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── COURSE CURRICULUM ──── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-2">Course Curriculum</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-sm">
              {course.curriculum.length} modules &middot; {course.durationHours || course.duration} of structured content
            </motion.p>
          </motion.div>

          <div className="max-w-3xl space-y-3">
            {course.curriculum.map((mod, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                className="bg-[#141414] border border-gray-800/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs text-primary/70 font-medium mb-0.5">{mod.week}</p>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{mod.title}</h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openModule === i ? 'rotate-180' : ''}`} />
                </button>

                {openModule === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5"
                  >
                    <ul className="space-y-2 ml-14">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 mt-0.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PREREQUISITES ──── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-8">
            Prerequisites
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
            {course.prerequisites.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#141414] border border-gray-800/50">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CAREER OPPORTUNITIES ──── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-2">Career Opportunities</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-sm">
              Completing this course opens doors to high-demand career paths
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.careerPaths.map((career, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#141414] border border-gray-800/50 hover:border-primary/30 transition-all"
              >
                <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-sm text-gray-200">{career}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── WHY CHOOSE THIS TRAINING ──── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-10">
            Why Choose This Training?
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {course.whyChoose.map((reason, i) => {
              const [title, ...rest] = reason.split(' – ');
              const desc = rest.join(' – ');
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={fadeUp} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-gray-800/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground text-sm">{title}</span>
                    {desc && <span className="text-gray-400 text-sm"> – {desc}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── CERTIFICATION ──── */}
      {course.certification && (
        <section className="py-16 bg-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div variants={fadeUp} custom={0} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">{course.certification}</motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-400 text-sm leading-relaxed mb-6">
                Upon successful completion, you&apos;ll receive a verified certificate of completion. Include it on your CV, LinkedIn profile, or portfolio to demonstrate your skills to employers.
              </motion.p>
              <motion.a
                variants={fadeUp}
                custom={3}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ──── HIGHLIGHTS GRID ──── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-8">
            Course Highlights
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {course.highlights.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-gray-800/50">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA BANNER ──── */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
              Send us your enquiry and take the first step towards mastering {course.shortTitle}. Our expert instructors and structured curriculum will get you job-ready.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-3">
              <ContactUsLink href={enquiryUrl} className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg">
                Enquiry
                <ArrowRight className="w-4 h-4" />
              </ContactUsLink>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#20bd5b] transition-colors shadow-lg">
                <WhatsAppSvg className="w-5 h-5" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──── RELATED COURSES ──── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-8">
            Related Courses
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((c, i) => (
              <motion.div
                key={c.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link href={`/courses/${c.slug}`} className="block p-5 rounded-2xl border border-gray-800/60 bg-[#141414] hover:border-primary/40 transition-all group h-full">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.shortTitle} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-white/20">{c.heroText}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-primary/70 uppercase tracking-widest font-semibold">{c.categoryLabel}</span>
                    <span className="text-[10px] text-gray-600">&middot;</span>
                    <span className="text-[10px] text-gray-500">{c.duration}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors mb-2 line-clamp-2">{c.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{c.description}</p>
                  <span className="text-primary text-xs font-semibold inline-flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
