'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { CartItem } from '@/hooks/use-cart';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

/**
 * Creates a Stripe Checkout Session for a given set of cart items.
 * This server action is called from the cart to initiate payment.
 *
 * @param {CartItem[]} items The items in the user's shopping cart.
 * @throws {Error} If environment variables are not set or session creation fails.
 */
export async function createCheckoutSession(items: CartItem[]) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables.');
  }
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set in environment variables.');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
    typescript: true,
  });

  // Transform cart items into Stripe's line_items format
  const line_items = items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/canceled`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
    });

    if (session.url) {
      redirect(session.url);
    } else {
      throw new Error('Could not create Stripe Checkout session.');
    }
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error('Failed to create checkout session.');
  }
}

/**
 * Saves the order details to Firestore after a successful payment.
 * @param sessionId The Stripe Checkout session ID.
 */
export async function saveOrder(sessionId: string) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables.');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
    typescript: true,
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer'],
    });
    
    if (session.payment_status === 'paid') {
      const orderData = {
        customer_email: session.customer_details?.email,
        payment_id: session.payment_intent,
        total: session.amount_total,
        currency: session.currency,
        items: session.line_items?.data.map(item => {
          const product = item.price?.product as Stripe.Product;
          return {
            id: product.metadata.productId,
            name: product.name,
            quantity: item.quantity,
            price: item.price?.unit_amount,
          }
        }),
        shipping_address: session.shipping_details?.address,
        created_at: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      return { success: true, message: 'Order saved successfully.' };
    } else {
      return { success: false, message: 'Payment not successful.' };
    }
  } catch (error) {
    console.error('Error saving order:', error);
    return { success: false, message: 'Failed to save order.' };
  }
}
