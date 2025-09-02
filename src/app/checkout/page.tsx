'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';
import { LoaderCircle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitManualOrder } from '../actions';
import { useRouter } from 'next/navigation';
import { IndianStates } from '@/lib/shipping';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CheckoutPage() {
  const { items, total, shippingState, shippingCost, totalWithShipping, setShippingState, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState({ line1: '', city: '', postal_code: '' });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!screenshot) {
      toast({ title: "Please upload a screenshot.", variant: "destructive" });
      return;
    }
    if (!shippingState || !shippingAddress.line1 || !shippingAddress.city || !shippingAddress.postal_code || !customerName || !customerEmail || !customerPhone) {
        toast({ title: "Please fill all customer and shipping details.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    
    const fullShippingAddress = {
        ...shippingAddress,
        state: shippingState,
        country: 'IN'
    }

    try {
      await submitManualOrder({
        items,
        total: totalWithShipping,
        shippingCost,
        shippingAddress: fullShippingAddress,
        screenshotDataUrl: screenshotPreview!,
        customerDetails: { name: customerName, email: customerEmail, phone: customerPhone }
      });
      
      toast({ title: "Order submitted successfully!", description: "We will verify your payment and confirm your order shortly."});
      clearCart();
      router.push('/success');
    } catch (error) {
      toast({ title: "Submission failed", description: "Could not submit your order. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
    }
  };
  
  if (items.length === 0) {
     return (
        <div className="flex items-center justify-center py-20">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>Your Cart is Empty</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Add some items to your cart to proceed with checkout.</p>
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className="py-12 animate-in fade-in duration-500">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary text-center">Complete Your Order</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid md:grid-cols-2 gap-12">
            {/* Left Side: QR Code and Upload */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Payment</h3>
              <div className="p-4 border rounded-lg text-center bg-muted/50">
                <p className="font-semibold mb-2">Scan & Pay Using PhonePe App</p>
                <div className="flex justify-center">
                  <Image src="/phonepe-qr.png" alt="PhonePe QR Code" width={250} height={250} data-ai-hint="qr code" />
                </div>
                <p className="mt-2 text-lg font-bold text-primary">{formatPrice(totalWithShipping)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot" className="text-xl font-semibold">Upload Payment Screenshot</Label>
                <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-accent transition-colors">
                  <Input id="screenshot" type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                  {screenshotPreview ? (
                    <Image src={screenshotPreview} alt="Screenshot preview" width={200} height={200} className="mx-auto rounded-md object-contain h-48" />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Upload className="h-12 w-12" />
                      <p>Click or drag to upload</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Order Summary & Shipping */}
            <div className="space-y-6">
               <h3 className="text-xl font-semibold">Your Details</h3>
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="your.email@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" required />
                    </div>
                 </div>

              <h3 className="text-xl font-semibold">Shipping Address</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input id="line1" name="line1" value={shippingAddress.line1} onChange={handleAddressChange} placeholder="Street, house no." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={shippingAddress.city} onChange={handleAddressChange} placeholder="Hyderabad" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="postal_code">PIN Code</Label>
                    <Input id="postal_code" name="postal_code" value={shippingAddress.postal_code} onChange={handleAddressChange} placeholder="500001" required />
                  </div>
                </div>
                <div className="space-y-2">
                    <Label>State</Label>
                    <Select value={shippingState || ''} onValueChange={setShippingState} required>
                        <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
                        <SelectContent>
                            {IndianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
              </div>

              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="space-y-2 border p-4 rounded-lg bg-muted/50">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <LoaderCircle className="mr-2 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
