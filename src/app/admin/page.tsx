'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock data - in a real app, this would come from your backend
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    age: 28,
    location: 'New York City',
    verificationStatus: 'pending',
    selfieUrl: 'https://placekitten.com/200/200',
    idUrl: 'https://placekitten.com/201/201',
    submittedAt: '2024-03-17T10:00:00Z',
    interests: ['Travel', 'Photography', 'Hiking']
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.d@example.com',
    age: 31,
    location: 'London, ON',
    verificationStatus: 'verified',
    selfieUrl: 'https://placekitten.com/202/202',
    idUrl: 'https://placekitten.com/203/203',
    submittedAt: '2024-03-16T15:30:00Z',
    interests: ['Technology', 'Coffee', 'Food']
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    // Check if admin is authenticated
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    const email = localStorage.getItem('adminEmail') || '';
    
    if (!isAdmin) {
      router.push('/admin/signin');
    } else {
      setAdminEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    router.push('/admin/signin');
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.verificationStatus === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerification = (userId: number, status: 'verified' | 'rejected') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verificationStatus: status } : user
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Flyrt Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {adminEmail}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                <option value="all">All Users</option>
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.selfieUrl}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                            user.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {user.verificationStatus.charAt(0).toUpperCase() + user.verificationStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(user.selfieUrl, '_blank')}
                            className="text-rose-600 hover:text-rose-900"
                          >
                            View Selfie
                          </button>
                          <button
                            onClick={() => window.open(user.idUrl, '_blank')}
                            className="text-rose-600 hover:text-rose-900"
                          >
                            View ID
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.verificationStatus === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerification(user.id, 'verified')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleVerification(user.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-3xl font-bold text-rose-500">{users.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Pending Verifications</h3>
                <p className="text-3xl font-bold text-yellow-500">
                  {users.filter(user => user.verificationStatus === 'pending').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Verified Users</h3>
                <p className="text-3xl font-bold text-green-500">
                  {users.filter(user => user.verificationStatus === 'verified').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 