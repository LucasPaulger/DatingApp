import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

async function getStripeEvent(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    throw new Error('No stripe signature found');
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Stripe webhook secret is not set');
  }

  try {
    return stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    throw new Error('Invalid stripe signature');
  }
}

export async function POST(req: Request) {
  try {
    const event = await getStripeEvent(req);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          throw new Error('No user ID found in session metadata');
        }

        // Here you would typically:
        // 1. Get the customer ID from the session
        // 2. Store the subscription info in your database
        // 3. Update the user's subscription status
        
        // For now, we'll just log the success
        console.log(`Subscription successful for user ${userId}`);
        
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          throw new Error('No user ID found in subscription metadata');
        }

        // Here you would typically:
        // 1. Update the subscription status in your database
        // 2. Handle subscription changes (upgrades/downgrades)
        
        console.log(`Subscription updated for user ${userId}`);
        
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          throw new Error('No user ID found in subscription metadata');
        }

        // Here you would typically:
        // 1. Mark the subscription as cancelled in your database
        // 2. Update the user's access level
        
        console.log(`Subscription cancelled for user ${userId}`);
        
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 