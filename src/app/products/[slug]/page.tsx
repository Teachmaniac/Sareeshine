import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { createCheckoutSession } from '@/app/actions';
import { BuyButton } from '@/components/BuyButton';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

// Revalidate this page every hour to catch potential product updates
export const revalidate = 3600;

/**
 * A dynamic page to display the details of a single product.
 * It fetches product data based on the slug from the URL.
 * If the product is not found, it displays a 404 page.
 *
 * @param {ProductPageProps} props The properties for the component.
 * @param {object} props.params Contains the slug from the URL.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  // If no product is found with the given slug, render the 404 page.
  if (!product) {
    notFound();
  }
  
  // Bind the product's priceId to the server action.
  const createCheckoutSessionWithPriceId = createCheckoutSession.bind(null, product.priceId);

  return (
    <div className="py-12 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex justify-center items-start">
          <div className="aspect-[3/4] w-full max-w-md bg-card rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={800}
              className="object-cover w-full h-full"
              priority // Prioritize loading the main product image
              data-ai-hint={product['data-ai-hint']}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-4">
            {product.name}
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            {product.description}
          </p>
          
          {/*
            This form calls the `createCheckoutSessionWithPriceId` server action.
            The BuyButton is a client component that shows a pending state.
          */}
          <form action={createCheckoutSessionWithPriceId}>
            <BuyButton />
          </form>
        </div>
      </div>
    </div>
  );
}
