'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

export default function LoginPageClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ userId: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <div className="text-center py-4">
                <p className="text-foreground font-medium mb-2">
                  Login is not connected yet
                </p>
                <p className="text-sm text-muted mb-6">
                  Student portal authentication will be enabled soon. For access or
                  credential issues, contact the institute.
                </p>
                <a
                  href={`mailto:${instituteInfo.contact.email}`}
                  className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Email {instituteInfo.contact.email}
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Try again
                </button>
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
                        setForm({ ...form, userId: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
                      placeholder="Enter your student user ID or email"
                    />
                  </div>
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
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full pl-11 pr-12 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
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
