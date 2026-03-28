import { notFound } from 'next/navigation';
import { getCourseBySlug, courses } from '@/lib/data/courses';
import { instituteInfo } from '@/lib/data/institute';
import CourseDetailClient from './CourseDetailClient';

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} - ZS Soft Tech`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  const fallbackRelated =
    relatedCourses.length < 3
      ? [
          ...relatedCourses,
          ...courses
            .filter((c) => c.id !== course.id && !relatedCourses.find((r) => r.id === c.id))
            .slice(0, 3 - relatedCourses.length),
        ]
      : relatedCourses;

  return (
    <CourseDetailClient
      course={course}
      relatedCourses={fallbackRelated}
      instituteInfo={{
        name: instituteInfo.name,
        contact: {
          whatsapp: instituteInfo.contact.whatsapp,
          phone: instituteInfo.contact.phone,
        },
      }}
    />
  );
}
