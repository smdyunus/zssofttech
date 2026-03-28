'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(values: { userId: string; password: string }) {
  const next: Record<string, string> = {};
  const uid = values.userId.trim();

  if (!uid) {
    next.userId = 'User ID or email is required';
  } else if (uid.length > 254) {
    next.userId = 'Must be 254 characters or fewer';
  } else if (uid.includes('@')) {
    if (!EMAIL_RE.test(uid)) {
      next.userId = 'Enter a valid email address';
    }
  } else if (uid.length < 2) {
    next.userId = 'User ID must be at least 2 characters';
  } else if (!/^[\w.-]+$/i.test(uid)) {
    next.userId =
      'User ID can only include letters, numbers, dots, hyphens, and underscores';
  }

  const pwd = values.password;
  if (!pwd) {
    next.password = 'Password is required';
  } else if (pwd.length < 6) {
    next.password = 'Password must be at least 6 characters';
  } else if (pwd.length > 128) {
    next.password = 'Password must be 128 characters or fewer';
  }

  return next;
}

export default function LoginPageClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ userId: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  const handleFieldChange = (field: 'userId' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section className="min-h-[calc(100vh-88px)] py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary mb-4 shadow-lg shadow-primary/25">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Student User Login
            </h1>
            <p className="text-muted text-sm">
              Sign in with your institute-issued credentials
            </p>
          </div>

          <div className="glass rounded-2xl border border-border/50 p-6 sm:p-8 shadow-xl shadow-black/20">
            {submitted ? (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-red-500/35 bg-red-500/5 p-5 sm:p-6 text-left"
              >
                <div className="flex gap-3">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                    <AlertCircle className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">
                        Invalid credentials
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        We could not sign you in with the User ID and password you
                        entered.
                      </p>
                    </div>
                    <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted">
                      <li>
                        Confirm your User ID or email matches what the institute
                        issued.
                      </li>
                      <li>
                        Passwords are case-sensitive — check Caps Lock and try again.
                      </li>
                      <li>
                        If you forgot your password or need access, contact the
                        institute.
                      </li>
                    </ul>
                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setErrors({});
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                      >
                        Try again
                      </button>
                      <a
                        href={`mailto:${instituteInfo.contact.email}`}
                        className="text-center text-sm font-medium text-primary hover:underline sm:text-left"
                      >
                        Contact {instituteInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-xs font-medium text-muted uppercase tracking-wider mb-2"
                  >
                    User ID / Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="userId"
                      name="userId"
                      type="text"
                      autoComplete="username"
                      value={form.userId}
                      onChange={(e) =>
                        handleFieldChange('userId', e.target.value)
                      }
                      aria-invalid={Boolean(errors.userId)}
                      aria-describedby={
                        errors.userId ? 'userId-error' : undefined
                      }
                      className={`w-full pl-11 pr-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 ${
                        errors.userId
                          ? 'border-red-500'
                          : 'border-border/50'
                      }`}
                      placeholder="Enter your student user ID or email"
                    />
                  </div>
                  {errors.userId && (
                    <p id="userId-error" className="text-xs text-red-400 mt-1">
                      {errors.userId}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-muted uppercase tracking-wider mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={form.password}
                      onChange={(e) =>
                        handleFieldChange('password', e.target.value)
                      }
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={
                        errors.password ? 'password-error' : undefined
                      }
                      className={`w-full pl-11 pr-12 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 ${
                        errors.password
                          ? 'border-red-500'
                          : 'border-border/50'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="text-xs text-red-400 mt-1"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                >
                  Sign in
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-card/50 border border-border/30">
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Credentials: </span>
              Your User ID and password are issued by ZS Soft Tech when you enroll.
              If you forgot your password or need a new account, reach out at{' '}
              <a
                href={`mailto:${instituteInfo.contact.email}`}
                className="text-primary hover:underline"
              >
                {instituteInfo.contact.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${instituteInfo.contact.phone.replace(/\D/g, '')}`}
                className="text-primary hover:underline"
              >
                {instituteInfo.contact.phone}
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
