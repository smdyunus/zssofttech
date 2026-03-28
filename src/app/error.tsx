'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app/error]', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
      <p className="text-sm text-muted max-w-lg mb-4">
        {process.env.NODE_ENV === 'development' ? error.message : 'Please refresh the page or try again.'}
      </p>
      {error.digest && (
        <p className="text-xs text-muted mb-4 font-mono">Digest: {error.digest}</p>
      )}
      <button
        type="button"
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
