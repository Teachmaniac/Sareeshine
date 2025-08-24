'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sarees by name..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found matching your search. Please try a different term.</p>
        </div>
      )}
    </div>
  );
}
