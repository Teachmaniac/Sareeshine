
'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { saveOrder } from '../actions';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  // Effect to handle Stripe orders and clear cart
  useEffect(() => {
    if (sessionId) {
      saveOrder(sessionId).then(() => {
        clearCart();
      });
    } else {
      // For manual orders, the cart is cleared in the checkout page action.
      // We can just clear it again here to be safe.
      clearCart();
    }
  }, [sessionId, clearCart]);

  // A loading state specifically for when Stripe is saving the order
  if (sessionId === null && searchParams.toString().includes('session_id')) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
         <LoaderCircle className="h-20 w-20 text-muted-foreground animate-spin mb-4" />
        <p className="text-lg">Finalizing your order...</p>
      </div>
    );
  }

  const title = sessionId ? "Payment Successful!" : "Order Placed Successfully!";
  const description = sessionId 
    ? "Thank you for your purchase." 
    : "Your order has been received and is pending payment verification.";

  return (
    <Card className="w-full max-w-md text-center shadow-xl">
      <CardHeader className="items-center">
        <CheckCircle2 className="h-20 w-20 text-primary mb-4" />
        <CardTitle className="text-3xl font-headline text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-lg pt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Your beautiful sarees will be delivered within one week. You will receive an email with the details shortly.
        </p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}


/**
 * The page displayed to the user after a successful purchase.
 * It provides confirmation and a link to return to the homepage.
 */
export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center py-20 animate-in fade-in-50 duration-500">
      <Suspense fallback={<LoaderCircle className="h-20 w-20 animate-spin" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
