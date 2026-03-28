import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Student Login',
  description:
    'Student user login for ZS Soft Tech — sign in with your institute-issued credentials.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}
