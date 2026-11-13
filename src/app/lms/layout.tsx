import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student LMS',
  description:
    'ZS Soft Tech learning management system — courses, progress, resources, and announcements for enrolled students.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
