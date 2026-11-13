'use client';

import { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function SignOutConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signout-title"
      aria-describedby="signout-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45"
        aria-label="Close sign out dialog"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Cancel"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
          <LogOut className="h-5 w-5" />
        </div>

        <h2
          id="signout-title"
          className="mb-1 text-lg font-semibold tracking-tight text-slate-900"
        >
          Sign out of LMS?
        </h2>
        <p id="signout-desc" className="mb-6 text-sm leading-relaxed text-slate-500">
          You will need to sign in again to access your courses, progress, and
          resources. Your learning progress stays saved on this device.
        </p>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="lms-btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-red-700 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
