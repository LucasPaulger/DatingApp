'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userEmail = localStorage.getItem('userEmail');
    setIsLoggedIn(!!userEmail);

    // Check URL parameters for test login
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('test_login') === 'true') {
        localStorage.setItem('userEmail', 'test@example.com');
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-500">
            Flyrt
          </Link>
          <div className="flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <Link href="/matches" className="text-gray-600 hover:text-gray-900">Matches</Link>
                <Link href="/messages" className="text-gray-600 hover:text-gray-900">Messages</Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
              </>
            ) : null}
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            {!isAdminPage && (
              <button 
                onClick={isLoggedIn ? handleSignOut : () => window.location.href = '/?test_login=true'}
                className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
              >
                {isLoggedIn ? "Sign Out" : "Test Login"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 