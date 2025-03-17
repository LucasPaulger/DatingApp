'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  userGender: string | null;
  checkSubscription: () => boolean;
  setSubscriptionStatus: (status: boolean) => void;
  setUserGender: (gender: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userGender, setUserGender] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for subscription status and gender
    const storedSubscription = localStorage.getItem('isSubscribed') === 'true';
    const storedGender = localStorage.getItem('userGender');
    setIsSubscribed(storedSubscription);
    setUserGender(storedGender);
  }, []);

  const checkSubscription = () => {
    // If user is female or already subscribed, return true
    if (userGender === 'female' || isSubscribed) {
      return true;
    }
    return false;
  };

  const setSubscriptionStatus = (status: boolean) => {
    setIsSubscribed(status);
    localStorage.setItem('isSubscribed', status.toString());
  };

  const handleSetUserGender = (gender: string) => {
    setUserGender(gender);
    localStorage.setItem('userGender', gender);
  };

  return (
    <SubscriptionContext.Provider 
      value={{
        isSubscribed,
        userGender,
        checkSubscription,
        setSubscriptionStatus,
        setUserGender: handleSetUserGender
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
} 