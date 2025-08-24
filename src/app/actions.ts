'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';

/**
 * -----------------------------------------------------------------------------
 * CONCEPTUAL AUTOMATION PLAN WITH STRIPE WEBHOOKS & NETLIFY FUNCTIONS
 * -----------------------------------------------------------------------------
 *
 * This section explains how to automate post-purchase actions (like sending
 * confirmation emails) using Stripe webhooks.
 *
 * 1. STRIPE WEBHOOK CREATION:
 *    - In your Stripe Dashboard, go to Developers > Webhooks.
 *    - Click "Add endpoint" and provide the URL of your Netlify Function,
 *      e.g., `https://your-site.netlify.app/.netlify/functions/stripe-webhook`.
 *    - Listen for the `checkout.session.completed` event. This event is fired
 *      when a customer successfully completes a purchase.
 *    - Stripe provides a "webhook signing secret" (whsec_...). Add this secret
 *      to your Netlify environment variables as `STRIPE_WEBHOOK_SECRET`.
 *
 * 2. NETLIFY FUNCTION (e.g., `netlify/functions/stripe-webhook.ts`):
 *    - This serverless function will receive the event data from Stripe.
 *    - It must first verify the event's signature using the `STRIPE_WEBHOOK_SECRET`
 *      to ensure the request is genuinely from Stripe.
 *    - Once verified, it can parse the event data, which includes customer details
 *      (email, name) and the items purchased.
 *
 * 3. CONNECTING TO ZAPIER (OR OTHER NO-CODE TOOLS):
 *    - Inside the Netlify Function, after processing the Stripe event, you can
 *      trigger a Zapier workflow by making a POST request to a Zapier Webhook URL.
 *    - You would create a new "Zap" in Zapier, with the trigger being "Webhooks by Zapier".
 *    - Your Netlify Function would send the relevant data (customer email, order details)
 *      to this Zapier webhook.
 *
 * 4. AUTOMATING TASKS WITH ZAPIER:
 *    - Once Zapier receives the data, you can add actions to the workflow, such as:
 *      a) Send Email: Use the Gmail or SendGrid action to send a customized
 *         order confirmation email to the customer.
 *      b) Update Spreadsheet: Use the Google Sheets action to add a new row with
 *         the order details, effectively managing an order log.
 *      c) Notify Team: Use the Slack action to post a message in a sales channel,
 *         notifying your team of the new order.
 *
 * This setup creates a powerful, automated pipeline from purchase to fulfillment
 * without managing a traditional server.
 */


/**
 * Creates a Stripe Checkout Session for a given product price ID.
 * This server action is called from the product page.
 * It securely communicates with the Stripe API on the server-side.
 *
 * @param {string} priceId The Stripe Price ID of the item being purchased.
 * @throws {Error} If environment variables are not set or session creation fails.
 */
export async function createCheckoutSession(priceId: string) {
  // IMPORTANT:
  // For this to work, you must create a `.env.local` file in your project's root
  // and add your Stripe keys and site URL.
  //
  // .env.local file content:
  // STRIPE_SECRET_KEY=sk_test_... or sk_live_...
  // NEXT_PUBLIC_SITE_URL=http://localhost:3000 (for development) or https://your-live-site.com
  //

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables.');
  }
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set in environment variables.');
  }

  // Initialize the Stripe client with your secret key.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
    typescript: true,
  });

  try {
    // Create a new checkout session.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Define the URLs for successful and canceled payments.
      // Stripe will redirect the user to these pages after the transaction.
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/canceled`,
    });

    // If the session is created successfully, redirect the user to the Stripe Checkout page.
    if (session.url) {
      redirect(session.url);
    } else {
      throw new Error('Could not create Stripe Checkout session.');
    }
  } catch (error) {
    console.error("Stripe Error:", error);
    // In a real app, you'd want to handle this more gracefully.
    // For now, we'll throw an error which can be caught by an error boundary.
    throw new Error('Failed to create checkout session.');
  }
}
