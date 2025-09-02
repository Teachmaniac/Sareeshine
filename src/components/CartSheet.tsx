'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, Trash2, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IndianStates } from '@/lib/shipping';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export function CartSheet() {
  const {
    items,
    removeItem,
    total,
    itemCount,
    shippingState,
    setShippingState,
    shippingCost,
    totalWithShipping,
  } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!shippingState) {
      toast({
        title: "Select Shipping State",
        description: "Please select your state for shipping.",
        variant: "destructive",
      });
      return;
    }
    router.push('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full flex items-center justify-center"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea className="h-[calc(100vh-18rem)]">
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1">Shipping</span>
                  <Select
                    value={shippingState || ''}
                    onValueChange={setShippingState}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {IndianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {shippingState && (
                  <div className="flex">
                    <span className="flex-1">Shipping Cost</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                )}
                <div className="flex font-semibold text-base">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!shippingState}
                  >
                    Continue to Checkout
                  </Button>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Your cart is empty. Add some beautiful sarees!
            </p>
            <SheetTrigger asChild>
              <Button variant="link" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
