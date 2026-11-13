'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import type { Course } from '@/lib/data/courses';
import { getLessonVideos, type LmsEnrollment } from '@/lib/data/lms';
import {
  applyLiveProgress,
  getModuleProgress,
  LMS_PROGRESS_EVENT,
  type ProgressBreakdown,
} from '@/lib/lms-progress';

type Props = {
  course: Course;
  enrollment: LmsEnrollment;
};

export default function LmsCourseClient({ course, enrollment }: Props) {
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState<LmsEnrollment & ProgressBreakdown>(() =>
    ({ ...enrollment, videoDone: 0, videoTotal: 0, topicDone: 0, topicTotal: 0 })
  );
  const [activeModule, setActiveModule] = useState(enrollment.currentModuleIndex);

  const refresh = () => {
    const next = applyLiveProgress(enrollment);
    setLive(next);
    setActiveModule(next.currentModuleIndex);
  };

  useEffect(() => {
    if (!getSession()) {
      window.location.assign('/login');
      return;
    }
    refresh();
    setReady(true);
    const onProgress = () => refresh();
    window.addEventListener(LMS_PROGRESS_EVENT, onProgress);
    window.addEventListener('storage', onProgress);
    return () => {
      window.removeEventListener(LMS_PROGRESS_EVENT, onProgress);
      window.removeEventListener('storage', onProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollment.courseSlug]);

  const continueHref = `/lms/courses/${course.slug}/lessons/${live.currentModuleIndex}`;

  if (!ready) {
    return (
      <section className="lms-shell flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-slate-500">Loading course…</div>
      </section>
    );
  }

  return (
    <section className="lms-shell pb-20">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/lms"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to LMS
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="lms-hero mb-8 p-5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <span className="lms-label lms-label-on-dark mb-3">
                  {course.categoryLabel}
                </span>
                <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {course.title}
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span>{course.mode}</span>
                  <span className="text-slate-500">·</span>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-64">
                <div className="rounded-md border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="lms-label lms-label-on-dark mb-2">Your progress</p>
                  <p className="mb-1 text-3xl font-semibold tabular-nums text-white">
                    {live.progress}%
                  </p>
                  <p className="mb-3 text-xs text-slate-300">
                    {live.videoDone}/{live.videoTotal} videos · {live.topicDone}/
                    {live.topicTotal} topics
                  </p>
                  <div className="lms-progress-track lms-progress-track-on-dark mb-3">
                    <div
                      className="lms-progress-fill lms-progress-fill-on-dark"
                      style={{ width: `${live.progress}%` }}
                    />
                  </div>
                  <p className="mb-1 text-[11px] text-slate-400">
                    Score: 70% videos + 30% topics
                  </p>
                  <p className="mb-4 text-xs text-slate-300">
                    Next: {live.nextLesson}
                  </p>
                  <Link href={continueHref} className="lms-btn w-full">
                    <PlayCircle className="h-4 w-4" />
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-900" />
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Curriculum
                </h2>
              </div>
              <div className="space-y-3">
                {course.curriculum.map((module, index) => {
                  const isCurrent = index === activeModule;
                  const lessonHref = `/lms/courses/${course.slug}/lessons/${index}`;
                  const videos = getLessonVideos(course.slug, index);
                  const moduleState = getModuleProgress(course.slug, index);
                  const watched = new Set(moduleState.watchedVideoIds);
                  const checked = new Set(moduleState.completedTopicIndexes);
                  const videoDone = videos.filter((v) => watched.has(v.id)).length;
                  const topicDone = module.topics.filter((_, i) =>
                    checked.has(i)
                  ).length;
                  const isDone =
                    (videos.length === 0 || videoDone >= videos.length) &&
                    (module.topics.length === 0 ||
                      topicDone >= module.topics.length) &&
                    (videoDone + topicDone > 0 ||
                      (videos.length === 0 && module.topics.length === 0));
                  const moduleStarted = videoDone > 0 || topicDone > 0;

                  return (
                    <div
                      key={`${module.week}-${module.title}`}
                      id={`module-${index}`}
                      className={`lms-card p-4 sm:p-5 ${
                        isCurrent ? 'border-blue-200 ring-1 ring-blue-100' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveModule(index)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {isDone && moduleStarted ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            ) : index === live.currentModuleIndex ? (
                              <PlayCircle className="h-5 w-5 text-orange-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-300" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="lms-label mb-0">{module.week}</span>
                              {index === live.currentModuleIndex && (
                                <span className="lms-badge lms-badge-current">
                                  Current
                                </span>
                              )}
                              {isDone && moduleStarted && (
                                <span className="lms-badge lms-badge-done">Done</span>
                              )}
                            </div>
                            <h3 className="mb-2 font-semibold text-slate-900">
                              {module.title}
                            </h3>
                            <p className="mb-2 text-xs text-slate-500">
                              {videoDone}/{videos.length || 0} videos · {topicDone}/
                              {module.topics.length} topics
                            </p>
                            {isCurrent && (
                              <ul className="mb-3 space-y-1.5">
                                {module.topics.map((topic) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-2 text-sm text-slate-500"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-800" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </button>
                      <div className="ml-8 mt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={lessonHref}
                          className="lms-link inline-flex items-center gap-1.5 text-sm"
                        >
                          {index === live.currentModuleIndex
                            ? 'Continue with videos'
                            : 'Open lesson'}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="lms-card-raised p-5">
                <h3 className="mb-3 font-semibold text-slate-900">
                  What you&apos;ll build
                </h3>
                <ul className="space-y-2.5">
                  {course.keyFeatures.slice(0, 5).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lms-card-raised p-5">
                <h3 className="mb-3 font-semibold text-slate-900">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {course.technologies.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
