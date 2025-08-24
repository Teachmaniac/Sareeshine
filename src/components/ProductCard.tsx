import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

/**
 * A card component to display a summary of a product.
 * It shows the product's image, name, and price, and links to the full product page.
 * Includes a subtle fade-in animation and hover effect.
 *
 * @param {ProductCardProps} props The properties for the component.
 * @param {Product} props.product The product data to display.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={product['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-headline leading-tight truncate">{product.name}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-md font-semibold text-primary">{formatPrice(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
