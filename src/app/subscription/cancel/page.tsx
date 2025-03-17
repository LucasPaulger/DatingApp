'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionCancel() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to matches page after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/matches');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Subscription Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          The subscription process was cancelled. You can try again anytime from
          the matches page.
        </p>
        <div className="animate-pulse text-sm text-gray-500">
          Redirecting you back to matches...
        </div>
      </div>
    </div>
  );
} 