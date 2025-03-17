'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// In a real app, this would be stored securely in a database
const ADMIN_CREDENTIALS = {
  'admin@flyrt.com': 'admin123',
  'lucas@paulgerandcompany.com': 'FlyrtAdmin2024!'
};

export default function AdminSignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if the email exists and password matches
    if (ADMIN_CREDENTIALS[formData.email as keyof typeof ADMIN_CREDENTIALS] === formData.password) {
      // Set admin session/token here
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', formData.email);
      router.push('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-500 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="text-gray-600 mt-2">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
} 