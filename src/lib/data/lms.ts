import { courses, getCourseBySlug, type Course } from '@/lib/data/courses';

export type LmsEnrollment = {
  courseSlug: string;
  progress: number;
  status: 'in_progress' | 'not_started' | 'completed';
  currentModuleIndex: number;
  lastAccessedLabel: string;
  nextLesson: string;
};

export type LmsAnnouncement = {
  id: string;
  title: string;
  body: string;
  dateLabel: string;
  tag: string;
};

export type LmsResource = {
  id: string;
  title: string;
  type: 'PDF' | 'Link' | 'Video';
  courseSlug: string;
};

export type LmsLessonVideo = {
  id: string;
  title: string;
  duration: string;
  /** YouTube video id used for embed playback */
  youtubeId: string;
  description?: string;
};

/**
 * Self-paced lesson videos keyed by courseSlug → moduleIndex.
 * Curated from popular India QA channels (Software Testing Mentor, Edureka,
 * Naveen AutomationLabs, SDET-QA / Pavan, Automation Step by Step, Simplilearn).
 * IDs verified via YouTube oEmbed before shipping.
 */
export const lmsLessonVideos: Record<string, Record<number, LmsLessonVideo[]>> = {
  'manual-testing': {
    0: [
      {
        id: 'mt-0-a',
        title: 'What is Software Testing',
        duration: '12:00',
        youtubeId: 'qQfFp_GORpY',
        description: 'Software Testing Mentor — testing basics with examples.',
      },
      {
        id: 'mt-0-b',
        title: 'What is Manual Testing',
        duration: '10:00',
        youtubeId: 'MoQMRVXs-lo',
        description: 'Software Testing Mentor — manual QA explained for beginners.',
      },
      {
        id: 'mt-0-c',
        title: 'Manual Testing tutorial for beginners (Edureka)',
        duration: '35:00',
        youtubeId: 'AjkYTJklAa8',
        description: 'Edureka India — popular intro to manual testing.',
      },
      {
        id: 'mt-0-d',
        title: 'SDLC for testers',
        duration: '14:00',
        youtubeId: 'PXms5QW4-A4',
        description: 'Software Testing Mentor — Software Development Life Cycle.',
      },
      {
        id: 'mt-0-e',
        title: 'STLC — Software Testing Life Cycle',
        duration: '14:00',
        youtubeId: 'Kf-XaEkvPLw',
        description: 'Software Testing Mentor — phases from test planning to closure.',
      },
      {
        id: 'mt-0-f',
        title: 'Types of software testing',
        duration: '16:00',
        youtubeId: 'YdZ-sduNb48',
        description: 'Software Testing Mentor — functional, non-functional & more.',
      },
      {
        id: 'mt-0-g',
        title: 'Agile testing overview',
        duration: '12:00',
        youtubeId: 'hYpx8l7KgAs',
        description: 'Software Testing Mentor — testing in Agile teams.',
      },
      {
        id: 'mt-0-h',
        title: 'Manual Testing complete tutorial (Hindi)',
        duration: '2:00:00',
        youtubeId: 'NIkTGnmMU_c',
        description: 'CodeStudio — full manual testing course in Hindi.',
      },
    ],
    1: [
      {
        id: 'mt-1-a',
        title: 'What is a test case',
        duration: '12:00',
        youtubeId: 'oYwijhYMYMw',
        description: 'Software Testing Mentor — structure of a good test case.',
      },
      {
        id: 'mt-1-b',
        title: 'How to write test cases',
        duration: '15:00',
        youtubeId: 'jNUbb7C7FQU',
        description: 'Software Testing Mentor — practical test case writing.',
      },
      {
        id: 'mt-1-c',
        title: 'Equivalence Partitioning',
        duration: '12:00',
        youtubeId: 'gXZgInvjaqc',
        description: 'Software Testing Mentor — ECP design technique.',
      },
      {
        id: 'mt-1-d',
        title: 'Boundary Value Analysis',
        duration: '12:00',
        youtubeId: 'DpDgaGP-jsQ',
        description: 'Software Testing Mentor — BVA with examples.',
      },
      {
        id: 'mt-1-e',
        title: 'Decision table testing',
        duration: '12:00',
        youtubeId: 'jlbH9Wm0Z9U',
        description: 'Software Testing Mentor — decision tables for complex rules.',
      },
      {
        id: 'mt-1-f',
        title: 'Smoke vs Sanity testing',
        duration: '10:00',
        youtubeId: 'h6STkbe25dU',
        description: 'Software Testing Mentor — when to run smoke and sanity.',
      },
      {
        id: 'mt-1-g',
        title: 'Regression testing',
        duration: '12:00',
        youtubeId: 'xF1Jp_6ZRWw',
        description: 'Software Testing Mentor — regression strategy basics.',
      },
    ],
    2: [
      {
        id: 'mt-2-a',
        title: 'What is a defect',
        duration: '10:00',
        youtubeId: 'R-Hzh5CTdq0',
        description: 'Software Testing Mentor — bugs, defects, and failures.',
      },
      {
        id: 'mt-2-b',
        title: 'Severity and priority',
        duration: '12:00',
        youtubeId: 'SdrAF8EyEQc',
        description: 'Software Testing Mentor — classify issues correctly.',
      },
      {
        id: 'mt-2-c',
        title: 'Defect life cycle',
        duration: '12:00',
        youtubeId: 'wJUQ45dGkS8',
        description: 'Software Testing Mentor — new → closed workflow.',
      },
      {
        id: 'mt-2-d',
        title: 'How to write a good defect report',
        duration: '12:00',
        youtubeId: 'rTmEUiWwgLs',
        description: 'Software Testing Mentor — clear bug reporting for developers.',
      },
      {
        id: 'mt-2-e',
        title: 'Jira tutorial for beginners (Edureka)',
        duration: '45:00',
        youtubeId: '1RilyCsxp7U',
        description: 'Edureka India — defect tracking with Jira.',
      },
      {
        id: 'mt-2-f',
        title: 'Database testing basics',
        duration: '12:00',
        youtubeId: 'AA3mvKlR8-8',
        description: 'Software Testing Mentor — SQL checks for QA.',
      },
    ],
    3: [
      {
        id: 'mt-3-a',
        title: 'What is Postman',
        duration: '10:00',
        youtubeId: 'cGn_LTFCif0',
        description: 'Automation Step by Step — Postman intro for API testing.',
      },
      {
        id: 'mt-3-b',
        title: 'First API request in Postman',
        duration: '12:00',
        youtubeId: 'lFz6yHGFDWI',
        description: 'Automation Step by Step — send your first request.',
      },
      {
        id: 'mt-3-c',
        title: 'Postman collections & environments',
        duration: '18:00',
        youtubeId: '5aMqyXZRvxg',
        description: 'Automation Step by Step — organize reusable API tests.',
      },
      {
        id: 'mt-3-d',
        title: 'Postman beginner tutorial 2026',
        duration: '25:00',
        youtubeId: 'T_PV6KDzq_Y',
        description: 'Automation Step by Step — install, workspace, first request.',
      },
      {
        id: 'mt-3-e',
        title: 'End-to-end testing',
        duration: '12:00',
        youtubeId: 'WVW4r2QWZkw',
        description: 'Software Testing Mentor — E2E project testing approach.',
      },
      {
        id: 'mt-3-f',
        title: 'Test summary report',
        duration: '10:00',
        youtubeId: 'edFHgGj1M-c',
        description: 'Software Testing Mentor — QA sign-off documentation.',
      },
      {
        id: 'mt-3-g',
        title: 'Manual website testing live demo',
        duration: '20:00',
        youtubeId: 'NHne-BNznCs',
        description: 'QA Engineer Waqas — practical website testing walkthrough.',
      },
    ],
  },
  'automation-testing': {
    0: [
      {
        id: 'at-0-a',
        title: 'Introduction to automation & Selenium (SDET-QA)',
        duration: '1:11:00',
        youtubeId: '8a8wjKKZhSI',
        description: 'Pavan (SDET-QA) — why automation and Selenium overview.',
      },
      {
        id: 'at-0-b',
        title: 'Java setup — JDK & Eclipse',
        duration: '1:26:00',
        youtubeId: 'R5UFQK0cMSs',
        description: 'SDET-QA — install Java tools for Selenium.',
      },
      {
        id: 'at-0-c',
        title: 'Java variables & data types',
        duration: '1:32:00',
        youtubeId: 'OCwXj8jEFYw',
        description: 'SDET-QA — core Java foundations for testers.',
      },
      {
        id: 'at-0-d',
        title: 'Java OOP — class, object & methods',
        duration: '1:12:00',
        youtubeId: 'KnjvIsgEogg',
        description: 'SDET-QA — OOP concepts used in frameworks.',
      },
      {
        id: 'at-0-e',
        title: 'Java collections overview',
        duration: '20:00',
        youtubeId: 'mQ9uxTWZCXA',
        description: 'Naveen AutomationLabs — ArrayList, HashSet, HashMap basics.',
      },
      {
        id: 'at-0-f',
        title: 'Java data types (Naveen)',
        duration: '25:00',
        youtubeId: 'Wm0KeM90bUo',
        description: 'Naveen AutomationLabs — popular core Java starter.',
      },
    ],
    1: [
      {
        id: 'at-1-a',
        title: 'Selenium environment setup',
        duration: '1:37:00',
        youtubeId: 'cGw2ghKh_eU',
        description: 'SDET-QA — WebDriver project setup with Java.',
      },
      {
        id: 'at-1-b',
        title: 'Selenium locators',
        duration: '1:12:00',
        youtubeId: 'VuO7gUmYllY',
        description: 'SDET-QA — ID, name, linkText, class, tag locators.',
      },
      {
        id: 'at-1-c',
        title: 'XPath locators & functions',
        duration: '1:49:00',
        youtubeId: 'kbmYMeoTg2Q',
        description: 'SDET-QA — XPath types and practical examples.',
      },
      {
        id: 'at-1-d',
        title: 'WebDriver waits',
        duration: '1:22:00',
        youtubeId: 'PbuWyuEf8ts',
        description: 'SDET-QA — implicit, explicit, and fluent waits.',
      },
      {
        id: 'at-1-e',
        title: 'Alerts, checkboxes & frames',
        duration: '1:19:00',
        youtubeId: '_g8EUQVideo',
        description: 'SDET-QA — handle common UI controls.',
      },
      {
        id: 'at-1-f',
        title: 'Locators deep dive (Naveen)',
        duration: '30:00',
        youtubeId: 'm6iqdzITwmg',
        description: 'Naveen AutomationLabs — ID, XPath, CSS selectors.',
      },
      {
        id: 'at-1-g',
        title: 'Selenium full course (Edureka)',
        duration: '12:00:00',
        youtubeId: 'FRn5J31eAMw',
        description: 'Edureka India — complete Selenium tutorial (popular).',
      },
    ],
    2: [
      {
        id: 'at-2-a',
        title: 'TestNG framework — Part 1',
        duration: '30:00',
        youtubeId: '0Gew2XOuum8',
        description: 'Naveen AutomationLabs — TestNG annotations & setup.',
      },
      {
        id: 'at-2-b',
        title: 'TestNG DataProviders & parallel',
        duration: '1:20:00',
        youtubeId: 'YFkovvKCqew',
        description: 'SDET-QA — data-driven tests and parallel runs.',
      },
      {
        id: 'at-2-c',
        title: 'Page Object Model pattern',
        duration: '1:15:00',
        youtubeId: '_zqANvFYuLU',
        description: 'SDET-QA — POM design with TestNG.',
      },
      {
        id: 'at-2-d',
        title: 'POM architecture (Naveen)',
        duration: '35:00',
        youtubeId: 'P9ZWOWm7i0k',
        description: 'Naveen AutomationLabs — Page Object Model design.',
      },
      {
        id: 'at-2-e',
        title: 'Extent reports with listeners',
        duration: '1:10:00',
        youtubeId: 'lRKogU8Yfw4',
        description: 'SDET-QA — TestNG listeners and HTML reporting.',
      },
      {
        id: 'at-2-f',
        title: 'Data-driven framework with Apache POI',
        duration: '35:00',
        youtubeId: 'sSNqjNzaP6s',
        description: 'Naveen AutomationLabs — Excel-driven Selenium tests.',
      },
    ],
    3: [
      {
        id: 'at-3-a',
        title: 'Cucumber BDD with Selenium — Part 1',
        duration: '35:00',
        youtubeId: 'vHzMJuc9Zuk',
        description: 'Naveen AutomationLabs — Gherkin + Cucumber JVM intro.',
      },
      {
        id: 'at-3-b',
        title: 'Cucumber options',
        duration: '25:00',
        youtubeId: '9uB7zfN6cAo',
        description: 'Naveen AutomationLabs — cucumber options & glue code.',
      },
      {
        id: 'at-3-c',
        title: 'Data-driven testing in Cucumber',
        duration: '30:00',
        youtubeId: 'I3Ga5jICTHw',
        description: 'Naveen AutomationLabs — BDD data-driven scenarios.',
      },
      {
        id: 'at-3-d',
        title: 'Postman API testing crash course',
        duration: '25:00',
        youtubeId: 'J5l2fepRelk',
        description: 'Automation Step by Step — Postman for API automation.',
      },
      {
        id: 'at-3-e',
        title: 'Postman collections & runner',
        duration: '20:00',
        youtubeId: 'fj4WcRSo4AY',
        description: 'Automation Step by Step — automate API flows.',
      },
    ],
    4: [
      {
        id: 'at-4-a',
        title: 'Git & GitHub workflow for frameworks',
        duration: '1:10:00',
        youtubeId: 'zHeW-isZd-8',
        description: 'SDET-QA — version control for Selenium projects.',
      },
      {
        id: 'at-4-b',
        title: 'Jenkins CI setup for Selenium',
        duration: '1:11:00',
        youtubeId: 'qR20KF7wxSU',
        description: 'SDET-QA — hybrid framework + Jenkins pipeline.',
      },
      {
        id: 'at-4-c',
        title: 'Jenkins full course (Simplilearn)',
        duration: '4:00:00',
        youtubeId: 'FX322RVNGj4',
        description: 'Simplilearn India — Jenkins for CI/CD beginners.',
      },
      {
        id: 'at-4-d',
        title: 'Hybrid framework project (POM)',
        duration: '1:20:00',
        youtubeId: 'RQmKe8fkjw4',
        description: 'SDET-QA — end-to-end automation framework build.',
      },
      {
        id: 'at-4-e',
        title: 'Selenium + Jenkins with POM (Naveen)',
        duration: '30:00',
        youtubeId: 'lPxrPqSyCo8',
        description: 'Naveen AutomationLabs — CI integration for POM suites.',
      },
    ],
  },
};

