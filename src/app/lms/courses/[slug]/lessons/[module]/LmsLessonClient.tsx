'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  Video,
  Clock,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import type { Course } from '@/lib/data/courses';
import {
  getFallbackLessonVideos,
  getLessonVideos,
  type LmsEnrollment,
  type LmsLessonVideo,
} from '@/lib/data/lms';
import {
  computeCourseProgress,
  getModuleProgress,
  markVideoWatched,
  setTopicCompleted,
  type ProgressBreakdown,
} from '@/lib/lms-progress';

type Props = {
  course: Course;
  enrollment: LmsEnrollment;
  moduleIndex: number;
};

export default function LmsLessonClient({
  course,
  moduleIndex,
}: Props) {
  const [ready, setReady] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(
    () => new Set()
  );
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(
    () => new Set()
  );
  const [courseProgress, setCourseProgress] = useState<ProgressBreakdown | null>(
    null
  );

  const module = course.curriculum[moduleIndex];
  const videos = useMemo<LmsLessonVideo[]>(() => {
    if (!module) return [];
    const mapped = getLessonVideos(course.slug, moduleIndex);
    return mapped.length > 0
      ? mapped
      : getFallbackLessonVideos(module.title);
  }, [course.slug, module, moduleIndex]);

  const activeVideo =
    videos.find((v) => v.id === activeVideoId) ?? videos[0] ?? null;

  const prevIndex = moduleIndex > 0 ? moduleIndex - 1 : null;
  const nextIndex =
    moduleIndex < course.curriculum.length - 1 ? moduleIndex + 1 : null;
  const courseHref = `/lms/courses/${course.slug}`;

  const refreshCourseProgress = () => {
    setCourseProgress(computeCourseProgress(course.slug));
  };

  useEffect(() => {
    if (!getSession()) {
      window.location.assign('/login');
      return;
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const saved = getModuleProgress(course.slug, moduleIndex);
    setWatchedVideos(new Set(saved.watchedVideoIds));
    setCompletedTopics(new Set(saved.completedTopicIndexes));
    const firstUnwatched =
      videos.find((v) => !saved.watchedVideoIds.includes(v.id)) ?? videos[0];
    setActiveVideoId(firstUnwatched?.id ?? null);
    refreshCourseProgress();
  }, [course.slug, moduleIndex, videos]);

  if (!ready || !module) {
    return (
      <section className="lms-shell flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-slate-500">Loading lesson…</div>
      </section>
    );
  }

  const selectVideo = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const handleWatchVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    const next = markVideoWatched(course.slug, moduleIndex, videoId);
    setWatchedVideos(new Set(next.watchedVideoIds));
    refreshCourseProgress();
  };

  const toggleTopic = (index: number) => {
    const nextCompleted = !completedTopics.has(index);
    const next = setTopicCompleted(
      course.slug,
      moduleIndex,
      index,
      nextCompleted
    );
    setCompletedTopics(new Set(next.completedTopicIndexes));
    refreshCourseProgress();
  };

  const topicProgress = Math.round(
    (completedTopics.size / Math.max(module.topics.length, 1)) * 100
  );
  const videoProgress = Math.round(
    (watchedVideos.size / Math.max(videos.length, 1)) * 100
  );

  return (
    <section className="lms-shell pb-20">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={courseHref}
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {course.shortTitle}
          </Link>
          {courseProgress && (
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">
                Course {courseProgress.progress}%
              </span>
              <span>
                {courseProgress.videoDone}/{courseProgress.videoTotal} videos
              </span>
              <span>
                {courseProgress.topicDone}/{courseProgress.topicTotal} topics
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="lms-card-raised mb-6 p-5 sm:p-7">
            <p className="lms-label mb-2">
              {module.week} · Lesson {moduleIndex + 1} of{' '}
              {course.curriculum.length}
            </p>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {module.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Watch each video to earn progress, then check off topics as you
              complete them. Course score = 70% videos + 30% topics.
            </p>

            <div className="mt-5 grid max-w-xl gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Videos watched</span>
                  <span className="font-semibold tabular-nums text-slate-700">
                    {watchedVideos.size}/{videos.length} · {videoProgress}%
                  </span>
                </div>
                <div className="lms-progress-track">
                  <div
                    className="lms-progress-fill lms-progress-fill-accent transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Topics checked</span>
                  <span className="font-semibold tabular-nums text-slate-700">
                    {completedTopics.size}/{module.topics.length} ·{' '}
                    {topicProgress}%
                  </span>
                </div>
                <div className="lms-progress-track">
                  <div
                    className="lms-progress-fill transition-all"
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {activeVideo ? (
                <div className="lms-card overflow-hidden">
                  <div className="relative aspect-video bg-slate-900">
                    <iframe
                      key={activeVideo.id}
                      title={activeVideo.title}
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="border-t border-slate-100 p-4 sm:p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="lms-badge lms-badge-current inline-flex items-center gap-1.5">
                        <Video className="h-3.5 w-3.5" />
                        Course video
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {activeVideo.duration}
                      </span>
                      {watchedVideos.has(activeVideo.id) && (
                        <span className="lms-badge lms-badge-done">Counted</span>
                      )}
                    </div>
                    <h2 className="mb-1 text-lg font-semibold text-slate-900">
                      {activeVideo.title}
                    </h2>
                    {activeVideo.description && (
                      <p className="text-sm text-slate-500">
                        {activeVideo.description}
                      </p>
                    )}
                    {watchedVideos.has(activeVideo.id) ? (
                      <p className="mt-4 text-sm font-medium text-emerald-700">
                        This video is counted toward your course progress.
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWatchVideo(activeVideo.id)}
                        className="lms-btn mt-4"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark video as watched
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="lms-card p-8 text-center text-sm text-slate-500">
                  No videos uploaded for this module yet.
                </div>
              )}
            </div>

            <aside>
              <div className="lms-card-raised p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PlayCircle className="h-4 w-4 text-slate-500" />
                  <h2 className="font-semibold text-slate-900">Playlist</h2>
                  <span className="ml-auto text-xs text-slate-400">
                    {watchedVideos.size}/{videos.length}
                  </span>
                </div>
                <ul className="max-h-[28rem] space-y-1.5 overflow-y-auto pr-1">
                  {videos.map((video, index) => {
                    const isActive = activeVideo?.id === video.id;
                    const watched = watchedVideos.has(video.id);
                    return (
                      <li key={video.id}>
                        <button
                          type="button"
                          onClick={() => selectVideo(video.id)}
                          className={`w-full rounded-md border p-3 text-left transition-colors ${
                            isActive
                              ? 'border-blue-200 bg-blue-50'
                              : 'border-transparent bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded text-xs font-semibold ${
                                watched
                                  ? 'bg-emerald-600 text-white'
                                  : isActive
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {watched ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-snug text-slate-900">
                                {video.title}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                <span>{video.duration}</span>
                                {watched && (
                                  <span className="text-emerald-700">Watched</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>

          <div className="lms-card mb-6 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="h-4 w-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900">Topics checklist</h2>
              <span className="ml-auto text-xs text-slate-400">
                {completedTopics.size}/{module.topics.length}
              </span>
            </div>
            <ul className="space-y-2">
              {module.topics.map((topic, index) => {
                const done = completedTopics.has(index);
                return (
                  <li key={topic}>
                    <button
                      type="button"
                      onClick={() => toggleTopic(index)}
                      className={`flex w-full items-start gap-3 rounded-md border p-3.5 text-left transition-colors ${
                        done
                          ? 'border-emerald-200 bg-emerald-50/60'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
                      )}
                      <span
                        className={`text-sm ${
                          done
                            ? 'text-slate-500 line-through'
                            : 'text-slate-800'
                        }`}
                      >
                        {topic}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            {prevIndex !== null ? (
              <Link
                href={`/lms/courses/${course.slug}/lessons/${prevIndex}`}
                className="lms-btn-secondary"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous module
              </Link>
            ) : (
              <span />
            )}

            {nextIndex !== null ? (
              <Link
                href={`/lms/courses/${course.slug}/lessons/${nextIndex}`}
                className="lms-btn"
              >
                Next module
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href={courseHref} className="lms-btn">
                <PlayCircle className="h-4 w-4" />
                Back to course
              </Link>
            )}
          </div>

          {courseProgress &&
            moduleIndex === courseProgress.currentModuleIndex && (
              <p className="mt-4 text-center text-xs text-slate-500 sm:text-left">
                Current module · Next focus:{' '}
                <span className="font-medium text-slate-800">
                  {courseProgress.nextLesson}
                </span>
              </p>
            )}
        </motion.div>
      </div>
    </section>
  );
}
