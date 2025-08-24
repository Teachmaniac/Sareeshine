import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

/**
 * The page displayed to the user after a successful purchase.
 * It provides confirmation and a link to return to the homepage.
 */
export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center py-20 animate-in fade-in-50 duration-500">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader className="items-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg pt-2">
            Thank you for your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Your order has been confirmed. You will receive an email with the details shortly.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
