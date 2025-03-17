'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from your backend
  const [formData, setFormData] = useState({
    name: "John Doe",
    age: "28",
    occupation: "Software Developer",
    location: "London, ON",
    bio: "Tech enthusiast and coffee lover. Always up for trying new restaurants and exploring the city.",
    interests: ["Technology", "Coffee", "Food", "Travel", "Fitness"],
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    ],
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    showAge: true,
    showLocation: true,
    maxDistance: "25",
    agePreferenceMin: "24",
    agePreferenceMax: "32",
    notifications: {
      messages: true,
      matches: true,
      likes: true
    }
  });

  const [newInterest, setNewInterest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would handle file upload to your storage service
    console.log('Photo upload:', e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.bio) newErrors.bio = 'Bio is required';
    if (formData.interests.length < 3) newErrors.interests = 'At least 3 interests are required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would send the data to your backend
    console.log('Saving profile:', formData);
    
    // Navigate back to profile page
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </section>

            {/* About Me */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>
            </section>

            {/* Interests */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
              
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
              </div>
            </section>

            {/* Photos */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        photos: prev.photos.filter((_, i) => i !== index)
                      }))}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-rose-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <span className="text-gray-500">Add Photo</span>
                </label>
              </div>
            </section>

            {/* Privacy Settings */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="showAge"
                    checked={formData.showAge}
                    onChange={handleCheckboxChange}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700">Show age on profile</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="showLocation"
                    checked={formData.showLocation}
                    onChange={handleCheckboxChange}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700">Show location on profile</span>
                </label>
              </div>
            </section>

            {/* Preferences */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Distance (km)
                  </label>
                  <input
                    type="number"
                    name="maxDistance"
                    value={formData.maxDistance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Preference (Min)
                  </label>
                  <input
                    type="number"
                    name="agePreferenceMin"
                    value={formData.agePreferenceMin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Preference (Max)
                  </label>
                  <input
                    type="number"
                    name="agePreferenceMax"
                    value={formData.agePreferenceMax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="notifications.messages"
                    checked={formData.notifications.messages}
                    onChange={handleCheckboxChange}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700">New message notifications</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="notifications.matches"
                    checked={formData.notifications.matches}
                    onChange={handleCheckboxChange}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700">New match notifications</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="notifications.likes"
                    checked={formData.notifications.likes}
                    onChange={handleCheckboxChange}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700">New like notifications</span>
                </label>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 