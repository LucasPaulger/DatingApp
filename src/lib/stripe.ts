import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

let stripePromise: Promise<any> | null = null;

// Client-side Stripe instance
export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('Stripe publishable key is not set in environment variables');
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

// Server-side Stripe instance
const getServerStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Stripe secret key is not set in environment variables');
  }
  return new Stripe(key, {
    apiVersion: '2025-02-24.acacia',
  });
};

export const stripe = getServerStripe();

// Subscription price IDs
export const SUBSCRIPTION_PRICES = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
}; 