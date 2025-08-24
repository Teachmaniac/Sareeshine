import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * The page displayed when a user cancels the checkout process.
 * It confirms that the payment was not processed and provides a way back to the homepage.
 */
export default function CanceledPage() {
  return (
    <div className="flex items-center justify-center py-20 animate-in fade-in-50 duration-500">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader className="items-center">
          <XCircle className="h-20 w-20 text-destructive mb-4" />
          <CardTitle className="text-3xl font-headline text-destructive">
            Order Canceled
          </CardTitle>
          <CardDescription className="text-lg pt-2">
            Your checkout session has been canceled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            You have not been charged. Your cart is still waiting for you!
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Return to Store</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
