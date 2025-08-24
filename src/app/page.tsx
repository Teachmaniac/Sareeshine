import { getProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';

/**
 * The homepage for SareeShine.
 * This server component fetches all products and displays them in a responsive grid.
 * It provides a visual entry point for customers to browse the available sarees.
 */
export default async function Home() {
  const products = await getProducts();

  return (
    <div className="py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">
          Our Exquisite Collection
        </h2>
        <p className="mt-4 text-xl leading-8 text-foreground/80 max-w-2xl mx-auto">
          Discover our handpicked selection of timeless sarees, meticulously crafted for every cherished occasion.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