export function getLessonVideos(
  courseSlug: string,
  moduleIndex: number
): LmsLessonVideo[] {
  return lmsLessonVideos[courseSlug]?.[moduleIndex] ?? [];
}

/** Fallback when a module has no mapped videos yet. */
export function getFallbackLessonVideos(
  moduleTitle: string
): LmsLessonVideo[] {
  return [
    {
      id: 'fallback-intro',
      title: `${moduleTitle} — Software Testing Mentor intro`,
      duration: '12:00',
      youtubeId: 'qQfFp_GORpY',
      description:
        'Popular India QA intro. Replace with ZS Soft Tech batch recordings when available.',
    },
  ];
}

/** Demo enrollments — progress/status are computed live from video + topic completion. */
export const lmsEnrollments: LmsEnrollment[] = [
  {
    courseSlug: 'manual-testing',
    progress: 0,
    status: 'not_started',
    currentModuleIndex: 0,
    lastAccessedLabel: 'Not started',
    nextLesson: 'What is Software Testing',
  },
  {
    courseSlug: 'automation-testing',
    progress: 0,
    status: 'not_started',
    currentModuleIndex: 0,
    lastAccessedLabel: 'Not started',
    nextLesson: 'Introduction to automation & Selenium (SDET-QA)',
  },
];

