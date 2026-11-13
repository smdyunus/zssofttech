import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/data/courses';
import { lmsEnrollments } from '@/lib/data/lms';
import LmsCourseClient from './LmsCourseClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lmsEnrollments.map((e) => ({ slug: e.courseSlug }));
}

export default async function LmsCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const enrollment = lmsEnrollments.find((e) => e.courseSlug === slug);

  if (!course || !enrollment) {
    notFound();
  }

  return <LmsCourseClient course={course} enrollment={enrollment} />;
}
