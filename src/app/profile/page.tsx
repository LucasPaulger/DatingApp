'use client';

import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-100 to-teal-100 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src="https://placekitten.com/200/200"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-rose-500"
              />
              <button className="absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
              <p className="text-gray-600 mt-1">28 • New York City</p>
              <p className="text-gray-600 mt-1">Software Engineer • Dog Lover • Adventure Seeker</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Me Section */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600">
                Hey there! I'm Sarah, a software engineer by day and adventure seeker by night. 
                I love exploring new places, trying different cuisines, and spending time outdoors 
                with my golden retriever, Max. Looking for someone who shares my passion for life 
                and wouldn't mind joining me on spontaneous weekend adventures!
              </p>
            </div>

            {/* Photos Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>
                <button className="text-rose-500 hover:text-rose-600 font-semibold">
                  Add Photos
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={`https://placekitten.com/300/30${i}`}
                      alt={`Photo ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences & Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Location</h3>
                  <p className="text-gray-900">New York City, NY</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Occupation</h3>
                  <p className="text-gray-900">Software Engineer</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Education</h3>
                  <p className="text-gray-900">Master's in Computer Science</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Height</h3>
                  <p className="text-gray-900">5'7" (170 cm)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {['Travel', 'Photography', 'Hiking', 'Cooking', 'Dogs', 'Tech', 'Music', 'Coffee'].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => router.push('/profile/edit')}
            className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
} 