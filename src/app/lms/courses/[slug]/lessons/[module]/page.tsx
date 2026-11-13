import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/data/courses';
import { lmsEnrollments } from '@/lib/data/lms';
import LmsLessonClient from './LmsLessonClient';

type Props = {
  params: Promise<{ slug: string; module: string }>;
};

export function generateStaticParams() {
  return lmsEnrollments.flatMap((enrollment) => {
    const course = getCourseBySlug(enrollment.courseSlug);
    if (!course) return [];
    return course.curriculum.map((_, index) => ({
      slug: enrollment.courseSlug,
      module: String(index),
    }));
  });
}

export default async function LmsLessonPage({ params }: Props) {
  const { slug, module: moduleParam } = await params;
  const course = getCourseBySlug(slug);
  const enrollment = lmsEnrollments.find((e) => e.courseSlug === slug);
  const moduleIndex = Number.parseInt(moduleParam, 10);

  if (
    !course ||
    !enrollment ||
    Number.isNaN(moduleIndex) ||
    moduleIndex < 0 ||
    moduleIndex >= course.curriculum.length
  ) {
    notFound();
  }

  return (
    <LmsLessonClient
      course={course}
      enrollment={enrollment}
      moduleIndex={moduleIndex}
    />
  );
}
