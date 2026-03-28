'use client';

import { useEffect } from 'react';

/**
 * Catches errors in the root layout (fonts, etc.). Must include html/body.
 * Check the browser console and terminal where `npm run dev` is running for the full stack.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[global-error]', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased flex flex-col items-center justify-center px-4">
        <h1 className="text-xl font-bold mb-2">Site error</h1>
        <p className="text-sm text-slate-400 max-w-lg text-center mb-2">
          {process.env.NODE_ENV === 'development'
            ? error.message
            : 'Something went wrong. Please try again later.'}
        </p>
        <p className="text-xs text-slate-500 mb-6 text-center max-w-md">
          In development: also read the stack trace in the terminal where Next.js is running (look for lines starting with ⨯ or Error:).
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
