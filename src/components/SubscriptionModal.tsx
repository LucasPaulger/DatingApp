'use client';

import { useState } from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import { getStripe } from '@/lib/stripe';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const { setSubscriptionStatus } = useSubscription();

  const plans = {
    monthly: {
      price: 29.99,
      features: [
        'Unlimited matches',
        'See who likes you',
        'Advanced filters',
        'Priority support',
        'Ad-free experience'
      ]
    },
    yearly: {
      price: 19.99, // per month, billed annually
      features: [
        'All monthly features',
        'Save 33%',
        'Profile boost every month',
        'See who viewed your profile',
        'Premium badge'
      ]
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      // Get mock user ID (in a real app, this would come from your auth system)
      const userId = 'mock-user-id';

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          userId,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe checkout
      const stripe = await getStripe();
      const { error: stripeError } = await stripe!.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h2>
          <p className="text-gray-600">
            Get unlimited access to all features and find your perfect match faster
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <div 
            className={`border rounded-xl p-6 cursor-pointer transition-all ${
              selectedPlan === 'monthly' 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-gray-200 hover:border-rose-200'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Monthly</h3>
                <p className="text-gray-500">Billed monthly</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${plans.monthly.price}</div>
                <div className="text-gray-500">/month</div>
              </div>
            </div>
            <ul className="space-y-3">
              {plans.monthly.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Yearly Plan */}
          <div 
            className={`border rounded-xl p-6 cursor-pointer transition-all ${
              selectedPlan === 'yearly' 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-gray-200 hover:border-rose-200'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Yearly</h3>
                <p className="text-gray-500">Billed annually</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${plans.yearly.price}</div>
                <div className="text-gray-500">/month</div>
              </div>
            </div>
            <ul className="space-y-3">
              {plans.yearly.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Subscribe Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 