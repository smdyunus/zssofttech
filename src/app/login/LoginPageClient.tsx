'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  BookOpen,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';
import {
  authenticateStudent,
  getSession,
  saveSession,
} from '@/lib/auth';

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

const portalHighlights = [
  {
    icon: BookOpen,
    label: 'Access your enrolled courses',
  },
  {
    icon: TrendingUp,
    label: 'Track lesson videos and topic progress',
  },
  {
    icon: GraduationCap,
    label: 'Classroom support in Nandyal',
  },
];

export default function LoginPageClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ userId: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (getSession()) {
      window.location.assign('/lms');
      return;
    }
    setCheckingSession(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const session = authenticateStudent(form.userId, form.password);

    window.setTimeout(() => {
      if (!session) {
        setAuthError(true);
        setSubmitting(false);
        return;
      }
      saveSession(session);
      window.location.assign('/lms');
    }, 350);
  };

  const handleFieldChange = (field: 'userId' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (authError) setAuthError(false);
  };

  if (checkingSession) {
    return (
      <section className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">Checking session...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,93,4,0.07),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(30,58,95,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:grid lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* Brand panel - second on mobile so the form stays above the fold */}
          <div className="relative order-2 overflow-hidden bg-[linear-gradient(145deg,#0f172a_0%,#1e3a5f_55%,#1e293b_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:order-1 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300/90">
              Student portal
            </p>
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {instituteInfo.name}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              Sign in to open your student LMS with courses, lessons, and
              progress for your enrolled batch.
            </p>

            <ul className="mt-8 space-y-3">
              {portalHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-orange-300" />
                    </span>
                    <span className="pt-1.5 leading-snug">{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-xs text-slate-400">
              Campus support | {instituteInfo.workingHours}
              <br />
              {instituteInfo.contact.phone} | {instituteInfo.contact.email}
            </p>
          </div>

          {/* Form panel */}
          <div className="order-1 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:order-2 lg:px-10 lg:py-12">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-md shadow-orange-500/20">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Student login
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Use your student User ID or email to open the LMS.
                </p>
              </div>
            </div>

            {authError ? (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5"
              >
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <AlertCircle className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Invalid credentials
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        We could not sign you in with that User ID and password.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={() => setAuthError(false)}
                        className="btn-premium px-4 py-2.5 text-sm"
                      >
                        Try again
                      </button>
                      <a
                        href={`mailto:${instituteInfo.contact.email}`}
                        className="text-center text-sm font-medium text-orange-600 hover:underline sm:text-left"
                      >
                        Contact office
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="userId"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    User ID / Email
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                      className={`w-full rounded-xl border bg-slate-50/80 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                        errors.userId ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="Enter your student user ID or email"
                    />
                  </div>
                  {errors.userId && (
                    <p id="userId-error" className="mt-1 text-xs text-red-500">
                      {errors.userId}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                      className={`w-full rounded-xl border bg-slate-50/80 py-3 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                        errors.password ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-1 text-xs text-red-500"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-premium mt-1 w-full disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to LMS
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
