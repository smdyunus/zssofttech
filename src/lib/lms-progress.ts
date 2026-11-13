import { getCourseBySlug } from '@/lib/data/courses';
import {
  getFallbackLessonVideos,
  getLessonVideos,
  type LmsEnrollment,
} from '@/lib/data/lms';

export type ModuleProgress = {
  watchedVideoIds: string[];
  completedTopicIndexes: number[];
};

export type CourseProgressState = {
  courseSlug: string;
  modules: Record<string, ModuleProgress>;
  updatedAt: string;
};

const STORAGE_PREFIX = 'zs_lms_progress:';
export const LMS_PROGRESS_EVENT = 'zs-lms-progress-change';

/** Videos drive most of the score; topic checks prove follow-through. */
export const VIDEO_WEIGHT = 0.7;
export const TOPIC_WEIGHT = 0.3;

function storageKey(courseSlug: string): string {
  return `${STORAGE_PREFIX}${courseSlug}`;
}

function emptyModule(): ModuleProgress {
  return { watchedVideoIds: [], completedTopicIndexes: [] };
}

export function getCourseProgressState(
  courseSlug: string
): CourseProgressState {
  if (typeof window === 'undefined') {
    return { courseSlug, modules: {}, updatedAt: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(storageKey(courseSlug));
    if (!raw) {
      return { courseSlug, modules: {}, updatedAt: new Date().toISOString() };
    }
    const parsed = JSON.parse(raw) as CourseProgressState;
    return {
      courseSlug,
      modules: parsed.modules ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return { courseSlug, modules: {}, updatedAt: new Date().toISOString() };
  }
}

function saveCourseProgressState(state: CourseProgressState): void {
  if (typeof window === 'undefined') return;
  const next = { ...state, updatedAt: new Date().toISOString() };
  localStorage.setItem(storageKey(state.courseSlug), JSON.stringify(next));
  window.dispatchEvent(
    new CustomEvent(LMS_PROGRESS_EVENT, { detail: { courseSlug: state.courseSlug } })
  );
}

export function getModuleProgress(
  courseSlug: string,
  moduleIndex: number
): ModuleProgress {
  const state = getCourseProgressState(courseSlug);
  return state.modules[String(moduleIndex)] ?? emptyModule();
}

export function markVideoWatched(
  courseSlug: string,
  moduleIndex: number,
  videoId: string
): ModuleProgress {
  const state = getCourseProgressState(courseSlug);
  const key = String(moduleIndex);
  const current = state.modules[key] ?? emptyModule();
  const watched = new Set(current.watchedVideoIds);
  watched.add(videoId);
  const nextModule: ModuleProgress = {
    ...current,
    watchedVideoIds: Array.from(watched),
  };
  state.modules[key] = nextModule;
  saveCourseProgressState(state);
  return nextModule;
}

export function setTopicCompleted(
  courseSlug: string,
  moduleIndex: number,
  topicIndex: number,
  completed: boolean
): ModuleProgress {
  const state = getCourseProgressState(courseSlug);
  const key = String(moduleIndex);
  const current = state.modules[key] ?? emptyModule();
  const topics = new Set(current.completedTopicIndexes);
  if (completed) topics.add(topicIndex);
  else topics.delete(topicIndex);
  const nextModule: ModuleProgress = {
    ...current,
    completedTopicIndexes: Array.from(topics).sort((a, b) => a - b),
  };
  state.modules[key] = nextModule;
  saveCourseProgressState(state);
  return nextModule;
}

function moduleVideoList(courseSlug: string, moduleIndex: number, moduleTitle: string) {
  const mapped = getLessonVideos(courseSlug, moduleIndex);
  return mapped.length > 0 ? mapped : getFallbackLessonVideos(moduleTitle);
}

export type ProgressBreakdown = {
  progress: number;
  videoDone: number;
  videoTotal: number;
  topicDone: number;
  topicTotal: number;
  status: LmsEnrollment['status'];
  currentModuleIndex: number;
  nextLesson: string;
};

export function computeCourseProgress(courseSlug: string): ProgressBreakdown {
  const course = getCourseBySlug(courseSlug);
  const state = getCourseProgressState(courseSlug);

  if (!course) {
    return {
      progress: 0,
      videoDone: 0,
      videoTotal: 0,
      topicDone: 0,
      topicTotal: 0,
      status: 'not_started',
      currentModuleIndex: 0,
      nextLesson: 'Start course',
    };
  }

  let videoDone = 0;
  let videoTotal = 0;
  let topicDone = 0;
  let topicTotal = 0;
  let currentModuleIndex = course.curriculum.length - 1;
  let nextLesson = 'Certificate ready';
  let foundIncomplete = false;

  course.curriculum.forEach((module, moduleIndex) => {
    const videos = moduleVideoList(courseSlug, moduleIndex, module.title);
    const moduleState = state.modules[String(moduleIndex)] ?? emptyModule();
    const watched = new Set(moduleState.watchedVideoIds);
    const checked = new Set(moduleState.completedTopicIndexes);

    videoTotal += videos.length;
    topicTotal += module.topics.length;

    const moduleVideoDone = videos.filter((v) => watched.has(v.id)).length;
    const moduleTopicDone = module.topics.filter((_, i) => checked.has(i)).length;

    videoDone += moduleVideoDone;
    topicDone += moduleTopicDone;

    const moduleComplete =
      (videos.length === 0 || moduleVideoDone >= videos.length) &&
      (module.topics.length === 0 || moduleTopicDone >= module.topics.length);

    if (!foundIncomplete && !moduleComplete) {
      foundIncomplete = true;
      currentModuleIndex = moduleIndex;
      const nextVideo = videos.find((v) => !watched.has(v.id));
      const nextTopicIndex = module.topics.findIndex((_, i) => !checked.has(i));
      nextLesson =
        nextVideo?.title ??
        (nextTopicIndex >= 0
          ? module.topics[nextTopicIndex]
          : module.title);
    }
  });

  if (!foundIncomplete) {
    currentModuleIndex = Math.max(course.curriculum.length - 1, 0);
    nextLesson = 'Certificate ready';
  }

  let progress = 0;
  if (videoTotal === 0 && topicTotal === 0) {
    progress = 0;
  } else if (videoTotal === 0) {
    progress = Math.round((topicDone / topicTotal) * 100);
  } else if (topicTotal === 0) {
    progress = Math.round((videoDone / videoTotal) * 100);
  } else {
    const videoShare = (videoDone / videoTotal) * VIDEO_WEIGHT;
    const topicShare = (topicDone / topicTotal) * TOPIC_WEIGHT;
    progress = Math.round((videoShare + topicShare) * 100);
  }

  progress = Math.min(100, Math.max(0, progress));

  const status: LmsEnrollment['status'] =
    progress >= 100
      ? 'completed'
      : progress > 0
        ? 'in_progress'
        : 'not_started';

  return {
    progress,
    videoDone,
    videoTotal,
    topicDone,
    topicTotal,
    status,
    currentModuleIndex,
    nextLesson,
  };
}

export function applyLiveProgress(
  enrollment: LmsEnrollment
): LmsEnrollment & ProgressBreakdown {
  const live = computeCourseProgress(enrollment.courseSlug);
  const state = getCourseProgressState(enrollment.courseSlug);
  const hasActivity = live.progress > 0 || Object.keys(state.modules).length > 0;
  const lastAccessedLabel =
    live.progress >= 100
      ? 'Completed'
      : hasActivity
        ? relativeLastAccessed(state.updatedAt)
        : 'Not started';

  return {
    ...enrollment,
    ...live,
    lastAccessedLabel,
  };
}

export function relativeLastAccessed(updatedAt: string): string {
  const then = new Date(updatedAt).getTime();
  if (Number.isNaN(then)) return 'Recently';
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export type LiveEnrolledCourse = LmsEnrollment &
  ProgressBreakdown & {
    course: NonNullable<ReturnType<typeof getCourseBySlug>>;
  };

export function getLiveEnrolledCourses(
  enrollments: LmsEnrollment[]
): LiveEnrolledCourse[] {
  return enrollments
    .map((enrollment) => {
      const course = getCourseBySlug(enrollment.courseSlug);
      if (!course) return null;
      return { ...applyLiveProgress(enrollment), course };
    })
    .filter((item): item is LiveEnrolledCourse => item !== null);
}

export function getLiveContinueLearning(
  enrollments: LmsEnrollment[]
): LiveEnrolledCourse | null {
  const enrolled = getLiveEnrolledCourses(enrollments);
  return (
    enrolled.find((c) => c.status === 'in_progress') ??
    enrolled.find((c) => c.status === 'not_started') ??
    null
  );
}

export function getLiveLmsStats(enrollments: LmsEnrollment[]) {
  const enrolled = getLiveEnrolledCourses(enrollments);
  const inProgress = enrolled.filter((c) => c.status === 'in_progress').length;
  const completed = enrolled.filter((c) => c.status === 'completed').length;
  const avgProgress =
    enrolled.length === 0
      ? 0
      : Math.round(
          enrolled.reduce((sum, c) => sum + c.progress, 0) / enrolled.length
        );

  return {
    enrolledCount: enrolled.length,
    inProgress,
    completed,
    avgProgress,
  };
}
