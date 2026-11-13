'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  LogOut,
  PlayCircle,
  FileText,
  Link2,
  Video,
  Bell,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';
import {
  clearSession,
  getSession,
  type StudentSession,
} from '@/lib/auth';
import {
  lmsAnnouncements,
  lmsEnrollments,
  lmsResources,
} from '@/lib/data/lms';
import {
  getLiveContinueLearning,
  getLiveEnrolledCourses,
  getLiveLmsStats,
  LMS_PROGRESS_EVENT,
  type LiveEnrolledCourse,
} from '@/lib/lms-progress';
import SignOutConfirmDialog from '@/components/SignOutConfirmDialog';

const statusStyles: Record<
  LiveEnrolledCourse['status'],
  { label: string; className: string }
> = {
  in_progress: {
    label: 'In progress',
    className: 'lms-badge lms-badge-progress',
  },
  not_started: {
    label: 'Not started',
    className: 'lms-badge lms-badge-idle',
  },
  completed: {
    label: 'Completed',
    className: 'lms-badge lms-badge-done',
  },
};

const resourceIcon = {
  PDF: FileText,
  Link: Link2,
  Video: Video,
};

export default function LmsDashboardClient() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [ready, setReady] = useState(false);
  const [enrolled, setEnrolled] = useState<LiveEnrolledCourse[]>([]);
  const [continueCourse, setContinueCourse] = useState<LiveEnrolledCourse | null>(
    null
  );
  const [stats, setStats] = useState({
    enrolledCount: 0,
    inProgress: 0,
    completed: 0,
    avgProgress: 0,
  });
  const [signOutOpen, setSignOutOpen] = useState(false);

  const refreshProgress = () => {
    setEnrolled(getLiveEnrolledCourses(lmsEnrollments));
    setContinueCourse(getLiveContinueLearning(lmsEnrollments));
    setStats(getLiveLmsStats(lmsEnrollments));
  };

  useEffect(() => {
    const current = getSession();
    if (!current) {
      window.location.assign('/login');
      return;
    }
    setSession(current);
    refreshProgress();
    setReady(true);

    const onProgress = () => refreshProgress();
    window.addEventListener(LMS_PROGRESS_EVENT, onProgress);
    window.addEventListener('storage', onProgress);
    return () => {
      window.removeEventListener(LMS_PROGRESS_EVENT, onProgress);
      window.removeEventListener('storage', onProgress);
    };
  }, []);

  const confirmLogout = () => {
    clearSession();
    setSession(null);
    setReady(false);
    setSignOutOpen(false);
    window.location.assign('/login');
  };

  if (!ready || !session) {
    return (
      <section className="lms-shell flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-slate-500">Loading your LMS…</div>
      </section>
    );
  }

  const firstName = session.displayName.split(' ')[0] || 'Student';

  return (
    <section className="lms-shell pb-20">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="lms-icon-tile">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <div>
              <p className="lms-label mb-0.5">ZS Soft Tech · Learning portal</p>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Welcome back, {firstName}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden text-sm text-slate-500 sm:inline">
              {session.email}
              <span className="mx-2 text-slate-300">·</span>
              {session.batch}
            </span>
            <Link href="/courses" className="lms-btn-ghost">
              Course catalog
            </Link>
            <button
              type="button"
              onClick={() => setSignOutOpen(true)}
              className="lms-btn-ghost"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <SignOutConfirmDialog
        open={signOutOpen}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={confirmLogout}
      />

      <div className="container mx-auto px-4 pt-8 lg:pt-10">
        <p className="mb-6 text-sm text-slate-500">
          Progress updates automatically when you watch videos (70%) and check
          topics (30%).
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {[
            { label: 'Enrolled', value: String(stats.enrolledCount), icon: BookOpen },
            { label: 'In progress', value: String(stats.inProgress), icon: TrendingUp },
            { label: 'Completed', value: String(stats.completed), icon: CheckCircle2 },
            { label: 'Avg. progress', value: `${stats.avgProgress}%`, icon: GraduationCap },
          ].map((stat) => (
            <div key={stat.label} className="lms-card p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="lms-icon-tile h-9 w-9">
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="lms-label mb-0">{stat.label}</span>
              </div>
              <p className="lms-stat-value">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            {continueCourse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="lms-hero p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-md bg-slate-700 sm:w-40">
                    <Image
                      src={continueCourse.course.image}
                      alt={continueCourse.course.title}
                      fill
                      className="object-cover opacity-90"
                      sizes="160px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="lms-label lms-label-on-dark mb-1">
                      Continue learning
                    </p>
                    <h2 className="mb-1 truncate text-lg font-semibold text-white sm:text-xl">
                      {continueCourse.course.shortTitle}
                    </h2>
                    <p className="mb-3 text-sm text-slate-300">
                      Next: {continueCourse.nextLesson}
                    </p>
                    <div className="mb-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-300">
                        <span>
                          {continueCourse.progress}% · {continueCourse.videoDone}/
                          {continueCourse.videoTotal} videos ·{' '}
                          {continueCourse.topicDone}/{continueCourse.topicTotal}{' '}
                          topics
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {continueCourse.lastAccessedLabel}
                        </span>
                      </div>
                      <div className="lms-progress-track lms-progress-track-on-dark">
                        <div
                          className="lms-progress-fill lms-progress-fill-on-dark"
                          style={{ width: `${continueCourse.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/lms/courses/${continueCourse.courseSlug}/lessons/${continueCourse.currentModuleIndex}`}
                      className="lms-btn"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Resume course
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
            >
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="lms-label mb-1">Learning path</p>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    My courses
                  </h2>
                </div>
                <span className="text-sm text-slate-500">
                  {enrolled.length} enrolled
                </span>
              </div>
              <div className="space-y-3">
                {enrolled.map((item) => {
                  const status = statusStyles[item.status];
                  return (
                    <Link
                      key={item.courseSlug}
                      href={`/lms/courses/${item.courseSlug}`}
                      className="lms-card group flex flex-col gap-4 p-4 transition-colors hover:border-slate-300 sm:flex-row sm:items-center sm:p-5"
                    >
                      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-md bg-slate-100 sm:w-28">
                        <Image
                          src={item.course.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-900">
                            {item.course.title}
                          </h3>
                          <span className={status.className}>{status.label}</span>
                        </div>
                        <p className="mb-3 line-clamp-1 text-sm text-slate-500">
                          {item.videoDone}/{item.videoTotal} videos ·{' '}
                          {item.topicDone}/{item.topicTotal} topics · Next:{' '}
                          {item.nextLesson}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="lms-progress-track max-w-xs flex-1">
                            <div
                              className="lms-progress-fill"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold tabular-nums text-slate-600">
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-800 sm:block" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lms-card-raised p-5"
            >
              <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Bell className="h-4 w-4 text-slate-500" />
                <h2 className="font-semibold text-slate-900">Announcements</h2>
              </div>
              <ul className="space-y-4">
                {lmsAnnouncements.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="lms-badge lms-badge-progress">{item.tag}</span>
                      <span className="text-[11px] text-slate-400">
                        {item.dateLabel}
                      </span>
                    </div>
                    <p className="mb-1 text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="lms-card-raised p-5"
            >
              <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="h-4 w-4 text-slate-500" />
                <h2 className="font-semibold text-slate-900">Resources</h2>
              </div>
              <ul className="space-y-1">
                {lmsResources.map((resource) => {
                  const Icon = resourceIcon[resource.type];
                  return (
                    <li key={resource.id}>
                      <div className="flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-slate-50">
                        <div className="lms-icon-tile mt-0.5 h-8 w-8 shrink-0">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug text-slate-900">
                            {resource.title}
                          </p>
                          <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-400">
                            {resource.type}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
