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
import { FEATURE_SHOW_COURSE_FEES } from '@/lib/feature-flags';

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
  Beginner: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25',
  Intermediate: 'bg-secondary/10 text-secondary border-secondary/25',
  Advanced: 'bg-primary/10 text-primary border-primary/25',
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
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.06] via-background to-primary/[0.04]" />
          <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-secondary/[0.07] blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[280px] h-[280px] rounded-full bg-primary/[0.05] blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-10 pb-14 lg:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-7">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-muted/70" />
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <ChevronRight className="w-3 h-3 text-muted/70" />
            <span className="text-secondary font-semibold">{course.shortTitle}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-[11px] font-semibold rounded-md border border-secondary/20">{course.categoryLabel}</span>
                {course.badge && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-semibold rounded-md border border-primary/20">{course.badge}</span>
                )}
                <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border ${levelColors[course.level]}`}>{course.level}</span>
              </div>

              <h1 className="page-heading text-foreground">{course.title}</h1>

              <p className="section-lead max-w-2xl text-muted">{course.overview}</p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-foreground shadow-sm"><Clock className="w-4 h-4 text-primary" />{course.duration}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-foreground shadow-sm">{modeInfo.icon}<span>{modeInfo.text}</span></span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <ContactUsLink href={enquiryUrl} className="btn-premium">
                  Enquiry
                  <ArrowRight className="w-4 h-4" />
                </ContactUsLink>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5b] text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                  <WhatsAppSvg className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right Sidebar - Course Details Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="premium-panel p-6 sticky top-28 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
              <div className="relative h-40 rounded-xl overflow-hidden mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.image} alt={course.shortTitle} className="w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black text-white/30 tracking-tighter">{course.heroText}</span>
                </div>
              </div>

              {FEATURE_SHOW_COURSE_FEES && course.price && (
                <div className="text-center mb-4">
                  {course.originalPrice && (
                    <div className="text-sm text-muted line-through mb-1">{course.originalPrice}</div>
                  )}
                  <span className="text-3xl font-extrabold text-primary">{course.price}</span>
                </div>
              )}

              <ContactUsLink href={enquiryUrl} className="btn-premium w-full mb-5">
                Enquiry <ArrowRight className="w-4 h-4" />
              </ContactUsLink>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-secondary" />Category</span>
                  <span className="text-foreground font-medium text-right max-w-[55%]">{course.category}</span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />Duration</span>
                  <span className="text-foreground font-medium">{course.durationHours || course.duration}</span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-2"><Target className="w-4 h-4 text-secondary" />Level</span>
                  <span className="text-foreground font-medium">{course.level}</span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-2"><Monitor className="w-4 h-4 text-primary" />Format</span>
                  <span className="text-foreground font-medium">{course.mode === 'Hybrid' ? 'Online / Offline' : course.mode}</span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary" />Language</span>
                  <span className="text-foreground font-medium">English / Telugu</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── WHAT YOU'LL LEARN ──── */}
      <section className="py-16 lg:py-20 bg-background-alt relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4">Skills</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading mb-2">
              What You&apos;ll Learn
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="section-lead max-w-2xl text-muted">
              Practical competencies you&apos;ll build through projects and guided practice
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
                className="premium-card p-5 hover:border-primary/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted group-hover:text-foreground transition-colors leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── TECH STACK ──── */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <motion.span variants={fadeUp} custom={0} className="section-label-purple mb-4">Tools</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading">
              Tools &amp; Tech Stack
            </motion.h2>
          </motion.div>

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
                className="premium-card px-5 py-3 hover:border-secondary/30 transition-all"
              >
                <span className="text-sm font-medium text-foreground/80">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── COURSE CURRICULUM ──── */}
      <section className="py-16 lg:py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4">Syllabus</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading mb-2">Course Curriculum</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="section-lead max-w-2xl text-muted">
              {course.curriculum.length} modules · {course.durationHours || course.duration} of structured learning
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
                className="premium-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center flex-shrink-0 ${
                      openModule === i
                        ? 'bg-gradient-primary text-white shadow-md shadow-primary/25'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs text-secondary font-semibold mb-0.5 tracking-wide uppercase">{mod.week}</p>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{mod.title}</h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 flex-shrink-0 ${openModule === i ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {openModule === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5"
                  >
                    <ul className="space-y-2 ml-14 border-l-2 border-primary/15 pl-4">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
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
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <motion.span variants={fadeUp} custom={0} className="section-label-purple mb-4">Before you begin</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading">
              Prerequisites
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
            {course.prerequisites.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="premium-card flex items-center gap-3 p-4">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm text-muted">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CAREER OPPORTUNITIES ──── */}
      <section className="py-16 lg:py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4">Careers</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading mb-2">Career Paths</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="section-lead max-w-2xl text-muted">
              Roles this program prepares you to pursue with confidence
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
                className="premium-card flex items-center gap-3 p-4 hover:border-primary/30 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm text-foreground">{career}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── WHY CHOOSE THIS TRAINING ──── */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.span variants={fadeUp} custom={0} className="section-label-purple mb-4">Why us</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading">
              Why This Program Works
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {course.whyChoose.map((reason, i) => {
              const [title, ...rest] = reason.split(' – ');
              const desc = rest.join(' – ');
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={fadeUp} custom={i} className="premium-card flex items-start gap-3 p-5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground text-sm">{title}</span>
                    {desc && <span className="text-muted text-sm"> – {desc}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── CERTIFICATION ──── */}
      {course.certification && (
        <section className="py-16 lg:py-20 bg-background-alt">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="premium-panel max-w-2xl mx-auto text-center p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
              <motion.div variants={fadeUp} custom={0} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="section-subheading mb-3 tracking-tight">{course.certification}</motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted text-sm leading-relaxed mb-6">
                Upon successful completion, you&apos;ll receive a verified certificate of completion. Include it on your CV, LinkedIn profile, or portfolio to demonstrate your skills to employers.
              </motion.p>
              <motion.a
                variants={fadeUp}
                custom={3}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium"
              >
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ──── HIGHLIGHTS GRID ──── */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4">Highlights</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading">
              Program Highlights
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {course.highlights.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="premium-card flex items-start gap-3 p-4">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA BANNER ──── */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/08 via-primary/5 to-secondary/8" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4">Get started</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading mb-4">
              Ready to Begin?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="section-lead section-lead-center text-muted mb-6">
              Share your enquiry and take the first step with {course.shortTitle}.
              Our mentors and structured path help you move from learning to interview readiness.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-3">
              <ContactUsLink href={enquiryUrl} className="btn-premium">
                Enquiry
                <ArrowRight className="w-4 h-4" />
              </ContactUsLink>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#20bd5b] transition-colors shadow-lg shadow-emerald-500/20">
                <WhatsAppSvg className="w-5 h-5" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──── RELATED COURSES ──── */}
      <section className="py-16 lg:py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <motion.span variants={fadeUp} custom={0} className="section-label-purple mb-4">Explore more</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-subheading">
              Related Programs
            </motion.h2>
          </motion.div>
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
                <Link href={`/courses/${c.slug}`} className="block premium-card p-5 hover:border-primary/40 transition-all group h-full">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.shortTitle} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-white/25">{c.heroText}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold">{c.categoryLabel}</span>
                    <span className="text-[10px] text-muted">&middot;</span>
                    <span className="text-[10px] text-muted">{c.duration}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors mb-2 line-clamp-2">{c.title}</h3>
                  <p className="text-xs text-muted line-clamp-2 mb-3">{c.description}</p>
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
