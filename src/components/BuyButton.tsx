'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

/**
 * A client component button that displays a loading state.
 * It's designed to be used inside a form that triggers a server action.
 * The `useFormStatus` hook provides the pending state of the form submission.
 */
export function BuyButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:bg-primary/70"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        'Buy Now'
      )}
    </Button>
  );
}