export const lmsAnnouncements: LmsAnnouncement[] = [
  {
    id: '1',
    title: 'Manual & Automation Testing videos now live',
    body: 'Complete self-paced video playlists for Manual Testing and Selenium Automation Testing are available in your LMS.',
    dateLabel: 'Today',
    tag: 'New',
  },
  {
    id: '2',
    title: 'Manual Testing — test case assignment due Friday',
    body: 'Submit Week 3–4 test cases for the sample e-commerce app in your batch WhatsApp group by Friday 6:00 PM.',
    dateLabel: 'Due Fri',
    tag: 'Assignment',
  },
  {
    id: '3',
    title: 'Automation Testing — Java lab this Saturday',
    body: 'Bring your Maven project set up. We will write the first Selenium locator scripts in class.',
    dateLabel: 'Sat 11 AM',
    tag: 'Live class',
  },
];

export const lmsResources: LmsResource[] = [
  {
    id: 'r1',
    title: 'Manual Testing — test case template',
    type: 'PDF',
    courseSlug: 'manual-testing',
  },
  {
    id: 'r2',
    title: 'Manual Testing — defect report checklist',
    type: 'PDF',
    courseSlug: 'manual-testing',
  },
  {
    id: 'r3',
    title: 'Selenium Automation — framework starter notes',
    type: 'PDF',
    courseSlug: 'automation-testing',
  },
  {
    id: 'r4',
    title: 'TestNG + Cucumber setup guide',
    type: 'Link',
    courseSlug: 'automation-testing',
  },
];

export type EnrolledCourseView = LmsEnrollment & {
  course: Course;
};

export function getEnrolledCourses(): EnrolledCourseView[] {
  return lmsEnrollments
    .map((enrollment) => {
      const course = getCourseBySlug(enrollment.courseSlug);
      if (!course) return null;
      return { ...enrollment, course };
    })
    .filter((item): item is EnrolledCourseView => item !== null);
}

export function getContinueLearning(): EnrolledCourseView | null {
  const enrolled = getEnrolledCourses();
  return (
    enrolled.find((c) => c.status === 'in_progress') ??
    enrolled.find((c) => c.status === 'not_started') ??
    null
  );
}

export function getLmsStats() {
  const enrolled = getEnrolledCourses();
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
    catalogCount: courses.length,
  };
}
