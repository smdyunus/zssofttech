import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Student Login',
  description:
    'Student login for ZS Soft Tech — sign in to access your LMS dashboard, courses, and progress.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}
