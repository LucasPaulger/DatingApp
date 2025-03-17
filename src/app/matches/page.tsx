'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/context/SubscriptionContext';
import SubscriptionModal from '@/components/SubscriptionModal';

interface Match {
  id: number;
  name: string;
  age: number;
  distance: number;
  bio: string;
  interests: string[];
  photos: string[];
  lastActive: string;
  occupation: string;
  location: {
    lat: number;
    lng: number;
  };
  gender: string;
}

export default function Matches() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { checkSubscription, userGender } = useSubscription();
  
  // Mock authentication state - in a real app, this would come from your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data for potential matches
  const mockMatches: Match[] = [
    {
      id: 1,
      name: "Sarah",
      age: 27,
      distance: 2.4,
      bio: "Western grad working at Victoria Hospital. Love exploring Richmond Row and trying new restaurants. Looking for someone to join me at Covent Garden Market on weekends! 🏥🍜",
      occupation: "Registered Nurse",
      interests: ["Healthcare", "Food", "Fitness", "Dogs", "Market", "Concerts"],
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9"
      ],
      lastActive: "Just now",
      location: { lat: 42.9849, lng: -81.2453 },
      gender: "female"
    },
    {
      id: 2,
      name: "Emily",
      age: 24,
      distance: 3.1,
      bio: "Music student at Western, usually practicing at von Kuster Hall or performing at Aeolian Hall. Would love to grab coffee at Locomotive Espresso! 🎵☕",
      occupation: "Music Student",
      interests: ["Classical Music", "Coffee", "Arts", "Theatre", "Teaching", "Travel"],
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        "https://images.unsplash.com/photo-1521146764736-56c929d59c83",
        "https://images.unsplash.com/photo-1524638431109-93d95c968f03"
      ],
      lastActive: "5 minutes ago",
      location: { lat: 43.0096, lng: -81.2737 },
      gender: "female"
    },
    {
      id: 3,
      name: "Madison",
      age: 29,
      distance: 4.2,
      bio: "Tech lead at Digital Extremes. When not coding, you'll find me hiking at Meadowlily Woods or enjoying craft beers at Anderson Craft Ales. 💻🍺",
      occupation: "Software Developer",
      interests: ["Gaming", "Craft Beer", "Hiking", "Tech", "Board Games", "Cycling"],
      photos: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263",
        "https://images.unsplash.com/photo-1496440737103-cd596325d314"
      ],
      lastActive: "1 hour ago",
      location: { lat: 42.9915, lng: -81.2223 },
      gender: "male"
    },
    {
      id: 4,
      name: "Rachel",
      age: 26,
      distance: 1.8,
      bio: "Barista at Fire Roasted Coffee by day, amateur photographer by night. Love capturing sunset shots at Springbank Park. Looking for someone to explore local art galleries with! 📸🎨",
      occupation: "Barista & Photographer",
      interests: ["Photography", "Coffee", "Art", "Nature", "Farmers Markets", "Vintage"],
      photos: [
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1513379733131-48b424e4c267"
      ],
      lastActive: "30 minutes ago",
      location: { lat: 42.9676, lng: -81.2776 },
      gender: "female"
    },
    {
      id: 5,
      name: "Jessica",
      age: 28,
      distance: 3.7,
      bio: "Research scientist at Robarts. Passionate about health innovation and local food scenes. Always up for trying new spots in OEV or catching shows at London Music Hall! 🔬🎵",
      occupation: "Research Scientist",
      interests: ["Science", "Live Music", "Food", "Fitness", "Reading", "Community"],
      photos: [
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43",
        "https://images.unsplash.com/photo-1506956191951-7a88da4435e5",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      ],
      lastActive: "2 hours ago",
      location: { lat: 43.0147, lng: -81.2754 },
      gender: "female"
    },
    {
      id: 6,
      name: "Olivia",
      age: 25,
      distance: 2.9,
      bio: "Teacher at Central Secondary, big supporter of local arts! You can find me at TAP Centre for the Arts or enjoying the trails at Fanshawe Conservation Area. Looking for someone to explore the city with! 🎨🌿",
      occupation: "High School Teacher",
      interests: ["Education", "Arts", "Hiking", "Theatre", "Community", "Sports"],
      photos: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1524638431109-93d95c968f03",
        "https://images.unsplash.com/photo-1506956191951-7a88da4435e5"
      ],
      lastActive: "3 hours ago",
      location: { lat: 42.9932, lng: -81.2491 },
      gender: "female"
    }
  ];

  // Calculate distance between two points using Haversine formula
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });

          // Filter matches within 25km
          const localMatches = mockMatches.filter(match => {
            const distance = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              match.location.lat,
              match.location.lng
            );
            return distance <= 25;
          });

          setMatches(localMatches);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setMatches(mockMatches);
          setLoading(false);
        }
      );
    } else {
      setMatches(mockMatches);
      setLoading(false);
    }
  }, []);

  // Handle like/pass actions
  const handleAction = (action: 'like' | 'pass') => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (userGender === 'male' && !checkSubscription()) {
      setShowSubscriptionModal(true);
      return;
    }
    
    // Here you would handle the actual like/pass logic
    console.log(`${action} action taken`);
  };

  // Authentication Modal Component
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Create an Account to Connect
        </h3>
        <p className="text-gray-600 mb-6">
          To like or pass on matches, you'll need to create an account. It's free and only takes a minute!
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/signup')}
            className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/signin')}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700 text-sm mt-2"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubscribe = () => {
    // In a real app, this would integrate with a payment processor
    localStorage.setItem('subscriptionStatus', 'active');
    setShowSubscriptionModal(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Local Matches</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Within 25km</span>
            {userLocation && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Location Active
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Photo Carousel */}
                <div className="relative h-96">
                  <img
                    src={match.photos[0]}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">
                          {match.name}, {match.age}
                        </h2>
                        <p className="text-white/90 text-sm flex items-center gap-2">
                          <span>{match.occupation}</span>
                          <span>•</span>
                          <span>{match.distance.toFixed(1)}km away</span>
                        </p>
                      </div>
                      <span className="text-white/80 text-xs">
                        {match.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{match.bio}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {match.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleAction('like')}
                      className={`px-6 py-2 rounded-full transition-colors ${
                        isAuthenticated 
                          ? 'bg-rose-500 text-white hover:bg-rose-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Like
                    </button>
                    <button 
                      onClick={() => handleAction('pass')}
                      className={`px-6 py-2 rounded-full transition-colors ${
                        isAuthenticated 
                          ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Pass
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && matches.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No matches found nearby
            </h2>
            <p className="text-gray-600">
              Try expanding your search radius or check back later
            </p>
          </div>
        )}

        {showAuthModal && <AuthModal />}

        {showSubscriptionModal && (
          <SubscriptionModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
            onSubscribe={handleSubscribe}
          />
        )}
      </div>
    </main>
  );
} 