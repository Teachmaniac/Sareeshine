'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addItem(product);
      setAdded(true);
      toast({
        title: "Added to cart!",
        description: `"${product.name}" is now in your cart.`,
      });
      setTimeout(() => {
        setAdded(false);
        setIsAdding(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || added}
      size="lg"
      className="w-full"
    >
      {isAdding ? (
        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
      ) : added ? (
        <Check className="mr-2 h-5 w-5" />
      ) : (
        <ShoppingCart className="mr-2 h-5 w-5" />
      )}
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  );
}
