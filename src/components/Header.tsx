import { Ribbon } from 'lucide-react';
import Link from 'next/link';
import { CartSheet } from './CartSheet';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

/**
 * The Header component for the SareeShine website.
 * It displays the store name and provides a link to the homepage.
 */
export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Ribbon className="h-8 w-8 text-accent group-hover:animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary group-hover:text-accent transition-colors">
              SareeShine
            </h1>
          </Link>
          <div className="flex items-center gap-4">
             <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
}
