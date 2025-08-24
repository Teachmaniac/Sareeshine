import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price in cents into a currency string (e.g., 2999 -> $29.99).
 * @param priceInCents The price in the smallest currency unit (cents).
 * @returns A formatted string representing the price in dollars.
 */
export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100);
}
